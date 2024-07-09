import {PretixModel} from "@/converters/pretix/pretix.model";
import {ConverterBase} from "@/converters/converter.base";

export class PretixConverter extends ConverterBase {

    private jsonModel: PretixModel;
    constructor() {
        super()
    }

    parse(jsonModel: PretixModel) {

    }


}