/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import BlockModel from "@model/block.model";
import {EventType} from "@enum/global";
import EventManager from "@svg/event.manager";
import {SeatMapCanvas} from "@/canvas.index";
import SeatModel from "@model/seat.model";
import {ParserEnum} from "@enum/parser.enum";
import {PretixModel} from "@/converters/pretix/pretix.model";
import {CanvasChartData, ObjectData, FocalPointData, FloorData, MultiFloorView} from "@model/object.model";
import FloorModel from "@model/floor.model";

interface BlockQuery {
    id?: number | string
}

/** Sentinel {@link DataModel.currentFloor} value for the all-floors (picking) view. */
export const ALL_FLOORS = -1;

/** Hard cap on floors, matching the legacy designer (`SubChartFloors.MAX_FLOORS`). */
export const MAX_FLOORS = 9;

export default class DataModel {

    /**
     * Floors of the chart. Always holds at least one floor; single-floor charts
     * are a single implicit floor so the render pipeline never special-cases
     * them. Multi-floor charts populate this from `CanvasChartData.floors`.
     */
    floors: Array<FloorModel>;

    /**
     * The selected floor index, or {@link ALL_FLOORS} (`-1`) for the stacked
     * all-floors (picking) view. `0` for single-floor charts.
     */
    currentFloor: number;

    /** Stacked-view layout for multi-floor charts. */
    multiFloorView: MultiFloorView;

    /**
     * Transient pointer telling the data accessors which floor to read while a
     * specific floor's SVG subtree is being (re)built. Outside of a render pass
     * it tracks the effective active floor. See {@link setRenderFloor}.
     */
    private renderFloorIndex: number;


    private eventManager: EventManager;
    public addEventListener: any;

    constructor(private _self: SeatMapCanvas) {
        this.floors = [new FloorModel({id: "1"})];
        this.currentFloor = 0;
        this.renderFloorIndex = 0;
        this.multiFloorView = 'stage';
        this.eventManager = _self.eventManager;
        this.addEventListener = _self.eventManager.addEventListener;
    }

    /* ------------------------------------------------------------------ *
     * Floor-aware accessors. The render components and zoom manager read
     * through these, so pointing `renderFloorIndex` at a floor transparently
     * scopes the whole pipeline to it.
     * ------------------------------------------------------------------ */

    /** The floor currently exposed to the accessors (clamped to a valid index). */
    private renderFloor(): FloorModel {
        const i = Math.max(0, Math.min(this.renderFloorIndex, this.floors.length - 1));
        return this.floors[i];
    }

    /** The effective active floor (the selection, or floor 0 in the all view). */
    private effectiveFloorIndex(): number {
        return this.currentFloor >= 0 ? this.currentFloor : 0;
    }

    /** Active floor's seating blocks (legacy `this.blocks`). */
    public get blocks(): Array<BlockModel> {
        return this.renderFloor().blocks;
    }

    /** Active floor's chart-level objects (legacy `this.objects`). */
    public get objects(): Array<ObjectData> {
        return this.renderFloor().objects;
    }

    /** Active floor's focal point (legacy `this.focalPoint`). */
    public get focalPoint(): FocalPointData | null {
        return this.renderFloor().focalPoint;
    }

    /** Active floor's background image, if any (else `null`). */
    public getBackgroundImage(): string | null {
        return this.renderFloor().backgroundImage;
    }

    /** Scope the accessors to floor `index` while its subtree is rendered. */
    public setRenderFloor(index: number): this {
        this.renderFloorIndex = index;
        return this;
    }

    /** Restore the accessors to the effective active floor after a render pass. */
    public resetRenderFloor(): this {
        this.renderFloorIndex = this.effectiveFloorIndex();
        return this;
    }

    public getFloors(): Array<FloorModel> {
        return this.floors;
    }

    public isMultiFloor(): boolean {
        return this.floors.length > 1;
    }

    public getCurrentFloorIndex(): number {
        return this.currentFloor;
    }

    /** Resolve a floor index from its public id, or `-1` when not found. */
    public floorIndexById(id: string): number {
        return this.floors.findIndex((floor) => floor.id === id);
    }

    /** Select a floor (or {@link ALL_FLOORS}); updates the render scope. */
    public setCurrentFloor(index: number): this {
        this.currentFloor = index;
        this.resetRenderFloor();
        return this;
    }

    /** Every block across every floor (selection/lookup helpers use this). */
    private allBlocks(): Array<BlockModel> {
        return this.floors.reduce<Array<BlockModel>>((acc, floor) => acc.concat(floor.blocks), []);
    }

    /* ------------------------------------------------------------------ *
     * Mutators
     * ------------------------------------------------------------------ */

    /** Build `BlockModel`s from raw data, running the configured parser first. */
    private buildBlocks(block_data: any[] | PretixModel): Array<BlockModel> {
        let raw: any = block_data;
        if (this._self.config.json_model !== ParserEnum.SEATMAP) {
            const parserClass = this._self.parsers[this._self.config.json_model];
            raw = parserClass.parse(block_data as PretixModel);
        }
        return (raw as any[]).map((item: any) => new BlockModel(item));
    }

    public addBlock(block_data: any): this {
        this.renderFloor().blocks.push(new BlockModel(block_data));
        this.eventManager.dispatch(EventType.ADD_BLOCK, [block_data]);
        this.eventManager.dispatch(EventType.UPDATE_BLOCK, this.blocks);
        return this;
    }

    public addBulkBlock(block_data: BlockModel[] | PretixModel): this {
        const built = this.buildBlocks(block_data as any);
        built.forEach((block) => this.renderFloor().blocks.push(block));
        this.eventManager.dispatch(EventType.ADD_BLOCK, [block_data]);
        this.eventManager.dispatch(EventType.UPDATE_BLOCK, this.blocks);
        return this;
    }

