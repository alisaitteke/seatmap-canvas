import Blocks from "./blocks/blocks.index";
import Objects from "./objects/objects.index";
import Svg from "@svg/svg.index";
import SvgBase from "@svg/svg.base";
import BlocksSearchCircle from "./blocks.search-circle";
import StageBackground from "./stage.background";
import FocalPoint from "./focal-point.index";
export default class Stage extends SvgBase {
    parent: Svg;
    blocks: Blocks;
    objectsBackground: Objects;
    objectsForeground: Objects;
    focal: FocalPoint;
    searchCircle: BlocksSearchCircle;
    background: StageBackground;
    constructor(parent: Svg);
    update(): void;
}
