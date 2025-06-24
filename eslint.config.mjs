// @ts-check
import eslintJs from '@eslint/js';
import configHono from '@hono/eslint-config';
import configPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginTypeScript from 'typescript-eslint';

const config = [
  // Base
  {
    ignores: [
      '**/build/',
      '**/bin/',
      '**/dist/',
      '**/obj/',
      '**/out/',
      '**/.next/',
      '**/node_modules/',
    ],
  },

  // TypeScript
  {
    name: 'eslint/recommended',
    rules: eslintJs.configs.recommended.rules,
  },
  ...pluginTypeScript.configs.recommended,

  // React
  {
    name: 'react/jsx-runtime',
    plugins: {
      react: pluginReact,
    },
    rules: pluginReact.configs['jsx-runtime'].rules,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'react-hooks/recommended',
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },

  // Next.js
  {
    name: '@hono/eslint-config',
    ...configHono,
  },

  // Prettier
  {
    name: 'prettier/config',
    ...configPrettier,
  },

  // Project custom rules
  {
    name: 'project-custom',
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

export default config;
