/*
 * index.ts
 * Angular Plugin for Seatmap Canvas
 * https://github.com/alisaitteke/seatmap-canvas
 */

// Component & Directive
export { SeatmapCanvasComponent } from './seatmap-canvas.component';
export { SeatmapCanvasDirective } from './seatmap-canvas.directive';

// Service
export { SeatmapCanvasService } from './seatmap-canvas.service';

// NgModule (for backwards compatibility)
export { SeatmapCanvasModule } from './seatmap-canvas.module';

// Types
export type {
  SeatmapOptions,
  SeatClickEvent,
  BlockData,
  SeatData,
  SeatmapCanvasConfig,
  SeatmapCanvasRef,
} from './types';
