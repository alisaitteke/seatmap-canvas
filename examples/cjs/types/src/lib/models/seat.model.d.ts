import BlockModel from "@model/block.model";
import ModelBase from "@model/model.base";
import { SeatItem } from "@svg/stage/blocks/block-item/seat/seat-item.index";
export default class SeatModel extends ModelBase {
    id: any;
    x: number;
    y: number;
    title?: string;
    selected: boolean;
    color: string;
    block: BlockModel;
    salable: boolean;
    note?: string;
    tags: Array<string>;
    tag_index: any;
    custom_data?: any;
    svg: SeatItem | null;
    icon?: string | null;
    constructor(item: any);
    selectedToggle(): boolean;
    addTag(tag: string): void;
    removeTags(tag: string): void;
    toJson(): {
        id: any;
        x: number;
        y: number;
        salable: boolean;
        note: string | undefined;
        color: string;
        block: {
            id: string;
            title: String;
            x: number;
            y: number;
            color: string;
            width: number;
            height: number;
        };
    };
}
