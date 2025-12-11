<template>
  <div id="app" class="app-container">
    <div class="header">
      <h1>Seatmap Canvas - Vue.js Demo</h1>
      <div class="controls">
        <button @click="randomizeSeats" class="btn btn-primary">
          <i class="fa-solid fa-shuffle"></i> Randomize Seats
        </button>
        <button @click="zoomToVenue" class="btn btn-secondary">
          <i class="fa-solid fa-magnifying-glass-minus"></i> Zoom Out
        </button>
        <button @click="zoomToBlock('block-0')" class="btn btn-secondary">
          <i class="fa-solid fa-magnifying-glass-plus"></i> Zoom to Block 1
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="sidebar left">
        <div class="panel">
          <h3>Blocks</h3>
          <div class="block-list">
            <button
              v-for="(block, index) in blocks"
              :key="block.id"
              @click="zoomToBlock(block.id)"
              class="block-btn"
            >
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              {{ block.title }}
            </button>
          </div>
        </div>
      </div>

      <div class="seatmap-wrapper">
        <SeatmapCanvas
          ref="seatmapRef"
          :options="seatmapOptions"
          :data="blocks"
          @ready="onSeatmapReady"
          @seat-click="onSeatClick"
          @seat-select="onSeatSelect"
          @seat-unselect="onSeatUnselect"
          container-class="seatmap-container"
        />
      </div>

      <div class="sidebar right">
        <div class="panel">
          <h3>Selected Seats</h3>
          <div v-if="selectedSeats.length === 0" class="empty-state">
            <i class="fa-regular fa-face-rolling-eyes"></i>
            <p>No selected seats</p>
          </div>
          <div v-else class="seat-list">
            <div
              v-for="seat in selectedSeats"
              :key="`${seat.block.id}-${seat.id}`"
              class="seat-item"
            >
              <div class="seat-color" :style="{ backgroundColor: '#8fe100' }"></div>
              <div class="seat-info">
                <div class="seat-title">{{ seat.custom_data?.basket_name || seat.title }}</div>
                <div class="seat-price">{{ formatPrice(seat.custom_data?.price || 0) }}</div>
              </div>
              <button @click="unselectSeat(seat)" class="remove-btn">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="total">
              <strong>Total: {{ formatPrice(totalPrice) }}</strong>
              <span>for {{ selectedSeats.length }} seat{{ selectedSeats.length > 1 ? 's' : '' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { BlockData } from '../../src/vue/types';

const seatmapRef = ref<any>(null);
const selectedSeats = ref<any[]>([]);

const seatmapOptions = {
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
};

const blocks = ref<BlockData[]>([]);

const totalPrice = computed(() => {
  return selectedSeats.value.reduce((sum, seat) => sum + (seat.custom_data?.price || 0), 0);
});

const generateRandomBlocks = (blockCount = 4, gapX = 40, gapY = 40) => {
  const blockColors = ['#01a5ff', '#fccf4e', '#01a5ff', '#01a5ff'];
  const newBlocks: BlockData[] = [];
  let lastX = 0;

  for (let j = 0; j < blockCount; j++) {
    const color = blockColors[j];
    const seats = [];
    let cellCount = 0;
    let rowCount = 0;
    let blockFinalX = 0;
    const randomSeatCount = Math.round(Math.random() * 200 + 200);
    const randomCell = Math.round(Math.random() * 12 + 12);
    const blockTitle = `Block ${j + 1}`;

    for (let k = 0; k < randomSeatCount; k++) {
      if (k % randomCell === 0) {
        cellCount = 1;
        rowCount++;
      }

      const x = cellCount * gapX + lastX;
      const y = rowCount * gapY;

      if (blockFinalX < x) blockFinalX = x;

      const salable = Math.ceil(Math.random() * 10) > 3;
      const randomPrice = (Math.floor(Math.random() * 10) + 1) * 10;

      seats.push({
        id: `s-${k}`,
        x,
        y,
        color,
        salable,
        custom_data: {
          any: 'things',
          price: randomPrice,
          basket_name: `${blockTitle} - ${cellCount} ${rowCount}`
        },
        note: 'note test',
        tags: {},
        title: `${blockTitle}\n${cellCount} ${rowCount}`
      });

      cellCount++;
    }

    lastX = blockFinalX + 320;

    newBlocks.push({
      id: `block-${j}`,
      title: blockTitle,
      labels: [],
      color,
      seats,
      gap: 12
    });
  }

  blocks.value = newBlocks;
};

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

const onSeatSelect = (seat: any) => {
  updateSelectedSeats();
};

const onSeatUnselect = (seat: any) => {
  updateSelectedSeats();
};

const updateSelectedSeats = () => {
  if (seatmapRef.value?.seatmap) {
    selectedSeats.value = seatmapRef.value.seatmap.data.getSelectedSeats();
  }
};

const unselectSeat = (seat: any) => {
  const seatInstance = seatmapRef.value?.seatmap?.data.getSeat(seat.id, seat.block.id);
  if (seatInstance) {
    seatInstance.svg.unSelect();
    updateSelectedSeats();
  }
};

const randomizeSeats = () => {
  generateRandomBlocks();
};

const zoomToVenue = () => {
  seatmapRef.value?.seatmap?.zoomManager.zoomToVenue();
};

const zoomToBlock = (blockId: string) => {
  seatmapRef.value?.seatmap?.zoomManager.zoomToBlock(blockId);
};

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Initialize with random data
generateRandomBlocks();
</script>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  background: #ab1f34;
  color: white;
  padding: 1rem 2rem;
  border-bottom: 2px solid #d05063;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.btn-primary {
  background: #8fe100;
  color: #000;
}

.btn-primary:hover {
  background: #7bc700;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background: #f5f5f5;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.sidebar.right {
  border-right: none;
  border-left: 1px solid #ddd;
}

.panel {
  padding: 1rem;
}

.panel h3 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  text-align: center;
}

.block-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.block-btn {
  padding: 0.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.block-btn:hover {
  background: #e0e0e0;
}

.seatmap-wrapper {
  flex: 1;
  position: relative;
  background: white;
}

.seatmap-container {
  width: 100%;
  height: 100%;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #999;
}

.empty-state i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.seat-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.seat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.seat-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.seat-info {
  flex: 1;
  font-size: 0.875rem;
}

.seat-title {
  font-weight: 500;
}

.seat-price {
  color: #666;
  font-size: 0.75rem;
}

.remove-btn {
  padding: 0.25rem 0.5rem;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #d00;
}

.total {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
