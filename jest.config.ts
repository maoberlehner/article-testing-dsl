import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleFileExtensions: [`js`, `ts`, `json`, `vue`],
  transform: {
    '\\.ts$': `ts-jest`,
    '^.+\\.vue$': `vue-jest`,
  },
  setupFiles: [require.resolve(`whatwg-fetch`)],
  setupFilesAfterEnv: [`./test/jest/setup-after-env.ts`],
  testEnvironment: `jest-environment-jsdom-global`,
};

export default config;
