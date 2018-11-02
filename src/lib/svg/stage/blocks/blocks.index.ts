/*
 * blocks.ts
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import StageManager from "../stage.index";
import Block from "./block-item/block-item.index";
import SvgBase from "../../svg.base";
import {dom} from "../../../decorators/dom";
import SeatModel from "../../../models/seat.model";
import * as d3 from "d3";
import {SeatItem} from "./block-item/seat/seat-item.index";
import BlockModel from "../../../models/block.model";
import LabelModel from "../../../models/label.model";

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
        this.global.data.getBlocks().map((block_item: BlockModel, i: number) => {
            let _blockItem = new Block(this, block_item);
            let _seats = block_item.seats;


            // algoritym problem fixed
            if (_seats && _seats.length) {
                _seats[0].y += 0.0001;
            }

            let bound_items: Array<any> = _seats.map((item: SeatModel) => [item.x, item.y]).concat(block_item.labels.map((item: LabelModel) => [item.x, item.y]));
            let _bounds = d3.polygonHull(bound_items);
            block_item.bounds = _bounds;
            console.log("_bounds", _bounds);

            this.addChild(_blockItem);
        });
        this.updateChilds();
        this.seats = this.node.selectAll(".seat");

        return this;
    }

    public getBlock(id: any): Block {
        return this.getBlocks().find((block: Block) => block.item.id == id);
    }

    public getBlocks(): Array<Block> {
        return this.getChilds(Block.name);
    }

    public center() {

    }
}