import SvgBase from "@svg/svg.base";
import TooltipRect from "@svg/tooltip/rect";
import Svg from "@svg/svg.index";
import { SeatItem } from "@svg/stage/blocks/block-item/seat/seat-item.index";
import TooltipTitle from "@svg/tooltip/title";
export default class Tooltip extends SvgBase {
    parent: Svg;
    rect: TooltipRect;
    title: TooltipTitle;
    activeSeat: SeatItem | null;
    constructor(parent: Svg);
    setTitle(title: Array<string>): this;
    update(): this;
    afterGenerate(): void;
}
