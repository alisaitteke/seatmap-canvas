/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */



import BlockModel from "./block.model";
import ModelBase from "./model.base";

export default class LabelModel extends ModelBase {
    x: number;
    y: number;
    title: string;

    block: BlockModel;

    constructor(item: any) {
        super();
        this.x = item.x;
        this.y = item.y;
        this.title = item.title;
        this.block = item.block;
    }
}