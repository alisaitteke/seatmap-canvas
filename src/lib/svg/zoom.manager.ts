/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import {mouse as d3Mouse, event as d3Event} from 'd3-selection'
import {zoom as d3Zoom} from 'd3-zoom'


import {SeatMapCanvas} from "../canvas.index";
import {EventType, ZoomLevel} from "../enums/global";
import SeatModel from "../models/seat.model";
import BlockModel from "../models/block.model";
import LabelModel from "../models/label.model";

interface ZoomCoordinate {
    x: number,
    y: number,
    k: number
}

export interface ZoomLevelObject {
    level: string,
    values: {
        x: number,
        y: number,
        k: number
    }
}

export default class ZoomManager {

    public zoomTypes: any = {
        normal: null,
        animated: null,
        fastAnimated: null
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
    public minZoom: number | null = null;
    public zoomLevel: ZoomLevel;


    constructor(private _self: SeatMapCanvas) {
        this.activeBlocks = [];
        this.zoomLevel = ZoomLevel.VENUE;
        this.dispatchZoomEvent();
    }

    public init() {

        console.log('zoom init')
        this.calculateZoomLevels();
        this.zoomInit();
        // this._self.eventManager.addEventListener(EventType.UPDATE_BLOCK, (blocks: Array<BlockModel>) => {
        //     this.calculateZoomLevels(blocks);
        // })

        this._self.eventManager.addEventListener(EventType.KEYDOWN_SVG, (e: any) => {
            if (e.which == 17 || e.which === 91) {
                this._self.eventManager.dispatch(EventType.MULTI_SELECT_ENABLE, e);
                d3Event.preventDefault();
                this.zoomDisable();
            }
        });
        this._self.eventManager.addEventListener(EventType.KEYUP_SVG, (e: any) => {
            this._self.eventManager.dispatch(EventType.MULTI_SELECT_DISABLE, e);
            d3Event.preventDefault();
            this.zoomEnable();
        });

    }

    zoomInit() {
        console.info('zoomInit')
        this.zoomTypes.normal = d3Zoom()
            .scaleExtent([this._self.config.min_zoom, this._self.config.max_zoom])
            .on("end", this.zoomEnd(this))
            .on("zoom", this.zoomHand(this));

        this.zoomTypes.animated = d3Zoom()
            .scaleExtent([this._self.config.min_zoom, this._self.config.max_zoom])
            .on("end", this.animatedZoomEnd(this))
            .on("zoom", this.zoomHandAnimated(this));

        this.zoomTypes.fastAnimated = d3Zoom()
            .scaleExtent([this._self.config.min_zoom, this._self.config.max_zoom])
            .on("end", this.animatedFastZoomEnd(this))
            .on("zoom", this.zoomHandFastAnimated(this));

        this._self.svg.node.call(this.zoomTypes.normal);
    }

    zoomEnd(_self: this): any {
        console.info('zoomEnd')
        return function () {
            let x = d3Event.transform.x;
            let y = d3Event.transform.y;
            let k = d3Event.transform.k;
            _self._self.svg.stage.node.interrupt().attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            _self.calculateActiveBlocks();
            _self.calculateZoomLevel(k);
            // _self.canvasScopeHandler();
        }
    }

    animatedZoomEnd(_self: this): any {
        console.info('animatedZoomEnd')
        return function () {
            let x = d3Event.transform.x;
            let y = d3Event.transform.y;
            let k = d3Event.transform.k;
            _self._self.svg.stage.node.interrupt().transition().duration(_self._self.config.animation_speed).attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            _self.calculateActiveBlocks();
            _self.calculateZoomLevel(k);
        }
    }

    animatedFastZoomEnd(_self: this): any {
        console.info('animatedFastZoomEnd')
        return function () {
            let x = d3Event.transform.x;
            let y = d3Event.transform.y;
            let k = d3Event.transform.k;
            _self._self.svg.stage.node.interrupt().transition().duration(_self._self.config.animation_speed / 2).attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            _self.calculateActiveBlocks();
            _self.calculateZoomLevel(k);
        }
    }

    zoomHand(_self: this): any {
        console.info('zoomHand')
        return function () {
            let x = d3Event.transform.x;
            let y = d3Event.transform.y;
            let k = d3Event.transform.k;
            _self._self.svg.stage.node.interrupt().attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            _self.calculateZoomLevel(k);
        }
    }

    zoomHandAnimated(_self: this): any {
        console.info('zoomHandAnimated')
        return function () {
            let x = d3Event.transform.x;
            let y = d3Event.transform.y;
            let k = d3Event.transform.k;

            _self._self.svg.stage.node.interrupt().transition().duration(_self._self.config.animation_speed).attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            //_self.calculateZoomLevel(k);
        }
    }

    zoomHandFastAnimated(_self: this): any {
        console.info('zoomHandFastAnimated')
        return function () {
            let x = d3Event.transform.x;
            let y = d3Event.transform.y;
            let k = d3Event.transform.k;

            _self._self.svg.stage.node.interrupt().transition().duration(_self._self.config.animation_speed / 2).attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            //_self.calculateZoomLevel(k);
        }
    }

    calculateZoomLevel(k: number) {
        console.info('calculateZoomLevel')
        let _levels = {
            seat: this._self.config.max_zoom - 0.2,
            block: this.zoomLevels.BLOCK.k,
            venue: this.zoomLevels.VENUE.k
        };

        let _zoomLevel: ZoomLevel | null = null;

        let blocks_count = this._self.data.getBlocks().length;

        if (k >= _levels.seat) {
            _zoomLevel = ZoomLevel.SEAT;

        } else if (k >= _levels.block) {
            _zoomLevel = ZoomLevel.BLOCK;

        } else if (k >= _levels.venue && blocks_count > 1) {
            _zoomLevel = ZoomLevel.VENUE;
        }

        if (_zoomLevel !== this.zoomLevel) {
            this.zoomLevel = _zoomLevel as ZoomLevel;
            this.dispatchZoomEvent();
        }
    }

    canvasScopeHandler() {
        if (this._self.config.canvas_stageout_control === false) return;
        let _blocks_values = this._self.svg.stage.blocks.node.node().getBoundingClientRect();
        let _svg_values = this._self.svg.node.node().getBoundingClientRect();

        if (this.zoomLevel === ZoomLevel.VENUE ||
            (this.zoomLevel === ZoomLevel.BLOCK && this._self.data.getBlocks().length === 1) ||
            (this.zoomLevel == ZoomLevel.SEAT && this.zoomLevels.BLOCK && this.zoomLevels.BLOCK.k === this._self.config.max_zoom)) {

            if (_blocks_values.left < _svg_values.left ||
                _blocks_values.top < _svg_values.top ||
                _blocks_values.right > _svg_values.right ||
                _blocks_values.bottom > _svg_values.bottom) {
                this.zoomToVenue(true, true);
            }
        }
    }

    public calculateZoomLevels(blocks: Array<BlockModel> = this._self.data.getBlocks()): this {

        console.info('calculateZoomLevels')
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

        if (_wm.width && _wm.height) {
            this.scale.x = (_wm.width / _stage.width) - ((_wm.width / _stage.width) / 5);
            this.scale.y = (_wm.height / _stage.height) - ((_wm.height / _stage.height) / 5);
        }

        this.scale.k = (this.scale.x < this.scale.y) ? this.scale.x : this.scale.y;
        this.minZoom = this.scale.k < 1 ? this.scale.k : 1;

        this.scale.k = this.scale.k > this._self.config.max_zoom ? this._self.config.max_zoom : this.scale.k;


        let x = _stage.width / 2;
        let y = _stage.height / 2;
        this.zoomLevels.VENUE = {
            x: x,
            y: y,
            k: this.scale.k - 0.01
        };


        if (this._self.data.getBlocks().length === 1 && this.zoomLevels.BLOCK) {
            this.zoomLevels.VENUE = this.zoomLevels.BLOCK;
        }

        return this;
    }

    public calculateActiveBlocks(blocks: Array<BlockModel> = this._self.data.getBlocks()): Array<BlockModel> {
        this.activeBlocks = [];


        blocks.map((block: BlockModel) => {
            let _block_item = this._self.svg.stage.blocks.getBlock(block.id);

            if (_block_item) {
                let bound = _block_item.node.node().getBoundingClientRect();
                let bbox = _block_item.node.node().getBBox();

                block.bbox = bbox;

                if (this._self.windowManager.width && this._self.windowManager.height) {
                    let x = (this._self.windowManager.width / bbox.width) - ((this._self.windowManager.width / bbox.width) / 3);
                    let y = (this._self.windowManager.height / bbox.height) - ((this._self.windowManager.height / bbox.height) / 3);
                    let k = (x < y) ? x : y;

                    x += bbox.x + (bbox.width / 2);
                    y += bbox.y + (bbox.height / 2);

                    k = k > this._self.config.max_zoom ? this._self.config.max_zoom : k;

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
                }
            }


        });

        this.activeBlocks = this.activeBlocks.sort((a, b) => b.ratio - a.ratio);
        if (this.activeBlocks.length) {
            let _activeBlock: BlockModel = this.activeBlocks[0].block.item;
            this.zoomLevels.BLOCK = _activeBlock.zoom_bbox;
        }

        return this.activeBlocks;
    }

    public zoomToSelection(animation: boolean = true) {

        let cor = d3Mouse(this._self.svg.stage.blocks.node.node());
        let x = cor[0];
        let y = cor[1];
        let k = this._self.config.max_zoom;

        this.zoomLevels.SEAT = {
            x: x,
            y: y,
            k: k
        };

        if (animation) {
            this._self.svg.node.interrupt().call(this.zoomTypes.animated.translateTo, x, y).call(this.zoomTypes.animated.scaleTo, k);
        } else {
            this._self.svg.node.interrupt().call(this.zoomTypes.normal.translateTo, x, y).call(this.zoomTypes.normal.scaleTo, k);
        }
        this.zoomLevel = ZoomLevel.SEAT;
        this.dispatchZoomEvent();

    }

    public zoomToBlock(id: string | number, animation: boolean = true, fastAnimated: boolean = false) {
        let _block = this._self.data.getBlocks().find((block) => block.id.toString() === id.toString());
        if (_block) {
            if (animation) {
                if (fastAnimated) {
                    this._self.svg.node.interrupt().call(this.zoomTypes.fastAnimated.translateTo, _block.zoom_bbox.x, _block.zoom_bbox.y).call(this.zoomTypes.fastAnimated.scaleTo, _block.zoom_bbox.k);
                } else {
                    this._self.svg.node.interrupt().call(this.zoomTypes.animated.translateTo, _block.zoom_bbox.x, _block.zoom_bbox.y).call(this.zoomTypes.animated.scaleTo, _block.zoom_bbox.k);
                }
            } else {
                this._self.svg.node.interrupt().call(this.zoomTypes.normal.translateTo, _block.zoom_bbox.x, _block.zoom_bbox.y).call(this.zoomTypes.normal.scaleTo, _block.zoom_bbox.k);
            }

            // let gap = 0.2;

            // if (_block.zoom_bbox.k > this._self.config.max_zoom + gap || _block.zoom_bbox.k < this._self.config.max_zoom - gap) {
            if (_block.zoom_bbox.k === this._self.config.max_zoom) {
                this.zoomLevel = ZoomLevel.SEAT;
            } else {
                this.zoomLevel = ZoomLevel.BLOCK;
            }

            this.dispatchZoomEvent();
        }
    }

    public zoomToVenue(animation: boolean = true, fastAnimated: boolean = false) {

        console.info('zoomToVenue')
        let x = this.zoomLevels.VENUE.x;
        let y = this.zoomLevels.VENUE.y;
        let k = this.zoomLevels.VENUE.k;

        this._self.config.min_zoom = k;
        this.zoomInit();


        // single mode
        if (this._self.data.getBlocks().length === 1) {
            let _block = this._self.data.getBlocks()[0];
            this.zoomToBlock(_block.id, animation, fastAnimated);
            return;
        }


        if (x && y && k) {
            if (animation) {
                if (fastAnimated) {
                    this._self.svg.node.interrupt().call(this.zoomTypes.fastAnimated.translateTo, x, y).call(this.zoomTypes.fastAnimated.scaleTo, k);
                } else {
                    this._self.svg.node.interrupt().call(this.zoomTypes.animated.translateTo, x, y).call(this.zoomTypes.animated.scaleTo, k);
                }

            } else {
                this._self.svg.node.interrupt().call(this.zoomTypes.normal.translateTo, x, y).call(this.zoomTypes.normal.scaleTo, k);
            }
            this.zoomLevel = ZoomLevel.VENUE;
            this.dispatchZoomEvent();
        }

    }


    public zoomEnable(): this {
        this._self.svg.node.call(this.zoomTypes.normal);
        //this._self.svg.node.on('.zoom', null);
        return this;
    }

    public zoomDisable(): this {
        this._self.svg.node.on('.zoom', null);
        return this;
    }

    public getZoomLevelValues(level: ZoomLevel) {
        return this.zoomLevels[level];
    }

    public getActiveZoom() {
        return this.zoomLevels[this.zoomLevel];
    }

    private dispatchZoomEvent() {
        this._self.eventManager.dispatch(EventType.ZOOM_LEVEL_CHANGE, {
            level: this.zoomLevel,
            values: this.getZoomLevelValues(this.zoomLevel)
        });
    }
}