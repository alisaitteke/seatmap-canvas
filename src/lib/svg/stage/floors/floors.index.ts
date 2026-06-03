/*
 * floors.index.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * The multi-floor container. Holds one {@link Floor} subtree per floor and owns
 * floor switching + the stacked "all floors" camera.
 *
 * Rendering model (mirrors the legacy player's one-renderer-per-floor design):
 * every floor is fully built once on load, so switching floors is just a
 * transform/visibility change — never a re-render. Single-floor charts collapse
 * to exactly one floor group with an identity transform, so they render and
 * behave identically to before this layer existed.
 *
 * The d3 zoom transform is applied to the parent stage `<g>`, and each floor's
 * stacking/isometric transform is applied to its own `<g>`. The two compose, so
 * the user can freely pan/zoom the stacked composition.
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {EventType} from "@enum/global";
import Floor from "./floor.index";
import Stage from "@svg/stage/stage.index";
import {ALL_FLOORS} from "@model/data.model";

/** Vertical tilt factor for the isometric stack (compresses each floor's Y). */
const ISO_Y_SCALE = 0.6;
/** Horizontal shear for the isometric stack (oblique projection). */
const ISO_SHEAR_X = -0.5;
/** Elevation between stacked isometric floors, as a fraction of floor height. */
const ISO_ELEVATION = 0.55;
/** Horizontal parallax between stacked isometric floors, as a fraction of height. */
const ISO_SPREAD_X = 0.12;
/** Gap between flat ("stage" view) stacked floors, as a fraction of floor height. */
const STAGE_GAP = 1.18;

@dom({
    tag: "g",
    class: "floors",
    autoGenerate: false
})
export default class Floors extends SvgBase {

    constructor(public parent: Stage) {
        super(parent);
        return this;
    }

    /** Rebuild every floor subtree, then lay them out for the current view. */
    update(): this {
        this.clear();
        this.global.data.getFloors().forEach((floorModel, index) => {
            this.addChild(new Floor(this, index, floorModel));
        });
        this.updateChilds();
        this.applyView();
        return this;
    }

    public getFloorGroups(): Array<Floor> {
        return this.child_items as Array<Floor>;
    }

    /** The floor group exposed to the zoom manager / stage getters. */
    public getActiveFloorGroup(): Floor {
        const idx = this.global.data.getCurrentFloorIndex();
        const eff = idx >= 0 ? idx : 0;
        const groups = this.getFloorGroups();
        return groups[eff] ?? groups[0];
    }

    /* ------------------------------------------------------------------ *
     * Initial framing
     * ------------------------------------------------------------------ */

    /** Choose and frame the initial view after a (re)build. */
    public initView(): this {
        const data = this.global.data;
        const config = this.global.config;

        if (!data.isMultiFloor()) {
            data.setCurrentFloor(0);
            this.applyView();
            this.frameActiveFloor(false);
            this.dispatchFloorChanged();
            return this;
        }

        // Multi-floor: honor a pinned `active_floor`, else open the all-floors view.
        let target = ALL_FLOORS;
        if (config.active_floor) {
            const idx = data.floorIndexById(config.active_floor);
            if (idx >= 0) {
                target = idx;
            }
        }

        if (target >= 0) {
            this.selectFloor(target, false);
        } else {
            data.setCurrentFloor(ALL_FLOORS);
            this.applyView();
            this.framePicking(false);
            this.dispatchFloorChanged();
        }
        return this;
    }

    /* ------------------------------------------------------------------ *
     * Floor switching
     * ------------------------------------------------------------------ */

    /** Enter a single floor (index into {@link DataModel.floors}). */
    public selectFloor(index: number, animated: boolean = true): this {
        const data = this.global.data;
        if (index < 0 || index >= data.getFloors().length) {
            return this;
        }
        data.setCurrentFloor(index);
        this.applyView();
        this.frameActiveFloor(animated);
        this.dispatchFloorChanged();
        return this;
    }

    /** Leave the selected floor and return to the stacked all-floors view. */
    public goToAllFloors(animated: boolean = true): this {
        const data = this.global.data;
        if (!data.isMultiFloor()) {
            return this;
        }
        data.setCurrentFloor(ALL_FLOORS);
        this.applyView();
        this.framePicking(animated);
        this.dispatchFloorChanged();
        return this;
    }

