/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";
import BlockModel from "../../../../models/block.model";
import Block from "./block-item.index";
import {BoundItem} from "./bound/bound-item.index";

@dom({
    tag: "g",
    class: "bounds",
    autoGenerate: false
})
export default class BlockBounds extends SvgBase {

    public bound1: BoundItem;
    public bound2: BoundItem;

    constructor(public parent: Block, public item: BlockModel) {
        super(parent);
        return this;
    }

    update(): this {

        // add Border Bounds container
        this.bound1 = new BoundItem(this, this.item);
        this.bound1.attr("fill", this.parent.item.color);
        this.bound1.attr("stroke-width", 70);
        this.bound1.attr("stroke", this.parent.item.color);
        this.bound1.classed("block-hull-border");

        // add Border Bounds container
        this.bound2 = new BoundItem(this, this.item);
        this.bound2.attr("fill", this.item.border_color);
        this.bound2.attr("stroke-width", 60);
        this.bound2.attr("stroke", this.item.border_color);
        this.bound2.classed("block-hull");


        this.addChild(this.bound1);
        this.addChild(this.bound2);

        this.updateChilds();

        return this;
    }
}