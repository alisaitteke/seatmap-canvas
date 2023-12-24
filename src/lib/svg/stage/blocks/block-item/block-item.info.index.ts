/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";
import BlockModel from "../../../../models/block.model";
import Block from "./block-item.index";
import {BlockTitle} from "./info/title";

@dom({
    tag: "g",
    class: "info",
    autoGenerate: false
})
export default class BlockInfo extends SvgBase {

    public title: BlockTitle;


    constructor(public parent: Block, public item: BlockModel) {
        super(parent);
        this.attr("opacity", 0);
        let x = ((this.item.bounds[1][0] - this.item.bounds[2][0]) / 2) + this.item.bounds[2][0];
        let y = ((this.item.bounds[0][1] - this.item.bounds[1][1]) / 2) + this.item.bounds[1][1];
        this.attr("transform", "translate(" + [x, y] + ")");
        return this;
    }

    update(): this {
        this.title = new BlockTitle(this);
        this.addChild(this.title);
        this.updateChilds();
        this.title.node.text(this.parent.item.title);
        return this;
    }
}