/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import {polygonHull, polygonCentroid} from 'd3-polygon'

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
            // console.log('bound_items', JSON.stringify(bound_items))

            // const poly = polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
            // const scaledPoly = TurfTransformScale(poly, 3);

            // Scale işlemi için merkez noktasını hesapla


            // Ölçekleme fonksiyonu


            block_item.bounds = polygonHull(bound_items);

            const centroid = polygonCentroid(block_item.bounds);

            const scaleFactor = 1.4;
            const scaledHull = this.scalePolygon(block_item.bounds, scaleFactor, centroid);

            const expandedHull = this.expandPolygon(block_item.bounds, block_item.gap, centroid);

            block_item.bounds = polygonHull(expandedHull);
            // console.log("Scaled Hull:", scaledHull);
            // console.log("expandedHull Hull:", expandedHull);

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

    public scalePolygon(
        polygon: [number, number][],
        scale: number,
        center: [number, number]
    ): [number, number][] {
        return polygon.map(([x, y]) => [
            center[0] + (x - center[0]) * scale,
            center[1] + (y - center[1]) * scale,
        ]);
    }

    public expandPolygon(
        polygon: [number, number][],
        distance: number,
        center: [number, number]
    ): [number, number][] {
        return polygon.map(([x, y]) => {
            // Merkezden noktaya olan vektör
            const dx = x - center[0];
            const dy = y - center[1];
            // Vektörün uzunluğu
            const length = Math.sqrt(dx * dx + dy * dy);
            // Normalleştirme ve genişletme
            const nx = dx / length;
            const ny = dy / length;
            return [x + nx * distance, y + ny * distance];
        });
    }
}