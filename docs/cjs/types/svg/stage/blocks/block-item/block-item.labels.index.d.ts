import SvgBase from "@svg/svg.base";
import Block from "./block-item.index";
import BlockModel from "@model/block.model";
import { LabelItem } from "./label/label-item.index";
export default class Labels extends SvgBase {
    parent: Block;
    item: BlockModel;
    constructor(parent: Block, item: BlockModel);
    update(): this;
    getLabels(): Array<LabelItem>;
}
