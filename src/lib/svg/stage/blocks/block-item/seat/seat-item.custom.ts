/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";

import {dom} from "@decorator/dom";
import {select} from "d3-selection";
import {SeatItem} from "./seat-item.index";
import {SeatItemCustomSvgArea} from "@svg/stage/blocks/block-item/seat/seat-item.custom-area";

@dom({
    tag: "g",
    class: "seat-circle",
    autoGenerate: false
})
export class SeatItemCustomSvg extends SvgBase {

    constructor(public parent: SeatItem, public customSvg: any) {
        super(parent);
        return this;
    }

    update(): this {
        this.updateChilds();
        return this;
    }

    domGenerate(to: any, index: number = 0): this {

        super.domGenerate(to, index);
        const importedSVG = select(this.customSvg.documentElement.cloneNode(true));
        
        // Get original viewBox or calculate from width/height
        const originalViewBox = importedSVG.attr('viewBox');
        let viewBoxParts = [0, 0, 24, 24]; // fallback
        
        if (originalViewBox) {
            viewBoxParts = originalViewBox.split(/\s+/).map(Number);
        } else {
            const width = parseFloat(importedSVG.attr('width')) || 24;
            const height = parseFloat(importedSVG.attr('height')) || 24;
            viewBoxParts = [0, 0, width, height];
        }
        
        const [vbX, vbY, vbWidth, vbHeight] = viewBoxParts;
        const size = this.global.config.style.seat.size || (this.global.config.style.seat.radius * 2);
        
        // Calculate scale to fit in the seat size
        const maxDimension = Math.max(vbWidth, vbHeight);
        const scale = size / maxDimension;
        
        // Center the SVG
        const centerX = vbX + vbWidth / 2;
        const centerY = vbY + vbHeight / 2;
        const translateX = -centerX * scale;
        const translateY = -centerY * scale;
        
        // Apply proper sizing and preserve original viewBox
        importedSVG.attr('width', size)
        importedSVG.attr('height', size)
        importedSVG.attr('viewBox', `${vbX} ${vbY} ${vbWidth} ${vbHeight}`)
        importedSVG.attr('x', translateX)
        importedSVG.attr('y', translateY)
        
        this.node.node().append(importedSVG.node())
        this.addChild(new SeatItemCustomSvgArea(this))
        return this

    }
}