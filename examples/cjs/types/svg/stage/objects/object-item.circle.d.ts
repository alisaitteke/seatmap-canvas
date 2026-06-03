import SvgBase from "@svg/svg.base";
export declare class ObjectItemCircle extends SvgBase {
    parent: SvgBase;
    constructor(parent: SvgBase, attrs: Record<string, string | number>);
    setStroke(color: string, width?: number): this;
    update(): this;
}
