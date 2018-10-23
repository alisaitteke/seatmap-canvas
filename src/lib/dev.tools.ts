/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import {SeatMapCanvas} from "./canvas.index";

export default class SeatMapDevTools {
    constructor(private context: SeatMapCanvas) {
    }

    public log(...messages: any[]): this {
        console.log(messages);
        return this;
    }


}