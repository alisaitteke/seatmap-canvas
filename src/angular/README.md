# Seatmap Canvas - Angular Integration

Angular component, directive, and service for interactive seat selection in stadiums, theaters, and event spaces.

## Features

- 🎯 **Multiple Integration Approaches**: Component, Directive, or Service
- 🔄 **Reactive State Management**: RxJS observables for seat selection
- 📦 **Standalone Components**: Modern Angular 14+ support
- 🔧 **NgModule Compatible**: Works with traditional Angular modules
- 🌐 **SSR Ready**: Angular Universal compatible
- 📱 **TypeScript**: Full type safety

## Installation

```bash
npm install @alisaitteke/seatmap-canvas
```

## Quick Start

### Standalone Components (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { SeatmapCanvasComponent } from '@alisaitteke/seatmap-canvas/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SeatmapCanvasComponent],
  template: `
    <seatmap-canvas
      [data]="venueData"
      [options]="options"
      (ready)="onReady($event)"
      (seatClick)="onSeatClick($event)"
    />
  `
})
export class AppComponent {
  venueData = [
    {
      id: 'block-1',
      title: 'Block A',
      seats: [
        { id: 'A1', x: 10, y: 10 },
        { id: 'A2', x: 40, y: 10 }
      ]
    }
  ];

  options = {
    seat: { radius: 12 }
  };

  onReady(seatmap: any) {
    console.log('Seatmap ready:', seatmap);
  }

  onSeatClick(seat: any) {
    console.log('Seat clicked:', seat);
  }
}
```

### NgModule (Traditional Angular)

```typescript
import { NgModule } from '@angular/core';
import { SeatmapCanvasModule } from '@alisaitteke/seatmap-canvas/angular';

@NgModule({
  imports: [SeatmapCanvasModule],
  // ...
})
export class AppModule { }
```

## Usage Examples

### 1. Component Approach

Best for template-driven applications:

```typescript
import { Component } from '@angular/core';
import { SeatmapCanvasComponent } from '@alisaitteke/seatmap-canvas/angular';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [SeatmapCanvasComponent],
  template: `
    <div style="height: 600px;">
      <seatmap-canvas
        [data]="venueData"
        [options]="seatmapOptions"
        [autoZoomToVenue]="true"
        className="my-seatmap"
        (ready)="onSeatmapReady($event)"
        (seatClick)="onSeatClick($event)"
        (seatSelect)="onSeatSelect($event)"
        (seatUnselect)="onSeatUnselect($event)"
        (blockClick)="onBlockClick($event)"
      />
    </div>
  `
})
export class VenueComponent {
  venueData = [ /* your data */ ];
  seatmapOptions = { /* your options */ };

  onSeatmapReady(instance: any) {
    console.log('Seatmap initialized');
  }

  onSeatClick(seat: any) {
    console.log('Clicked:', seat.id);
  }

  onSeatSelect(seat: any) {
    console.log('Selected:', seat.id);
  }

  onSeatUnselect(seat: any) {
    console.log('Unselected:', seat.id);
  }

  onBlockClick(block: any) {
    console.log('Block clicked:', block.id);
  }
}
```

### 2. Directive Approach

For more control over DOM element:

```typescript
import { Component } from '@angular/core';
import { SeatmapCanvasDirective } from '@alisaitteke/seatmap-canvas/angular';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [SeatmapCanvasDirective],
  template: `
    <div 
      seatmapCanvas 
      [seatmapData]="venueData"
      [seatmapAutoZoom]="true"
      (seatmapReady)="onReady($event)"
      (seatmapSeatClick)="onSeatClick($event)"
      #seatmap="seatmapCanvas"
      style="height: 600px; border: 1px solid #ccc;">
    </div>
    
    <button (click)="seatmap.zoomToVenue()">Reset Zoom</button>
    <button (click)="logSelected(seatmap)">Show Selected</button>
  `
})
export class VenueComponent {
  venueData = [ /* your data */ ];

  onReady(instance: any) {
    console.log('Ready');
  }

  onSeatClick(seat: any) {
    console.log('Clicked:', seat);
  }

  logSelected(directive: any) {
    console.log('Selected seats:', directive.getSelectedSeats());
  }
}
```

### 3. Service Approach

For programmatic control with RxJS:

```typescript
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SeatmapCanvasService } from '@alisaitteke/seatmap-canvas/angular';

