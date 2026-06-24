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
