/*
 * table-body.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Shared table-body geometry. Builds the body (round circle or rounded rect)
 * plus an optional label under any `SvgBase` parent, so the chart-level
 * {@link TableItem} (in `objects[]`) and the block-local `BlockTables` container
 * share one implementation. Children are pushed via `addChild`; the caller owns
 * the subsequent `updateChilds()` call.
 */

import SvgBase from "@svg/svg.base";
import type {Point2D} from "@model/object.model";
import type {TableStyle} from "@model/styles/table.style";
import {ObjectItemCircle} from "./object-item.circle";
import {ObjectItemRect} from "./object-item.rect";
import {ObjectItemLabel, labelAt} from "./object-item.label";

/** Minimal geometry needed to paint a table body. */
export interface TableBodyDescriptor {
    shape: 'round' | 'rect';
    center: Point2D;
    radius?: number;
    width?: number;
    height?: number;
    corner_radius?: number;
    rotation?: number;
    label?: string | null;
    label_shown?: boolean;
}

/** Resolved colors (caller owns selection / category color logic). */
export interface TableBodyColors {
    fill: string;
    stroke: string;
}

/**
 * Draw the table body (+ optional label) under `parent` and return the body
 * element so callers can refresh its stroke on selection.
 */
export function drawTableBody(
    parent: SvgBase,
    table: TableBodyDescriptor,
    style: TableStyle,
    colors: TableBodyColors
): ObjectItemCircle | ObjectItemRect {
    const {x, y} = table.center;
    let body: ObjectItemCircle | ObjectItemRect;

    if (table.shape === "round") {
        const radius = table.radius ?? 0;
        body = new ObjectItemCircle(parent, {
            cx: x,
            cy: y,
            r: radius,
            fill: colors.fill,
            stroke: colors.stroke,
            "stroke-width": style.stroke_width,
        });
    } else {
        const width = table.width ?? 0;
        const height = table.height ?? 0;
        const corner = table.corner_radius ?? style.corner_radius;
        const rotation = table.rotation ?? 0;
        const attrs: Record<string, string | number> = {
            x: x - width / 2,
            y: y - height / 2,
            width,
            height,
            rx: corner,
            fill: colors.fill,
            stroke: colors.stroke,
            "stroke-width": style.stroke_width,
        };
        if (rotation) {
            attrs.transform = `rotate(${rotation} ${x} ${y})`;
        }
        body = new ObjectItemRect(parent, attrs);
    }
    parent.addChild(body);

    if (table.label_shown !== false && table.label) {
        const anchor = labelAt(table.center);
        parent.addChild(new ObjectItemLabel(parent, table.label, {
            x: anchor.x,
            y: anchor.y,
            fill: style.label_color,
            font_size: style.label_size,
            font_weight: style.label_weight,
            font_family: style.font_family,
        }));
    }

    return body;
}
