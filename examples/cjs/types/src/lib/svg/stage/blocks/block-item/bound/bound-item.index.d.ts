import SvgBase from "@svg/svg.base";
import BlockBounds from "../block-item.bounds";
import BlockModel from "@model/block.model";
import BlockMask from "../block-item.mask";
export declare class BoundItem extends SvgBase {
    parent: BlockBounds | BlockMask;
    item: BlockModel;
    constructor(parent: BlockBounds | BlockMask, item: BlockModel);
    show(): void;
    hide(): void;
    update(): this;
}
