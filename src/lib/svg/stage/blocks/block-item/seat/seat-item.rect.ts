/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */
import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {SeatItem} from "./seat-item.index";

@dom({
    tag: "rect",
    class: "seat-rect",
    autoGenerate: false
})
export class SeatItemRect extends SvgBase {

    constructor(public parent: SeatItem) {
        super(parent);
        const size = this.getSize();
        const cornerRadius = this.global.config.style.seat.corner_radius || 0;
        this.attr("block-id", parent.item.block.id);
        this.attr("width", size);
        this.attr("height", size);
        this.attr("x", -size / 2);
        this.attr("y", -size / 2);
        this.attr("rx", cornerRadius);
        this.attr("ry", cornerRadius);
        this.attr("fill", this.global.config.style.seat.color);
        this.attr("stroke", "rgba(0,0,0,0.3)");
        this.attr("stroke-width", 1);
        return this;
    }

    private getSize(): number {
        return this.global.config.style.seat.size || (this.global.config.style.seat.radius * 2);
    }

    update(): this {
        return this;
    }
}
