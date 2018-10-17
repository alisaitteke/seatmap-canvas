/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import {dom} from "../../decorators";
import SvgBase from "../svg.base";

import Circle from "./search-circle/circle";
import {EventType, ZoomLevel} from "../../enums/global";
import Stage from "./stage.index";

@dom({
    tag: "g",
    class: "tooltip",
    autoGenerate: false
})
export default class BlocksTooltip extends SvgBase {


    public circle: Circle;

    constructor(public parent: Stage) {
        super(parent);


        return this;
    }

    update(): this {
        this.updateChilds();
        return this;
    }
}