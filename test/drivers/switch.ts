import * as cypressDriver from './cypress';
import * as jestDriver from './jest';

const isJest = process.env.JEST_WORKER_ID !== undefined;
export const driver = isJest ? jestDriver : cypressDriver;
