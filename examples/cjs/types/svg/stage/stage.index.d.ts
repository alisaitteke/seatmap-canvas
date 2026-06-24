import Blocks from "./blocks/blocks.index";
import Objects from "./objects/objects.index";
import Svg from "@svg/svg.index";
import SvgBase from "@svg/svg.base";
import BlocksSearchCircle from "./blocks.search-circle";
import StageBackground from "./stage.background";
import FocalPoint from "./focal-point.index";
import Floors from "./floors/floors.index";
import Floor from "./floors/floor.index";
export default class Stage extends SvgBase {
    parent: Svg;
    floors: Floors;
    searchCircle: BlocksSearchCircle;
    background: StageBackground;
    constructor(parent: Svg);
    get activeFloor(): Floor;
    get blocks(): Blocks;
    get objectsBackground(): Objects;
    get objectsForeground(): Objects;
    get focal(): FocalPoint;
    update(): void;
}
