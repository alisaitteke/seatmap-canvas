/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


export class CoordinateModel {

    private _x: number;
    private _y: number;

    constructor(item?: any) {
        this.x = item.x || 0;
        this.y = item.y || 0;
    }

    toArray() {
        return [this.x, this.y];
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

    toJson() {
        return {}
    }
}


