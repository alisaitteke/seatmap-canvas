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

## License

MIT - Copyright (c) 2024 Ali Sait TEKE

## Links

- [GitHub Repository](https://github.com/alisaitteke/seatmap-canvas)
- [Documentation](https://github.com/alisaitteke/seatmap-canvas)
- [Report Issues](https://github.com/alisaitteke/seatmap-canvas/issues)
