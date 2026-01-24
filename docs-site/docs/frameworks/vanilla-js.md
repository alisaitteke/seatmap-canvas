# Vanilla JavaScript

Use Seatmap Canvas with vanilla JavaScript.

## Installation

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas
```

Or use CDN:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css">

<!-- JavaScript (UMD) -->
<script src="https://unpkg.com/@alisaitteke/seatmap-canvas/dist/cjs/seatmap.canvas.js"></script>

<!-- Or ESM -->
<script type="module">
  import { SeatmapCanvas } from 'https://unpkg.com/@alisaitteke/seatmap-canvas/dist/esm/seatmap.canvas.js';
</script>
```

## Basic Usage

### HTML Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seatmap Canvas</title>
    <link rel="stylesheet" href="path/to/seatmap.canvas.css">
</head>
<body>
    <div class="seatmap-container" style="width: 100%; height: 600px;"></div>
    
    <script src="path/to/seatmap.canvas.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

### JavaScript (app.js)

```javascript
// Configuration
const config = {
    resizable: true,
    style: {
        seat: {
            radius: 12,
            color: "#6796ff",
            hover: "#5671ff",
            not_salable: "#424747",
            selected: "#56aa45",
        },
        block: {
            fill: "#e2e2e2",
            stroke: "#e2e2e2"
        },
        label: {
            color: "#000",
            radius: 12,
            font_size: "12px",
            background: "#ffffff"
        }
    }
};

// Initialize
const seatmap = new SeatmapCanvas(".seatmap-container", config);

// Define data
const data = {
    blocks: [
        {
            id: 1,
            title: "Section A",
            color: "#2c2828",
            seats: [
                {
                    id: 1,
                    x: 0,
                    y: 0,
                    salable: true,
                    title: "A1"
                },
                {
                    id: 2,
                    x: 30,
                    y: 0,
                    salable: true,
                    title: "A2"
                }
            ]
        }
    ]
};

// Load data
seatmap.setData(data);

// Handle seat clicks
seatmap.addEventListener("seat_click", (seat) => {
    if (seat.selected) {
        seatmap.seatUnselect(seat);
    } else {
        seatmap.seatSelect(seat);
    }
});
```

## Using ES Modules

```javascript
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

const config = {
    resizable: true,
    style: {
        seat: {
            radius: 12,
            color: "#6796ff",
            hover: "#5671ff",
            selected: "#56aa45"
        }
    }
};

const seatmap = new SeatmapCanvas(".container", config);
seatmap.setData(data);
```

## Configuration Options

### Basic Configuration

```javascript
const config = {
    // Enable container resizing
    resizable: true,
    
    // Show legend
    legend: true,
    
    // Allow clicking on unavailable seats
    click_enable_sold_seats: false,
    
    // Global background image
    background_image: "assets/stadium.jpg",
    background_opacity: 0.3,
    background_fit: "cover",
    
    // Styling
    style: {
        seat: {
            radius: 12,
            color: "#6796ff",
            hover: "#5671ff",
            selected: "#56aa45",
            not_salable: "#424747",
            focus: "#435fa4"
        },
        block: {
            fill: "#e2e2e2",
            stroke: "#e2e2e2"
        },
        label: {
            color: "#000",
            radius: 12,
            font_size: "12px",
            background: "#ffffff"
        }
    }
};
```

## Event Handling

### Available Events

```javascript
// Seat click
seatmap.addEventListener("seat_click", (seat) => {
    console.log("Seat clicked:", seat);
});

// Seat select
seatmap.addEventListener("seat_select", (seat) => {
    console.log("Seat selected:", seat);
});

// Seat unselect
seatmap.addEventListener("seat_unselect", (seat) => {
    console.log("Seat unselected:", seat);
});

// Block click
seatmap.addEventListener("block_click", (block) => {
    console.log("Block clicked:", block);
});
```

## Methods

### Data Methods

```javascript
// Set data
seatmap.setData(data);

// Get all blocks
const blocks = seatmap.data.blocks;

// Get selected seats
const selected = seatmap.getSelectedSeats();
```

### Seat Methods

```javascript
// Select a seat
seatmap.seatSelect(seat);

// Unselect a seat
seatmap.seatUnselect(seat);

// Get seat by ID
const seat = seatmap.data.blocks[0].seats.find(s => s.id === 1);
```

### Zoom Methods

