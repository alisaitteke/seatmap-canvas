import BlockModel from "@model/block.model";
import { SeatMapCanvas } from "@/canvas.index";
import SeatModel from "@model/seat.model";
import { PretixModel } from "@/converters/pretix/pretix.model";
interface BlockQuery {
    id?: number | string;
}
export default class DataModel {
    private _self;
    blocks: Array<BlockModel>;
    private eventManager;
    addEventListener: any;
    constructor(_self: SeatMapCanvas);
    addBlock(block_data: any): this;
    addBulkBlock(block_data: BlockModel[] | PretixModel): this;
    replaceData(block_data: BlockModel[] | PretixModel): this;
    getBlock(id: string | number): BlockModel | null;
    getBlocks(blockId?: string): Array<BlockModel>;
    removeBlock(id: string | number): this;
    getSeat(seatId: string | number, blockId: string | number): SeatModel | null;
    getSelectedSeats(blockId?: string): Array<SeatModel>;
    filterBlock(query: BlockQuery): Array<BlockModel>;
    toJson(): {
        blocks: BlockModel[];
    };
}
export {};
