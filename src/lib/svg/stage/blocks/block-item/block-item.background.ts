/*
 * block-item.background.ts
 * Block Background Image Renderer
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import BlockModel from "@model/block.model";
import Block from "./block-item.index";

@dom({
    tag: "g",
    class: "block-background",
    autoGenerate: false
})
export default class BlockBackground extends SvgBase {

    private imageElement: any;
    private clipPath: any;
    private clipPathId: string;

    constructor(public parent: Block, public item: BlockModel) {
        super(parent);
        this.clipPathId = `block-bg-clip-${item.id}`;
        return this;
    }

    update(): this {
        // No children to update
        return this;
    }

    domGenerate(to: any, index: number = 0): this {
        const imageUrl = this.item.background_image;
        if (!imageUrl) {
            // Don't generate DOM if no background image
            return this;
        }

        super.domGenerate(to, index);

        // Get position and dimensions (manual override or auto-calculate from bounds)
        let x = this.item.background_x;
        let y = this.item.background_y;
        let width = this.item.background_width;
        let height = this.item.background_height;
        
        // If not manually set, calculate from block bounds
        if (x === null || y === null || width === null || height === null) {
            const bounds = this.item.bounds;
            if (!bounds || bounds.length === 0) {
                return this;
            }

            // Find min/max coordinates to create bounding box
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            bounds.forEach((point: [number, number]) => {
                minX = Math.min(minX, point[0]);
                minY = Math.min(minY, point[1]);
                maxX = Math.max(maxX, point[0]);
                maxY = Math.max(maxY, point[1]);
            });

            if (x === null) x = minX;
            if (y === null) y = minY;
            if (width === null) width = maxX - minX;
            if (height === null) height = maxY - minY;
        }
        
        // Get bounds for clip-path
        const bounds = this.item.bounds;
        if (!bounds || bounds.length === 0) {
            return this;
        }
        const opacity = this.item.background_opacity !== undefined ? this.item.background_opacity : 1;
        const fit = this.item.background_fit || 'cover';

        // Create clip path using block bounds for perfect masking
        const defs = this.node.append("defs");
        this.clipPath = defs.append("clipPath")
            .attr("id", this.clipPathId);
        
        this.clipPath.append("path")
            .attr("d", "M" + bounds.join("L") + "Z");

        // Create image element
        this.imageElement = this.node.append("image")
            .attr("href", imageUrl)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr("height", height)
            .attr("opacity", opacity)
            .attr("clip-path", `url(#${this.clipPathId})`)
            .attr("preserveAspectRatio", this.getPreserveAspectRatio(fit))
            .attr("pointer-events", "none");

        return this;
    }

    private getPreserveAspectRatio(fit: string): string {
        switch (fit) {
            case 'cover':
                return 'xMidYMid slice';
            case 'contain':
                return 'xMidYMid meet';
            case 'fill':
                return 'none';
            case 'none':
                return 'xMidYMid meet';
            default:
                return 'xMidYMid slice';
        }
    }
}
