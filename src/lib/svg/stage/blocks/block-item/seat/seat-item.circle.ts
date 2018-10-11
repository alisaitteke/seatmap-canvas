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

        //console.log(parent.parent.parent.parent.parent.parent.parent.config)

        this.attr("block-id", parent.item.block.id);
        this.attr("r", 12);
        this.attr("fill", "#ff0000");
        return this;
    }

    update(): this {
        return this;
    }
}