# Block Style Options

Complete reference for block styling options.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fill` | `string` | `"#e2e2e2"` | Fill color for block background |
| `stroke` | `string` | `"#e2e2e2"` | Stroke color for block border |
| `stroke_width` | `number` | `1` | Border width in pixels |
| `title_color` | `string` | `"#000"` | Color for block title text |
| `title_font_size` | `string` | `"14px"` | Font size for block title |

## Example

```javascript
style: {
  block: {
    fill: "#e2e2e2",
    stroke: "#cccccc",
    stroke_width: 2,
    title_color: "#333",
    title_font_size: "16px"
  }
}
```

## Background Images

When a background image is set for a block, the fill and stroke are automatically hidden.

```javascript
{
  blocks: [{
    id: 1,
    background_image: "section.jpg",
    // fill and stroke will be hidden
    seats: [...]
  }]
}
```
