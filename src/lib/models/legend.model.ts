/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import ModelBase from "./model.base";

export default class LegendModel extends ModelBase {
    x: number;
    y: number;
    title: string;
    color: string;


    constructor(item: any) {
        super();
        this.x = item.x;
        this.y = item.y;
        this.title = item.title;
        this.color = item.color;
    }

}