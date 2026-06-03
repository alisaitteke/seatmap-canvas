export type CanvasTheme = 'light' | 'dark';
export interface CanvasPalette {
    object_stroke: string;
    selected_stroke: string;
    label: string;
    muted_label: string;
    uncategorized_fill: string;
    table_fill: string;
    booth_fill: string;
    section_stroke: string;
    ga_stroke: string;
    focal_stroke: string;
    focal_fill: string;
    focal_glow: string;
    seat_highlight: string;
}
export declare const LIGHT_PALETTE: CanvasPalette;
export declare const DARK_PALETTE: CanvasPalette;
export declare function getPalette(theme?: CanvasTheme | null): CanvasPalette;
