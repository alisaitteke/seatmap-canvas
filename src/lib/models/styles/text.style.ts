import {CanvasPalette, getPalette} from "@model/theme.palette";

/**
 * Styling for a free-floating text caption. Color, size, weight and rotation
 * are data-driven (carried on the object); these are the rendering defaults.
 * Mirrors studio `TextView` (`.TextInput.draw`).
 */
export class TextStyle {
    /** Fallback text color when the object does not specify one (theme `label`). */
    color: string;
    font_family: string = 'system-ui, sans-serif';
    font_size: number = 14;
    /** Anchoring matches studio: centered horizontally and vertically. */
    text_anchor: string = 'middle';
    dominant_baseline: string = 'central';

    constructor(palette: CanvasPalette = getPalette('light')) {
        this.color = palette.label;
    }
}
