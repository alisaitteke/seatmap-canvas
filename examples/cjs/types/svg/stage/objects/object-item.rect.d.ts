import SvgBase from "@svg/svg.base";
export declare class ObjectItemRect extends SvgBase {
    parent: SvgBase;
    constructor(parent: SvgBase, attrs: Record<string, string | number>);
    setStroke(color: string, width?: number): this;
    update(): this;
}
