/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import {polygonHull} from 'd3-polygon'

import StageManager from "../stage.index";
import Block from "./block-item/block-item.index";
import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import SeatModel from "@model/seat.model";
import {SeatItem} from "./block-item/seat/seat-item.index";
import BlockModel from "@model/block.model";
import LabelModel from "@model/label.model";

@dom({
    tag: "g",
    class: "blocks",
    autoGenerate: false
})
export default class Blocks extends SvgBase {

    public seats: Array<SeatItem>;


    constructor(public parent: StageManager) {
        super(parent);
        return this;
    }

    public update(): this {
        this.clear();
        this.global.data.getBlocks().map((block_item: BlockModel) => {
            let _blockItem = new Block(this, block_item);
            let _seats = block_item.seats;


            // algorithm problem fixed
            if (_seats && _seats.length) {
                _seats[0].y += 0.0001;
                _seats[0].x += 0.0001;
            }

            let bound_items: Array<any> = _seats.map((item: SeatModel) => [item.x, item.y]).concat(block_item.labels.map((item: LabelModel) => [item.x, item.y]));
            block_item.bounds = polygonHull(bound_items);

            this.addChild(_blockItem);
        });
        this.updateChilds();
        this.seats = this.node.selectAll(".seat");

        return this;
    }

    public getBlock(id: any): Block | null {
        const block = this.getBlocks().find((block: Block) => block.item.id == id)
        if (block)
            return block;
        else
            return null;
    }

    public getBlocks(): Array<Block> {
        return this.getChilds(Block.name);
    }

    public center() {

    }
}