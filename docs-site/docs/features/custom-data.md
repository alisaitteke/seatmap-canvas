# Custom Data

Attach custom data to seats for business logic.

## Usage

```javascript
const seat = {
  id: 1,
  title: "A1",
  x: 0,
  y: 0,
  salable: true,
  custom_data: {
    price: 50.00,
    currency: "USD",
    category: "VIP",
    row: "A",
    section: "Orchestra"
  }
};
```

## Accessing Custom Data

```javascript
seatmap.addEventListener("seat_click", (seat) => {
  const price = seat.item.custom_data.price;
  const category = seat.item.custom_data.category;
  
  console.log(`Selected ${category} seat for $${price}`);
});
```

See [Data Structure](/docs/getting-started/data-structure) for more information.
