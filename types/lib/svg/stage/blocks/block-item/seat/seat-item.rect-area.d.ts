import SvgBase from "@svg/svg.base";
import { SeatItemRect } from "./seat-item.rect";
export declare class SeatItemRectArea extends SvgBase {
    parent: SeatItemRect;
    constructor(parent: SeatItemRect);
    update(): this;
}
