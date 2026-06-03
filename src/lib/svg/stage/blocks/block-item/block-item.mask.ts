/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import BlockModel from "@model/block.model";
import Block from "./block-item.index";
import {BoundItem} from "./bound/bound-item.index";
import {EventType} from "@enum/global";

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
            if(this.global.multi_select)return;
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

        // Check if block has custom background image
        const hasBackground = !!this.item.background_image;
        // Section drill-down uses the chart-level polygon as the visual; the hull
        // mask must never flash on top of it when the block is revealed.
        const hideMasks = hasBackground || this.parent.isSectionBacked();

        // add Border Bounds container
        this.seatLevelMask = new BoundItem(this, this.item);
        this.seatLevelMask.attr("fill", this.item.color);
        this.seatLevelMask.attr("stroke-width", 59);
        this.seatLevelMask.attr("stroke", this.item.color);
        this.seatLevelMask.tags.push("seat-level");
        this.seatLevelMask.classed("seat-level-mask");
        if (hideMasks) {
            this.seatLevelMask.attr("opacity", 0);
            // `classed` is queued until the path node exists (see `SvgBase.classed`).
            this.seatLevelMask.classed("bound-hide", true);
        }


        // add Border Bounds container
        this.blockLevelMask = new BoundItem(this, this.item);
        this.blockLevelMask.attr("fill", this.item.color);
        this.blockLevelMask.attr("stroke-width", 59);
        this.blockLevelMask.attr("stroke", this.item.color);
        this.blockLevelMask.tags.push("block-level");
        this.blockLevelMask.classed("block-level-mask");
        if (hideMasks) {
            this.blockLevelMask.attr("opacity", 0);
            this.blockLevelMask.classed("bound-hide", true);
        }

        this.addChild(this.seatLevelMask);
        this.addChild(this.blockLevelMask);


        this.updateChilds();

        return this;
    }
}