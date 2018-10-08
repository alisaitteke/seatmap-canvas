/// <reference path="models/index.ts" />
/*
 * index.ts
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import "../scss/style.scss";

declare const window: any;

import * as d3 from 'd3';
import {SvgManager} from "./svg/svg.index";
import SeatMapDevTools from "./dev.tools";
import DataModel from "./models/data.model";
import {DataEventType} from "./enums/global";
import BlockModel from "./models/block.model";


export class SeatMapCanvas {

    public node: any = null;
    public svg: SvgManager;
    public dev: SeatMapDevTools;
    public data: DataModel;

    constructor(public container_selector: any) {
        this.node = d3.select(container_selector);
        this.data = new DataModel();
        this.dev = new SeatMapDevTools(this);
        this.svg = new SvgManager(this);


        // update block daha change trigger
        this.data.addEventListener(DataEventType.ADD_BLOCK, (addedBlocks: Array<BlockModel>) => {
            let blocks = this.data.getBlocks();
            this.svg.stage.blocks.update(blocks);
            console.log(this.svg.stage.blocks.getBlock(2).seats.getSeat("1-1").circle);
        });


    }
}

window['SeatMapCanvas'] = SeatMapCanvas;