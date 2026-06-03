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

        // Hide the filled hull when the block paints its own background, either a
        // custom background image or block-local table bodies (the table body is
        // the cluster background). The bounds geometry is still computed so
        // `center_position` and zoom-to-block keep working.
        const hasBackground = !!this.item.background_image;
        const hasTables = !!(this.item.tables && this.item.tables.length);
        const hideHull = hasBackground || hasTables;

        // add Border Bounds container
        this.bound1 = new BoundItem(this, this.item);
        this.bound1.attr("fill", this.parent.item.border_color);
        this.bound1.attr("stroke-width", 70);
        this.bound1.attr("stroke", this.parent.item.border_color);
        this.bound1.classed("block-hull-border");
        if (hideHull) {
            this.bound1.attr("opacity", 0);
        }

        // add Border Bounds container
        this.bound2 = new BoundItem(this, this.item);
        this.bound2.attr("fill", this.item.color);
        this.bound2.attr("stroke-width", 60);
        this.bound2.attr("stroke", this.item.color);
        this.bound2.classed("block-hull");
        if (hideHull) {
            this.bound2.attr("opacity", 0);
        }


        this.addChild(this.bound1);
        this.addChild(this.bound2);

        this.updateChilds();

        return this;
    }
}