import SvgBase from "@svg/svg.base";
import Legend from "@svg/legend";
import LegendCircle from "@svg/legend/legend.circle";
import LegendTitle from "@svg/legend/legend.title";
import LegendModel from "@model/legend.model";
export default class LegendItem extends SvgBase {
    parent: Legend;
    legend_data: LegendModel;
    circle: LegendCircle;
    title: LegendTitle;
    constructor(parent: Legend, legend_data: LegendModel);
    update(): void;
}
