# Vue 3

Use Seatmap Canvas with Vue 3.

## Installation

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas
```

:::info Requirements
- Vue 3.3.0 or higher
- TypeScript support included
:::

## Global Registration (Recommended)

Register the plugin globally in your Vue app:

```typescript
// main.ts
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

## Component Usage

### Basic Example

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
      not_salable: '#0088d3',
    }
  }
});

const seatmapData = ref<BlockData[]>([
  {
    id: 'block-1',
    title: 'Section A',
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
      }
    ]
  }
]);

const onSeatmapReady = (instance: any) => {
  console.log('Seatmap ready!', instance);
};

const onSeatClick = (seat: any) => {
  if (seat.isSelected()) {
    seat.unSelect();
  } else if (seat.item.salable) {
    seat.select();
  }
};
</script>

<style scoped>
.seatmap-container {
  width: 100%;
  height: 600px;
}
</style>
```

## Local Component Import

If you don't want to register globally:

```vue
<template>
  <SeatmapCanvas :options="options" :data="blocks" />
</template>

<script setup lang="ts">
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/vue';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

// Your data and options here
</script>
```

## Composable Usage (Advanced)

For more control, use the `useSeatmap` composable:

```vue
<template>
  <div>
    <div ref="containerRef" class="seatmap-container"></div>
    
    <div class="controls">
      <button @click="zoomToVenue">Zoom to Venue</button>
      <button @click="() => zoomToBlock('block-1')">Zoom to Block 1</button>
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
          selected: '#8fe100',
        }
      }
    });

    loadData([
      {
        id: 'block-1',
        title: 'Section A',
        seats: [
          { id: 'seat-1', x: 0, y: 0, title: 'A1', salable: true }
        ]
      }
    ]);

    addEventListener('SEAT.CLICK', (seat: any) => {
      if (seat.item.salable) {
        seat.isSelected() ? seat.unSelect() : seat.select();
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

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SeatmapOptions` | `{}` | Seatmap configuration options |
| `data` | `BlockData[]` | `[]` | Array of blocks with seats |
| `containerClass` | `string` | `''` | CSS class for container |
| `containerStyle` | `object` | `{}` | Inline styles for container |
| `autoZoomToVenue` | `boolean` | `true` | Auto zoom to venue after data load |

## Component Events

| Event | Payload | Description |
|-------|---------|-------------|
| `ready` | `SeatMapCanvas` | Fired when seatmap is initialized |
| `seatClick` | `Seat` | Fired when a seat is clicked |
| `seatSelect` | `Seat` | Fired when a seat is selected |
| `seatUnselect` | `Seat` | Fired when a seat is unselected |
| `blockClick` | `Block` | Fired when a block is clicked |
| `dataChange` | `BlockData[]` | Fired when data changes |

## TypeScript Types

```typescript
import type {
  SeatmapOptions,
  BlockData,
  SeatData,
  SeatClickEvent
} from '@alisaitteke/seatmap-canvas/vue';
```

## Complete Example

Here's a complete booking example with state management:

```vue
<template>
  <div class="booking-app">
    <h1>Event Booking</h1>
    
    <div class="layout">
      <!-- Seatmap -->
      <div class="seatmap-section">
        <div class="controls">
          <button @click="handleZoomOut">Zoom Out</button>
        </div>
        
        <SeatmapCanvas
          ref="seatmapRef"
          :options="seatmapOptions"
          :data="blocks"
          @seat-click="handleSeatClick"
          container-class="seatmap-wrapper"
        />
      </div>

      <!-- Cart -->
      <div class="cart-section">
        <div class="cart">
          <h2>Selected Seats ({{ selectedSeats.length }})</h2>
          
          <div v-if="selectedSeats.length === 0" class="empty">
            No seats selected
          </div>
          
          <ul v-else class="seat-list">
            <li v-for="seat in selectedSeats" :key="seat.id" class="seat-item">
              <span>{{ seat.blockTitle }} - {{ seat.title }}</span>
              <span class="price">${{ seat.price }}</span>
            </li>
          </ul>
          
          <div v-if="selectedSeats.length > 0" class="total">
            <div class="total-row">
              <span>Total:</span>
              <span>${{ totalPrice }}</span>
            </div>
            
            <button class="checkout-btn" @click="handleCheckout">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SeatmapOptions, BlockData } from '@alisaitteke/seatmap-canvas/vue';

interface SelectedSeatInfo {
  id: string;
  title: string;
  price: number;
  blockTitle: string;
}

const seatmapRef = ref<any>(null);
const selectedSeatsData = ref<SelectedSeatInfo[]>([]);

const seatmapOptions = ref<SeatmapOptions>({
  legend: true,
  style: {
    seat: {
      radius: 12,
      color: '#6796ff',
      hover: '#5671ff',
      selected: '#56aa45',
      not_salable: '#424747',
    }
  }
});

const blocks = ref<BlockData[]>([
  {
    id: 'vip',
    title: 'VIP Section',
    color: '#ff6b6b',
    seats: Array.from({ length: 20 }, (_, i) => ({
      id: `vip-${i}`,
      title: `V${i + 1}`,
      x: (i % 5) * 30,
      y: Math.floor(i / 5) * 30,
      salable: true,
      custom_data: { price: 100 }
    }))
  },
  {
    id: 'standard',
    title: 'Standard Section',
    color: '#4ecdc4',
    seats: Array.from({ length: 20 }, (_, i) => ({
      id: `std-${i}`,
      title: `S${i + 1}`,
      x: (i % 5) * 30 + 200,
      y: Math.floor(i / 5) * 30,
      salable: true,
      custom_data: { price: 50 }
    }))
  }
]);

const selectedSeats = computed(() => selectedSeatsData.value);

const totalPrice = computed(() => 
  selectedSeats.value.reduce((sum, seat) => sum + seat.price, 0)
);

const handleSeatClick = (seat: any) => {
  if (!seat.item.salable) return;

  if (seat.isSelected()) {
    seat.unSelect();
  } else {
    seat.select();
  }

  updateSelectedSeats();
};

const updateSelectedSeats = () => {
  const seatmap = seatmapRef.value?.getInstance();
  if (!seatmap) return;

  const selected = seatmap.data.getSelectedSeats();
  selectedSeatsData.value = selected.map((seat: any) => ({
    id: seat.id,
    title: seat.title,
    price: seat.custom_data.price,
    blockTitle: seat.block.title
  }));
};

const handleZoomOut = () => {
  seatmapRef.value?.getInstance()?.zoomManager.zoomToVenue();
};

const handleCheckout = () => {
  if (selectedSeats.value.length === 0) {
    alert('Please select at least one seat');
    return;
  }
  
  alert(`Checkout: ${selectedSeats.value.length} seats for $${totalPrice.value}`);
};
</script>

<style scoped>
.booking-app {
  padding: 20px;
}

.layout {
  display: flex;
  gap: 20px;
}

.seatmap-section {
  flex: 2;
}

.controls {
  margin-bottom: 10px;
}

.seatmap-wrapper {
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.cart-section {
  flex: 1;
}

.cart {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  position: sticky;
  top: 20px;
}

.empty {
  color: #666;
  padding: 20px 0;
}

.seat-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.seat-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.price {
  font-weight: bold;
}

.total {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #333;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
}

.checkout-btn {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background-color: #56aa45;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #459236;
}
</style>
```

## Nuxt Support

For Nuxt 3, create a plugin:

```typescript
// plugins/seatmap-canvas.client.ts
import SeatmapCanvasPlugin from '@alisaitteke/seatmap-canvas/vue';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SeatmapCanvasPlugin);
});
```

## Custom Shapes

```vue
<script setup lang="ts">
const options = ref({
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
});
</script>
```

## Next Steps

- Check out [complete examples](https://github.com/alisaitteke/seatmap-canvas/tree/master/examples/vue)
- Explore [API Reference](/docs/api/configuration)
- Learn about [Event Handling](/docs/core-concepts/event-system)
