import SvgBase from "@svg/svg.base";
import Blocks from "@svg/stage/blocks/blocks.index";
import Objects from "@svg/stage/objects/objects.index";
import FocalPoint from "@svg/stage/focal-point.index";
import FloorModel from "@model/floor.model";
export default class Floor extends SvgBase {
    parent: SvgBase;
    index: number;
    floorModel: FloorModel;
    objectsBackground: Objects;
    blocks: Blocks;
    objectsForeground: Objects;
    focal: FocalPoint;
    private backgroundNode;
    constructor(parent: SvgBase, index: number, floorModel: FloorModel);
    update(): this;
    contentBBox(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    private removeBackground;
    private renderBackground;
}
