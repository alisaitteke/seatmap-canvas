/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../../decorators";
import SvgBase from "../../svg.base";

import Blocks from "./blocks.index";

@dom({
    tag: "g",
    class: "search-circle",
    autoGenerate: false
})
export default class BlocksSearchCircle extends SvgBase {


    constructor(public parent: Blocks) {
        super(parent);
        return this;
    }

    update(): this {

        this.updateChilds();

        return this;
    }
}