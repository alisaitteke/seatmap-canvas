import { ElementRef, OnInit, OnDestroy, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import type { SeatmapOptions, BlockData } from './types';
export declare class SeatmapCanvasComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    private platformId;
    options?: SeatmapOptions;
    data?: BlockData[];
    className?: string;
    containerStyle?: {
        [key: string]: any;
    };
    autoZoomToVenue: boolean;
    ready: any;
    seatClick: any;
    seatSelect: any;
    seatUnselect: any;
    blockClick: any;
    dataChange: any;
    containerRef: ElementRef;
    private seatmapInstance;
    private isBrowser;
    private isInitialized;
    constructor(platformId: Object);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private initializeSeatmap;
    getInstance(): SeatMapCanvas | null;
    loadData(data: BlockData[]): void;
    getSelectedSeats(): any[];
    getSeat(seatId: string, blockId: string): any;
    getBlocks(): any[];
    zoomToBlock(blockId: string): void;
    zoomToVenue(): void;
}
