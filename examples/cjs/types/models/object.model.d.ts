export interface Point2D {
    x: number;
    y: number;
}
export type ObjectType = 'section' | 'ga' | 'table' | 'booth' | 'shape' | 'icon' | 'text';
export interface ObjectDataBase {
    id: string;
    type: ObjectType;
    selectable?: boolean;
    selected?: boolean;
    custom_data?: any;
}
export interface SectionObjectData extends ObjectDataBase {
    type: 'section';
    path: string;
    center: Point2D;
    color?: string;
    label?: string | null;
    label_shown?: boolean;
    label_size?: number | null;
    seat_count?: number;
}
export interface GaObjectData extends ObjectDataBase {
    type: 'ga';
    path: string;
    center: Point2D;
    color?: string;
    fill_opacity?: number;
    rotation?: number;
    label?: string | null;
    label_shown?: boolean;
    capacity?: number;
}
export interface TableObjectData extends ObjectDataBase {
    type: 'table';
    shape: 'round' | 'rect';
    center: Point2D;
    radius?: number;
    width?: number;
    height?: number;
    corner_radius?: number;
    rotation?: number;
    color?: string;
    label?: string | null;
    label_shown?: boolean;
}
export interface BlockTableData {
    id?: string;
    shape: 'round' | 'rect';
    center: Point2D;
    radius?: number;
    width?: number;
    height?: number;
    corner_radius?: number;
    rotation?: number;
    color?: string;
    label?: string | null;
    label_shown?: boolean;
}
export interface BoothObjectData extends ObjectDataBase {
    type: 'booth';
    center: Point2D;
    width: number;
    height: number;
    corner_radius?: number;
    rotation?: number;
    color?: string;
    label?: string | null;
}
export interface ShapeObjectData extends ObjectDataBase {
    type: 'shape';
    path: string;
    center: Point2D;
    fill?: string;
    stroke?: string | null;
    stroke_width?: number;
    rotation?: number;
    layer?: 'background' | 'foreground';
}
export interface IconObjectData extends ObjectDataBase {
    type: 'icon';
    center: Point2D;
    size: number;
    rotation?: number;
    color?: string;
    opacity?: number;
    content?: string;
    caption?: string;
}
export interface TextObjectData extends ObjectDataBase {
    type: 'text';
    origin: Point2D;
    text: string;
    font_size: number;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    rotation?: number;
}
export type ObjectData = SectionObjectData | GaObjectData | TableObjectData | BoothObjectData | ShapeObjectData | IconObjectData | TextObjectData;
export interface FocalPointData extends Point2D {
}
export type MultiFloorView = 'stage' | 'isometric';
export interface FloorData {
    id: string;
    display_name?: string;
    blocks: any[];
    objects?: ObjectData[];
    focal_point?: FocalPointData | null;
    background_image?: string | null;
}
export interface CanvasChartData {
    blocks?: any[];
    objects?: ObjectData[];
    focal_point?: FocalPointData | null;
    floors?: FloorData[];
    multi_floor_view?: MultiFloorView;
}
