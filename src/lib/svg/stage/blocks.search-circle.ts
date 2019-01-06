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
    public is_enable: boolean = true;

    constructor(public parent: Stage) {
        super(parent);
        this.global.eventManager.addEventListener(EventType.MOUSE_MOVE, (mouse: any) => {
            if (this.global.zoomManager.zoomLevel === ZoomLevel.BLOCK && this.is_enable) {
                this.node.attr("transform", "translate(" + mouse + ")");
            }
        });

        this.global.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, (zoom_level: any) => {
            if (zoom_level.level === ZoomLevel.VENUE || zoom_level.level === ZoomLevel.SEAT) {
                this.node.classed("show", false);
            }
        });


        this.global.eventManager.addEventListener(EventType.MULTI_SELECT_ENABLE, () => {
            this.disable();
        });
        this.global.eventManager.addEventListener(EventType.MULTI_SELECT_DISABLE, () => {
            this.enable();
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

    public enable(): this {
        this.is_enable = true;
        this.node.style("display", "block");
        return this;
    }

    public disable(): this {
        this.is_enable = false;
        this.node.style("display", "none");
        return this;
    }
}