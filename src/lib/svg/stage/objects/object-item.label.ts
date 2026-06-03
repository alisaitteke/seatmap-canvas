/*
 * object-item.label.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import type {Point2D} from "@model/object.model";
import type {ObjectItem} from "./object-item.base";

export interface ObjectLabelOptions {
    x: number;
    y: number;
    fill: string;
    font_size: number;
    font_weight: string;
    font_family: string;
    /** Optional `font-style` (e.g. "italic"); omitted means the SVG default. */
    font_style?: string;
    transform?: string;
}

@dom({
    tag: "text",
    class: "object-label",
    autoGenerate: false
})
export class ObjectItemLabel extends SvgBase {

    constructor(public parent: ObjectItem, text: string, options: ObjectLabelOptions) {
        super(parent);
        this.text(text);
        this.attr("x", options.x);
        this.attr("y", options.y);
        this.attr("fill", options.fill);
        this.attr("font-size", options.font_size);
        this.attr("font-weight", options.font_weight);
        this.attr("font-family", options.font_family);
        this.attr("text-anchor", "middle");
        this.attr("dominant-baseline", "central");
        this.attr("pointer-events", "none");
        if (options.font_style) {
            this.attr("font-style", options.font_style);
        }
        if (options.transform) {
            this.attr("transform", options.transform);
        }
        return this;
    }

    update(): this {
        return this;
    }
}

/** Convenience for caption anchors. */
export function labelAt(center: Point2D, offsets?: { x?: number; y?: number }): { x: number; y: number } {
    return {
        x: center.x + (offsets?.x || 0),
        y: center.y + (offsets?.y || 0),
    };
}
