/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

enum BLOCK_EVENT {

}


export enum EventType {
    ADD_BLOCK = "BLOCK.ADD",
    REMOVE_BLOCK = "BLOCK.REMOVE",
    CLICK_BLOCK = "BLOCK.CLICK",
    UPDATE_BLOCK = "BLOCK.UPDATE",
    CLICK_SEAT = "SEAT.CLICK",
    ADD_SEAT = "SEAT.ADD",
    REMOVE_SEAT = "SEAT.REMOVE",
    ZOOM_LEVEL_CHANGE = "ZOOM_LEVEL_CHANGE",
    BOUND_CLICK = "BOUND.CLICK"
}

export enum ZoomLevel {
    VENUE = "VENUE",
    BLOCK = "BLOCK",
    SEAT = "SEAT"
}