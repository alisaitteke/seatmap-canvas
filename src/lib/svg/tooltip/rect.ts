/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import {dom} from "../../decorators";
import SvgBase from "../svg.base";

import {line as d3Line} from "d3-shape";
import Tooltip from "../tooltip";

@dom({
    tag: "rect",
    class: "tooltip-rect",
    autoGenerate: false
})
export default class TooltipRect extends SvgBase {


    constructor(public parent: Tooltip) {
        super(parent);
        this.attr("width", this.global.config.style.tooltip.width);
        this.attr("height", this.global.config.style.tooltip.height);
        this.attr("x", 0);
        this.attr("y", 0);
        this.attr("rx", 3);
        this.attr("ry", 3);

        const data:any = [
            {'x': 0, 'y': 0},
            {'x': 0, 'y': 30},
            {'x': 30, 'y': 30},
            {'x': 30, 'y': 0},
            {'x': 0, 'y': 0},
        ];

        const line = d3Line()
            .x((d: any) => {
                return d['x'];
            })
            .y((d: any) => {
                return d['y'];
            });

        this.attr("fill", this.global.config.style.tooltip.bg);
        this.attr("stroke", "rgba(0,0,0,0.3)");
        this.attr("stroke-width", "1px");
        this.attr("opacity", 0.8);

        //this.attr('d', line(data));


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