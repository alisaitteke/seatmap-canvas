import SvgBase from "./svg.base";
import Svg from "./svg.index";
export default class Legend extends SvgBase {
    parent: Svg;
    constructor(parent: Svg);
    update(): void;
    afterGenerate(): void;
}
