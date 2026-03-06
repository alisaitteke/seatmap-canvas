/*
 * seatmap-canvas.component.ts
 * Angular Component for Seatmap Canvas
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeatMapCanvas } from '../lib/canvas.index';
import type { SeatmapOptions, BlockData } from './types';

@Component({
  selector: 'seatmap-canvas',
  standalone: true,
  template: `
    <div
      #container
      [class]="className"
      [ngStyle]="containerStyle"
    ></div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      div {
        width: 100%;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatmapCanvasComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  @Input() options?: SeatmapOptions = {};
  @Input() data?: BlockData[] = [];
  @Input() className?: string = '';
  @Input() containerStyle?: { [key: string]: any } = {};
  @Input() autoZoomToVenue: boolean = true;

  @Output() ready = new EventEmitter<SeatMapCanvas>();
  @Output() seatClick = new EventEmitter<any>();
  @Output() seatSelect = new EventEmitter<any>();
  @Output() seatUnselect = new EventEmitter<any>();
  @Output() blockClick = new EventEmitter<any>();
  @Output() dataChange = new EventEmitter<BlockData[]>();

  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  private seatmapInstance: SeatMapCanvas | null = null;
  private isBrowser: boolean;
  private isInitialized: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Initialization happens in ngAfterViewInit
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.containerRef) {
      return;
    }

    this.initializeSeatmap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isInitialized || !this.seatmapInstance) {
      return;
    }

    // Handle data changes
    if (changes['data'] && !changes['data'].firstChange) {
      const newData = changes['data'].currentValue;
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
    if (!this.containerRef?.nativeElement) {
      return;
    }

    // Initialize Seatmap Canvas
    this.seatmapInstance = new SeatMapCanvas(
      this.containerRef.nativeElement,
      this.options || {}
    );

    // Setup event listeners
    if (this.seatmapInstance) {
      const instance = this.seatmapInstance;

      instance.eventManager.addEventListener('SEAT.CLICK', (seat: any) => {
        this.seatClick.emit(seat);
      });

      instance.eventManager.addEventListener('SEAT.SELECT', (seat: any) => {
        this.seatSelect.emit(seat);
      });

      instance.eventManager.addEventListener('SEAT.UNSELECT', (seat: any) => {
        this.seatUnselect.emit(seat);
      });

      instance.eventManager.addEventListener('BLOCK.CLICK', (block: any) => {
        this.blockClick.emit(block);
      });

      // Load initial data
      if (this.data && this.data.length > 0) {
        this.loadData(this.data);
      }

      this.isInitialized = true;

      // Emit ready event
      this.ready.emit(instance);
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
    if (this.autoZoomToVenue) {
      setTimeout(() => {
        this.seatmapInstance?.zoomManager.zoomToVenue();
      }, 100);
    }
    this.dataChange.emit(data);
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
