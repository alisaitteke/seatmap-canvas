import SvgBase from "@svg/svg.base";
import BlocksSearchCircle from "../blocks.search-circle";
export default class Circle extends SvgBase {
    parent: BlocksSearchCircle;
    constructor(parent: BlocksSearchCircle);
    update(): this;
}
