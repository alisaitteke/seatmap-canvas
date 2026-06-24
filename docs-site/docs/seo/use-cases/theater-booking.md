---
title: Theater Seating Chart Widget — Use Case Guide
description: Build theater seating chart widgets with JavaScript. Seatmap Canvas supports row labels, seat selection, and zoom for concerts, plays, and shows.
keywords: [theater seating chart widget, theater seat map, concert seat selection]
---

*Last updated: June 2026*

A **theater seating chart widget** lets audiences pick seats by row and number on a visual floor plan. **Seatmap Canvas** provides an open-source JavaScript widget with zoom, pan, custom labels, and click-to-select — suitable for theaters, concert halls, and cinemas.

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas
```

[Live demo](https://seatmap.io/demo) · [Theater example](/examples/theater) · [Installation](/getting-started/installation)

## What makes theater layouts different from stadiums?

Theater maps are usually smaller but denser: curved rows, orchestra vs balcony, and clear row/seat labels matter more than section-level overview. Seatmap Canvas supports:

- **Per-block labels** — "Orchestra", "Balcony Left"
- **Seat titles** — display row + seat number on hover or always-on
- **Custom shapes** — non-grid layouts for curved rows
- **Background images** — overlay seats on a venue floor plan

## Theater block with row labels

```javascript
seatmap.data.replaceData([
  {
    id: 'orchestra',
    title: 'Orchestra',
    labels: [{ text: 'Stage', x: 200, y: -40 }],
    seats: [
      { id: 'A-1', x: 0, y: 0, title: 'A-1', salable: true },
      { id: 'A-2', x: 32, y: 0, title: 'A-2', salable: false },
      { id: 'B-1', x: 0, y: 40, title: 'B-1', salable: true },
    ],
  },
]);
```

## Booking flow integration

1. Load the chart with current availability (`salable` per seat).
2. On `SEAT.CLICK`, hold the seat via your API (optimistic UI).
3. On timeout or abandon, set `salable: true` and call `replaceData()`.
4. Show price tiers via `custom_data` or seat `color`.

Event reference: [Seat events](/api/events/seat-events).

## Framework options

| Framework | Package path |
|-----------|--------------|
| React | `@alisaitteke/seatmap-canvas/react` |
| Vue 3 | `@alisaitteke/seatmap-canvas/vue` |
| Vanilla JS | `@alisaitteke/seatmap-canvas` |

[React guide](/frameworks/react) · [Vue guide](/frameworks/vue)

## Related

- [Stadium seating](/seo/use-cases/stadium-seating)
- [What is an interactive seat map?](/seo/what-is-interactive-seat-map)
- [FAQ](/seo/faq)
