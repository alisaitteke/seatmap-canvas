/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import {dom} from "@decorator/dom";
import SvgBase from "@svg/svg.base";
import BlocksSearchCircle from "../blocks.search-circle";

@dom({
    tag: "circle",
    class: "circle",
    autoGenerate: false
})
export default class Circle extends SvgBase {


    constructor(public parent: BlocksSearchCircle) {
        super(parent);
        // .attr("r", this.defaults.zoom_focus_circle_radius)
        //         .style("display", "none")
        //         .classed("zoom-circle", true);

        this.attr("r", this.parent.global.config.zoom_focus_circle_radius);


        return this;
    }

    update(): this {

        this.updateChilds();

        return this;
    }
}