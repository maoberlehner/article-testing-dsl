// TODO weg?
module.exports = {
  plugins: [
    `cypress`,
  ],
  extends: [
    `plugin:cypress/recommended`,
  ],
  env: {
    "cypress/globals": true,
  },
};
