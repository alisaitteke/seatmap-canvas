import Blocks from "./blocks/blocks.index";
import Svg from "@svg/svg.index";
import SvgBase from "@svg/svg.base";
import BlocksSearchCircle from "./blocks.search-circle";
export default class Stage extends SvgBase {
    parent: Svg;
    blocks: Blocks;
    searchCircle: BlocksSearchCircle;
    constructor(parent: Svg);
    update(): void;
}
