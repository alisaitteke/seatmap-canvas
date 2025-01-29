/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {SeatItem} from "@svg/stage/blocks/block-item/seat/seat-item.index";

@dom({
    tag: "circle",
    class: "seat-check",
    autoGenerate: false
})
export class SeatItemCustomSvgCheck extends SvgBase {

    constructor(public parent: SeatItem) {
        super(parent);
        this.attr("r", this.global.config.style.seat.radius / 2);
        this.attr("fill", this.global.config.style.seat.check_color);
        this.attr("transform", `translate(0,0)`);

        this.attr("pointer-events", "none");
        this.attr("opacity", 0);

        this.attr("stroke", "rgba(0,0,0,0.3)");
        this.attr("stroke-width", 1);

        return this;
    }

    update(): this {
        return this;
    }

    afterGenerate() {
        this.node.style("pointer-events", "none");
    }

    show(): this {
        this.node.transition().duration(150).attr("r", this.global.config.style.seat.radius / 1.3).attr("opacity", 1);
        return this;
    }

    hide(): this {
        this.node.attr("r", this.global.config.style.seat.radius / 4);
        this.node.attr("opacity", 0);
        return this;
    }
}