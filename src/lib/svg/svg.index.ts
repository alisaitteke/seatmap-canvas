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
import {EventType} from "../enums/global";
import ZoomOutBg from "./zoom-out.bg";
import Legend from "./legend";
import Tooltip from "./tooltip";

declare const window: any;

@dom({
    tag: "svg",
    class: "seatmap-svg",
    autoGenerate: false
})
export default class Svg extends SvgBase {
    public stage: Stage;
    public zoomOutBg:ZoomOutBg;
    public legend:Legend;
    public tooltip:Tooltip;


    constructor(public parent: SeatMapCanvas) {
        super(parent);
        //this.update();
    }

    update(){
        this.stage = new Stage(this).addToParent();
        this.zoomOutBg = new ZoomOutBg(this).addToParent();
        this.legend = new Legend(this).addToParent();
        this.tooltip = new Tooltip(this).addToParent();

        this.updateChilds();

        this.stage.node.raise();
        this.legend.node.raise();
        this.tooltip.node.raise();

        this.node.on("mousemove",()=>{
            let cor = d3.mouse(this.stage.node.node());
            this.parent.eventManager.dispatch(EventType.MOUSE_MOVE,cor);
        })


        //this.stage.updateEvents(true);
    }


}