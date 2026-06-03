import { SeatMapCanvas } from '../lib/canvas.index';
export interface SeatmapCanvasRef {
    getInstance: () => SeatMapCanvas | null;
    seatmap: SeatMapCanvas | null;
}
declare const SeatmapCanvasComponent: any;
export default SeatmapCanvasComponent;
