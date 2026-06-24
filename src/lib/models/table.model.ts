/*
 * table.model.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Normalized block-local table body. Mirrors {@link BlockTableData} but fills in
 * render-friendly defaults (label visibility, rotation) so the renderer stays
 * "dumb". `corner_radius` is intentionally left undefined when omitted so the
 * renderer can fall back to the table style at draw time.
 */

import type {BlockTableData, Point2D} from "@model/object.model";

export default class TableModel {
    id?: string;
    shape: 'round' | 'rect';
    center: Point2D;
    radius?: number;
    width?: number;
    height?: number;
    corner_radius?: number;
    rotation: number;
    color?: string;
    label: string | null;
    label_shown: boolean;

    constructor(item: BlockTableData) {
        this.id = item.id;
        this.shape = item.shape === 'rect' ? 'rect' : 'round';
        this.center = {
            x: item.center?.x ?? 0,
            y: item.center?.y ?? 0,
        };
        this.radius = item.radius;
        this.width = item.width;
        this.height = item.height;
        this.corner_radius = item.corner_radius;
        this.rotation = item.rotation ?? 0;
        this.color = item.color ?? undefined;
        this.label = item.label ?? null;
        // Default: show the label only when one is present, unless explicitly set.
        this.label_shown = item.label_shown !== undefined ? item.label_shown : !!this.label;
    }

    toJson(): BlockTableData {
        return {
            id: this.id,
            shape: this.shape,
            center: this.center,
            radius: this.radius,
            width: this.width,
            height: this.height,
            corner_radius: this.corner_radius,
            rotation: this.rotation,
            color: this.color,
            label: this.label,
            label_shown: this.label_shown,
        };
    }
}
