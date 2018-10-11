/// <reference path="models/index.ts" />
/*
 * index.ts
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import "../scss/style.scss";
import * as d3 from 'd3';
import Svg from "./svg/svg.index";
import SeatMapDevTools from "./dev.tools";
import DataModel from "./models/data.model";

import BlockModel from "./models/block.model";
import DefaultsModel from "./models/defaults.model";
import {GlobalModel} from "./models/global.model";
import Block from "./svg/stage/blocks/block-item/block-item.index";

import ZoomManager from "./svg/zoom.manager";
import EventManager from "./svg/event.manager";
import {EventType, ZoomLevel} from "./enums/global";
import WindowManager from "./window.manager";


declare const window: any;


export class SeatMapCanvas {

    public node: any = null;
    public svg: Svg;
    public dev: SeatMapDevTools;
    public data: DataModel;
    public config: DefaultsModel;
    public global: GlobalModel;
    public windowManager: WindowManager;
    public zoomManager: ZoomManager;
    public eventManager: EventManager;
    public addEventListener: any;


    constructor(public container_selector: any, _config: any = {}) {
        this.config = new DefaultsModel(_config);
        this.eventManager = new EventManager(this);
        this.addEventListener = this.eventManager.addEventListener;
        this.node = d3.select(container_selector);
        this.windowManager = new WindowManager(this);
        this.zoomManager = new ZoomManager(this);


        this.data = new DataModel(this);

        this.global = {
            eventManager: this.eventManager,
            windowManager: this.windowManager,
            config: this.config,
            data: this.data,
            zoomManager: this.zoomManager,
            root: this,
            svg: this.svg
        };


        this.dev = new SeatMapDevTools(this);
        this.svg = new Svg(this);

        this.svg.domGenerate(this.node);
        this.svg.update();

        this.windowManager.resizeHandler();
        this.zoomManager.init();

        // update block data change trigger
        this.eventManager.addEventListener(EventType.ADD_BLOCK, (addedBlocks: Array<BlockModel>) => {
            //let blocks = this.data.getBlocks();
            this.svg.stage.blocks.update();
            this.zoomManager.calculateZoomLevels(this.data.getBlocks());
            console.log("added block",addedBlocks)
            //this.windowManager.resizeHandler();
            this.zoomManager.zoomToVenue(false);
        });

        // this.eventManager.addEventListener(EventType.CLICK_BLOCK, (_block: Block) => {
        //     console.log(_block)
        //     //this.svg.node.interrupt().call(this.svg.zoomTypes.animated.translateTo, _block.item.zoom_bbox.x, _block.item.zoom_bbox.y).call(this.svg.zoomTypes.animated.scaleTo, _block.item.zoom_bbox.a);
        // });



        // setTimeout(()=>{
        //     this.zoomManager.zoom(ZoomLevel.VENUE);
        // },2500)


    }


}

window['SeatMapCanvas'] = SeatMapCanvas;