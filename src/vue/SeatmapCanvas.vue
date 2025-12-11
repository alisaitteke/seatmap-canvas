<template>
  <div ref="containerRef" :class="containerClass" :style="containerStyle"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { SeatMapCanvas } from '../lib/canvas.index';
import type { SeatmapOptions, BlockData } from './types';

export interface Props {
  options?: SeatmapOptions;
  data?: BlockData[];
  containerClass?: string;
  containerStyle?: Record<string, string>;
  autoZoomToVenue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
  data: () => [],
  containerClass: '',
  containerStyle: () => ({}),
  autoZoomToVenue: true,
});

const emit = defineEmits<{
  ready: [instance: SeatMapCanvas];
  seatClick: [seat: any];
  seatSelect: [seat: any];
  seatUnselect: [seat: any];
  blockClick: [block: any];
  dataChange: [data: BlockData[]];
}>();

const containerRef = ref<HTMLElement | null>(null);
const seatmapInstance = ref<SeatMapCanvas | null>(null);

const getInstance = () => seatmapInstance.value;

// Watch for data changes
watch(
  () => props.data,
  (newData) => {
    if (seatmapInstance.value && newData && newData.length > 0) {
      seatmapInstance.value.data.replaceData(newData);
      if (props.autoZoomToVenue) {
        setTimeout(() => {
          seatmapInstance.value?.zoomManager.zoomToVenue();
        }, 100);
      }
      emit('dataChange', newData);
    }
  },
  { deep: true }
);

onMounted(() => {
  if (!containerRef.value) return;

  // Initialize Seatmap Canvas
  seatmapInstance.value = new SeatMapCanvas(containerRef.value, props.options);

  // Setup event listeners
  if (seatmapInstance.value) {
    seatmapInstance.value.eventManager.addEventListener('SEAT.CLICK', (seat: any) => {
      emit('seatClick', seat);
    });

    seatmapInstance.value.eventManager.addEventListener('SEAT.SELECT', (seat: any) => {
      emit('seatSelect', seat);
    });

    seatmapInstance.value.eventManager.addEventListener('SEAT.UNSELECT', (seat: any) => {
      emit('seatUnselect', seat);
    });

    seatmapInstance.value.eventManager.addEventListener('BLOCK.CLICK', (block: any) => {
      emit('blockClick', block);
    });

    // Load initial data
    if (props.data && props.data.length > 0) {
      seatmapInstance.value.data.replaceData(props.data);
      if (props.autoZoomToVenue) {
        setTimeout(() => {
          seatmapInstance.value?.zoomManager.zoomToVenue();
        }, 100);
      }
    }

    emit('ready', seatmapInstance.value);
  }
});

onBeforeUnmount(() => {
  // Cleanup if needed
  seatmapInstance.value = null;
});

defineExpose({
  getInstance,
  seatmap: computed(() => seatmapInstance.value),
});
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
