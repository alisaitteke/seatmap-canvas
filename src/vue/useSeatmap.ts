/*
 * useSeatmap.ts
 * Vue Composable for Seatmap Canvas
 */

import { ref, Ref, onMounted, onBeforeUnmount } from 'vue';
import { SeatMapCanvas } from '../lib/canvas.index';
import type { SeatmapOptions, BlockData, SeatClickEvent } from './types';

export interface UseSeatmapReturn {
  seatmapInstance: Ref<SeatMapCanvas | null>;
  isReady: Ref<boolean>;
  selectedSeats: Ref<any[]>;
  init: (container: HTMLElement | string, options?: SeatmapOptions) => void;
  loadData: (data: BlockData[]) => void;
  getSelectedSeats: () => any[];
  getSeat: (seatId: string, blockId: string) => any;
  getBlocks: () => any[];
  zoomToBlock: (blockId: string) => void;
  zoomToVenue: () => void;
  destroy: () => void;
  addEventListener: (event: string, callback: Function) => void;
  removeEventListener: (event: string, callback: Function) => void;
}

export function useSeatmap(autoInit: boolean = false): UseSeatmapReturn {
  const seatmapInstance = ref<SeatMapCanvas | null>(null);
  const isReady = ref(false);
  const selectedSeats = ref<any[]>([]);

  const init = (container: HTMLElement | string, options: SeatmapOptions = {}) => {
    if (seatmapInstance.value) {
      console.warn('Seatmap already initialized. Destroying previous instance.');
      destroy();
    }

    try {
      seatmapInstance.value = new SeatMapCanvas(container, options);
      isReady.value = true;

      // Update selected seats on seat events
      seatmapInstance.value.eventManager.addEventListener('SEAT.SELECT', updateSelectedSeats);
      seatmapInstance.value.eventManager.addEventListener('SEAT.UNSELECT', updateSelectedSeats);
    } catch (error) {
      console.error('Failed to initialize Seatmap Canvas:', error);
      isReady.value = false;
    }
  };

  const updateSelectedSeats = () => {
    if (seatmapInstance.value) {
      selectedSeats.value = seatmapInstance.value.data.getSelectedSeats();
    }
  };

  const loadData = (data: BlockData[]) => {
    if (!seatmapInstance.value) {
      console.warn('Seatmap not initialized. Call init() first.');
      return;
    }
    seatmapInstance.value.data.replaceData(data);
  };

  const getSelectedSeats = () => {
    if (!seatmapInstance.value) return [];
    return seatmapInstance.value.data.getSelectedSeats();
  };

  const getSeat = (seatId: string, blockId: string) => {
    if (!seatmapInstance.value) return null;
    return seatmapInstance.value.data.getSeat(seatId, blockId);
  };

  const getBlocks = () => {
    if (!seatmapInstance.value) return [];
    return seatmapInstance.value.data.getBlocks();
  };

  const zoomToBlock = (blockId: string) => {
    if (!seatmapInstance.value) return;
    seatmapInstance.value.zoomManager.zoomToBlock(blockId);
  };

  const zoomToVenue = () => {
    if (!seatmapInstance.value) return;
    seatmapInstance.value.zoomManager.zoomToVenue();
  };

  const addEventListener = (event: string, callback: Function) => {
    if (!seatmapInstance.value) {
      console.warn('Seatmap not initialized. Call init() first.');
      return;
    }
    seatmapInstance.value.eventManager.addEventListener(event, callback);
  };

  const removeEventListener = (event: string, callback: Function) => {
    if (!seatmapInstance.value) return;
    // Note: EventManager doesn't have removeEventListener in the original code
    // This would need to be implemented in the core library
    console.warn('removeEventListener not implemented in core library');
  };

  const destroy = () => {
    if (seatmapInstance.value) {
      // Cleanup event listeners if needed
      seatmapInstance.value = null;
      isReady.value = false;
      selectedSeats.value = [];
    }
  };

  onBeforeUnmount(() => {
    destroy();
  });

  return {
    seatmapInstance,
    isReady,
    selectedSeats,
    init,
    loadData,
    getSelectedSeats,
    getSeat,
    getBlocks,
    zoomToBlock,
    zoomToVenue,
    destroy,
    addEventListener,
    removeEventListener,
  };
}
