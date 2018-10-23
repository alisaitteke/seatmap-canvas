/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


import BlockModel from "./block.model";
import ModelBase from "./model.base";

export default class SeatModel extends ModelBase {
    private _id: any;
    private _x: number;
    private _y: number;
    private _title?: string;
    private _selected: boolean;

    private _color: string;
    private _block: BlockModel;
    private _salable: boolean;
    private _note: string;

    private _tags: Array<string>;
    private _tag_index: any = {};

    private _custom_data: any;

    public item_type: string = "Seat";


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
        this._tag_index = {};
    }

    public selectedToggle(): boolean {
        if (this.selected === true) {
            this.selected = false;
        } else {
            this.selected = true;
        }
        return this.selected;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    get block(): BlockModel {
        return this._block;
    }

    set block(value: BlockModel) {
        this._block = value;
    }

    get salable(): boolean {
        return this._salable;
    }

    set salable(value: boolean) {
        this._salable = value;
    }

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }

    get id(): any {
        return this._id;
    }

    set id(value: any) {
        this._id = value;
    }


    get tags(): Array<string> {
        return this._tags;
    }

    set tags(value: Array<string>) {
        this._tags = value;
    }

    public addTag(tag: string) {
        if (!this._tag_index[tag]) {
            this._tag_index[tag] = true;
            this.tags.push(tag);
        }
    }

    public removeTags(tag: string) {

    }

    get tag_index(): any {
        return this._tag_index;
    }

    set tag_index(value: any) {
        this._tag_index = value;
    }


    get custom_data(): any {
        return this._custom_data;
    }

    set custom_data(value: any) {
        this._custom_data = value;
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