/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import BlockBounds from "../block-item.bounds";
import BlockModel from "../../../../../models/block.model";
import BlockMask from "../block-item.mask";
import BlockInfo from "../block-item.info.index";


@dom({
    tag: "text",
    class: "title",
    autoGenerate: false
})
export class BlockTitle extends SvgBase {


    constructor(public parent: BlockInfo) {
        super(parent);

    }


    update(): this {
        return this;
    }
}