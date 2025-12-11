import SvgBase from "@svg/svg.base";
import BlockModel from "@model/block.model";
import Block from "./block-item.index";
import { SeatItem } from "./seat/seat-item.index";
export default class Seats extends SvgBase {
    parent: Block;
    item: BlockModel;
    constructor(parent: Block, item: BlockModel);
    update(): Promise<this>;
    getSeat(id: any): SeatItem;
    getSeats(): Array<SeatItem>;
    getSeatsCount(): number;
    getSeatByIndex(index: number): SeatItem;
    resetSeatsColors(animation?: boolean): void;
}
