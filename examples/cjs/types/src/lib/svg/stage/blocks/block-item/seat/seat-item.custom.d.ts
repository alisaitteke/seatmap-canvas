import SvgBase from "@svg/svg.base";
import { SeatItem } from "./seat-item.index";
export declare class SeatItemCustomSvg extends SvgBase {
    parent: SeatItem;
    customSvg: any;
    constructor(parent: SeatItem, customSvg: any);
    update(): this;
    domGenerate(to: any, index?: number): this;
}
