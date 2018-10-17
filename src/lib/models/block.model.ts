/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import SeatModel from "./seat.model";
import LabelModel from "./label.model";
import {extent} from "d3-array";
import ModelBase from "./model.base";


export default class BlockModel extends ModelBase {
    private _id: string;
    private _seats: Array<SeatModel>;
    private _labels: Array<LabelModel>;
    private _title: String;
    private _bounds: any;
    private _width: number;
    private _height: number;
    private _x: number;
    private _y: number;
    private _color: string;
    private _border_color: string;
    private _bbox: any;
    private _zoom_bbox: any;

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

        this.labels = item.labels.map((item: any) => {
            item.block = this;
            return new LabelModel(item);
        }) || [];

        this.seats = item.seats.map((item: any) => {
            item.block = this;
            return new SeatModel(item);
        }) || [];
    }

    get seats(): Array<SeatModel> {
        return this._seats;
    }

    set seats(value: Array<SeatModel>) {
        this._seats = value;
    }

    get labels(): Array<LabelModel> {
        return this._labels;
    }

    set labels(value: Array<LabelModel>) {
        this._labels = value;
    }

    get title(): String {
        return this._title;
    }

    set title(value: String) {
        this._title = value;
    }

    get bounds(): any {
        return this._bounds;
    }

    set bounds(value: any) {
        this._bounds = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }


    get border_color(): string {
        return this._border_color;
    }

    set border_color(value: string) {
        this._border_color = value;
    }


    get bbox(): any {
        return this._bbox;
    }

    set bbox(value: any) {
        this._bbox = value;
    }


    get zoom_bbox(): any {
        return this._zoom_bbox;
    }

    set zoom_bbox(value: any) {
        this._zoom_bbox = value;
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
