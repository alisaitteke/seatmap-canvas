# Angular

Use Seatmap Canvas with Angular 14+.

## Installation

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas @angular/core @angular/common rxjs
```

:::info Requirements
- Angular 14.0.0 or higher
- RxJS 7.0.0 or higher
- TypeScript support included
:::

## Three Integration Approaches

Seatmap Canvas offers three ways to integrate with Angular:

1. **Component** - Template-driven, declarative
2. **Directive** - DOM-attached with template references
3. **Service** - Programmatic with RxJS observables

---

## 1. Component Approach

### Standalone Component (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { SeatmapCanvasComponent } from '@alisaitteke/seatmap-canvas/angular';
import type { BlockData, SeatmapOptions } from '@alisaitteke/seatmap-canvas/angular';

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
        (ready)="onReady($event)"
        (seatClick)="onSeatClick($event)"
        (seatSelect)="onSeatSelect($event)"
      />
    </div>
  `
})
export class VenueComponent {
  seatmapOptions: SeatmapOptions = {
    seat: { radius: 12 }
  };

  venueData: BlockData[] = [
    {
      id: 'block-a',
      title: 'Block A',
      color: '#3498db',
      seats: [
        { id: 'A1', x: 10, y: 10, salable: true },
        { id: 'A2', x: 40, y: 10, salable: true }
      ]
    }
  ];

  onReady(instance: any) {
    console.log('Seatmap ready');
  }

  onSeatClick(seat: any) {
    console.log('Seat clicked:', seat.id);
  }

  onSeatSelect(seat: any) {
    console.log('Seat selected:', seat.id);
  }
}
```

### NgModule (Legacy)

```typescript
import { NgModule } from '@angular/core';
import { SeatmapCanvasModule } from '@alisaitteke/seatmap-canvas/angular';

@NgModule({
  imports: [SeatmapCanvasModule],
  // ...
})
export class AppModule { }
```

### Component API

**Inputs:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `BlockData[]` | `[]` | Venue data |
| `options` | `SeatmapOptions` | `{}` | Configuration |
| `className` | `string` | `''` | CSS class |
| `autoZoomToVenue` | `boolean` | `true` | Auto zoom |

**Outputs:**

| Event | Payload | Description |
|-------|---------|-------------|
| `ready` | `SeatMapCanvas` | Seatmap initialized |
| `seatClick` | `Seat` | Seat clicked |
| `seatSelect` | `Seat` | Seat selected |
| `seatUnselect` | `Seat` | Seat unselected |
| `blockClick` | `Block` | Block clicked |

---

## 2. Directive Approach

Use directive for more control with template references.

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
      style="height: 600px;">
    </div>
    
    <button (click)="seatmap.zoomToVenue()">Reset Zoom</button>
    <button (click)="seatmap.zoomToBlock('block-a')">Zoom to Block A</button>
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
    const selected = directive.getSelectedSeats();
    console.log('Selected seats:', selected);
  }
}
```

### Directive API

**Inputs:**

| Property | Type | Description |
|----------|------|-------------|
| `seatmapCanvas` | `SeatmapOptions` | Options (directive selector) |
| `seatmapData` | `BlockData[]` | Venue data |
| `seatmapAutoZoom` | `boolean` | Auto zoom |

**Outputs:**

| Event | Payload | Description |
|-------|---------|-------------|
| `seatmapReady` | `SeatMapCanvas` | Initialized |
| `seatmapSeatClick` | `Seat` | Seat clicked |
| `seatmapSeatSelect` | `Seat` | Seat selected |
| `seatmapSeatUnselect` | `Seat` | Seat unselected |
| `seatmapBlockClick` | `Block` | Block clicked |

**Methods (via template reference):**

```typescript
#seatmap="seatmapCanvas"

seatmap.getInstance()        // Get seatmap instance
seatmap.loadData(data)       // Load new data
seatmap.getSelectedSeats()   // Get selected seats
seatmap.zoomToVenue()        // Zoom to venue
seatmap.zoomToBlock(blockId) // Zoom to block
```

