# Seatmap Canvas - React Plugin

React plugin for **Seatmap Canvas**, an advanced interactive seat selection library.

## Installation

```bash
npm install @alisaitteke/seatmap-canvas react react-dom
```

## Usage

### 1. Component-Based Usage (Recommended)

The easiest way to use Seatmap Canvas in React is with the `<SeatmapCanvas>` component.

#### Basic Example

```tsx
import React from 'react';
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/react';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
import type { BlockData, SeatmapOptions } from '@alisaitteke/seatmap-canvas/react';

function App() {
  const seatmapOptions: SeatmapOptions = {
    legend: true,
    style: {
      seat: {
        hover: '#8fe100',
        color: '#f0f7fa',
        selected: '#8fe100',
        check_icon_color: '#fff',
        not_salable: '#0088d3',
        focus: '#8fe100',
      },
      legend: {
        font_color: '#3b3b3b',
        show: false
      },
      block: {
        title_color: '#fff'
      }
    }
  };

  const blocks: BlockData[] = [
    {
      id: 'block-1',
      title: 'Block A',
      color: '#01a5ff',
      seats: [
        {
          id: 'seat-1',
          x: 50,
          y: 50,
          salable: true,
          title: 'A1',
          custom_data: {
            price: 50,
            row: 1,
            seat: 1
          }
        },
        // Add more seats...
      ]
    }
  ];

  const handleSeatClick = (seat: any) => {
    if (!seat.isSelected() && seat.item.salable === true) {
      seat.select();
    } else {
      seat.unSelect();
    }
  };

  const handleReady = (instance: any) => {
    console.log('Seatmap ready!', instance);
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <SeatmapCanvas
        options={seatmapOptions}
        data={blocks}
        onReady={handleReady}
        onSeatClick={handleSeatClick}
        className="seatmap-container"
      />
    </div>
  );
}

export default App;
```

#### Using Ref for Advanced Control

```tsx
import React, { useRef } from 'react';
import { SeatmapCanvas, SeatmapCanvasRef } from '@alisaitteke/seatmap-canvas/react';

function App() {
  const seatmapRef = useRef<SeatmapCanvasRef>(null);

  const handleZoomToBlock = () => {
    seatmapRef.current?.seatmap?.zoomManager.zoomToBlock('block-1');
  };

  const handleZoomOut = () => {
    seatmapRef.current?.seatmap?.zoomManager.zoomToVenue();
  };

  const getSelectedSeats = () => {
    const selectedSeats = seatmapRef.current?.seatmap?.data.getSelectedSeats();
    console.log('Selected seats:', selectedSeats);
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={handleZoomToBlock}>Zoom to Block 1</button>
        <button onClick={getSelectedSeats}>Get Selected Seats</button>
      </div>

      <div style={{ width: '100%', height: '600px' }}>
        <SeatmapCanvas
          ref={seatmapRef}
          options={options}
          data={blocks}
        />
      </div>
    </div>
  );
}
```

### 2. Hook-Based Usage (Advanced)

For more control, use the `useSeatmap` hook:

```tsx
import React, { useEffect } from 'react';
import { useSeatmap } from '@alisaitteke/seatmap-canvas/react';
import type { BlockData } from '@alisaitteke/seatmap-canvas/react';

function App() {
  const {
    containerRef,
    isReady,
    selectedSeats,
    loadData,
    zoomToBlock,
    zoomToVenue,
    addEventListener,
  } = useSeatmap(
    {
      legend: true,
      style: {
        seat: {
          hover: '#8fe100',
          selected: '#8fe100',
        }
      }
    },
    [] // initial data
  );

  useEffect(() => {
    if (isReady) {
      const blocks: BlockData[] = [
        // Your blocks data
      ];
      loadData(blocks);

      // Add event listeners
      addEventListener('SEAT.CLICK', (seat: any) => {
        console.log('Seat clicked:', seat);
        if (seat.item.salable) {
          if (!seat.isSelected()) {
            seat.select();
          } else {
            seat.unSelect();
          }
        }
      });
    }
  }, [isReady]);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => zoomToVenue()}>Zoom Out</button>
        <button onClick={() => zoomToBlock('block-1')}>Zoom to Block 1</button>
        <div>Selected Seats: {selectedSeats.length}</div>
      </div>

      <div
        ref={containerRef}
        style={{ width: '100%', height: '600px' }}
      />
    </div>
  );
}
```

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SeatmapOptions` | `{}` | Seatmap configuration options |
| `data` | `BlockData[]` | `[]` | Array of blocks with seats |
| `className` | `string` | `''` | CSS class for container |
| `style` | `React.CSSProperties` | `{}` | Inline styles for container |
| `autoZoomToVenue` | `boolean` | `true` | Auto zoom to venue after data load |
| `onReady` | `(instance: SeatMapCanvas) => void` | - | Callback when seatmap is initialized |
| `onSeatClick` | `(seat: any) => void` | - | Callback when a seat is clicked |
| `onSeatSelect` | `(seat: any) => void` | - | Callback when a seat is selected |
| `onSeatUnselect` | `(seat: any) => void` | - | Callback when a seat is unselected |
| `onBlockClick` | `(block: any) => void` | - | Callback when a block is clicked |
| `onDataChange` | `(data: BlockData[]) => void` | - | Callback when data changes |

### Component Ref Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getInstance()` | `SeatMapCanvas \| null` | Get the seatmap instance |
| `seatmap` | `SeatMapCanvas \| null` | Direct access to seatmap instance |

### Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `seatmapInstance` | `SeatMapCanvas \| null` | Seatmap instance |
| `isReady` | `boolean` | Whether seatmap is initialized |
| `selectedSeats` | `any[]` | Array of selected seats (reactive) |
| `containerRef` | `React.RefObject<HTMLDivElement>` | Ref for container element |
| `loadData` | `(data: BlockData[]) => void` | Load seat data |
| `getSelectedSeats` | `() => any[]` | Get all selected seats |
| `getSeat` | `(seatId: string, blockId: string) => any` | Get specific seat |
| `getBlocks` | `() => any[]` | Get all blocks |
| `zoomToBlock` | `(blockId: string) => void` | Zoom to specific block |
| `zoomToVenue` | `() => void` | Zoom out to venue view |
| `addEventListener` | `(event: string, callback: Function) => void` | Add event listener |

## TypeScript Support

This plugin is written in TypeScript and includes full type definitions.

```typescript
import type {
  SeatmapOptions,
  SeatmapCanvasProps,
  SeatClickEvent,
  BlockData,
  SeatData,
  UseSeatmapReturn,
  SeatmapCanvasRef,
} from '@alisaitteke/seatmap-canvas/react';
```

## Event Types

Available event types for `addEventListener`:

- `SEAT.CLICK` - Fired when a seat is clicked
- `SEAT.SELECT` - Fired when a seat is selected
- `SEAT.UNSELECT` - Fired when a seat is unselected
- `BLOCK.CLICK` - Fired when a block is clicked
- `READY` - Fired when seatmap is initialized
- `ZOOM_LEVEL_CHANGE` - Fired when zoom level changes

## Examples

Check the `/examples/react` directory for complete examples:

- Basic seat selection
- Custom styling
- Dynamic data loading
- Event handling
- Zoom controls
- Selected seats management

## Custom Seat Shapes

### Using Custom Shapes

```tsx
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/react';

function App() {
  const options = {
    style: {
      seat: {
        shape: "rect",        // circle | rect | path | svg
        size: 24,
        corner_radius: 6,
        color: "#6796ff",
        hover: "#5671ff",
        selected: "#56aa45"
      }
    }
  };

  return <SeatmapCanvas options={options} data={blocks} />;
}
```

### Available Shapes

**Circle** (Default)
```tsx
options: {
  style: { seat: { shape: "circle", radius: 12 } }
}
```

**Rectangle**
```tsx
options: {
  style: { seat: { shape: "rect", size: 24, corner_radius: 4 } }
}
```

**Custom Path**
```tsx
options: {
  style: {
    seat: {
      shape: "path",
      path: "M12 0L24 12L12 24L0 12Z",  // Diamond
      path_box: "0 0 24 24",
      size: 24
    }
  }
}
```

**External SVG**
```tsx
options: {
  style: {
    seat: {
      shape: "svg",
      svg: "/assets/custom-seat.svg",
      radius: 12
    }
  }
}
```

### Preparing Your SVG Files

**Option 1: Extract Path from SVG**

1. Open your SVG in a text editor
2. Find the `<path d="...">` element
3. Copy the path data and viewBox:

```tsx
const options = {
  style: {
    seat: {
      shape: "path",
      path: "M12 21.35l-1.45-1.32C5.4 15.36...",  // from d attribute
      path_box: "0 0 24 24",  // from viewBox attribute
      size: 24
    }
  }
};
```

**Option 2: Use SVG File Directly**

Place SVG in your `public` folder and reference it:

```tsx
const options = {
  style: {
    seat: {
      shape: "svg",
      svg: "/icons/custom-seat.svg",
      radius: 12
    }
  }
};
```

**Supported SVG Elements:**
- `<path>` - Used directly
- `<polygon>`, `<polyline>` - Auto-converted to path
- `<rect>`, `<circle>` - Auto-converted to path
- Multiple paths - Automatically combined

**Best Practices:**
- Use square viewBox (e.g., "0 0 24 24") for consistent sizing
- Keep SVG simple (< 10KB) for better performance
- Use monochrome SVGs (fill color controlled by library)
- Export from design tools with "Outline Stroke" option

## Modern Tooltips

### Customizing Tooltips

```tsx
const options = {
  style: {
    tooltip: {
      bg: "#ffffff",
      color: "#1f2937",
      border_radius: 10,
      padding: 14,
      font_size: "14px",
      font_weight: "600",
      line_height: 20,
      shadow: "0 8px 24px rgba(0,0,0,0.2)",
      text_align: "center",
      width: 160
      // Height auto-adjusts to content
    }
  }
};
```

**Features:**
- Auto-sizing height based on content
- Centered text alignment
- Modern shadow effects
- Configurable padding and spacing
- Custom fonts and colors

## Next.js Support

For Next.js, you may need to import the component dynamically to avoid SSR issues:

```tsx
import dynamic from 'next/dynamic';

const SeatmapCanvas = dynamic(
  () => import('@alisaitteke/seatmap-canvas/react').then(mod => mod.SeatmapCanvas),
  { ssr: false }
);

function Page() {
  return <SeatmapCanvas options={options} data={data} />;
}
```

## License

MIT - Copyright (c) 2024 Ali Sait TEKE

## Links

- [GitHub Repository](https://github.com/alisaitteke/seatmap-canvas)
- [Documentation](https://github.com/alisaitteke/seatmap-canvas)
- [Report Issues](https://github.com/alisaitteke/seatmap-canvas/issues)
