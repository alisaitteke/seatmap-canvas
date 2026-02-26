# Installation

Install Seatmap Canvas in your project.

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **Package Manager**: npm, yarn, or pnpm

## NPM Installation

Install the package using your preferred package manager:

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas
```

## Framework-Specific Installation

### Vanilla JavaScript

For vanilla JavaScript projects, simply install the core package:

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas
```

Then import in your JavaScript file:

```javascript
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
```

Or use a CDN:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css">

<!-- JavaScript -->
<script src="https://unpkg.com/@alisaitteke/seatmap-canvas/dist/cjs/seatmap.canvas.js"></script>
```

### React

Install the core package (React wrapper is included):

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas
```

:::info
React 18.0.0 or higher is required.
:::

### Vue 3

Install the core package (Vue wrapper is included):

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas
```

:::info
Vue 3.3.0 or higher is required.
:::

## Package Contents

After installation, you'll have access to:

- **Core Library**: `@alisaitteke/seatmap-canvas`
- **React Components**: `@alisaitteke/seatmap-canvas/react`
- **Vue 3 Components**: `@alisaitteke/seatmap-canvas/vue`
- **TypeScript Types**: Included in the package
- **CSS Styles**: `dist/seatmap.canvas.css`

## Build Outputs

The package includes multiple build formats:

- **CommonJS**: `dist/cjs/seatmap.canvas.js`
- **ESM**: `dist/esm/seatmap.canvas.js`
- **TypeScript Definitions**: `dist/types.d.ts`

## Next Steps

Now that you have Seatmap Canvas installed, you can:

- Follow the [Quick Start Guide](/getting-started/quick-start)
- Learn about [Data Structure](/getting-started/data-structure)
- Choose your framework: [Vanilla JS](/frameworks/vanilla-js) | [React](/frameworks/react) | [Vue](/frameworks/vue)

## Troubleshooting

### TypeScript Errors

If you encounter TypeScript errors, make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### CSS Not Loading

Make sure to import the CSS file in your application:

```javascript
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
```

For more help, visit our [GitHub Issues](https://github.com/alisaitteke/seatmap-canvas/issues).
