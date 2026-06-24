import { Ref } from 'vue';
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import type { SeatmapOptions, BlockData } from './types';
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
export declare function useSeatmap(autoInit?: boolean): UseSeatmapReturn;
