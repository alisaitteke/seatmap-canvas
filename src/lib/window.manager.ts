/*
 * Seatmap-canvas
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2022 Ali Sait TEKE
 */
import {select as d3Select} from 'd3-selection'

import {SeatMapCanvas} from "./canvas.index";
import {EventType} from "./enums/global";

declare var window: any;

export default class WindowManager {

    public width: number | null = null;
    public height: number | null = null;

    public stage: any = {
        width: null,
        height: null
    };


    constructor(public parent: SeatMapCanvas) {
        d3Select(window).on("resize.svg", () => {
            this.resizeHandler();
        });

    }

    resizeHandler(): this {
        let _node = d3Select(this.parent.container_selector).node().getBoundingClientRect();
        this.width = _node.width;
        this.height = _node.height;
        this.parent.svg.node.attr("width", _node.width);
        this.parent.svg.node.attr("height", _node.height);
        this.parent.global.eventManager.dispatch(EventType.RESIZE_WINDOW, _node);
        return this;
    }
}
