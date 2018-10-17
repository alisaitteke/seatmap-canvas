/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
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