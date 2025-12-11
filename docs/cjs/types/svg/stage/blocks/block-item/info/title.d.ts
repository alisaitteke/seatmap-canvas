import SvgBase from "@svg/svg.base";
import BlockInfo from "../block-item.info.index";
export declare class BlockTitle extends SvgBase {
    parent: BlockInfo;
    constructor(parent: BlockInfo);
    update(): this;
}
