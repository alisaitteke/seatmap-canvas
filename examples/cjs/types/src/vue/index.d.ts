import type { Plugin } from 'vue';
import SeatmapCanvas from './SeatmapCanvas.vue';
import { useSeatmap } from './useSeatmap';
import type { SeatmapOptions } from './types';
export interface SeatmapPluginOptions {
    defaultOptions?: SeatmapOptions;
    componentName?: string;
}
export declare const SeatmapCanvasPlugin: Plugin;
export { SeatmapCanvas, useSeatmap };
export * from './types';
export default SeatmapCanvasPlugin;
