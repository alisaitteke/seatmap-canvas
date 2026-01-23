/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {SeatItemRect} from "./seat-item.rect";

@dom({
    tag: "rect",
    class: "rect-area",
    autoGenerate: false
})
export class SeatItemRectArea extends SvgBase {

    constructor(public parent: SeatItemRect) {
        super(parent);
        const size = this.global.config.style.seat.size || (this.global.config.style.seat.radius * 2);
        const cornerRadius = this.global.config.style.seat.corner_radius || 0;
        
        this.attr("width", size);
        this.attr("height", size);
        this.attr("x", -size / 2);
        this.attr("y", -size / 2);
        this.attr("rx", cornerRadius);
        this.attr("ry", cornerRadius);
        this.attr("fill", "transparent");
        this.attr("opacity", 0);
        this.attr("pointer-events", "all");
        return this;
    }

    update(): this {
        return this;
    }
}
