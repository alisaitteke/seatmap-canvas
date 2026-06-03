import SvgBase from "@svg/svg.base";
export default class FocalPoint extends SvgBase {
    parent: SvgBase;
    constructor(parent: SvgBase);
    update(): this;
    applyZoom(k?: number, duration?: number): this;
    private currentScale;
}
