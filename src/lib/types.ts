// Shared types between Astro frontend and HonoJS API

export type Source = 'WHO' | 'YouTube' | 'Google Trends';
export type Sentiment = 'positive' | 'neutral' | 'negative';
export type Metric = 'percent' | 'engagement_score' | 'interest_score' | 'count';

export interface DashboardRecord {
  source: Source;
  keyword: string;
  value: number;
  metric: Metric;
  timestamp: string;
  region: string;
  sentiment: Sentiment | null;
  batch_id: string;
  indicator_code?: string;
  age_group?: string;
  sex?: string;
}

export interface KeyMetrics {
  totalRecords: number;
  totalSources: number;
  topKeyword: string;
  averageSentiment: string;
  uniqueKeywords: number;
  timerange: string;
  lastUpdated: string;
}

export interface DatasetDistribution {
  source: Source;
  count: number;
}

export interface WhoIndicator {
  code: string;
  keyword: string;
  metric: Metric;
  unit: string;
  meaning: string;
  values: { year: number; value: number }[];
}

export interface TrendSeries {
  month: string;
  [keyword: string]: number | string;
}

export interface RegionInterest {
  region: string;
  score: number;
  keyword: string;
}

export interface TopicPopularity {
  keyword: string;
  score: number;
  source: Source | 'Combined';
}

export interface YouTubeTopic {
  title: string;
  keyword: string;
  engagement: number;
  sentiment: Sentiment;
  views: number;
}

export interface SentimentBreakdown {
  sentiment: Sentiment;
  label: string;
  value: number;
  description: string;
}

export interface DashboardSummary {
  keyMetrics: KeyMetrics;
  datasetDistribution: DatasetDistribution[];
  whoIndicators: WhoIndicator[];
  trendSeries: TrendSeries[];
  regionInterest: RegionInterest[];
  topicPopularity: TopicPopularity[];
  youtubeTopics: YouTubeTopic[];
  sentimentBreakdown: SentimentBreakdown[];
  lastUpdated: string;
}

export interface ApiError {
  error: string;
  message: string;
  status: number;
}

export type ApiResponse<T> = T | ApiError;