@Component({
  selector: 'app-venue',
  standalone: true,
  providers: [SeatmapCanvasService],
  template: `
    <div #container style="height: 600px;"></div>
    
    <div *ngIf="selectedSeats$ | async as seats">
      Selected: {{ seats.length }} seats
    </div>
    
    <button (click)="zoomToVenue()">Reset Zoom</button>
  `
})
export class VenueComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;

  selectedSeats$ = this.seatmapService.selectedSeats$;

  constructor(private seatmapService: SeatmapCanvasService) {}

  ngOnInit() {
    const instance = this.seatmapService.initialize(
      this.container.nativeElement,
      { /* options */ }
    );

    this.seatmapService.loadData([ /* your data */ ]);

    // Listen to events
    this.seatmapService.addEventListener('SEAT.CLICK', (seat: any) => {
      console.log('Seat clicked:', seat);
    });
  }

  zoomToVenue() {
    this.seatmapService.zoomToVenue();
  }
}
```

## API Reference

### Component Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `options` | `SeatmapOptions` | `{}` | Seatmap configuration |
| `data` | `BlockData[]` | `[]` | Venue data (blocks and seats) |
| `className` | `string` | `''` | CSS class for container |
| `containerStyle` | `object` | `{}` | Inline styles for container |
| `autoZoomToVenue` | `boolean` | `true` | Auto zoom to venue on data load |

### Component Outputs

| Output | Type | Description |
|--------|------|-------------|
| `ready` | `EventEmitter<SeatMapCanvas>` | Emitted when seatmap is ready |
| `seatClick` | `EventEmitter<any>` | Seat click event |
| `seatSelect` | `EventEmitter<any>` | Seat selected event |
| `seatUnselect` | `EventEmitter<any>` | Seat unselected event |
| `blockClick` | `EventEmitter<any>` | Block click event |
| `dataChange` | `EventEmitter<BlockData[]>` | Data changed event |

### Component Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getInstance()` | - | `SeatMapCanvas \| null` | Get seatmap instance |
| `loadData()` | `data: BlockData[]` | `void` | Load new data |
| `getSelectedSeats()` | - | `any[]` | Get selected seats |
| `getSeat()` | `seatId: string, blockId: string` | `any` | Get specific seat |
| `getBlocks()` | - | `any[]` | Get all blocks |
| `zoomToBlock()` | `blockId: string` | `void` | Zoom to block |
| `zoomToVenue()` | - | `void` | Zoom to venue |

### Service Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `initialize()` | `container: HTMLElement, options?: SeatmapOptions` | `SeatMapCanvas \| null` | Initialize seatmap |
| `loadData()` | `data: BlockData[], autoZoom?: boolean` | `void` | Load venue data |
| `getSelectedSeats()` | - | `any[]` | Get selected seats |
| `addEventListener()` | `event: string, callback: Function` | `void` | Add event listener |
| `zoomToVenue()` | - | `void` | Zoom to venue |
| `destroy()` | - | `void` | Cleanup instance |

### Service Observables

| Observable | Type | Description |
|------------|------|-------------|
| `selectedSeats$` | `Observable<any[]>` | Stream of selected seats |
| `isReady$` | `Observable<boolean>` | Initialization state |

## Angular Universal (SSR)

The library automatically detects server-side rendering and only initializes in the browser:

```typescript
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  // Component will work automatically in SSR
  template: `<seatmap-canvas [data]="data" />`
})
export class MyComponent {
  // SSR detection is handled internally
}
```

## TypeScript

Full TypeScript support with type definitions:

```typescript
import type { 
  SeatmapOptions, 
  BlockData, 
  SeatData,
  SeatClickEvent 
} from '@alisaitteke/seatmap-canvas/angular';

const options: SeatmapOptions = {
  seat: { radius: 12 }
};

const data: BlockData[] = [
  {
    id: 'block-1',
    title: 'VIP Section',
    seats: [
      { id: 'A1', x: 10, y: 10, salable: true }
    ]
  }
];
```

## Examples

See the [`examples/angular`](../../examples/angular) directory for complete working examples:

- Component usage with template binding
- Directive usage with template reference
- Service usage with RxJS streams
- SSR compatibility demonstration

## License

MIT - see [LICENSE](../../LICENSE) for details
