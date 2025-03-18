module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'off',
  },
};