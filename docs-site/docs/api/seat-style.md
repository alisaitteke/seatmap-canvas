# Seat Style Options

Complete reference for seat styling options.

## Basic Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `shape` | `string` | `"circle"` | Shape type: `circle`, `rect`, `path`, `svg` |
| `radius` | `number` | `12` | Radius for circles and SVGs |
| `size` | `number` | `24` | Size for rectangles and paths |
| `corner_radius` | `number` | `6` | Corner radius for rectangles |

## Colors

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `color` | `string` | `"#6796ff"` | Default seat color |
| `hover` | `string` | `"#5671ff"` | Hover state color |
| `selected` | `string` | `"#56aa45"` | Selected state color |
| `not_salable` | `string` | `"#424747"` | Unavailable seat color |
| `focus` | `string` | `"#435fa4"` | Focus state color |
| `check_icon_color` | `string` | `"#fff"` | Color of checkmark icon |

## Custom Shapes

### Path

| Property | Type | Description |
|----------|------|-------------|
| `path` | `string` | SVG path data (d attribute) |
| `path_box` | `string` | ViewBox for the path |
| `size` | `number` | Size of the shape |

### SVG File

| Property | Type | Description |
|----------|------|-------------|
| `svg` | `string` | URL to SVG file |
| `radius` | `number` | Size of the SVG |

## Examples

### Circle

```javascript
style: {
  seat: {
    shape: "circle",
    radius: 12,
    color: "#6796ff",
    hover: "#5671ff",
    selected: "#56aa45"
  }
}
```

### Rectangle

```javascript
style: {
  seat: {
    shape: "rect",
    size: 24,
    corner_radius: 6,
    color: "#6796ff"
  }
}
```

### Custom Path

```javascript
style: {
  seat: {
    shape: "path",
    path: "M12 0L24 12L12 24L0 12Z",
    path_box: "0 0 24 24",
    size: 24
  }
}
```

### SVG File

```javascript
style: {
  seat: {
    shape: "svg",
    svg: "/assets/custom-seat.svg",
    radius: 12
  }
}
```
