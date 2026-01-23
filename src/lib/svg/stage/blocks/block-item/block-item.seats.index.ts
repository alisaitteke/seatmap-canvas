/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {text as TextLoad} from "d3-fetch";
import BlockModel from "@model/block.model";
import SeatModel from "@model/seat.model";
import Block from "./block-item.index";
import {SeatItem} from "./seat/seat-item.index";
import {EventType, SeatAction} from "@enum/global";
import {extractSvgPath} from "@/utils/svg-parser";


@dom({
    tag: "g",
    class: "seats",
    autoGenerate: false
})
export default class Seats extends SvgBase {

    constructor(public parent: Block, public item: BlockModel) {
        super(parent);

        this.global.eventManager.addEventListener(EventType.MOUSEENTER_SEAT, (seat: SeatItem) => {
            if (this.global.multi_select) return;
            if (!seat.isSalable()) return;  // Don't change color for non-salable seats
            seat.setColor(seat.getColor(SeatAction.HOVER));
            //this.global.zoomManager.zoomDisable();
        });
        this.global.eventManager.addEventListener(EventType.MOUSELEAVE_SEAT, (seat: SeatItem) => {
            seat.setColor(seat.getColor());
            //this.global.zoomManager.zoomEnable();
        });

        return this;
    }


    async update(): Promise<this> {
        // add seat items in blockItem container
        const seatShape = this.global.config.style.seat.shape || "auto";
        const svgUrl = this.global.config.style.seat.svg;
        const useSvg = !!svgUrl && (seatShape === "auto" || seatShape === "svg");
        
        // If SVG file path is provided, extract path and use path-based rendering
        if (useSvg && svgUrl) {
            try {
                const svgContent = await TextLoad(svgUrl);
                const extracted = extractSvgPath(svgContent);
                
                if (extracted) {
                    // Convert SVG file to path-based shape for consistent rendering
                    this.global.config.style.seat.path = extracted.path;
                    this.global.config.style.seat.path_box = extracted.viewBox;
                    // Permanently set to path shape (don't restore)
                    this.global.config.style.seat.shape = "path";
                    // Clear SVG url to prevent re-extraction
                    this.global.config.style.seat.svg = null;
                    
                    for (const seat of this.item.seats) {
                        await this.addChild(new SeatItem(this, seat, null), {id: seat.id})
                    }
                } else {
                    // Fallback to circle if extraction fails
                    console.warn("Could not extract path from SVG, using circle");
                    for (const seat of this.item.seats) {
                        await this.addChild(new SeatItem(this, seat, null), {id: seat.id})
                    }
                }
            } catch (error) {
                console.error("Error loading SVG file:", error);
                // Fallback to circle
                for (const seat of this.item.seats) {
                    await this.addChild(new SeatItem(this, seat, null), {id: seat.id})
                }
            }
        } else {
            // Normal rendering (no SVG file)
            for (const seat of this.item.seats) {
                await this.addChild(new SeatItem(this, seat, null), {id: seat.id})
            }
        }
        
        await this.updateChilds();
        return this;
    }

    // Getting seat method
    // ex: seatmap.stage.blocks.getBlock(2).seats.getSeat("1-1")
    public getSeat(id: any): SeatItem {
        return this.child_items.find((seat: SeatItem) => seat.item.id == id);
    }

    // Getting seats method
    // ex: seatmap.stage.blocks.getBlock(2).seats.getSeat("1-1")
    public getSeats(): Array<SeatItem> {
        return this.child_items;
    }

    public getSeatsCount(): number {
        return this.child_items.length;
    }

    public getSeatByIndex(index: number): SeatItem {
        return this.child_items[index];
    }

    public resetSeatsColors(animation: boolean = false) {
        for (let i = 0; i < this.getSeatsCount(); i++) {
            let _seat = this.getSeatByIndex(i);
            let _item: SeatModel = _seat.item;

            let color = _seat.getColor();

            if (!_seat.isSelected() && _seat.isSalable()) {
                color = _seat.getColor(SeatAction.LEAVE);
                _seat.setColor(color, animation);
            }
        }
    }
}
