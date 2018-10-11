/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../../decorators";
import SvgBase from "../../svg.base";

import Blocks from "./blocks.index";
import Circle from "./search-circle/circle";
import {EventType, ZoomLevel} from "../../../enums/global";

@dom({
    tag: "g",
    class: "search-circle",
    autoGenerate: false
})
export default class BlocksSearchCircle extends SvgBase {


    public circle: Circle;

    constructor(public parent: Blocks) {
        super(parent);
        this.parent.global.eventManager.addEventListener(EventType.MOUSE_MOVE, (mouse: any) => {
            this.node.attr("transform", "translate(" + mouse + ")");
        });

        this.parent.global.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, (levelObject: any) => {
            if(levelObject.level===ZoomLevel.VENUE){
                this.node.classed("show",false);
            }else if(levelObject.level===ZoomLevel.BLOCK){
                this.node.classed("show",true);
            }else if(levelObject.level===ZoomLevel.SEAT){
                this.node.classed("show",false);
            }
        });
        return this;
    }

    update(): this {

        this.clear();
        this.circle = new Circle(this);
        this.addChild(this.circle);
        this.updateChilds();

        return this;
    }
}