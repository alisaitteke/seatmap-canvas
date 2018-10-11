/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import BlockBounds from "../block-item.bounds";
import BlockModel from "../../../../../models/block.model";


@dom({
    tag: "path",
    class: "bound",
    autoGenerate: false
})
export class BoundItem extends SvgBase {


    constructor(public parent: BlockBounds, public item: BlockModel) {
        super(parent);
    }

    update(): this {
        this.updateChilds();
        this.node
            .datum(this.item.bounds)
            .attr("d", function (d: any) {
                return "M" + d.join("L") + "Z";
            });
        return this;
    }
}