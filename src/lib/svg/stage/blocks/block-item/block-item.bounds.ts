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

        // The convex hull is geometry-only by default: it still feeds the click
        // mask, zoom framing and `center_position`, but it is never painted.
        // The visible fill/border is drawn only for an explicit author polygon
        // (manual `_bounds`, i.e. `auto_bounds === false`). A custom background
        // image also suppresses the hull. Hiding the whole `.bounds` group via
        // group-level opacity reliably overrides the per-element CSS opacity.
        if (this.shouldHideHull()) {
            this.attr("opacity", 0);
        }

        return this;
    }

    // The painted hull is opt-in: only an explicit manual `_bounds` polygon is
    // rendered as the section boundary. The automatic convex hull is never
    // drawn (it remains an invisible hit/zoom region). A custom background image
    // also hides the hull.
    private shouldHideHull(): boolean {
        // The section polygon (objects layer) is the visible boundary; never
        // paint the block hull on top of it when this block is id-linked.
        if (this.parent.isSectionBacked()) {
            return true;
        }
        return !this.item.bounds_is_manual || !!this.item.background_image;
    }

    update(): this {

        // The hull is a block-level feature. Hide the filled hull unless it is
        // an explicit author polygon (manual `_bounds`). Block-local tables are
        // objects rendered inside the block and must not affect the hull; the
        // bounds geometry is still computed so `center_position` and
        // zoom-to-block work even when the hull is invisible.
        const hideHull = this.shouldHideHull();

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