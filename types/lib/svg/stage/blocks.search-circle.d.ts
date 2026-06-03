import SvgBase from "@svg/svg.base";
import Circle from "@svg/stage/search-circle/circle";
import Stage from "@svg/stage/stage.index";
export default class BlocksSearchCircle extends SvgBase {
    parent: Stage;
    circle: Circle;
    is_enable: boolean;
    constructor(parent: Stage);
    update(): this;
    enable(): this;
    disable(): this;
}
