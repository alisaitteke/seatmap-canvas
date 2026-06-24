---
title: Stadium Seat Map JavaScript — Use Case Guide
description: Build stadium seat maps with JavaScript. Open-source Seatmap Canvas handles thousands of seats, section zoom, and seat selection for sports venues.
keywords: [stadium seat map javascript, stadium seating chart, sports venue seat selection]
---

*Last updated: June 2026*

**Seatmap Canvas** is an open-source JavaScript library for stadium seat maps: render sections and individual seats from JSON, zoom from venue overview to seat level, and handle selection events for ticketing flows. It scales to large venues with D3.js SVG rendering.

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas
```

[Live stadium demo](https://seatmap.io/demo) · [GitHub](https://github.com/alisaitteke/seatmap-canvas) · [Example source](/examples/stadium)

## Why use a JavaScript library for stadium seating?

Stadiums have thousands of seats across multiple sections. A dedicated library provides:

- **Three-level zoom** — venue → block → seat (built into Seatmap Canvas)
- **Block organization** — group seats by stand, tier, or gate
- **Custom styling** — team colors, sold/unavailable states, accessibility notes
- **Framework wrappers** — React, Vue, Next.js for modern ticketing apps

## Minimal stadium block example

```javascript
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

const seatmap = new SeatMapCanvas('.seatmap-container', { resizable: true });

seatmap.data.replaceData([
  {
    id: 'north-stand',
    title: 'North Stand',
    color: '#2563eb',
    seats: [
      { id: 'N-1-01', x: 0, y: 0, title: 'N-1-01', salable: true },
      { id: 'N-1-02', x: 36, y: 0, title: 'N-1-02', salable: true },
    ],
  },
]);

seatmap.eventManager.addEventListener('SEAT.CLICK', (seat) => {
  console.log('Selected:', seat.id);
});
```

## Integration checklist for stadium ticketing

1. Export seat coordinates from your venue designer or CAD tool into `BlockData` JSON.
2. Map `salable: false` for holds, season tickets, or ADA blocks.
3. On checkout, POST selected seat IDs to your inventory service.
4. Refresh availability with `replaceData()` after payment timeout.

Data model reference: [Data Structure](/getting-started/data-structure).

## React integration

For React ticketing dashboards, use the official wrapper:

```tsx
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/react';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
```

Details: [React seat map component](/frameworks/react).

## Related

- [Stadium example](/examples/stadium)
- [Theater booking](/seo/use-cases/theater-booking)
- [Ticketing platforms](/seo/use-cases/ticketing-platforms)
