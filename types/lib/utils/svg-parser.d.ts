export interface SvgPathData {
    path: string;
    viewBox: string;
}
export declare function extractSvgPath(svgContent: string): SvgPathData | null;
