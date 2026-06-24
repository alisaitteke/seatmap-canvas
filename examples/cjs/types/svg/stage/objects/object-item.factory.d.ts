import type SvgBase from "@svg/svg.base";
import type Objects from "./objects.index";
import { ObjectData, ObjectType } from "@model/object.model";
export type ObjectItemFactory = (parent: Objects, item: ObjectData) => SvgBase | null;
export declare function registerObjectItem(type: ObjectType, factory: ObjectItemFactory): void;
export declare function createObjectItem(parent: Objects, item: ObjectData): SvgBase | null;
