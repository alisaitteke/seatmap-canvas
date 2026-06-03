import type { BlockTableData, Point2D } from "@model/object.model";
export default class TableModel {
    id?: string;
    shape: 'round' | 'rect';
    center: Point2D;
    radius?: number;
    width?: number;
    height?: number;
    corner_radius?: number;
    rotation: number;
    color?: string;
    label: string | null;
    label_shown: boolean;
    constructor(item: BlockTableData);
    toJson(): BlockTableData;
}
