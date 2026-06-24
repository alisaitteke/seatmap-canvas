import {CHAIR_RADIUS, CHAIR_STROKE_WIDTH, SEAT_SELECTED_STROKE_WIDTH} from "@model/geometry.constants";
import {CanvasPalette, getPalette} from "@model/theme.palette";

export class SeatStyle {
    shape: 'auto' | 'circle' | 'rect' | 'path' | 'svg' = 'auto'
    /**
     * Rendered seat radius. Defaults to the shared geometry constant
     * ({@link CHAIR_RADIUS} = 7) so canvas seats match studio chairs.
     */
    radius: number = CHAIR_RADIUS
    size: number | null = null
    corner_radius: number = 0
    path: string | null = null
    path_box: string = "0 0 24 24"
    color: string = '#77b2ff'
    not_salable: string = "#6293d2";
    selected: string = "#4770ff";
    hover: string = "#4770ff"
    focus: string = "#6293d2"
    focus_out: string = "#ff001c"
    check_color: string = '#ffffff'
    check_icon: string = '\uf005'
    check_icon_color: string = "#ffffff";
    svg: string | null = null;

    /** Base outline color of a seat (theme `object_stroke`). */
    stroke: string;
    /** Base outline width of a seat ({@link CHAIR_STROKE_WIDTH}). */
    stroke_width: number = CHAIR_STROKE_WIDTH;
    /** Outline color when a seat is selected (theme `selected_stroke`). */
    selected_stroke: string;
    /** Outline width when a seat is selected ({@link SEAT_SELECTED_STROKE_WIDTH}). */
    selected_stroke_width: number = SEAT_SELECTED_STROKE_WIDTH;
    /** Fill used for seats with no category color (theme `uncategorized_fill`). */
    uncategorized_fill: string;

    constructor(palette: CanvasPalette = getPalette('light')) {
        this.stroke = palette.object_stroke;
        this.selected_stroke = palette.selected_stroke;
        this.uncategorized_fill = palette.uncategorized_fill;
    }
}
