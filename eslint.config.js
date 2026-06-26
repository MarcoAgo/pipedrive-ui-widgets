import eslintJs from '@eslint/js';
import eslintTsPlugin from '@typescript-eslint/eslint-plugin';
import eslintTsParser from '@typescript-eslint/parser';
import eslintImportPlugin from 'eslint-plugin-import';
import eslintJsdocPlugin from 'eslint-plugin-jsdoc';
import eslintJsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintNodePlugin from 'eslint-plugin-n';
import eslintReactPlugin from 'eslint-plugin-react';
import eslintReactHooksPlugin from 'eslint-plugin-react-hooks';
import eslintReactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        vi: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
  },
  eslintJs.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: eslintTsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      jsdoc: eslintJsdocPlugin,
      '@typescript-eslint': eslintTsPlugin,
      react: eslintReactPlugin,
      'react-hooks': eslintReactHooksPlugin,
      'react-refresh': eslintReactRefreshPlugin,
      'jsx-a11y': eslintJsxA11yPlugin,
      import: eslintImportPlugin,
      n: eslintNodePlugin,
    },
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
    rules: {
      ...eslintJsdocPlugin.configs.recommended.rules,
      ...eslintTsPlugin.configs.recommended.rules,
      ...eslintReactPlugin.configs.recommended.rules,
      ...eslintReactHooksPlugin.configs.recommended.rules,
      ...eslintJsxA11yPlugin.configs.recommended.rules,

      'no-console': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      eqeqeq: ['error', 'always'],
      'no-param-reassign': 'error',
      'no-nested-ternary': 'error',
      'object-shorthand': 'error',
      'no-underscore-dangle': 'error',

      'import/no-duplicates': 'error',
      'import/no-deprecated': 'error',

      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-check': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/require-param-type': 'off',
      'jsdoc/no-multi-asterisks': 'off',

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-shadow': 'error',

      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'off',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
