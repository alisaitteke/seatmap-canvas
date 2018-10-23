/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../decorators";
import SvgBase from "./svg.base";
import Svg from "./svg.index";
import LegendItem from "./legend/legend.item";

@dom({
    tag: "g",
    class: "legend",
    autoGenerate: false
})
export default class Legend extends SvgBase {


    constructor(public parent: Svg) {
        super(parent);
    }

    update() {

        let legend_data: Array<any> = [];

        legend_data.push({
            title: this.global.config.lang.non_selectable,
            color: this.global.config.seat_style.not_salable
        });
        legend_data.push({
            title: this.global.config.lang.selectable,
            color: this.global.config.seat_style.color
        });
        legend_data.push({
            title: this.global.config.lang.your_selection,
            color: this.global.config.seat_style.selected
        });

        for (let i = 0; i < legend_data.length; i++) {
            let legend: LegendItem = new LegendItem(this, legend_data[i]);
            this.addChild(legend);
        }

        this.updateChilds()
    }

    afterGenerate() {

        let x = this.global.config.legend_style.radius * 2;
        let y = 150 - (this.global.config.legend_style.padding * this.getChildCount());
        this.node.attr("transform", "translate(" + [x, y] + ")");
    }
}