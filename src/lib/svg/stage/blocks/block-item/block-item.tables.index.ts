/*
 * block-item.tables.index.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Block-local table bodies container. Renders one body per `TableModel` via the
 * shared {@link drawTableBody} helper. It sits above the block hull and beneath
 * the chairs, and rotates with the block (the parent block `<g>` owns rotation).
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import BlockModel from "@model/block.model";
import TableModel from "@model/table.model";
import Block from "./block-item.index";
import {drawTableBody} from "@svg/stage/objects/table-body";

@dom({
    tag: "g",
    class: "block-tables",
    autoGenerate: false
})
export default class BlockTables extends SvgBase {

    constructor(public parent: Block, public item: BlockModel) {
        super(parent);
        return this;
    }

    update(): this {
        const style = this.global.config.style.table;
        for (const table of this.item.tables) {
            const fill = table.color ?? style.fill;
            drawTableBody(this, table, style, {fill, stroke: style.stroke});
        }
        this.updateChilds();
        return this;
    }
}
