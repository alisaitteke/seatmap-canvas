/*
 * index.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import Blocks from "./blocks/blocks.index";
import Objects from "./objects/objects.index";
import Svg from "@svg/svg.index";
import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import BlocksSearchCircle from "./blocks.search-circle";
import StageBackground from "./stage.background";
import FocalPoint from "./focal-point.index";
import Floors from "./floors/floors.index";
import Floor from "./floors/floor.index";



@dom({
    tag: "g",
    class: "stage",
    autoGenerate: false
})
export default class Stage extends SvgBase {

    public floors: Floors;
    public searchCircle: BlocksSearchCircle;
    public background: StageBackground;

    constructor(public parent: Svg) {
        super(parent);
    }

    /**
     * The active floor's subtree. Single-floor charts have exactly one floor, so
     * these getters preserve the previous `stage.blocks` / `stage.focal` / etc.
     * API for the zoom manager and every existing consumer.
     */
    public get activeFloor(): Floor {
        return this.floors.getActiveFloorGroup();
    }

    public get blocks(): Blocks {
        return this.activeFloor.blocks;
    }

    public get objectsBackground(): Objects {
        return this.activeFloor.objectsBackground;
    }

    public get objectsForeground(): Objects {
        return this.activeFloor.objectsForeground;
    }

    public get focal(): FocalPoint {
        return this.activeFloor.focal;
    }

    update() {
        // Global background image (bottom of the stack), if configured.
        if (this.global.config.background_image) {
            this.background = new StageBackground(this);
            this.addChild(this.background);
        }

        // Every floor's layer stack lives inside the floors container.
        this.floors = new Floors(this);
        this.addChild(this.floors);

        this.searchCircle = new BlocksSearchCircle(this);
        this.addChild(this.searchCircle);

        this.updateChilds();
    }


}
