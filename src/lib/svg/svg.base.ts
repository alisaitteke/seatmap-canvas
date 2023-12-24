/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */

import Block from "./stage/blocks/block-item/block-item.index";
import {GlobalModel} from "../models/global.model";
import {EventObject} from "./event.manager";
import {mouse as d3Mouse} from 'd3-selection'


export default class SvgBase {

    public node: any | null = null;
    public domClass: string | null;
    public domTag: string | null;
    public eventCode: string | null;
    public autoGenerate: boolean = false;
    public tags: Array<string>;

    public child_items: Array<any> | any;

    public dom_attrs: Array<any>;
    public dom_classes: Array<any>;

    public child_index: number | null = null;

    public domText: string | null = null;


    public global: GlobalModel;

    constructor(public parent: any) {
        this.child_items = [];
        this.dom_attrs = [];
        this.dom_classes = [];
        this.tags = [];

        this.eventCode = null;

        if (typeof parent.global !== "undefined") {
            this.global = parent.global;
        }

        if (Object(this).dom_params) {

            if (Object(this).dom_params['tag']) {
                this.domTag = Object(this).dom_params['tag'];
            }
            if (Object(this).dom_params['class']) {
                this.domClass = Object(this).dom_params['class'];
            }
            if (Object(this).dom_params['event_code']) {
                this.eventCode = Object(this).dom_params['event_code'];
            }
        }
        if (typeof Object(this).dom_params['autoGenerate'] !== "undefined" && Object(this).dom_params['autoGenerate'] === true) {
            this.autoGenerate = true;
        }
        this.generateThisDom();
        return this;
    }

    public generateThisDom(): this {
        if (this.autoGenerate) {
            this.domGenerate(this.parent.node);
            this.afterGenerate();
        }

        return this;

    }

    public domGenerate(to: any, index: number = 0): this {
        let domTag = this.domTag ? this.domTag : "g";
        this.child_index = index;

        this.node = to.datum(this.parent).append(domTag);

        for (let di = 0; di < this.dom_attrs.length; di++) {
            let _dom_attr = this.dom_attrs[di];
            this.node.attr(_dom_attr.name, _dom_attr.value)
        }
        if(this.domText){
            this.node.text(this.domText)
        }

        if (this.domClass) {
            this.node.classed(this.domClass, true);
        }


        for (let ci = 0; ci < this.dom_classes.length; ci++) {
            let _dom_class = this.dom_classes[ci];
            this.node.classed(_dom_class.name, _dom_class.value);
        }

        return this;
    }

    public attr(name: string, value: string | number): this {
        this.dom_attrs.push({
            name: name,
            value: value
        });
        return this;
    }

    public text(value: string): this {
        // this.text(value)
        this.domText = value;
        return this;
    }

    public addChild(item: any, attrs?: any, replace: boolean = true): this {
        for (let key in attrs) {
            let value = attrs[key];
            item.dom_attrs.push({
                name: key,
                value: value
            })
        }

        this.child_items.push(item);
        return this;
    }

    public classed(className: string, value: boolean = true): this {
        this.dom_classes.push({
            name: className,
            value: value
        });
        return this;
    }


    public clear(): this {
        this.child_items.map((item: Block) => {
            item.node.remove()
        });
        this.child_items = [];
        return this;
    }

    public updateChilds(): this {
        this.child_items.map((item: Block, index: number) => {
            item.domGenerate(this.node, index);
            item.update();
        });
        this.afterGenerate();
        this.updateEvents(false);
        return this;
    }

    public updateEvents(recursive: boolean = false): this {
        let _self = this;
        let allowed_event_types: Array<string> = ["click", "mousever", "mouseleave", "mouseout", "mouseenter", "mousemove", "keydown", "keypress", "mousedown", "mouseup", "touchstart"];
        if (this.eventCode) {
            for (let i = 0; i < this.global.eventManager.events.length; i++) {
                let _event = this.global.eventManager.events[i];
                let _split = _event.type.toString().split(".");
                if (_split[0].toLowerCase() === this.eventCode.toLowerCase() && allowed_event_types.indexOf(_split[1].toLowerCase()) !== -1 && typeof _split[1] !== "undefined") {
                    this.node.on(_split[1].toLowerCase() + ".globalevent", function (item: EventObject) {
                        let _mouse = d3Mouse(_self.parent.node.node());
                        _event.fn(_self, item, _mouse);
                    })
                }
            }

            if (recursive && this.child_items.length > 0) {
                this.child_items.map((child_item: any) => {
                    if (typeof child_item.updateEvents === "function") {
                        child_item.updateEvents(true);
                    }
                })
            }
        }


        return this;
    }

    public addEventListener(eventType: string, cb: any): this {
        this.global.eventManager.addEventListener(eventType, cb);
        this.updateEvents(false);
        return this;
    }

    public addTag(tag: string): this {
        this.tags.push(tag);
        return this;
    }

    public hasTag(tag: string): boolean {
        return this.tags.indexOf(tag) !== -1
    }

    public getChilds(type: string | null = null): Array<any> {
        if (type === null) {
            return this.child_items.filter((item: any) => item.constructor.name === type);
        } else {
            return this.child_items;
        }
    }

    public getChildCount(): number {
        return this.child_items.length;
    }

    public beforeGenerate() {

    }

    public afterGenerate() {

    }

    public addToParent(): this {
        this.parent.addChild(this);
        return this;
    }

    public addTo(container: any): this {
        container.addChild(this);
        return this;
    }


}