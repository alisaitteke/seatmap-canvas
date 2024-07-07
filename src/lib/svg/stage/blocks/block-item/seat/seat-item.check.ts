/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {SeatItem} from "@svg/stage/blocks/block-item/seat/seat-item.index";

@dom({
    tag: "path",
    class: "seat-check",
    autoGenerate: false
})
export class SeatItemCheck extends SvgBase {

    constructor(public parent: SeatItem) {
        super(parent);
        this.attr("d", "M12.9,953.7l-6.3,6.5l-2.9-2.5l-2.1,2.4l4.1,3.5l1.1,1l1.1-1.1l7.3-7.6L12.9,953.7L12.9,953.7z");
        this.attr("fill", this.global.config.style.seat.check_color);
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