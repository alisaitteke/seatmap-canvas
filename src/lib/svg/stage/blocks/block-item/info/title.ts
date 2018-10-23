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
        this.attr("fill",this.global.config.block_style.title_color);

    }


    update(): this {
        return this;
    }
}