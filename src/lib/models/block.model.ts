/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import SeatModel from "@model/seat.model";
import LabelModel from "@model/label.model";
import TableModel from "@model/table.model";
import ModelBase from "@model/model.base";


export default class BlockModel extends ModelBase {
    id: string;
    seats: Array<SeatModel>;
    labels: Array<LabelModel>;
    tables: Array<TableModel>;
    title: String;
    bounds: any;
    auto_bounds?: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    border_color: string;
    bbox: any;
    zoom_bbox: any;
    rotate: number;
    gap: number;
    background_image?: string | null;
    background_opacity?: number;
    background_fit?: 'cover' | 'contain' | 'fill' | 'none';
    background_x?: number | null;
    background_y?: number | null;
    background_width?: number | null;
    background_height?: number | null;

    constructor(item: any) {
        super();
        this.id = item.id ? item.id : (Math.random() * 1000).toString();
        this.width = item.width || null;
        this.height = item.height || null;
        this.x = item.x || null;
        this.y = item.y || null;
        this.bounds = item._bounds || [];
        // Explicit auto/manual background contract. `true` forces the renderer
        // to recompute the convex hull (ignoring `_bounds`); `false` forces it
        // to honor `_bounds` verbatim; `undefined` keeps the legacy heuristic
        // (presence of `_bounds` decides).
        this.auto_bounds = typeof item.auto_bounds === "boolean" ? item.auto_bounds : undefined;
        this.color = item.color || "#f1f1f1";
        this.border_color = item.border_color || "#f1f1f1";
        this.title = item.title;
        this.rotate = item.rotate || 0;
        this.gap = item.gap || 12;
        this.background_image = item.background_image || null;
        this.background_opacity = item.background_opacity !== undefined ? item.background_opacity : 1;
        this.background_fit = item.background_fit || 'cover';
        this.background_x = item.background_x !== undefined ? item.background_x : null;
        this.background_y = item.background_y !== undefined ? item.background_y : null;
        this.background_width = item.background_width || null;
        this.background_height = item.background_height || null;

        // Defensive: `labels` and `seats` are documented as optional in
        // `BlockData`, but the original implementation called `.map` directly
        // and crashed with "Cannot read properties of undefined (reading 'map')"
        // whenever a consumer omitted them.
        const rawLabels: Array<any> = Array.isArray(item.labels) ? item.labels : [];
        const rawSeats: Array<any> = Array.isArray(item.seats) ? item.seats : [];
        const rawTables: Array<any> = Array.isArray(item.tables) ? item.tables : [];

        this.labels = rawLabels.map((labelItem: any) => {
            labelItem.block = this;
            return new LabelModel(labelItem);
        });

        this.seats = rawSeats.map((seatItem: any) => {
            seatItem.block = this;
            return new SeatModel(seatItem);
        });

        // Block-local table bodies (round/rect). Optional and additive: blocks
        // without tables keep the convex-hull rendering.
        this.tables = rawTables.map((tableItem: any) => new TableModel(tableItem));
    }



    toJson() {
        return {
            id: this.id,
            title: this.title,
            x: this.x,
            y: this.y,
            color: this.color,
            width: this.width,
            height: this.height,
            tables: this.tables.map((table: TableModel) => table.toJson())

        }
    }
}
