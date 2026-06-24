import {CanvasPalette, getPalette} from "@model/theme.palette";

/**
 * Styling for a section polygon object. Mirrors `Section.draw` /
 * studio `SectionView`: a category-tinted, low-opacity fill with a rounded
 * stroke and a bold centered caption.
 */
export class SectionStyle {
    /** Fill opacity of the polygon (category color shows through, muted). */
    fill_opacity: number = 0.25;
    /** Outline color (theme `section_stroke`). */
    stroke: string;
    stroke_width: number = 2;
    stroke_linejoin: string = 'round';
    /** Label fill (theme `label`). */
    label_color: string;
    /** Default caption font size when the object does not override it. */
    label_size: number = 16;
    label_weight: string = '700';
    font_family: string = 'system-ui, sans-serif';

    constructor(palette: CanvasPalette = getPalette('light')) {
        this.stroke = palette.section_stroke;
        this.label_color = palette.label;
    }
}
