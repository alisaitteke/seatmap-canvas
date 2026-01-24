# Configuration Options

Complete reference for Seatmap Canvas configuration options.

## Basic Configuration

```javascript
const config = {
  resizable: true,
  legend: true,
  click_enable_sold_seats: false,
  background_image: "path/to/image.jpg",
  background_opacity: 0.3,
  background_fit: "cover",
  style: {
    seat: { /* Seat styling options */ },
    block: { /* Block styling options */ },
    label: { /* Label styling options */ },
    legend: { /* Legend styling options */ },
    tooltip: { /* Tooltip styling options */ }
  }
};
```

## Root Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `resizable` | `boolean` | `true` | Enable/disable container resizing |
| `legend` | `boolean` | `false` | Show/hide legend |
| `click_enable_sold_seats` | `boolean` | `false` | Allow clicking on unavailable seats |

## Background Options

### Global Background

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `background_image` | `string` | - | URL to background image |
| `background_opacity` | `number` | `0.3` | Image opacity (0-1) |
| `background_fit` | `string` | `"cover"` | How image fits: `cover`, `contain`, `fill`, `none` |
| `background_x` | `number` | auto | Manual X position (optional) |
| `background_y` | `number` | auto | Manual Y position (optional) |
| `background_width` | `number` | auto | Manual width (optional) |
| `background_height` | `number` | auto | Manual height (optional) |

### Examples

**Cover (default)**
```javascript
{
  background_image: "stadium.jpg",
  background_fit: "cover",  // Image covers entire area, may crop
  background_opacity: 0.3
}
```

**Contain**
```javascript
{
  background_image: "stadium.jpg",
  background_fit: "contain",  // Image fits inside area, preserves aspect ratio
  background_opacity: 0.5
}
```

**Manual Positioning**
```javascript
{
  background_image: "stadium.jpg",
  background_x: -500,
  background_y: -300,
  background_width: 3000,
  background_height: 2500,
  background_opacity: 0.4
}
```

## Style Configuration

The `style` object contains styling options for different components.

### Seat Style

See [Seat Style Reference](/docs/api/seat-style) for complete options.

```javascript
style: {
  seat: {
    // Shape
    shape: "circle",  // circle | rect | path | svg
    radius: 12,       // For circles and SVGs
    size: 24,         // For rectangles and paths
    corner_radius: 6, // For rectangles
    
    // Colors
    color: "#6796ff",
    hover: "#5671ff",
    selected: "#56aa45",
    not_salable: "#424747",
    focus: "#435fa4",
    
    // Custom shapes
    path: "M12 0L24 12L12 24L0 12Z",
    path_box: "0 0 24 24",
    svg: "/assets/custom-seat.svg"
  }
}
```

### Block Style

See [Block Style Reference](/docs/api/block-style) for complete options.

```javascript
style: {
  block: {
    fill: "#e2e2e2",
    stroke: "#e2e2e2",
    stroke_width: 1,
    title_color: "#000",
    title_font_size: "14px"
  }
}
```

### Label Style

See [Label Style Reference](/docs/api/label-style) for complete options.

```javascript
style: {
  label: {
    color: "#000",
    radius: 12,
    font_size: "12px",
    background: "#ffffff"
  }
}
```

### Legend Style

```javascript
style: {
  legend: {
    show: true,
    font_color: "#3b3b3b",
    font_size: "12px"
  }
}
```

### Tooltip Style

```javascript
style: {
  tooltip: {
    bg: "#ffffff",
    color: "#1f2937",
    border_radius: 10,
    padding: 14,
    font_size: "14px",
    font_weight: "600",
    line_height: 20,
    shadow: "0 8px 24px rgba(0,0,0,0.2)",
    text_align: "center",
    width: 160
  }
}
```

## Complete Example

```javascript
const config = {
  // Root options
  resizable: true,
  legend: true,
  click_enable_sold_seats: false,
  
  // Global background
  background_image: "assets/stadium-overview.jpg",
  background_opacity: 0.3,
  background_fit: "cover",
  
  // Styling
  style: {
    seat: {
      shape: "circle",
      radius: 12,
      color: "#6796ff",
      hover: "#5671ff",
      selected: "#56aa45",
      not_salable: "#424747",
      focus: "#435fa4",
      focus_out: "#56aa45"
    },
    block: {
      fill: "#e2e2e2",
      stroke: "#e2e2e2",
      stroke_width: 1,
      title_color: "#000",
      title_font_size: "14px"
    },
    label: {
      color: "#000",
      radius: 12,
      font_size: "12px",
      background: "#ffffff"
    },
    legend: {
      show: true,
      font_color: "#3b3b3b",
      font_size: "12px"
    },
    tooltip: {
      bg: "#ffffff",
      color: "#1f2937",
      border_radius: 10,
      padding: 14,
      font_size: "14px",
      font_weight: "600",
      shadow: "0 8px 24px rgba(0,0,0,0.2)"
    }
  }
};

const seatmap = new SeatmapCanvas(".container", config);
```

## TypeScript

```typescript
import type { SeatmapOptions } from '@alisaitteke/seatmap-canvas';

const config: SeatmapOptions = {
  resizable: true,
  legend: true,
  style: {
    seat: {
      radius: 12,
      color: "#6796ff"
    }
  }
};
```

## Next Steps

- [Seat Style Options](/docs/api/seat-style)
- [Block Style Options](/docs/api/block-style)
- [Label Style Options](/docs/api/label-style)
- [Complete Examples](/docs/examples/basic-usage)
