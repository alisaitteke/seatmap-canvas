# Seatmap Canvas - Next.js App Router Example

This example demonstrates how to use Seatmap Canvas with Next.js App Router.

## Features

- ✅ Client Components with `'use client'` directive
- ✅ Server Components with data fetching
- ✅ Server Actions for data mutations
- ✅ `useSeatmap` hook for advanced control
- ✅ TypeScript support
- ✅ Hydration-safe rendering

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the examples.

## Examples Included

### 1. Client Component Example (`/client-example`)

Basic client-side rendered seatmap with interactive seat selection.

**Key Features:**
- Client Component with `'use client'`
- Real-time seat selection
- Selected seats tracking
- Price calculation

### 2. Server Component Example (`/server-example`)

Demonstrates server-side data fetching with Server Components.

**Key Features:**
- Server Component for data fetching
- `SeatmapServerWrapper` usage
- Suspense for loading states
- ISR (Incremental Static Regeneration)

### 3. Server Actions Example (`/actions-example`)

Shows how to use Server Actions for seat reservations.

**Key Features:**
- Server Actions for mutations
- Form handling
- Reservation confirmation
- Error handling

### 4. Hook Example (`/hook-example`)

Advanced usage with the `useSeatmap` hook.

**Key Features:**
- Custom controls
- Zoom management
- Direct API access
- Event handling

## Project Structure

```
nextjs-app/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── client-example/
│   │   └── page.tsx            # Client Component example
│   ├── server-example/
│   │   └── page.tsx            # Server Component example
│   ├── actions-example/
│   │   └── page.tsx            # Server Actions example
│   └── hook-example/
│       └── page.tsx            # useSeatmap hook example
├── lib/
│   └── data.ts                 # Mock data utilities
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## Key Learnings

### Hydration Safety

The seatmap component handles SSR/CSR differences automatically:

```tsx
'use client';

import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';

// Component automatically handles:
// - Client-side mounting detection
// - SSR skeleton rendering
// - Hydration-safe initialization
```

### Server Components

Fetch data on the server for better performance:

```tsx
import { SeatmapServerWrapper } from '@alisaitteke/seatmap-canvas/nextjs/app-router';

export default async function Page() {
  return (
    <SeatmapServerWrapper
      dataSource={() => fetchData()}
      revalidate={3600}
    />
  );
}
```

### Server Actions

Handle mutations server-side:

```tsx
'use client';

import { reserveSeats } from '@alisaitteke/seatmap-canvas/nextjs/app-router';

async function handleReserve() {
  const result = await reserveSeats(venueId, seats);
  // Handle result
}
```

## Documentation

For more information, see:

- [Next.js Plugin Documentation](../../src/nextjs/README.md)
- [Main Documentation](../../README.md)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
