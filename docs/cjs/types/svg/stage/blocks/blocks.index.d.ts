import StageManager from "../stage.index";
import Block from "./block-item/block-item.index";
import SvgBase from "@svg/svg.base";
import { SeatItem } from "./block-item/seat/seat-item.index";
export default class Blocks extends SvgBase {
    parent: StageManager;
    seats: Array<SeatItem>;
    constructor(parent: StageManager);
    update(): this;
    getBlock(id: any): Block | null;
    getBlocks(): Array<Block>;
    center(): void;
    scalePolygon(polygon: [number, number][], scale: number, center: [number, number]): [number, number][];
    expandPolygon(polygon: [number, number][], distance: number, center: [number, number]): [number, number][];
}
