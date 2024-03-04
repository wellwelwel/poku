import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { navbarLocalePlugin } from './plugins/locale.js';

const config: Config = {
  title: 'Poku',
  url: 'https://poku.io/',
  baseUrl: '/',
  organizationName: 'wellwelwel',
  projectName: 'poku',
  trailingSlash: false,
  favicon: 'favicon.ico',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR'],
    localeConfigs: {
      en: {
        label: '🇺🇸 English',
      },
      'pt-BR': {
        label: '🇧🇷 Português (Brasil)',
      },
    },
  },

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/wellwelwel/poku/tree/main/website/',
        },
        theme: {
          customCss: './src/css/custom.scss',
        },
        blog: false,
        // googleTagManager: {
        //   containerId: '',
        // },
        // gtag: {
        //   trackingID: '',
        //   anonymizeIP: true,
        // },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content:
          'Poku, PokuJS, Test Runner, Node.js, Bun, Deno, TypeScript, Parallel Runs, Sequential Runs, Assertion Errors, ESM, CJS, CLI Usage, API Usage, No Config, Documentation, GitHub, Compatibility, No Constraints, Individual Process, Lightweight, Mocha, Jest, Ava, Tap, Tape, Karma, Vitest',
      },
    ],
    image: 'img/social.png',
    navbar: {
      logo: {
        alt: 'This is Poku',
        src: 'img/silhouette-light.svg',
      },
      items: [
        {
          to: '/docs/category/documentation',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/wellwelwel/poku',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub Repository',
        },
        {
          href: 'https://github.com/sponsors/wellwelwel',
          position: 'right',
          className: 'header-sponsor-link',
          'aria-label': 'GitHub Sponsor',
        },
        { type: 'search', position: 'right' },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'diff'],
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    algolia: {
      appId: '8W3D1A9OL6',
      apiKey: '7e1ef3de299364cedc6f3240f7f00063',
      indexName: 'poku',
      searchPagePath: false,
      contextualSearch: false,
    },
  } satisfies Preset.ThemeConfig,

  plugins: ['docusaurus-plugin-sass', navbarLocalePlugin],
};

export default config;
