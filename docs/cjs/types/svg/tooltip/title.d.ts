import SvgBase from "@svg/svg.base";
import Tooltip from "@svg/tooltip";
export default class TooltipTitle extends SvgBase {
    parent: Tooltip;
    title: Array<string>;
    constructor(parent: Tooltip);
    update(): this;
    afterGenerate(): void;
    generateTitle(): void;
}
