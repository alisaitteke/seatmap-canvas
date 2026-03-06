# Seatmap Canvas - Next.js Plugin

Next.js plugin for **Seatmap Canvas**, an advanced interactive seat selection library. Fully supports both App Router and Pages Router with Server Components, Server Actions, and SSG/ISR capabilities.

## Installation

```bash
npm install @alisaitteke/seatmap-canvas next react react-dom
```

## Quick Start

### App Router (Recommended)

The App Router is the modern approach for Next.js 13+ applications, featuring Server Components, Server Actions, and enhanced performance.

#### Basic Client Component Usage

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

#### Server Component with Data Fetching

```tsx
// app/venue/[id]/page.tsx
import { SeatmapServerWrapper } from '@alisaitteke/seatmap-canvas/nextjs/app-router';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

export default async function VenuePage({
  params,
}: {
  params: { id: string };
}) {
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

#### Using Server Actions

```tsx
// app/venue/[id]/page.tsx
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
    } else {
      alert(`Error: ${result.error}`);
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
      <button onClick={handleReserve} disabled={selectedSeats.length === 0}>
        Reserve {selectedSeats.length} seat(s)
      </button>
    </>
  );
}
```

### Pages Router

The Pages Router is the traditional Next.js routing system, still fully supported.

#### Basic Usage with Dynamic Import

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

// SSG with ISR
export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.API_URL}/venues/${params.id}/seatmap`);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 3600, // Revalidate every hour
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
```

#### Server-Side Rendering (SSR)

```tsx
// pages/venue/live/[id].tsx
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
import type { GetServerSideProps } from 'next';

export default function LiveVenuePage({ data }: { data: any }) {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <SeatmapCanvas data={data} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`${process.env.API_URL}/venues/${params?.id}/seatmap`);
  const data = await res.json();

  return { props: { data } };
};
```

## Advanced Usage

### Using the Hook (App Router)

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
      // Load data after initialization
      loadData([
        {
          id: 'block-1',
          title: 'Main Floor',
          seats: [{ id: 'seat-1', x: 0, y: 0, salable: true }],
        },
      ]);

      // Add custom event listeners
      addEventListener('SEAT.CLICK', (seat: any) => {
        console.log('Seat clicked:', seat);
      });
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

### Static Generation with Metadata (App Router)

```tsx
// app/venue/[id]/page.tsx
import { generateSeatmapMetadata } from '@alisaitteke/seatmap-canvas/nextjs/app-router';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return await generateSeatmapMetadata(params.id);
}

export default function VenuePage() {
  // Your component
}
```

### Generating Static Params

```tsx
// app/venue/[id]/page.tsx
import { generateSeatmapStaticParams } from '@alisaitteke/seatmap-canvas/nextjs/app-router';

export async function generateStaticParams() {
  const venues = await fetch(`${process.env.API_URL}/venues`).then((r) =>
    r.json()
  );
  return generateSeatmapStaticParams(venues);
}
```

## API Reference

### Components

#### `<SeatmapCanvas>`

Main client component for rendering the seatmap.

| Prop                | Type                             | Default | Description                          |
| ------------------- | -------------------------------- | ------- | ------------------------------------ |
| `options`           | `SeatmapOptions`                 | `{}`    | Configuration options                |
| `data`              | `BlockData[]`                    | `[]`    | Seat and block data                  |
| `className`         | `string`                         | `''`    | CSS class name                       |
| `style`             | `React.CSSProperties`            | `{}`    | Inline styles                        |
| `autoZoomToVenue`   | `boolean`                        | `true`  | Auto zoom to fit venue               |
| `onReady`           | `(instance) => void`             | -       | Callback when initialized            |
| `onSeatClick`       | `(seat) => void`                 | -       | Seat click handler                   |
| `onSeatSelect`      | `(seat) => void`                 | -       | Seat selection handler               |
| `onSeatUnselect`    | `(seat) => void`                 | -       | Seat unselection handler             |
| `onBlockClick`      | `(block) => void`                | -       | Block click handler                  |

#### `<SeatmapServerWrapper>` (App Router Only)

Server component wrapper for data fetching.

| Prop         | Type                                     | Default | Description                 |
| ------------ | ---------------------------------------- | ------- | --------------------------- |
| `dataSource` | `string \| (() => Promise<BlockData[]>)` | -       | API URL or fetch function   |
| `options`    | `SeatmapOptions`                         | `{}`    | Configuration options       |
| `fallback`   | `ReactNode`                              | -       | Custom loading component    |
| `revalidate` | `number`                                 | `3600`  | Cache revalidation time (s) |

### Hooks

#### `useSeatmap(options?, initialData?)`

React hook for advanced seatmap control.

**Returns:**

| Property            | Type                                         | Description                  |
| ------------------- | -------------------------------------------- | ---------------------------- |
| `seatmapInstance`   | `SeatMapCanvas \| null`                      | Seatmap instance             |
| `isReady`           | `boolean`                                    | Initialization status        |
| `selectedSeats`     | `any[]`                                      | Currently selected seats     |
| `containerRef`      | `React.RefObject<HTMLDivElement>`            | Container ref                |
| `loadData`          | `(data: BlockData[]) => void`                | Load seat data               |
| `getSelectedSeats`  | `() => any[]`                                | Get selected seats           |
| `getSeat`           | `(seatId: string, blockId: string) => any`   | Get specific seat            |
| `getBlocks`         | `() => any[]`                                | Get all blocks               |
| `zoomToBlock`       | `(blockId: string) => void`                  | Zoom to specific block       |
| `zoomToVenue`       | `() => void`                                 | Zoom to full venue           |
| `addEventListener`  | `(event: string, callback: Function) => void`| Add event listener           |

### Server Actions (App Router Only)

#### `loadSeatmapData(dataSource: string)`

Load seatmap data from API.

#### `selectSeats(seatIds: string[], blockId: string)`

Server-side seat selection.

#### `reserveSeats(venueId: string, seats: Array<{blockId, seatId}>, userId?: string)`

Create a reservation.

#### `cancelReservation(reservationId: string)`

Cancel an existing reservation.

#### `getSeatAvailability(venueId: string, blockId?: string)`

Get real-time availability.

### Utilities

#### `generateSeatmapStaticParams(venues: Venue[])`

Generate static params for `generateStaticParams`.

#### `getStaticSeatmapProps(venueId: string, revalidate?: number)`

Get static props for Pages Router ISR.

#### `generateSeatmapMetadata(venueId: string)`

Generate metadata for App Router.

## Common Issues & Solutions

### Hydration Errors

**Problem:** "Hydration failed because the initial UI does not match what was rendered on the server"

**Solution:**

The component already handles this by using client-side mounting detection. If you still experience issues:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';

export default function SafeSeatmap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return <SeatmapCanvas {...props} />;
}
```

