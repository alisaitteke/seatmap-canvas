/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import SvgBase from "@svg/svg.base";

import {dom} from "@decorator/dom";
import {select} from "d3-selection";
import {SeatItem} from "./seat-item.index";
import {SeatItemCustomSvgArea} from "@svg/stage/blocks/block-item/seat/seat-item.custom-area";

@dom({
    tag: "g",
    class: "seat-circle",
    autoGenerate: false
})
export class SeatItemCustomSvg extends SvgBase {

    constructor(public parent: SeatItem, public customSvg: any) {
        super(parent);
        this.attr("transform", `translate(${(this.global.config.style.seat.radius / 2) * -1},-560)`);
        return this;
    }

    update(): this {
        this.updateChilds();
        return this;
    }

    domGenerate(to: any, index: number = 0): this {

        super.domGenerate(to, index);
        const importedSVG = select(this.customSvg.documentElement.cloneNode(true));
        importedSVG.attr('width', this.global.config.style.seat.radius)
        importedSVG.attr('viewBox',`0 0 ${this.global.config.style.seat.radius} ${this.global.config.style.seat.radius}`)

        this.node.node().append(importedSVG.node())


        // const importedElements = Array.from(this.customSvg.documentElement.cloneNode(true).children);
        // console.log('importedElements',importedElements)
        //
        // importedElements.forEach(element => {
        //     this.node.node().appendChild(element); // Her bir öğeyi ekle
        // });

        this.addChild(new SeatItemCustomSvgArea(this))
        return this

    }
}