import {PretixModel} from "@/converters/pretix/pretix.model";

export class ConverterBase {
    constructor() {
    }

    parse(jsonModel: PretixModel){}
}