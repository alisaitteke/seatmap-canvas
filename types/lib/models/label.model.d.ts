import BlockModel from "@model/block.model";
import ModelBase from "@model/model.base";
export default class LabelModel extends ModelBase {
    x: number;
    y: number;
    title: string;
    block: BlockModel;
    constructor(item: any);
}
