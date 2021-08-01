module.exports = {
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
};
