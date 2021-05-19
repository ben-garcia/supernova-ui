module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['node_modules/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Who needs unused variables
    '@typescript-eslint/no-unused-vars': ['error'],
    // This rule clashes with Next.js's <Link /> component
    'jsx-a11y/anchor-is-valid': 'off',
    // Use tsx extension
    'import/extensions': ['error', { extensions: ['.tsx'] }],
    // @testing-library/react @testing-library/js-dom as devDependencies
    'import/no-extraneous-dependencies': 0,
    // Types from @storybook/react/types-6-0
    'import/no-unresolved': 0,
    // import React from 'react'
    'import/prefer-default-export': 0,
    'no-use-before-define': 'off',
    // Includes .prettierrc.js rules
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    // jsx in files with .tsx since I am  using Typescript
    'react/jsx-filename-extension': 0,
    // Use spread syntax when passing props to components
    // e.g <Button {...props} />
    'react/jsx-props-no-spreading': 0,
    // Type checking provided by Typescript
    'react/prop-types': 0,
    // There is no need to import React when using Next.js
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts'],
      },
    },
  },
};
