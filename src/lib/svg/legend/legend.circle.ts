/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import {dom} from "@decorator/dom";
import SvgBase from "@svg/svg.base";
import LegendItem from "@svg/legend/legend.item";

@dom({
    tag: "circle",
    class: "legend-circle",
    autoGenerate: false
})
export default class LegendCircle extends SvgBase {


    constructor(public parent: LegendItem) {
        super(parent);
        this.attr("r", this.global.config.style.legend.radius);
        this.attr("fill", this.parent.legend_data.color);
    }

    update() {

    }
}