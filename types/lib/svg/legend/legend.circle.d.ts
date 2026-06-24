import SvgBase from "@svg/svg.base";
import LegendItem from "@svg/legend/legend.item";
export default class LegendCircle extends SvgBase {
    parent: LegendItem;
    constructor(parent: LegendItem);
    update(): void;
}
