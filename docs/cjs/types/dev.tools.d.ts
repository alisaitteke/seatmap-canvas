import { SeatMapCanvas } from "./canvas.index";
export default class SeatMapDevTools {
    private context;
    constructor(context: SeatMapCanvas);
    log(...messages: any[]): this;
}
