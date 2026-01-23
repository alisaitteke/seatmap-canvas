/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */
import {line as d3Line} from "d3-shape";

import {dom} from "@decorator/dom";
import SvgBase from "@svg/svg.base";
import Tooltip from "@svg/tooltip";

@dom({
    tag: "rect",
    class: "tooltip-rect",
    autoGenerate: false
})
export default class TooltipRect extends SvgBase {


    constructor(public parent: Tooltip) {
        super(parent);
        const borderRadius = this.global.config.style.tooltip.border_radius || 8;
        
        this.attr("width", this.global.config.style.tooltip.width);
        this.attr("height", this.global.config.style.tooltip.height);
        this.attr("x", 0);
        this.attr("y", 0);
        this.attr("rx", borderRadius);
        this.attr("ry", borderRadius);
        this.attr("fill", this.global.config.style.tooltip.bg);
        this.attr("stroke", this.global.config.style.tooltip.border_color || "rgba(0,0,0,0.15)");
        this.attr("stroke-width", this.global.config.style.tooltip.border_width || 1);

        return this;
    }

    update(): this {
        this.updateChilds();
        return this;
    }

    afterGenerate() {
        this.node.style("pointer-events", "none");
        
        // Add modern shadow
        const shadow = this.global.config.style.tooltip.shadow;
        if (shadow) {
            this.node.style("filter", `drop-shadow(${shadow})`);
        }
    }
}