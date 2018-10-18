/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../decorators";
import SvgBase from "./svg.base";

import TooltipRect from "./tooltip/rect";
import {EventType} from "../enums/global";


import Svg from "./svg.index";
import {SeatItem} from "./stage/blocks/block-item/seat/seat-item.index";

@dom({
    tag: "g",
    class: "seatmap-tooltip",
    autoGenerate: false
})
export default class Tooltip extends SvgBase {


    public rect: TooltipRect;

    constructor(public parent: Svg) {
        super(parent);
        this.attr("transform", "translate(0,0)");
        this.global.eventManager.addEventListener(EventType.MOUSEMOVE_SEAT, (seat: SeatItem) => {

            let x = seat.coordinates.x - (this.global.config.tooltip_style.width / 2);
            let y = seat.coordinates.y - (this.global.config.tooltip_style.height + (this.global.config.seat_style.radius) + 2);


            this.node.attr("transform", "translate(" + [x, y] + ")").attr("opacity", 1);
        });
        this.global.eventManager.addEventListener(EventType.MOUSELEAVE_SEAT, (seat: SeatItem) => {
            this.node.attr("opacity", 0);
        });
        return this;
    }

    update(): this {
        this.rect = new TooltipRect(this).addTo(this);


        this.updateChilds();
        return this;
    }
}