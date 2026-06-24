import { SeatStyle } from "@model/styles/seat.style";
import { BLockStyle } from "@model/styles/block.style";
import { LegendStyle } from "@model/styles/legend.style";
import { LabelStyle } from "@model/styles/label.style";
import { TooltipStyle } from "@model/styles/tooltip.style";
import { SectionStyle } from "@model/styles/section.style";
import { GaStyle } from "@model/styles/ga.style";
import { TableStyle } from "@model/styles/table.style";
import { BoothStyle } from "@model/styles/booth.style";
import { IconStyle } from "@model/styles/icon.style";
import { TextStyle } from "@model/styles/text.style";
import { FocalStyle } from "@model/styles/focal.style";
import { CanvasTheme } from "@model/theme.palette";
import { ParserEnum } from "@enum/parser.enum";
export declare class StyleConfig {
    seat: SeatStyle;
    block: BLockStyle;
    legend: LegendStyle;
    label: LabelStyle;
    tooltip: TooltipStyle;
    section: SectionStyle;
    ga: GaStyle;
    table: TableStyle;
    booth: BoothStyle;
    icon: IconStyle;
    text: TextStyle;
    focal: FocalStyle;
}
export default class DefaultsModel {
    min_zoom: number;
    max_zoom: number;
    animation_speed: number;
    resizable: boolean;
    container: any;
    zoom_focus_circle_radius: number;
    click_enable_sold_seats: boolean;
    zoom_out_button: string;
    legend: boolean;
    canvas_stageout_control: boolean;
    background_image: string | null;
    background_opacity: number;
    background_fit: 'cover' | 'contain' | 'fill' | 'none';
    background_x: number | null;
    background_y: number | null;
    background_width: number | null;
    background_height: number | null;
    theme: CanvasTheme;
    style: StyleConfig;
    json_model: ParserEnum;
    lang: {
        selectable: string;
        non_selectable: string;
        your_selection: string;
    };
    constructor(config: any);
    getAll(): this;
}
