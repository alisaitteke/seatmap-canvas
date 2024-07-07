/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import {isArray} from "rxjs/internal/util/isArray";

import {SeatMapCanvas} from "@/canvas.index";

export interface EventObject {
    type: string,
    fn: any
}

export default class EventManager {
    events: Array<EventObject>;


    constructor(private _self: SeatMapCanvas) {
        this.events = [];
    }

    addEventListener(type: string | any, fn: any): this {
        if (isArray(type)) {
            for (let i = 0; i < type.length; i++) {
                this.events.push({
                    type: type[i],
                    fn: fn
                });
            }
        } else {
            this.events.push({
                type: type,
                fn: fn
            });
        }

        return this;
    }

    dispatch(type: string, data: any): this {
        this.events
            .filter((event: EventObject) => event.type === type)
            .map((event: EventObject) => event.fn(data));
        return this;
    }

}