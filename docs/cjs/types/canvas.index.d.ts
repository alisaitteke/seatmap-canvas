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
    registerConverters(): void;
}
