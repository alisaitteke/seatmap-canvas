# Seatmap Canvas - Vue.js Plugin

Vue.js plugin for **Seatmap Canvas**, an advanced interactive seat selection library.

## Installation

```bash
npm install @alisaitteke/seatmap-canvas
```

## Usage

### 1. Global Registration (Recommended)

Register the plugin globally in your Vue app:

```typescript
// main.ts or main.js
import { createApp } from 'vue';
import App from './App.vue';
import SeatmapCanvasPlugin from '@alisaitteke/seatmap-canvas/vue';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

const app = createApp(App);

app.use(SeatmapCanvasPlugin, {
  // Optional: Global default options
  defaultOptions: {
    legend: true,
    style: {
      seat: {
        hover: '#8fe100',
        color: '#f0f7fa',
        selected: '#8fe100',
      }
    }
  }
});

app.mount('#app');
```

### 2. Component Usage

#### Basic Example

```vue
<template>
  <div class="seatmap-container">
    <SeatmapCanvas
      :options="seatmapOptions"
      :data="seatmapData"
      @ready="onSeatmapReady"
      @seat-click="onSeatClick"
      container-class="w-full h-full"
      :container-style="{ minHeight: '600px' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SeatmapOptions, BlockData } from '@alisaitteke/seatmap-canvas/vue';

const seatmapOptions = ref<SeatmapOptions>({
  legend: true,
  style: {
    seat: {
      hover: '#8fe100',
      color: '#f0f7fa',
      selected: '#8fe100',
      check_icon_color: '#fff',
      not_salable: '#0088d3',
      focus: '#8fe100',
    },
    legend: {
      font_color: '#3b3b3b',
      show: false
    },
    block: {
      title_color: '#fff'
    }
  }
});

const seatmapData = ref<BlockData[]>([
  {
    id: 'block-1',
    title: 'Block A',
    color: '#01a5ff',
    seats: [
      {
        id: 'seat-1',
        x: 50,
        y: 50,
        salable: true,
        title: 'A1',
        custom_data: {
          price: 50,
          row: 1,
          seat: 1
        }
      },
      // Add more seats...
    ]
  }
]);

const onSeatmapReady = (instance: any) => {
  console.log('Seatmap ready!', instance);
};

const onSeatClick = (seat: any) => {
  if (!seat.isSelected() && seat.item.salable === true) {
    seat.select();
  } else {
    seat.unSelect();
  }
};
</script>

<style scoped>
.seatmap-container {
  width: 100%;
  height: 600px;
  position: relative;
}
</style>
```

### 3. Composable Usage (Advanced)

For more control, use the `useSeatmap` composable:

```vue
<template>
  <div>
    <div ref="containerRef" class="seatmap-container"></div>
    <div class="controls">
      <button @click="zoomToVenue">Zoom to Venue</button>
      <button @click="zoomToBlock('block-1')">Zoom to Block 1</button>
      <div>Selected Seats: {{ selectedSeats.length }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSeatmap } from '@alisaitteke/seatmap-canvas/vue';

const containerRef = ref<HTMLElement | null>(null);

const {
  seatmapInstance,
  isReady,
  selectedSeats,
  init,
  loadData,
  zoomToBlock,
  zoomToVenue,
  addEventListener
} = useSeatmap();

onMounted(() => {
  if (containerRef.value) {
    init(containerRef.value, {
      legend: true,
      style: {
        seat: {
          hover: '#8fe100',
          color: '#f0f7fa',
          selected: '#8fe100',
        }
      }
    });

    // Load data
    loadData([
      {
        id: 'block-1',
        title: 'Block A',
        color: '#01a5ff',
        seats: [
          {
            id: 'seat-1',
            x: 50,
            y: 50,
            salable: true,
            title: 'A1'
          }
        ]
      }
    ]);

    // Add event listeners
    addEventListener('SEAT.CLICK', (seat: any) => {
      console.log('Seat clicked:', seat);
      if (seat.item.salable) {
        if (!seat.isSelected()) {
          seat.select();
        } else {
          seat.unSelect();
        }
      }
    });
  }
});
</script>

<style scoped>
.seatmap-container {
  width: 100%;
  height: 600px;
}
.controls {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
```

### 4. Local Component Import

If you don't want to register globally:

