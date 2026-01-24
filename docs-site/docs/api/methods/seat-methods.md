# Seat Methods

Methods available on seat objects.

## Selection Methods

### `select()`

Select the seat.

```javascript
seat.select();
```

### `unSelect()`

Unselect the seat.

```javascript
seat.unSelect();
```

### `isSelected()`

Check if seat is selected.

```javascript
if (seat.isSelected()) {
  console.log('Seat is selected');
}
```

## Properties

### `item`

Access seat data.

```javascript
const seatData = seat.item;
console.log(seatData.id, seatData.title, seatData.salable);
```

### `block`

Access parent block.

```javascript
const blockTitle = seat.block.title;
```

## Example

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
