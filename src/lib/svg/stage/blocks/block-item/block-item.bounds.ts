/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import BlockModel from "@model/block.model";
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
        
        // Hide entire bounds group if block has custom background
        if (this.item.background_image) {
            this.attr("opacity", 0);
        }
        
        return this;
    }

    update(): this {

        // Check if block has custom background image
        const hasBackground = !!this.item.background_image;

        // add Border Bounds container
        this.bound1 = new BoundItem(this, this.item);
        this.bound1.attr("fill", this.parent.item.border_color);
        this.bound1.attr("stroke-width", 70);
        this.bound1.attr("stroke", this.parent.item.border_color);
        this.bound1.classed("block-hull-border");
        // Hide bounds if background image exists
        if (hasBackground) {
            this.bound1.attr("opacity", 0);
        }

        // add Border Bounds container
        this.bound2 = new BoundItem(this, this.item);
        this.bound2.attr("fill", this.item.color);
        this.bound2.attr("stroke-width", 60);
        this.bound2.attr("stroke", this.item.color);
        this.bound2.classed("block-hull");
        // Hide bounds if background image exists
        if (hasBackground) {
            this.bound2.attr("opacity", 0);
        }


        this.addChild(this.bound1);
        this.addChild(this.bound2);

        this.updateChilds();

        return this;
    }
}