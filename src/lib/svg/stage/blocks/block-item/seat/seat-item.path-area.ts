/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {SeatItemPath} from "./seat-item.path";

@dom({
    tag: "circle",
    class: "path-area",
    autoGenerate: false
})
export class SeatItemPathArea extends SvgBase {

    constructor(public parent: SeatItemPath) {
        super(parent);
        const size = this.global.config.style.seat.size || (this.global.config.style.seat.radius * 2);
        this.attr("fill", "transparent");
        this.attr("opacity", 0);
        this.attr("r", size / 2);
        this.attr("pointer-events", "all");
        return this;
    }

    update(): this {
        return this;
    }
}
