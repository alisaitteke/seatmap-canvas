/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../decorators";
import SvgBase from "../svg.base";

import * as d3 from "d3";
import Tooltip from "../tooltip";

@dom({
    tag: "path",
    class: "tooltip-rect",
    autoGenerate: false
})
export default class TooltipRect extends SvgBase {


    constructor(public parent: Tooltip) {
        super(parent);
        // this.attr("width", this.global.config.tooltip_style.width);
        // this.attr("height", this.global.config.tooltip_style.height);
        // this.attr("x", 0);
        // this.attr("y", 0);
        // this.attr("rx", 3);
        // this.attr("ry", 3);

        const data:any = [
            {'x': 0, 'y': 0},
            {'x': 0, 'y': 30},
            {'x': 30, 'y': 30},
            {'x': 30, 'y': 0},
            {'x': 0, 'y': 0},
        ];

        const line = d3.line()
            .x((d: any) => {
                return d['x'];
            })
            .y((d: any) => {
                return d['y'];
            });


        this.attr("fill", this.global.config.seat_style.hover);

        this.attr("stroke", "rgba(0,0,0,0.3)");
        this.attr("stroke-width", "1px");

        this.attr("opacity", 0.8);

        this.attr('d', line(data));


        return this;
    }

    update(): this {
        this.updateChilds();
        return this;
    }

    afterGenerate() {

        this.node.style("pointer-events", "none");
    }
}