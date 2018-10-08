/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import BlocksManager from "../../blocks.index";
import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import BlockModel from "../../../../../models/block.model";
import {BlockItem} from "../block-item.index";
import SeatModel from "../../../../../models/seat.model";
import {BlockItemSeats} from "../block-item.seats.index";
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
        return this;
    }

    update(): this {
        return this;
    }
}