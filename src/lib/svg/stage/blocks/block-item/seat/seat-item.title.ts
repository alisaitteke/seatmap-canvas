/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {SeatItem} from "./seat-item.index";

@dom({
    tag: "text",
    class: "label-text",
    autoGenerate: false
})
export class SeatItemTitle extends SvgBase {

    constructor(public parent: SeatItem) {
        super(parent);
        this.attr("fill", this.global.config.style.label.color);
        this.attr("font-size", 10);
        return this;
    }

    update(): this {
        return this;
    }
}