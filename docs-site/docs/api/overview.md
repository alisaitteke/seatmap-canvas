# API Overview

Welcome to the Seatmap Canvas API reference. This section provides detailed documentation for all configuration options, methods, events, and models.

## Quick Navigation

### Configuration
- [Configuration Options](/docs/api/configuration) - Main configuration object
- [Seat Styling](/docs/api/seat-style) - Seat appearance options
- [Block Styling](/docs/api/block-style) - Block appearance options
- [Label Styling](/docs/api/label-style) - Label appearance options

### Methods
- [Seatmap Methods](/docs/api/methods/seatmap-methods) - Instance methods
- [Seat Methods](/docs/api/methods/seat-methods) - Seat manipulation
- [Block Methods](/docs/api/methods/block-methods) - Block operations

### Events
- [Seat Events](/docs/api/events/seat-events) - Seat interaction events
- [Block Events](/docs/api/events/block-events) - Block interaction events
- [Zoom Events](/docs/api/events/zoom-events) - Zoom level changes

### Models
- [Seat Model](/docs/api/models/seat-model) - Seat data structure
- [Block Model](/docs/api/models/block-model) - Block data structure
- [Data Model](/docs/api/models/data-model) - Root data structure

## Core Concepts

### Instance Creation

```javascript
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas';

const seatmap = new SeatmapCanvas(selector, options);
```

### Data Loading

```javascript
const data = {
  blocks: [
    {
      id: 1,
      title: "Section A",
      seats: [...]
    }
  ]
};

seatmap.setData(data);
```

### Event Handling

```javascript
seatmap.addEventListener("seat_click", (seat) => {
  // Handle seat click
});
```

## TypeScript Support

Seatmap Canvas includes full TypeScript definitions:

```typescript
import type {
  SeatmapOptions,
  BlockData,
  SeatData,
  DataModel
} from '@alisaitteke/seatmap-canvas';
```

## Architecture

```
SeatMapCanvas (Main Class)
├── EventManager - Handles all events
├── WindowManager - Window resize handling
├── ZoomManager - Zoom and pan controls
├── DataModel - Data management
│   └── BlockModel[] - Seat blocks
│       └── SeatModel[] - Individual seats
└── Svg - D3.js rendering
    ├── Stage - Main stage area
    ├── Legend - Legend component
    └── Tooltip - Hover tooltips
```

## Common Patterns

### Seat Selection

```javascript
// Select a seat
seatmap.addEventListener("seat_click", (seat) => {
  if (seat.item.salable) {
    if (seat.isSelected()) {
      seat.unSelect();
    } else {
      seat.select();
    }
  }
});
```

### Get Selected Seats

```javascript
const selectedSeats = seatmap.getSelectedSeats();
console.log(`Selected ${selectedSeats.length} seats`);
```

### Zoom Control

```javascript
// Zoom to venue view
seatmap.zoomManager.zoomToVenue();

// Zoom to specific block
seatmap.zoomManager.zoomToBlock(blockId);

// Zoom to specific seat
seatmap.zoomManager.zoomToSeat(seatId, blockId);
```

### Dynamic Data Updates

```javascript
// Update seat availability
const seat = seatmap.data.blocks[0].seats[0];
seat.salable = false;

// Refresh the seatmap
seatmap.refresh();
```

## Best Practices

### Performance

- Use reasonable seat counts (< 10,000 seats for optimal performance)
- Optimize background images (< 500KB recommended)
- Leverage event delegation instead of individual listeners

### Data Management

- Always provide unique IDs for seats and blocks
- Use `custom_data` for business logic
- Keep coordinates as integers for pixel-perfect positioning

### Event Handling

- Use the centralized `EventManager` for communication
- Clean up event listeners when destroying instances
- Leverage built-in events instead of DOM events

### TypeScript

- Use provided type definitions for better IDE support
- Extend types for custom data structures
- Enable strict mode for type safety

## Next Steps

- Explore [Configuration Options](/docs/api/configuration)
- Learn about [Event System](/docs/core-concepts/event-system)
- Check [Examples](/docs/examples/basic-usage)
