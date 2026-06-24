import SeatModel from "@model/seat.model";
import LabelModel from "@model/label.model";
import ModelBase from "@model/model.base";
export default class BlockModel extends ModelBase {
    id: string;
    seats: Array<SeatModel>;
    labels: Array<LabelModel>;
    title: String;
    bounds: any;
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    border_color: string;
    bbox: any;
    zoom_bbox: any;
    rotate: number;
    gap: number;
    background_image?: string | null;
    background_opacity?: number;
    background_fit?: 'cover' | 'contain' | 'fill' | 'none';
    background_x?: number | null;
    background_y?: number | null;
    background_width?: number | null;
    background_height?: number | null;
    constructor(item: any);
    toJson(): {
        id: string;
        title: String;
        x: number;
        y: number;
        color: string;
        width: number;
        height: number;
    };
}
