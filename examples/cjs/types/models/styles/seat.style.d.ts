import { CanvasPalette } from "@model/theme.palette";
export declare class SeatStyle {
    shape: 'auto' | 'circle' | 'rect' | 'path' | 'svg';
    radius: number;
    size: number | null;
    corner_radius: number;
    path: string | null;
    path_box: string;
    color: string;
    not_salable: string;
    selected: string;
    hover: string;
    focus: string;
    focus_out: string;
    check_color: string;
    check_icon: string;
    check_icon_color: string;
    svg: string | null;
    stroke: string;
    stroke_width: number;
    selected_stroke: string;
    selected_stroke_width: number;
    uncategorized_fill: string;
    constructor(palette?: CanvasPalette);
}
