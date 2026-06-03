/*
 * floor-picker.ts
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 *
 * The floor "elevator" — an HTML overlay (not part of the SVG) that lists the
 * floors of a multi-floor chart plus an "all floors" entry, mirroring the
 * legacy player's `FloorPicker`. It is purely a thin controller over the
 * {@link Floors} layer: clicks toggle/select floors, hover highlights a floor in
 * the stacked view, and it re-syncs its active state from `FLOOR.CHANGED`.
 *
 * It renders only when the chart is multi-floor, the elevator is enabled
 * (`show_floor_elevator`) and the active floor is not locked, so single-floor
 * charts never get any extra DOM.
 */

import {EventType} from "@enum/global";
import {SeatMapCanvas} from "@/canvas.index";

declare const window: any;

export default class FloorPicker {

    private container: HTMLElement | null;
    private element: HTMLElement | null = null;
    private labelElement: HTMLElement | null = null;

    constructor(private root: SeatMapCanvas) {
        this.container = this.root.node && this.root.node.node ? this.root.node.node() : null;
        this.ensureContainerPositioned();

        // Rebuild on data load; re-sync active state on every floor change.
        this.root.eventManager.addEventListener(EventType.ADD_BLOCK, () => this.render());
        this.root.eventManager.addEventListener(EventType.FLOOR_CHANGED, () => this.refreshActive());
    }

    /** The overlay is absolutely positioned, so the container must establish a context. */
    private ensureContainerPositioned(): void {
        if (!this.container || typeof window === "undefined" || !window.getComputedStyle) {
            return;
        }
        const position = window.getComputedStyle(this.container).position;
        if (!position || position === "static") {
            this.container.style.position = "relative";
        }
    }

    private shouldShow(): boolean {
        const data = this.root.data;
        const config = this.root.config;
        return data.isMultiFloor() && config.show_floor_elevator && !config.lock_active_floor;
    }

    public render(): void {
        this.destroy();
        if (!this.container || !this.shouldShow()) {
            return;
        }

        const el = document.createElement("div");
        el.className = "sm-floor-picker";

        const allButton = this.createButton("⊞", "all", () => this.root.svg.stage.floors.goToAllFloors());
        allButton.classList.add("sm-floor-all");
        allButton.title = "All floors";
        el.appendChild(allButton);

        const floors = this.root.data.getFloors();
        // Top floor first, so the elevator reads top-to-bottom like a building.
        for (let i = floors.length - 1; i >= 0; i--) {
            const floor = floors[i];
            const button = this.createButton(floor.id, String(i), () => this.root.svg.stage.floors.toggleFloor(i));
            button.title = floor.label();
            button.addEventListener("mouseenter", () => this.root.svg.stage.floors.hoverFloor(i));
            button.addEventListener("mouseleave", () => this.root.svg.stage.floors.unhoverFloor());
            el.appendChild(button);
        }

        this.container.appendChild(el);
        this.element = el;

        const label = document.createElement("div");
        label.className = "sm-floor-label";
        this.container.appendChild(label);
        this.labelElement = label;

        this.refreshActive();
    }

    private createButton(text: string, key: string, onClick: () => void): HTMLButtonElement {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "sm-floor-btn";
        button.setAttribute("data-floor", key);
        button.textContent = text;
        button.addEventListener("click", (event) => {
            event.preventDefault();
            onClick();
        });
        return button;
    }

    /** Sync the highlighted button and floor label with the current selection. */
    private refreshActive(): void {
        if (!this.element) {
            return;
        }
        const current = this.root.data.getCurrentFloorIndex();
        this.element.querySelectorAll(".sm-floor-btn").forEach((node) => {
            const button = node as HTMLElement;
            const key = button.getAttribute("data-floor");
            const active = key === "all" ? current < 0 : Number(key) === current;
            button.classList.toggle("active", active);
        });

        if (this.labelElement) {
            if (current >= 0) {
                const floor = this.root.data.getFloors()[current];
                this.labelElement.textContent = floor ? floor.label() : "";
                this.labelElement.style.display = floor ? "block" : "none";
            } else {
                this.labelElement.style.display = "none";
            }
        }
    }

    private destroy(): void {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
        if (this.labelElement) {
            this.labelElement.remove();
            this.labelElement = null;
        }
    }
}
