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
import {drawTableBody} from "./table-body";
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

        this.body = drawTableBody(this, this.item, style, {fill, stroke});

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
