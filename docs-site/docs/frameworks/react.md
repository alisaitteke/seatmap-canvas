# React

Use Seatmap Canvas with React.

## Installation

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas react react-dom
```

:::info Requirements
- React 18.0.0 or higher
- TypeScript support included
:::

## Basic Usage

### Import and Setup

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
        not_salable: '#0088d3',
      }
    }
  };

  const blocks: BlockData[] = [
    {
      id: 'block-1',
      title: 'Section A',
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
        }
      ]
    }
  ];

  const handleSeatClick = (seat: any) => {
    if (seat.isSelected()) {
      seat.unSelect();
    } else if (seat.item.salable) {
      seat.select();
    }
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <SeatmapCanvas
        options={seatmapOptions}
        data={blocks}
        onSeatClick={handleSeatClick}
      />
    </div>
  );
}

export default App;
```

## Using Ref for Advanced Control

Access the seatmap instance directly using refs:

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
    return selectedSeats;
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
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

## Hook-Based Usage (Advanced)

For more control, use the `useSeatmap` hook:

```tsx
import React, { useEffect } from 'react';
import { useSeatmap } from '@alisaitteke/seatmap-canvas/react';

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
      loadData([
        {
          id: 'block-1',
          title: 'Section A',
          seats: [
            { id: 'seat-1', x: 0, y: 0, title: 'A1', salable: true }
          ]
        }
      ]);

      addEventListener('SEAT.CLICK', (seat: any) => {
        if (seat.item.salable) {
          seat.isSelected() ? seat.unSelect() : seat.select();
        }
      });
    }
  }, [isReady]);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => zoomToVenue()}>Zoom Out</button>
        <button onClick={() => zoomToBlock('block-1')}>Zoom to Block</button>
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

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SeatmapOptions` | `{}` | Seatmap configuration options |
| `data` | `BlockData[]` | `[]` | Array of blocks with seats |
| `className` | `string` | `''` | CSS class for container |
| `style` | `React.CSSProperties` | `{}` | Inline styles for container |
| `autoZoomToVenue` | `boolean` | `true` | Auto zoom to venue after data load |
| `onReady` | `(instance) => void` | - | Callback when seatmap is initialized |
| `onSeatClick` | `(seat) => void` | - | Callback when a seat is clicked |
| `onSeatSelect` | `(seat) => void` | - | Callback when a seat is selected |
| `onSeatUnselect` | `(seat) => void` | - | Callback when a seat is unselected |
| `onBlockClick` | `(block) => void` | - | Callback when a block is clicked |

## TypeScript Types

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

## Complete Example

Here's a complete booking example with state management:

```tsx
import React, { useState, useRef } from 'react';
import { SeatmapCanvas, SeatmapCanvasRef } from '@alisaitteke/seatmap-canvas/react';
import type { BlockData, SeatmapOptions } from '@alisaitteke/seatmap-canvas/react';

interface SelectedSeatInfo {
  id: string;
  title: string;
  price: number;
  blockTitle: string;
}

function BookingApp() {
  const seatmapRef = useRef<SeatmapCanvasRef>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeatInfo[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const options: SeatmapOptions = {
    legend: true,
    style: {
      seat: {
        radius: 12,
        color: '#6796ff',
        hover: '#5671ff',
        selected: '#56aa45',
        not_salable: '#424747',
      }
    }
  };

  const blocks: BlockData[] = [
    {
      id: 'vip',
      title: 'VIP Section',
      color: '#ff6b6b',
      seats: Array.from({ length: 20 }, (_, i) => ({
        id: `vip-${i}`,
        title: `V${i + 1}`,
        x: (i % 5) * 30,
        y: Math.floor(i / 5) * 30,
        salable: true,
        custom_data: { price: 100 }
      }))
    },
    {
      id: 'standard',
      title: 'Standard Section',
      color: '#4ecdc4',
      seats: Array.from({ length: 20 }, (_, i) => ({
        id: `std-${i}`,
        title: `S${i + 1}`,
        x: (i % 5) * 30 + 200,
        y: Math.floor(i / 5) * 30,
        salable: true,
        custom_data: { price: 50 }
      }))
    }
  ];

  const handleSeatClick = (seat: any) => {
    if (!seat.item.salable) return;

    if (seat.isSelected()) {
      seat.unSelect();
    } else {
      seat.select();
    }

    updateSelectedSeats();
  };

  const updateSelectedSeats = () => {
    const selected = seatmapRef.current?.seatmap?.data.getSelectedSeats() || [];
    const seatsInfo: SelectedSeatInfo[] = selected.map((seat: any) => ({
      id: seat.id,
      title: seat.title,
      price: seat.custom_data.price,
      blockTitle: seat.block.title
    }));
    
    setSelectedSeats(seatsInfo);
    setTotalPrice(seatsInfo.reduce((sum, seat) => sum + seat.price, 0));
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    alert(`Checkout: ${selectedSeats.length} seats for $${totalPrice}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Event Booking</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Seatmap */}
        <div style={{ flex: 2 }}>
          <div style={{ marginBottom: '10px' }}>
            <button onClick={() => seatmapRef.current?.seatmap?.zoomManager.zoomToVenue()}>
              Zoom Out
            </button>
          </div>
          
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <SeatmapCanvas
              ref={seatmapRef}
              options={options}
              data={blocks}
              onSeatClick={handleSeatClick}
              style={{ height: '600px' }}
            />
          </div>
        </div>

        {/* Cart */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px',
            position: 'sticky',
            top: '20px'
          }}>
            <h2>Selected Seats ({selectedSeats.length})</h2>
            
            {selectedSeats.length === 0 ? (
              <p style={{ color: '#666' }}>No seats selected</p>
            ) : (
              <>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedSeats.map(seat => (
                    <li key={seat.id} style={{ 
                      padding: '10px', 
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>{seat.blockTitle} - {seat.title}</span>
                      <span style={{ fontWeight: 'bold' }}>${seat.price}</span>
                    </li>
                  ))}
                </ul>
                
                <div style={{ 
                  marginTop: '20px', 
                  paddingTop: '20px', 
                  borderTop: '2px solid #333' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    style={{
                      width: '100%',
                      marginTop: '20px',
                      padding: '12px',
                      backgroundColor: '#56aa45',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingApp;
```

## Next.js Support

For Next.js, import the component dynamically to avoid SSR issues:

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

## Custom Shapes

```tsx
const options: SeatmapOptions = {
  style: {
    seat: {
      // Rectangle
      shape: "rect",
      size: 24,
      corner_radius: 6,
      
      // Or custom path
      shape: "path",
      path: "M12 0L24 12L12 24L0 12Z",
      path_box: "0 0 24 24",
      size: 24,
      
      // Or SVG file
      shape: "svg",
      svg: "/assets/custom-seat.svg",
      radius: 12
    }
  }
};
```

## Next Steps

- Check out [complete examples](https://github.com/alisaitteke/seatmap-canvas/tree/master/examples/react)
- Explore [API Reference](/api/configuration)
- Learn about [Event Handling](/core-concepts/event-system)
