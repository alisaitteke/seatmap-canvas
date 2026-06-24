import { BoothObjectData } from "@model/object.model";
import { ObjectItem } from "./object-item.base";
import type Objects from "./objects.index";
export declare class BoothItem extends ObjectItem {
    item: BoothObjectData;
    private body;
    constructor(parent: Objects, item: BoothObjectData);
    update(): this;
    protected refreshStroke(): void;
}
