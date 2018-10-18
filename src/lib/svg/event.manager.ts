/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import {SeatMapCanvas} from "../canvas.index";
import {EventType} from "../enums/global";


export interface EventObject {
    type: string,
    fn: any
}

export default class EventManager {
    private _events: Array<EventObject>;
    private multi_select_disable_events: Array<string>;


    constructor(private _self: SeatMapCanvas) {
        this._events = [];
        this.multi_select_disable_events = [];
        this.multi_select_disable_events.push(EventType.CLICK_BLOCK);
        this.multi_select_disable_events.push(EventType.CLICK_SEAT);

    }

    addEventListener(type: string, fn: any): this {
        this._events.push({
            type: type,
            fn: fn
        });
        return this;
    }

    dispatch(type: string, data: any): this {
        console.log(type);
        if (this.multi_select_disable_events.indexOf(type) > -1) return;
        this._events
            .filter((event: EventObject) => event.type === type)
            .map((event: EventObject) => event.fn(data));
        return this;
    }


    get events(): Array<EventObject> {
        return this._events;
    }

    set events(value: Array<EventObject>) {
        this._events = value;
    }
}