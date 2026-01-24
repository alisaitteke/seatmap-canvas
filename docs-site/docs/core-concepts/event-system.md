# Event System

Learn about the event-driven architecture and how to handle user interactions.

## Overview

Seatmap Canvas uses a centralized event system powered by RxJS for reactive programming. All user interactions and state changes are communicated through events.

## Event Types

### Seat Events

- `SEAT.CLICK` - Fired when a seat is clicked
- `SEAT.SELECT` - Fired when a seat is selected
- `SEAT.UNSELECT` - Fired when a seat is unselected

### Block Events

- `BLOCK.CLICK` - Fired when a block is clicked

### System Events

- `READY` - Fired when seatmap is initialized
- `ZOOM_LEVEL_CHANGE` - Fired when zoom level changes

## Usage

```javascript
seatmap.addEventListener("seat_click", (seat) => {
  console.log('Seat clicked:', seat);
  
  if (seat.item.salable) {
    if (seat.isSelected()) {
      seat.unSelect();
    } else {
      seat.select();
    }
  }
});
```

For more details, see [Seat Events](/docs/api/events/seat-events) and [Block Events](/docs/api/events/block-events).
