# Block Events

Events related to block interactions.

## BLOCK.CLICK

Fired when a block is clicked.

```javascript
seatmap.addEventListener("block_click", (block) => {
  console.log(`Clicked block: ${block.title}`);
  
  // Zoom to clicked block
  seatmap.zoomManager.zoomToBlock(block.id);
});
```

## Event Object

The block object contains:

- `id` - Block identifier
- `title` - Block display name
- `color` - Block color
- `seats` - Array of seats in the block

## Example: Block Navigation

```javascript
seatmap.addEventListener("block_click", (block) => {
  // Show block info
  showBlockInfo({
    title: block.title,
    totalSeats: block.seats.length,
    availableSeats: block.seats.filter(s => s.salable).length
  });
  
  // Zoom to block
  seatmap.zoomManager.zoomToBlock(block.id);
});
```
