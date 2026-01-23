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
                let titleLines = seat.item.title.split("\n");
                
                // Add visual indicator for non-salable seats
                if (!seat.isSalable()) {
                    titleLines = ["🚫 " + titleLines[0], ...titleLines.slice(1)];
                }
                
                this.setTitle(titleLines);
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
        
        // Dynamically calculate tooltip height based on content
        const lineHeight = this.global.config.style.tooltip.line_height || 18;
        const padding = this.global.config.style.tooltip.padding || 12;
        const calculatedHeight = (title.length * lineHeight) + (padding * 2);
        
        // Update rect height and border color based on seat salability
        if (this.rect && this.rect.node) {
            this.rect.node.attr("height", calculatedHeight);
            
            // Change border color for non-salable seats (subtle red)
            if (this.activeSeat && !this.activeSeat.isSalable()) {
                this.rect.node.attr("stroke", "#ef4444");  // Soft red
            } else {
                this.rect.node.attr("stroke", this.global.config.style.tooltip.border_color || "rgba(0,0,0,0.15)");
            }
        }
        
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

                // Get current tooltip height (may be dynamic)
                const currentHeight = _self.rect.node ? parseFloat(_self.rect.node.attr("height")) : _self.global.config.style.tooltip.height;
                
                let x = cor[0] - (_self.global.config.style.tooltip.width / 2);
                let y = cor[1] - (currentHeight + (_self.global.config.style.seat.radius) + 8);
                
                // Lower opacity for non-salable seats (better UX)
                const opacity = _self.activeSeat.isSalable() ? 1 : 0.5;
                
                _self.node.attr("transform", "translate(" + [x, y] + ")").attr("opacity", opacity);
            } else {
                _self.node.attr("opacity", 0);
            }
        })
    }
}