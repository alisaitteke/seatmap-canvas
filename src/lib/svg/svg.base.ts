/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import Block from "./stage/blocks/block-item/block-item.index";
import {GlobalModel} from "../models/global.model";
import {EventObject} from "./event.manager";


export default class SvgBase {

    public node: any = null;
    public domClass: string = null;
    public domTag: string = null;
    public eventCode: string = null;
    public autoGenerate: boolean = false;
    public tags: Array<string>;

    public child_items: Array<any> | any;

    public dom_attrs: Array<any>;
    public dom_classeds: Array<any>;


    public global: GlobalModel;

    constructor(public parent: any) {
        this.child_items = [];
        this.dom_attrs = [];
        this.dom_classeds = [];
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
        }
        return this;

    }

    public domGenerate(to: any): this {
        let domTag = this.domTag ? this.domTag : "g";

        this.node = to.datum(this.parent).append(domTag);

        for (let di = 0; di < this.dom_attrs.length; di++) {
            let _dom_attr = this.dom_attrs[di];
            this.node.attr(_dom_attr.name, _dom_attr.value)
        }

        if (this.domClass) {
            this.node.classed(this.domClass, true);
        }


        for (let ci = 0; ci < this.dom_classeds.length; ci++) {
            let _dom_class = this.dom_classeds[ci];
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
        this.dom_classeds.push({
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
        this.child_items.map((item: Block) => {
            item.domGenerate(this.node);
            item.update();
        });
        this.updateEvents(false);
        return this;
    }

    public updateEvents(recursive: boolean = false): this {
        let _self = this;

        let allowed_event_types: Array<string> = ["click", "mousever", "mouseleave", "mouseenter","mousemove"];

        for (let i = 0; i < this.global.eventManager.events.length; i++) {
            let _event = this.global.eventManager.events[i];
            let _split = _event.type.toString().split(".");
            if (_split[0].toLowerCase() === this.eventCode.toLowerCase() && allowed_event_types.indexOf(_split[1].toLowerCase()) !== -1 && typeof _split[1] !== "undefined") {
                this.node.on(_split[1].toLowerCase(), function (item: EventObject) {
                    _event.fn(_self, item);

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

    public getChilds(type: string): Array<any> {
        return this.child_items.filter((item: any) => item.constructor.name === type);
    }

    public beforeRender() {

    }

    public afterRender() {

    }


}