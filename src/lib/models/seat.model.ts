/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import BlockModel from "@model/block.model";
import ModelBase from "@model/model.base";
import {SeatItem} from "@svg/stage/blocks/block-item/seat/seat-item.index";

export default class SeatModel extends ModelBase {
    id: any;
    x: number;
    y: number;
    title?: string;
    selected: boolean;
    color: string;
    block: BlockModel;
    salable: boolean;
    note?: string;
    tags: Array<string> = [];
    tag_index: any = {};
    custom_data?: any;
    svg: SeatItem | null;
    icon?: string | null;

    // public item_type: string = "Seat";


    constructor(item: any) {
        super();
        this.id = item.id;
        this.x = item.x;
        this.y = item.y;
        this.title = item.title || null;
        this.color = item.color || null;
        this.block = item.block;
        this.note = item.note || null;
        this.salable = item.salable === false ? item.salable : true;
        this.selected = item.selected || false;
        this.tags = item.tags || [];
        this.custom_data = item.custom_data || {};
        this.tag_index = {};
        this.svg = null
        this.icon = null
    }

    public selectedToggle(): boolean {
        this.selected = this.selected !== true;
        return this.selected;
    }


    public addTag(tag: string) {
        if (!this.tag_index[tag]) {
            this.tag_index[tag] = true;
            this.tags.push(tag);
        }
    }

    public removeTags(tag: string) {

    }

    public toJson() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            salable: this.salable,
            note: this.note,
            color: this.color,
            block: this.block.toJson()
        }
    }
}
