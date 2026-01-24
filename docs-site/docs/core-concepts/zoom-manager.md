# Zoom Manager

Control zoom levels and viewport navigation.

## Zoom Levels

1. **VENUE** - Overview of all blocks
2. **BLOCK** - Focused on specific block
3. **SEAT** - Individual seat view

## Methods

```javascript
// Zoom to venue (overview)
seatmap.zoomManager.zoomToVenue();

// Zoom to specific block
seatmap.zoomManager.zoomToBlock(blockId);

// Zoom to specific seat
seatmap.zoomManager.zoomToSeat(seatId, blockId);
```

For complete API, see [Zoom Events](/docs/api/events/zoom-events).
