/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../../decorators";
import SvgBase from "./../../svg.base";
import MultiSelect from "../multi-select";

@dom({
    tag: "rect",
    class: "multi-select-rect",
    autoGenerate: false
})
export default class MultiSelectRect extends SvgBase {


    constructor(public parent: MultiSelect) {
        super(parent);
        this.attr("width", 250);
        this.attr("height", 250);

        this.attr("x", 250);
        this.attr("y", 250);

        this.attr("fill", "none");
        this.attr("stroke", "rgba(0,0,0,0.5)");
        this.attr("stroke-width", "3px");
        this.attr("stroke-dasharray", "4");
    }

    update() {

    }
}