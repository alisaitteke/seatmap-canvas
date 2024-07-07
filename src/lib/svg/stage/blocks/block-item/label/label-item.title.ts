/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {LabelItem} from "./label-item.index";

@dom({
    tag: "text",
    class: "label-text",
    autoGenerate: false
})
export class LabelItemTitle extends SvgBase {

    constructor(public parent: LabelItem) {
        super(parent);
        this.attr("fill", this.global.config.style.label.color);
        this.attr("font-size", this.global.config.style.label.font_size);
        return this;
    }

    update(): this {
        return this;
    }
}