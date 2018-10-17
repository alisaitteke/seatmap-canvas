/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../decorators";
import SvgBase from "../svg.base";

import Circle from "./search-circle/circle";
import {EventType, ZoomLevel} from "../../enums/global";
import Stage from "./stage.index";

@dom({
    tag: "g",
    class: "search-circle",
    autoGenerate: false
})
export default class BlocksSearchCircle extends SvgBase {


    public circle: Circle;

    constructor(public parent: Stage) {
        super(parent);
        this.global.eventManager.addEventListener(EventType.MOUSE_MOVE, (mouse: any) => {
            this.node.attr("transform", "translate(" + mouse + ")");
        });

        this.global.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, (zoom_level: any) => {
            if (zoom_level.level === ZoomLevel.VENUE || zoom_level.level === ZoomLevel.SEAT) {
                this.node.classed("show", false);
            }
        });


        return this;
    }

    update(): this {

        this.clear();
        this.circle = new Circle(this);
        this.addChild(this.circle);
        this.updateChilds();


        this.parent.blocks.node.on("mouseleave.search", () => {
            this.node.classed("show", false);
        });

        this.parent.blocks.node.on("mousemove.search", () => {
            if (this.global.zoomManager.zoomLevel === ZoomLevel.VENUE) {
                this.node.classed("show", false);
            } else if (this.global.zoomManager.zoomLevel === ZoomLevel.BLOCK) {
                this.node.classed("show", true);
            } else if (this.global.zoomManager.zoomLevel === ZoomLevel.SEAT) {
                this.node.classed("show", false);
            }
        });

        return this;
    }
}