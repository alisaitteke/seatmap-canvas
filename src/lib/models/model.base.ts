/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

export default class ModelBase {
    private _child_index: number = null;
    private _item_type: string;

    constructor() {

    }


    get child_index(): number {
        return this._child_index;
    }

    set child_index(value: number) {
        this._child_index = value;
    }


    get item_type(): string {
        return this._item_type;
    }

    set item_type(value: string) {
        this._item_type = value;
    }
}