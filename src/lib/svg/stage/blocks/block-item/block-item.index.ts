/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import BlocksManager from "../blocks.index";
import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";
import BlockModel from "../../../../models/block.model";
import Seats from "./block-item.seats.index";
import BlockInfo from "./block-item.info.index";
import BlockBounds from "./block-item.bounds";


@dom({
    tag: "g",
    class: "block",
    autoGenerate: false
})
export default class Block extends SvgBase {


    public seats: Seats;
    public info: BlockInfo;

    constructor(public parent: BlocksManager, public item: BlockModel) {
        super(parent);
        this.attr("id", item.id);
        return this;
    }

    public update() {

        // add Block Bounds container
        this.info = new BlockBounds(this, this.item);
        this.addChild(this.info);


        // add Seat container
        this.seats = new Seats(this, this.item);
        this.addChild(this.seats);

        // add Block Info container
        this.info = new BlockInfo(this, this.item);
        this.addChild(this.info);

        // update childs
        this.updateChilds();
        return this;
    }


}