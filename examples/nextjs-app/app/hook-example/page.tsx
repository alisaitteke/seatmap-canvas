'use client';

import { useSeatmap } from '@alisaitteke/seatmap-canvas/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HookExamplePage() {
  const {
    containerRef,
    isReady,
    selectedSeats,
    loadData,
    zoomToBlock,
    zoomToVenue,
    getBlocks,
  } = useSeatmap({
    legend: true,
    style: {
      seat: {
        hover: '#16a085',
        selected: '#16a085',
      },
    },
  });

  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    if (isReady) {
      const data = [
        {
          id: 'block-hook-1',
          title: 'Left Wing',
          color: '#e67e22',
          seats: Array.from({ length: 30 }, (_, i) => ({
            id: `seat-l-${i}`,
            x: (i % 6) * 50,
            y: Math.floor(i / 6) * 50,
            salable: true,
            title: `L${Math.floor(i / 6) + 1}-${(i % 6) + 1}`,
          })),
        },
        {
          id: 'block-hook-2',
          title: 'Right Wing',
          color: '#27ae60',
          seats: Array.from({ length: 30 }, (_, i) => ({
            id: `seat-r-${i}`,
            x: 350 + (i % 6) * 50,
            y: Math.floor(i / 6) * 50,
            salable: true,
            title: `R${Math.floor(i / 6) + 1}-${(i % 6) + 1}`,
          })),
        },
      ];

      loadData(data);
      setBlocks(getBlocks());
    }
  }, [isReady, loadData, getBlocks]);

  return (
    <div className="container">
      <div className="header">
        <h1>Hook (useSeatmap) Example</h1>
        <p>Advanced usage with useSeatmap hook</p>
      </div>

      <div className="nav">
        <Link href="/">← Back to Home</Link>
      </div>

      <div className="seatmap-wrapper">
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="controls">
        <button onClick={zoomToVenue}>Zoom to Venue</button>
        {blocks.map((block) => (
          <button key={block.id} onClick={() => zoomToBlock(block.id)}>
            Zoom to {block.title}
          </button>
        ))}
      </div>

      <div className="selected-seats">
        <h3>Selected Seats (via hook): {selectedSeats.length}</h3>
        {selectedSeats.length > 0 && (
          <div className="seat-list">
            {selectedSeats.map((seat: any) => (
              <div key={`${seat.block.id}-${seat.id}`} className="seat-item">
                {seat.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
