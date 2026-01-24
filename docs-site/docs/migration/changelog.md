# Changelog

View the complete changelog and migration guides.

## Latest Version

Current version: **2.6.1**

## Recent Updates

### Unreleased

#### Features
- Custom seat shape support (circle, rectangle, path, SVG)
- Interactive hit areas for improved UX
- Modern tooltip design with auto-sizing
- Global and per-block background images
- SVG file upload with automatic path extraction
- Modern booking UI in demo

See the complete [CHANGELOG.md](https://github.com/alisaitteke/seatmap-canvas/blob/master/CHANGELOG.md) on GitHub.

## Migration Guides

All recent changes are backward compatible. Existing configurations continue to work without modifications.

### To Use New Features

**Custom Shapes:**
```javascript
style: {
  seat: {
    shape: "rect",  // or "path", "svg"
    size: 24
  }
}
```

**Background Images:**
```javascript
{
  background_image: "path/to/image.jpg",
  background_opacity: 0.3
}
```
