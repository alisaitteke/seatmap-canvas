'use client';

import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import type { BlockData } from '@alisaitteke/seatmap-canvas/nextjs';

export default function ClientExamplePage() {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

  const blocks: BlockData[] = [
    {
      id: 'block-1',
      title: 'VIP Section',
      color: '#01a5ff',
      seats: Array.from({ length: 50 }, (_, i) => ({
        id: `seat-${i}`,
        x: (i % 10) * 40,
        y: Math.floor(i / 10) * 40,
        salable: Math.random() > 0.3,
        title: `V${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
        custom_data: {
          price: 100,
          category: 'VIP',
        },
      })),
    },
    {
      id: 'block-2',
      title: 'Standard Section',
      color: '#fccf4e',
      seats: Array.from({ length: 80 }, (_, i) => ({
        id: `seat-s-${i}`,
        x: 500 + (i % 10) * 35,
        y: (Math.floor(i / 10) * 35),
        salable: Math.random() > 0.2,
        title: `S${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
        custom_data: {
          price: 50,
          category: 'Standard',
        },
      })),
    },
  ];

  const handleSeatClick = (seat: any) => {
    if (seat.item.salable) {
      if (seat.isSelected()) {
        seat.unSelect();
      } else {
        seat.select();
      }
    }
  };

  const handleSeatSelect = (seat: any) => {
    setSelectedSeats((prev) => [...prev, seat]);
  };

  const handleSeatUnselect = (seat: any) => {
    setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
  };

  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + (seat.custom_data?.price || 0),
    0
  );

  return (
    <div className="container">
      <div className="header">
        <h1>Client Component Example</h1>
        <p>Interactive seatmap with client-side rendering</p>
      </div>

      <div className="nav">
        <Link href="/">← Back to Home</Link>
      </div>

      <div className="seatmap-wrapper">
        <SeatmapCanvas
          data={blocks}
          options={{
            legend: true,
            style: {
              seat: {
                hover: '#8fe100',
                color: '#f0f7fa',
                selected: '#8fe100',
                not_salable: '#ccc',
              },
            },
          }}
          onSeatClick={handleSeatClick}
          onSeatSelect={handleSeatSelect}
          onSeatUnselect={handleSeatUnselect}
        />
      </div>

      <div className="selected-seats">
        <h3>Selected Seats: {selectedSeats.length}</h3>
        {selectedSeats.length > 0 && (
          <>
            <div className="seat-list">
              {selectedSeats.map((seat) => (
                <div key={`${seat.block.id}-${seat.id}`} className="seat-item">
                  {seat.title} - ${seat.custom_data?.price || 0}
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
              Total: ${totalPrice}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
