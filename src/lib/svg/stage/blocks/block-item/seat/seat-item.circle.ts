/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import {SeatItem} from "./seat-item.index";

@dom({
    tag: "circle",
    class: "seat-circle",
    autoGenerate: false
})
export class SeatItemCircle extends SvgBase {

    constructor(public parent: SeatItem) {
        super(parent);
        this.attr("block-id", parent.item.block.id);
        this.attr("r", this.global.config.style.seat.radius);
        this.attr("fill", this.global.config.style.seat.color);
        this.attr("stroke", "rgba(0,0,0,0.3)");
        this.attr("stroke-width", 1);
        return this;
    }

    update(): this {
        return this;
    }
}