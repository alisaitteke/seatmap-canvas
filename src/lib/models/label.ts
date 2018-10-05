/*
  index.ts - seatmap canvas ui label class
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

export class LabelClass {
    private _x: number;
    private _y: number;
    private _title: string;

    private _block: Block;

    constructor(item: any) {
        this.x = item.x;
        this.y = item.y;
        this.title = item.title;
        this.block = item.block;
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

    get block(): Block {
        return this._block;
    }

    set block(value: Block) {
        this._block = value;
    }
}