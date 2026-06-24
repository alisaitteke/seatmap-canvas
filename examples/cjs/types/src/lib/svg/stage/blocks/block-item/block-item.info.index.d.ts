import SvgBase from "@svg/svg.base";
import BlockModel from "@model/block.model";
import Block from "./block-item.index";
import { BlockTitle } from "./info/title";
export default class BlockInfo extends SvgBase {
    parent: Block;
    item: BlockModel;
    title: BlockTitle;
    constructor(parent: Block, item: BlockModel);
    update(): this;
}
