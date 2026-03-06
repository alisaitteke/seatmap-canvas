'use client';

import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/app-router';
import { reserveSeats } from '@alisaitteke/seatmap-canvas/nextjs/app-router';
import Link from 'next/link';
import { useState } from 'react';
import type { BlockData } from '@alisaitteke/seatmap-canvas/nextjs';

export default function ActionsExamplePage() {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const blocks: BlockData[] = [
    {
      id: 'block-action-1',
      title: 'Main Hall',
      color: '#c0392b',
      seats: Array.from({ length: 50 }, (_, i) => ({
        id: `seat-m-${i}`,
        x: (i % 10) * 40,
        y: Math.floor(i / 10) * 40,
        salable: true,
        title: `M${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
        custom_data: {
          price: 75,
        },
      })),
    },
  ];

  const handleSeatSelect = (seat: any) => {
    setSelectedSeats((prev) => [...prev, seat]);
  };

  const handleSeatUnselect = (seat: any) => {
    setSelectedSeats((prev) =>
      prev.filter((s) => s.id !== seat.id || s.block.id !== seat.block.id)
    );
  };

  const handleReserve = async () => {
    if (selectedSeats.length === 0) return;

    setLoading(true);
    try {
      const seats = selectedSeats.map((seat) => ({
        blockId: seat.block.id,
        seatId: seat.id,
      }));

      const result = await reserveSeats('venue-1', seats, 'user-123');

      if (result.success && result.data) {
        setReservationId(result.data.reservationId);
        alert(`Reservation successful! ID: ${result.data.reservationId}`);
      } else {
        alert(`Reservation failed: ${result.error}`);
      }
    } catch (error) {
      alert('Failed to create reservation');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + (seat.custom_data?.price || 0),
    0
  );

  return (
    <div className="container">
      <div className="header">
        <h1>Server Actions Example</h1>
        <p>Seat reservation with Server Actions</p>
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
                hover: '#c0392b',
                selected: '#c0392b',
              },
            },
          }}
          onSeatSelect={handleSeatSelect}
          onSeatUnselect={handleSeatUnselect}
          onSeatClick={(seat: any) => {
            if (seat.item.salable) {
              seat.isSelected() ? seat.unSelect() : seat.select();
            }
          }}
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
            <div className="controls">
              <button onClick={handleReserve} disabled={loading}>
                {loading ? 'Processing...' : `Reserve ${selectedSeats.length} seat(s)`}
              </button>
            </div>
          </>
        )}

        {reservationId && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1rem',
              background: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '4px',
              color: '#155724',
            }}
          >
            <strong>Reservation Confirmed!</strong>
            <br />
            Reservation ID: {reservationId}
          </div>
        )}
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '8px' }}>
        <h3>About Server Actions</h3>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          This example demonstrates using Next.js Server Actions for seat reservation.
          When you click "Reserve", a Server Action is called that processes the
          reservation server-side, providing secure and efficient data mutations.
        </p>
      </div>
    </div>
  );
}
