/*
 * shape-item.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Decorative shape renderer — a fully data-driven path (fill / stroke / width
 * picked by the user) with optional rotation around its center. The drawing
 * band (background vs foreground) is decided by the objects layer from the
 * model `layer`. Mirrors studio `ShapeView` / `.ShapedObject.draw`.
 */

import {dom} from "@decorator/dom";
import {ShapeObjectData} from "@model/object.model";
import {registerObjectItem} from "./object-item.factory";
import {ObjectItem} from "./object-item.base";
import {ObjectItemPath} from "./object-item.path";
import type Objects from "./objects.index";

@dom({
    tag: "g",
    class: "object",
    event_code: "object",
    autoGenerate: false
})
export class ShapeItem extends ObjectItem {

    private shape: ObjectItemPath | null = null;

    constructor(parent: Objects, public item: ShapeObjectData) {
        super(parent, item);
        return this;
    }

    update(): this {
        const {center} = this.item;
        const rotation = this.item.rotation ?? 0;
        // Decorative shapes are non-bookable; their colors travel on the model
        // (never themed). Fall back to the uncategorized fill so a shape with no
        // explicit fill is still visible, and to "none" for a missing stroke.
        const fill = this.item.fill ?? this.global.config.style.seat.uncategorized_fill;
        const stroke = this.item.stroke ?? "none";

        const attrs: Record<string, string | number> = {
            fill,
            stroke,
            "stroke-width": this.item.stroke_width ?? 1,
        };
        if (rotation) {
            attrs.transform = `rotate(${rotation} ${center.x} ${center.y})`;
        }

        this.shape = new ObjectItemPath(this, this.item.path, attrs);
        this.addChild(this.shape);

        this.updateChilds();
        return this;
    }

    protected refreshStroke(): void {
        if (!this.shape) {
            return;
        }
        // Shapes are not selectable; keep the user-picked stroke as-is.
        this.shape.setStroke(this.item.stroke ?? "none", this.item.stroke_width ?? 1);
    }
}

registerObjectItem("shape", (parent, item) => new ShapeItem(parent, item as ShapeObjectData));
