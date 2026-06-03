/*
 * useSeatmap.ts
 * Vue Composable for Seatmap Canvas
 */

import { ref, Ref, onMounted, onBeforeUnmount } from 'vue';
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
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
  /** Enter a floor by its public id (multi-floor charts). */
  goToFloor: (floorId: string) => void;
  /** Leave the selected floor for the stacked all-floors view. */
  goToAllFloorsView: () => void;
  /** All floors as `{ index, id, display_name }`. */
  getFloors: () => Array<{ index: number; id: string; display_name: string }>;
  /** The active floor, or `{ index: -1 }` for the all-floors view. */
  getCurrentFloor: () => { index: number; id: string | null; display_name: string | null };
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

  const goToFloor = (floorId: string) => {
    seatmapInstance.value?.goToFloor(floorId);
  };

  const goToAllFloorsView = () => {
    seatmapInstance.value?.goToAllFloorsView();
  };

  const getFloors = () => {
    return seatmapInstance.value?.getFloors() ?? [];
  };

  const getCurrentFloor = () => {
    return seatmapInstance.value?.getCurrentFloor() ?? { index: -1, id: null, display_name: null };
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
    goToFloor,
    goToAllFloorsView,
    getFloors,
    getCurrentFloor,
  };
}
