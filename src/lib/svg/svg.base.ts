/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */

import {BlockItem} from "./stage/blocks/block-item/block-item.index";


export default class SvgBase {

    public node: any = null;
    public domClass: string = null;
    public domTag: string = null;
    public autoGenerate: boolean = false;

    public child_items: Array<any> | any;

    public dom_attrs: Array<any>;

    constructor(public parent: any) {
        this.child_items = [];
        this.dom_attrs = [];
        if (Object(this).dom_params) {

            if (Object(this).dom_params['tag']) {
                this.domTag = Object(this).dom_params['tag'];
            }
            if (Object(this).dom_params['class']) {
                this.domClass = Object(this).dom_params['class'];
            }
        }
        if (typeof Object(this).dom_params['autoGenerate'] !== "undefined" && Object(this).dom_params['autoGenerate'] === true) {
            this.autoGenerate = true;
        }
        this.generateThisDom();
        return this;
    }

    public generateThisDom() {
        if (this.autoGenerate) {
            this.domGenerate(this.parent.node);
        }

    }

    private domGenerate(to: any) {
        let domTag = this.domTag ? this.domTag : "g";
        this.node = to.append(domTag);
        //console.log(this.dom_attrs.length)

        for (let di = 0; di < this.dom_attrs.length; di++) {
            let _dom_attr = this.dom_attrs[di];
            //console.log(_dom_attr)
            this.node.attr(_dom_attr.name, _dom_attr.value)
        }
        //console.log(this.dom_attrs)
        if (this.domClass) {
            this.node.classed(this.domClass, true);
        }
    }

    public attr(name: string, value: string): this {
        this.dom_attrs.push({
            name: name,
            value: value
        });
        return this;
    }

    public addChild(item: any, attrs?: any) {
        for (let key in attrs) {
            let value = attrs[key];
            item.dom_attrs.push({
                name: key,
                value: value
            })
        }

        this.child_items.push(item);
    }


    public clear() {
        this.child_items.map((item: BlockItem) => {
            item.node.remove()
        });
        this.child_items = [];
    }

    public updateChilds() {
        this.child_items.map((item: BlockItem) => {
            item.domGenerate(this.node);
            item.update();
        })
    }
}