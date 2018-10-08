/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import BlockModel from "./block.model";
import {DataEventType} from "../enums/global";

interface BlockQuery {
    id?: number | string
}

export default class DataModel {
    private blocks: Array<BlockModel>;

    private events: Array<any>;

    constructor() {
        this.blocks = [];
        this.events = [];
    }

    public addBlock(block_data: any): this {
        this.blocks.push(new BlockModel(block_data));
        this.runEvents(DataEventType.ADD_BLOCK, [block_data]);
        return this;
    }

    public addBulkBlock(block_data: Array<any>): this {
        block_data.map((item: any) => {
            this.blocks.push(new BlockModel(item));
        });
        this.runEvents(DataEventType.ADD_BLOCK, block_data);
        return this;
    }

    public replaceData(block_data: Array<any>): this {
        this.blocks = [];
        this.addBulkBlock(block_data);
        return this;
    }

    public getBlock(id: string | number): BlockModel {
        return this.blocks.find((item: BlockModel) => item.id === id);
    }

    public getBlocks(): Array<BlockModel> {
        return this.blocks;
    }

    public removeBlock(id: string | number): this {
        this.filterBlock({id: id}).map((item: BlockModel, index: number) => {
            this.blocks.splice(index, 1);
        });
        this.runEvents(DataEventType.REMOVE_BLOCK, id);
        return this;
    }

    public filterBlock(query: BlockQuery): Array<BlockModel> {
        return this.blocks.filter((item: BlockModel) => item.id === query.id)
    }

    public addEventListener(type: DataEventType, cb_fn: any): this {
        this.events.push({
            type: type,
            fn: cb_fn
        });
        return this;
    }

    public runEvents(type: DataEventType, data: any): this {
        this.events.filter((item: any) => item.type === type).map((item: any) => {
            item.fn(data);
        });
        return this;
    }

    toJson() {
        return {
            blocks: this.blocks
        }
    }
}