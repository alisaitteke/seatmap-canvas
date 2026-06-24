import { TableObjectData } from "@model/object.model";
import { ObjectItem } from "./object-item.base";
import type Objects from "./objects.index";
export declare class TableItem extends ObjectItem {
    item: TableObjectData;
    private body;
    constructor(parent: Objects, item: TableObjectData);
    update(): this;
    protected refreshStroke(): void;
}
