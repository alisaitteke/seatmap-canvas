/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import DefaultsModel from "@model/defaults.model";
import DataModel from "@model/data.model";
import {SeatMapCanvas} from "@/canvas.index";
import ZoomManager from "@svg/zoom.manager";
import EventManager from "@svg/event.manager";
import Svg from "@svg/svg.index";
import WindowManager from "@/window.manager";

export interface GlobalModel {
    config: DefaultsModel,
    eventManager: EventManager,
    windowManager:WindowManager,
    data: DataModel,
    root: SeatMapCanvas,
    zoomManager: ZoomManager,
    svg:Svg,
    multi_select:boolean,
    best_available:boolean
}