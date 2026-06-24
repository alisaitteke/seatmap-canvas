import SvgBase from "@svg/svg.base";
import Stage from "./stage.index";
export default class StageBackground extends SvgBase {
    parent: Stage;
    private imageElement;
    constructor(parent: Stage);
    update(): this;
    domGenerate(to: any, index?: number): this;
    private getPreserveAspectRatio;
}
