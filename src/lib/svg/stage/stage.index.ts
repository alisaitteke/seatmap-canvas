/*
 * index.ts
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import Blocks from "./blocks/blocks.index";
import Svg from "../svg.index";
import SvgBase from "../svg.base";
import {dom} from "../../decorators/dom";
import BlocksSearchCircle from "./blocks.search-circle";



@dom({
    tag: "g",
    class: "stage",
    autoGenerate: false
})
export default class Stage extends SvgBase {

    public blocks: Blocks;
    public searchCircle:BlocksSearchCircle;

    constructor(public parent: Svg) {
        super(parent);
    }


    update() {
        this.blocks = new Blocks(this);
        this.addChild(this.blocks);

        this.searchCircle = new BlocksSearchCircle(this);
        this.addChild(this.searchCircle);


        this.updateChilds();
    }


}