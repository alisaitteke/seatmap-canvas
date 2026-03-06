import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container">
      <div className="header">
        <h1>Seatmap Canvas - Next.js App Router Examples</h1>
        <p>Interactive seat selection examples using Next.js App Router</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Link href="/client-example" style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Client Component Example</h2>
          <p style={{ color: '#666' }}>
            Interactive seatmap using client-side rendering with 'use client' directive.
          </p>
        </Link>

        <Link href="/server-example" style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Server Component Example</h2>
          <p style={{ color: '#666' }}>
            Seatmap with server-side data fetching using Server Components.
          </p>
        </Link>

        <Link href="/actions-example" style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Server Actions Example</h2>
          <p style={{ color: '#666' }}>
            Seat reservation with Server Actions for data mutations.
          </p>
        </Link>

        <Link href="/hook-example" style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Hook (useSeatmap) Example</h2>
          <p style={{ color: '#666' }}>
            Advanced usage with useSeatmap hook for custom controls.
          </p>
        </Link>
      </div>
    </div>
  );
}
