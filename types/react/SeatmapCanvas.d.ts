import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
export interface SeatmapCanvasRef {
    getInstance: () => SeatMapCanvas | null;
    seatmap: SeatMapCanvas | null;
}
declare const SeatmapCanvasComponent: any;
export default SeatmapCanvasComponent;
