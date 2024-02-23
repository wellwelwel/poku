import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { navbarLocalePlugin } from './plugins/locale.js';

const config: Config = {
  title: 'Poku',
  url: 'https://poku.dev/',
  baseUrl: '/',
  organizationName: 'wellwelwel',
  projectName: 'poku',
  trailingSlash: false,
  favicon: 'img/silhouette.svg',

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
        googleTagManager: {
          containerId: 'GTM-K554VSWG',
        },
        gtag: {
          trackingID: 'G-3EXQWTDQSK',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social.png',
    navbar: {
      logo: {
        alt: 'This is Poku',
        src: 'img/silhouette-light.svg',
        // srcDark: 'img/silhouette-dark.svg',
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
      ],
    },
    prism: {
      theme: prismThemes.dracula,
      additionalLanguages: ['bash', 'sql', 'diff'],
    },
    colorMode: {
      defaultMode: 'dark',
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    'docusaurus-plugin-sass',
    '@easyops-cn/docusaurus-search-local',
    navbarLocalePlugin,
  ],
};

export default config;
