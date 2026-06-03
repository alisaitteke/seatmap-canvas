import { Observable } from 'rxjs';
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import type { SeatmapOptions, BlockData } from './types';
export declare class SeatmapCanvasService {
    private platformId;
    private seatmapInstance;
    private selectedSeatsSubject;
    private isReadySubject;
    private isBrowser;
    selectedSeats$: Observable<any[]>;
    isReady$: Observable<boolean>;
    constructor(platformId: Object);
    initialize(container: HTMLElement, options?: SeatmapOptions): SeatMapCanvas | null;
    getInstance(): SeatMapCanvas | null;
    loadData(data: BlockData[], autoZoom?: boolean): void;
    getSelectedSeats(): any[];
    getSeat(seatId: string, blockId: string): any;
    getBlocks(): any[];
    zoomToBlock(blockId: string): void;
    zoomToVenue(): void;
    addEventListener(event: string, callback: Function): void;
    removeEventListener(event: string, callback: Function): void;
    private updateSelectedSeats;
    destroy(): void;
}
