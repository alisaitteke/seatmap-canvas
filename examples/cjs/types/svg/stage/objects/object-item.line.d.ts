import SvgBase from "@svg/svg.base";
import type { ObjectItem } from "./object-item.base";
export declare class ObjectItemLine extends SvgBase {
    parent: ObjectItem;
    constructor(parent: ObjectItem, attrs: Record<string, string | number>);
    update(): this;
}
