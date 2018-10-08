/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import BlocksManager from "../blocks.index";
import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";
import BlockModel from "../../../../models/block.model";
import {BlockItem} from "./block-item.index";
import SeatModel from "../../../../models/seat.model";

@dom({
    tag: "g",
    class: "info",
    autoGenerate:false
})
export class BlockItemInfo extends SvgBase {

    constructor(public parent: BlockItem, public item:BlockModel) {
        super(parent);
        return this;
    }

    update():this {
        return this;
    }
}