import SvgBase from "@svg/svg.base";
import Floor from "./floor.index";
import Stage from "@svg/stage/stage.index";
export default class Floors extends SvgBase {
    parent: Stage;
    constructor(parent: Stage);
    update(): this;
    getFloorGroups(): Array<Floor>;
    getActiveFloorGroup(): Floor;
    initView(): this;
    selectFloor(index: number, animated?: boolean): this;
    goToAllFloors(animated?: boolean): this;
    toggleFloor(index: number, animated?: boolean): this;
    applyView(animated?: boolean): this;
    private transitionDuration;
    private computeStackTransforms;
    private showAllFloors;
    private showSingleFloor;
    private frameActiveFloor;
    private framePicking;
    hoverFloor(index: number): this;
    unhoverFloor(): this;
    private dispatchFloorChanged;
}
