import SvgBase from "@svg/svg.base";
import type { ObjectItem } from "./object-item.base";
export declare class ObjectItemRect extends SvgBase {
    parent: ObjectItem;
    constructor(parent: ObjectItem, attrs: Record<string, string | number>);
    setStroke(color: string, width?: number): this;
    update(): this;
}
