/*
 * floor.index.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * One floor's SVG subtree. A floor is a self-contained scene that reuses the
 * exact same layer stack as a single-floor chart:
 *
 *   [floor background] → objects(background) → blocks → objects(foreground) → focal
 *
 * While a floor is (re)built the data accessors are scoped to it via
 * {@link DataModel.setRenderFloor}, so the layer classes keep reading from
 * `global.data` unchanged and never have to know about floors.
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import Blocks from "@svg/stage/blocks/blocks.index";
import Objects from "@svg/stage/objects/objects.index";
import FocalPoint from "@svg/stage/focal-point.index";
import FloorModel from "@model/floor.model";

@dom({
    tag: "g",
    class: "floor",
    autoGenerate: false
})
export default class Floor extends SvgBase {

    public objectsBackground: Objects;
    public blocks: Blocks;
    public objectsForeground: Objects;
    public focal: FocalPoint;

    private backgroundNode: any = null;

    constructor(public parent: SvgBase, public index: number, public floorModel: FloorModel) {
        super(parent);
        this.classed("floor-" + index);
        return this;
    }

    update(): this {
        // Scope every data accessor to this floor for the whole (synchronous)
        // build, then restore the accessors to the effective active floor.
        this.global.data.setRenderFloor(this.index);
        this.clear();
        this.removeBackground();

        this.objectsBackground = new Objects(this, 'background');
        this.addChild(this.objectsBackground);

        this.blocks = new Blocks(this);
        this.addChild(this.blocks);

        this.objectsForeground = new Objects(this, 'foreground');
        this.addChild(this.objectsForeground);

        this.focal = new FocalPoint(this);
        this.addChild(this.focal);

        this.updateChilds();
        this.renderBackground();

        this.global.data.resetRenderFloor();
        return this;
    }

    /** Raw content bounds (seating + objects), ignoring this floor's transform. */
    public contentBBox(): { x: number; y: number; width: number; height: number } {
        return this.node.node().getBBox();
    }

    private removeBackground(): void {
        if (this.backgroundNode) {
            this.backgroundNode.remove();
            this.backgroundNode = null;
        }
    }

    /**
     * Optional per-floor background image, sized to cover the floor content.
     * Inserted as the first child so it paints beneath every object/seat.
     */
    private renderBackground(): void {
        const url = this.floorModel.backgroundImage;
        if (!url || !this.node) {
            return;
        }
        const box = this.node.node().getBBox();
        this.backgroundNode = this.node.insert("image", ":first-child")
            .classed("floor-background", true)
            .attr("href", url)
            .attr("x", box.width ? box.x : 0)
            .attr("y", box.height ? box.y : 0)
            .attr("width", box.width || 2000)
            .attr("height", box.height || 2000)
            .attr("opacity", this.global.config.background_opacity ?? 0.3)
            .attr("preserveAspectRatio", "xMidYMid slice")
            .attr("pointer-events", "none");
    }
}
