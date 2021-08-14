import path from 'path';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { startDevServer } from '@cypress/vite-dev-server';

import 'cypress-watch-and-reload/plugins';

module.exports = (on, config) => {
  let bundler = createBundler({
    define: {
      global: `window`,
    },
  });
  on(`file:preprocessor`, bundler);

  on(`dev-server:start`, options => startDevServer({
    options,
    viteConfig: {
      configFile: path.resolve(__dirname, `..`, `..`, `vite.config.ts`),
    },
  }));

  return config;
};
