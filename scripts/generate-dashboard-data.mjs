import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
try {
  process.loadEnvFile(resolve(ROOT, process.env.MONGO_ENV_FILE || '.env'));
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

const OUTPUT = process.env.DASHBOARD_OUTPUT_PATH || resolve(ROOT, 'src/data/generated-dashboard.ts');
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME || 'elderly_analysis';
const COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME || 'elderly_data';

const SOURCE_NAMES = ['WHO', 'Google Trends', 'YouTube'];
const WHO_META = {
  BP_04: { unit: '%', meaning: 'tekanan darah tinggi pada kelompok 60+ di Indonesia' },
  NCD_GLUC_02: { unit: '%', meaning: 'gula darah puasa tinggi pada kelompok 60+' },
  NCD_BMI_30A: { unit: '%', meaning: 'obesitas dewasa BMI ≥ 30 sebagai indikator risiko kesehatan lansia' },
  WHOSIS_000001: { unit: 'tahun', meaning: 'angka harapan hidup Indonesia sebagai konteks populasi lansia' },
};
const TREND_KEYS = {
  lansia: 'lansia',
  'perawatan lansia': 'perawatan',
  'kesehatan lansia': 'kesehatan',
  'senam lansia': 'senam',
  'posyandu lansia': 'posyandu',
};

if (!MONGO_URI) {
  if (process.env.VERCEL || process.env.CI) {
    throw new Error('MONGO_URI wajib tersedia saat build production. Snapshot lama tetap aman di deployment Vercel sebelumnya.');
  }
  console.warn('[dashboard-data] MONGO_URI tidak tersedia; memakai fixture lokal yang sudah di-commit.');
  process.exit(0);
}

const client = new MongoClient(MONGO_URI, {
  serverSelectionTimeoutMS: 15_000,
  connectTimeoutMS: 15_000,
});

try {
  await client.connect();
  const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
  const snapshot = await buildSnapshot(collection);
  validateSnapshot(snapshot);

  await mkdir(dirname(OUTPUT), { recursive: true });
  const moduleSource = `// Generated at build time from MongoDB Atlas. Do not edit manually.\nexport default ${JSON.stringify(snapshot, null, 2)};\n`;
  await writeFile(OUTPUT, moduleSource, 'utf8');
  console.log(`[dashboard-data] ${snapshot.keyMetrics.totalRecords} records; snapshot ${snapshot.generatedAt}`);
} finally {
  await client.close();
}

async function buildSnapshot(collection) {
  const [distributionRows, keywordRows, boundsRows, whoRows, latestYoutube] = await Promise.all([
    collection.aggregate([
      { $match: { source: { $in: SOURCE_NAMES } } },
      { $group: { _id: '$source', count: { $sum: 1 }, freshAt: { $max: '$collected_at' } } },
      { $sort: { count: -1 } },
    ]).toArray(),
    collection.aggregate([
      { $match: { source: { $in: SOURCE_NAMES }, keyword: { $type: 'string', $ne: '' } } },
      { $group: { _id: '$keyword', count: { $sum: 1 }, sources: { $addToSet: '$source' } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]).toArray(),
    collection.aggregate([
      { $match: { source: { $in: SOURCE_NAMES } } },
      { $group: {
        _id: null,
        total: { $sum: 1 },
        firstTimestamp: { $min: '$timestamp' },
        lastTimestamp: { $max: '$timestamp' },
        generatedAt: { $max: '$collected_at' },
        batchId: { $last: '$batch_id' },
      } },
    ]).toArray(),
    collection.find(
      { source: 'WHO' },
      { projection: { _id: 0, indicator_code: 1, keyword: 1, metric: 1, timestamp: 1, value: 1, sex: 1 } },
    ).sort({ timestamp: 1 }).toArray(),
    findLatestYoutubeBatch(collection),
  ]);

  const bounds = boundsRows[0] || {};
  const trendRows = await collection.find(
    { source: 'Google Trends', metric: 'interest_score' },
    { projection: { _id: 0, keyword: 1, timestamp: 1, region: 1, value: 1, notes: 1, collected_at: 1 } },
  ).sort({ timestamp: 1 }).toArray();

  const datasetDistribution = distributionRows.map((row) => ({ source: row._id, count: row.count }));
  const freshness = Object.fromEntries(distributionRows.map((row) => [row._id, row.freshAt]));
  const whoIndicators = buildWhoIndicators(whoRows);
  const { trendSeries, regionInterest } = buildTrends(trendRows);
  const { youtubeTopics, sentimentBreakdown } = buildYoutube(latestYoutube.records);
  const topicPopularity = keywordRows.map((row) => ({
    keyword: row._id,
    score: row.count,
    source: row.sources.length === 1 ? row.sources[0] : 'Combined',
  }));
  const neutral = sentimentBreakdown.find((item) => item.sentiment === 'neutral');
  const generatedAt = normalizeIso(bounds.generatedAt) || new Date().toISOString();
  const lastUpdated = formatLongDate(generatedAt);

  return {
    schemaVersion: 1,
    generatedAt,
    batchId: latestYoutube.batchId || bounds.batchId || 'unknown',
    freshness,
    keyMetrics: {
      totalRecords: bounds.total || 0,
      totalSources: datasetDistribution.length,
      topKeyword: topicPopularity[0]?.keyword || '-',
      averageSentiment: neutral ? `${neutral.value}% netral` : '-',
      uniqueKeywords: await collection.distinct('keyword', { source: { $in: SOURCE_NAMES } }).then((items) => items.filter(Boolean).length),
      timerange: formatRange(bounds.firstTimestamp, bounds.lastTimestamp),
      lastUpdated,
    },
    datasetDistribution,
    whoIndicators,
    trendSeries,
    regionInterest,
    topicPopularity,
    youtubeTopics,
    sentimentBreakdown,
    lastUpdated,
  };
}

async function findLatestYoutubeBatch(collection) {
  const latest = await collection.findOne(
    { source: 'YouTube' },
    { sort: { snapshot_date: -1, collected_at: -1 }, projection: { batch_id: 1, snapshot_date: 1 } },
  );
  if (!latest) return { batchId: null, records: [] };

  const filter = latest.snapshot_date
    ? { source: 'YouTube', snapshot_date: latest.snapshot_date }
    : { source: 'YouTube', batch_id: latest.batch_id };
  const records = await collection.find(filter, {
    projection: { _id: 0, title: 1, keyword: 1, value: 1, sentiment: 1, views: 1 },
  }).sort({ value: -1 }).toArray();
  return { batchId: latest.batch_id, records };
}

function buildWhoIndicators(rows) {
  const grouped = new Map();
  for (const row of rows) {
    if (!row.indicator_code || !Number.isFinite(Number(row.value))) continue;
    const year = Number(String(row.timestamp).slice(0, 4));
    if (!Number.isFinite(year)) continue;
    const indicator = grouped.get(row.indicator_code) || { keyword: row.keyword, metric: row.metric, years: new Map() };
    const values = indicator.years.get(year) || [];
    values.push({ value: Number(row.value), sex: String(row.sex || '').toLowerCase() });
    indicator.years.set(year, values);
    grouped.set(row.indicator_code, indicator);
  }

  return Object.entries(WHO_META).flatMap(([code, meta]) => {
    const indicator = grouped.get(code);
    if (!indicator) return [];
    const values = [...indicator.years.entries()].map(([year, points]) => {
      const both = points.find((point) => ['both', 'both sexes', 'total'].includes(point.sex));
      const value = both?.value ?? average(points.map((point) => point.value));
      return { year, value: round(value, 2) };
    }).sort((a, b) => a.year - b.year);
    return [{ code, keyword: indicator.keyword, metric: indicator.metric, ...meta, values }];
  });
}

function buildTrends(rows) {
  const timeRows = rows.filter((row) => row.region === 'Indonesia');
  const byMonth = new Map();
  for (const row of timeRows) {
    const key = TREND_KEYS[row.keyword];
    if (!key || !row.timestamp) continue;
    const monthKey = String(row.timestamp).slice(0, 7);
    const point = byMonth.get(monthKey) || { month: formatMonth(row.timestamp) };
    point[key] = Number(row.value);
    byMonth.set(monthKey, point);
  }
  const trendSeries = [...byMonth.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-12).map(([, value]) => value);

  const regionRows = rows.filter((row) => row.region && row.region !== 'Indonesia');
  const latestCollectedAt = regionRows.reduce((max, row) => String(row.collected_at || '') > max ? String(row.collected_at) : max, '');
  const latestDate = latestCollectedAt.slice(0, 10);
  const regionInterest = regionRows
    .filter((row) => !latestDate || String(row.collected_at || '').startsWith(latestDate))
    .sort((a, b) => Number(b.value) - Number(a.value))
    .slice(0, 5)
    .map((row) => ({ region: row.region, score: Number(row.value), keyword: row.keyword }));
  return { trendSeries, regionInterest };
}

function buildYoutube(rows) {
  const youtubeTopics = rows.slice(0, 8).map((row) => ({
    title: row.title || row.keyword,
    keyword: row.keyword,
    engagement: Number(row.value) || 0,
    sentiment: ['positive', 'negative'].includes(row.sentiment) ? row.sentiment : 'neutral',
    views: Number(row.views ?? row.value) || 0,
  }));
  const counts = { positive: 0, neutral: 0, negative: 0 };
  for (const row of rows) counts[row.sentiment] = (counts[row.sentiment] || 0) + 1;
  const total = rows.length || 1;
  const labels = {
    neutral: ['Netral', 'konten informatif atau deskriptif'],
    positive: ['Positif', 'konten dukungan, motivasi, dan edukasi praktis'],
    negative: ['Negatif', 'kekhawatiran, beban caregiver, atau isu risiko'],
  };
  const raw = Object.entries(labels).map(([sentiment, [label, description]]) => ({
    sentiment, label, value: Math.round(((counts[sentiment] || 0) / total) * 100), description,
  }));
  const delta = 100 - raw.reduce((sum, item) => sum + item.value, 0);
  if (raw.length) raw[0].value += delta;
  return { youtubeTopics, sentimentBreakdown: raw };
}

function validateSnapshot(snapshot) {
  const requiredArrays = ['datasetDistribution', 'whoIndicators', 'trendSeries', 'regionInterest', 'topicPopularity', 'youtubeTopics', 'sentimentBreakdown'];
  if (!Number.isFinite(snapshot.keyMetrics.totalRecords) || snapshot.keyMetrics.totalRecords <= 0) {
    throw new Error('Snapshot tidak valid: totalRecords kosong.');
  }
  for (const key of requiredArrays) {
    if (!Array.isArray(snapshot[key]) || snapshot[key].length === 0) {
      throw new Error(`Snapshot tidak valid: ${key} kosong. Deployment dibatalkan agar snapshot lama tetap aktif.`);
    }
  }
}

function normalizeIso(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : date.toISOString();
}
function formatLongDate(value) {
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }).format(new Date(value));
}
function formatMonth(value) {
  return new Intl.DateTimeFormat('id-ID', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
}
function formatRange(first, last) {
  if (!first || !last) return '-';
  return `${String(first).slice(0, 10)} s/d ${String(last).slice(0, 10)}`;
}
function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
function round(value, precision) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
