import SvgBase from "@svg/svg.base";
import Stage from "./stage.index";
export default class FocalPoint extends SvgBase {
    parent: Stage;
    constructor(parent: Stage);
    update(): this;
    applyZoom(k?: number, duration?: number): this;
    private currentScale;
}
