/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import {SeatMapCanvas} from "../canvas.index";
import * as d3 from "d3";
import {EventType, ZoomLevel} from "../enums/global";
import SeatModel from "../models/seat.model";
import BlockModel from "../models/block.model";
import LabelModel from "../models/label.model";

interface ZoomCoordinate {
    x: number,
    y: number,
    k: number
}

export default class ZoomManager {

    public zoomTypes: any = {
        normal: null,
        animated: null
    };

    public scale: any = {
        x: null,
        y: null,
        k: null
    };

    private zoomLevels: any = {
        VENUE: null,
        BLOCK: null,
        SEAT: null
    };

    public activeBlocks: Array<any>;
    public minZoom: number = null;
    public zoomLevel: ZoomLevel;

    constructor(private _self: SeatMapCanvas) {

        this.activeBlocks = [];
        this.zoomLevel = ZoomLevel.VENUE;
    }

    public init() {
        this.zoomTypes.normal = d3.zoom()
            .scaleExtent([this._self.config.min_zoom, this._self.config.max_zoom])
            .on("end", this.zoomEnd(this))
            .on("zoom", this.zoomHand(this));

        this.zoomTypes.animated = d3.zoom()
            .scaleExtent([this._self.config.min_zoom, this._self.config.max_zoom])
            .on("end", this.animatedZoomEnd(this))
            .on("zoom", this.zoomHandAnimated(this));

        this._self.svg.node.call(this.zoomTypes.normal);

        // this._self.eventManager.addEventListener(EventType.UPDATE_BLOCK, (blocks: Array<BlockModel>) => {
        //     this.calculateZoomLevels(blocks);
        // })
    }

    zoomEnd(_self: this): any {
        return function () {
            let x = d3.event.transform.x;
            let y = d3.event.transform.y;
            let k = d3.event.transform.k;
            _self._self.svg.stage.node.interrupt().attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            _self.calculateActiveBlocks();
        }
    }

    animatedZoomEnd(_self: this): any {
        return function () {
            let x = d3.event.transform.x;
            let y = d3.event.transform.y;
            let k = d3.event.transform.k;
            _self._self.svg.stage.node.interrupt().transition().duration(_self._self.config.animation_speed).attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            _self.calculateActiveBlocks();
        }
    }

    zoomHand(_self: this): any {
        return function () {
            let x = d3.event.transform.x;
            let y = d3.event.transform.y;
            let k = d3.event.transform.k;
            _self._self.svg.stage.node.interrupt().attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
        }
    }

    zoomHandAnimated(_self: this): any {
        //console.log(_self._self.config)
        return function () {
            let x = d3.event.transform.x;
            let y = d3.event.transform.y;
            let k = d3.event.transform.k;

            _self._self.svg.stage.node.interrupt().transition().duration(_self._self.config.animation_speed).attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
        }
    }

    public calculateZoomLevels(blocks: Array<BlockModel>): this {

        let _wm = this._self.windowManager;
        let _stage = _wm.stage;


        blocks.map((block: BlockModel) => {

            block.seats.map((seat: SeatModel) => {
                if (seat.x < block.x) block.x = seat.x;
                if (seat.y < block.y) block.y = seat.y;

                if (seat.x > _stage.width) _stage.width = seat.x;
                if (seat.y > _stage.height) _stage.height = seat.y;

                //this.total_seat_count++;
            });

            block.labels.map((label: LabelModel) => {
                if (label.x < block.x) block.x = label.x;
                if (label.y < block.y) block.y = label.y;

                if (label.x > _stage.width) _stage.width = label.x;
                if (label.y > _stage.height) _stage.height = label.y;
            });

        });

        this.scale.x = (_wm.width / _stage.width) - ((_wm.width / _stage.width) / 2);
        this.scale.y = (_wm.height / _stage.height) - ((_wm.height / _stage.height) / 2);
        this.scale.k = (this.scale.x < this.scale.y) ? this.scale.x : this.scale.y;
        this.minZoom = this.scale.k < 1 ? this.scale.k : 1;


        let x = _stage.width / 2;
        let y = _stage.height / 2;
        this.zoomLevels.VENUE = {
            x: x,
            y: y,
            k: this.scale.k
        };

        return this;
    }

    public calculateActiveBlocks(blocks: Array<BlockModel> = this._self.data.getBlocks()): Array<BlockModel> {
        this.activeBlocks = [];


        blocks.map((block: BlockModel) => {
            let _block_item = this._self.svg.stage.blocks.getBlock(block.id);


            let bound = _block_item.node.node().getBoundingClientRect();
            let bbox = _block_item.node.node().getBBox();

            block.bbox = bbox;

            let x = (this._self.windowManager.width / bbox.width) - ((this._self.windowManager.width / bbox.width) / 3);
            let y = (this._self.windowManager.height / bbox.height) - ((this._self.windowManager.height / bbox.height) / 3);
            let k = (x < y) ? x : y;

            x += bbox.x + (bbox.width / 2);
            y += bbox.y + (bbox.height / 2);

            block.zoom_bbox = {
                x: x,
                y: y,
                k: k
            };


            let x_overlap = Math.max(0, Math.min(this._self.windowManager.width, bound.right) - Math.max(0, bound.left));
            let y_overlap = Math.max(0, Math.min(this._self.windowManager.height, bound.bottom) - Math.max(0, bound.top));
            let overlapArea = (x_overlap * y_overlap);
            let allOverlapArea = this._self.windowManager.width * this._self.windowManager.height;
            let ratio: number = (overlapArea * 100) / allOverlapArea;

            if (overlapArea > 0) {
                this.activeBlocks.push({
                    block: _block_item,
                    ratio: Number(ratio.toFixed(2))
                });
            }

            this.activeBlocks = this.activeBlocks.sort((a, b) => b.ratio - a.ratio);
            // if (this.activeBlocks.length > 0) {
            //     this.activeBlocks = this.activeBlocks[0];
            // } else {
            //     this.activeBlocks = null;
            // }
        });
        console.log(this.activeBlocks);

        return this.activeBlocks;
    }

    public zoomToBlock(id: string | number, animation: boolean = true) {
        let _block = this._self.data.getBlocks().find((block: BlockModel) => block.id === id);
        console.log(_block);
        if (_block) {
            if (animation) {
                this._self.svg.node.interrupt().call(this.zoomTypes.animated.translateTo, _block.zoom_bbox.x, _block.zoom_bbox.y).call(this.zoomTypes.animated.scaleTo, _block.zoom_bbox.k);
            } else {
                this._self.svg.node.svg.interrupt().call(this.zoomTypes.normal.translateTo, _block.zoom_bbox.x, _block.zoom_bbox.y).call(this.zoomTypes.normal.scaleTo, _block.zoom_bbox.k);
            }
            this.zoomLevel = ZoomLevel.BLOCK;
        }
    }

    public zoomToVenue(animation: boolean = true) {
        console.log("zoom hand");

        let x = this.zoomLevels.VENUE.x;
        let y = this.zoomLevels.VENUE.y;
        let k = this.zoomLevels.VENUE.k;
        if (x && y && k) {
            if (animation) {
                this._self.svg.node.interrupt().call(this.zoomTypes.animated.translateTo, x, y).call(this.zoomTypes.animated.scaleTo, k);
            } else {
                this._self.svg.node.interrupt().call(this.zoomTypes.normal.translateTo, x, y).call(this.zoomTypes.normal.scaleTo, k);
            }
            this._self.eventManager.dispatch(EventType.ZOOM_LEVEL_CHANGE, this.zoomLevel);
            this.zoomLevel = ZoomLevel.VENUE;
        }

    }
}