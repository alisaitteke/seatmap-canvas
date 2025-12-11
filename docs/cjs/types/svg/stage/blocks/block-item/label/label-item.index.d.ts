import SvgBase from "@svg/svg.base";
import { LabelItemCircle } from "./label-item.circle";
import { CoordinateModel } from "../../../../../models/coordinate.model";
import Labels from "../block-item.labels.index";
import LabelModel from "../../../../../models/label.model";
export declare class LabelItem extends SvgBase {
    parent: Labels;
    item: LabelModel;
    circle: LabelItemCircle;
    coordinates: CoordinateModel;
    constructor(parent: Labels, item: LabelModel);
    update(): this;
}
