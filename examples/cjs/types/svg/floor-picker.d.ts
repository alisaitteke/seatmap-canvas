import { SeatMapCanvas } from "@/canvas.index";
export default class FloorPicker {
    private root;
    private container;
    private element;
    private labelElement;
    constructor(root: SeatMapCanvas);
    private ensureContainerPositioned;
    private shouldShow;
    render(): void;
    private createButton;
    private refreshActive;
    private destroy;
}
