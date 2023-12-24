/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2018 Ali Sait TEKE
 */


import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import SeatModel from "../../../../../models/seat.model";
import Seats from "../block-item.seats.index";
import {SeatItemCircle} from "./seat-item.circle";
import {CoordinateModel} from "../../../../../models/coordinate.model";
import {SeatItemTitle} from "./seat-item.title";
import {SeatAction} from "../../../../../enums/global";
import {SeatItemCheck} from "./seat-item.check";


@dom({
    tag: "g",
    class: "seat",
    autoGenerate: false
})
export class SeatItem extends SvgBase {

    public circle: SeatItemCircle;
    public title: SeatItemTitle;
    public coordinates: CoordinateModel;
    public check: SeatItemCheck;

    constructor(public parent: Seats, public item: SeatModel) {
        super(parent);
        this.coordinates = new CoordinateModel(item);
        this.attr("transform", "translate(" + this.coordinates.toArray() + ")");
        this.item.svg = this;
        return this;
    }

    public setColor(color: string, animation: boolean = false): this {
        if (animation) {
            this.circle.node.transition().duration(this.global.config.animation_speed).attr("fill", color);
        } else {
            this.circle.node.attr("fill", color);
        }

        return this;
    }

    public updateColor(color: string | null = null): this {
        this.setColor(this.getColor());
        return this;
    }

    public select(color: string | null = null): this {
        this.item.selected = true;
        this.node.classed("selected", true);
        this.circle.node.attr("fill", this.global.config.style.seat.selected);
        this.check.show();
        return this;
    }

    public unSelect(): this {
        this.item.selected = false;
        this.node.classed("selected", false);
        this.circle.node.attr("fill", this.global.config.style.seat.color);
        this.check.hide();
        return this;
    }

    public isSelected(): Boolean {
        return this.item.selected;
    }

    public isSalable(): Boolean {
        return this.item.salable;
    }

    public hover() {
        this.setColor(this.global.config.style.seat.hover);
    }

    public blur() {
        this.setColor(this.getColor());
    }

    public getColor(action: SeatAction| null = null): string {

        if (this.isSalable()) {

            if (action == SeatAction.FOCUS) {
                if (this.isSelected()) {
                    return this.global.config.style.seat.focus_out;
                } else {
                    return this.global.config.style.seat.focus;
                }

            } else if (action == SeatAction.HOVER) {
                if (this.isSelected()) {
                    return this.global.config.style.seat.selected;
                } else {
                    return this.global.config.style.seat.hover;
                }
            }
            else if (action == SeatAction.LEAVE) {
                if (this.isSelected()) {
                    return this.global.config.style.seat.selected;
                } else {
                    return this.global.config.style.seat.color;
                }
            }
            else if (action == SeatAction.SELECT) {
                if (this.isSelected()) {
                    return this.global.config.style.seat.selected;
                } else {
                    return this.global.config.style.seat.selected;
                }
            } else {
                if (this.isSelected()) {
                    return this.global.config.style.seat.selected;
                } else {
                    return this.global.config.style.seat.color;
                }
            }

        } else {
            return this.global.config.style.seat.not_salable;
        }

    }

    update(): this {
        this.circle = new SeatItemCircle(this);
        this.addChild(this.circle);


        this.check = new SeatItemCheck(this).addTo(this);



        // this.title = new SeatItemTitle(this);
        // this.addChild(this.title);


        this.updateChilds();

        //this.title.node.text(this.item.title);

        return this;
    }

    afterGenerate(){
        this.setColor(this.getColor());
        if(this.item.selected){
            this.check.show()
        }else{
            this.check.hide()
        }

    }
}
