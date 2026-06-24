import { ShapeObjectData } from "@model/object.model";
import { ObjectItem } from "./object-item.base";
import type Objects from "./objects.index";
export declare class ShapeItem extends ObjectItem {
    item: ShapeObjectData;
    private shape;
    constructor(parent: Objects, item: ShapeObjectData);
    update(): this;
    protected refreshStroke(): void;
}
