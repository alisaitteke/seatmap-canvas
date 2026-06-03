/*
 * section-item.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Section polygon renderer — mirrors studio `SectionView` / seatsio.Section.draw.
 */

import {dom} from "@decorator/dom";
import {SectionObjectData} from "@model/object.model";
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
export class SectionItem extends ObjectItem {

    private shape: ObjectItemPath | null = null;

    constructor(parent: Objects, public item: SectionObjectData) {
        super(parent, item);
        return this;
    }

    update(): this {
        const style = this.global.config.style.section;
        const stroke = this.isSelected() ? this.selectedStroke() : style.stroke;

        this.shape = new ObjectItemPath(this, this.item.path, {
            fill: this.fillColor(),
            "fill-opacity": style.fill_opacity,
            stroke,
            "stroke-width": style.stroke_width,
            "stroke-linejoin": style.stroke_linejoin,
        });
        this.addChild(this.shape);

        if (this.item.label_shown !== false) {
            const caption = this.buildCaption();
            const anchor = labelAt(this.item.center);
            this.addChild(new ObjectItemLabel(this, caption, {
                x: anchor.x,
                y: anchor.y,
                fill: style.label_color,
                font_size: this.item.label_size ?? style.label_size,
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
        const style = this.global.config.style.section;
        const stroke = this.isSelected() ? this.selectedStroke() : style.stroke;
        this.shape.setStroke(stroke, style.stroke_width);
    }

    private buildCaption(): string {
        const raw = this.item.label?.trim();
        const caption = raw ? raw : "Section";
        const seats = this.item.seat_count ?? 0;
        return seats > 0 ? `${caption} · ${seats}` : caption;
    }
}

registerObjectItem("section", (parent, item) => new SectionItem(parent, item as SectionObjectData));
