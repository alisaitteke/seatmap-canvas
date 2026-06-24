/*
 * object-item.factory.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Registry that maps a chart-object `type` to the SVG item class that renders
 * it. This is the single extension seam for the objects layer: each render-type
 * (section, ga, table, booth, shape, icon, text) registers its renderer here, so
 * the {@link Objects} layer can stay generic and simply ask the factory to build
 * a child for every object it is given.
 */

import type SvgBase from "@svg/svg.base";
import type Objects from "./objects.index";
import {ObjectData, ObjectType} from "@model/object.model";

/** Builds the SVG item for a single chart object (or `null` to skip it). */
export type ObjectItemFactory = (parent: Objects, item: ObjectData) => SvgBase | null;

const registry: Partial<Record<ObjectType, ObjectItemFactory>> = {};

/**
 * Register the renderer for a chart-object type. Called once per type at module
 * load by each item implementation. Re-registering overrides the previous entry.
 */
export function registerObjectItem(type: ObjectType, factory: ObjectItemFactory): void {
    registry[type] = factory;
}

/**
 * Build the SVG item for `item` using the registered factory for its type, or
 * `null` when no renderer is registered (the objects layer then skips it).
 */
export function createObjectItem(parent: Objects, item: ObjectData): SvgBase | null {
    const factory = registry[item.type];
    return factory ? factory(parent, item) : null;
}
