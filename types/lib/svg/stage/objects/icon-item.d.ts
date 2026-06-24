import { IconObjectData } from "@model/object.model";
import { ObjectItem } from "./object-item.base";
import type Objects from "./objects.index";
export declare class IconItem extends ObjectItem {
    item: IconObjectData;
    private tile;
    constructor(parent: Objects, item: IconObjectData);
    update(): this;
    protected refreshStroke(): void;
    private caption;
}
