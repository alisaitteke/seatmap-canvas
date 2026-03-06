/*
 * seatmap-canvas.directive.ts
 * Angular Directive for Seatmap Canvas
 * Programmatic DOM attachment approach
 */

import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeatMapCanvas } from '../lib/canvas.index';
import type { SeatmapOptions, BlockData } from './types';

@Directive({
  selector: '[seatmapCanvas]',
  standalone: true,
  exportAs: 'seatmapCanvas',
})
export class SeatmapCanvasDirective implements OnInit, OnDestroy, OnChanges {
  @Input('seatmapCanvas') options?: SeatmapOptions = {};
  @Input() seatmapData?: BlockData[] = [];
  @Input() seatmapAutoZoom: boolean = true;

  @Output() seatmapReady = new EventEmitter<SeatMapCanvas>();
  @Output() seatmapSeatClick = new EventEmitter<any>();
  @Output() seatmapSeatSelect = new EventEmitter<any>();
  @Output() seatmapSeatUnselect = new EventEmitter<any>();
  @Output() seatmapBlockClick = new EventEmitter<any>();
  @Output() seatmapDataChange = new EventEmitter<BlockData[]>();

  private seatmapInstance: SeatMapCanvas | null = null;
  private isBrowser: boolean;
  private isInitialized: boolean = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.initializeSeatmap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isInitialized || !this.seatmapInstance) {
      return;
    }

    // Handle data changes
    if (changes['seatmapData'] && !changes['seatmapData'].firstChange) {
      const newData = changes['seatmapData'].currentValue;
      if (newData && newData.length > 0) {
        this.loadData(newData);
      }
    }
  }

  ngOnDestroy(): void {
    this.seatmapInstance = null;
    this.isInitialized = false;
  }

  private initializeSeatmap(): void {
    if (!this.el?.nativeElement) {
      return;
    }

    // Initialize Seatmap Canvas
    this.seatmapInstance = new SeatMapCanvas(
      this.el.nativeElement,
      this.options || {}
    );

    // Setup event listeners
    if (this.seatmapInstance) {
      const instance = this.seatmapInstance;

      instance.eventManager.addEventListener('SEAT.CLICK', (seat: any) => {
        this.seatmapSeatClick.emit(seat);
      });

      instance.eventManager.addEventListener('SEAT.SELECT', (seat: any) => {
        this.seatmapSeatSelect.emit(seat);
      });

      instance.eventManager.addEventListener('SEAT.UNSELECT', (seat: any) => {
        this.seatmapSeatUnselect.emit(seat);
      });

      instance.eventManager.addEventListener('BLOCK.CLICK', (block: any) => {
        this.seatmapBlockClick.emit(block);
      });

      // Load initial data
      if (this.seatmapData && this.seatmapData.length > 0) {
        this.loadData(this.seatmapData);
      }

      this.isInitialized = true;

      // Emit ready event
      this.seatmapReady.emit(instance);
    }
  }

  // Public methods
  public getInstance(): SeatMapCanvas | null {
    return this.seatmapInstance;
  }

  public loadData(data: BlockData[]): void {
    if (!this.seatmapInstance) {
      return;
    }

    this.seatmapInstance.data.replaceData(data);
    if (this.seatmapAutoZoom) {
      setTimeout(() => {
        this.seatmapInstance?.zoomManager.zoomToVenue();
      }, 100);
    }
    this.seatmapDataChange.emit(data);
  }

  public getSelectedSeats(): any[] {
    if (!this.seatmapInstance) {
      return [];
    }
    return this.seatmapInstance.data.getSelectedSeats();
  }

  public getSeat(seatId: string, blockId: string): any {
    if (!this.seatmapInstance) {
      return null;
    }
    const block = this.seatmapInstance.data.getBlock(blockId);
    return block?.getSeat(seatId);
  }

  public getBlocks(): any[] {
    if (!this.seatmapInstance) {
      return [];
    }
    return this.seatmapInstance.data.getBlocks();
  }

  public zoomToBlock(blockId: string): void {
    if (!this.seatmapInstance) {
      return;
    }
    const block = this.seatmapInstance.data.getBlock(blockId);
    if (block) {
      this.seatmapInstance.zoomManager.zoomToBlock(block);
    }
  }

  public zoomToVenue(): void {
    if (!this.seatmapInstance) {
      return;
    }
    this.seatmapInstance.zoomManager.zoomToVenue();
  }
}
