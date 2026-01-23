import "reflect-metadata";
import Stage from "@svg/stage/stage.index";
import { SeatMapCanvas } from "@/canvas.index";
import SvgBase from "@svg/svg.base";
import ZoomOutBg from "@svg/zoom-out.bg";
import Legend from "@svg/legend";
import Tooltip from "@svg/tooltip";
export default class Svg extends SvgBase {
    parent: SeatMapCanvas;
    stage: Stage;
    zoomOutBg: ZoomOutBg;
    legend: Legend;
    tooltip: Tooltip;
    constructor(parent: SeatMapCanvas);
    update(): void;
}
