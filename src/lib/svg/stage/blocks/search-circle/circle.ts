/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../../../decorators";
import SvgBase from "../../../svg.base";
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