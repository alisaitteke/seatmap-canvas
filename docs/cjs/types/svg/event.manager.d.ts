import { SeatMapCanvas } from "@/canvas.index";
export interface EventObject {
    type: string;
    fn: any;
}
export default class EventManager {
    private _self;
    events: Array<EventObject>;
    constructor(_self: SeatMapCanvas);
    addEventListener(type: string | any, fn: any): this;
    dispatch(type: string, data: any): this;
}
