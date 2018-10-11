/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import {SeatMapCanvas} from "./canvas.index";
import * as d3 from "d3";

declare var window: any;

export default class WindowManager {

    public width: number = null;
    public height: number = null;

    public stage: any = {
        width: null,
        height: null
    };


    constructor(public parent: SeatMapCanvas) {
        d3.select(window).on("resize.svg", () => {
            this.resizeHandler();
        });

    }

    resizeHandler():this {
        let _node = d3.select(this.parent.container_selector).node().getBoundingClientRect();
        this.width = _node.width;
        this.height = _node.height;
        this.parent.svg.node.attr("width", _node.width);
        this.parent.svg.node.attr("height", _node.height);
        return this;
    }
}
