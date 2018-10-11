/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../decorators";
import SvgBase from "./svg.base";
import Svg from "./svg.index";
import {EventType} from "../enums/global";

@dom({
    tag: "rect",
    class: "zoom-out-bg",
    autoGenerate: false
})
export default class ZoomOutBg extends SvgBase {

    constructor(public parent: Svg) {
        super(parent);
        this.global.eventManager.addEventListener(EventType.RESIZE_WINDOW, (win: any) => {

            this.node
                .attr("width", win.width)
                .attr("height", win.height)
                .on("click.zoomout", () => {
                    this.global.eventManager.dispatch(EventType.CLICK_ZOOMOUT, this);
                });
        })
    }

    update() {

    }
}