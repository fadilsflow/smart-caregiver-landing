// Development fixture. The Vercel build replaces this module with a validated
// snapshot generated from MongoDB Atlas.
import {
  datasetDistribution,
  keyMetrics,
  notebookSummary,
  regionInterest,
  sentimentBreakdown,
  topicPopularity,
  trendSeries,
  whoIndicators,
  youtubeTopics,
} from './dummy-dashboard';

export default {
  schemaVersion: 1,
  generatedAt: null,
  batchId: 'development-fixture',
  freshness: {},
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
