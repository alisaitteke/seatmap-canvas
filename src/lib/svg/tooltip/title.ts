/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import {dom} from "@decorator//dom";
import SvgBase from "@svg/svg.base";
import Tooltip from "@svg/tooltip";

@dom({
    tag: "text",
    class: "tooltip-title",
    autoGenerate: false
})
export default class TooltipTitle extends SvgBase {

    title: Array<string>;

    constructor(public parent: Tooltip) {
        super(parent);
        const textAlign = this.global.config.style.tooltip.text_align || 'center';
        const tooltipWidth = this.global.config.style.tooltip.width;
        
        // Center align by default
        const xPos = textAlign === 'center' ? tooltipWidth / 2 : (this.global.config.style.tooltip.padding || 12);
        
        this.attr("x", xPos);
        this.attr("y", 0);
        this.attr("fill", this.global.config.style.tooltip.color);
        this.attr("text-anchor", textAlign === 'center' ? 'middle' : 'start');
        return this;
    }

    update(): this {
        this.updateChilds();
        return this;
    }

    afterGenerate() {
        this.node.style("pointer-events", "none");
        this.node.style("font-size", this.global.config.style.tooltip.font_size || "13px");
        this.node.style("font-weight", this.global.config.style.tooltip.font_weight || "500");
    }

    generateTitle() {
        const lineHeight = this.global.config.style.tooltip.line_height || 18;
        const padding = this.global.config.style.tooltip.padding || 12;
        const fontSize = parseInt(this.global.config.style.tooltip.font_size) || 13;
        
        // Calculate starting Y position to vertically center all lines
        const totalTextHeight = (this.title.length * lineHeight) - (lineHeight - fontSize);
        const startY = padding + fontSize;
        
        this.node.selectAll("tspan").remove()
            .data(this.title).enter()
            .append("tspan")
            .text((item: string) => item)
            .attr("x", this.node.attr("x"))
            .attr("y", (line: any, index: number) => startY + (index * lineHeight));
    }

}