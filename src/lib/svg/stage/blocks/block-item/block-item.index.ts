/*
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import BlocksManager from "../blocks.index";
import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import Seats from "./block-item.seats.index";
import BlockInfo from "./block-item.info.index";
import BlockBounds from "./block-item.bounds";
import {EventType, SeatAction, ZoomLevel} from "@enum/global";
import BlockMask from "./block-item.mask";
import Labels from "./block-item.labels.index";
import BlockModel from "@model/block.model";
import SeatModel from "@model/seat.model";
import BlockBackground from "./block-item.background";
import BlockTables from "./block-item.tables.index";

@dom({
    tag: "g",
    class: "block",
    autoGenerate: false
})
export default class Block extends SvgBase {


    public seats: Seats;
    public labels: Labels;
    public info: BlockInfo;
    public mask: BlockMask;
    public bounds: BlockBounds;
    public tables: BlockTables;
    public background: BlockBackground;

    public center_position: any = {
        x: null,
        y: null
    };
    public top_position: any = {
        x: null,
        y: null
    };

    // `true` when a chart-level `section` polygon (id-linked) backs this block.
    // Section-backed blocks follow the legacy "onlyAfterZoom" drill-down: hidden
    // in the venue overview (the section polygon below is the visual + hit
    // target) and revealed only while this block is the entered one.
    private section_backed: boolean = false;

    /** Whether a chart-level `section` polygon (same id) backs this block. */
    public isSectionBacked(): boolean {
        return this.section_backed;
    }

    constructor(public parent: BlocksManager, public item: BlockModel) {
        super(parent);
        this.attr("id", item.id);
        this.attr("opacity", 0);

        this.global.eventManager.addEventListener(EventType.ZOOM_LEVEL_CHANGE, (levelObject: any) => {
            // `zoomToVenue` can fire before this block's first `update()` finishes.
            if (!this.mask?.blockLevelMask || !this.mask?.seatLevelMask) {
                this.applyDrillDownVisibility(levelObject.level);
                return;
            }
            // Section-backed blocks never use hull masks (the section polygon is
            // the visual); skip show/hide so zoom events stay safe.
            if (!this.section_backed) {
                if (levelObject.level === ZoomLevel.VENUE) {
                    this.mask.blockLevelMask.show();
                    this.mask.seatLevelMask.show();
                    this.seats?.resetSeatsColors(false);
                    this.infosToCenter();
                } else if (levelObject.level === ZoomLevel.BLOCK) {
                    this.mask.blockLevelMask.hide();
                    this.mask.seatLevelMask.show();
                    this.infosToTop();
                } else if (levelObject.level === ZoomLevel.SEAT) {
                    this.mask.blockLevelMask.hide();
                    this.mask.seatLevelMask.hide();
                    this.seats?.resetSeatsColors(false);
                    this.infosToTop();
                }
            } else if (this.seats) {
                this.seats.resetSeatsColors(false);
                if (levelObject.level === ZoomLevel.VENUE) {
                    this.infosToCenter();
                } else {
                    this.infosToTop();
                }
            }
            this.applyDrillDownVisibility(levelObject.level);
        });

        // A section may be entered/exited without a zoom-level change (e.g.
        // clicking an adjacent section while already at block zoom), so react to
        // the drill-down events too.
        this.global.eventManager.addEventListener(EventType.SECTION_ENTER, () => {
            this.applyDrillDownVisibility(this.global.zoomManager.zoomLevel);
        });
        this.global.eventManager.addEventListener(EventType.SECTION_EXIT, () => {
            this.applyDrillDownVisibility(this.global.zoomManager.zoomLevel);
        });

        this.global.eventManager.addEventListener(EventType.MULTI_SELECT_ENABLE, () => {
            this.seats.resetSeatsColors(false);
        });
        this.global.eventManager.addEventListener(EventType.MULTI_SELECT_DISABLE, () => {
            this.seats.resetSeatsColors(false);
        });


        // grid search
        this.global.eventManager.addEventListener(EventType.MOUSEMOVE_BLOCK, (block_item: Block, _datum: any, cor: [number, number]) => {

            if (!this.global.root.svg.stage.searchCircle.is_enable) return;
            if (this.global.multi_select) return;
            // Section-backed blocks suppress the search circle, so their seats
            // must not pick up the mouse-following FOCUS color either.
            if (block_item.isSectionBacked()) return;
            let gap = this.global.config.zoom_focus_circle_radius;

            if (this.global.zoomManager.zoomLevel === ZoomLevel.BLOCK) {
                for (let i = 0; i < block_item.seats.getSeatsCount(); i++) {
                    let _seat = block_item.seats.getSeatByIndex(i);
                    let _item: SeatModel = _seat.item;
                    
                    // Skip color changes for non-salable seats
                    if (!_seat.isSalable()) continue;
                    
                    let color = _seat.getColor();
                    if (_seat.isSelected()) {
                        color = _seat.getColor(SeatAction.SELECT);
                    } else {
                        if ((_item.x - gap < cor[0] && _item.x + gap > cor[0]) && (_item.y - gap < cor[1] && _item.y + gap > cor[1])) {
                            color = _seat.getColor(SeatAction.FOCUS);
                        }
                        _seat.setColor(color);
                    }


                }
            }
        });

        this.global.eventManager.addEventListener(EventType.MOUSELEAVE_BLOCK, (block_item: Block) => {
            this.seats.resetSeatsColors()

        })

        // grid search
        // this.global.eventManager.addEventListener(EventType.TOUCHSTART_BLOCK, (block_item: Block) => {
        //     console.log(block_item);
        // });

        this.parent.node.on("mouseleave.seats", () => {
            this.seats?.resetSeatsColors(false);
        });

        return this;
    }


    public update() {

        // A section polygon (same id) makes this block a drill-down target.
        this.section_backed = this.global.data
            .getObjects("section")
            .some((object) => object.id.toString() === this.item.id.toString());
        this.node.classed("section-backed", this.section_backed);

        // add Background Image (first, at the bottom of z-index) - only if configured
        if (this.item.background_image) {
            this.background = new BlockBackground(this, this.item);
            this.addChild(this.background);
        }

        // add Block Bounds container (for zoom calculations)
        this.bounds = new BlockBounds(this, this.item);
        this.addChild(this.bounds);


        // add block-local Table bodies (above the hull, beneath the chairs)
        this.tables = new BlockTables(this, this.item);
        this.addChild(this.tables);


        // add Seat container
        this.seats = new Seats(this, this.item);
        this.addChild(this.seats);


        // add Labels container
        this.labels = new Labels(this, this.item);
        this.addChild(this.labels);


        // add Block Info container
        this.mask = new BlockMask(this, this.item);
        this.addChild(this.mask);


        this.info = new BlockInfo(this, this.item);
        this.addChild(this.info);


        this.center_position.x = ((this.item.bounds[1][0] - this.item.bounds[2][0]) / 2) + this.item.bounds[2][0];
        this.center_position.y = ((this.item.bounds[0][1] - this.item.bounds[1][1]) / 2) + this.item.bounds[1][1];

        this.top_position.x = this.center_position.x;
        this.top_position.y = (this.item.bounds[1][1] - 60);


        // update childs
        this.updateChilds();


        this.infosToCenter();


        // Fade the block in, unless it is a section-backed block that should
        // stay hidden in the current (overview) state — in that case settle
        // straight to the hidden state so the section polygon shows without a
        // flash of seats.
        const revealed = this.isRevealed(this.global.zoomManager.zoomLevel);
        const revealDuration = this.section_backed
            ? 0
            : this.global.config.animation_speed;
        this.node.interrupt().transition().duration(revealDuration).attr("opacity", revealed ? 1 : 0);
        this.node.style("pointer-events", revealed ? null : "none");
        this.node.attr("transform-origin", `${this.center_position.x} ${this.center_position.y}`);
        if (this.item.rotate) {

            this.node.attr("transform", 'rotate(' + this.item.rotate + ')');
        }


        return this;
    }

    /**
     * Whether this block's interior (seats/labels) should be visible at the
     * given zoom level. SIMPLE blocks are always revealed (their seats are kept
     * behind the venue mask by the existing logic). A section-backed block is
     * revealed only when it is the entered block and the view has drilled past
     * the venue overview.
     */
    private isRevealed(level: string): boolean {
        if (!this.section_backed) {
            return true;
        }
        if (level === ZoomLevel.VENUE) {
            return false;
        }
        const entered = this.global.zoomManager.enteredBlockId;
        return entered != null && entered.toString() === this.item.id.toString();
    }

    /**
     * Toggle a section-backed block between the venue overview (hidden — the
     * section polygon beneath is the visual + click target) and the entered
     * state (revealed — its seats/labels are shown and interactive). No-op for
     * SIMPLE blocks, which keep their original mask-driven behavior.
     */
    private applyDrillDownVisibility(level: string): void {
        if (!this.section_backed || !this.node) {
            return;
        }
        const revealed = this.isRevealed(level);
        // Section-backed blocks sit above the author polygon; skip the opacity
        // transition so the convex-hull mask never flashes through on enter.
        const duration = this.section_backed ? 0 : this.global.config.animation_speed;
        this.node
            .interrupt()
            .transition()
            .duration(duration)
            .attr("opacity", revealed ? 1 : 0);
        // Hidden blocks must not intercept pointer events so the section polygon
        // below stays clickable.
        this.node.style("pointer-events", revealed ? null : "none");
    }

    public infosToTop() {
        if (this.info.node && this.top_position.x) {
            this.info.node
                .interrupt()
                .transition()
                .duration(this.global.config.animation_speed)
                .attr("transform", "translate(" + this.top_position.x + "," + this.top_position.y + ")")
                .attr("opacity", 0.8)
                .attr("font-size", 14)
            this.info.title.node
                .transition()
                .duration(this.global.config.animation_speed)
                .attr("fill", this.item.color)

        }

    }

    public infosToCenter() {
        if (this.info.node && this.center_position.x) {
            this.info.node.interrupt()
                .transition()
                .duration(this.global.config.animation_speed)
                .attr("transform", "translate(" + this.center_position.x + "," + this.center_position.y + ")")
                .attr("opacity", 1)
                .attr("font-size", 32)
            this.info.title.node
                .transition()
                .duration(this.global.config.animation_speed)
                .attr("fill", this.global.config.style.block.title_color);
        }


    }


}