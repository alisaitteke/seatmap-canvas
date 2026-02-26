# Quick Start

Create your first seatmap in minutes.

## Basic Example

Here's a complete example to get you started:

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seatmap Canvas Demo</title>
    <link rel="stylesheet" href="https://unpkg.com/@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css">
</head>
<body>
    <div class="seatmap-container" style="width: 100%; height: 600px;"></div>
    
    <script type="module">
        import { SeatmapCanvas } from 'https://unpkg.com/@alisaitteke/seatmap-canvas/dist/esm/seatmap.canvas.js';
        
        // Configuration
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
        
        // Initialize
        const seatmap = new SeatmapCanvas(".seatmap-container", config);
        
        // Data
        const data = {
            blocks: [
                {
                    id: 1,
                    title: "Section A",
                    color: "#2c2828",
                    seats: [
                        { id: 1, x: 0, y: 0, title: "A1", salable: true },
                        { id: 2, x: 30, y: 0, title: "A2", salable: true },
                        { id: 3, x: 60, y: 0, title: "A3", salable: true }
                    ]
                }
            ]
        };
        
        // Set data
        seatmap.setData(data);
        
        // Handle seat clicks
        seatmap.addEventListener("seat_click", (seat) => {
            if (seat.selected) {
                seatmap.seatUnselect(seat);
            } else {
                seatmap.seatSelect(seat);
            }
        });
    </script>
</body>
</html>
```

## Framework-Specific Quick Starts

### React Quick Start

```tsx
import React from 'react';
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/react';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

function App() {
  const options = {
    legend: true,
    style: {
      seat: {
        hover: '#8fe100',
        selected: '#8fe100',
      }
    }
  };

  const blocks = [
    {
      id: 1,
      title: "Section A",
      seats: [
        { id: 1, x: 0, y: 0, title: "A1", salable: true },
        { id: 2, x: 30, y: 0, title: "A2", salable: true },
      ]
    }
  ];

  const handleSeatClick = (seat: any) => {
    seat.isSelected() ? seat.unSelect() : seat.select();
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <SeatmapCanvas
        options={options}
        data={blocks}
        onSeatClick={handleSeatClick}
      />
    </div>
  );
}

export default App;
```

### Vue 3 Quick Start

**main.ts**

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import SeatmapCanvasPlugin from '@alisaitteke/seatmap-canvas/vue';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

const app = createApp(App);
app.use(SeatmapCanvasPlugin);
app.mount('#app');
```

**App.vue**

```vue
<template>
  <div style="width: 100%; height: 600px;">
    <SeatmapCanvas
      :options="seatmapOptions"
      :data="blocks"
      @seat-click="onSeatClick"
    />
  </div>
</template>

<script setup lang="ts">
const seatmapOptions = {
  legend: true,
  style: {
    seat: {
      hover: '#8fe100',
      selected: '#8fe100',
    }
  }
};

const blocks = [
  {
    id: 1,
    title: "Section A",
    seats: [
      { id: 1, x: 0, y: 0, title: "A1", salable: true },
      { id: 2, x: 30, y: 0, title: "A2", salable: true },
    ]
  }
];

const onSeatClick = (seat: any) => {
  seat.isSelected() ? seat.unSelect() : seat.select();
};
</script>
```

## Configuration Options

Here are some common configuration options:

```javascript
const config = {
  // Enable/disable resizing
  resizable: true,
  
  // Show legend
  legend: true,
  
  // Seat styling
  style: {
    seat: {
      radius: 12,
      color: "#6796ff",
      hover: "#5671ff",
      selected: "#56aa45",
      not_salable: "#424747"
    },
    block: {
      fill: "#e2e2e2",
      stroke: "#e2e2e2"
    },
    label: {
      color: "#000",
      radius: 12,
      fontSize: "12px",
      background: "#ffffff"
    }
  },
  
  // Background image (optional)
  background_image: "path/to/background.jpg",
  background_opacity: 0.3,
  background_fit: "cover"
};
```

## Next Steps

Now that you have a basic setup running, explore more features:

- **Data Structure**: Learn about [seat and block models](/getting-started/data-structure)
- **Styling**: Customize [colors, shapes, and styles](/features/styling)
- **Events**: Handle [user interactions](/core-concepts/event-system)
- **Advanced Features**: Add [background images](/features/background-images) and [custom shapes](/features/custom-shapes)

## Live Examples

Check out our [live demo](https://alisaitteke.github.io/seatmap-canvas) to see Seatmap Canvas in action!

## Need Help?

- Browse our [examples](/examples/basic-usage)
- Check the [API reference](/api/configuration)
- Visit [GitHub Issues](https://github.com/alisaitteke/seatmap-canvas/issues)
