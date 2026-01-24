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

  // Set the production url of your site here
  url: 'https://alisaitteke.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/seatmap-canvas/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'alisaitteke', // Usually your GitHub org/user name.
  projectName: 'seatmap-canvas', // Usually your repo name.

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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
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
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://alisaitteke.github.io/seatmap-canvas',
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
              to: '/docs/getting-started/installation',
            },
            {
              label: 'API Reference',
              to: '/docs/api/configuration',
            },
            {
              label: 'Examples',
              to: '/docs/examples/basic-usage',
            },
          ],
        },
        {
          title: 'Frameworks',
          items: [
            {
              label: 'Vanilla JavaScript',
              to: '/docs/frameworks/vanilla-js',
            },
            {
              label: 'React',
              to: '/docs/frameworks/react',
            },
            {
              label: 'Vue 3',
              to: '/docs/frameworks/vue',
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
              href: 'https://alisaitteke.github.io/seatmap-canvas',
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
