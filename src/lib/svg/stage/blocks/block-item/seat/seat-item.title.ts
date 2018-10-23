/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import {SeatItem} from "./seat-item.index";

@dom({
    tag: "text",
    class: "label-text",
    autoGenerate: false
})
export class SeatItemTitle extends SvgBase {

    constructor(public parent: SeatItem) {
        super(parent);
        this.attr("fill", this.global.config.label_style.color);
        this.attr("font-size", 10);
        return this;
    }

    update(): this {
        return this;
    }
}