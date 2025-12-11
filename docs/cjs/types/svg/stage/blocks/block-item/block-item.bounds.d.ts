import SvgBase from "@svg/svg.base";
import BlockModel from "@model/block.model";
import Block from "./block-item.index";
import { BoundItem } from "./bound/bound-item.index";
export default class BlockBounds extends SvgBase {
    parent: Block;
    item: BlockModel;
    bound1: BoundItem;
    bound2: BoundItem;
    constructor(parent: Block, item: BlockModel);
    update(): this;
}
