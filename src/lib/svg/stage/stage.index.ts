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



@dom({
    tag: "g",
    class: "stage",
    autoGenerate: false
})
export default class Stage extends SvgBase {

    public blocks: Blocks;
    public objectsBackground: Objects;
    public objectsForeground: Objects;
    public focal: FocalPoint;
    public searchCircle:BlocksSearchCircle;
    public background: StageBackground;

    constructor(public parent: Svg) {
        super(parent);
    }


    update() {
        // Add global background image (first, at the bottom) - only if configured
        if (this.global.config.background_image) {
            this.background = new StageBackground(this);
            this.addChild(this.background);
        }

        // Background objects (shapes, sections, GA, table/booth bodies) sit
        // beneath the seating layer.
        this.objectsBackground = new Objects(this, 'background');
        this.addChild(this.objectsBackground);

        this.blocks = new Blocks(this);
        this.addChild(this.blocks);

        // Foreground objects (foreground shapes, icons, text) sit above seats.
        this.objectsForeground = new Objects(this, 'foreground');
        this.addChild(this.objectsForeground);

        // Focal point overlay sits above every object/seat (below interaction
        // overlays). Always created; it hides itself when no focal point is set.
        this.focal = new FocalPoint(this);
        this.addChild(this.focal);

        this.searchCircle = new BlocksSearchCircle(this);
        this.addChild(this.searchCircle);


        this.updateChilds();
    }


}