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
    parent: SvgBase;
    band: ObjectBand;
    constructor(parent: SvgBase, band: ObjectBand);
    update(): this;
    private collect;
    private bandOf;
}
