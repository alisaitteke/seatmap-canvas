/*
 * seatmap-canvas.module.ts
 * NgModule for Seatmap Canvas (Backwards Compatibility)
 * For Angular projects using NgModule pattern
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatmapCanvasComponent } from './seatmap-canvas.component';
import { SeatmapCanvasDirective } from './seatmap-canvas.directive';
import { SeatmapCanvasService } from './seatmap-canvas.service';

@NgModule({
  imports: [CommonModule, SeatmapCanvasComponent, SeatmapCanvasDirective],
  exports: [SeatmapCanvasComponent, SeatmapCanvasDirective],
  providers: [SeatmapCanvasService],
})
export class SeatmapCanvasModule {}
