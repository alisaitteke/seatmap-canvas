# Seatmap Canvas - Next.js Pages Router Example

This example demonstrates how to use Seatmap Canvas with Next.js Pages Router.

## Features

- ✅ SSG (Static Site Generation)
- ✅ ISR (Incremental Static Regeneration)
- ✅ SSR (Server-Side Rendering)
- ✅ Client-Side Rendering with dynamic import
- ✅ TypeScript support

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to see the examples.

## Examples Included

### 1. SSG Example (`/ssg-example`)

Static Site Generation using `getStaticProps`.

**When to use:**
- Content that rarely changes
- Best performance (served as static HTML)
- No runtime data fetching overhead

```tsx
export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchSeatmapData();
  return { props: { data } };
};
```

### 2. ISR Example (`/isr-example`)

Incremental Static Regeneration with 60-second revalidation.

**When to use:**
- Content that updates periodically
- Balance between static generation and fresh data
- Background regeneration

```tsx
export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchSeatmapData();
  return {
    props: { data },
    revalidate: 60, // Regenerate every 60 seconds
  };
};
```

### 3. SSR Example (`/ssr-example`)

Server-Side Rendering using `getServerSideProps`.

**When to use:**
- Real-time data that changes frequently
- User-specific content
- Always fresh data on every request

```tsx
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchSeatmapData();
  return { props: { data } };
};
```

### 4. Client-Side Example (`/client-example`)

Client-side rendering with dynamic import (SSR disabled).

**When to use:**
- Interactive features requiring browser APIs
- Avoiding hydration issues
- Client-only functionality

```tsx
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
// Automatically uses dynamic import with { ssr: false }
```

## Project Structure

```
nextjs-pages/
├── pages/
│   ├── _app.tsx                # App wrapper
│   ├── index.tsx               # Home page
│   ├── ssg-example.tsx         # SSG example
│   ├── isr-example.tsx         # ISR example
│   ├── ssr-example.tsx         # SSR example
│   └── client-example.tsx      # Client-side example
├── styles/
│   └── globals.css             # Global styles
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## Key Differences from App Router

### Data Fetching

**Pages Router:**
```tsx
// SSG
export async function getStaticProps() {
  return { props: { data } };
}

// SSR
export async function getServerSideProps() {
  return { props: { data } };
}
```

**App Router:**
```tsx
// Server Component (default)
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

### Dynamic Import

**Pages Router:**
```tsx
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
// Pre-configured with { ssr: false }
```

**App Router:**
```tsx
'use client';
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';
// Uses 'use client' directive
```

## Performance Comparison

| Method | Build Time | Runtime | Data Freshness | Use Case                   |
| ------ | ---------- | ------- | -------------- | -------------------------- |
| SSG    | Slow       | Fast    | Static         | Blogs, docs, marketing     |
| ISR    | Slow       | Fast    | Periodic       | Product catalogs, news     |
| SSR    | Fast       | Slow    | Real-time      | Dashboards, user profiles  |
| CSR    | Fast       | Medium  | Dynamic        | Interactive tools, games   |

## Documentation

For more information, see:

- [Next.js Plugin Documentation](../../src/nextjs/README.md)
- [Main Documentation](../../README.md)
- [Next.js Pages Router Documentation](https://nextjs.org/docs/pages)

## License

MIT
