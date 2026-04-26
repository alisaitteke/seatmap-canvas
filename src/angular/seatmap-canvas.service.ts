/*
 * seatmap-canvas.service.ts
 * Injectable Service for Seatmap Canvas
 * Programmatic usage with RxJS integration
 */

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import type { SeatmapOptions, BlockData } from './types';

@Injectable()
export class SeatmapCanvasService {
  private seatmapInstance: SeatMapCanvas | null = null;
  private selectedSeatsSubject = new BehaviorSubject<any[]>([]);
  private isReadySubject = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  public selectedSeats$: Observable<any[]> =
    this.selectedSeatsSubject.asObservable();
  public isReady$: Observable<boolean> = this.isReadySubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Initialize seatmap instance with a container element
   */
  public initialize(
    container: HTMLElement,
    options?: SeatmapOptions
  ): SeatMapCanvas | null {
    if (!this.isBrowser) {
      console.warn('SeatmapCanvas: Not running in browser environment');
      return null;
    }

    if (!container) {
      console.error('SeatmapCanvas: Container element is required');
      return null;
    }

    // Initialize Seatmap Canvas
    this.seatmapInstance = new SeatMapCanvas(container, options || {});

    // Setup event listeners for reactive state
    if (this.seatmapInstance) {
      this.seatmapInstance.eventManager.addEventListener(
        'SEAT.SELECT',
        () => {
          this.updateSelectedSeats();
        }
      );

      this.seatmapInstance.eventManager.addEventListener(
        'SEAT.UNSELECT',
        () => {
          this.updateSelectedSeats();
        }
      );

      this.isReadySubject.next(true);
    }

    return this.seatmapInstance;
  }

  /**
   * Get the current seatmap instance
   */
  public getInstance(): SeatMapCanvas | null {
    return this.seatmapInstance;
  }

  /**
   * Load data into the seatmap
   */
  public loadData(data: BlockData[], autoZoom: boolean = true): void {
    if (!this.seatmapInstance) {
      console.warn('SeatmapCanvas: Instance not initialized');
      return;
    }

    this.seatmapInstance.data.replaceData(data);
    if (autoZoom) {
      setTimeout(() => {
        this.seatmapInstance?.zoomManager.zoomToVenue();
      }, 100);
    }
  }

  /**
   * Get currently selected seats
   */
  public getSelectedSeats(): any[] {
    if (!this.seatmapInstance) {
      return [];
    }
    return this.seatmapInstance.data.getSelectedSeats();
  }

  /**
   * Get a specific seat by ID
   */
  public getSeat(seatId: string, blockId: string): any {
    if (!this.seatmapInstance) {
      return null;
    }
    const block = this.seatmapInstance.data.getBlock(blockId);
    return block?.getSeat(seatId);
  }

  /**
   * Get all blocks
   */
  public getBlocks(): any[] {
    if (!this.seatmapInstance) {
      return [];
    }
    return this.seatmapInstance.data.getBlocks();
  }

  /**
   * Zoom to a specific block
   */
  public zoomToBlock(blockId: string): void {
    if (!this.seatmapInstance) {
      return;
    }
    const block = this.seatmapInstance.data.getBlock(blockId);
    if (block) {
      this.seatmapInstance.zoomManager.zoomToBlock(block);
    }
  }

  /**
   * Zoom to venue view
   */
  public zoomToVenue(): void {
    if (!this.seatmapInstance) {
      return;
    }
    this.seatmapInstance.zoomManager.zoomToVenue();
  }

  /**
   * Add event listener to seatmap
   */
  public addEventListener(event: string, callback: Function): void {
    if (!this.seatmapInstance) {
      console.warn('SeatmapCanvas: Instance not initialized');
      return;
    }
    this.seatmapInstance.eventManager.addEventListener(event, callback);
  }

  /**
   * Remove event listener from seatmap
   */
  public removeEventListener(event: string, callback: Function): void {
    if (!this.seatmapInstance) {
      return;
    }
    this.seatmapInstance.eventManager.removeEventListener(event, callback);
  }

  /**
   * Update selected seats reactive state
   */
  private updateSelectedSeats(): void {
    const selected = this.getSelectedSeats();
    this.selectedSeatsSubject.next(selected);
  }

  /**
   * Destroy the seatmap instance and clean up
   */
  public destroy(): void {
    this.seatmapInstance = null;
    this.selectedSeatsSubject.next([]);
    this.isReadySubject.next(false);
  }
}