```vue
<script setup lang="ts">
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/vue';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
</script>

<template>
  <SeatmapCanvas :options="options" :data="data" />
</template>
```

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SeatmapOptions` | `{}` | Seatmap configuration options |
| `data` | `BlockData[]` | `[]` | Array of blocks with seats |
| `containerClass` | `string` | `''` | CSS class for container |
| `containerStyle` | `object` | `{}` | Inline styles for container |
| `autoZoomToVenue` | `boolean` | `true` | Auto zoom to venue after data load |

### Component Events

| Event | Payload | Description |
|-------|---------|-------------|
| `ready` | `SeatMapCanvas` | Fired when seatmap is initialized |
| `seatClick` | `Seat` | Fired when a seat is clicked |
| `seatSelect` | `Seat` | Fired when a seat is selected |
| `seatUnselect` | `Seat` | Fired when a seat is unselected |
| `blockClick` | `Block` | Fired when a block is clicked |
| `dataChange` | `BlockData[]` | Fired when data changes |

### Composable Methods

| Method | Parameters | Return | Description |
|--------|-----------|--------|-------------|
| `init` | `container, options` | `void` | Initialize seatmap |
| `loadData` | `data: BlockData[]` | `void` | Load seat data |
| `getSelectedSeats` | - | `Seat[]` | Get all selected seats |
| `getSeat` | `seatId, blockId` | `Seat` | Get specific seat |
| `getBlocks` | - | `Block[]` | Get all blocks |
| `zoomToBlock` | `blockId: string` | `void` | Zoom to specific block |
| `zoomToVenue` | - | `void` | Zoom out to venue view |
| `addEventListener` | `event, callback` | `void` | Add event listener |
| `destroy` | - | `void` | Cleanup instance |

## TypeScript Support

This plugin is written in TypeScript and includes full type definitions.

```typescript
import type {
  SeatmapOptions,
  BlockData,
  SeatData,
  SeatClickEvent
} from '@alisaitteke/seatmap-canvas/vue';
```

## Examples

Check the `/examples/vue` directory for complete examples:

- Basic seat selection
- Custom styling
- Dynamic data loading
- Event handling
- Zoom controls

## Custom Seat Shapes

### Using Custom Shapes

```vue
<template>
  <SeatmapCanvas :options="options" :data="blocks" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = ref({
  style: {
    seat: {
      shape: "rect",        // circle | rect | path | svg
      size: 24,
      corner_radius: 6,
      color: "#6796ff",
      hover: "#5671ff",
      selected: "#56aa45"
    }
  }
});
</script>
```

### Available Shapes

**Circle** (Default)
```typescript
options: {
  style: { seat: { shape: "circle", radius: 12 } }
}
```

**Rectangle**
```typescript
options: {
  style: { seat: { shape: "rect", size: 24, corner_radius: 4 } }
}
```

**Custom Path**
```typescript
options: {
  style: {
    seat: {
      shape: "path",
      path: "M12 0L24 12L12 24L0 12Z",  // Diamond
      path_box: "0 0 24 24",
      size: 24
    }
  }
}
```

**External SVG**
```typescript
options: {
  style: {
    seat: {
      shape: "svg",
      svg: "/assets/custom-seat.svg",
      radius: 12
    }
  }
}
```

### Preparing Your SVG Files

**Option 1: Extract Path from SVG**

1. Open your SVG in a text editor
2. Find the `<path d="...">` element
3. Copy the path data and viewBox:

```vue
<script setup lang="ts">
const options = ref({
  style: {
    seat: {
      shape: "path",
      path: "M12 21.35l-1.45-1.32C5.4 15.36...",  // from d attribute
      path_box: "0 0 24 24",  // from viewBox attribute
      size: 24
    }
  }
});
</script>
```

**Option 2: Use SVG File Directly**

Place SVG in your `public` folder and reference it:

```vue
<script setup lang="ts">
const options = ref({
  style: {
    seat: {
      shape: "svg",
      svg: "/icons/custom-seat.svg",
      radius: 12
    }
  }
});
</script>
```

**Supported SVG Elements:**
- `<path>` - Used directly
- `<polygon>`, `<polyline>` - Auto-converted to path
- `<rect>`, `<circle>` - Auto-converted to path
- Multiple paths - Automatically combined

**Best Practices:**
- Use square viewBox (e.g., "0 0 24 24") for consistent sizing
- Keep SVG simple (< 10KB) for better performance
- Use monochrome SVGs (fill color controlled by library)
- Export from design tools with "Outline Stroke" option

### Predefined Shapes

```typescript
// Triangle
{ shape: "path", path: "M12 0L24 24H0Z", path_box: "0 0 24 24" }

// Diamond
{ shape: "path", path: "M12 0L24 12L12 24L0 12Z", path_box: "0 0 24 24" }

// Star
{ shape: "path", path: "M12 0L15 9L24 9L17 15L20 24L12 18L4 24L7 15L0 9L9 9Z", path_box: "0 0 24 24" }
```

## Modern Tooltips

### Customizing Tooltips

```vue
<script setup lang="ts">
const options = ref({
  style: {
    tooltip: {
      bg: "#ffffff",
      color: "#1f2937",
      border_radius: 10,
      padding: 14,
      font_size: "14px",
      font_weight: "600",
      line_height: 20,
      shadow: "0 8px 24px rgba(0,0,0,0.2)",
      text_align: "center",
      width: 160
      // Height auto-adjusts to content
    }
  }
});
</script>
```

**Features:**
- Auto-sizing height based on content
- Centered text alignment
- Modern shadow effects
- Configurable padding and spacing
- Custom fonts and colors

## License

MIT - Copyright (c) 2024 Ali Sait TEKE

## Links

- [GitHub Repository](https://github.com/alisaitteke/seatmap-canvas)
- [Documentation](https://github.com/alisaitteke/seatmap-canvas)
- [Report Issues](https://github.com/alisaitteke/seatmap-canvas/issues)
