import { PretixModel } from "@/converters/pretix/pretix.model";
import BlockModel from "@model/block.model";
export declare abstract class ParserBase {
    code: string;
    constructor();
    parse(jsonModel: PretixModel): BlockModel[];
}
