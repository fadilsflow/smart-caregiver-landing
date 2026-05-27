export type Source = 'WHO' | 'Google Trends' | 'YouTube';
export type Sentiment = 'positive' | 'neutral' | 'negative';

export type DashboardRecord = {
  source: Source;
  keyword: string;
  value: number;
  metric: string;
  timestamp: string;
  region: string;
  sentiment: Sentiment | null;
  batch_id: string;
  indicator_code?: string;
  age_group?: string;
  sex?: string;
};

export const notebookSummary = {
  totalRecords: 2372,
  totalSources: 3,
  uniqueKeywords: 12,
  timerange: '1980-01-01 s/d 2026-05-18',
  collection: 'elderly_analysis.elderly_data',
  lastCollected: '18 Mei 2026',
  analysisRun: '19 Mei 2026',
};

export const datasetDistribution = [
  { source: 'YouTube', count: 1722 },
  { source: 'Google Trends', count: 335 },
  { source: 'WHO', count: 315 },
];

export const whoIndicators = [
  {
    code: 'BP_04',
    keyword: 'Hypertension',
    metric: 'percent',
    unit: '%',
    meaning: 'tekanan darah tinggi pada kelompok 60+ di Indonesia',
    values: [
      { year: 1980, value: 29.6 },
      { year: 1990, value: 30.4 },
      { year: 2000, value: 31.1 },
      { year: 2010, value: 32.8 },
      { year: 2020, value: 35.9 },
      { year: 2022, value: 36.7 },
    ],
  },
  {
    code: 'NCD_GLUC_02',
    keyword: 'Diabetes',
    metric: 'percent',
    unit: '%',
    meaning: 'gula darah puasa tinggi pada kelompok 60+',
    values: [
      { year: 1980, value: 4.1 },
      { year: 1990, value: 4.7 },
      { year: 2000, value: 5.0 },
      { year: 2010, value: 5.3 },
      { year: 2020, value: 6.4 },
      { year: 2022, value: 6.8 },
    ],
  },
  {
    code: 'NCD_BMI_30A',
    keyword: 'Obesity',
    metric: 'percent',
    unit: '%',
    meaning: 'obesitas dewasa BMI ≥ 30 sebagai indikator risiko kesehatan lansia',
    values: [
      { year: 1980, value: 0.6 },
      { year: 1990, value: 1.4 },
      { year: 2000, value: 3.1 },
      { year: 2010, value: 6.2 },
      { year: 2020, value: 8.9 },
      { year: 2022, value: 9.5 },
    ],
  },
  {
    code: 'WHOSIS_000001',
    keyword: 'Life Expectancy',
    metric: 'percent',
    unit: 'tahun',
    meaning: 'angka harapan hidup Indonesia sebagai konteks populasi lansia',
    values: [
      { year: 1980, value: 57.6 },
      { year: 1990, value: 62.3 },
      { year: 2000, value: 66.1 },
      { year: 2010, value: 69.8 },
      { year: 2020, value: 71.9 },
      { year: 2022, value: 73.3 },
    ],
  },
];

export const trendSeries = [
  { month: 'Mei 2021', lansia: 30, perawatan: 18, kesehatan: 24, senam: 21, posyandu: 12 },
  { month: 'Nov 2021', lansia: 34, perawatan: 21, kesehatan: 27, senam: 25, posyandu: 16 },
  { month: 'Mei 2022', lansia: 38, perawatan: 24, kesehatan: 31, senam: 34, posyandu: 21 },
  { month: 'Nov 2022', lansia: 42, perawatan: 29, kesehatan: 36, senam: 41, posyandu: 27 },
  { month: 'Mei 2023', lansia: 49, perawatan: 33, kesehatan: 44, senam: 50, posyandu: 34 },
  { month: 'Nov 2023', lansia: 57, perawatan: 38, kesehatan: 52, senam: 61, posyandu: 42 },
  { month: 'Mei 2024', lansia: 64, perawatan: 45, kesehatan: 58, senam: 68, posyandu: 51 },
  { month: 'Nov 2024', lansia: 71, perawatan: 52, kesehatan: 64, senam: 76, posyandu: 58 },
  { month: 'Mei 2025', lansia: 76, perawatan: 58, kesehatan: 71, senam: 84, posyandu: 66 },
  { month: 'Nov 2025', lansia: 83, perawatan: 63, kesehatan: 78, senam: 90, posyandu: 73 },
  { month: 'Mei 2026', lansia: 88, perawatan: 69, kesehatan: 84, senam: 93, posyandu: 79 },
];

export const regionInterest = [
  { region: 'Indonesia', score: 93, keyword: 'senam lansia' },
  { region: 'Indonesia', score: 88, keyword: 'lansia' },
  { region: 'Indonesia', score: 84, keyword: 'kesehatan lansia' },
  { region: 'Indonesia', score: 79, keyword: 'posyandu lansia' },
  { region: 'Indonesia', score: 69, keyword: 'perawatan lansia' },
];

