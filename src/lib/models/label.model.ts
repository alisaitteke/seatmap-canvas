/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */



import BlockModel from "./block.model";

export default class LabelModel {
    private _x: number;
    private _y: number;
    private _title: string;

    private _block: BlockModel;

    constructor(item: any) {
        this.x = item.x;
        this.y = item.y;
        this.title = item.title;
        this.block = item.block;
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

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get block(): BlockModel {
        return this._block;
    }

    set block(value: BlockModel) {
        this._block = value;
    }
}