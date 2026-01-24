# Zoom Events

Events related to zoom level changes.

## ZOOM_LEVEL_CHANGE

Fired when zoom level changes.

```javascript
seatmap.eventManager.on('ZOOM_LEVEL_CHANGE', (level) => {
  console.log('Zoom level:', level);
  // level: 'VENUE' | 'BLOCK' | 'SEAT'
});
```

## Zoom Levels

- **VENUE** - Overview of all blocks
- **BLOCK** - Focused on specific block
- **SEAT** - Individual seat view

## Zoom Methods

```javascript
// Zoom to venue view
seatmap.zoomManager.zoomToVenue();

// Zoom to specific block
seatmap.zoomManager.zoomToBlock(blockId);

// Zoom to specific seat
seatmap.zoomManager.zoomToSeat(seatId, blockId);
```

## Example: UI Updates on Zoom

```javascript
seatmap.eventManager.on('ZOOM_LEVEL_CHANGE', (level) => {
  if (level === 'VENUE') {
    showOverviewUI();
  } else if (level === 'BLOCK') {
    showBlockDetailsUI();
  } else if (level === 'SEAT') {
    showSeatDetailsUI();
  }
});
```
