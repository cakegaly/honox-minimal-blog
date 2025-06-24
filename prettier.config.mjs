/**
 * @type {import("prettier").Config}
 */
const config = {
  endOfLine: 'lf',
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',

  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(hono/(.*)$)|^(hono$)',
    '^(honox/(.*)$)|^(honox$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@/env(.*)$',
    '^@/types/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '',
    '^@/features/(.*)$',
    '^@/functions/(.*)$',
    '^@/components/shadcn-ui/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^@/app/(.*)$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx'],

  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
