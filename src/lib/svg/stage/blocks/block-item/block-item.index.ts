/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import BlocksManager from "../blocks.index";
import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";
import BlockModel from "../../../../models/block.model";
import Seats from "./block-item.seats.index";
import BlockInfo from "./block-item.info.index";
import BlockBounds from "./block-item.bounds";
import {EventType, ZoomLevel} from "../../../../enums/global";
import BlockMask from "./block-item.mask";
import Labels from "./block-item.labels.index";


@dom({
    tag: "g",
    class: "block",
    autoGenerate: false
})
export default class Block extends SvgBase {


    public seats: Seats;
    public labels: Labels;
    public info: BlockInfo;
    public mask: BlockMask;
    public bounds: BlockBounds;

    public center_position: any = {
        x: null,
        y: null
    };
    public top_position: any = {
        x: null,
        y: null
    };

    constructor(public parent: BlocksManager, public item: BlockModel) {
        super(parent);
        this.attr("id", item.id);
        this.attr("opacity", 0);
        this.global.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, (levelObject: any) => {
            if (levelObject.level === ZoomLevel.VENUE) {
                this.mask.blockLevelMask.show();
                this.mask.seatLevelMask.show();
                this.infosToCenter();
            } else if (levelObject.level === ZoomLevel.BLOCK) {
                this.mask.blockLevelMask.hide();
                this.mask.seatLevelMask.show();
                this.infosToTop();
            } else if (levelObject.level === ZoomLevel.SEAT) {
                this.mask.blockLevelMask.hide();
                this.mask.seatLevelMask.hide();
                this.infosToTop();
            }
        });
        return this;
    }

    public update() {

        // add Block Bounds container
        this.bounds = new BlockBounds(this, this.item);
        this.addChild(this.bounds);


        // add Seat container
        this.seats = new Seats(this, this.item);
        this.addChild(this.seats);


        // add Labels container
        this.labels = new Labels(this, this.item);
        this.addChild(this.labels);


        // add Block Info container
        this.mask = new BlockMask(this, this.item);
        this.addChild(this.mask);


        this.info = new BlockInfo(this, this.item);
        this.addChild(this.info);


        this.center_position.x = ((this.item.bounds[1][0] - this.item.bounds[2][0]) / 2) + this.item.bounds[2][0];
        this.center_position.y = ((this.item.bounds[0][1] - this.item.bounds[1][1]) / 2) + this.item.bounds[1][1];

        this.top_position.x = this.center_position.x;
        this.top_position.y = (this.item.bounds[1][1] - 50);


        // update childs
        this.updateChilds();


        this.infosToCenter();

        this.node.interrupt().transition().duration(this.global.config.animation_speed).attr("opacity", 1);


        return this;
    }

    public infosToTop() {
        if (this.info.node && this.top_position.x)
            this.info.node.interrupt().transition().duration(this.global.config.animation_speed).attr("transform", "translate(" + this.top_position.x + "," + this.top_position.y + ")").attr("opacity", 1).attr("font-size", 14).attr("fill","#000000");
    }

    public infosToCenter() {
        if (this.info.node && this.center_position.x)
            this.info.node.interrupt().transition().duration(this.global.config.animation_speed).attr("transform", "translate(" + this.center_position.x + "," + this.center_position.y + ")").attr("opacity", 1).attr("font-size", 28).attr("fill","#ffffff");

    }


}