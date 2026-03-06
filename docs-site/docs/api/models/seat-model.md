# Seat Model

Data structure for individual seats.

## Hierarchy

SeatModel sits within the BlockModel in the root DataModel:

```
DataModel
└── blocks[]           (array of BlockModel)
    ├── seats[]        (array of SeatModel) ← You are here
    └── labels[]       (array of LabelModel)
```

- **[DataModel](./data-model)**: Root model
- **[BlockModel](./block-model)**: Parent block model
- **[LabelModel](./label-model)**: Sibling model (labels in the same block)

**Full hierarchy example:**

```json
{
  "blocks": [
    {
      "id": "orchestra",
      "title": "Orchestra",
      "color": "#2c3e50",              // ← BlockModel properties
      "seats": [                        // ← seats array (SeatModel[])
        {                               // ← YOU ARE HERE
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
            "category": "premium"
          }
        }
      ],
      "labels": [                       // ← labels array (not related to seats)
        {
          "title": "Row A",
          "x": -50,
          "y": 0
        }
      ]
    }
  ]
}
```

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `id` | `string \| number` | ✅ | - | Unique identifier |
| `title` | `string` | ✅ | - | Display text (seat number) |
| `x` | `number` | ✅ | - | X coordinate |
| `y` | `number` | ✅ | - | Y coordinate |
| `salable` | `boolean` | ❌ | `true` | Can be selected |
| `selected` | `boolean` | ❌ | `false` | Currently selected |
| `note` | `string` | ❌ | - | Additional notes |
| `color` | `string` | ❌ | - | Custom color |
| `custom_data` | `object` | ❌ | - | Custom data |

## Example

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
    "row": "A"
  }
}
```

## TypeScript

```typescript
interface SeatData {
  id: string | number;
  title: string;
  x: number;
  y: number;
  salable?: boolean;
  selected?: boolean;
  note?: string;
  color?: string;
  custom_data?: Record<string, any>;
}
```
