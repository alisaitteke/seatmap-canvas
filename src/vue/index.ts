/*
 * index.ts
 * Vue.js Plugin for Seatmap Canvas
 * https://github.com/alisaitteke/seatmap-canvas
 */

import type { App, Plugin } from 'vue';
import SeatmapCanvas from './SeatmapCanvas.vue';
import { useSeatmap } from './useSeatmap';
import type { SeatmapOptions } from './types';

export interface SeatmapPluginOptions {
  // Global default options for all instances
  defaultOptions?: SeatmapOptions;
  // Custom component name (default: 'SeatmapCanvas')
  componentName?: string;
}

export const SeatmapCanvasPlugin: Plugin = {
  install(app: App, options: SeatmapPluginOptions = {}) {
    const componentName = options.componentName || 'SeatmapCanvas';

    // Register component globally
    app.component(componentName, SeatmapCanvas);

    // Provide default options globally (optional)
    if (options.defaultOptions) {
      app.provide('seatmapDefaultOptions', options.defaultOptions);
    }
  },
};

// Export everything
export { SeatmapCanvas, useSeatmap };
export * from './types';

// Default export
export default SeatmapCanvasPlugin;
