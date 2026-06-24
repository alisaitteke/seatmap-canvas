---
title: Embed a Seat Map in Your Ticketing Platform
description: Integration patterns for embedding interactive seat maps in ticketing and event platforms. Open-source Seatmap Canvas with React, Vue, and REST-friendly JSON.
keywords: [embed seat map ticketing, ticketing platform seat selection, event ticketing javascript]
---

*Last updated: June 2026*

To **embed a seat map in a ticketing platform**, use a client-side library that accepts venue JSON, emits seat selection events, and refreshes availability without full page reloads. **Seatmap Canvas** (`@alisaitteke/seatmap-canvas`) is MIT-licensed, self-hosted, and ships React/Vue wrappers for SaaS checkout flows.

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas
```

[Demo](https://seatmap.io/demo) · [Data structure](/getting-started/data-structure) · [GitHub](https://github.com/alisaitteke/seatmap-canvas)

## Common integration architecture

```
┌─────────────┐     venue JSON      ┌──────────────────┐
│  Your API   │ ──────────────────► │  Seatmap Canvas  │
│  (inventory)│ ◄── seat holds ──── │  (browser widget) │
└─────────────┘                     └──────────────────┘
        │                                     │
        └────────── cart / checkout ──────────┘
```

1. **Bootstrap** — fetch `blocks[]` from your API; call `seatmap.data.replaceData(blocks)`.
2. **Select** — listen for `SEAT.CLICK`; call `POST /holds` with seat IDs.
3. **Sync** — WebSocket or polling pushes availability updates; merge into JSON and `replaceData()`.
4. **Checkout** — convert holds to orders; release on failure.

## Why open-source for ticketing SaaS?

| Benefit | Detail |
|---------|--------|
| No per-seat SaaS fees | You host the renderer |
| Full UI control | Match your brand and checkout |
| Portable JSON | Same chart works across web and kiosks |
| Framework choice | React, Vue, Angular, Next.js |

Compare with hosted alternatives: [seats.io alternative](/seo/alternatives/seats-io-alternative).

## React checkout snippet

```tsx
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/react';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

function CheckoutSeatPicker({ blocks, onSeatSelect }) {
  return (
    <SeatmapCanvas
      data={blocks}
      options={{ resizable: true }}
      onSeatClick={(seat) => onSeatSelect(seat)}
    />
  );
}
```

Full API: [React framework docs](/frameworks/react).

## JSON contract

Seatmap Canvas expects an array of blocks:

```json
{
  "id": 1,
  "title": "Section A",
  "seats": [
    { "id": "A1", "x": 0, "y": 0, "title": "A1", "salable": true }
  ]
}
```

Align your CMS or venue editor output with [BlockModel](/api/models/block-model) and [SeatModel](/api/models/seat-model).

## Related

- [Installation](/getting-started/installation)
- [Open-source libraries comparison](/seo/alternatives/open-source-seat-map-libraries)
- [FAQ](/seo/faq)
