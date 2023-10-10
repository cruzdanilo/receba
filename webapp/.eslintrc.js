/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [require.resolve('./tsconfig.json'), require.resolve('./tsconfig.dev.json')],
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/strict',
    'next/core-web-vitals',
  ],
  rules: {
    'max-len': ['error', { code: 120, ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
    '@typescript-eslint/no-shadow': 'error',
    'eslint-comments/no-unused-disable': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
  },
  overrides: [
    { files: ['e2e/**/*'], extends: ['plugin:playwright/recommended'] },
    { files: ['*.config.js'], rules: { '@typescript-eslint/no-var-requires': 'off' } },
  ],
  ignorePatterns: ['/app/contracts.ts'],
};
