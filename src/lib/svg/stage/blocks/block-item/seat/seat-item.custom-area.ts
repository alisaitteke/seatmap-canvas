/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {SeatItem} from "./seat-item.index";
import {SeatItemCustomSvg} from "@svg/stage/blocks/block-item/seat/seat-item.custom";

@dom({
    tag: "circle",
    class: "circle-area",
    autoGenerate: false
})
export class SeatItemCustomSvgArea extends SvgBase {

    constructor(public parent: SeatItemCustomSvg) {
        super(parent);
        this.attr("fill", this.global.config.style.label.color);
        this.attr("opacity", 0);
        this.attr("r", this.global.config.style.seat.radius / 1.5);
        this.attr("transform", `translate(${(this.global.config.style.seat.radius / 2) },630)`);

        return this;
    }

    update(): this {

        return this;
    }
}