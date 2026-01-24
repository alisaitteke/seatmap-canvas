# Label Style Options

Complete reference for label styling options.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `color` | `string` | `"#000"` | Text color |
| `radius` | `number` | `12` | Label circle radius |
| `font_size` | `string` | `"12px"` | Font size for label text |
| `background` | `string` | `"#ffffff"` | Background color |

## Example

```javascript
style: {
  label: {
    color: "#333",
    radius: 14,
    font_size: "13px",
    background: "#f5f5f5"
  }
}
```

## Usage

Labels are defined in block data:

```javascript
{
  blocks: [{
    id: 1,
    title: "Section A",
    labels: [
      { title: "Row 1", x: -40, y: 0 },
      { title: "Row 2", x: -40, y: 40 }
    ],
    seats: [...]
  }]
}
```
