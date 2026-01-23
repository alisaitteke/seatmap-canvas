/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */
import {pointer as d3Pointer} from 'd3-selection'

import {dom} from "@/decorators";
import SvgBase from "@svg/svg.base";

import TooltipRect from "@svg/tooltip/rect";
import {EventType, ZoomLevel} from "@enum/global";

import Svg from "@svg/svg.index";
import {SeatItem} from "@svg/stage/blocks/block-item/seat/seat-item.index";
import TooltipTitle from "@svg/tooltip/title";

@dom({
    tag: "g",
    class: "seatmap-tooltip",
    autoGenerate: false
})
export default class Tooltip extends SvgBase {


    public rect: TooltipRect;
    public title: TooltipTitle;

    public activeSeat: SeatItem | null;

    constructor(public parent: Svg) {
        super(parent);
        this.attr("transform", "translate(0,0)");
        this.attr("opacity", 0);

        this.activeSeat = null;


        this.global.eventManager.addEventListener([EventType.MOUSEMOVE_SEAT], (seat: SeatItem) => {
            if (this.global.multi_select) return;
            if (this.activeSeat !== seat && seat.item.title) {
                this.activeSeat = seat;
                this.setTitle(seat.item.title.split("\n"));
                this.title.generateTitle();
            }
        });
        this.global.eventManager.addEventListener([EventType.MOUSEOUT_SEAT], (seat: SeatItem) => {
            this.node.attr("opacity", 0);
            this.activeSeat = null;
            this.title.title = [];
            this.title.generateTitle();
        });
        this.global.eventManager.addEventListener([EventType.TOUCHSTART_BLOCK], (seat: SeatItem) => {
            this.node.attr("opacity", 0);
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

        this.parent.node.on("mousemove.seat", function (event: any) {
            if (_self.global.multi_select) return;
            if (_self.global.zoomManager.zoomLevel === ZoomLevel.SEAT && _self.activeSeat !== null) {
                // @ts-ignore
                let cor = d3Pointer(event, this as any);

                let x = cor[0] - (_self.global.config.style.tooltip.width / 2);
                let y = cor[1] - (_self.global.config.style.tooltip.height + (_self.global.config.style.seat.radius) + 2);
                _self.node.attr("transform", "translate(" + [x, y] + ")").attr("opacity", 1);
            } else {
                _self.node.attr("opacity", 0);
            }
        })
    }
}