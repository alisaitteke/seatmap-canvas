# Seatmap Canvas - Angular Example

This example demonstrates three different ways to use Seatmap Canvas in Angular applications:

1. **Component Approach** - Template-driven with declarative syntax
2. **Directive Approach** - DOM-attached with template references
3. **Service Approach** - Programmatic control with RxJS observables

## Prerequisites

- Node.js 18+
- Angular CLI 17+

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## Project Structure

```
src/
├── app/
│   ├── examples/
│   │   ├── component-example/    # Component approach example
│   │   ├── directive-example/    # Directive approach example
│   │   └── service-example/      # Service approach example
│   ├── data/
│   │   └── venue-data.ts         # Sample venue data
│   ├── app.component.ts          # Main app with routing tabs
│   └── app.routes.ts             # Route configuration
├── index.html
├── main.ts
└── styles.css
```

## Examples Overview

### Component Example

Uses `<seatmap-canvas>` component with Input/Output bindings:

```typescript
<seatmap-canvas
  [data]="venueData"
  [options]="options"
  (ready)="onReady($event)"
  (seatClick)="onSeatClick($event)"
/>
```

### Directive Example

Uses `[seatmapCanvas]` directive with template reference:

```typescript
<div 
  seatmapCanvas
  [seatmapData]="venueData"
  #seatmap="seatmapCanvas">
</div>
<button (click)="seatmap.zoomToVenue()">Reset</button>
```

### Service Example

Uses `SeatmapCanvasService` for programmatic control:

```typescript
constructor(private seatmapService: SeatmapCanvasService) {}

ngOnInit() {
  this.seatmapService.initialize(container, options);
  this.seatmapService.loadData(data);
  
  // RxJS observables
  this.selectedSeats$ = this.seatmapService.selectedSeats$;
}
```

## Key Features Demonstrated

- ✅ Standalone components (Angular 14+)
- ✅ Routing between examples
- ✅ Event handling
- ✅ Template references
- ✅ RxJS observables
- ✅ TypeScript type safety
- ✅ Programmatic control
- ✅ Reactive state management

## Build

```bash
# Production build
npm run build
```

Output will be in `dist/` directory.

## Learn More

- [Seatmap Canvas Documentation](https://github.com/alisaitteke/seatmap-canvas)
- [Angular Wrapper README](../../src/angular/README.md)
