/// <reference types="react" />
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import DefaultsModel from '../lib/models/defaults.model';
import type { Point2D, ObjectData, FocalPointData } from '../lib/models/object.model';
export type { Point2D, ObjectType, ObjectDataBase, SectionObjectData, GaObjectData, TableObjectData, BoothObjectData, ShapeObjectData, IconObjectData, TextObjectData, ObjectData, FocalPointData, } from '../lib/models/object.model';
export interface SeatmapOptions extends Partial<DefaultsModel> {
    [key: string]: any;
}
export interface SeatClickEvent {
    id: string;
    x: number;
    y: number;
    color: string;
    salable: boolean;
    custom_data?: any;
    note?: string;
    tags?: any;
    title?: string;
    isSelected: () => boolean;
    select: () => void;
    unSelect: () => void;
}
export interface BlockData {
    id: string;
    title: string;
    labels?: any[];
    color?: string;
    seats: SeatData[];
    gap?: number;
    _bounds?: Point2D[];
    rotate?: number;
}
export interface SeatData {
    id: string;
    x: number;
    y: number;
    color?: string;
    salable?: boolean;
    custom_data?: any;
    note?: string;
    tags?: any;
    title?: string;
}
export interface CanvasChart {
    blocks: BlockData[];
    objects?: ObjectData[];
    focal_point?: FocalPointData | null;
}
export interface SeatmapCanvasProps {
    options?: SeatmapOptions;
    data?: BlockData[];
    className?: string;
    style?: React.CSSProperties;
    autoZoomToVenue?: boolean;
    onReady?: (instance: SeatMapCanvas) => void;
    onSeatClick?: (seat: any) => void;
    onSeatSelect?: (seat: any) => void;
    onSeatUnselect?: (seat: any) => void;
    onBlockClick?: (block: any) => void;
    onDataChange?: (data: BlockData[]) => void;
}
export interface UseSeatmapReturn {
    seatmapInstance: SeatMapCanvas | null;
    isReady: boolean;
    selectedSeats: any[];
    containerRef: React.RefObject<HTMLDivElement>;
    loadData: (data: BlockData[]) => void;
    getSelectedSeats: () => any[];
    getSeat: (seatId: string, blockId: string) => any;
    getBlocks: () => any[];
    zoomToBlock: (blockId: string) => void;
    zoomToVenue: () => void;
    addEventListener: (event: string, callback: Function) => void;
}
