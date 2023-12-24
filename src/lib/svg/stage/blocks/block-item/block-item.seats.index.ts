/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import SvgBase from "../../../svg.base";
import {dom} from "../../../../decorators/dom";
import Block from "./block-item.index";
import SeatModel from "../../../../models/seat.model";
import {SeatItem} from "./seat/seat-item.index";
import BlockModel from "../../../../models/block.model";
import {EventType, SeatAction} from "../../../../enums/global";


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
            seat.setColor(seat.getColor(SeatAction.HOVER));
            //this.global.zoomManager.zoomDisable();
        });
        this.global.eventManager.addEventListener(EventType.MOUSELEAVE_SEAT, (seat: SeatItem) => {
            seat.setColor(seat.getColor());
            //this.global.zoomManager.zoomEnable();
        });

        return this;
    }

    update(): this {
        // add seat items in blockItem container
        this.item.seats.forEach((seat: SeatModel) => {
            this.addChild(new SeatItem(this, seat), {id: seat.id})
        });
        this.updateChilds();
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
