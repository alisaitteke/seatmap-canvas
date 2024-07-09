import {PretixModel} from "@/converters/pretix/pretix.model";
import BlockModel from "@model/block.model";

export abstract class ParserBase {
    code: string

    constructor() {
    }

    parse(jsonModel: PretixModel): BlockModel[] {
        return []
    }
}