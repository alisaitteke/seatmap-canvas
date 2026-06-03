import BlockModel from "@model/block.model";
import { FloorData, ObjectData, FocalPointData } from "@model/object.model";
export default class FloorModel {
    id: string;
    displayName: string | null;
    blocks: Array<BlockModel>;
    objects: Array<ObjectData>;
    focalPoint: FocalPointData | null;
    backgroundImage: string | null;
    constructor(init: {
        id: string;
        displayName?: string | null;
        blocks?: Array<BlockModel>;
        objects?: Array<ObjectData>;
        focalPoint?: FocalPointData | null;
        backgroundImage?: string | null;
    });
    label(): string;
    toJson(): FloorData;
}
