import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
import type { BlockData } from '@alisaitteke/seatmap-canvas/nextjs';
import Link from 'next/link';
import { useState } from 'react';

export default function ClientExamplePage() {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

  const data: BlockData[] = [
    {
      id: 'block-client-1',
      title: 'Client Block',
      color: '#3498db',
      seats: Array.from({ length: 45 }, (_, i) => ({
        id: `seat-${i}`,
        x: (i % 9) * 42,
        y: Math.floor(i / 9) * 42,
        salable: true,
        title: `C${Math.floor(i / 9) + 1}-${(i % 9) + 1}`,
      })),
    },
  ];

  const handleSeatClick = (seat: any) => {
    if (seat.item.salable) {
      if (seat.isSelected()) {
        seat.unSelect();
        setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
      } else {
        seat.select();
        setSelectedSeats((prev) => [...prev, seat]);
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Client-Side Example</h1>
        <p>Dynamic import with SSR disabled</p>
      </div>

      <div className="nav">
        <Link href="/">← Back to Home</Link>
      </div>

      <div className="seatmap-wrapper">
        <SeatmapCanvas
          data={data}
          options={{
            legend: true,
            style: {
              seat: {
                hover: '#3498db',
                selected: '#3498db',
              },
            },
          }}
          onSeatClick={handleSeatClick}
        />
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '8px' }}>
        <h3>Selected Seats: {selectedSeats.length}</h3>
        {selectedSeats.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
            {selectedSeats.map((seat) => (
              <div key={seat.id} style={{ padding: '0.5rem', background: '#f0f0f0', borderRadius: '4px', fontSize: '0.875rem' }}>
                {seat.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '8px' }}>
        <h3>About Client-Side Rendering</h3>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          This example uses dynamic import with ssr: false to prevent server-side rendering.
          The seatmap is only rendered on the client, avoiding hydration issues with browser-only features.
        </p>
      </div>
    </div>
  );
}
