/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import SeatModel from "./seat.model";
import LabelModel from "./label.model";
import ModelBase from "./model.base";


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
