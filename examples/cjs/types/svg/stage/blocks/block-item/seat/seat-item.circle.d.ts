import SvgBase from "@svg/svg.base";
import { SeatItem } from "./seat-item.index";
export declare class SeatItemCircle extends SvgBase {
    parent: SeatItem;
    constructor(parent: SeatItem);
    update(): this;
}
