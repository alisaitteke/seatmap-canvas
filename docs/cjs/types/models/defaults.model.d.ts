import { SeatStyle } from "@model/styles/seat.style";
import { BLockStyle } from "@model/styles/block.style";
import { LegendStyle } from "@model/styles/legend.style";
import { LabelStyle } from "@model/styles/label.style";
import { TooltipStyle } from "@model/styles/tooltip.style";
import { ParserEnum } from "@enum/parser.enum";
export declare class StyleConfig {
    seat: SeatStyle;
    block: BLockStyle;
    legend: LegendStyle;
    label: LabelStyle;
    tooltip: TooltipStyle;
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
