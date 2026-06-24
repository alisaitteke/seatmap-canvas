import { SeatMapCanvas } from "./canvas.index";
export default class WindowManager {
    parent: SeatMapCanvas;
    width: number | null;
    height: number | null;
    stage: any;
    constructor(parent: SeatMapCanvas);
    resizeHandler(): this;
}
