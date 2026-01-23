/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */
import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {SeatItem} from "./seat-item.index";
import {SeatItemPathArea} from "./seat-item.path-area";

type ViewBox = { x: number; y: number; width: number; height: number };

@dom({
    tag: "g",
    class: "seat-path-wrapper",
    autoGenerate: false
})
export class SeatItemPath extends SvgBase {

    private pathElement: any;
    private hitArea: SeatItemPathArea;

    constructor(public parent: SeatItem) {
        super(parent);
        this.attr("block-id", parent.item.block.id);
        return this;
    }

    domGenerate(to: any, index: number = 0): this {
        super.domGenerate(to, index);
        
        const path = this.global.config.style.seat.path || "M12 2L22 22H2Z";
        const size = this.getSize();
        const viewBox = this.parseViewBox(this.global.config.style.seat.path_box);
        const scale = this.getScale(size, viewBox);
        
        // Calculate the center of the viewBox
        const centerX = viewBox.x + viewBox.width / 2;
        const centerY = viewBox.y + viewBox.height / 2;

        // Create hit area (invisible circle for better UX)
        this.hitArea = new SeatItemPathArea(this);
        this.addChild(this.hitArea);
        
        // Create the actual path element
        this.pathElement = this.node.append("path")
            .attr("class", "seat-path")
            .attr("d", path)
            .attr("transform", `scale(${scale}) translate(${-centerX},${-centerY})`)
            .attr("fill", this.global.config.style.seat.color)
            .attr("stroke", "rgba(0,0,0,0.3)")
            .attr("stroke-width", 1 / scale)
            .attr("pointer-events", "none");
        
        this.updateChilds();
        return this;
    }

    private getSize(): number {
        return this.global.config.style.seat.size || (this.global.config.style.seat.radius * 2);
    }

    private parseViewBox(value: string | null): ViewBox {
        const fallback = {x: 0, y: 0, width: 24, height: 24};
        if (!value) {
            return fallback;
        }
        const parts = value.split(/\s+/).map((item) => Number(item));
        if (parts.length !== 4 || parts.some((item) => Number.isNaN(item))) {
            return fallback;
        }
        return {x: parts[0], y: parts[1], width: parts[2], height: parts[3]};
    }

    private getScale(size: number, viewBox: ViewBox): number {
        const maxDimension = Math.max(viewBox.width, viewBox.height);
        if (!maxDimension) {
            return 1;
        }
        return size / maxDimension;
    }

    update(): this {
        return this;
    }
}
