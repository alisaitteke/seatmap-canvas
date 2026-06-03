/*
 * object-item.rect.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";

@dom({
    tag: "rect",
    class: "object-rect",
    autoGenerate: false
})
export class ObjectItemRect extends SvgBase {

    constructor(
        public parent: SvgBase,
        attrs: Record<string, string | number>
    ) {
        super(parent);
        for (const key of Object.keys(attrs)) {
            this.attr(key, attrs[key]);
        }
        return this;
    }

    public setStroke(color: string, width?: number): this {
        if (this.node) {
            this.node.attr("stroke", color);
            if (width !== undefined) {
                this.node.attr("stroke-width", width);
            }
        } else {
            this.attr("stroke", color);
            if (width !== undefined) {
                this.attr("stroke-width", width);
            }
        }
        return this;
    }

    update(): this {
        return this;
    }
}