export const topicPopularity = [
  { keyword: 'perawatan lansia', score: 315, source: 'Combined' },
  { keyword: 'lansia', score: 300, source: 'Combined' },
  { keyword: 'kesehatan lansia', score: 295, source: 'Combined' },
  { keyword: 'senam lansia', score: 288, source: 'Combined' },
  { keyword: 'posyandu lansia', score: 276, source: 'Combined' },
  { keyword: 'Hypertension', score: 90, source: 'WHO' },
  { keyword: 'Obesity', score: 99, source: 'WHO' },
  { keyword: 'Diabetes', score: 84, source: 'WHO' },
  { keyword: 'Life Expectancy', score: 42, source: 'WHO' },
  { keyword: 'demensia lansia', score: 25, source: 'YouTube' },
];

export const topWords = [
  { word: 'lansia', count: 1534 },
  { word: 'perawatan', count: 315 },
  { word: 'kesehatan', count: 295 },
  { word: 'senam', count: 288 },
  { word: 'posyandu', count: 276 },
  { word: 'hypertension', count: 90 },
  { word: 'obesity', count: 99 },
  { word: 'diabetes', count: 84 },
  { word: 'life', count: 42 },
  { word: 'expectancy', count: 42 },
];

export const youtubeTopics = [
  { title: 'Senam lansia bersama komunitas', keyword: 'senam lansia', engagement: 11978902, sentiment: 'neutral' as const, views: 11978902 },
  { title: 'Tips perawatan lansia di rumah', keyword: 'perawatan lansia', engagement: 3560000, sentiment: 'neutral' as const, views: 3560000 },
  { title: 'Kesehatan lansia dan aktivitas harian', keyword: 'kesehatan lansia', engagement: 2140000, sentiment: 'positive' as const, views: 2140000 },
  { title: 'Program posyandu lansia desa', keyword: 'posyandu lansia', engagement: 980000, sentiment: 'neutral' as const, views: 980000 },
  { title: 'Makanan sehat lansia', keyword: 'makanan sehat lansia', engagement: 730000, sentiment: 'positive' as const, views: 730000 },
  { title: 'Mengenal demensia pada lansia', keyword: 'demensia lansia', engagement: 410000, sentiment: 'neutral' as const, views: 410000 },
  { title: 'Aktivitas lansia agar tetap mandiri', keyword: 'aktivitas lansia', engagement: 185000, sentiment: 'positive' as const, views: 185000 },
  { title: 'Cerita caregiver merawat lansia', keyword: 'perawatan lansia', engagement: 92000, sentiment: 'negative' as const, views: 92000 },
];

export const sentimentBreakdown = [
  { sentiment: 'neutral' as const, label: 'Netral', value: 94, description: 'mayoritas video bersifat informatif atau deskriptif' },
  { sentiment: 'positive' as const, label: 'Positif', value: 4, description: 'konten dukungan, motivasi, dan edukasi praktis' },
  { sentiment: 'negative' as const, label: 'Negatif', value: 2, description: 'kekhawatiran, beban caregiver, atau isu risiko' },
];

export const dashboardRecords: DashboardRecord[] = [
  ...whoIndicators.flatMap((indicator) =>
    indicator.values.map((point) => ({
      source: 'WHO' as const,
      keyword: indicator.keyword,
      value: point.value,
      metric: indicator.metric,
      timestamp: `${point.year}-01-01`,
      region: 'Indonesia',
      sentiment: null,
      batch_id: 'run_26016781190',
      indicator_code: indicator.code,
      age_group: '60+',
      sex: 'Both',
    })),
  ),
  ...trendSeries.flatMap((point, index) => [
    {
      source: 'Google Trends' as const,
      keyword: 'lansia',
      value: point.lansia,
      metric: 'interest_score',
      timestamp: `2021-${String(index + 5).padStart(2, '0')}-01`,
      region: 'Indonesia',
      sentiment: null,
      batch_id: 'run_26016781190',
    },
    {
      source: 'Google Trends' as const,
      keyword: 'senam lansia',
      value: point.senam,
      metric: 'interest_score',
      timestamp: `2021-${String(index + 5).padStart(2, '0')}-01`,
      region: 'Indonesia',
      sentiment: null,
      batch_id: 'run_26016781190',
    },
  ]),
  ...youtubeTopics.map((topic) => ({
    source: 'YouTube' as const,
    keyword: topic.keyword,
    value: topic.engagement,
    metric: 'engagement_score',
    timestamp: '2026-05-18',
    region: 'Indonesia',
    sentiment: topic.sentiment,
    batch_id: 'run_26016781190',
  })),
];

export const keyMetrics = {
  totalRecords: notebookSummary.totalRecords,
  totalSources: notebookSummary.totalSources,
  topKeyword: 'perawatan lansia',
  averageSentiment: '94% netral',
  uniqueKeywords: notebookSummary.uniqueKeywords,
  timerange: notebookSummary.timerange,
  lastUpdated: notebookSummary.lastCollected,
};
