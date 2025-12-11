import { PretixModel } from "@/converters/pretix/pretix.model";
import { ParserBase } from "@/converters/parser.base";
export declare class PretixParser extends ParserBase {
    name: string;
    constructor();
    parse(jsonModel: PretixModel): any[];
}
