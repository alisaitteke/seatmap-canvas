/*
 * icon-item.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Icon renderer. The reference icon font is not bundled, so a glyph is drawn as
 * a rounded tile (corner radius `min(max_corner_radius, size/4)`) plus a short
 * caption. Mirrors studio `IconView` so a chart renders identically in both.
 */

import {dom} from "@decorator/dom";
import {IconObjectData} from "@model/object.model";
import {registerObjectItem} from "./object-item.factory";
import {ObjectItem} from "./object-item.base";
import {ObjectItemRect} from "./object-item.rect";
import {ObjectItemLabel} from "./object-item.label";
import type Objects from "./objects.index";

/** Short caption shown for each glyph key (kept in sync with studio `IconView`). */
const ICON_CAPTIONS: Record<string, string> = {
    "restrooms-unisex": "WC",
    "restrooms-men": "WC♂",
    "restrooms-women": "WC♀",
    stage: "STAGE",
    entrance: "IN",
    emergencyExit: "EXIT",
    stairs: "▲",
    foodCourt: "FOOD",
    "bar-cocktail": "BAR",
    "bar-beer": "BEER",
    cafe: "CAFE",
    warning: "!",
};

@dom({
    tag: "g",
    class: "object",
    event_code: "object",
    autoGenerate: false
})
export class IconItem extends ObjectItem {

    private tile: ObjectItemRect | null = null;

    constructor(parent: Objects, public item: IconObjectData) {
        super(parent, item);
        return this;
    }

    update(): this {
        const style = this.global.config.style.icon;
        const {center, size} = this.item;
        const rotation = this.item.rotation ?? 0;
        const transform = `rotate(${rotation} ${center.x} ${center.y})`;
        const alpha = Math.max(0, Math.min(1, (this.item.opacity ?? 100) / 100));
        const fill = this.item.color ?? this.global.config.style.seat.uncategorized_fill;

        this.tile = new ObjectItemRect(this, {
            x: center.x - size / 2,
            y: center.y - size / 2,
            width: size,
            height: size,
            rx: Math.min(style.max_corner_radius, size / 4),
            fill,
            "fill-opacity": alpha,
            stroke: style.stroke,
            "stroke-width": style.stroke_width,
            transform,
        });
        this.addChild(this.tile);

        this.addChild(new ObjectItemLabel(this, this.caption(), {
            x: center.x,
            y: center.y,
            fill: style.label_color,
            font_size: Math.max(style.min_label_size, size / 4),
            font_weight: style.label_weight,
            font_family: style.font_family,
            transform,
        }));

        this.updateChilds();
        return this;
    }

    protected refreshStroke(): void {
        if (!this.tile) {
            return;
        }
        const style = this.global.config.style.icon;
        this.tile.setStroke(style.stroke, style.stroke_width);
    }

    private caption(): string {
        const explicit = this.item.caption?.trim();
        if (explicit) {
            return explicit;
        }
        const key = this.item.content ?? "";
        return ICON_CAPTIONS[key] ?? key;
    }
}

registerObjectItem("icon", (parent, item) => new IconItem(parent, item as IconObjectData));