```javascript
// Zoom to venue view
seatmap.zoomManager.zoomToVenue();

// Zoom to a specific block
seatmap.zoomManager.zoomToBlock(blockId);

// Zoom to seat view
seatmap.zoomManager.zoomToSeat(seatId, blockId);
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stadium Seatmap</title>
    <link rel="stylesheet" href="https://unpkg.com/@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css">
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .container {
            padding: 20px;
        }
        .controls {
            margin-bottom: 20px;
            display: flex;
            gap: 10px;
        }
        button {
            padding: 10px 20px;
            cursor: pointer;
        }
        .seatmap-container {
            width: 100%;
            height: 600px;
            border: 1px solid #ddd;
        }
        .selected-info {
            margin-top: 20px;
            padding: 15px;
            background: #f5f5f5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Stadium Seatmap</h1>
        
        <div class="controls">
            <button onclick="zoomToVenue()">Zoom Out</button>
            <button onclick="zoomToBlock('block-1')">Zoom to Block 1</button>
            <button onclick="getSelected()">Show Selected</button>
        </div>
        
        <div class="seatmap-container"></div>
        
        <div class="selected-info">
            <h3>Selected Seats: <span id="count">0</span></h3>
            <ul id="selected-list"></ul>
        </div>
    </div>

    <script type="module">
        import { SeatmapCanvas } from 'https://unpkg.com/@alisaitteke/seatmap-canvas/dist/esm/seatmap.canvas.js';
        
        const config = {
            resizable: true,
            legend: true,
            style: {
                seat: {
                    radius: 12,
                    color: "#6796ff",
                    hover: "#5671ff",
                    selected: "#56aa45",
                    not_salable: "#424747"
                }
            }
        };
        
        const seatmap = new SeatmapCanvas(".seatmap-container", config);
        
        const data = {
            blocks: [
                {
                    id: 'block-1',
                    title: 'Block A',
                    color: '#2c2828',
                    seats: Array.from({ length: 20 }, (_, i) => ({
                        id: `seat-${i}`,
                        title: `A${i + 1}`,
                        x: (i % 5) * 30,
                        y: Math.floor(i / 5) * 30,
                        salable: true,
                        custom_data: {
                            price: 50,
                            row: Math.floor(i / 5) + 1,
                            seat: (i % 5) + 1
                        }
                    }))
                },
                {
                    id: 'block-2',
                    title: 'Block B',
                    color: '#3d3939',
                    seats: Array.from({ length: 20 }, (_, i) => ({
                        id: `seat-b-${i}`,
                        title: `B${i + 1}`,
                        x: (i % 5) * 30 + 200,
                        y: Math.floor(i / 5) * 30,
                        salable: true,
                        custom_data: {
                            price: 40,
                            row: Math.floor(i / 5) + 1,
                            seat: (i % 5) + 1
                        }
                    }))
                }
            ]
        };
        
        seatmap.setData(data);
        
        // Event handlers
        seatmap.addEventListener("seat_click", (seat) => {
            if (seat.selected) {
                seatmap.seatUnselect(seat);
            } else {
                seatmap.seatSelect(seat);
            }
            updateSelectedInfo();
        });
        
        // Global functions for buttons
        window.zoomToVenue = () => {
            seatmap.zoomManager.zoomToVenue();
        };
        
        window.zoomToBlock = (blockId) => {
            seatmap.zoomManager.zoomToBlock(blockId);
        };
        
        window.getSelected = () => {
            updateSelectedInfo();
            alert(`Selected ${seatmap.getSelectedSeats().length} seats`);
        };
        
        function updateSelectedInfo() {
            const selected = seatmap.getSelectedSeats();
            document.getElementById('count').textContent = selected.length;
            
            const list = document.getElementById('selected-list');
            list.innerHTML = '';
            
            selected.forEach(seat => {
                const li = document.createElement('li');
                li.textContent = `${seat.title} - $${seat.custom_data.price}`;
                list.appendChild(li);
            });
        }
    </script>
</body>
</html>
```

## Custom Shapes

```javascript
const config = {
    style: {
        seat: {
            // Rectangle
            shape: "rect",
            size: 24,
            corner_radius: 6,
            
            // Or custom path
            shape: "path",
            path: "M12 0L24 12L12 24L0 12Z",
            path_box: "0 0 24 24",
            size: 24,
            
            // Or SVG file
            shape: "svg",
            svg: "/assets/custom-seat.svg",
            radius: 12
        }
    }
};
```

## Background Images

### Global Background

```javascript
const config = {
    background_image: "assets/stadium.jpg",
    background_opacity: 0.3,
    background_fit: "cover",  // cover | contain | fill | none
    
    // Optional manual positioning
    background_x: -500,
    background_y: -500,
    background_width: 3000,
    background_height: 2500
};
```

### Block Background

```javascript
const data = {
    blocks: [
        {
            id: 1,
            title: "VIP Section",
            background_image: "assets/vip-section.jpg",
            background_opacity: 0.6,
            background_fit: "cover",
            seats: [...]
        }
    ]
};
```

## Next Steps

- Explore [API Reference](/docs/api/configuration)
- Check out [Examples](/docs/examples/basic-usage)
- Learn about [Events](/docs/api/events/seat-events)
