/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import BlockInfo from "../block-item.info.index";


@dom({
    tag: "text",
    class: "title",
    autoGenerate: false
})
export class BlockTitle extends SvgBase {


    constructor(public parent: BlockInfo) {
        super(parent);
        this.attr("fill",this.global.config.style.block.title_color);
        this.attr("font-size",48);
    }


    update(): this {
        return this;
    }
}