import "../scss/style.scss";
import Svg from "@svg/svg.index";
import SeatMapDevTools from "@/dev.tools";
import DataModel from "@model/data.model";
import DefaultsModel from "@model/defaults.model";
import { GlobalModel } from "@model/global.model";
import ZoomManager from "@svg/zoom.manager";
import EventManager from "@svg/event.manager";
import WindowManager from "@/window.manager";
import { ParserBase } from "@/converters/parser.base";
export declare class SeatMapCanvas {
    container_selector: any;
    node: any;
    svg: Svg;
    dev: SeatMapDevTools;
    data: DataModel;
    config: DefaultsModel;
    global: GlobalModel;
    windowManager: WindowManager;
    zoomManager: ZoomManager;
    eventManager: EventManager;
    addEventListener: any;
    parsers: {
        [name: string]: ParserBase;
    };
    constructor(container_selector: any, _config: DefaultsModel);
    reflow(animation?: boolean): this;
    registerConverters(): void;
    goToFloor(floorId: string): this;
    goToAllFloorsView(): this;
    getFloors(): Array<{
        index: number;
        id: string;
        display_name: string;
    }>;
    getCurrentFloor(): {
        index: number;
        id: string | null;
        display_name: string | null;
    };
}
export { CHAIR_WIDTH, CHAIR_STROKE_WIDTH, CHAIR_RADIUS, CHAIR_SPACING, ROW_SPACING, SPACE_PER_CHAIR, SEAT_SELECTED_STROKE_WIDTH, GEOMETRY_DEFAULTS, } from "@model/geometry.constants";
export type { GeometryDefaults } from "@model/geometry.constants";
export { LIGHT_PALETTE, DARK_PALETTE, getPalette } from "@model/theme.palette";
export type { CanvasTheme, CanvasPalette } from "@model/theme.palette";
export type { Point2D, ObjectType, ObjectDataBase, SectionObjectData, GaObjectData, TableObjectData, BoothObjectData, ShapeObjectData, IconObjectData, TextObjectData, ObjectData, FocalPointData, CanvasChartData, FloorData, MultiFloorView, } from "@model/object.model";
