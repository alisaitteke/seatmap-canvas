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

    constructor(public parent: BlocksManager, public item: BlockModel) {
        super(parent);
        this.attr("id", item.id);
        this.global.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, (levelObject: any) => {
           if(levelObject.level===ZoomLevel.VENUE){
               this.mask.blockLevelMask.show();
               this.mask.seatLevelMask.show();
           }else if(levelObject.level===ZoomLevel.BLOCK){
               this.mask.blockLevelMask.hide();
               this.mask.seatLevelMask.show();
           }else if(levelObject.level===ZoomLevel.SEAT){
               this.mask.blockLevelMask.hide();
               this.mask.seatLevelMask.hide();
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


        // add Block Info container
        this.info = new BlockInfo(this, this.item);
        this.addChild(this.info);

        // update childs
        this.updateChilds();

        return this;
    }


}