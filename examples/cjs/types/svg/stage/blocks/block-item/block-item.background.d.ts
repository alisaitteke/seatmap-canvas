import SvgBase from "@svg/svg.base";
import BlockModel from "@model/block.model";
import Block from "./block-item.index";
export default class BlockBackground extends SvgBase {
    parent: Block;
    item: BlockModel;
    private imageElement;
    private clipPath;
    private clipPathId;
    constructor(parent: Block, item: BlockModel);
    update(): this;
    domGenerate(to: any, index?: number): this;
    private getPreserveAspectRatio;
}
