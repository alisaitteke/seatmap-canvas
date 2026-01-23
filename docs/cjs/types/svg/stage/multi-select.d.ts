import SvgBase from "@svg//svg.base";
import Svg from "@svg/svg.index";
import MultiSelectRect from "./multi-select/rect";
export default class MultiSelect extends SvgBase {
    parent: Svg;
    rect: MultiSelectRect;
    enable: boolean;
    start: boolean;
    points: any;
    constructor(parent: Svg);
    update(): this;
    afterGenerate(): void;
}
