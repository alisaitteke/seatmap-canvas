/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import SeatModel from "../../../../../models/seat.model";
import Seats from "../block-item.seats.index";
import {LabelItemCircle} from "./label-item.circle";
import {CoordinateModel} from "../../../../../models/coordinate.model";
import {EventType, ZoomLevel} from "../../../../../enums/global";
import Labels from "../block-item.labels.index";
import LabelModel from "../../../../../models/label.model";
import {LabelItemTitle} from "./label-item.title";


@dom({
    tag: "g",
    class: "label",
    autoGenerate: false
})
export class LabelItem extends SvgBase {

    public circle: LabelItemCircle;
    public coordinates: CoordinateModel;

    constructor(public parent: Labels, public item: LabelModel) {
        super(parent);
        this.coordinates = new CoordinateModel(item);
        this.attr("transform", "translate(" + this.coordinates.toArray() + ")");
        return this;
    }


    update(): this {
        this.circle = new LabelItemCircle(this);
        this.addChild(this.circle);

        this.circle = new LabelItemTitle(this);
        this.addChild(this.circle);

        this.updateChilds();

        this.circle.node.text(this.item.title);
        return this;
    }
}