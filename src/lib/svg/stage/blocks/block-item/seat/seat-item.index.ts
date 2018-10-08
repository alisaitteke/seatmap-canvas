/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import SeatModel from "../../../../../models/seat.model";
import {BlockItemSeats} from "../block-item.seats.index";
import {SeatItemCircle} from "./seat-item.circle";
import {CoordinateModel} from "../../../../../models/coordinate.model";


@dom({
    tag: "g",
    class: "seat",
    autoGenerate: false
})
export class SeatItem extends SvgBase {

    public circle: SeatItemCircle;
    public coordinates: CoordinateModel;

    constructor(public parent: BlockItemSeats, public item: SeatModel) {
        super(parent);
        this.coordinates = new CoordinateModel(item);
        //console.log(this.node);
        this.attr("transform", this.getTransform());

        return this;
    }

    getTransform(): string {
        return "translate(" + this.coordinates.toArray() + ")";
    }

    update(): this {
        this.circle = new SeatItemCircle(this);
        this.addChild(this.circle);
        this.updateChilds();
        return this;
    }
}