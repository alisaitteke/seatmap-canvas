/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../decorators";
import SvgBase from "./svg.base";
import Svg from "./svg.index";
import MultiSelectRect from "./multi-select/rect";
import {EventType} from "../enums/global";

@dom({
    tag: "g",
    class: "multi-select-tools",
    autoGenerate: false
})
export default class MultiSelect extends SvgBase {


    public rect: MultiSelectRect;

    constructor(public parent: Svg) {
        super(parent);


        return this;
    }

    update(): this {

        this.rect = new MultiSelectRect(this).addTo(this);
        this.updateChilds();

        return this;
    }
}