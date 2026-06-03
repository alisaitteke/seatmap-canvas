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
import {SectionStyle} from "@model/styles/section.style";
import {GaStyle} from "@model/styles/ga.style";
import {TableStyle} from "@model/styles/table.style";
import {BoothStyle} from "@model/styles/booth.style";
import {IconStyle} from "@model/styles/icon.style";
import {TextStyle} from "@model/styles/text.style";
import {FocalStyle} from "@model/styles/focal.style";
import {CanvasTheme, getPalette} from "@model/theme.palette";
import {ParserEnum} from "@enum/parser.enum";

export class StyleConfig {
    seat: SeatStyle
    block: BLockStyle
    legend: LegendStyle
    label: LabelStyle
    tooltip: TooltipStyle
    section: SectionStyle
    ga: GaStyle
    table: TableStyle
    booth: BoothStyle
    icon: IconStyle
    text: TextStyle
    focal: FocalStyle
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

    /**
     * Chrome theme for object/seat strokes, fills and labels. Selects the
     * light/dark palette (see {@link getPalette}) that seeds every style group.
     * Data-driven category colors are never themed.
     */
    theme: CanvasTheme = 'light';

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

        this.theme = config.theme === 'dark' ? 'dark' : 'light';
        const palette = getPalette(this.theme);

        this.style = new StyleConfig()

        // Defensive: callers may omit `style` entirely, or pass a partial
        // override (e.g. only `seat`). Treat any missing branch as an empty
        // object so `Object.assign` falls back to the defaults. Style groups
        // are seeded from the resolved theme palette, then user overrides win.
        const styleOverrides: any = config.style || {};

        this.style.seat = Object.assign(new SeatStyle(palette), styleOverrides.seat || {})
        this.style.block = Object.assign(new BLockStyle(), styleOverrides.block || {})
        this.style.legend = Object.assign(new LegendStyle(), styleOverrides.legend || {})
        this.style.label = Object.assign(new LabelStyle(), styleOverrides.label || {})
        this.style.tooltip = Object.assign(new TooltipStyle(), styleOverrides.tooltip || {})
        this.style.section = Object.assign(new SectionStyle(palette), styleOverrides.section || {})
        this.style.ga = Object.assign(new GaStyle(palette), styleOverrides.ga || {})
        this.style.table = Object.assign(new TableStyle(palette), styleOverrides.table || {})
        this.style.booth = Object.assign(new BoothStyle(palette), styleOverrides.booth || {})
        this.style.icon = Object.assign(new IconStyle(palette), styleOverrides.icon || {})
        this.style.text = Object.assign(new TextStyle(palette), styleOverrides.text || {})
        this.style.focal = Object.assign(new FocalStyle(palette), styleOverrides.focal || {})


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