import {CanvasPalette, getPalette} from "@model/theme.palette";

/**
 * Styling for a table body object (round circle or rounded rect). Chairs around
 * the table are rendered as real seats in a block; this only styles the body and
 * its optional label. Mirrors `seatsio.Table.draw` / studio `TableView`.
 */
export class TableStyle {
    /** Body fill (theme `table_fill`). */
    fill: string;
    /** Body outline (theme `object_stroke`). */
    stroke: string;
    stroke_width: number = 1;
    /** Corner radius of a rectangular table body. */
    corner_radius: number = 6;
    /** Label fill (theme `label`). */
    label_color: string;
    label_size: number = 14;
    label_weight: string = '600';
    font_family: string = 'system-ui, sans-serif';

    constructor(palette: CanvasPalette = getPalette('light')) {
        this.fill = palette.table_fill;
        this.stroke = palette.object_stroke;
        this.label_color = palette.label;
    }
}
