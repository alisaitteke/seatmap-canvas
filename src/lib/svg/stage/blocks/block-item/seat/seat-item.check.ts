/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import {SeatItem} from "./seat-item.index";

@dom({
    tag: "text",
    class: "seat-check",
    autoGenerate: false
})
export class SeatItemCheck extends SvgBase {

    constructor(public parent: SeatItem) {
        super(parent);
        // this.attr("d", "M12.9,953.7l-6.3,6.5l-2.9-2.5l-2.1,2.4l4.1,3.5l1.1,1l1.1-1.1l7.3-7.6L12.9,953.7L12.9,953.7z");
        this.text('\uf005')
        this.attr("class", 'fa');
        // this.attr("fill", '#ff0000');

        this.attr("fill", this.global.config.seat_style.check_icon_color);
        this.attr("transform", "translate(-7,4) scale(0.8)");
        this.attr("pointer-events", "none");
        this.attr("display", "none");
        this.attr("opacity", 0);

        return this;
    }

    update(): this {
        return this;
    }

    afterGenerate() {
        this.node.style("pointer-events", "none");
    }

    show():this {
        this.node.attr("display", "block");
        this.node.attr("opacity", 1);
        return this;
    }

    hide():this {
        this.node.attr("display", "none");
        this.node.attr("opacity", 0);
        return this;
    }
}