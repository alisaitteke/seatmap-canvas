/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../decorators";
import SvgBase from "./svg.base";

import TooltipRect from "./tooltip/rect";
import {EventType, ZoomLevel} from "../enums/global";


import Svg from "./svg.index";
import {SeatItem} from "./stage/blocks/block-item/seat/seat-item.index";

import * as d3 from "d3";
import TooltipTitle from "./tooltip/title";

@dom({
    tag: "g",
    class: "seatmap-tooltip",
    autoGenerate: false
})
export default class Tooltip extends SvgBase {


    public rect: TooltipRect;
    public title: TooltipTitle;

    public activeSeat: SeatItem;

    constructor(public parent: Svg) {
        super(parent);
        this.attr("transform", "translate(0,0)");
        this.attr("opacity", 0);

        this.activeSeat = null;


        this.global.eventManager.addEventListener(EventType.MOUSEMOVE_SEAT, (seat: SeatItem) => {
            if (this.global.multi_select) return;
            if (this.activeSeat !== seat) {
                this.activeSeat = seat;
                this.setTitle(seat.item.title.split("\n"));
                this.title.generateTitle();
            }
        });
        this.global.eventManager.addEventListener(EventType.MOUSEOUT_SEAT, (seat: SeatItem) => {
            this.node.attr("opacity", 0);
            this.activeSeat = null;
            this.title.title = [];
            this.title.generateTitle();
        });
        return this;
    }

    public setTitle(title: Array<string>): this {
        this.title.title = title;
        return this;
    }

    update(): this {
        this.rect = new TooltipRect(this).addTo(this);
        this.title = new TooltipTitle(this).addTo(this);


        this.updateChilds();
        return this;
    }

    afterGenerate() {

        let _self = this;

        this.parent.node.on("mousemove.seat", function () {
            if (_self.global.multi_select) return;
            if (_self.global.zoomManager.zoomLevel === ZoomLevel.SEAT && _self.activeSeat !== null) {
                let cor = d3.mouse(this);

                let x = cor[0] - (_self.global.config.tooltip_style.width / 2);
                let y = cor[1] - (_self.global.config.tooltip_style.height + (_self.global.config.seat_style.radius) + 2);
                _self.node.attr("transform", "translate(" + [x, y] + ")").attr("opacity", 1);
            } else {
                _self.node.attr("opacity", 0);
            }
        })
    }
}