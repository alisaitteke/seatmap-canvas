/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


// @todo legend show hide function

import {SeatStyle} from "@model/styles/seat.style";
import {BLockStyle} from "@model/styles/block.style";
import {LegendStyle} from "@model/styles/legend.style";
import {LabelStyle} from "@model/styles/label.style";
import {TooltipStyle} from "@model/styles/tooltip.style";
import {ParserEnum} from "@enum/parser.enum";

export class StyleConfig {
    seat: SeatStyle
    block: BLockStyle
    legend: LegendStyle
    label: LabelStyle
    tooltip: TooltipStyle
}

export default class DefaultsModel {
    min_zoom: number = 0.1;
    max_zoom: number = 1.9;
    animation_speed: number = 600;
    resizable: boolean = false;
    container: any = null;
    zoom_focus_circle_radius: number = 60;
    click_enable_sold_seats: boolean = false;
    zoom_out_button: string;
    legend: boolean = false;
    canvas_stageout_control: boolean = true;
    background_image: string | null = null;
    background_opacity: number = 0.3;
    background_fit: 'cover' | 'contain' | 'fill' | 'none' = 'cover';
    background_x: number | null = null;
    background_y: number | null = null;
    background_width: number | null = null;
    background_height: number | null = null;

    style: StyleConfig;

    json_model: ParserEnum = ParserEnum.SEATMAP;


    lang: {
        selectable: string,
        non_selectable: string,
        your_selection: string
    };

    constructor(config: any) {

        this.json_model = config.json_model ? config.json_model : ParserEnum.SEATMAP;

        this.zoom_focus_circle_radius = config.zoom_focus_circle_radius ? config.zoom_focus_circle_radius : this.zoom_focus_circle_radius;
        this.click_enable_sold_seats = config.click_enable_sold_seats ? config.click_enable_sold_seats : this.click_enable_sold_seats;
        this.max_zoom = config.max_zoom ? config.max_zoom : this.max_zoom;

        this.resizable = config.resizable ? config.resizable : this.resizable;
        this.zoom_out_button = config.zoom_out_button ? config.zoom_out_button : ".zoom-out-button";
        this.legend = config.legend == false ? config.legend : true;
        this.canvas_stageout_control = config.canvas_stageout_control == false ? config.canvas_stageout_control : true;

        this.background_image = config.background_image || null;
        this.background_opacity = config.background_opacity !== undefined ? config.background_opacity : 0.3;
        this.background_fit = config.background_fit || 'cover';
        this.background_x = config.background_x !== undefined ? config.background_x : null;
        this.background_y = config.background_y !== undefined ? config.background_y : null;
        this.background_width = config.background_width || null;
        this.background_height = config.background_height || null;

        this.style = new StyleConfig()

        this.style.seat = Object.assign(new SeatStyle(), config.style.seat)
        this.style.block = Object.assign(new BLockStyle(), config.style.block)
        this.style.legend = Object.assign(new LegendStyle(), config.style.legend)
        this.style.label = Object.assign(new LabelStyle(), config.style.label)
        this.style.tooltip = Object.assign(new TooltipStyle(), config.style.tooltip)

        if (config.style) {

        }


        this.lang = {
            selectable: config.lang && config.lang.selectable || "Selectable",
            non_selectable: config.lang && config.lang.non_selectable || "Non Selectable or Rezerved",
            your_selection: config.lang && config.lang.your_selection || "Your Selection",
        };


    }

    getAll(): this {
        return this;
    }
}