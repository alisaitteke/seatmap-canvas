/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import Stage from "./stage/stage.index";
import {mouse as d3Mouse} from 'd3-selection'
import "reflect-metadata";

import {SeatMapCanvas} from "../canvas.index";
import SvgBase from "./svg.base";
import {dom} from "../decorators/dom";
import {EventType, ZoomLevel} from "../enums/global";
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
    public zoomOutBg: ZoomOutBg;
    public legend: Legend;
    public tooltip: Tooltip;


    constructor(public parent: SeatMapCanvas) {
        super(parent);
        this.global.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, (zoom_level: any) => {
            this.node.classed("zoom-level-" + ZoomLevel.SEAT, false);
            this.node.classed("zoom-level-" + ZoomLevel.BLOCK, false);
            this.node.classed("zoom-level-" + ZoomLevel.VENUE, false);
            this.node.classed("zoom-level-" + zoom_level.level, true);
        });


        //this.update();
    }

    update() {
        this.stage = new Stage(this).addToParent();
        this.zoomOutBg = new ZoomOutBg(this).addToParent();
        if(this.global.config.legend){
            this.legend = new Legend(this).addToParent();
        }

        this.tooltip = new Tooltip(this).addToParent();


        this.updateChilds();

        this.stage.node.raise();
        if(this.global.config.legend){
            this.legend.node.raise();
        }

        this.tooltip.node.raise();

        this.node.on("mousemove", () => {
            let cor = d3Mouse(this.stage.node.node());
            this.parent.eventManager.dispatch(EventType.MOUSE_MOVE, cor);
        })


        //this.stage.updateEvents(true);
    }


}