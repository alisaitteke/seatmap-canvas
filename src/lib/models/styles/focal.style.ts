import {CanvasPalette, getPalette} from "@model/theme.palette";

/**
 * Styling for the chart focal point: three concentric glow rings plus an outer
 * and inner dot, drawn at a screen-stable size. Mirrors `.FocalPoint`
 * rendering: ring radii are `size * factor` and the dots are `size * 2` / `size`
 * in diameter.
 */
export class FocalStyle {
    /** Base size (document units) the rings and dots are derived from. */
    size: number = 8;
    /** Radius multipliers for the three glow rings (largest first). */
    glow_factors: number[] = [9, 6, 3];
    /** Fill opacity for each corresponding glow ring. */
    glow_opacities: number[] = [0.07, 0.12, 0.15];
    /** Glow ring color (theme `focal_glow`). */
    glow: string;
    /** Outer/inner dot outline (theme `focal_stroke`). */
    stroke: string;
    stroke_width: number = 1;
    /** Outer/inner dot fill (theme `focal_fill`). */
    fill: string;

    constructor(palette: CanvasPalette = getPalette('light')) {
        this.glow = palette.focal_glow;
        this.stroke = palette.focal_stroke;
        this.fill = palette.focal_fill;
    }
}
