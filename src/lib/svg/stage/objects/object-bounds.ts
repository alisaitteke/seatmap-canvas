/*
 * object-bounds.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Axis-aligned bounding-box estimation for chart-level render objects. Used by
 * the zoom manager so zoom-to-fit accounts for GA areas, sections and decorative
 * objects — not only seats. Geometry is already resolved into document
 * coordinates, so this stays a pure, DOM-free computation.
 *
 * Path-based objects (section / ga / shape) are measured by extracting the
 * numeric coordinate pairs from their SVG `d` string. This is an approximation
 * (arc flags are treated as coordinates), but it is only consumed by zoom-fit,
 * where a slightly generous box is harmless.
 */

import {ObjectData} from "@model/object.model";

export interface ObjectBounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

/** Rotate `(x, y)` by `deg` degrees around `(cx, cy)`. */
function rotatePoint(x: number, y: number, cx: number, cy: number, deg: number): [number, number] {
    if (!deg) {
        return [x, y];
    }
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = x - cx;
    const dy = y - cy;
    return [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos];
}

/** Bounding box of a list of points, or `null` when empty. */
function fromPoints(points: Array<[number, number]>): ObjectBounds | null {
    if (!points.length) {
        return null;
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const [x, y] of points) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            continue;
        }
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }
    return Number.isFinite(minX) ? {minX, minY, maxX, maxY} : null;
}

/** Extract `(x, y)` coordinate pairs from an SVG path `d` string. */
function pathPoints(d: string): Array<[number, number]> {
    const nums = (d.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || []).map(Number);
    const points: Array<[number, number]> = [];
    for (let i = 0; i + 1 < nums.length; i += 2) {
        points.push([nums[i], nums[i + 1]]);
    }
    return points;
}

/** Bounding box of a centered `width × height` rectangle rotated by `deg`. */
function rectBounds(cx: number, cy: number, width: number, height: number, deg: number): ObjectBounds | null {
    const hw = width / 2;
    const hh = height / 2;
    const corners: Array<[number, number]> = [
        [cx - hw, cy - hh],
        [cx + hw, cy - hh],
        [cx + hw, cy + hh],
        [cx - hw, cy + hh],
    ].map(([x, y]) => rotatePoint(x, y, cx, cy, deg));
    return fromPoints(corners);
}

/**
 * Estimate the document-space bounding box of a chart-level object, or `null`
 * when it carries no measurable geometry.
 */
export function objectBounds(object: ObjectData): ObjectBounds | null {
    switch (object.type) {
        case "section":
            // Sections are not rotated; the path is already final.
            return fromPoints(pathPoints(object.path));
        case "ga":
        case "shape": {
            let points = pathPoints(object.path);
            const rotation = object.rotation ?? 0;
            if (rotation) {
                points = points.map(([x, y]) =>
                    rotatePoint(x, y, object.center.x, object.center.y, rotation));
            }
            return fromPoints(points);
        }
        case "table": {
            if (object.shape === "round") {
                const r = object.radius ?? 0;
                return {
                    minX: object.center.x - r,
                    minY: object.center.y - r,
                    maxX: object.center.x + r,
                    maxY: object.center.y + r,
                };
            }
            return rectBounds(
                object.center.x,
                object.center.y,
                object.width ?? 0,
                object.height ?? 0,
                object.rotation ?? 0);
        }
        case "booth":
            return rectBounds(
                object.center.x,
                object.center.y,
                object.width,
                object.height,
                object.rotation ?? 0);
        case "icon":
            return rectBounds(
                object.center.x,
                object.center.y,
                object.size,
                object.size,
                object.rotation ?? 0);
        case "text": {
            // No exact text metrics here; approximate a box around the origin.
            const fs = object.font_size || 16;
            const half = (object.text?.length || 1) * fs * 0.3;
            return {
                minX: object.origin.x - half,
                minY: object.origin.y - fs,
                maxX: object.origin.x + half,
                maxY: object.origin.y + fs,
            };
        }
        default:
            return null;
    }
}
