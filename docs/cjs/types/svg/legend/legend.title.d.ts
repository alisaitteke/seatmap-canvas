import SvgBase from "@svg/svg.base";
import LegendItem from "@svg/legend/legend.item";
export default class LegendTitle extends SvgBase {
    parent: LegendItem;
    constructor(parent: LegendItem);
    update(): void;
}
