/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import {dom} from "../../decorators";
import SvgBase from "../svg.base";
import Tooltip from "../tooltip";

@dom({
    tag: "text",
    class: "tooltip-title",
    autoGenerate: false
})
export default class TooltipTitle extends SvgBase {

    title: Array<string>;

    constructor(public parent: Tooltip) {
        super(parent);
        this.attr("x", 6);
        this.attr("y", 21);
        this.attr("fill", this.global.config.style.tooltip.color);
        return this;
    }

    update(): this {
        this.updateChilds();
        return this;
    }

    afterGenerate() {

        this.node.style("pointer-events", "none");
        this.node.style("font-size", "12px");
    }

    generateTitle() {
        this.node.selectAll("tspan").remove()
            .data(this.title).enter()
            .append("tspan")
            .text((item: string) => item)
            .attr("x", 6)
            .attr("y", (line: any, index: number) => (index * 16) + 16);
    }

}