### Window/Document Not Defined

**Problem:** "ReferenceError: window is not defined" or "document is not defined"

**Solution:**

For App Router, make sure you're using `'use client'` directive:

```tsx
'use client';

import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';
```

For Pages Router, use the provided dynamic import wrapper:

```tsx
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
// This already has { ssr: false }
```

### CSS Not Loading

**Problem:** Seatmap displays without styles.

**Solution:**

Always import the CSS file:

```tsx
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
```

In `app/layout.tsx` or at the top of your page component.

### TypeScript Errors

**Problem:** Type errors when using the component.

**Solution:**

Make sure you're importing types:

```tsx
import type {
  BlockData,
  SeatData,
  SeatmapOptions,
} from '@alisaitteke/seatmap-canvas/nextjs';
```

## Performance Optimization

### 1. Use Static Generation

For venue data that doesn't change frequently:

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

Lazy load the seatmap for better initial page load:

```tsx
import dynamic from 'next/dynamic';

const SeatmapCanvas = dynamic(
  () => import('@alisaitteke/seatmap-canvas/nextjs').then((mod) => mod.SeatmapCanvas),
  { ssr: false }
);
```

### 3. Reduce Bundle Size

Only import what you need:

```tsx
// Good
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';

// Avoid
import * as Seatmap from '@alisaitteke/seatmap-canvas/nextjs';
```

### 4. Use Server Components When Possible

Fetch data in Server Components to reduce client bundle:

```tsx
// Server Component
async function VenueData({ id }: { id: string }) {
  const data = await fetchVenueData(id);
  return <SeatmapCanvas data={data} />;
}
```

## Migration Guide

### From React to Next.js

1. **Install Next.js package:**

```bash
npm install next
```

2. **Update imports:**

```tsx
// Before (React)
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/react';

// After (Next.js App Router)
'use client';
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';

// After (Next.js Pages Router)
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
```

3. **Add 'use client' directive (App Router only):**

```tsx
'use client';

import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';
// rest of your component
```

4. **Props remain the same** - no code changes needed!

### From Pages Router to App Router

1. **Update imports:**

```tsx
// Before
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';

// After
'use client';
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/app-router';
```

2. **Convert data fetching:**

```tsx
// Before (getStaticProps)
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

// After (Server Component)
async function VenuePage() {
  const data = await fetchData();
  return <SeatmapCanvas data={data} />;
}
```

## Examples

See the `/examples` directory for complete examples:

- **App Router:** `examples/nextjs-app/`
  - Client Components
  - Server Components with data fetching
  - Server Actions
  - Streaming and Suspense
  - Metadata API

- **Pages Router:** `examples/nextjs-pages/`
  - SSG (Static Site Generation)
  - ISR (Incremental Static Regeneration)
  - SSR (Server-Side Rendering)
  - API Routes

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

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

## Browser Compatibility

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android latest

## License

MIT - Copyright (c) 2024 Ali Sait TEKE

## Links

- [GitHub Repository](https://github.com/alisaitteke/seatmap-canvas)
- [Main Documentation](https://github.com/alisaitteke/seatmap-canvas)
- [Report Issues](https://github.com/alisaitteke/seatmap-canvas/issues)
- [Live Demo](https://seatmap.io/demo)
