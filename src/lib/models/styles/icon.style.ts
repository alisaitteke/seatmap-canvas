import {CanvasPalette, getPalette} from "@model/theme.palette";

/**
 * Styling for a decorative icon object. The reference icon font is not bundled,
 * so an icon renders as a rounded tile with a short caption (mirrors studio
 * `IconView`). The tile corner radius is derived per icon as `min(8, size/4)`.
 */
export class IconStyle {
    /** Tile outline (theme `object_stroke`). */
    stroke: string;
    stroke_width: number = 1;
    /** Maximum tile corner radius; the renderer uses `min(this, size/4)`. */
    max_corner_radius: number = 8;
    /** Caption fill (theme `label`). */
    label_color: string;
    label_weight: string = '600';
    /** Minimum caption font size; the renderer uses `max(this, size/4)`. */
    min_label_size: number = 6;
    font_family: string = 'system-ui, sans-serif';

    constructor(palette: CanvasPalette = getPalette('light')) {
        this.stroke = palette.object_stroke;
        this.label_color = palette.label;
    }
}