    /** Toggle a floor: select it, or leave it for the all-floors view. */
    public toggleFloor(index: number, animated: boolean = true): this {
        const current = this.global.data.getCurrentFloorIndex();
        if (current === index) {
            return this.goToAllFloors(animated);
        }
        return this.selectFloor(index, animated);
    }

    /* ------------------------------------------------------------------ *
     * Layout / camera
     * ------------------------------------------------------------------ */

    /** Position/show floors for the current selection. */
    public applyView(): this {
        const data = this.global.data;
        const groups = this.getFloorGroups();

        if (!data.isMultiFloor()) {
            const only = groups[0];
            if (only) {
                only.node.attr("transform", null).style("display", null).classed("floor-dimmed", false);
            }
            this.node.classed("multi-floor", false).classed("picking", false);
            return this;
        }

        this.node.classed("multi-floor", true);
        const current = data.getCurrentFloorIndex();

        if (current < 0) {
            this.node.classed("picking", true);
            this.stackFloors(groups);
        } else {
            this.node.classed("picking", false);
            groups.forEach((group, i) => {
                if (i === current) {
                    group.node.attr("transform", null).style("display", null).classed("floor-dimmed", false);
                } else {
                    group.node.style("display", "none");
                }
            });
        }
        return this;
    }

    /** Apply the stacked (stage or isometric) transforms to every floor group. */
    private stackFloors(groups: Array<Floor>): void {
        const isometric = this.global.data.multiFloorView === 'isometric';

        // Tallest raw floor drives the stacking gap so floors never overlap.
        let maxHeight = 0;
        groups.forEach((group) => {
            group.node.attr("transform", null).style("display", null).classed("floor-dimmed", false);
            const box = group.contentBBox();
            if (box.height > maxHeight) {
                maxHeight = box.height;
            }
        });
        if (!maxHeight) {
            maxHeight = 400;
        }

        groups.forEach((group, i) => {
            let transform: string;
            if (isometric) {
                const elevation = maxHeight * ISO_ELEVATION;
                const spread = maxHeight * ISO_SPREAD_X;
                transform =
                    `translate(${i * spread}, ${-i * elevation}) ` +
                    `matrix(1, 0, ${ISO_SHEAR_X}, ${ISO_Y_SCALE}, 0, 0)`;
            } else {
                const gap = maxHeight * STAGE_GAP;
                transform = `translate(0, ${i * gap})`;
            }
            group.node.attr("transform", transform);
        });
    }

    /** Fit the selected (or single) floor using the standard venue zoom. */
    private frameActiveFloor(animated: boolean): void {
        const zm = this.global.zoomManager;
        const blocks = this.global.data.getBlocks();
        zm.calculateZoomLevels(blocks);
        zm.calculateActiveBlocks(blocks);
        zm.zoomToVenue(animated);
    }

    /** Fit the whole stacked composition (all-floors view). */
    private framePicking(animated: boolean): void {
        const box = this.node.node().getBBox();
        this.global.zoomManager.zoomToBBox(box, animated);
    }

    /* ------------------------------------------------------------------ *
     * Hover (elevator highlight)
     * ------------------------------------------------------------------ */

    /** Dim every floor except `index` (used by the elevator hover). */
    public hoverFloor(index: number): this {
        if (this.global.data.getCurrentFloorIndex() >= 0) {
            return this;
        }
        this.getFloorGroups().forEach((group, i) => {
            group.node.classed("floor-dimmed", i !== index);
        });
        return this;
    }

    public unhoverFloor(): this {
        this.getFloorGroups().forEach((group) => group.node.classed("floor-dimmed", false));
        return this;
    }

    private dispatchFloorChanged(): void {
        const data = this.global.data;
        const idx = data.getCurrentFloorIndex();
        const floor = idx >= 0 ? data.getFloors()[idx] : null;
        this.global.eventManager.dispatch(EventType.FLOOR_CHANGED, {
            index: idx,
            id: floor ? floor.id : null,
            display_name: floor ? floor.label() : null,
        });
    }
}
