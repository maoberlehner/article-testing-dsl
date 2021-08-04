import path from 'path';
import { nodeBuiltIns } from 'esbuild-node-builtins';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import textReplace from 'esbuild-plugin-text-replace';
import { startDevServer } from '@cypress/vite-dev-server';

import 'cypress-watch-and-reload/plugins';

module.exports = (on, config) => {
  let bundler = createBundler({
    plugins: [
      textReplace({
        // Prevent bundling Jest specific code. Most notably `.vue` files.
        include: /test\/drivers\/jest/,
        pattern: [
          [/.*/g, ``],
        ],
      }),
      nodeBuiltIns(),
    ],
    define: {
      global: `window`,
      process: JSON.stringify({ env: `cypress` }),
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
