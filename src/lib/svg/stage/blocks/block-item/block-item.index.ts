/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import BlocksManager from "../blocks.index";
import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";
import BlockModel from "../../../../models/block.model";
import {BlockItemSeats} from "./block-item.seats.index";
import {BlockItemInfo} from "./block-item.info.index";
import * as d3 from "d3";


@dom({
    tag: "g",
    class: "block-item",
    autoGenerate: false
})
export class BlockItem extends SvgBase {


    public seats: BlockItemSeats;
    public info: BlockItemInfo;

    constructor(public parent: BlocksManager, public item: BlockModel) {
        super(parent);
        this.attr("id", item.id);
        return this;
    }

    public update() {

        // add Seat container
        this.seats = new BlockItemSeats(this, this.item);
        this.addChild(this.seats);

        // add Block Info container
        this.info = new BlockItemInfo(this, this.item);
        this.addChild(this.info);

        // update childs
        this.updateChilds();
        return this;
    }


}