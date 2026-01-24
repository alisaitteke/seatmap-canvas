# Block Methods

Methods and properties available on block objects.

## Properties

### Basic Properties

- `id` - Block identifier
- `title` - Block display name
- `color` - Block color
- `seats` - Array of seats in the block

## Usage

```javascript
// Access blocks
const blocks = seatmap.data.blocks;

// Iterate blocks
blocks.forEach(block => {
  console.log(block.title);
  console.log(`${block.seats.length} seats`);
});

// Find specific block
const block = blocks.find(b => b.id === 'block-1');
```

## Events

### Block Click

```javascript
seatmap.addEventListener("block_click", (block) => {
  console.log(`Clicked block: ${block.title}`);
  
  // Zoom to clicked block
  seatmap.zoomManager.zoomToBlock(block.id);
});
```
