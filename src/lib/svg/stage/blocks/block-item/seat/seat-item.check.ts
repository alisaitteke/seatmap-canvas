/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import {SeatItem} from "./seat-item.index";

@dom({
    tag: "path",
    class: "seat-check",
    autoGenerate: false
})
export class SeatItemCheck extends SvgBase {

    constructor(public parent: SeatItem) {
        super(parent);
        this.attr("d", "M13.9,952.4l-7.7,8l-3.6-3.1l-2.6,3l5,4.3l1.4,1.2l1.3-1.4l9-9.3L13.9,952.4L13.9,952.4z");
        this.attr("fill", this.global.config.seat_style.check_color);
        this.attr("transform", "translate(-8,-959.36218)");
        this.attr("pointer-events", "none");
        this.attr("display", "none");

        return this;
    }

    update(): this {
        return this;
    }

    afterGenerate() {
        this.node.style("pointer-events", "none");
    }

    show():this {
        this.node.attr("display", "block");
        return this;
    }

    hide():this {
        this.node.attr("display", "none");
        return this;
    }
}