// API client — tries HonoJS backend, falls back to dummy data
import type { DashboardSummary } from './types';
import {
  keyMetrics,
  datasetDistribution,
  whoIndicators,
  trendSeries,
  regionInterest,
  topicPopularity,
  youtubeTopics,
  sentimentBreakdown,
  notebookSummary,
} from '../data/dummy-dashboard';

const API_BASE = import.meta.env.PUBLIC_API_URL || 'http://localhost:3001';

async function fetchFromApi<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/api${endpoint}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const data = await fetchFromApi<DashboardSummary>('/summary');
  if (data) return data;

  // Fallback to dummy
  return {
    keyMetrics,
    datasetDistribution,
    whoIndicators,
    trendSeries,
    regionInterest,
    topicPopularity,
    youtubeTopics,
    sentimentBreakdown,
    lastUpdated: notebookSummary.lastCollected,
  };
}
