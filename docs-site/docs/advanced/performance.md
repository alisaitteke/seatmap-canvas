# Performance Optimization

Tips and best practices for optimal performance.

## Best Practices

### Seat Count

- Optimal: < 5,000 seats
- Maximum recommended: < 10,000 seats
- For larger venues, consider lazy loading or block-based rendering

### Background Images

- Optimize images (< 500KB recommended)
- Use appropriate formats (WebP for photos, SVG for diagrams)
- Consider using thumbnail images for overview

### Event Handling

- Use event delegation instead of individual listeners
- Debounce/throttle expensive operations
- Clean up listeners when destroying instances

### Data Updates

- Batch updates when possible
- Use `refresh()` sparingly
- Leverage D3.js data binding for efficient re-renders

## Performance Monitoring

```javascript
// Monitor render time
console.time('render');
seatmap.setData(data);
console.timeEnd('render');

// Monitor selection operations
console.time('select');
seat.select();
console.timeEnd('select');
```
