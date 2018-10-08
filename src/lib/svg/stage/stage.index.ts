/*
 * index.ts
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import BlocksManager from "./blocks/blocks.index";
import {SvgManager} from "../svg.index";
import SvgBase from "../svg.base";
import {dom} from "../../decorators/dom";


@dom({
    tag: "g",
    class: "stage"
})
export default class StageManager extends SvgBase {

    public blocks: BlocksManager;

    constructor(public parent: SvgManager) {
        super(parent);
        this.blocks = new BlocksManager(this);
    }
}