import { SectionObjectData } from "@model/object.model";
import { ObjectItem } from "./object-item.base";
import type Objects from "./objects.index";
export declare class SectionItem extends ObjectItem {
    item: SectionObjectData;
    private shape;
    constructor(parent: Objects, item: SectionObjectData);
    update(): this;
    protected refreshStroke(): void;
    private buildCaption;
}
