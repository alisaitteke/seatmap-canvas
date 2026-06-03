/*
 * ga-item.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * General-admission area renderer — mirrors studio `GeneralAdmissionView`.
 */

import {dom} from "@decorator/dom";
import {GaObjectData} from "@model/object.model";
import {registerObjectItem} from "./object-item.factory";
import {ObjectItem} from "./object-item.base";
import {ObjectItemPath} from "./object-item.path";
import {ObjectItemLabel, labelAt} from "./object-item.label";
import type Objects from "./objects.index";

@dom({
    tag: "g",
    class: "object",
    event_code: "object",
    autoGenerate: false
})
export class GaItem extends ObjectItem {

    private shape: ObjectItemPath | null = null;

    constructor(parent: Objects, public item: GaObjectData) {
        super(parent, item);
        return this;
    }

    update(): this {
        const style = this.global.config.style.ga;
        const stroke = this.isSelected() ? this.selectedStroke() : style.stroke;
        const fillOpacity = this.item.fill_opacity ?? style.fill_opacity;
        const rotation = this.item.rotation ?? 0;
        const transform = rotation
            ? `rotate(${rotation} ${this.item.center.x} ${this.item.center.y})`
            : undefined;

        const attrs: Record<string, string | number> = {
            fill: this.fillColor(),
            "fill-opacity": fillOpacity,
            stroke,
            "stroke-width": style.stroke_width,
        };
        if (transform) {
            attrs.transform = transform;
        }

        this.shape = new ObjectItemPath(this, this.item.path, attrs);
        this.addChild(this.shape);

        if (this.item.label_shown !== false) {
            const anchor = labelAt(this.item.center);
            this.addChild(new ObjectItemLabel(this, this.buildCaption(), {
                x: anchor.x,
                y: anchor.y,
                fill: style.label_color,
                font_size: style.label_size,
                font_weight: style.label_weight,
                font_family: style.font_family,
            }));
        }

        this.updateChilds();
        return this;
    }

    protected refreshStroke(): void {
        if (!this.shape) {
            return;
        }
        const style = this.global.config.style.ga;
        const stroke = this.isSelected() ? this.selectedStroke() : style.stroke;
        this.shape.setStroke(stroke, style.stroke_width);
    }

    private buildCaption(): string {
        const raw = this.item.label?.trim();
        if (raw) {
            return raw;
        }
        const capacity = this.item.capacity ?? 0;
        return `GA · ${capacity}`;
    }
}

registerObjectItem("ga", (parent, item) => new GaItem(parent, item as GaObjectData));
