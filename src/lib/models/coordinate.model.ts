/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


export class CoordinateModel {

    private x: number;
    private y: number;

    constructor(item?: any) {
        this.x = item.x || 0;
        this.y = item.y || 0;
    }

    toArray() {
        return [this.x, this.y];
    }


    toJson() {
        return {}
    }
}


