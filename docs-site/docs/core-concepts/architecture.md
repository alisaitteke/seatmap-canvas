# Architecture

Understanding the architecture of Seatmap Canvas will help you build better applications.

## Overview

Seatmap Canvas is built with a modular, event-driven architecture using D3.js for SVG rendering and manipulation.

## Component Hierarchy

```
SeatMapCanvas (Main Class)
├── EventManager          # Event pub/sub system
├── WindowManager         # Window resize handling
├── ZoomManager           # Zoom and pan controls
├── DataModel            # Data management layer
│   └── BlockModel[]     # Collection of blocks
│       ├── SeatModel[]  # Individual seats
│       └── LabelModel[] # Block labels
└── Svg                  # D3.js rendering layer
    ├── Stage            # Main stage container
    │   ├── Blocks       # Block renderer
    │   └── MultiSelect  # Selection rectangle
    ├── Legend           # Legend component
    └── Tooltip          # Hover tooltips
```

## Core Components

### SeatMapCanvas

The main class that orchestrates all components.

```javascript
const seatmap = new SeatmapCanvas(selector, config);

// Public API
seatmap.setData(data);              // Load data
seatmap.addEventListener(...);       // Add event listener
seatmap.getSelectedSeats();         // Get selections
seatmap.zoomManager.zoomToVenue();  // Control zoom
```

### EventManager

Centralized event system using RxJS for reactive programming.

**Event Types:**
- `SEAT.CLICK` - Seat clicked
- `SEAT.SELECT` - Seat selected
- `SEAT.UNSELECT` - Seat unselected
- `BLOCK.CLICK` - Block clicked
- `ZOOM_LEVEL_CHANGE` - Zoom level changed

```javascript
seatmap.eventManager.on('SEAT.CLICK', (seat) => {
  console.log('Seat clicked:', seat);
});
```

### ZoomManager

Manages three zoom levels with smooth transitions.

**Zoom Levels:**
1. **VENUE** - Overview of all blocks
2. **BLOCK** - Focused on specific block
3. **SEAT** - Individual seat view

```javascript
// Zoom to venue (overview)
seatmap.zoomManager.zoomToVenue();

// Zoom to specific block
seatmap.zoomManager.zoomToBlock(blockId);

// Zoom to specific seat
seatmap.zoomManager.zoomToSeat(seatId, blockId);
```

### DataModel

Manages the hierarchical data structure.

```javascript
// Access data
const blocks = seatmap.data.blocks;
const seats = seatmap.data.blocks[0].seats;

// Get selected seats
const selected = seatmap.data.getSelectedSeats();

// Get seat by ID
const seat = seatmap.data.getSeat(seatId, blockId);
```

## Data Flow

```
User Input (Click/Hover)
    ↓
Event Detection (D3.js)
    ↓
EventManager (Pub/Sub)
    ↓
Business Logic (Your Code)
    ↓
Model Update (SeatModel/BlockModel)
    ↓
SVG Re-render (D3.js)
    ↓
Visual Update
```

## Rendering Pipeline

### 1. Initialization

```javascript
const seatmap = new SeatmapCanvas(selector, config);
```

- Creates container
- Initializes managers (Event, Window, Zoom)
- Sets up SVG canvas
- Applies configuration

### 2. Data Loading

```javascript
seatmap.setData(data);
```

- Parses data structure
- Creates model instances
- Calculates positions and bounds
- Triggers initial render

### 3. SVG Generation

```javascript
// D3.js selection and data binding
svg.selectAll('.seat')
  .data(seats)
  .enter()
  .append('circle')
  .attr('cx', d => d.x)
  .attr('cy', d => d.y);
```

- Uses D3.js selections
- Data binding for efficient updates
- Hierarchical rendering (Blocks → Seats)

### 4. Event Handling

```javascript
seat.on('click', (event, d) => {
  eventManager.emit('SEAT.CLICK', d);
});
```

- DOM events captured by D3.js
- Emitted through EventManager
- Your code handles business logic

## Design Patterns

### 1. Observer Pattern

EventManager implements observer pattern for decoupled communication.

```javascript
// Publisher
eventManager.emit('SEAT.SELECT', seat);

// Subscriber
eventManager.on('SEAT.SELECT', (seat) => {
  updateCart(seat);
});
```

### 2. Model-View Pattern

Clear separation between data (models) and presentation (SVG).

```javascript
// Model (data)
class SeatModel {
  id: string;
  x: number;
  y: number;
  selected: boolean;
}

// View (SVG)
class SeatItem extends SvgBase {
  render() {
    // Generate SVG from model
  }
}
```

### 3. Builder Pattern

Configuration uses builder pattern for flexibility.

```javascript
const config = {
  resizable: true,
  style: {
    seat: {
      radius: 12,
      color: "#6796ff"
    }
  }
};
```

## Performance Considerations

### SVG Optimization

- Uses D3.js data binding for efficient updates
- Only re-renders changed elements
- Virtual scrolling for large seat counts

### Event Delegation

- Single event listener on container
- Events bubble up from children
- Reduces memory footprint

### Lazy Loading

- Renders only visible seats during zoom
- Off-screen seats culled
- Improves performance for large venues

## Extension Points

### Custom Parsers

Add support for custom data formats:

```javascript
import { ParserBase } from '@alisaitteke/seatmap-canvas';

class CustomParser extends ParserBase {
  parse(data) {
    // Transform to Seatmap format
    return { blocks: [...] };
  }
}

seatmap.addParser('custom', CustomParser);
```

### Custom Decorators

Use decorators for cross-cutting concerns:

```javascript
import { DomInjectable } from '@alisaitteke/seatmap-canvas';

@DomInjectable()
class CustomComponent {
  // Your implementation
}
```

## TypeScript Architecture

Full TypeScript support with interfaces and types:

```typescript
// Models
interface SeatModel {
  id: string | number;
  x: number;
  y: number;
  salable: boolean;
}

// Configuration
interface SeatmapOptions {
  resizable?: boolean;
  legend?: boolean;
  style?: StyleConfig;
}
```

## Next Steps

- Learn about [Event System](/docs/core-concepts/event-system)
- Explore [Zoom Manager](/docs/core-concepts/zoom-manager)
- Understand [Data Models](/docs/core-concepts/data-models)
