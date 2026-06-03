import SvgBase from "@svg/svg.base";
import MultiSelect from "../multi-select";
export default class MultiSelectRect extends SvgBase {
    parent: MultiSelect;
    constructor(parent: MultiSelect);
    update(): void;
}
