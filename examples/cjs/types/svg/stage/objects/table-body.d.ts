import SvgBase from "@svg/svg.base";
import type { Point2D } from "@model/object.model";
import type { TableStyle } from "@model/styles/table.style";
import { ObjectItemCircle } from "./object-item.circle";
import { ObjectItemRect } from "./object-item.rect";
export interface TableBodyDescriptor {
    shape: 'round' | 'rect';
    center: Point2D;
    radius?: number;
    width?: number;
    height?: number;
    corner_radius?: number;
    rotation?: number;
    label?: string | null;
    label_shown?: boolean;
}
export interface TableBodyColors {
    fill: string;
    stroke: string;
}
export declare function drawTableBody(parent: SvgBase, table: TableBodyDescriptor, style: TableStyle, colors: TableBodyColors): ObjectItemCircle | ObjectItemRect;
