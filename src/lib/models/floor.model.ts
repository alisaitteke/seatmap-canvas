/*
 * floor.model.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * A single floor of a multi-floor venue. Every chart owns at least one floor;
 * single-floor charts are modelled as exactly one implicit floor so the render
 * pipeline stays uniform. A floor is a self-contained scene: its own seating
 * blocks, chart-level objects, focal point and (optionally) background image.
 */

import BlockModel from "@model/block.model";
import {FloorData, ObjectData, FocalPointData} from "@model/object.model";

export default class FloorModel {
    /** Stable identifier (legacy `floorName`); used by the name-based API. */
    id: string;
    /** Optional UI label (legacy `floorDisplayName`); falls back to {@link id}. */
    displayName: string | null;
    blocks: Array<BlockModel>;
    objects: Array<ObjectData>;
    focalPoint: FocalPointData | null;
    backgroundImage: string | null;

    constructor(init: {
        id: string;
        displayName?: string | null;
        blocks?: Array<BlockModel>;
        objects?: Array<ObjectData>;
        focalPoint?: FocalPointData | null;
        backgroundImage?: string | null;
    }) {
        this.id = init.id;
        this.displayName = init.displayName ?? null;
        this.blocks = init.blocks ?? [];
        this.objects = init.objects ?? [];
        this.focalPoint = init.focalPoint ?? null;
        this.backgroundImage = init.backgroundImage ?? null;
    }

    /** Human label for the elevator/tooltip (display name, else id). */
    public label(): string {
        return (this.displayName && this.displayName.trim()) || this.id;
    }

    public toJson(): FloorData {
        return {
            id: this.id,
            display_name: this.displayName ?? undefined,
            blocks: this.blocks,
            objects: this.objects,
            focal_point: this.focalPoint,
            background_image: this.backgroundImage,
        };
    }
}
