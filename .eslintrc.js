module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native'],
  rules: {
    // Customize rules here
    'react/prop-types': 'off', // We're using TypeScript for prop validation
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    'react-native/no-inline-styles': 'off', // Temporarily disable inline styles warning
    'react-native/no-color-literals': 'off', // Temporarily disable color literals warning
    'react-native/no-raw-text': 'off', // Temporarily disable raw text warning
    'react-native/sort-styles': 'off', // Temporarily disable style sorting warning
    '@typescript-eslint/no-explicit-any': 'off', // Temporarily disable any type warning
    '@typescript-eslint/no-unused-vars': 'off', // Temporarily disable unused vars warning
    'no-console': 'off', // Temporarily disable console warning
    'react-hooks/exhaustive-deps': 'off', // Temporarily disable exhaustive deps warning
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    'react-native/react-native': true,
  },
  ignorePatterns: ['node_modules/', 'babel.config.js', 'metro.config.js', '*.config.js'],
};
