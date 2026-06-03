/*
 * objects.index.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * Chart-level objects layer — a sibling of {@link Blocks} that paints every
 * non-seating primitive (sections, GA areas, table/booth bodies, decorative
 * shapes, icons and text).
 *
 * For correct stacking the layer is split into two `band`s that the stage places
 * around the seating layer:
 *
 *   background-fill → shapes(bg) → section → ga → table → booth
 *     → BLOCKS/SEATS → labels → shapes(fg) → icon → text → focal …
 *
 * The stage instantiates one layer per band; each only renders the objects that
 * belong to its band and orders them by {@link Z_ORDER}. The per-type rendering
 * itself is delegated to the {@link createObjectItem} factory, so this layer is
 * generic and never special-cases a render type.
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {ObjectData, ObjectType} from "@model/object.model";
import {createObjectItem} from "./object-item.factory";

// Side-effect registrations for chart-object renderers (phases 3–5).
import "./section-item";
import "./ga-item";
import "./table-item";
import "./booth-item";
import "./shape-item";
import "./icon-item";
import "./text-item";

/** Which side of the seating layer a band is painted on. */
export type ObjectBand = 'background' | 'foreground';

/**
 * Paint order of object types within a band (lower draws first / underneath).
 * Each band only contains a subset, so the same map drives both: the background
 * band uses shape→section→ga→table→booth and the foreground band uses
 * shape→icon→text. Decorative shapes appear in both bands via their `layer`.
 */
const Z_ORDER: Record<ObjectType, number> = {
    shape: 0,
    section: 1,
    ga: 2,
    table: 3,
    booth: 4,
    icon: 5,
    text: 6,
};

@dom({
    tag: "g",
    class: "objects",
    autoGenerate: false
})
export default class Objects extends SvgBase {

    constructor(public parent: SvgBase, public band: ObjectBand) {
        super(parent);
        // Distinguish the two sibling layers in the DOM for debugging/styling.
        this.classed("objects-" + band);
        return this;
    }

    public update(): this {
        this.clear();
        this.collect().forEach((object: ObjectData) => {
            const item = createObjectItem(this, object);
            if (item) {
                this.addChild(item);
            }
        });
        this.updateChilds();
        return this;
    }

    /** Objects belonging to this band, ordered for painting. */
    private collect(): Array<ObjectData> {
        return this.global.data
            .getObjects()
            .filter((object: ObjectData) => this.bandOf(object) === this.band)
            .map((object: ObjectData, index: number) => ({object, index}))
            // Stable sort: by paint order, then original input order.
            .sort((a, b) => (Z_ORDER[a.object.type] - Z_ORDER[b.object.type]) || (a.index - b.index))
            .map((entry) => entry.object);
    }

    /** Which band an object is painted in. */
    private bandOf(object: ObjectData): ObjectBand {
        if (object.type === 'shape') {
            return object.layer === 'foreground' ? 'foreground' : 'background';
        }
        if (object.type === 'icon' || object.type === 'text') {
            return 'foreground';
        }
        // section, ga, table, booth sit beneath the seating layer.
        return 'background';
    }
}
