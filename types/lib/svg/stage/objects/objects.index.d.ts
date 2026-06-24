import StageManager from "../stage.index";
import SvgBase from "@svg/svg.base";
import "./section-item";
import "./ga-item";
import "./table-item";
import "./booth-item";
import "./shape-item";
import "./icon-item";
import "./text-item";
export type ObjectBand = 'background' | 'foreground';
export default class Objects extends SvgBase {
    parent: StageManager;
    band: ObjectBand;
    constructor(parent: StageManager, band: ObjectBand);
    update(): this;
    private collect;
    private bandOf;
}
