/*
 * focal-point.index.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Focal-point overlay — the venue orientation marker (stage/pitch). A chart-level
 * singleton (not an {@link ObjectData}) read from {@link DataModel.getFocalPoint},
 * drawn as three concentric glow rings behind a filled outer and inner dot.
 * Mirrors studio `Scene.renderFocalPoint` / `seatsio.FocalPoint.createShapes`.
 *
 * Screen-stable sizing: the marker lives inside the zoomed stage, so its own
 * group is counter-scaled by `1 / zoom` and the circles are drawn in screen
 * pixels (see {@link FocalStyle}). The geometry therefore never changes; only
 * the group transform is re-applied as the zoom changes, which is cheap.
 */

import {zoomTransform} from "d3-zoom";
import {dom} from "@decorator/dom";
import SvgBase from "@svg/svg.base";
import {EventType} from "@enum/global";
import {ObjectItemCircle} from "./objects/object-item.circle";

@dom({
    tag: "g",
    class: "focal-point",
    autoGenerate: false
})
export default class FocalPoint extends SvgBase {

    constructor(public parent: SvgBase) {
        super(parent);
        // Keep the marker screen-stable when the discrete zoom level changes.
        // Continuous zoom ticks are handled by the zoom manager calling
        // {@link applyZoom} directly with the live scale.
        this.global.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, () => this.applyZoom());
        return this;
    }

    update(): this {
        this.clear();

        const focal = this.global.data.getFocalPoint();
        if (!focal) {
            if (this.node) {
                this.node.style("display", "none");
            }
            return this;
        }
        if (this.node) {
            this.node.style("display", null);
        }

        const style = this.global.config.style.focal;
        const base = style.base_size;

        style.glow_factors.forEach((factor: number, index: number) => {
            this.addChild(new ObjectItemCircle(this, {
                cx: 0,
                cy: 0,
                r: factor * base,
                fill: "transparent",
                stroke: style.glow,
                "stroke-width": style.glow_stroke_factor * base,
                "stroke-opacity": style.glow_opacities[index] ?? 0,
                "pointer-events": "none",
            }));
        });

        this.addChild(new ObjectItemCircle(this, {
            cx: 0,
            cy: 0,
            r: style.outer_dot_factor * base,
            fill: style.fill,
            stroke: style.stroke,
            "stroke-width": style.outer_stroke_factor * base,
            "pointer-events": "none",
        }));
        this.addChild(new ObjectItemCircle(this, {
            cx: 0,
            cy: 0,
            r: style.inner_dot_factor * base,
            fill: style.fill,
            stroke: style.stroke,
            "stroke-width": style.inner_stroke_factor * base,
            "pointer-events": "none",
        }));

        this.updateChilds();
        this.applyZoom();
        return this;
    }

    /**
     * Position the marker at the focal point and counter-scale it by `1 / k` so
     * it keeps a constant on-screen size. `k` defaults to the live stage scale;
     * `duration` (ms) transitions the transform in lock-step with an animated
     * stage zoom so the marker stays stable throughout the animation.
     */
    public applyZoom(k?: number, duration: number = 0): this {
        if (!this.node) {
            return this;
        }
        const focal = this.global.data.getFocalPoint();
        if (!focal) {
            return this;
        }
        const scale = k ?? this.currentScale();
        const inverse = scale ? 1 / scale : 1;
        const transform = `translate(${focal.x},${focal.y})scale(${inverse})`;
        if (duration > 0) {
            this.node.interrupt().transition().duration(duration).attr("transform", transform);
        } else {
            this.node.interrupt().attr("transform", transform);
        }
        return this;
    }

    /** Live stage zoom scale (`k`), read from the SVG zoom transform. */
    private currentScale(): number {
        const svgNode = this.global.root?.svg?.node?.node();
        if (!svgNode) {
            return 1;
        }
        return zoomTransform(svgNode).k || 1;
    }
}
