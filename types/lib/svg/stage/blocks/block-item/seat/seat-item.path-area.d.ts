import SvgBase from "@svg/svg.base";
import { SeatItemPath } from "./seat-item.path";
export declare class SeatItemPathArea extends SvgBase {
    parent: SeatItemPath;
    constructor(parent: SeatItemPath);
    update(): this;
}