    /**
     * Load a full chart. Accepts:
     *  - a `BlockData[]`/`PretixModel` (legacy, seating only),
     *  - a single-floor {@link CanvasChartData} `{ blocks, objects?, focal_point? }`, or
     *  - a multi-floor {@link CanvasChartData} `{ floors[], multi_floor_view? }`.
     *
     * Objects/focal/floors are only honored for the native (`seatmap`) JSON
     * model; a pretix payload is also a non-array object, so the chart branches
     * are gated on the configured parser to avoid mis-reading it.
     */
    public replaceData(block_data: BlockModel[] | PretixModel | CanvasChartData): this {
        this.floors = [];
        // Seed from the consumer config; the chart payload may override it.
        this.multiFloorView = this._self.config.multi_floor_view;

        if (this.isCanvasChart(block_data) && Array.isArray(block_data.floors) && block_data.floors.length) {
            if (block_data.multi_floor_view) {
                this.multiFloorView = block_data.multi_floor_view === 'isometric' ? 'isometric' : 'stage';
            }
            block_data.floors.slice(0, MAX_FLOORS).forEach((floor: FloorData, index: number) => {
                this.floors.push(new FloorModel({
                    id: floor.id != null ? String(floor.id) : String(index + 1),
                    displayName: floor.display_name ?? null,
                    blocks: this.buildBlocks(floor.blocks || []),
                    objects: floor.objects || [],
                    focalPoint: floor.focal_point || null,
                    backgroundImage: floor.background_image ?? null,
                }));
            });
            // Multi-floor charts open in the stacked picking view; a single
            // floor (collapsed multi-floor) opens directly on that floor.
            this.currentFloor = this.floors.length > 1 ? ALL_FLOORS : 0;
        } else if (this.isCanvasChart(block_data)) {
            this.floors.push(new FloorModel({
                id: "1",
                blocks: this.buildBlocks(block_data.blocks || []),
                objects: block_data.objects || [],
                focalPoint: block_data.focal_point || null,
            }));
            this.currentFloor = 0;
        } else {
            this.floors.push(new FloorModel({
                id: "1",
                blocks: this.buildBlocks(block_data as BlockModel[] | PretixModel),
            }));
            this.currentFloor = 0;
        }

        this.resetRenderFloor();

        // A single rebuild signal: the floors layer (re)builds every floor's
        // subtree, then the chart-level object/focal layers refresh.
        this.eventManager.dispatch(EventType.ADD_BLOCK, [block_data]);
        this.eventManager.dispatch(EventType.UPDATE_BLOCK, this.blocks);
        this.eventManager.dispatch(EventType.UPDATE_OBJECT, this.objects);
        return this;
    }

    /** True when `data` is the `{ blocks | floors, ... }` chart form (native model only). */
    private isCanvasChart(data: any): data is CanvasChartData {
        return (
            this._self.config.json_model === ParserEnum.SEATMAP &&
            !Array.isArray(data) &&
            data != null &&
            (Array.isArray(data.blocks) || Array.isArray(data.floors))
        );
    }

    public getBlock(id: string | number): BlockModel | null {
        const block = this.allBlocks().find((item: BlockModel) => item.id === id)
        if (block) {
            return block
        } else {
            return null
        }
    }

    public getBlocks(blockId?: string): Array<BlockModel> {
        if (blockId) {
            const block = this.getBlock(blockId)
            if (block) {
                return [block];
            } else {
                return []
            }

        }
        return this.blocks;
    }

    public removeBlock(id: string | number): this {
        const blocks = this.renderFloor().blocks;
        this.renderFloor().blocks = blocks.filter((item: BlockModel) => item.id !== id);
        this.eventManager.dispatch(EventType.REMOVE_BLOCK, id);
        this.eventManager.dispatch(EventType.UPDATE_BLOCK, this.blocks);
        return this;
    }

    public getSeat(seatId: string | number, blockId: string | number): SeatModel | null {
        let block: BlockModel = this.getBlock(blockId) as BlockModel;
        if (block) {
            const seat = block.seats.find(seat => seat.id == seatId)
            if (seat)
                return seat
            else {
                return null
            }
        } else {
            console.error(new Error('Block not found!'));
            new Error('Block not found')
            return null;
        }

    }

    public getSelectedSeats(blockId?: string): Array<SeatModel> {
        // Without a block filter, gather selections from every floor so a
        // multi-floor selection is fully retrievable.
        let blocks = blockId ? this.getBlocks(blockId) : this.allBlocks();
        let selectedSeats: Array<SeatModel> = [];
        blocks.forEach((item: BlockModel) => {
            item.seats.forEach(seatItem => {
                if (seatItem.selected)
                    selectedSeats.push(seatItem)
            })
        });
        return selectedSeats;
    }

    public filterBlock(query: BlockQuery): Array<BlockModel> {
        return this.blocks.filter((item: BlockModel) => item.id === query.id)
    }

    /** Chart-level render objects of the active floor (optionally filtered by type). */
    public getObjects(type?: ObjectData["type"]): Array<ObjectData> {
        if (type) {
            return this.objects.filter((item: ObjectData) => item.type === type);
        }
        return this.objects;
    }

    /** Active floor's focal point, or `null` when none is set. */
    public getFocalPoint(): FocalPointData | null {
        return this.focalPoint;
    }


    toJson() {
        if (this.isMultiFloor()) {
            return {
                floors: this.floors.map((floor) => floor.toJson()),
                multi_floor_view: this.multiFloorView,
            };
        }
        return {
            blocks: this.blocks,
            objects: this.objects,
            focal_point: this.focalPoint
        }
    }
}
