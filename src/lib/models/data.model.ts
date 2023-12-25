/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import BlockModel from "./block.model";
import {EventType} from "../enums/global";
import EventManager from "../svg/event.manager";
import {SeatMapCanvas} from "../canvas.index";
import {SeatItem} from "../svg/stage/blocks/block-item/seat/seat-item.index";
import SeatModel from "./seat.model";
import Block from "../svg/stage/blocks/block-item/block-item.index";

interface BlockQuery {
    id?: number | string
}

export default class DataModel {
    blocks: Array<BlockModel>;


    private eventManager: EventManager;
    public addEventListener: any;

    constructor(private _self: SeatMapCanvas) {
        this.blocks = [];
        this.eventManager = _self.eventManager;
        this.addEventListener = _self.eventManager.addEventListener;
    }

    public addBlock(block_data: any): this {
        this.blocks.push(new BlockModel(block_data));
        this.eventManager.dispatch(EventType.ADD_BLOCK, [block_data]);
        this.eventManager.dispatch(EventType.UPDATE_BLOCK, this.blocks);
        return this;
    }

    public addBulkBlock(block_data: Array<BlockModel>): this {
        block_data.map((item: any) => {
            this.blocks.push(new BlockModel(item));
        });
        this.eventManager.dispatch(EventType.ADD_BLOCK, [block_data]);
        this.eventManager.dispatch(EventType.UPDATE_BLOCK, this.blocks);
        return this;
    }

    public replaceData(block_data: Array<any>): this {
        this.blocks = [];
        this.addBulkBlock(block_data);
        return this;
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


    toJson() {
        return {
            blocks: this.blocks
        }
    }
}
