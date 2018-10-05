/*
  defaults.ts - seatmap canvas default configs
  Copyright (C) 2018  Ali Sait TEKE
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


// @todo legend show hide function
export class DefaultOptions {
    min_zoom: number = 0.1;
    max_zoom: number = 2;
    animation_speed: number = 600;
    resizable: boolean = false;
    container: any = null;
    zoom_focus_circle_radius: number = 100;
    click_enable_sold_seats: boolean = false;
    zoom_out_button: string = null;
    autohide_legend:boolean = false;
    seat_style: {
        radius: number,
        color: string,
        not_salable: string,
        selected: string,
        hover: string,
        focus: string,
        focus_out: string
    };
    block_style: {
        fill: string
        stroke: string,
        border_width: number
    };

    legend_style: {
        radius: number,
        padding: number,
        font_size: number
    };

    label_style: {
        color: string
        bg: string
        font_size: number
        radius: number
    };

    constructor(config: any) {

        this.zoom_focus_circle_radius = config.zoom_focus_circle_radius ? config.zoom_focus_circle_radius : this.zoom_focus_circle_radius;
        this.click_enable_sold_seats = config.click_enable_sold_seats ? config.click_enable_sold_seats : this.click_enable_sold_seats;
        this.autohide_legend = config.autohide_legend ? config.autohide_legend : this.autohide_legend;
        this.max_zoom = config.max_zoom ? config.max_zoom : this.max_zoom;

        this.resizable = config.resizable ? config.resizable : this.resizable;
        this.zoom_out_button = "M192.9,183.3l-65.7-65.7c10.3-12.3,16.4-28.4,16.4-45.8C143.7,32.2,111.5,0,71.8,0S0,32.2,0,71.8 s32.2,71.8,71.8,71.8c17.4,0,33.2-6.2,45.8-16.4l65.7,65.7L192.9,183.3z M13.7,71.8c0-32.2,26-58.2,58.2-58.2s58.2,26,58.2,58.2 S104,130,71.8,130S13.7,104,13.7,71.8z M47.9,65h47.9v13.7H47.9V65z";
        if (config.seat_style) {
            this.seat_style = {
                radius: config.seat_style.radius || 12,
                color: config.seat_style.color || "#77b2ff",
                not_salable: config.seat_style.not_salable || "#77b2ff",
                selected: config.seat_style.selected || "#51ff48",
                hover: config.seat_style.hover || "#4770ff",
                focus: config.seat_style.focus || "#51ff48",
                focus_out: config.seat_style.focus_out || "#ff001c"
            };
        }
        if (config.block_style) {
            this.block_style = {
                fill: config.block_style.fill || "#ffffff",
                stroke: config.block_style.stroke || "#ffffff",
                border_width: config.block_style.border_width || 4
            };
        }
        if (config.label_style) {
            this.label_style = {
                color: config.label_style.color || "#000000",
                bg: config.label_style.bg || "#ffffff",
                font_size: config.label_style.font_size || 12,
                radius: config.label_style.radius || 12,
            };
        }
        if (config.legend_style) {
            this.legend_style = {
                radius: config.legend_style.radius || 12,
                padding: config.legend_style.padding || 100,
                font_size: config.legend_style.font_size || 100,
            };
        }


    }
}