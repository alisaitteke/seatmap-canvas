import BlockModel from "@model/block.model";
import { SeatMapCanvas } from "@/canvas.index";
import SeatModel from "@model/seat.model";
import { PretixModel } from "@/converters/pretix/pretix.model";
import { CanvasChartData, ObjectData, FocalPointData, FloorData, MultiFloorView } from "@model/object.model";
import FloorModel from "@model/floor.model";
interface BlockQuery {
    id?: number | string;
}
export declare const ALL_FLOORS = -1;
export declare const MAX_FLOORS = 9;
export default class DataModel {
    private _self;
    floors: Array<FloorModel>;
    currentFloor: number;
    multiFloorView: MultiFloorView;
    private renderFloorIndex;
    private eventManager;
    addEventListener: any;
    constructor(_self: SeatMapCanvas);
    private renderFloor;
    private effectiveFloorIndex;
    get blocks(): Array<BlockModel>;
    get objects(): Array<ObjectData>;
    get focalPoint(): FocalPointData | null;
    getBackgroundImage(): string | null;
    setRenderFloor(index: number): this;
    resetRenderFloor(): this;
    getFloors(): Array<FloorModel>;
    isMultiFloor(): boolean;
    getCurrentFloorIndex(): number;
    floorIndexById(id: string): number;
    setCurrentFloor(index: number): this;
    private allBlocks;
    private buildBlocks;
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
        floors: FloorData[];
        multi_floor_view: MultiFloorView;
        blocks?: undefined;
        objects?: undefined;
        focal_point?: undefined;
    } | {
        blocks: BlockModel[];
        objects: ObjectData[];
        focal_point: FocalPointData | null;
        floors?: undefined;
        multi_floor_view?: undefined;
    };
}
export {};
