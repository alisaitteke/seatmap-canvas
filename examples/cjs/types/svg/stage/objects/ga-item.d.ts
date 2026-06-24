import { GaObjectData } from "@model/object.model";
import { ObjectItem } from "./object-item.base";
import type Objects from "./objects.index";
export declare class GaItem extends ObjectItem {
    item: GaObjectData;
    private shape;
    constructor(parent: Objects, item: GaObjectData);
    update(): this;
    protected refreshStroke(): void;
    private buildCaption;
}
