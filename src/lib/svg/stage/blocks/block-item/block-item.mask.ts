/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";
import BlockModel from "../../../../models/block.model";
import Block from "./block-item.index";
import {BoundItem} from "./bound/bound-item.index";
import {EventType} from "../../../../enums/global";

@dom({
    tag: "g",
    class: "masks",
    autoGenerate: false
})
export default class BlockMask extends SvgBase {

    public blockLevelMask: BoundItem;
    public seatLevelMask: BoundItem;

    constructor(public parent: Block, public item: BlockModel) {
        super(parent);

        this.global.eventManager.addEventListener(EventType.BOUND_CLICK, (bound: BoundItem) => {
            let _block = bound.parent.parent.item;
            if (bound.hasTag("block-level")) {
                parent.global.zoomManager.zoomToBlock(_block.id);
            } else if (bound.hasTag("seat-level")) {
                parent.global.zoomManager.zoomToSelection();
            }
        });


        return this;
    }

    update(): this {

        // add Border Bounds container
        this.seatLevelMask = new BoundItem(this, this.item);
        this.seatLevelMask.attr("fill", this.item.color);
        this.seatLevelMask.attr("stroke-width", 59);
        this.seatLevelMask.attr("stroke", this.item.color);
        this.seatLevelMask.tags.push("seat-level");
        this.seatLevelMask.classed("seat-level-mask");


        // add Border Bounds container
        this.blockLevelMask = new BoundItem(this, this.item);
        this.blockLevelMask.attr("fill", this.item.color);
        this.blockLevelMask.attr("stroke-width", 59);
        this.blockLevelMask.attr("stroke", this.item.color);
        this.blockLevelMask.tags.push("block-level");
        this.blockLevelMask.classed("block-level-mask");

        this.addChild(this.seatLevelMask);
        this.addChild(this.blockLevelMask);


        this.updateChilds();

        return this;
    }
}