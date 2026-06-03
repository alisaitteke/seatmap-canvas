import SvgBase from "@svg/svg.base";
import Tooltip from "@svg/tooltip";
export default class TooltipRect extends SvgBase {
    parent: Tooltip;
    constructor(parent: Tooltip);
    update(): this;
    afterGenerate(): void;
}
