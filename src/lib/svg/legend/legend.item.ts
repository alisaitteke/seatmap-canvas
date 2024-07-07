/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import {dom} from "@decorator/dom";
import SvgBase from "@svg/svg.base";
import Legend from "@svg/legend";
import LegendCircle from "@svg/legend/legend.circle";
import LegendTitle from "@svg/legend/legend.title";
import LegendModel from "@model/legend.model";

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

        if(this.child_index){
            let x = 0;
            let y = this.child_index * this.global.config.style.legend.padding;

            this.node.attr("transform", "translate(" + [x, y] + ")")
        }



    }


}