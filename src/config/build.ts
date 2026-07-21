import { commerce } from './commerce';
import seoRelease from './seo-release.json';

export const buildInfo = {
  commit: process.env.COMMIT_SHA || process.env.GITHUB_SHA || process.env.COMMIT_REF || 'local',
  builtAt: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
  environment: process.env.CONTEXT || process.env.NODE_ENV || 'development',
  commerceRevision: commerce.dataRevision,
  contentRevision: process.env.CONTENT_REVISION || seoRelease.lastSignificantUpdate,
} as const;
