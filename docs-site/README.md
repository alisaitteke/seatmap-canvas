# Seatmap Canvas Documentation Site

This directory contains the Docusaurus documentation site for Seatmap Canvas.

## Development

### Prerequisites

- Node.js 20.0 or higher
- npm

### Installation

```bash
cd docs-site
npm install
```

### Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Serve (Test Build)

```bash
npm run serve
```

Serves the production build locally for testing.

## Structure

```
docs-site/
├── docs/                  # Documentation markdown files
│   ├── getting-started/   # Installation and quick start
│   ├── frameworks/        # Framework-specific guides
│   ├── core-concepts/     # Architecture and concepts
│   ├── features/          # Feature documentation
│   ├── examples/          # Usage examples
│   ├── advanced/          # Advanced topics
│   ├── api/              # API reference
│   │   ├── methods/      # Method documentation
│   │   ├── events/       # Event documentation
│   │   └── models/       # Data model documentation
│   └── migration/        # Migration guides
├── blog/                  # Blog posts
├── src/                   # Custom React components
│   ├── components/       # Homepage features
│   ├── css/              # Custom CSS
│   └── pages/            # Custom pages
├── static/               # Static assets
│   └── img/              # Images
├── docusaurus.config.ts  # Docusaurus configuration
├── sidebars.ts           # Sidebar configuration
└── package.json          # Dependencies

```

## i18n (Internationalization)

The site supports multiple languages:

- English (default)
- Spanish (es)
- Turkish (tr)

To add translations:

```bash
# Extract translatable strings
npm run write-translations -- --locale es

# Add translations to i18n/es/
```

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the `master` branch.

The deployment workflow is defined in `.github/workflows/docs.yml`.

### Manual Deployment

```bash
# Build the site
npm run build

# Deploy to GitHub Pages (if using docusaurus deploy command)
npm run deploy
```

## Contributing

When adding new documentation:

1. Create markdown files in the appropriate `docs/` subdirectory
2. Update `sidebars.ts` if adding new sections
3. Use proper frontmatter for metadata
4. Include code examples where appropriate
5. Test locally before committing

## License

MIT - Copyright (c) 2024 Ali Sait TEKE
