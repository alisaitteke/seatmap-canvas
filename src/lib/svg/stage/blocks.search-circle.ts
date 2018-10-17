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

        return this;
    }

    update(): this {

        this.clear();
        this.circle = new Circle(this);
        this.addChild(this.circle);
        this.updateChilds();

        this.parent.blocks.node.on("mouseleave", () =>  this.node.classed("show", false));

        this.parent.blocks.node.on("mousemove", () => {
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