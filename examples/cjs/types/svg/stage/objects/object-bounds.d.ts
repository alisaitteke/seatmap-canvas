import { ObjectData } from "@model/object.model";
export interface ObjectBounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}
export declare function objectBounds(object: ObjectData): ObjectBounds | null;
