# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Seatmap Canvas is an interactive seat selection library for stadiums, theaters, and event spaces. Built with D3.js and TypeScript, it provides a framework-agnostic core with React and Vue 3 wrappers.

## Build Commands

```bash
# Development with hot reload (serves on http://localhost:3002)
npm run start:dev

# Production build
npm run build
```

Build outputs:
- `dist/cjs/seatmap.canvas.js` - CommonJS
- `dist/esm/seatmap.canvas.js` - ESM
- `dist/types.d.ts` - TypeScript definitions

## Architecture

### Core Library (`src/lib/`)

**Entry Point:** `SeatMapCanvas` class in `canvas.index.ts`
- Initializes with container selector and configuration
- Creates managers: EventManager, WindowManager, ZoomManager
- Generates SVG DOM via D3.js

**Data Flow:**
- `DataModel` → `BlockModel[]` → `SeatModel[]`
- Each model extends `ModelBase` with common functionality

**SVG Rendering (`src/lib/svg/`):**
- `SvgBase`: Base class for all SVG elements with D3.js integration
- Hierarchy: `Svg` → `Stage` → `Blocks` → `BlockItem` → (Seats, Labels, Info)
- Each component manages its own DOM generation and updates

**Key Managers:**
- `EventManager`: Central pub/sub for application events (SEAT.CLICK, BLOCK.CLICK, etc.)
- `ZoomManager`: Handles zoom/pan with three levels (VENUE, BLOCK, SEAT)
- `WindowManager`: Window resize handling

### Framework Wrappers

- **React** (`src/react/`): `SeatmapCanvas.tsx` component with `useSeatmap` hook
- **Vue 3** (`src/vue/`): `SeatmapCanvas.vue` component with plugin system

### TypeScript Path Aliases

```
@/*         → src/lib/*
@model/*    → src/lib/models/*
@svg/*      → src/lib/svg/*
@enum/*     → src/lib/enums/*
@decorator/* → src/lib/decorators/*
@style/*    → src/scss/*
```

## Key Patterns

- **Event-driven architecture**: Use `EventManager` for decoupled communication between components
- **D3 Selection pattern**: SVG elements are managed through D3.js selections
- **Parser pattern**: Pluggable data format parsers (Pretix, Seatmap) registered via `addParser()`
- **Manager pattern**: Dedicated manager classes for zoom, events, and window handling

## Data Models

**SeatModel properties:** id, title, x, y, salable, selected, note, color, custom_data

**BlockModel properties:** id, title, color, labels[], seats[]

## Event Types

Events dispatched through EventManager:
- `SEAT.CLICK`, `SEAT.SELECT`, `SEAT.UNSELECT`
- `BLOCK.CLICK`
- Zoom level changes

## Dependencies

- **D3.js (v7)**: SVG manipulation, selections, zoom/pan
- **RxJS**: Observable utilities
- **reflect-metadata**: Decorator support
