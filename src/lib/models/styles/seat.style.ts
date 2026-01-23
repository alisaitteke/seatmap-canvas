export class SeatStyle {
    shape: 'auto' | 'circle' | 'rect' | 'path' | 'svg' = 'auto'
    radius: number = 12
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
}