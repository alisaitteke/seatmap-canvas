/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */
import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {SeatItem} from "./seat-item.index";
import {SeatItemRectArea} from "./seat-item.rect-area";

@dom({
    tag: "g",
    class: "seat-rect-wrapper",
    autoGenerate: false
})
export class SeatItemRect extends SvgBase {

    private rectElement: any;
    private hitArea: SeatItemRectArea;

    constructor(public parent: SeatItem) {
        super(parent);
        this.attr("block-id", parent.item.block.id);
        return this;
    }

    domGenerate(to: any, index: number = 0): this {
        super.domGenerate(to, index);
        
        const size = this.getSize();
        const cornerRadius = this.global.config.style.seat.corner_radius || 0;

        // Create hit area first (will be behind the rect)
        this.hitArea = new SeatItemRectArea(this);
        this.addChild(this.hitArea);
        
        // Create the actual rect element
        this.rectElement = this.node.append("rect")
            .attr("class", "seat-rect")
            .attr("width", size)
            .attr("height", size)
            .attr("x", -size / 2)
            .attr("y", -size / 2)
            .attr("rx", cornerRadius)
            .attr("ry", cornerRadius)
            .attr("fill", this.global.config.style.seat.color)
            .attr("stroke", "rgba(0,0,0,0.3)")
            .attr("stroke-width", 1)
            .attr("pointer-events", "none");
        
        this.updateChilds();
        return this;
    }

    private getSize(): number {
        return this.global.config.style.seat.size || (this.global.config.style.seat.radius * 2);
    }

    update(): this {
        return this;
    }
}
