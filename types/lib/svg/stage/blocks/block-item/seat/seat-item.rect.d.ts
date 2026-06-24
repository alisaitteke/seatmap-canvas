import SvgBase from "@svg/svg.base";
import { SeatItem } from "./seat-item.index";
export declare class SeatItemRect extends SvgBase {
    parent: SeatItem;
    private rectElement;
    private hitArea;
    constructor(parent: SeatItem);
    domGenerate(to: any, index?: number): this;
    private getSize;
    update(): this;
}
