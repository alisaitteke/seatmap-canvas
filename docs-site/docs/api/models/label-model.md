# Label Model

Data structure for text labels within blocks. Labels are used to display row numbers, section names, or other text indicators on the seatmap.

## Hierarchy

LabelModel sits within the BlockModel alongside seats:

```
DataModel
└── blocks[]           (array of BlockModel)
    ├── seats[]        (array of SeatModel)
    └── labels[]       (array of LabelModel) ← You are here
```

- **[DataModel](./data-model)**: Root model
- **[BlockModel](./block-model)**: Parent block model
- **[SeatModel](./seat-model)**: Sibling model (seats in the same block)

**Full hierarchy example:**

```json
{
  "blocks": [
    {
      "id": "orchestra",
      "title": "Orchestra",
      "color": "#2c3e50",              // ← BlockModel properties
      "seats": [                        // ← seats array (sibling to labels)
        {
          "id": "A1",
          "x": 0,
          "y": 0,
          "title": "A1",
          "salable": true
        }
      ],
      "labels": [                       // ← labels array (LabelModel[])
        {                               // ← YOU ARE HERE
          "title": "Row A",
          "x": -50,
          "y": 0
        },
        {
          "title": "Aisle →",
          "x": 200,
          "y": 15
        }
      ]
    }
  ]
}
```

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | Label text to display |
| `x` | `number` | ✅ | - | X coordinate position |
| `y` | `number` | ✅ | - | Y coordinate position |

## Use Cases

Labels are typically used for:

- **Row markers**: "A", "B", "C", "Row 1", "Row 2"
- **Section indicators**: "VIP", "General Admission", "Balcony"
- **Aisle markers**: "Aisle 1", "Exit A"
- **Directional guides**: "Stage", "Screen", "Field"

## Example

Simple row label:

```json
{
  "title": "Row A",
  "x": -50,
  "y": 0
}
```

Multiple labels in a block:

```json
{
  "id": "section-a",
  "title": "Section A",
  "color": "#2c3e50",
  "labels": [
    { "title": "Row 1", "x": -40, "y": 0 },
    { "title": "Row 2", "x": -40, "y": 30 },
    { "title": "Row 3", "x": -40, "y": 60 },
    { "title": "Aisle →", "x": 200, "y": 30 }
  ],
  "seats": [
    { "id": "A1", "x": 0, "y": 0, "title": "A1" },
    { "id": "A2", "x": 30, "y": 0, "title": "A2" }
  ]
}
```

## TypeScript

```typescript
interface LabelData {
  title: string;
  x: number;
  y: number;
}
```

## Visual Rendering

Labels are rendered as text elements with a small circular background:
- Circle provides contrast against the background
- Text is centered within the circle
- Position is determined by x/y coordinates relative to the block

## Notes

- Labels are **optional** - blocks can have zero or more labels
- Labels are **visual only** - they don't affect seat selection or functionality
- Coordinates (x, y) are relative to the block's coordinate system
- Negative x values are commonly used to position labels to the left of seats
