/*
  index.ts - seatmap canvas ui
  Copyright (C) 2018  Ali Sait TEKE
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


import "../scss/style.scss";

declare const window: any;
declare const require: any;

import {LabelClass} from "./models/label";

import {
    SeatClass
} from "./models/seat";
import {
    DefaultOptions
} from "./models/defaults";
import {
    Data
} from "./models/data";
import {Block} from "./models/block";

import * as d3 from 'd3';

export class SeatMapCanvas {

    private stage: any;
    private data: Data;
    private container_selector: any;
    private container: any;
    private svg: any;
    private width: number;
    private height: number;
    private blocks_container: any;
    private normal_zoom: any;
    private animated_zoom: any;
    private defaults: DefaultOptions;

    private seat_color_fn: any;

    private zoom_out_container: any;
    private zoom_out_button: any;

    private blocks: any;
    private seats: any;

    private zoom_level: any;
    private zoom_circle: any;
    private zoom_layers: any;
    private zoom_circle_timer: any;

    private block_bound_width: number = 80;
    private block_title_top_gap: number = 70;

    private legend_container: any;

    private max: any = {
        width: 0,
        height: 0,
        zoom: 0
    };
    private min: any = {
        width: 0,
        height: 0,
        zoom: 0
    };

    private scale: any = {
        x: 0,
        y: 0,
        a: 0
    };

    private zoom_levels: any = {
        deep: 0,
        block: 0,
        bird: 0
    };

    private best_find_count: number = null;
    private best_finding: boolean = false;

    private event_listeners: any = [];

    private padding: any = {
        left: 0,
        bottom: 50,
        right: 0,
        top: 0,
    };

    private legend_coordinates: any = {
        x: 0,
        y: 0
    };

    private seat_animation_delay_power: number = 2;
    private total_seat_count: number = 0;

    private context_menu: any;

    private zoom_timer: any = null;

    private active_blocks: Array<any> = [];
    private active_block: any = null;


    constructor(config: any) {

        this.event_listeners = {};
        this.defaults = new DefaultOptions(config);
        this.setContainer(config.container);


    }

    findBestSeat(count = 1) {
        this.best_find_count = count;
        this.best_finding = true;
        console.log("start best finding");
    }

    cancelBestSeat() {
        this.best_find_count = null;
        this.best_finding = false;
        console.log("cancelled best finding");
    }


    addEventListener(type: any, fn: any): this {
        if (this.event_listeners[type]) {
            this.event_listeners[type].push(fn)
        } else {
            this.event_listeners[type] = [];
            this.event_listeners[type].push(fn)
        }
        return this;
    }

    removeEventListener(type: any, fn: any) { // @todo write

    }

    runEventListeners(type: any, data: any) {
        if (this.event_listeners[type]) {
            for (let i = 0; i < this.event_listeners[type].length; i++) {
                this.event_listeners[type][i](data);
            }
        }
    }


    zoomCircleTimer() {

        if (this.zoom_circle_timer !== null) {
            clearTimeout(this.zoom_circle_timer);
            this.zoom_circle_timer = null;
        }

        if (this.zoom_level <= 1) {
            this.zoom_circle_timer = setTimeout(() => {
                this.zoom_circle_timer = null;
                this.zoom_circle.transition().duration(this.defaults.animation_speed).attr("opacity", 0).attr("r", this.defaults.zoom_focus_circle_radius + 10);
            }, 150);
            this.zoom_circle.interrupt().attr("opacity", 0.5).attr("r", this.defaults.zoom_focus_circle_radius);
        } else {
            this.zoom_circle.interrupt().transition().duration(this.defaults.animation_speed / 2).attr("opacity", 0).attr("r", this.defaults.zoom_focus_circle_radius * 2);
        }
    }


    zoomHandler(_self: any) {
        return function () {
            _self.zoomLevelBehivor();
            let x = d3.event.transform.x;
            let y = d3.event.transform.y;
            let k = d3.event.transform.k;

            _self.stage.interrupt().attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            //_self.calculateActiveBlocks();
            //_self.activeBlockUpdate();

        }
    }

    animatedZoomHandler(_self: any) {

        return function () {
            //_self.zoomLevelBehivor();

            let x = d3.event.transform.x;
            let y = d3.event.transform.y;
            let k = d3.event.transform.k;
            _self.stage.interrupt().transition().duration(_self.defaults.animation_speed).attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")");
            //_self.calculateActiveBlocks();
            //_self.activeBlockUpdate();
        }
    }


    zoomEnded(_self: this) {
        return function () {
            console.log("zoomend")
            _self.updateZoomLevel();

            _self.blocks_container.selectAll(".block-item-container").select(".seats-container").selectAll(".seat").attr("fill", (item: any) => {
                return _self.getSeatFillColor(item);
            });
            _self.zoomLevelBehivor();
            _self.calculateActiveBlocks();
            _self.activeBlockUpdate();

            if (_self.zoom_timer === null) {
                _self.zoom_timer = setTimeout(() => {
                    _self.calculateActiveBlocks();
                    _self.activeBlockUpdate();
                    _self.zoom_timer = null;
                }, _self.defaults.animation_speed);
            }
        }
    }


    zoomLevelBehivor() {
        this.updateZoomLevel();
        if (this.zoom_level > 1) {
            //this.zoom_layers.attr("display", "none");
            if (this.defaults.autohide_legend) {
                this.legend_container.interrupt().transition().duration(this.defaults.animation_speed / 2).attr("transform", "translate(" + this.legend_coordinates.x + "," + (this.height + 200) + ")").attr("opacity", 0);
            }

            this.zoom_out_container.style("cursor", "zoom-out");
            this.zoom_out_button.attr("display", "block");
            this.svg.classed("mousehide", false);
        } else {
            if (this.defaults.autohide_legend) {
                this.legend_container.interrupt().transition().duration(this.defaults.animation_speed / 2).attr("transform", "translate(" + this.legend_coordinates.x + "," + this.legend_coordinates.y + ")").attr("opacity", 1);
            }


            this.zoom_out_container.style("cursor", "default");
            //this.blocks_container.style("cursor", "zoom-in");
            this.zoom_out_button.attr("display", "none");
            this.svg.classed("mousehide", true);
        }

        //this.zoomCircleTimer();

    }


    setContainer(container: any): this {
        let _self = this;

        this.container_selector = container;
        this.container = d3.select(this.container_selector);
        this.svg = this.container.append("svg").classed("seatmap-svg", true);

        this.zoom_out_container = this.svg.append("rect")
            .attr("class", "zoom-out-rect")
            .attr("fill", "rgba(0,0,0,0)");
        this.zoom_out_container.on("click", () => {
            this.centerStage(true);
        });

        this.stage = this.svg.append("g").attr("class", "stage");
        this.blocks_container = this.stage.selectAll(".blocks-container").data([0]).enter().append("g").attr("class", "blocks-container");

        this.zoom_circle = this.blocks_container.append("circle")
            .attr("r", this.defaults.zoom_focus_circle_radius)
            .style("display", "none")
            .classed("zoom-circle", true);


        this.zoom_out_button = this.svg.append("g").style("cursor", "pointer")
            .attr("transform", "scale(0.5)")
            .attr("display", "none")
            .classed("zoom-out-button", true);

        this.zoom_out_button.append("rect").attr("width", 42).attr("height", 42).attr("rx", 12).attr("ry", 12).attr("fill", "rgba(0,0,0,0)").attr("stroke", "rgba(0,0,0,0.5)").attr("storke-width", "2px");

        this.zoom_out_button.append("path")
            .attr("d", this.defaults.zoom_out_button)
            .attr("fill", "rgba(0,0,0,0.5)")
            .attr("transform", "scale(0.15) translate(45,45)");

        this.zoom_out_button.on("click", () => {
            this.centerStage(true);
        });

        this.calculateWindowSize();

        this.generateLegend();
        //this.zoomCircleTimer();
        return this;

    }

    setOrUpdateZoomEvent() {
        this.normal_zoom = d3.zoom()
            .scaleExtent([this.defaults.min_zoom, this.defaults.max_zoom])
            .on("end", this.zoomEnded(this))
            .on("zoom", this.zoomHandler(this));
        this.animated_zoom = d3.zoom()
            .scaleExtent([this.defaults.min_zoom, this.defaults.max_zoom])
            .on("end", this.zoomEnded(this))
            .on("zoom", this.animatedZoomHandler(this));

        this.svg.call(this.normal_zoom);
    }

    updateZoomLevel() {
        this.zoom_level = d3.zoomTransform(this.svg.node()).k;
    }

    setData(data: Data): this {
        this.data = new Data(data);
        this.max.width = 0;
        this.max.height = 0;
        this.total_seat_count = 0;
        this.data.blocks.map((block: any) => {
            block.seats.map((seat: SeatClass) => {
                if (seat.x < block.x) block.x = seat.x;
                if (seat.y < block.y) block.y = seat.y;

                if (seat.x > this.max.width) this.max.width = seat.x;
                if (seat.y > this.max.height) this.max.height = seat.y;

                this.total_seat_count++;
            });

            block.seats.map((label: LabelClass) => {
                if (label.x < block.x) block.x = label.x;
                if (label.y < block.y) block.y = label.y;

                if (label.x > this.max.width) this.max.width = label.x;
                if (label.y > this.max.height) this.max.height = label.y;
            });

            this.max.height -= this.block_title_top_gap * 2;
            //this.max.width -= this.block_bound_width;
            return block;

        });


        this.setOrUpdateZoomEvent();
        this.generateBlocks();


        this.calculateStageScale();
        this.windowResize();
        this.centerStage();


        this.windowsResizeEventsSetter();
        this.zoomLevelBehivor();
        this.generateLegend()

        //console.log(this.data.blocks.length)
        if (this.data.blocks.length === 1) {
            this.zoomToBlock(this.data.blocks[0].id);
        }

        return this;
    }


    mouseMoveHandler() {
        let _self = this;
        let cor = d3.mouse(this.blocks_container.node());
        _self.zoom_circle.attr("transform", "translate(" + cor + ")");
        //this.zoomCircleTimer();
        if (this.zoom_level <= 1) {
            let gap = _self.defaults.zoom_focus_circle_radius;
            //_self.blocks_container.selectAll(".block-item-container").select(".seats-container").selectAll(".seat").attr("fill","red")
            _self.blocks_container.selectAll(".block-item-container").select(".seats-container").selectAll(".seat").attr("fill", (item: any) => {
                if ((item.x - gap < cor[0] && item.x + gap > cor[0]) && (item.y - gap < cor[1] && item.y + gap > cor[1])) {
                    return _self.getSeatFillColor(item, "focus");
                } else {
                    return _self.getSeatFillColor(item);
                }
            });
        }
    }

    generateBlocks() {
        this.blocks_container.selectAll(".block-item-container").remove()
        this.blocks = this.blocks_container.selectAll(".block-item-container")
            .data(this.data.blocks)
            .enter().append("g")
            .attr("class", "block-item-container")
            .attr("id", (item: Block) => {
                return "block_" + item.id;
            });

        let block_bounds = this.blocks.append("g").attr("class", "block-bounds");
        let seats_container = this.blocks.append("g").attr("class", "seats-container");
        let labels_container = this.blocks.append("g").attr("class", "labels-container");
        let zoom_layers = this.zoom_layers = this.blocks.append("g").attr("class", "zoom-layers-container");
        let block_info_container = this.blocks.append("g").attr("class", "block-info");


        this.zoom_circle.raise();

        seats_container.attr("display", "none");
        labels_container.attr("display", "none");
        //zoom_layers.attr("display", "none");

        block_bounds.on("click", (item: any) => {
            if (this.active_block.block.id !== item.id) {
                this.zoomToBlock(item.id);
            }

        });

        zoom_layers.on("click", (item: any) => {
            if (this.zoom_level >= (item.zoom_bbox.a - .3)) {
                if (this.zoom_level > 1) return false;
                let cor = d3.mouse(this.blocks_container.node());

                this.svg.interrupt().call(this.animated_zoom.translateTo, cor[0], cor[1]);
                this.svg.interrupt().call(this.animated_zoom.scaleTo, this.defaults.max_zoom);
                // this.seats.interrupt().transition().duration(this.defaults.animation_speed * 2).attr("fill", (item) => {
                //     return this.getSeatFillColor(item);
                // });

            } else {
                this.zoomToBlock(item.id);
            }

        });


        // this.blocks_container.on("click.block", () => {
        //     if (this.zoom_level > 1) return false;
        //     let cor = d3.mouse(this.blocks_container.node());
        //
        //     this.svg.interrupt().call(this.animated_zoom.translateTo, cor[0], cor[1]);
        //     this.svg.interrupt().call(this.animated_zoom.scaleTo, this.defaults.max_zoom);
        //     // this.seats.interrupt().transition().duration(this.defaults.animation_speed * 2).attr("fill", (item) => {
        //     //     return this.getSeatFillColor(item);
        //     // });
        //
        // });


        this.blocks_container.on("mousemove.seat", () => {
            return this.mouseMoveHandler();
        });


        this.generateBlockBounds();
        this.generateSeats();
        this.generateLabels();
        this.generateZoomBoxes();
        this.calculateBlocksZoomBoxes();
        this.generateBlockInfo();
    }

    public getActiveBlocks(): Array<Block> {
        return this.active_blocks;
    }

    private activeBlockUpdate() {

        let _self = this;
        let active_blocks_ids = _self.active_blocks.map((item) => {
            return item.block.id;
        });

        this.blocks_container.selectAll(".block-item-container").each(function (item: any) {
            let _block = d3.select(this);

            if (_self.data.blocks.length === 1) {

            } else {

            }

            if (active_blocks_ids.indexOf(item.id) !== -1 && _self.zoom_level >= (item.zoom_bbox.a - .1)) {
                _block.select(".seats-container").attr("display", "block");
                _block.select(".labels-container").attr("display", "block");

                if (_self.zoom_level < 1) {
                    _block.select(".zoom-layers-container").attr("display", "block").style("opacity", 0);

                } else {
                    _block.select(".zoom-layers-container").attr("display", "none");
                }


            } else {
                _self.zoom_circle.style("display", "none");
                _block.select(".seats-container").attr("display", "none");
                _block.select(".labels-container").attr("display", "none");
                _block.select(".zoom-layers-container").attr("display", "block").style("opacity", 1);

            }
        });


        if (this.active_blocks.length > 0 && _self.zoom_level >= (this.active_block.block.zoom_bbox.a - .1) && this.zoom_level <= 1) {
            if (this.zoom_level < 1) {
                this.zoom_circle.style("display", "block");
                this.blocks_container.style("cursor", "none");
            } else {
                this.zoom_circle.style("display", "none");
                this.blocks_container.style("cursor", "default");
            }
        } else {
            this.blocks_container.style("cursor", "pointer");
            this.zoom_circle.style("display", "none");
        }


    }

    private calculateActiveBlocks(): this {
        let _self = this;

        this.active_blocks = [];

        this.blocks_container.selectAll(".block-item-container").each(function (item: any) {
            let bound = d3.select(this).node().getBoundingClientRect();

            let x_overlap = Math.max(0, Math.min(_self.width, bound.right) - Math.max(0, bound.left));
            let y_overlap = Math.max(0, Math.min(_self.height, bound.bottom) - Math.max(0, bound.top));
            let overlapArea = (x_overlap * y_overlap);

            let allOverlapArea = _self.width * _self.height;

            let ratio: number = (overlapArea * 100) / allOverlapArea;


            if (overlapArea > 0) {
                _self.active_blocks.push({
                    block: item,
                    ratio: Number(ratio.toFixed(2))
                });
            }
        });

        this.active_blocks = this.active_blocks.sort((a, b) => b.ratio - a.ratio);
        if (this.active_blocks.length > 0) {
            this.active_block = this.active_blocks[0];
        } else {
            this.active_block = null;
        }

        return this;

    }

    public zoomToBlock(block: Block | number | string = null, animation: boolean = true): this {
        let _blocks: Array<Block> = this.blocks
            .filter((item: any) => {
                return item.id === block
            }).data();

        if (_blocks.length) {
            let _block: Block = _blocks[0]; // get first item
            if (animation) {
                this.svg.interrupt().call(this.animated_zoom.translateTo, _block.zoom_bbox.x, _block.zoom_bbox.y).call(this.animated_zoom.scaleTo, _block.zoom_bbox.a);
            } else {
                this.svg.interrupt().call(this.normal_zoom.translateTo, _block.zoom_bbox.x, _block.zoom_bbox.y).call(this.animated_zoom.scaleTo, _block.zoom_bbox.a);
            }
        } else {
            this.centerStage(true);
        }

        return this;
    }

    calculateBlocksZoomBoxes() {
        let _self = this;
        let each = this.blocks.each(function (item: any) {

            // get block bbox
            item.bbox = d3.select(this).node().getBBox();

            // calculate block zoom bbox for zoomToBlock and other functions

            let x = (_self.width / item.bbox.width) - ((_self.width / item.bbox.width) / 3);
            let y = (_self.height / item.bbox.height) - ((_self.height / item.bbox.height) / 3);
            let a = (x < y) ? x : y;

            x += item.bbox.x + (item.bbox.width / 2);
            y += item.bbox.y + (item.bbox.height / 2);

            // set to zoom bbox for performance
            item.zoom_bbox = {
                x: x,
                y: y,
                a: a
            }
        });

    }

    private generateZoomBoxes(): this {

        this.data.blocks.map((item: Block) => {
            let _seats = item.seats;
            let bound_items: Array<any> = _seats.map((item: SeatClass) => [item.x, item.y]).concat(item.labels.map(item => [item.x, item.y]));
            let _bounds = d3.polygonHull(bound_items);
            item.bounds = _bounds;
        });

        let bound = this.zoom_layers.append("path")
            .attr("fill", (item: any) => item.color)
            .attr("stroke", (item: any) => item.color)
            .attr("class", "zoom-layer-hull");
        bound.datum((item: any) => item.bounds).attr("d", function (d: any) {
            return "M" + d.join("L") + "Z";
        });
        return this;
    }

    private generateBlockInfo(): this {

        let _self = this;

        let block_info_container = this.blocks.select(".block-info")


        block_info_container.append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("class", "block-text")
            .attr("font-size", "24px")
            .text((item: any) => {
                return item.title;
            })
            .attr("x", function (item: any) {
                return item.bbox.x + (item.bbox.width / 2);
            })
            .attr("y", function (item: any) {
                return item.bbox.y - _self.block_title_top_gap;
            });
        return this;

    }

    generateBlockBounds() {
        this.data.blocks.map((item: Block) => {
            let _seats = item.seats;
            let bound_items: Array<any> = _seats.map((item: SeatClass) => [item.x, item.y]).concat(item.labels.map(item => [item.x, item.y]));
            let _bounds = d3.polygonHull(bound_items);
            item.bounds = _bounds;
        });


        let bound2 = this.blocks.select(".block-bounds")
            .append("path")
            .attr("fill", (item: any) => item.border_color)
            .attr("stroke-width", this.block_bound_width + (this.defaults.block_style.border_width * 2))
            .attr("stroke", (item: any) => item.border_color)
            .attr("class", "block-hull-border")


        bound2.datum((item: any) => item.bounds)
            .attr("d", function (d: any) {
                return "M" + d.join("L") + "Z";
            });

        let bound = this.blocks.select(".block-bounds").append("path")
            .attr("fill", (item: any) => item.color)
            .attr("stroke-width", this.block_bound_width)
            .attr("stroke", (item: any) => item.color)
            //.attr("opacity", 0)
            .attr("class", "block-hull");

        bound.datum((item: any) => item.bounds)
            .attr("d", function (d: any) {
                return "M" + d.join("L") + "Z";
            });

        // bound.transition()
        //     .delay(this.seat_animation_delay_power * this.total_seat_count)
        //     .duration(this.defaults.animation_speed / 2).attr("opacity",1);
        //
        //
        // bound2.transition()
        //     .delay(this.seat_animation_delay_power * this.total_seat_count)
        //     .duration(this.defaults.animation_speed / 2).attr("opacity",1);


    }

    public setSoldSeatClickable(value: Boolean | any) {
        this.defaults.click_enable_sold_seats = value;
    }


    // Generate seats

    private generateSeats() {

        let _self = this;

        let seats = this.blocks.select(".seats-container").selectAll(".seat")
            .data((block: any) => block.seats)
            .enter().append("circle")
            .attr("class", "seat")
            .attr("fill", (item: any) => _self.getSeatFillColor(item))
            .attr("r", this.defaults.seat_style.radius)
            .style("cursor", (item: any) => {
                if (item.salable === false) {
                    return "not-allowed";
                } else if (item.selected === true) {
                    return "default";
                } else {
                    return "cell"
                }

            })
            .attr("opacity", 0)
            .attr("transform", function (d: any) {
                var cors = [d.x, d.y];
                return "translate(" + cors + ")";
            })
            .on("click.seat", function (item: any) {

                if (_self.active_block && _self.active_block.block.id !== item.block.id) {
                    _self.zoomToBlock(item.block.id);
                }

                if (item.salable || (!item.salable && _self.defaults.click_enable_sold_seats)) {
                    _self.runEventListeners("seat.click", item);
                }

            }).on("mouseover.seat", function (item: any) {
                if (_self.zoom_level > 0 && !item.selected) {
                    //_self.runEventListeners("seat.hover", item);
                    d3.select(this).attr("fill", () => {
                        return _self.getSeatFillColor(item, "hover");
                    });
                }

            }).on("mouseleave.seat", function (item: any) {
                if (_self.zoom_level > 0) {
                    _self.runEventListeners("seat.leave", item);
                    d3.select(this).attr("fill", () => {
                        return _self.getSeatFillColor(item, "leave");
                    });
                }
            }).on("contextmenu.seat", function (item: any) {
                if (_self.event_listeners['seat.context_menu'] && _self.event_listeners['seat.context_menu'].length) {
                    d3.event.preventDefault();
                    _self.openContextMenu(item);

                }

            })
            .transition()
            .delay((item: any, index: number) => {
                return index * this.seat_animation_delay_power;
            })
            .duration(this.defaults.animation_speed / 4)
            .attr("opacity", 1);


    }


    private generateContextMenu() {
        this.context_menu = this.svg.append("g").attr("class", "context-menu-container");

        //this.context_menu.append("rect")
    }

    private openContextMenu(item: SeatClass) {
        //this.runEventListeners("seat.context_menu", item);
        console.log("openContextMenu")
    }

    private filterSeatsOfTags(tags: Array<string> | string, block: Block | number | string = null) {
        return this.blocks_container.selectAll(".block-item-container")
            .selectAll(".seats-container")
            .selectAll(".seat")
            .filter((item: any) => {
                if (block === null) {
                    if (Array.isArray(tags)) {
                        return tags.filter((value: any) => -1 !== item.tags.indexOf(value)).length;
                    } else {
                        return -1 !== item.tags.indexOf(tags)
                    }
                } else if (typeof block === "number" || typeof block === "string") {
                    if (Array.isArray(tags)) {
                        return tags.filter((value: any) => -1 !== item.tags.indexOf(value)).length && item.block.id === block;
                    } else {
                        return -1 !== item.tags.indexOf(tags)
                    }
                } else if (typeof block === "object" || typeof block === "function") {
                    if (Array.isArray(tags)) {
                        return tags.filter((value: any) => -1 !== item.tags.indexOf(value)).length && item.block.id === block.id;
                    } else {
                        return -1 !== item.tags.indexOf(tags)
                    }
                }

            });

    }

    public showSeatsOfTags(tags: Array<string> | string, block_id: any = null): this {
        this.filterSeatsOfTags(tags, block_id).attr("display", "block");
        return this;
    }

    public hideSeatsOfTags(tags: Array<string> | string, block_id: any = null): this {
        this.filterSeatsOfTags(tags, block_id).attr("display", "none");
        return this;
    }

    public addSeatClassForTag(tags: Array<string>, class_name: string, block_id: any = null): this {
        this.filterSeatsOfTags(tags, block_id).classed(class_name, true);
        return this;
    }

    public removeSeatClassForTag(tags: Array<string>, class_name: string, block_id: any = null): this {
        this.filterSeatsOfTags(tags, block_id).classed(class_name, false);
        return this;
    }


    // seat color, seat radius update
    updateSeats() {

        this.blocks_container.selectAll(".block-item-container")
            .selectAll(".seats-container")
            .selectAll(".seat")
            .attr("transform", function (d: any) {
                return "translate(" + [d.x, d.y] + ")";
            })
            .attr("fill", (item: any) => {
                return this.getSeatFillColor(item);
            })
            .style("cursor", (item: any) => {
                if (item.salable === false) {
                    return "not-allowed";
                } else if (item.selected === true) {
                    return "default";
                } else {
                    return "cell"
                }

            })
    }


    // Call for API
    public seatSelect(seat: SeatClass): SeatClass {
        seat.selected = true;
        this.zoom_circle.attr("transform", function (d: any) {
            return "translate(" + [seat.x, seat.y] + ")";
        });
        this.updateSeats();
        return seat;
    }

    // Call for API
    public seatUnselect(seat: SeatClass): SeatClass {
        seat.selected = false;
        this.updateSeats();
        return seat;
    }

    // Call for API
    public getSelectedSeats(toJSON = false): Array<SeatClass> | any {

        let seats: any = [];

        let selected_seats = this.data.blocks.map((item) => {
            return item.seats.filter(seat => seat.selected)
        });

        selected_seats.map((item) => {
            seats = seats.concat(item);
        });

        if (toJSON) {
            return seats.map((item: any) => {
                return item.toJson()
            });
        } else {
            return seats;
        }
    }


    // Generate seats labels
    // labels coordinates not calculated shape or polygone. Custom coordiantes enter the your app js
    generateLabels() {

        let labels = this.blocks.selectAll(".labels-container").selectAll(".label")
            .data((item: any) => {
                return item.labels;
            })
            .enter()
            .append("g")
            .attr("class", "label")
            .attr("transform", function (d: any) {
                var cors = [d.x, d.y];
                return "translate(" + cors + ")";
            }).on("click.label", (item: any) => {
                if (this.active_block && this.active_block.block.id !== item.block.id) {
                    this.zoomToBlock(item.block.id);
                }
                this.runEventListeners("label.click", item);
            }).on("mouseover.label", (item: any) => {
                this.runEventListeners("label.hover", item);
            }).on("mouseleave.label", (item: any) => {
                this.runEventListeners("label.leave", item);
            });

        labels.append("circle")
            .attr("class", "label")
            .attr("fill", this.defaults.label_style.bg)
            .attr("r", this.defaults.label_style.radius);

        labels.append("text")
            .attr("class", "label-text")
            .attr("fill", this.defaults.label_style.color)
            .style("font-size", this.defaults.label_style.font_size)
            .text((item: any) => {
                return item.title
            })

    }

    updateLegend() {
        let legend_bbox = this.legend_container.node().getBBox();
        this.legend_coordinates.x = (this.width / 2) - (legend_bbox.width / 2) - legend_bbox.x;
        this.legend_coordinates.y = this.height - (30 + 24);
        this.legend_container.attr("transform-origin", legend_bbox.width / 2 + " " + legend_bbox.height / 2);
        this.legend_container.attr("transform", "translate(" + this.legend_coordinates.x + "," + this.legend_coordinates.y + ")");
    }

    generateLegend() {

        this.svg.selectAll(".legend-container").remove();
        this.legend_container = this.svg.append("g")
            .attr("class", "legend-container")


        let legend_data: any = [];

        legend_data.push({
            title: "Uygun Değil",
            color: this.defaults.seat_style.not_salable
        });
        legend_data.push({
            title: "Uygun",
            color: this.defaults.seat_style.color
        });
        legend_data.push({
            title: "Seçiminiz",
            color: this.defaults.seat_style.selected
        });

        let legend_nodes = this.legend_container.selectAll(".legend-node")
            .data(legend_data).enter()
            .append("g").attr("class", "legend-node")
            .attr("transform", (item: any, index: number) => {
                return "translate(" + (index * this.defaults.legend_style.padding) + ",0)";
            });

        legend_nodes.append("circle")
            .attr("r", this.defaults.legend_style.radius)
            .attr("fill", (item: any) => {
                return item.color;
            });

        legend_nodes.append("text")
            .attr("font-size", this.defaults.legend_style.font_size)
            .attr("y", (this.defaults.legend_style.font_size * 2))
            .text((item: any) => {
                return item.title;
            });


        let legend_bbox = this.legend_container.node().getBBox();
        this.legend_coordinates.x = (this.width / 2) - (legend_bbox.width / 2) - legend_bbox.x;
        this.legend_coordinates.y = this.height - (30 + 24);
        this.legend_container.attr("transform-origin", legend_bbox.width / 2 + " " + legend_bbox.height / 2);
        this.legend_container.attr("transform", "translate(" + this.legend_coordinates.x + "," + this.legend_coordinates.y + ")");

    }


    public seatColorHandler(fn: any) {
        this.seat_color_fn = fn;
    }

    // @todo add category specify color
    // @todo add is sold color
    private getSeatFillColor(seat: any, action: any = null) {

        if (this.seat_color_fn) {
            return this.seat_color_fn(seat, action);
        } else {
            if (seat.salable) {
                if (action == "focus") {
                    if (seat.selected) {
                        return this.defaults.seat_style.focus_out;
                    } else {
                        return this.defaults.seat_style.focus;
                    }
                } else if (action == "hover") {
                    if (seat.selected) {
                        return this.defaults.seat_style.hover;
                    } else {
                        return this.defaults.seat_style.hover;
                    }
                } else if (action == "leave") {
                    if (seat.selected) {
                        return this.defaults.seat_style.selected;
                    } else {
                        return this.defaults.seat_style.color;
                    }
                } else {
                    if (seat.selected) {
                        return this.defaults.seat_style.selected;
                    } else {
                        return seat.color || this.defaults.seat_style.color;
                    }
                }
            } else {
                return this.defaults.seat_style.not_salable;
            }
        }


    }


    // calculate for scale. so, max zoom level min zoom level
    calculateStageScale() {
        this.scale.x = (this.width / this.max.width) - ((this.width / this.max.width) / 2);
        this.scale.y = (this.height / this.max.height) - ((this.height / this.max.height) / 2);
        this.scale.a = (this.scale.x < this.scale.y) ? this.scale.x : this.scale.y;
        this.defaults.min_zoom = this.scale.a < 1 ? this.scale.a : 1;

        //this.setOrUpdateZoomEvent();
    }

    calculateWindowSize() {
        let element = d3.select(this.container_selector).node().getBoundingClientRect();
        this.width = element.width;
        this.height = element.height;
    }


    // windows resize event calculate dimensions, goto center
    // and calculate if setter resiable of config object
    windowsResizeEventsSetter() {
        if (this.defaults.resizable === true) {
            d3.select(window).on('resize.updatesvg', () => {
                this.calculateStageScale();
                this.windowResize();
                this.centerStage(true);
            });
        }
    }


    windowResize() {
        this.calculateWindowSize();
        this.calculateBlocksZoomBoxes();
        this.updateLegend();

        this.svg.attr("width", this.width).attr("height", this.height);
        this.zoom_out_container.attr("width", this.width).attr("height", this.height);
        this.zoom_out_button.attr("transform", "translate(12," + (this.height - 50) + ")");

    }


    // all blocks bird's eye view
    public centerStage(animation = false): this {
        let x = this.max.width / 2;
        let y = (this.max.height / 2) + 100;
        if (animation) {
            this.svg.interrupt().call(this.animated_zoom.translateTo, x, y).call(this.animated_zoom.scaleTo, this.scale.a);
        } else {
            this.svg.interrupt().call(this.normal_zoom.translateTo, x, y).call(this.normal_zoom.scaleTo, this.scale.a);
        }
        return this;
    }


}

window['SeatmapCanvas'] = SeatMapCanvas;