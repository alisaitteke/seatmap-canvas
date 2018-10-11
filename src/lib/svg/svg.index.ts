/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import Stage from "./stage/stage.index";
import * as d3 from 'd3';
import "reflect-metadata";

import {SeatMapCanvas} from "../canvas.index";
import SvgBase from "./svg.base";
import {dom} from "../decorators/dom";

declare const window: any;

@dom({
    tag: "svg",
    class: "seatmap-svg",
    autoGenerate: false
})
export default class Svg extends SvgBase {
    public stage: Stage;



    constructor(public parent: SeatMapCanvas) {
        super(parent);
        //this.update();
    }

    update(){
        this.stage = new Stage(this);
        this.addChild(this.stage);
        this.updateChilds();


        //this.stage.updateEvents(true);
    }


}