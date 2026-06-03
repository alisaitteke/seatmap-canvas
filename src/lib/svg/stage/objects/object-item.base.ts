/*
 * object-item.base.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Shared base for chart-level object renderers (section, GA, table, booth, …).
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import type {ObjectData} from "@model/object.model";
import type Objects from "./objects.index";

@dom({
    tag: "g",
    class: "object",
    event_code: "object",
    autoGenerate: false
})
export abstract class ObjectItem extends SvgBase {

    constructor(public parent: Objects, public item: ObjectData) {
        super(parent);
        this.attr("data-id", item.id);
        this.classed("object--" + item.type, true);
        if (item.selectable) {
            this.classed("object--selectable", true);
        }
        return this;
    }

    /** Category / object fill, or the theme uncategorized fallback. */
    protected fillColor(): string {
        const color = (this.item as { color?: string }).color;
        return color || this.global.config.style.seat.uncategorized_fill;
    }

    protected selectedStroke(): string {
        return this.global.config.style.seat.selected_stroke;
    }

    protected isSelected(): boolean {
        return !!this.item.selected;
    }

    public select(): this {
        if (!this.item.selectable) {
            return this;
        }
        this.item.selected = true;
        this.node.classed("selected", true);
        this.refreshStroke();
        return this;
    }

    public unSelect(): this {
        if (!this.item.selectable) {
            return this;
        }
        this.item.selected = false;
        this.node.classed("selected", false);
        this.refreshStroke();
        return this;
    }

    /** Payload echoed to `OBJECT.CLICK` listeners. */
    public toEventPayload(): ObjectData {
        return this.item;
    }

    protected abstract refreshStroke(): void;

    afterGenerate(): void {
        if (this.item.selected) {
            this.node.classed("selected", true);
        }
        this.refreshStroke();
        if (this.item.selectable) {
            this.node.style("cursor", "pointer");
            this.node.on("click.objectselect", () => {
                if (this.isSelected()) {
                    this.unSelect();
                } else {
                    this.select();
                }
            });
        }
    }
}
