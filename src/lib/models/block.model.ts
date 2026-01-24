/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import SeatModel from "@model/seat.model";
import LabelModel from "@model/label.model";
import ModelBase from "@model/model.base";


export default class BlockModel extends ModelBase {
    id: string;
    seats: Array<SeatModel>;
    labels: Array<LabelModel>;
    title: String;
    bounds: any;
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    border_color: string;
    bbox: any;
    zoom_bbox: any;
    rotate: number;
    gap: number;
    background_image?: string | null;
    background_opacity?: number;
    background_fit?: 'cover' | 'contain' | 'fill' | 'none';
    background_x?: number | null;
    background_y?: number | null;
    background_width?: number | null;
    background_height?: number | null;

    constructor(item: any) {
        super();
        this.id = item.id ? item.id : (Math.random() * 1000).toString();
        this.width = item.width || null;
        this.height = item.height || null;
        this.x = item.x || null;
        this.y = item.y || null;
        this.bounds = item._bounds || [];
        this.color = item.color || "#f1f1f1";
        this.border_color = item.border_color || "#f1f1f1";
        this.title = item.title;
        this.rotate = item.rotate || 0;
        this.gap = item.gap || 12;
        this.background_image = item.background_image || null;
        this.background_opacity = item.background_opacity !== undefined ? item.background_opacity : 1;
        this.background_fit = item.background_fit || 'cover';
        this.background_x = item.background_x !== undefined ? item.background_x : null;
        this.background_y = item.background_y !== undefined ? item.background_y : null;
        this.background_width = item.background_width || null;
        this.background_height = item.background_height || null;

        this.labels = item.labels.map((item: any) => {
            item.block = this;
            return new LabelModel(item);
        }) || [];


        this.seats = item.seats.map((item: any) => {
            item.block = this;
            let seat: SeatModel = new SeatModel(item);
            return seat;
        }) || [];
    }



    toJson() {
        return {
            id: this.id,
            title: this.title,
            x: this.x,
            y: this.y,
            color: this.color,
            width: this.width,
            height: this.height

        }
    }
}
