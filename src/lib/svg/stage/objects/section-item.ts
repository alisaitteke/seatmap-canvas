/*
 * section-item.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Section polygon renderer — mirrors studio `SectionView` / .Section.draw.
 */

import {dom} from "@decorator/dom";
import {EventType} from "@enum/global";
import {SectionObjectData} from "@model/object.model";
import {registerObjectItem} from "./object-item.factory";
import {ObjectItem} from "./object-item.base";
import {ObjectItemPath} from "./object-item.path";
import {ObjectItemLabel, labelAt} from "./object-item.label";
import type Objects from "./objects.index";

/**
 * Muting recipe shared by the two "context" states a section can be in —
 * drill-down neighbors (legacy designer `drawDimmedNeighboringSections`) and
 * inactive-floor footprints (legacy player `outOfFocus`). Studio mirrors the
 * same numbers in `scene.ts`, so keep them in sync if either side changes.
 */
const DIMMED_FILL_FACTOR = 0.15;
const DIMMED_STROKE_OPACITY = 0.25;

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

    afterGenerate(): void {
        // Preserve the base selection wiring (only active when `selectable`).
        super.afterGenerate();
        // The section polygon is the venue overview's hit target: clicking it
        // drills into the id-linked block, which reveals that section's seats.
        // `zoomToBlock` also dispatches the public `SECTION.ENTER` event.
        this.node.style("cursor", "pointer");
        this.node.on("click.sectionenter", () => {
            // The section polygon sits beneath the block/seats. Once this
            // section is entered, the block group is transparent, so clicks that
            // fall through the gaps between seats land on this polygon again —
            // re-drilling would re-frame (reset) the section the viewer is
            // already inside. Only drill in from the overview / another section.
            const enteredId = this.global.zoomManager.enteredBlockId;
            if (enteredId != null && enteredId.toString() === this.item.id.toString()) {
                return;
            }
            // #region agent log
            try {
                const blockExists = !!this.global.data.getBlocks().find((b: any) => b.id.toString() === this.item.id.toString());
                fetch('http://127.0.0.1:7338/ingest/eed4d821-d25d-4c9e-b38a-cf2bfb61c766',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ee490f'},body:JSON.stringify({sessionId:'ee490f',hypothesisId:'A,B',location:'section-item.ts:97',message:'section/zone polygon clicked',data:{id:this.item.id,zone:(this.item as any).zone ?? null,blockExists,enteredId},timestamp:Date.now()})}).catch(()=>{});
            } catch(e){}
            // #endregion
            this.global.zoomManager.zoomToBlock(this.item.id);
        });
        this.global.eventManager.addEventListener(EventType.SECTION_ENTER, () => {
            this.refreshAppearance();
        });
        this.global.eventManager.addEventListener(EventType.SECTION_EXIT, () => {
            this.refreshAppearance();
        });
        // Floor switches re-stack the floors and toggle `floor-inactive`; re-mute
        // (or restore) this section to match its floor's new active/inactive role.
        this.global.eventManager.addEventListener(EventType.FLOOR_CHANGED, () => {
            this.refreshAppearance();
        });
        this.refreshAppearance();
    }

    /**
     * Resolve this section's opacity from the two independent "context" states:
     *
     *  - **Inactive floor** (its `.floor` ancestor has `floor-inactive`): the
     *    whole floor is spatial context, so the polygon is muted and made
     *    non-interactive (legacy player `outOfFocus`). This wins over drill-down.
     *  - **Active floor**: apply the drill-down dim — non-entered sections fade
     *    while another section is entered (legacy designer
     *    `drawDimmedNeighboringSections`), otherwise full fidelity + interactive.
     */
    private refreshAppearance(): void {
        if (!this.shape?.node) {
            return;
        }
        const style = this.global.config.style.section;

        if (this.isOnInactiveFloor()) {
            this.shape.node
                .attr("fill-opacity", style.fill_opacity * DIMMED_FILL_FACTOR)
                .attr("stroke-opacity", DIMMED_STROKE_OPACITY);
            this.node.style("pointer-events", "none");
            return;
        }

        // Active floor: clicking the polygon must drill in again, so restore
        // pointer events (CSS only suppresses them on inactive floors).
        this.node.style("pointer-events", null);

        const enteredId = this.global.zoomManager.enteredBlockId;
        const isEntered =
            enteredId != null &&
            enteredId.toString() === this.item.id.toString();
        const dimmed = enteredId != null && !isEntered;
        const fillOpacity = dimmed ? style.fill_opacity * DIMMED_FILL_FACTOR : style.fill_opacity;
        const strokeOpacity = dimmed ? DIMMED_STROKE_OPACITY : 1;
        this.shape.node
            .attr("fill-opacity", fillOpacity)
            .attr("stroke-opacity", strokeOpacity);
    }

    /** Walk up to the owning `.floor` group and report its inactive state. */
    private isOnInactiveFloor(): boolean {
        const start = this.node?.node?.() as Element | null;
        let current: Element | null = start ? start.parentElement : null;
        while (current) {
            if (current.classList && current.classList.contains("floor")) {
                return current.classList.contains("floor-inactive");
            }
            current = current.parentElement;
        }
        return false;
    }

    private buildCaption(): string {
        const raw = this.item.label?.trim();
        const caption = raw ? raw : "Section";
        const seats = this.item.seat_count ?? 0;
        return seats > 0 ? `${caption} · ${seats}` : caption;
    }
}

registerObjectItem("section", (parent, item) => new SectionItem(parent, item as SectionObjectData));
