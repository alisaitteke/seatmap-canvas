# Block Model

Data structure for seat blocks/sections.

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `id` | `string \| number` | ✅ | - | Unique identifier |
| `title` | `string` | ✅ | - | Display name |
| `color` | `string` | ❌ | `"#2c2828"` | Block color |
| `seats` | `SeatModel[]` | ✅ | - | Array of seats |
| `labels` | `LabelModel[]` | ❌ | `[]` | Array of labels |
| `background_image` | `string` | ❌ | - | Background image URL |
| `background_opacity` | `number` | ❌ | `0.3` | Opacity (0-1) |
| `background_fit` | `string` | ❌ | `"cover"` | Fit mode |

## Example

```json
{
  "id": 1,
  "title": "VIP Section",
  "color": "#ff6b6b",
  "background_image": "vip-section.jpg",
  "labels": [
    { "title": "Row A", "x": -30, "y": 0 }
  ],
  "seats": [
    { "id": 1, "x": 0, "y": 0, "title": "A1", "salable": true }
  ]
}
```

## TypeScript

```typescript
interface BlockData {
  id: string | number;
  title: string;
  color?: string;
  seats: SeatData[];
  labels?: LabelData[];
  background_image?: string;
  background_opacity?: number;
  background_fit?: 'cover' | 'contain' | 'fill' | 'none';
}
```
