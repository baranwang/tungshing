import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginImport from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig(
  eslintPluginPrettierRecommended,
  eslintPluginImport.flatConfigs.recommended,
  eslintPluginImport.flatConfigs.typescript,
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'plugin:import/recommended', 'plugin:import/typescript'],
  }),
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', disallowTypeAnnotations: false },
      ],
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      'import-x/order': [
        'error',
        {
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
            {
              pattern: '{react,react-dom,next,next/**,@next/**}',
              group: 'builtin',
            },
            {
              pattern: '{{@,.,..}/**/*.{css,scss,less},classnames}',
              group: 'type',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'unknown', ['internal', 'sibling', 'parent', 'index'], 'object', 'type'],
        },
      ],
    },
  },
);
