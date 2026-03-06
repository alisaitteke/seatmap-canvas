# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Angular wrapper for Seatmap Canvas.

## Angular Wrapper Overview

The Angular integration provides three approaches for using Seatmap Canvas in Angular applications:

1. **Component**: Template-driven, declarative approach
2. **Directive**: DOM-attached, programmatic control
3. **Service**: Injectable service with RxJS observables

## Architecture

### Component (`seatmap-canvas.component.ts`)

- **Standalone**: Uses `standalone: true` for Angular 14+ compatibility
- **Change Detection**: `ChangeDetectionStrategy.OnPush` for performance
- **SSR Support**: Uses `isPlatformBrowser()` check
- **Lifecycle**: Initialization in `ngAfterViewInit`, cleanup in `ngOnDestroy`

**Key Pattern:**
```typescript
@ViewChild('container', { static: true }) containerRef!: ElementRef;
```
Uses ViewChild to get DOM reference for D3.js canvas initialization.

### Directive (`seatmap-canvas.directive.ts`)

- **Selector**: `[seatmapCanvas]` attribute directive
- **Export As**: `exportAs: 'seatmapCanvas'` allows template reference
- **Input Naming**: Prefixed with `seatmap` to avoid conflicts (e.g., `seatmapData`, `seatmapReady`)

**Key Pattern:**
```typescript
constructor(private el: ElementRef) {}
// Direct access to host element
this.seatmapInstance = new SeatMapCanvas(this.el.nativeElement, options);
```

### Service (`seatmap-canvas.service.ts`)

- **Injectable**: Not provided in root - users must provide it themselves
- **RxJS Integration**: BehaviorSubject for reactive state
- **Platform Detection**: Checks `isPlatformBrowser` for SSR compatibility

**Key Pattern:**
```typescript
private selectedSeatsSubject = new BehaviorSubject<any[]>([]);
public selectedSeats$: Observable<any[]> = this.selectedSeatsSubject.asObservable();
```

## Important Patterns

### SSR Handling

All three approaches use Angular's platform detection:

```typescript
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(platformId);
}
```

This prevents D3.js from running on the server (where `window` and `document` don't exist).

### Change Detection Strategy

Component uses `OnPush` because:
- D3.js manipulates DOM directly (outside Angular's change detection)
- Reduces unnecessary change detection cycles
- Parent component triggers updates via Input changes

### Event Handling

Events from core library are bridged to Angular:

```typescript
instance.eventManager.addEventListener('SEAT.CLICK', (seat: any) => {
  this.seatClick.emit(seat);  // Component/Directive
  // OR
  this.seatClickSubject.next(seat);  // Service
});
```

### Data Reactivity

`ngOnChanges` watches for data Input changes:

```typescript
ngOnChanges(changes: SimpleChanges): void {
  if (changes['data'] && !changes['data'].firstChange) {
    this.loadData(changes['data'].currentValue);
  }
}
```

## NgModule vs Standalone

### NgModule Pattern (Legacy)

```typescript
@NgModule({
  imports: [CommonModule, SeatmapCanvasComponent, SeatmapCanvasDirective],
  exports: [SeatmapCanvasComponent, SeatmapCanvasDirective],
  providers: [SeatmapCanvasService]
})
```

Imports standalone components as dependencies.

### Standalone Pattern (Modern)

```typescript
@Component({
  standalone: true,
  imports: [SeatmapCanvasComponent]
})
```

Direct import in component.

## Core Library Integration

The Angular wrapper wraps the core `SeatMapCanvas` class from `src/lib/canvas.index.ts`:

```typescript
import { SeatMapCanvas } from '../lib/canvas.index';

// Initialization
this.seatmapInstance = new SeatMapCanvas(container, options);

// Event subscription
instance.eventManager.addEventListener('SEAT.CLICK', callback);

// Data loading
instance.data.replaceData(data);

// Zoom control
instance.zoomManager.zoomToVenue();
```

## Type Safety

All types are imported from the core library:

```typescript
import DefaultsModel from '../lib/models/defaults.model';

export interface SeatmapOptions extends Partial<DefaultsModel> {
  [key: string]: any;
}
```

This ensures Angular types stay in sync with core library.

## Testing Considerations

- **Component Testing**: Use Angular TestBed with `isPlatformBrowser` mocked
- **Service Testing**: Mock `PLATFORM_ID` injection token
- **E2E Testing**: Angular wrappers work with Protractor/Cypress

## Common Pitfalls

1. **SSR**: Always check `isPlatformBrowser` before D3.js initialization
2. **ViewChild Timing**: Use `{ static: true }` for initialization in `ngAfterViewInit`
3. **Memory Leaks**: Clean up in `ngOnDestroy`
4. **Change Detection**: Don't expect Angular to detect D3.js DOM changes
5. **Zone.js**: D3.js events run inside Angular zone by default (good for most cases)

## Performance Optimization

- `ChangeDetectionStrategy.OnPush` on component
- Lazy load seatmap data when needed
- Use service approach for complex state management
- Consider `runOutsideAngular()` for heavy D3.js operations if needed

## Migration from Other Frameworks

### From React

- `useRef` → `@ViewChild`
- `useEffect` → `ngOnInit` / `ngAfterViewInit`
- `useState` → Component properties + change detection
- Custom hooks → Injectable services

### From Vue

- `ref` → `@ViewChild`
- `onMounted` → `ngOnInit` / `ngAfterViewInit`
- `computed` → getters or RxJS operators
- Composables → Injectable services

## Dependencies

- **Required**: `@angular/core`, `@angular/common` (>=14.0.0)
- **RxJS**: `^7.0.0` for service observables
- **Core Library**: `src/lib/canvas.index.ts` (D3.js wrapper)
