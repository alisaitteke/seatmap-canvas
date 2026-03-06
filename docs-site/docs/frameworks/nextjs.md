# Next.js

Use Seatmap Canvas with Next.js (App Router & Pages Router).

## Installation

```bash npm2yarn
npm install @alisaitteke/seatmap-canvas next react react-dom
```

:::info Requirements
- Next.js 13.0.0 or higher
- React 18.0.0 or higher
- TypeScript support included
:::

:::tip Router Support
This plugin supports both **App Router** (Next.js 13+) and **Pages Router**. Choose the import path that matches your setup.
:::

## App Router (Recommended)

The modern Next.js routing system with Server Components and Server Actions.

### Client Component Usage

```tsx
// app/venue/page.tsx
'use client';

import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

export default function VenuePage() {
  const handleSeatClick = (seat: any) => {
    if (seat.item.salable) {
      seat.isSelected() ? seat.unSelect() : seat.select();
    }
  };

  const blocks = [
    {
      id: 'block-1',
      title: 'VIP Section',
      color: '#01a5ff',
      seats: [
        { id: 'seat-1', x: 50, y: 50, salable: true, title: 'A1' },
        { id: 'seat-2', x: 80, y: 50, salable: true, title: 'A2' },
      ],
    },
  ];

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <SeatmapCanvas
        data={blocks}
        options={{ legend: true }}
        onSeatClick={handleSeatClick}
      />
    </div>
  );
}
```

### Server Component with Data Fetching

```tsx
// app/venue/[id]/page.tsx
import { SeatmapServerWrapper } from '@alisaitteke/seatmap-canvas/nextjs/app-router';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

export default async function VenuePage({ params }: { params: { id: string } }) {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <SeatmapServerWrapper
        dataSource={`${process.env.API_URL}/venues/${params.id}/seatmap`}
        options={{ legend: true }}
        revalidate={3600} // Cache for 1 hour
      />
    </div>
  );
}
```

### Using Server Actions

```tsx
'use client';

import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/app-router';
import { reserveSeats } from '@alisaitteke/seatmap-canvas/nextjs/app-router';
import { useState } from 'react';

export default function VenueReservation({ venueId }: { venueId: string }) {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

  const handleReserve = async () => {
    const seats = selectedSeats.map((seat) => ({
      blockId: seat.block.id,
      seatId: seat.id,
    }));

    const result = await reserveSeats(venueId, seats);
    
    if (result.success) {
      alert(`Reservation created: ${result.data?.reservationId}`);
    }
  };

  return (
    <>
      <SeatmapCanvas
        onSeatSelect={(seat) => setSelectedSeats([...selectedSeats, seat])}
        onSeatUnselect={(seat) =>
          setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id))
        }
      />
      <button onClick={handleReserve}>
        Reserve {selectedSeats.length} seat(s)
      </button>
    </>
  );
}
```

### Using the Hook

```tsx
'use client';

import { useSeatmap } from '@alisaitteke/seatmap-canvas/nextjs';
import { useEffect } from 'react';

export default function CustomSeatmap() {
  const {
    containerRef,
    isReady,
    selectedSeats,
    loadData,
    zoomToBlock,
    addEventListener,
  } = useSeatmap({ legend: true });

  useEffect(() => {
    if (isReady) {
      loadData([
        {
          id: 'block-1',
          title: 'Main Floor',
          seats: [{ id: 'seat-1', x: 0, y: 0, salable: true }],
        },
      ]);
    }
  }, [isReady]);

  return (
    <div>
      <div>Selected: {selectedSeats.length} seats</div>
      <button onClick={() => zoomToBlock('block-1')}>Zoom to Block 1</button>
      <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
    </div>
  );
}
```

## Pages Router

The traditional Next.js routing system.

### Basic Usage

```tsx
// pages/venue/[id].tsx
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
import type { BlockData } from '@alisaitteke/seatmap-canvas/nextjs';

export default function VenuePage({ data }: { data: BlockData[] }) {
  const handleSeatClick = (seat: any) => {
    if (seat.item.salable) {
      seat.isSelected() ? seat.unSelect() : seat.select();
    }
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <SeatmapCanvas data={data} onSeatClick={handleSeatClick} />
    </div>
  );
}
```

### Static Site Generation (SSG)

