/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import {LabelItem} from "./label-item.index";

@dom({
    tag: "circle",
    class: "label-circle",
    autoGenerate: false
})
export class LabelItemCircle extends SvgBase {

    constructor(public parent: LabelItem) {
        super(parent);
        this.attr("r", this.global.config.label_style.radius);
        this.attr("fill", this.global.config.label_style.bg);
        return this;
    }

    update(): this {
        return this;
    }
}