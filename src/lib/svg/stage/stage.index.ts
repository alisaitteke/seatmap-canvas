/*
 * index.ts
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import Blocks from "./blocks/blocks.index";
import Svg from "../svg.index";
import SvgBase from "../svg.base";
import {dom} from "../../decorators/dom";
import BlocksSearchCircle from "./blocks.search-circle";
import BlocksTooltip from "./blocks.tooltip";


@dom({
    tag: "g",
    class: "stage",
    autoGenerate: false
})
export default class Stage extends SvgBase {

    public blocks: Blocks;
    public searchCircle:BlocksSearchCircle;
    public tooltip:BlocksTooltip;

    constructor(public parent: Svg) {
        super(parent);
        // let center = [this.global.windowManager.width/2,this.global.windowManager.height/5];
        // this.attr("transform", "translate("+center+")");
    }


    update() {
        this.blocks = new Blocks(this);
        this.addChild(this.blocks);

        this.searchCircle = new BlocksSearchCircle(this);
        this.addChild(this.searchCircle);

        this.tooltip = new BlocksTooltip(this);
        this.addChild(this.tooltip);


        this.updateChilds();
    }
}