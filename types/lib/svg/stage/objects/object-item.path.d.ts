import SvgBase from "@svg/svg.base";
import type { ObjectItem } from "./object-item.base";
export declare class ObjectItemPath extends SvgBase {
    parent: ObjectItem;
    d: string;
    constructor(parent: ObjectItem, d: string, attrs: Record<string, string | number>);
    setStroke(color: string, width?: number): this;
    update(): this;
}
