import type { PrepareAction } from '../types';

export const PREPARE_ACTIONS = {
  get: `get`,
  post: `post`,
} as Record<PrepareAction, PrepareAction>;
