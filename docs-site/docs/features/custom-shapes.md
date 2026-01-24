# Custom Shapes

Use circles, rectangles, paths, and SVGs.

## Available Shapes

### Circle (Default)

```javascript
style: {
  seat: {
    shape: "circle",
    radius: 12
  }
}
```

### Rectangle

```javascript
style: {
  seat: {
    shape: "rect",
    size: 24,
    corner_radius: 6
  }
}
```

### Custom Path

```javascript
style: {
  seat: {
    shape: "path",
    path: "M12 0L24 12L12 24L0 12Z",  // Diamond
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

See [Seat Style](/docs/api/seat-style) for complete options.
