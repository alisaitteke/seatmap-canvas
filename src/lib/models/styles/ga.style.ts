import {CanvasPalette, getPalette} from "@model/theme.palette";

/**
 * Styling for a general-admission area object. Mirrors
 * `.GeneralAdmissionArea.draw` / studio `GeneralAdmissionView`: a
 * translucent category-tinted region with a stroke and a muted capacity caption.
 */
export class GaStyle {
    /** Base fill opacity at 100% opacity, non-translucent. */
    fill_opacity: number = 0.55;
    /** Base fill opacity at 100% opacity when the area is translucent. */
    translucent_fill_opacity: number = 0.35;
    /** Outline color (theme `ga_stroke`). */
    stroke: string;
    stroke_width: number = 2;
    /** Caption fill (theme `muted_label`). */
    label_color: string;
    label_size: number = 12;
    label_weight: string = '600';
    font_family: string = 'system-ui, sans-serif';

    constructor(palette: CanvasPalette = getPalette('light')) {
        this.stroke = palette.ga_stroke;
        this.label_color = palette.muted_label;
    }
}
