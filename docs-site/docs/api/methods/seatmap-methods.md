# Seatmap Methods

Instance methods available on the SeatMapCanvas class.

## Data Methods

### `setData(data)`

Load seat map data.

```javascript
seatmap.setData({
  blocks: [...]
});
```

### `getSelectedSeats()`

Get all currently selected seats.

```javascript
const selected = seatmap.getSelectedSeats();
console.log(`Selected ${selected.length} seats`);
```

## Event Methods

### `addEventListener(event, callback)`

Add event listener.

```javascript
seatmap.addEventListener("seat_click", (seat) => {
  console.log('Seat clicked:', seat);
});
```

Available events: `seat_click`, `seat_select`, `seat_unselect`, `block_click`

## Properties

### `zoomManager`

Access the zoom manager.

```javascript
seatmap.zoomManager.zoomToVenue();
seatmap.zoomManager.zoomToBlock(blockId);
```

### `data`

Access the data model.

```javascript
const blocks = seatmap.data.blocks;
const seats = seatmap.data.blocks[0].seats;
```

### `eventManager`

Access the event manager.

```javascript
seatmap.eventManager.on('SEAT.CLICK', callback);
```
