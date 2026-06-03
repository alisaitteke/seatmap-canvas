/*
 * object-item.line.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import type {ObjectItem} from "./object-item.base";

@dom({
    tag: "line",
    class: "object-line",
    autoGenerate: false
})
export class ObjectItemLine extends SvgBase {

    constructor(
        public parent: ObjectItem,
        attrs: Record<string, string | number>
    ) {
        super(parent);
        for (const key of Object.keys(attrs)) {
            this.attr(key, attrs[key]);
        }
        return this;
    }

    update(): this {
        return this;
    }
}
