/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import StageManager from "./stage/stage.index";
import * as d3 from 'd3';
import "reflect-metadata";

import {SeatMapCanvas} from "../canvas.index";
import SvgBase from "./svg.base";
import {dom} from "../decorators/dom";

declare const window: any;


@dom({
    tag: "svg",
    class: "seatmap-svg"
})
export class SvgManager extends SvgBase {
    public stage: StageManager;
    constructor(public parent: SeatMapCanvas) {
        super(parent);
        this.stage = new StageManager(this);
    }
}