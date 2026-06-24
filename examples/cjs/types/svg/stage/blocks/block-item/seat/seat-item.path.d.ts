import SvgBase from "@svg/svg.base";
import { SeatItem } from "./seat-item.index";
export declare class SeatItemPath extends SvgBase {
    parent: SeatItem;
    private pathElement;
    private hitArea;
    constructor(parent: SeatItem);
    domGenerate(to: any, index?: number): this;
    private getSize;
    private parseViewBox;
    private getScale;
    update(): this;
}
