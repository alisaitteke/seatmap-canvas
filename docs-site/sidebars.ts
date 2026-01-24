import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/data-structure',
      ],
    },
    {
      type: 'category',
      label: 'Frameworks',
      collapsed: false,
      items: [
        'frameworks/vanilla-js',
        'frameworks/react',
        'frameworks/vue',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'core-concepts/architecture',
        'core-concepts/event-system',
        'core-concepts/zoom-manager',
        'core-concepts/data-models',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/seat-selection',
        'features/custom-shapes',
        'features/background-images',
        'features/styling',
        'features/custom-data',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: false,
      items: [
        'examples/basic-usage',
        'examples/stadium',
        'examples/theater',
        'examples/event-space',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      collapsed: false,
      items: [
        'advanced/custom-parsers',
        'advanced/plugins',
        'advanced/performance',
      ],
    },
    {
      type: 'category',
      label: 'Migration',
      collapsed: true,
      items: [
        'migration/changelog',
      ],
    },
  ],
  apiSidebar: [
    'api/overview',
    {
      type: 'category',
      label: 'Configuration',
      collapsed: false,
      items: [
        'api/configuration',
        'api/seat-style',
        'api/block-style',
        'api/label-style',
      ],
    },
    {
      type: 'category',
      label: 'Methods',
      collapsed: false,
      items: [
        'api/methods/seatmap-methods',
        'api/methods/seat-methods',
        'api/methods/block-methods',
      ],
    },
    {
      type: 'category',
      label: 'Events',
      collapsed: false,
      items: [
        'api/events/seat-events',
        'api/events/block-events',
        'api/events/zoom-events',
      ],
    },
    {
      type: 'category',
      label: 'Models',
      collapsed: false,
      items: [
        'api/models/seat-model',
        'api/models/block-model',
        'api/models/data-model',
      ],
    },
  ],
};

export default sidebars;
