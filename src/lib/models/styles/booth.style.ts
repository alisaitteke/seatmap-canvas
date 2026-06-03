import {CanvasPalette, getPalette} from "@model/theme.palette";

/**
 * Styling for a booth object: a rounded rectangle with the seats.io diagonal
 * "cross" lines, selectable as a whole. Mirrors `seatsio.Booth.createShapes` /
 * studio `BoothView`.
 */
export class BoothStyle {
    /** Fallback body fill when the booth has no category color. */
    fill: string;
    /** Body outline (theme `object_stroke`). */
    stroke: string;
    stroke_width: number = 1;
    /** Corner radius of the booth body. */
    corner_radius: number = 4;
    /** Color of the two diagonal "cross" lines (theme `object_stroke`). */
    cross_stroke: string;
    cross_stroke_width: number = 1.5;
    /** Dash pattern of the diagonal cross lines. */
    cross_dasharray: string = '4 2';
    /** Inset of the cross lines from the booth edge, in document units. */
    cross_padding: number = 4;
    /** Label fill (theme `label`). */
    label_color: string;
    label_size: number = 14;
    label_weight: string = '600';
    font_family: string = 'system-ui, sans-serif';

    constructor(palette: CanvasPalette = getPalette('light')) {
        this.fill = palette.booth_fill;
        this.stroke = palette.object_stroke;
        this.cross_stroke = palette.object_stroke;
        this.label_color = palette.label;
    }
}
