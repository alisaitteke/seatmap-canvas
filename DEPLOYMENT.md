# GitHub Pages Deployment

This project uses a single GitHub Pages deployment that serves both the live demo and documentation.

## Structure

```
https://seatmap.io/
├── /                    → Documentation (Docusaurus)
└── /demo                → Live Demo
```

## URLs

- **Live Demo**: https://seatmap.io/demo
- **Documentation**: https://seatmap.io/docs

## Deployment Workflow

The `.github/workflows/static.yml` workflow automatically:

1. **Builds the library** (`npm run build`)
2. **Builds Docusaurus** (`cd docs-site && npm run build`)
3. **Combines outputs**:
   - Demo → `deploy/` (root)
   - Docs → `deploy/docs/`
4. **Deploys to GitHub Pages**

## Triggered By

- Push to `master` branch
- Manual workflow dispatch

## Local Development

### Demo (Examples)

```bash
npm run start:dev
# Opens at http://localhost:3002
```

### Documentation

```bash
npm run docs:dev
# Or directly:
cd docs-site
npm run start
# Opens at http://localhost:3000
```

## Build Locally

### Demo

```bash
npm run build
# Output: dist/
```

### Documentation

```bash
npm run docs:build
# Or directly:
cd docs-site
npm run build
# Output: docs-site/build/
```

## Manual Deployment

The workflow runs automatically, but you can trigger it manually:

1. Go to **Actions** tab on GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## Configuration

### Docusaurus BaseURL

The documentation is configured with:
- `url`: `https://seatmap.io`
- `baseUrl`: `/`

This ensures all links work correctly when served at the root.

### GitHub Pages Settings

Repository Settings → Pages:
- **Source**: GitHub Actions
- **Branch**: Not needed (using Actions)

## Troubleshooting

### Documentation 404 Errors

If you get 404 errors on documentation links:

1. Check `baseUrl` in `docs-site/docusaurus.config.ts`
2. Ensure it's set to `/seatmap-canvas/docs/`
3. Rebuild and redeploy

### Demo Not Loading Assets

If demo assets don't load:

1. Check file paths in `examples/index.html`
2. Ensure files are copied in workflow
3. Check deployment artifact structure

### Both Sites Not Deploying

1. Check workflow logs in Actions tab
2. Ensure both builds complete successfully
3. Verify `deploy/` folder structure in workflow logs

## File Structure

```
.
├── examples/              # Demo source
│   ├── index.html
│   ├── example.js
│   └── assets/
├── docs-site/            # Documentation source
│   ├── docs/
│   ├── src/
│   └── docusaurus.config.ts
├── .github/
│   └── workflows/
│       └── static.yml    # Deployment workflow
└── DEPLOYMENT.md         # This file
```
