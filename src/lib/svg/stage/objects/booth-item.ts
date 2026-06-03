/*
 * booth-item.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Booth renderer — rounded rect, diagonal cross lines, optional label, full-body
 * rotation. Mirrors studio `BoothView` / Booth.createShapes.
 */

import {dom} from "@decorator/dom";
import {BoothObjectData} from "@model/object.model";
import {registerObjectItem} from "./object-item.factory";
import {ObjectItem} from "./object-item.base";
import {ObjectItemRect} from "./object-item.rect";
import {ObjectItemLine} from "./object-item.line";
import {ObjectItemLabel, labelAt} from "./object-item.label";
import type Objects from "./objects.index";

@dom({
    tag: "g",
    class: "object",
    event_code: "object",
    autoGenerate: false
})
export class BoothItem extends ObjectItem {

    private body: ObjectItemRect | null = null;

    constructor(parent: Objects, public item: BoothObjectData) {
        super(parent, item);
        return this;
    }

    update(): this {
        const style = this.global.config.style.booth;
        const {center, width, height} = this.item;
        const rotation = this.item.rotation ?? 0;
        const transform = rotation
            ? `rotate(${rotation} ${center.x} ${center.y})`
            : undefined;
        const x = center.x - width / 2;
        const y = center.y - height / 2;
        const fill = this.item.color ?? style.fill;
        const bodyStroke = this.isSelected() ? this.selectedStroke() : style.stroke;
        const corner = this.item.corner_radius ?? style.corner_radius;

        const bodyAttrs: Record<string, string | number> = {
            x,
            y,
            width,
            height,
            rx: corner,
            fill,
            stroke: bodyStroke,
            "stroke-width": style.stroke_width,
        };
        if (transform) {
            bodyAttrs.transform = transform;
        }
        this.body = new ObjectItemRect(this, bodyAttrs);
        this.addChild(this.body);

        const pad = style.cross_padding;
        const lineAttrs: Record<string, string | number> = {
            stroke: style.cross_stroke,
            "stroke-width": style.cross_stroke_width,
            "stroke-dasharray": style.cross_dasharray,
            "pointer-events": "none",
        };
        if (transform) {
            lineAttrs.transform = transform;
        }

        this.addChild(new ObjectItemLine(this, {
            x1: x + pad,
            y1: y + pad,
            x2: x + width - pad,
            y2: y + height - pad,
            ...lineAttrs,
        }));
        this.addChild(new ObjectItemLine(this, {
            x1: x + pad,
            y1: y + height - pad,
            x2: x + width - pad,
            y2: y + pad,
            ...lineAttrs,
        }));

        if (this.item.label) {
            const anchor = labelAt(this.item.center);
            this.addChild(new ObjectItemLabel(this, this.item.label, {
                x: anchor.x,
                y: anchor.y,
                fill: style.label_color,
                font_size: style.label_size,
                font_weight: style.label_weight,
                font_family: style.font_family,
                transform,
            }));
        }

        this.updateChilds();
        return this;
    }

    protected refreshStroke(): void {
        if (!this.body) {
            return;
        }
        const style = this.global.config.style.booth;
        const stroke = this.isSelected() ? this.selectedStroke() : style.stroke;
        this.body.setStroke(stroke, style.stroke_width);
    }
}

registerObjectItem("booth", (parent, item) => new BoothItem(parent, item as BoothObjectData));
