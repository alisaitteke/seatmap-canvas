import { CanvasPalette } from "@model/theme.palette";
export declare class FocalStyle {
    base_size: number;
    glow_factors: number[];
    glow_opacities: number[];
    glow_stroke_factor: number;
    glow: string;
    outer_dot_factor: number;
    outer_stroke_factor: number;
    inner_dot_factor: number;
    inner_stroke_factor: number;
    stroke: string;
    fill: string;
    constructor(palette?: CanvasPalette);
}
