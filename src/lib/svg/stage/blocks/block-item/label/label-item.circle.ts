/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
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
        this.attr("r", this.global.config.style.label.radius);
        this.attr("fill", this.global.config.style.label.bg);
        return this;
    }

    update(): this {
        return this;
    }
}