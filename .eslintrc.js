module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:vue/vue3-recommended`,
    `@avalanche/eslint-config`,
  ],
  plugins: [
    `@typescript-eslint`,
    `prefer-let`,
  ],
  rules: {
    'no-unused-vars': `off`,
    '@typescript-eslint/no-unused-vars': [`error`],
    'class-methods-use-this': `off`,
    'prefer-let/prefer-let': `error`,
    'prefer-const': `off`,
    'import/no-extraneous-dependencies': [`error`, {
      devDependencies: true,
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'import/extensions': [
      `error`,
      `ignorePackages`,
      {
        mjs: `never`,
        js: `never`,
        jsx: `never`,
        ts: `never`,
        tsx: `never`,
      },
    ],
    'vue/one-component-per-file': `off`,
  },
  parserOptions: {
    parser: `@typescript-eslint/parser`,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          `.mjs`,
          `.js`,
          `.jsx`,
          `.ts`,
          `.tsx`,
          `json`,
        ],
      },
    },
    'import/extensions': [
      `.mjs`,
      `.js`,
      `.jsx`,
      `.ts`,
      `.tsx`,
    ],
  },
};
