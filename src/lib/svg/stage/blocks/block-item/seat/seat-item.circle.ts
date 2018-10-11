/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
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
        this.attr("r", this.global.config.seat_style.radius);
        this.attr("fill", this.global.config.seat_style.color);
        return this;
    }

    update(): this {
        return this;
    }
}