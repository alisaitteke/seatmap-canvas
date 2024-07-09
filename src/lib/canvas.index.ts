/*
 * canvas.index.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */
import "../scss/style.scss";
import {event as d3Event, select as d3Select} from 'd3-selection'
import Svg from "@svg/svg.index";
import SeatMapDevTools from "@/dev.tools";
import DataModel from "@model/data.model";

import BlockModel from "@model/block.model";
import DefaultsModel from "@model/defaults.model";
import {GlobalModel} from "@model/global.model";

import ZoomManager from "@svg/zoom.manager";
import EventManager from "@svg/event.manager";
import {EventType, ZoomLevel} from "@enum/global";
import WindowManager from "@/window.manager";
import {ParserBase} from "@/converters/parser.base";
import {ParserEnum} from "@enum/parser.enum";
import {PretixParser} from "@/converters/pretix/pretix.parser";


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
    public parsers: { [name: string]: ParserBase } = {};

    constructor(public container_selector: any, _config: DefaultsModel) {
        let _self = this;
        this.config = new DefaultsModel(_config);
        this.eventManager = new EventManager(this);
        this.addEventListener = this.eventManager.addEventListener;
        this.node = d3Select(container_selector);
        this.windowManager = new WindowManager(this);
        this.zoomManager = new ZoomManager(this);

        this.data = new DataModel(this);

        this.registerConverters()

        this.global = {
            eventManager: this.eventManager,
            windowManager: this.windowManager,
            config: this.config,
            data: this.data,
            zoomManager: this.zoomManager,
            root: this,
            svg: this.svg,
            multi_select: false,
            best_available: false
        };
        d3Select(window).on("keydown.dispatch", function (a, b, c) {
            _self.eventManager.dispatch(EventType.KEYDOWN_SVG, d3Event);
        });
        d3Select(window).on("keyup.dispatch", function (a, b, c) {
            _self.eventManager.dispatch(EventType.KEYUP_SVG, d3Event);
        });

        this.dev = new SeatMapDevTools(this);
        this.svg = new Svg(this);

        this.svg.domGenerate(this.node);
        this.svg.update();

        this.windowManager.resizeHandler();
        this.zoomManager.init();

        this.eventManager.addEventListener(EventType.CLICK_ZOOM_OUT, () => this.zoomManager.zoomToVenue());
        this.eventManager.addEventListener(EventType.MULTI_SELECT_ENABLE, () => {
            this.global.multi_select = true;
            this.node.classed("multi-select-enable", true);
        });
        this.eventManager.addEventListener(EventType.MULTI_SELECT_DISABLE, () => {
            this.global.multi_select = false;
            this.node.classed("multi-select-enable", false);
        });
        this.eventManager.addEventListener(EventType.BEST_AVAILABLE_ENABLE, () => {
            this.global.best_available = true;
        });
        this.eventManager.addEventListener(EventType.MBEST_AVAILABLE_DISABLE, () => {
            this.global.best_available = false;
        });

        // Zoomout button show/hide for zoom level
        this.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, (zoom_level: any) => {
            if (zoom_level.level === ZoomLevel.VENUE) {
                d3Select(this.config.zoom_out_button).style("display", "none");
            } else if (zoom_level.level === ZoomLevel.BLOCK) {
                d3Select(this.config.zoom_out_button).style("display", "none");
            } else if (zoom_level.level === ZoomLevel.SEAT) {
                d3Select(this.config.zoom_out_button).style("display", "block");
            }
        });


        d3Select(this.config.zoom_out_button).on("click", () => {
            this.zoomManager.zoomToVenue(true);
        });


        // update block data change trigger
        this.eventManager.addEventListener(EventType.ADD_BLOCK, (addedBlocks: Array<BlockModel>) => {
            this.svg.stage.blocks.update();
            this.windowManager.resizeHandler();
            this.zoomManager.calculateZoomLevels(this.data.getBlocks());
            this.zoomManager.calculateActiveBlocks(this.data.getBlocks());
            this.windowManager.resizeHandler();
            this.zoomManager.zoomToVenue(false);
        });

        // Ready
        this.eventManager.dispatch(EventType.READY, this);
    }

    registerConverters() {
        this.parsers['pretix'] = new PretixParser();
    }
}
