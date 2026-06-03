/*
 * canvas.index.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */
import "../scss/style.scss";
import {select as d3Select} from 'd3-selection'
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
        d3Select(window).on("keydown.dispatch", function (event: any) {
            _self.eventManager.dispatch(EventType.KEYDOWN_SVG, event);
        });
        d3Select(window).on("keyup.dispatch", function (event: any) {
            _self.eventManager.dispatch(EventType.KEYUP_SVG, event);
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


        // update block data change trigger. Rebuilds every floor subtree, then
        // lets the floors layer pick + frame the initial view (single floor,
        // pinned `active_floor`, or the stacked all-floors view).
        this.eventManager.addEventListener(EventType.ADD_BLOCK, (addedBlocks: Array<BlockModel>) => {
            this.svg.stage.floors.update();
            this.svg.stage.searchCircle.update();
            this.windowManager.resizeHandler();
            this.svg.stage.floors.initView();
        });

        // re-render the active floor's chart-level objects layer when
        // objects/focal change (e.g. an incremental object update).
        this.eventManager.addEventListener(EventType.UPDATE_OBJECT, () => {
            this.svg.stage.objectsBackground.update();
            this.svg.stage.objectsForeground.update();
            this.svg.stage.focal.update();
        });

        // Ready
        this.eventManager.dispatch(EventType.READY, this);
    }

    registerConverters() {
        this.parsers['pretix'] = new PretixParser();
    }

    /* ------------------------------------------------------------------ *
     * Multi-floor public API. No-ops on single-floor charts (other than
     * reporting a single floor), so consumers can always call them safely.
     * ------------------------------------------------------------------ */

    /** Enter a floor by its public id ({@link FloorData.id}). */
    public goToFloor(floorId: string): this {
        if (this.config.lock_active_floor) {
            return this;
        }
        const index = this.data.floorIndexById(String(floorId));
        if (index < 0) {
            console.warn(`[seatmap-canvas] goToFloor: floor '${floorId}' not found`);
            return this;
        }
        this.svg.stage.floors.selectFloor(index);
        return this;
    }

    /** Leave the selected floor for the stacked all-floors view. */
    public goToAllFloorsView(): this {
        if (this.config.lock_active_floor) {
            return this;
        }
        this.svg.stage.floors.goToAllFloors();
        return this;
    }

    /** All floors as `{ index, id, display_name }` (single entry for flat charts). */
    public getFloors(): Array<{ index: number; id: string; display_name: string }> {
        return this.data.getFloors().map((floor, index) => ({
            index,
            id: floor.id,
            display_name: floor.label(),
        }));
    }

    /** The active floor, or `{ index: -1 }` for the all-floors view. */
    public getCurrentFloor(): { index: number; id: string | null; display_name: string | null } {
        const idx = this.data.getCurrentFloorIndex();
        const floor = idx >= 0 ? this.data.getFloors()[idx] : null;
        return {
            index: idx,
            id: floor ? floor.id : null,
            display_name: floor ? floor.label() : null,
        };
    }
}

// Public geometry contract — mirrored by seatmap-studio and asserted by its
// sync-guard test, so the two repos cannot silently drift.
export {
    CHAIR_WIDTH,
    CHAIR_STROKE_WIDTH,
    CHAIR_RADIUS,
    CHAIR_SPACING,
    ROW_SPACING,
    SPACE_PER_CHAIR,
    SEAT_SELECTED_STROKE_WIDTH,
    GEOMETRY_DEFAULTS,
} from "@model/geometry.constants";
export type {GeometryDefaults} from "@model/geometry.constants";

// Theme palette so consumers can resolve the same chrome colors as the editor.
export {LIGHT_PALETTE, DARK_PALETTE, getPalette} from "@model/theme.palette";
export type {CanvasTheme, CanvasPalette} from "@model/theme.palette";

// Chart-level object types (source of truth) so the studio converter and other
// consumers can build `objects[]` against the same contract the renderer reads.
export type {
    Point2D,
    ObjectType,
    ObjectDataBase,
    SectionObjectData,
    GaObjectData,
    TableObjectData,
    BoothObjectData,
    ShapeObjectData,
    IconObjectData,
    TextObjectData,
    ObjectData,
    FocalPointData,
    CanvasChartData,
    FloorData,
    MultiFloorView,
} from "@model/object.model";
