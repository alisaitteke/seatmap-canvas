/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import {SeatMapCanvas} from "../canvas.index";
import {isArray} from "rxjs/internal/util/isArray";


export interface EventObject {
    type: string,
    fn: any
}

export default class EventManager {
    private _events: Array<EventObject>;


    constructor(private _self: SeatMapCanvas) {
        this._events = [];
    }

    addEventListener(type: string | any, fn: any): this {
        if (isArray(type)) {
            for (let i = 0; i < type.length; i++) {
                this._events.push({
                    type: type[i],
                    fn: fn
                });
            }
        } else {
            this._events.push({
                type: type,
                fn: fn
            });
        }

        return this;
    }

    dispatch(type: string, data: any): this {
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