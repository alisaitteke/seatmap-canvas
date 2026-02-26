# Data Structure

Learn the data models and their properties.

## Overview

Seatmap Canvas uses a hierarchical data structure:

```
DataModel
  └── BlockModel[]
        └── SeatModel[]
        └── LabelModel[]
```

## DataModel

The root data model that contains all blocks.

```typescript
interface DataModel {
  blocks: BlockModel[];
}
```

### Example

```json
{
  "blocks": [
    {
      "id": 1,
      "title": "Section A",
      "seats": [...]
    },
    {
      "id": 2,
      "title": "Section B",
      "seats": [...]
    }
  ]
}
```

## BlockModel

Represents a section or group of seats.

### Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `id` | `number \| string` | ✅ | - | Unique identifier for the block |
| `title` | `string` | ✅ | - | Display name of the block |
| `color` | `string` | ❌ | `"#2c2828"` | Block color (hex format) |
| `seats` | `SeatModel[]` | ✅ | - | Array of seats in this block |
| `labels` | `LabelModel[]` | ❌ | `[]` | Array of labels for the block |
| `background_image` | `string` | ❌ | - | Background image URL |
| `background_opacity` | `number` | ❌ | `0.3` | Background opacity (0-1) |
| `background_fit` | `string` | ❌ | `"cover"` | How image fits: `cover`, `contain`, `fill`, `none` |
| `background_x` | `number` | ❌ | auto | Manual X position |
| `background_y` | `number` | ❌ | auto | Manual Y position |
| `background_width` | `number` | ❌ | auto | Manual width |
| `background_height` | `number` | ❌ | auto | Manual height |

### Example

```json
{
  "id": 1,
  "title": "VIP Section",
  "color": "#ff6b6b",
  "background_image": "assets/vip-background.jpg",
  "background_opacity": 0.5,
  "labels": [
    { "title": "A", "x": -30, "y": 0 },
    { "title": "B", "x": 120, "y": 30 }
  ],
  "seats": [
    { "id": 1, "x": 0, "y": 0, "title": "A1", "salable": true },
    { "id": 2, "x": 30, "y": 0, "title": "A2", "salable": true }
  ]
}
```

## SeatModel

Represents an individual seat.

### Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `id` | `number \| string` | ✅ | - | Unique identifier for the seat |
| `title` | `string` | ✅ | - | Display text (seat number) |
| `x` | `number` | ✅ | - | X coordinate position |
| `y` | `number` | ✅ | - | Y coordinate position |
| `salable` | `boolean` | ❌ | `true` | Whether the seat can be selected |
| `selected` | `boolean` | ❌ | `false` | Whether the seat is selected |
| `note` | `string` | ❌ | - | Additional notes or description |
| `color` | `string` | ❌ | - | Custom seat color (hex format) |
| `custom_data` | `object` | ❌ | - | Any custom data you want to attach |

### Example

```json
{
  "id": 101,
  "title": "A1",
  "x": 100,
  "y": 200,
  "salable": true,
  "selected": false,
  "note": "Wheelchair accessible",
  "color": "#4CAF50",
  "custom_data": {
    "price": 50.00,
    "category": "premium",
    "row": "A",
    "section": "Orchestra"
  }
}
```

### Coordinate System

- Coordinates are in pixels
- Origin (0, 0) is typically at the top-left of the block
- Spacing between seats is usually 30-40 pixels

```javascript
// Example: Creating a row of 5 seats
const seats = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: `A${i + 1}`,
  x: i * 30,  // 30px spacing
  y: 0,
  salable: true
}));
```

## LabelModel

Represents a text label within a block.

### Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | Label text |
| `x` | `number` | ✅ | - | X coordinate position |
| `y` | `number` | ✅ | - | Y coordinate position |

### Example

```json
{
  "title": "Row A",
  "x": -50,
  "y": 0
}
```

## Complete Example

Here's a complete data structure example for a small theater:

```json
{
  "blocks": [
    {
      "id": "orchestra",
      "title": "Orchestra",
      "color": "#2c3e50",
      "background_image": "orchestra-view.jpg",
      "labels": [
        { "title": "Row A", "x": -40, "y": 0 },
        { "title": "Row B", "x": -40, "y": 40 }
      ],
      "seats": [
        {
          "id": "A1",
          "title": "A1",
          "x": 0,
          "y": 0,
          "salable": true,
          "custom_data": {
            "price": 100,
            "category": "premium"
          }
        },
        {
          "id": "A2",
          "title": "A2",
          "x": 30,
          "y": 0,
          "salable": true,
          "custom_data": {
            "price": 100,
            "category": "premium"
          }
        },
        {
          "id": "B1",
          "title": "B1",
          "x": 0,
          "y": 40,
          "salable": false,
          "note": "Reserved for staff",
          "custom_data": {
            "price": 80,
            "category": "standard"
          }
        }
      ]
    },
    {
      "id": "balcony",
      "title": "Balcony",
      "color": "#34495e",
      "seats": [
        {
          "id": "B1",
          "title": "B1",
          "x": 0,
          "y": 0,
          "salable": true,
          "custom_data": {
            "price": 50,
            "category": "economy"
          }
        }
      ]
    }
  ]
}
```

## Custom Data

The `custom_data` field allows you to attach any additional information to seats:

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
    section: "Orchestra",
    accessibility: {
      wheelchair: true,
      companion_seat: true
    },
    metadata: {
      lastUpdated: "2024-01-24",
      reserved_by: null
    }
  }
};
```

## Data Validation

:::tip Best Practices
- Always provide unique `id` values for seats and blocks
- Use consistent coordinate spacing for better visual layout
- Keep `x` and `y` coordinates as integers for pixel-perfect positioning
- Use meaningful `title` values for better UX
- Leverage `custom_data` for business logic (pricing, categories, etc.)
:::

## Next Steps

- Learn how to use data in [Vanilla JavaScript](/frameworks/vanilla-js)
- Explore [React integration](/frameworks/react)
- See [Vue 3 examples](/frameworks/vue)
- Check out [real-world examples](/examples/basic-usage)
