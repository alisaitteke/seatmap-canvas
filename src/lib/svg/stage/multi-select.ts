/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import {mouse as d3Mouse} from 'd3-selection'

import SvgBase from "@svg//svg.base";
import Svg from "@svg/svg.index";
import MultiSelectRect from "./multi-select/rect";
import {EventType} from "@enum/global";


import {dom} from "@decorator/dom";

@dom({
    tag: "g",
    class: "multi-select-tools",
    autoGenerate: false
})
export default class MultiSelect extends SvgBase {


    public rect: MultiSelectRect;
    public enable: boolean;
    public start: boolean;

    public points: any = {
        start: null,
        end: null
    };

    constructor(public parent: Svg) {
        super(parent);
        this.enable = false;
        this.start = false;


        // this.global.eventManager.addEventListener(EventType.MOUSEDOWN_BLOCK, (e: any, node: any, mouse: any) => {
        //
        // });
        this.global.eventManager.addEventListener(EventType.MOUSEUP_BLOCK, () => {
            if (this.global.multi_select && this.start) {
                //console.log("up");
            }
        });

        return this;
    }

    update(): this {

        this.rect = new MultiSelectRect(this).addTo(this);
        this.updateChilds();

        return this;
    }

    afterGenerate() {

        this.parent.stage.node.on("mousedown", () => {
            if (!this.global.multi_select) return;
            // console.log("e", e);
            // console.log("mouse", mouse);
            // console.log("mouse", mouse);
            let mouse = d3Mouse(this.parent.stage.node.node());
            if (this.start) {
                this.start = false;

                this.points.end = mouse;
                let width = this.points.end[0] - this.points.start[0];
                let height = this.points.end[1] - this.points.start[1];


                this.rect.node.attr("width", width);
                this.rect.node.attr("height", height);
                this.rect.node.attr("x", this.points.start[0]);
                this.rect.node.attr("y", this.points.end[0]);

                this.points.start = null;
                this.points.end = null;
            } else {
                this.start = true;
                this.points.start = mouse;

            }

        });
        this.parent.stage.node.on("mousemove", () => {
            if (this.global.multi_select) {
                if (this.start) {
                    let mouse = d3Mouse(this.parent.stage.node.node());
                    let width = mouse[0] - this.points.start[0];
                    let height = mouse[1] - this.points.start[1];

                    this.points.end = mouse;

                    this.rect.node.attr("width", width);
                    this.rect.node.attr("height", height);
                    this.rect.node.attr("x", this.points.start[0]);
                    this.rect.node.attr("y", this.points.end[0]);
                }
            }

        });
    }
}