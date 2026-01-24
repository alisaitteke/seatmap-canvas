/*
 * stage.background.ts
 * Global Stage Background Image Renderer
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import Stage from "./stage.index";

@dom({
    tag: "g",
    class: "stage-background",
    autoGenerate: false
})
export default class StageBackground extends SvgBase {

    private imageElement: any;

    constructor(public parent: Stage) {
        super(parent);
        return this;
    }

    update(): this {
        // No children to update
        return this;
    }

    domGenerate(to: any, index: number = 0): this {
        const imageUrl = this.global.config.background_image;
        if (!imageUrl) {
            // Don't generate DOM if no background image
            return this;
        }

        super.domGenerate(to, index);

        // Get position and dimensions (manual override or auto-detect)
        let x = this.global.config.background_x;
        let y = this.global.config.background_y;
        let width = this.global.config.background_width;
        let height = this.global.config.background_height;
        
        // If not manually set, try to auto-detect from SVG viewBox
        if (x === null || y === null || width === null || height === null) {
            const svgNode = this.global.root?.node?.node();
            
            if (svgNode) {
                const viewBox = svgNode.getAttribute('viewBox');
                if (viewBox) {
                    const parts = viewBox.split(/\s+/).map(Number);
                    if (parts.length === 4) {
                        if (x === null) x = parts[0];
                        if (y === null) y = parts[1];
                        if (width === null) width = parts[2];
                        if (height === null) height = parts[3];
                    }
                } else {
                    // Try to get from SVG width/height
                    const svgWidth = svgNode.getAttribute('width');
                    const svgHeight = svgNode.getAttribute('height');
                    if (width === null && svgWidth) width = parseFloat(svgWidth);
                    if (height === null && svgHeight) height = parseFloat(svgHeight);
                }
            }
            
            // Final fallback
            if (x === null) x = 0;
            if (y === null) y = 0;
            if (width === null) width = 2000;
            if (height === null) height = 2000;
        }

        const opacity = this.global.config.background_opacity !== undefined ? this.global.config.background_opacity : 0.3;
        const fit = this.global.config.background_fit || 'cover';

        // Create image element covering entire stage
        this.imageElement = this.node.append("image")
            .attr("href", imageUrl)
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr("height", height)
            .attr("opacity", opacity)
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
