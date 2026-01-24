# Seat Events

Events related to seat interactions.

## Available Events

### SEAT.CLICK

Fired when a seat is clicked.

```javascript
seatmap.addEventListener("seat_click", (seat) => {
  console.log('Clicked:', seat.item.title);
});
```

### SEAT.SELECT

Fired when a seat is selected.

```javascript
seatmap.addEventListener("seat_select", (seat) => {
  console.log('Selected:', seat.item.title);
  updateCart();
});
```

### SEAT.UNSELECT

Fired when a seat is unselected.

```javascript
seatmap.addEventListener("seat_unselect", (seat) => {
  console.log('Unselected:', seat.item.title);
  updateCart();
});
```

## Event Object

Each event callback receives a seat object with:

- `item` - Seat data (id, title, x, y, salable, custom_data, etc.)
- `block` - Parent block reference
- `select()` - Select the seat
- `unSelect()` - Unselect the seat
- `isSelected()` - Check if selected

## Complete Example

```javascript
seatmap.addEventListener("seat_click", (seat) => {
  if (!seat.item.salable) {
    alert('This seat is not available');
    return;
  }
  
  if (seat.isSelected()) {
    seat.unSelect();
  } else {
    seat.select();
  }
});

seatmap.addEventListener("seat_select", (seat) => {
  const price = seat.item.custom_data.price;
  addToCart(seat.item.id, seat.item.title, price);
});

seatmap.addEventListener("seat_unselect", (seat) => {
  removeFromCart(seat.item.id);
});
```
