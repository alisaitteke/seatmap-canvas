import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Seatmap Canvas',
  tagline: 'Interactive Seat Selection Library for Stadiums, Theaters, and Event Spaces',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here (custom domain)
  url: 'https://seatmap.io',
  // Docs at site root; demo is under /demo (static.yml)
  baseUrl: '/',

  // GitHub pages deployment config (deploy branch may differ in GH Actions)
  organizationName: 'alisaitteke',
  projectName: 'seatmap-canvas',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      }
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // docs at site root (e.g. /intro/, /getting-started/...)
          editUrl:
            'https://github.com/alisaitteke/seatmap-canvas/tree/master/docs-site/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: ['./plugins/posthog.js'],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/seatmap-social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Seatmap Canvas',
      logo: {
        alt: 'Seatmap Canvas Logo',
        src: 'img/seatmap-logo-small.png',
        srcDark: 'img/seatmap-logo-small.png',
        "width": 62,
        "height": 32,
        style: { borderRadius: '4px' },
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          href: 'https://seatmap.io/demo',
          label: 'Live Demo',
          position: 'right',
        },
        {
          href: 'https://github.com/alisaitteke/seatmap-canvas',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started/installation',
            },
            {
              label: 'API Reference',
              to: '/api/configuration',
            },
            {
              label: 'Examples',
              to: '/examples/basic-usage',
            },
          ],
        },
        {
          title: 'Integration',
          items: [
            {
              label: 'Vanilla JavaScript',
              to: '/frameworks/vanilla-js',
            },
            {
              label: 'React',
              to: '/frameworks/react',
            },
            {
              label: 'Vue 3',
              to: '/frameworks/vue',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/alisaitteke/seatmap-canvas/issues',
            },
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/package/@alisaitteke/seatmap-canvas',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Live Demo',
              href: 'https://seatmap.io/demo',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/alisaitteke/seatmap-canvas',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ali Sait Teke. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