```tsx
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${process.env.API_URL}/venues/${params?.id}/seatmap`);
  const data = await res.json();

  return {
    props: { data },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
```

### Incremental Static Regeneration (ISR)

```tsx
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${process.env.API_URL}/venues/${params?.id}/seatmap`);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 3600, // Revalidate every hour
  };
};
```

### Server-Side Rendering (SSR)

```tsx
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`${process.env.API_URL}/venues/${params?.id}/seatmap`);
  const data = await res.json();

  return { props: { data } };
};
```

## API Reference

### Component Props (App Router & Pages Router)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SeatmapOptions` | `{}` | Configuration options |
| `data` | `BlockData[]` | `[]` | Seat and block data |
| `className` | `string` | `''` | CSS class name |
| `style` | `React.CSSProperties` | `{}` | Inline styles |
| `autoZoomToVenue` | `boolean` | `true` | Auto zoom to fit venue |
| `onReady` | `(instance) => void` | - | Callback when initialized |
| `onSeatClick` | `(seat) => void` | - | Seat click handler |
| `onSeatSelect` | `(seat) => void` | - | Seat selection handler |
| `onSeatUnselect` | `(seat) => void` | - | Seat unselection handler |
| `onBlockClick` | `(block) => void` | - | Block click handler |

### Server Wrapper Props (App Router Only)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `string \| (() => Promise<BlockData[]>)` | - | API URL or fetch function |
| `options` | `SeatmapOptions` | `{}` | Configuration options |
| `fallback` | `ReactNode` | - | Custom loading component |
| `revalidate` | `number` | `3600` | Cache revalidation time (seconds) |

### Server Actions (App Router Only)

```tsx
import {
  loadSeatmapData,
  selectSeats,
  reserveSeats,
  cancelReservation,
  getSeatAvailability,
} from '@alisaitteke/seatmap-canvas/nextjs/app-router';
```

#### `loadSeatmapData(venueId: string)`
Load seatmap data from API.

#### `reserveSeats(venueId, seats, userId?)`
Create a reservation.

#### `cancelReservation(reservationId)`
Cancel an existing reservation.

#### `getSeatAvailability(venueId, blockId?)`
Get real-time availability.

### Utilities

```tsx
import {
  generateSeatmapStaticParams,
  getStaticSeatmapProps,
  generateSeatmapMetadata,
} from '@alisaitteke/seatmap-canvas/nextjs/app-router';
```

## Common Issues

### Hydration Errors

The component handles hydration automatically. If you encounter issues:

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function SafeSeatmap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  return <SeatmapCanvas {...props} />;
}
```

### Window/Document Not Defined

**App Router:** Ensure you're using `'use client'` directive.

**Pages Router:** The dynamic import wrapper handles this automatically.

### CSS Not Loading

Always import the CSS file:

```tsx
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
```

## TypeScript Types

```typescript
import type {
  SeatmapOptions,
  SeatmapCanvasProps,
  BlockData,
  SeatData,
  SeatClickEvent,
  UseSeatmapReturn,
  ServerActionResult,
} from '@alisaitteke/seatmap-canvas/nextjs';
```

## Performance Optimization

### 1. Use Static Generation

For data that doesn't change frequently:

```tsx
// App Router
export const revalidate = 3600; // 1 hour

// Pages Router
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 3600,
  };
}
```

### 2. Code Splitting

```tsx
import dynamic from 'next/dynamic';

const SeatmapCanvas = dynamic(
  () => import('@alisaitteke/seatmap-canvas/nextjs').then((mod) => mod.SeatmapCanvas),
  { ssr: false }
);
```

### 3. Server Components

Fetch data in Server Components to reduce client bundle:

```tsx
async function VenueData({ id }: { id: string }) {
  const data = await fetchVenueData(id);
  return <SeatmapCanvas data={data} />;
}
```

## Migration Guide

### From React to Next.js

1. Install Next.js:
```bash
npm install next
```

2. Update imports:
```tsx
// Before (React)
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/react';

// After (Next.js App Router)
'use client';
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';

// After (Next.js Pages Router)
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
```

3. Add `'use client'` directive (App Router only)

Props remain the same - no code changes needed!

## Examples

Check out complete examples:

- [App Router Examples](https://github.com/alisaitteke/seatmap-canvas/tree/master/examples/nextjs-app)
- [Pages Router Examples](https://github.com/alisaitteke/seatmap-canvas/tree/master/examples/nextjs-pages)

## Next Steps

- Explore [API Reference](/api/configuration)
- Learn about [Event Handling](/core-concepts/event-system)
- Check out [Custom Shapes](/features/custom-shapes)
