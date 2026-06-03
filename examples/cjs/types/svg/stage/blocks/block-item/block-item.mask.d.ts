import SvgBase from "@svg/svg.base";
import BlockModel from "@model/block.model";
import Block from "./block-item.index";
import { BoundItem } from "./bound/bound-item.index";
export default class BlockMask extends SvgBase {
    parent: Block;
    item: BlockModel;
    blockLevelMask: BoundItem;
    seatLevelMask: BoundItem;
    constructor(parent: Block, item: BlockModel);
    update(): this;
}
