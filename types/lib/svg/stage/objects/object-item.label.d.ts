import SvgBase from "@svg/svg.base";
import type { Point2D } from "@model/object.model";
import type { ObjectItem } from "./object-item.base";
export interface ObjectLabelOptions {
    x: number;
    y: number;
    fill: string;
    font_size: number;
    font_weight: string;
    font_family: string;
    font_style?: string;
    transform?: string;
}
export declare class ObjectItemLabel extends SvgBase {
    parent: ObjectItem;
    constructor(parent: ObjectItem, text: string, options: ObjectLabelOptions);
    update(): this;
}
export declare function labelAt(center: Point2D, offsets?: {
    x?: number;
    y?: number;
}): {
    x: number;
    y: number;
};
