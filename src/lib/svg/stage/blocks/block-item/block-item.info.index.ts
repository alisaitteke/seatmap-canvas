/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";
import BlockModel from "../../../../models/block.model";
import Block from "./block-item.index";
import {BlockTitle} from "./info/title";
import {EventType, ZoomLevel} from "../../../../enums/global";

@dom({
    tag: "g",
    class: "info",
    autoGenerate: false
})
export default class BlockInfo extends SvgBase {

    public title: BlockTitle;

    constructor(public parent: Block, public item: BlockModel) {
        super(parent);
        this.global.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, (zoomLevel: ZoomLevel) => {
            if(zoomLevel = ZoomLevel.BLOCK){
                //this.title.node.attr("y", this.parent.item.bounds[2][0] - 150);
            }
        });
        return this;
    }

    update(): this {
        this.title = new BlockTitle(this);
        this.addChild(this.title);
        this.updateChilds();
        setTimeout(() => {
            this.title.node.attr("x", this.parent.item.bbox.x);
            this.title.node.attr("y", this.parent.item.bbox.y);
        }, 50);
        this.title.node.text(this.parent.item.title);
        console.log(this.parent.item)
        //this.title.node.attr("x", this.parent.item.bbox.x);
        return this;
    }
}