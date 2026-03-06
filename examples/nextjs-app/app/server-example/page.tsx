import { SeatmapServerWrapper } from '@alisaitteke/seatmap-canvas/nextjs/app-router';
import { fetchVenueData } from '@/lib/data';
import Link from 'next/link';

export default async function ServerExamplePage() {
  return (
    <div className="container">
      <div className="header">
        <h1>Server Component Example</h1>
        <p>Seatmap with server-side data fetching</p>
      </div>

      <div className="nav">
        <Link href="/">← Back to Home</Link>
      </div>

      <div className="seatmap-wrapper">
        <SeatmapServerWrapper
          dataSource={() => fetchVenueData('venue-1')}
          options={{
            legend: true,
            style: {
              seat: {
                hover: '#e74c3c',
                selected: '#e74c3c',
              },
            },
          }}
          revalidate={60}
        />
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '8px' }}>
        <h3>About Server Components</h3>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          This page uses a Server Component to fetch data on the server before rendering.
          The seatmap data is fetched server-side and passed to the client component,
          reducing client-side JavaScript and improving initial load performance.
        </p>
      </div>
    </div>
  );
}
