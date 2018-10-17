/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../decorators";
import SvgBase from "./../svg.base";
import Svg from "../svg.index";
import {EventType} from "../../enums/global";
import Legend from "../legend";
import LegendCircle from "./legend.circle";
import LegendTitle from "./legend.title";
import LegendModel from "../../models/legend.model";

@dom({
    tag: "g",
    class: "legend-item",
    autoGenerate: false
})
export default class LegendItem extends SvgBase {

    public circle: LegendCircle;
    public title: LegendTitle;

    constructor(public parent: Legend, public legend_data: LegendModel) {
        super(parent);

    }

    update() {

        this.circle = new LegendCircle(this);
        this.addChild(this.circle);

        this.title = new LegendTitle(this);
        this.addChild(this.title);

        this.updateChilds();

        this.title.node.text(this.legend_data.title);

        let x = 0;
        let y = this.child_index * this.global.config.legend_style.padding;

        this.node.attr("transform", "translate(" + [x, y] + ")")


    }


}