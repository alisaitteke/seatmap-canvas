/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../decorators";
import SvgBase from "./../svg.base";
import Svg from "../svg.index";
import {EventType} from "../../enums/global";
import Legend from "../legend";
import LegendItem from "./legend.item";

@dom({
    tag: "text",
    class: "legend-title",
    autoGenerate: false
})
export default class LegendTitle extends SvgBase {


    constructor(public parent: LegendItem) {
        super(parent);
    }

    update() {

    }

    afterGenerate(){
        this.node.text(this.parent.legend_data.title);
    }
}