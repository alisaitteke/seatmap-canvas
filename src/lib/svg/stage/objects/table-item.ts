/*
 * table-item.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Table body renderer (round circle or rounded rect). Chairs are real seats in
 * a block; this only paints the body and optional label — mirrors studio `TableView`.
 */

import {dom} from "@decorator/dom";
import {TableObjectData} from "@model/object.model";
import {registerObjectItem} from "./object-item.factory";
import {ObjectItem} from "./object-item.base";
import {ObjectItemCircle} from "./object-item.circle";
import {ObjectItemRect} from "./object-item.rect";
import {ObjectItemLabel, labelAt} from "./object-item.label";
import type Objects from "./objects.index";

@dom({
    tag: "g",
    class: "object",
    event_code: "object",
    autoGenerate: false
})
export class TableItem extends ObjectItem {

    private body: ObjectItemCircle | ObjectItemRect | null = null;

    constructor(parent: Objects, public item: TableObjectData) {
        super(parent, item);
        return this;
    }

    update(): this {
        const style = this.global.config.style.table;
        const fill = this.item.color ?? style.fill;
        const stroke = this.isSelected() ? this.selectedStroke() : style.stroke;
        const {x, y} = this.item.center;

        if (this.item.shape === "round") {
            const radius = this.item.radius ?? 0;
            this.body = new ObjectItemCircle(this, {
                cx: x,
                cy: y,
                r: radius,
                fill,
                stroke,
                "stroke-width": style.stroke_width,
            });
        } else {
            const width = this.item.width ?? 0;
            const height = this.item.height ?? 0;
            const corner = this.item.corner_radius ?? style.corner_radius;
            const rotation = this.item.rotation ?? 0;
            const attrs: Record<string, string | number> = {
                x: x - width / 2,
                y: y - height / 2,
                width,
                height,
                rx: corner,
                fill,
                stroke,
                "stroke-width": style.stroke_width,
            };
            if (rotation) {
                attrs.transform = `rotate(${rotation} ${x} ${y})`;
            }
            this.body = new ObjectItemRect(this, attrs);
        }
        this.addChild(this.body);

        if (this.item.label_shown !== false && this.item.label) {
            const anchor = labelAt(this.item.center);
            this.addChild(new ObjectItemLabel(this, this.item.label, {
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
        if (!this.body) {
            return;
        }
        const style = this.global.config.style.table;
        const stroke = this.isSelected() ? this.selectedStroke() : style.stroke;
        this.body.setStroke(stroke, style.stroke_width);
    }
}

registerObjectItem("table", (parent, item) => new TableItem(parent, item as TableObjectData));
