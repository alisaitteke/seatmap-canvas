# Data Model

Root data structure for the entire seatmap.

## Structure

```typescript
interface DataModel {
  blocks: BlockModel[];
}
```

## Example

```json
{
  "blocks": [
    {
      "id": "orchestra",
      "title": "Orchestra",
      "color": "#2c3e50",
      "seats": [
        { "id": "A1", "x": 0, "y": 0, "title": "A1", "salable": true },
        { "id": "A2", "x": 30, "y": 0, "title": "A2", "salable": true }
      ]
    },
    {
      "id": "balcony",
      "title": "Balcony",
      "color": "#34495e",
      "seats": [
        { "id": "B1", "x": 0, "y": 0, "title": "B1", "salable": true }
      ]
    }
  ]
}
```

## Usage

```javascript
const data = {
  blocks: [
    // ... your blocks
  ]
};

seatmap.setData(data);
```

## Complete Example

See [Data Structure Guide](/docs/getting-started/data-structure) for detailed examples.
