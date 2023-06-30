/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/strict',
  ],
  parserOptions: { project: require.resolve('./tsconfig.json') },
  rules: {
    'max-len': ['error', { code: 120, ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
  },
  ignorePatterns: ['/types/'],
};
