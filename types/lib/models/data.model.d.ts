import BlockModel from "@model/block.model";
import { SeatMapCanvas } from "@/canvas.index";
import SeatModel from "@model/seat.model";
import { PretixModel } from "@/converters/pretix/pretix.model";
import { CanvasChartData, ObjectData, FocalPointData } from "@model/object.model";
interface BlockQuery {
    id?: number | string;
}
export default class DataModel {
    private _self;
    blocks: Array<BlockModel>;
    objects: Array<ObjectData>;
    focalPoint: FocalPointData | null;
    private eventManager;
    addEventListener: any;
    constructor(_self: SeatMapCanvas);
    addBlock(block_data: any): this;
    addBulkBlock(block_data: BlockModel[] | PretixModel): this;
    replaceData(block_data: BlockModel[] | PretixModel | CanvasChartData): this;
    private isCanvasChart;
    getBlock(id: string | number): BlockModel | null;
    getBlocks(blockId?: string): Array<BlockModel>;
    removeBlock(id: string | number): this;
    getSeat(seatId: string | number, blockId: string | number): SeatModel | null;
    getSelectedSeats(blockId?: string): Array<SeatModel>;
    filterBlock(query: BlockQuery): Array<BlockModel>;
    getObjects(type?: ObjectData["type"]): Array<ObjectData>;
    getFocalPoint(): FocalPointData | null;
    toJson(): {
        blocks: BlockModel[];
        objects: ObjectData[];
        focal_point: FocalPointData | null;
    };
}
export {};
