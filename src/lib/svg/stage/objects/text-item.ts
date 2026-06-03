/*
 * text-item.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Free-floating text caption renderer. Drawn at its origin, centered both ways,
 * with data-driven color/size/weight/style and rotation around the origin.
 * Mirrors studio `TextView` / `seatsio.TextInput.draw`.
 */

import {dom} from "@decorator/dom";
import {TextObjectData} from "@model/object.model";
import {registerObjectItem} from "./object-item.factory";
import {ObjectItem} from "./object-item.base";
import {ObjectItemLabel} from "./object-item.label";
import type Objects from "./objects.index";

@dom({
    tag: "g",
    class: "object",
    event_code: "object",
    autoGenerate: false
})
export class TextItem extends ObjectItem {

    constructor(parent: Objects, public item: TextObjectData) {
        super(parent, item);
        return this;
    }

    update(): this {
        const style = this.global.config.style.text;
        const {origin} = this.item;
        const rotation = this.item.rotation ?? 0;

        this.addChild(new ObjectItemLabel(this, this.item.text, {
            x: origin.x,
            y: origin.y,
            fill: this.item.color ?? style.color,
            font_size: this.item.font_size,
            font_weight: this.item.bold ? "bold" : "normal",
            font_family: style.font_family,
            font_style: this.item.italic ? "italic" : "normal",
            transform: `rotate(${rotation} ${origin.x} ${origin.y})`,
        }));

        this.updateChilds();
        return this;
    }

    protected refreshStroke(): void {
        // Text has no stroke and is not selectable; nothing to refresh.
    }
}

registerObjectItem("text", (parent, item) => new TextItem(parent, item as TextObjectData));
