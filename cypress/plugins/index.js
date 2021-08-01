const path = require(`path`);
const { startDevServer } = require(`@cypress/vite-dev-server`);
require(`cypress-watch-and-reload/plugins`);

module.exports = (on, config) => {
  on(`dev-server:start`, options => startDevServer({
    options,
    viteConfig: {
      configFile: path.resolve(__dirname, `..`, `..`, `vite.config.js`),
    },
  }));

  return config;
};
