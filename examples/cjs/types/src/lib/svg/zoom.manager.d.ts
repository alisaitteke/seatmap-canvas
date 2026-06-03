import { SeatMapCanvas } from "@/canvas.index";
import { ZoomLevel } from "@enum/global";
import BlockModel from "@model/block.model";
export interface ZoomLevelObject {
    level: string;
    values: {
        x: number;
        y: number;
        k: number;
    };
}
export default class ZoomManager {
    private _self;
    zoomTypes: any;
    scale: any;
    private zoomLevels;
    activeBlocks: Array<any>;
    minZoom: number | null;
    zoomLevel: ZoomLevel;
    constructor(_self: SeatMapCanvas);
    init(): void;
    zoomInit(): void;
    zoomEnd(_self: this): any;
    animatedZoomEnd(_self: this): any;
    animatedFastZoomEnd(_self: this): any;
    zoomHand(_self: this): any;
    zoomHandAnimated(_self: this): any;
    zoomHandFastAnimated(_self: this): any;
    calculateZoomLevel(k: number): void;
    canvasScopeHandler(): void;
    calculateZoomLevels(blocks?: Array<BlockModel>): this;
    calculateActiveBlocks(blocks?: Array<BlockModel>): Array<BlockModel>;
    zoomToSelection(animation?: boolean): void;
    zoomToBlock(id: string | number, animation?: boolean, fastAnimated?: boolean): void;
    zoomToVenue(animation?: boolean, fastAnimated?: boolean): void;
    zoomEnable(): this;
    zoomDisable(): this;
    getZoomLevelValues(level: ZoomLevel): any;
    getActiveZoom(): any;
    private dispatchZoomEvent;
}
