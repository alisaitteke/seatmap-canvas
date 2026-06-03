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
import {CanvasChartData, ObjectData, FocalPointData} from "@model/object.model";

interface BlockQuery {
    id?: number | string
}

export default class DataModel {
    blocks: Array<BlockModel>;

    /**
     * Chart-level render objects (sections, GA, table/booth bodies, shapes,
     * icons, text). Pre-resolved into document coordinates by the producer and
     * drawn by the chart-level objects layer. Empty for legacy seating-only data.
     */
    objects: Array<ObjectData>;

    /** Venue orientation point (stage/pitch), or `null` when none is set. */
    focalPoint: FocalPointData | null;


    private eventManager: EventManager;
    public addEventListener: any;

    constructor(private _self: SeatMapCanvas) {
        this.blocks = [];
        this.objects = [];
        this.focalPoint = null;
        this.eventManager = _self.eventManager;
        this.addEventListener = _self.eventManager.addEventListener;
    }


    public addBlock(block_data: any): this {
        this.blocks.push(new BlockModel(block_data));
        this.eventManager.dispatch(EventType.ADD_BLOCK, [block_data]);
        this.eventManager.dispatch(EventType.UPDATE_BLOCK, this.blocks);
        return this;
    }

    public addBulkBlock(block_data: BlockModel[] | PretixModel): this {
        if (this._self.config.json_model !== ParserEnum.SEATMAP) {
            const parserName = this._self.config.json_model;
            const parserClass = this._self.parsers[parserName];

            block_data = parserClass.parse(block_data as PretixModel)
        }

        (block_data as BlockModel[]).map((item: any) => {
            this.blocks.push(new BlockModel(item));
        });

        // this.addBlock()

        this.eventManager.dispatch(EventType.ADD_BLOCK, [block_data]);
        this.eventManager.dispatch(EventType.UPDATE_BLOCK, this.blocks);
        return this;
    }

    /**
     * Load a full chart. Accepts either:
     *  - a `BlockData[]`/`PretixModel` (legacy, seating only), or
     *  - a {@link CanvasChartData} `{ blocks, objects?, focal_point? }` so the
     *    chart-level objects layer and focal point load in the same pass.
     *
     * Objects/focal are only honored for the native (`seatmap`) JSON model; a
     * pretix payload is also a non-array object, so we gate the chart branch on
     * the configured parser to avoid mis-reading it.
     */
    public replaceData(block_data: BlockModel[] | PretixModel | CanvasChartData): this {
        this.blocks = [];

        if (this.isCanvasChart(block_data)) {
            this.objects = block_data.objects || [];
            this.focalPoint = block_data.focal_point || null;
            this.addBulkBlock(block_data.blocks as BlockModel[]);
        } else {
            this.objects = [];
            this.focalPoint = null;
            this.addBulkBlock(block_data as BlockModel[] | PretixModel);
        }

        this.eventManager.dispatch(EventType.UPDATE_OBJECT, this.objects);
        return this;
    }

    /** True when `data` is the `{ blocks, ... }` chart form (native model only). */
    private isCanvasChart(data: any): data is CanvasChartData {
        return (
            this._self.config.json_model === ParserEnum.SEATMAP &&
            !Array.isArray(data) &&
            data != null &&
            Array.isArray(data.blocks)
        );
    }

    public getBlock(id: string | number): BlockModel | null {
        const block = this.blocks.find((item: BlockModel) => item.id === id)
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
        this.filterBlock({id: id}).map((item: BlockModel, index: number) => {
            this.blocks.splice(index, 1);
        });
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
        let blocks = this.getBlocks(blockId);
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

    /** Chart-level render objects (optionally filtered by type). */
    public getObjects(type?: ObjectData["type"]): Array<ObjectData> {
        if (type) {
            return this.objects.filter((item: ObjectData) => item.type === type);
        }
        return this.objects;
    }

    /** Venue focal point, or `null` when none is set. */
    public getFocalPoint(): FocalPointData | null {
        return this.focalPoint;
    }


    toJson() {
        return {
            blocks: this.blocks,
            objects: this.objects,
            focal_point: this.focalPoint
        }
    }
}
