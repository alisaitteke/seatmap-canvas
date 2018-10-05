/*
  index.ts - seatmap canvas seat model
  Copyright (C) 2018  Ali Sait TEKE
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


import {Block} from "./block";

export class SeatClass {
    private _id: any;
    private _x: number;
    private _y: number;
    private _title?: string;
    private _selected: boolean;

    private _color: string;
    private _block: Block;
    private _salable: boolean;
    private _note: string;

    private _tags: Array<string>;
    private _tag_index: any = {};


    constructor(item: any) {

        this.id = item.id;
        this.x = item.x;
        this.y = item.y;
        this.title = item.title || null;
        this.color = item.color || null;
        this.block = item.block;
        this.note = item.note || null;
        this.salable = item.salable;
        this.selected = false;
        this.tags = item.tags || [];
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

    get block(): Block {
        return this._block;
    }

    set block(value: Block) {
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