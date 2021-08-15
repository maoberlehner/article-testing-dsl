import * as cypressDriver from './test/cypress/driver';
import * as jestDriver from './test/jest/driver';

declare global {
  let driver: typeof cypressDriver|typeof jestDriver;
}
