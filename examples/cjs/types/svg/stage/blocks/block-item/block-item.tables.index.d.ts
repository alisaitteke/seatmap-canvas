import SvgBase from "@svg/svg.base";
import BlockModel from "@model/block.model";
import Block from "./block-item.index";
export default class BlockTables extends SvgBase {
    parent: Block;
    item: BlockModel;
    constructor(parent: Block, item: BlockModel);
    update(): this;
}
