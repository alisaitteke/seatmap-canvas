import BlocksManager from "../blocks.index";
import SvgBase from "@svg/svg.base";
import Seats from "./block-item.seats.index";
import BlockInfo from "./block-item.info.index";
import BlockBounds from "./block-item.bounds";
import BlockMask from "./block-item.mask";
import Labels from "./block-item.labels.index";
import BlockModel from "@model/block.model";
export default class Block extends SvgBase {
    parent: BlocksManager;
    item: BlockModel;
    seats: Seats;
    labels: Labels;
    info: BlockInfo;
    mask: BlockMask;
    bounds: BlockBounds;
    center_position: any;
    top_position: any;
    constructor(parent: BlocksManager, item: BlockModel);
    update(): this;
    infosToTop(): void;
    infosToCenter(): void;
}
