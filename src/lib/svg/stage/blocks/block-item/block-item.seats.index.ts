/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";

import {BlockItem} from "./block-item.index";
import SeatModel from "../../../../models/seat.model";
import {SeatItem} from "./seat/seat-item.index";
import BlockModel from "../../../../models/block.model";


@dom({
    tag: "g",
    class: "seats",
    autoGenerate: false
})
export class BlockItemSeats extends SvgBase {

    constructor(public parent: BlockItem, public item: BlockModel) {
        super(parent);
        return this;
    }

    update(): this {
        // add seat items in blockItem container
        this.item.seats.map((seat: SeatModel) => {
            this.addChild(new SeatItem(this, seat), {id: seat.id})
        });
        this.updateChilds();
        return this;
    }

    // Getting seat method
    // ex: seatmap.stage.blocks.getBlock(2).seats.getSeat("1-1")
    public getSeat(id: any): SeatItem {
        return this.child_items.find((seat: SeatItem) => seat.item.id == id);
    }
}