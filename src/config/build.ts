import { commerce } from './commerce';

export const buildInfo = {
  commit: process.env.COMMIT_SHA || process.env.GITHUB_SHA || process.env.COMMIT_REF || 'local',
  builtAt: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
  environment: process.env.CONTEXT || process.env.NODE_ENV || 'development',
  commerceRevision: commerce.dataRevision,
  contentRevision: process.env.CONTENT_REVISION || '2026-07-14',
} as const;
