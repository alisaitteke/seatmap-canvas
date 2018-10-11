/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import SvgBase from "../../../../svg.base";
import {dom} from "../../../../../decorators/dom";
import BlockBounds from "../block-item.bounds";
import BlockModel from "../../../../../models/block.model";
import BlockMask from "../block-item.mask";


@dom({
    tag: "path",
    class: "bound",
    autoGenerate: false
})
export class BoundItem extends SvgBase {


    constructor(public parent: BlockBounds|BlockMask, public item: BlockModel) {
        super(parent);
    }

    show(){
        this.node.classed("bound-hide",false);
    }

    hide(){
        this.node.classed("bound-hide",true);
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