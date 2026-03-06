# Data Model

Root data structure for the entire seatmap.

## Hierarchy

DataModel is the root object that contains everything:

```
DataModel ← You are here (ROOT)
└── blocks[]           (array of BlockModel)
    ├── seats[]        (array of SeatModel)
    └── labels[]       (array of LabelModel)
```

- **[BlockModel](./block-model)**: Seat blocks/sections
- **[SeatModel](./seat-model)**: Individual seats within blocks
- **[LabelModel](./label-model)**: Row/section text labels (optional)

**Complete hierarchy example:**

```json
{                                    // ← DataModel (ROOT)
  "blocks": [                        // ← blocks array
    {                                // ← BlockModel
      "id": "orchestra",
      "title": "Orchestra",
      "color": "#2c3e50",
      "seats": [                     // ← seats array
        {                            // ← SeatModel
          "id": "A1",
          "x": 0,
          "y": 0,
          "title": "A1",
          "salable": true
        }
      ],
      "labels": [                    // ← labels array
        {                            // ← LabelModel
          "title": "Row A",
          "x": -30,
          "y": 0
        }
      ]
    }
  ]
}
```

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

See [Data Structure Guide](/getting-started/data-structure) for detailed examples.
