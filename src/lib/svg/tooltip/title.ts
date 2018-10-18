/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../decorators";
import SvgBase from "../svg.base";

import BlocksTooltip from "../blocks.tooltip";

@dom({
    tag: "text",
    class: "tooltip-title",
    autoGenerate: false
})
export default class TooltipRect extends SvgBase {


    constructor(public parent: BlocksTooltip) {
        super(parent);
        return this;
    }

    update(): this {
        this.updateChilds();
        return this;
    }

    afterGenerate() {

        this.node.style("pointer-events", "none");
    }
}