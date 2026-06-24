import { TextObjectData } from "@model/object.model";
import { ObjectItem } from "./object-item.base";
import type Objects from "./objects.index";
export declare class TextItem extends ObjectItem {
    item: TextObjectData;
    constructor(parent: Objects, item: TextObjectData);
    update(): this;
    protected refreshStroke(): void;
}
