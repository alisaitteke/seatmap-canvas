/*
 * blocks.ts
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import StageManager from "../stage.index";
import {BlockItem} from "./block-item/block-item.index";
import SvgBase from "../../svg.base";
import {dom} from "../../../decorators/dom";
import BlockModel from "../../../models/block.model";

@dom({
    tag: "g",
    class: "blocks"
})
export default class BlocksManager extends SvgBase {

    constructor(public parent: StageManager) {
        super(parent);
        return this;
    }

    public update(blocks: Array<BlockModel> = null) {
        if (blocks) {
            blocks.map((item: any, i: number) => {
                let _blockItem = new BlockItem(this, item);
                this.addChild(_blockItem);
            });
        }
        this.updateChilds();
        return this;
    }

    public getBlock(id: any): BlockItem {
        return this.child_items.find((block: BlockItem) => block.item.id == id);
    }
}