---

## 3. Service Approach

Use service for programmatic control with RxJS.

```typescript
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SeatmapCanvasService } from '@alisaitteke/seatmap-canvas/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [CommonModule],
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
  isReady$ = this.seatmapService.isReady$;

  constructor(private seatmapService: SeatmapCanvasService) {}

  ngOnInit() {
    // Initialize
    this.seatmapService.initialize(
      this.container.nativeElement,
      { seat: { radius: 12 } }
    );

    // Load data
    this.seatmapService.loadData([
      {
        id: 'block-a',
        title: 'Block A',
        seats: [
          { id: 'A1', x: 10, y: 10 }
        ]
      }
    ]);

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

### Service API

**Methods:**

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `initialize()` | `container: HTMLElement, options?` | `SeatMapCanvas \| null` | Initialize |
| `loadData()` | `data: BlockData[], autoZoom?` | `void` | Load data |
| `getSelectedSeats()` | - | `Seat[]` | Get selected |
| `addEventListener()` | `event: string, callback` | `void` | Add listener |
| `zoomToVenue()` | - | `void` | Zoom to venue |
| `zoomToBlock()` | `blockId: string` | `void` | Zoom to block |
| `destroy()` | - | `void` | Cleanup |

**Observables:**

| Observable | Type | Description |
|-----------|------|-------------|
| `selectedSeats$` | `Observable<Seat[]>` | Selected seats stream |
| `isReady$` | `Observable<boolean>` | Ready state |

---

## Angular Universal (SSR)

Seatmap Canvas automatically detects server-side rendering:

```typescript
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  // All three approaches work automatically in SSR
  template: `<seatmap-canvas [data]="data" />`
})
export class MyComponent {
  // SSR detection is handled internally
  // No additional configuration needed
}
```

---

## TypeScript Support

Full TypeScript definitions included:

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

---

## Examples

Complete working examples available:

- [Component Example](https://github.com/alisaitteke/seatmap-canvas/tree/master/examples/angular)
- [Directive Example](https://github.com/alisaitteke/seatmap-canvas/tree/master/examples/angular)
- [Service Example](https://github.com/alisaitteke/seatmap-canvas/tree/master/examples/angular)

---

## Common Patterns

### Get Selected Seats

**Component:**
```typescript
// Access via ready event
onReady(instance: any) {
  this.seatmapInstance = instance;
}

getSelected() {
  return this.seatmapInstance?.data.getSelectedSeats();
}
```

**Directive:**
```typescript
<div seatmapCanvas #seatmap="seatmapCanvas"></div>
<button (click)="logSelected(seatmap)">Get Selected</button>

logSelected(directive: any) {
  console.log(directive.getSelectedSeats());
}
```

**Service:**
```typescript
// Reactive with observable
selectedSeats$ = this.seatmapService.selectedSeats$;

// Or direct call
getSelected() {
  return this.seatmapService.getSelectedSeats();
}
```

### Dynamic Data Loading

```typescript
loadNewVenue(venueId: string) {
  const newData = await this.fetchVenueData(venueId);
  
  // Component: just update the property
  this.venueData = newData;
  
  // Directive: use loadData method
  this.seatmapDirective.loadData(newData);
  
  // Service: call service method
  this.seatmapService.loadData(newData, true);
}
```

---

## Migration from Other Frameworks

### From React

- `useRef` → `@ViewChild`
- `useEffect` → `ngOnInit` / `ngAfterViewInit`
- `useState` → Component properties
- Custom hooks → Injectable services

### From Vue

- `ref` → `@ViewChild`
- `onMounted` → `ngOnInit`
- `computed` → Getters or RxJS operators
- Composables → Injectable services

---

## Best Practices

1. **Use OnPush** change detection for better performance
2. **Cleanup** in `ngOnDestroy` to prevent memory leaks
3. **RxJS** for reactive state management
4. **Standalone components** for modern Angular apps
5. **SSR** is handled automatically, no extra config needed
