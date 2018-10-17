/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../decorators";
import SvgBase from "./../svg.base";
import LegendItem from "./legend.item";

@dom({
    tag: "circle",
    class: "legend-circle",
    autoGenerate: false
})
export default class LegendCircle extends SvgBase {


    constructor(public parent: LegendItem) {
        super(parent);
        this.attr("r", this.global.config.legend_style.radius);
        this.attr("fill", this.parent.legend_data.color);
    }

    update() {

    }
}