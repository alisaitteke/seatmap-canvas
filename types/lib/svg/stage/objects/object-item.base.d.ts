import SvgBase from "@svg/svg.base";
import type { ObjectData } from "@model/object.model";
import type Objects from "./objects.index";
export declare abstract class ObjectItem extends SvgBase {
    parent: Objects;
    item: ObjectData;
    constructor(parent: Objects, item: ObjectData);
    protected fillColor(): string;
    protected selectedStroke(): string;
    protected isSelected(): boolean;
    select(): this;
    unSelect(): this;
    toEventPayload(): ObjectData;
    protected abstract refreshStroke(): void;
    afterGenerate(): void;
}
