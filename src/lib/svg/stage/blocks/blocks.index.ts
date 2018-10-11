/*
 * blocks.ts
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import StageManager from "../stage.index";
import Block from "./block-item/block-item.index";
import SvgBase from "../../svg.base";
import {dom} from "../../../decorators/dom";
import BlockModel from "../../../models/block.model";
import SeatModel from "../../../models/seat.model";
import * as d3 from "d3";
import {SeatItem} from "./block-item/seat/seat-item.index";

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

    public beforeRender(){
        console.log("before blocks")
    }

    public afterRender(){
        console.log("after blocks")
    }

    public update(): this {
        this.global.data.getBlocks().map((item: any, i: number) => {
            let _blockItem = new Block(this, item);
            let _seats = item.seats;
            let bound_items: Array<any> = _seats.map((item: SeatModel) => [item.x, item.y]).concat(item.labels.map((item: SeatModel) => [item.x, item.y]));
            let _bounds = d3.polygonHull(bound_items);
            item.bounds = _bounds;

            this.addChild(_blockItem);
        });
        this.updateChilds();
        this.seats = this.node.selectAll(".seat");

        return this;
    }

    public getBlock(id: any): Block {
        return this.child_items.find((block: Block) => block.item.id == id);
    }

    public getBlocks(): Array<Block> {
        return this.child_items;
    }

    public center(){

    }
}