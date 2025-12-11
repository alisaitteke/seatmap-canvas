import SvgBase from "@svg/svg.base";
import { SeatItem } from "@svg/stage/blocks/block-item/seat/seat-item.index";
export declare class SeatItemCheck extends SvgBase {
    parent: SeatItem;
    constructor(parent: SeatItem);
    update(): this;
    afterGenerate(): void;
    show(): this;
    hide(): this;
}
