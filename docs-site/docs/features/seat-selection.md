# Seat Selection

Handle seat selection and manage selected seats.

## Basic Selection

```javascript
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

## Get Selected Seats

```javascript
const selectedSeats = seatmap.getSelectedSeats();
console.log(`Selected ${selectedSeats.length} seats`);
```

See [Seat Methods](/api/methods/seat-methods) for complete API.
