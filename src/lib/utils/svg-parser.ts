/*
 * svg-parser.ts
 * SVG Path Extraction Utility
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

export interface SvgPathData {
    path: string;
    viewBox: string;
}

/**
 * Extract path data from SVG content
 * Supports: <path>, <polygon>, <polyline>, <rect>, <circle>
 */
export function extractSvgPath(svgContent: string): SvgPathData | null {
    try {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
        
        // Check for parse errors
        const parseError = svgDoc.querySelector("parsererror");
        if (parseError) {
            console.error("Invalid SVG file");
            return null;
        }
        
        // Extract SVG element
        const svgElement = svgDoc.querySelector("svg");
        if (!svgElement) {
            console.error("No SVG element found");
            return null;
        }
        
        // Extract viewBox
        let viewBox = svgElement.getAttribute("viewBox");
        if (!viewBox) {
            // Try to get from width/height
            const width = svgElement.getAttribute("width") || "24";
            const height = svgElement.getAttribute("height") || "24";
            viewBox = `0 0 ${parseFloat(width)} ${parseFloat(height)}`;
        }
        
        // Extract path data - try multiple strategies
        let pathData = "";
        
        // Strategy 1: Find first <path> element
        const pathElement = svgElement.querySelector("path");
        if (pathElement) {
            pathData = pathElement.getAttribute("d") || "";
        }
        
        // Strategy 2: If multiple paths, combine them
        if (!pathData) {
            const allPaths = svgElement.querySelectorAll("path");
            if (allPaths.length > 0) {
                pathData = Array.from(allPaths)
                    .map(p => p.getAttribute("d"))
                    .filter(d => d)
                    .join(" ");
            }
        }
        
        // Strategy 3: Look for polygon/polyline/rect/circle and convert
        if (!pathData) {
            const polygon = svgElement.querySelector("polygon");
            const polyline = svgElement.querySelector("polyline");
            const rect = svgElement.querySelector("rect");
            const circle = svgElement.querySelector("circle");
            
            if (polygon) {
                const points = polygon.getAttribute("points");
                pathData = `M${points}Z`;
            } else if (polyline) {
                const points = polyline.getAttribute("points");
                pathData = `M${points}`;
            } else if (rect) {
                const x = parseFloat(rect.getAttribute("x") || "0");
                const y = parseFloat(rect.getAttribute("y") || "0");
                const w = parseFloat(rect.getAttribute("width") || "0");
                const h = parseFloat(rect.getAttribute("height") || "0");
                pathData = `M${x},${y}h${w}v${h}h${-w}Z`;
            } else if (circle) {
                const cx = parseFloat(circle.getAttribute("cx") || "0");
                const cy = parseFloat(circle.getAttribute("cy") || "0");
                const r = parseFloat(circle.getAttribute("r") || "0");
                // Approximate circle with path
                pathData = `M${cx-r},${cy}a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 ${-r*2},0`;
            }
        }
        
        if (!pathData) {
            console.error("Could not extract path data from SVG");
            return null;
        }
        
        return {
            path: pathData,
            viewBox: viewBox
        };
        
    } catch (error) {
        console.error("Error parsing SVG:", error);
        return null;
    }
}
