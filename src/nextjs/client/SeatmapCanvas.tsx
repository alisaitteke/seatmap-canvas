/*
 * SeatmapCanvas.tsx
 * Next.js Client Component for Seatmap Canvas
 * This component uses 'use client' directive for browser-only features
 */

'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { SeatMapCanvas } from '../../lib/canvas.index';
import type { SeatmapCanvasProps, SeatmapCanvasRef } from '../types';

const SeatmapCanvasComponent = forwardRef<SeatmapCanvasRef, SeatmapCanvasProps>(
  (
    {
      options = {},
      data = [],
      className = '',
      style = {},
      autoZoomToVenue = true,
      onReady,
      onSeatClick,
      onSeatSelect,
      onSeatUnselect,
      onBlockClick,
      onDataChange,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const seatmapRef = useRef<SeatMapCanvas | null>(null);
    const [mounted, setMounted] = useState(false);
    const eventHandlersRef = useRef({
      onSeatClick,
      onSeatSelect,
      onSeatUnselect,
      onBlockClick,
    });

    // Update event handlers ref when props change
    useEffect(() => {
      eventHandlersRef.current = {
        onSeatClick,
        onSeatSelect,
        onSeatUnselect,
        onBlockClick,
      };
    }, [onSeatClick, onSeatSelect, onSeatUnselect, onBlockClick]);

    // Handle client-side mounting to prevent hydration mismatches
    useEffect(() => {
      setMounted(true);
    }, []);

    // Initialize seatmap only after component is mounted (client-side only)
    useEffect(() => {
      if (!mounted || !containerRef.current) return;

      // Initialize Seatmap Canvas
      seatmapRef.current = new SeatMapCanvas(containerRef.current, options);

      // Setup event listeners
      if (seatmapRef.current) {
        const instance = seatmapRef.current;

        instance.eventManager.addEventListener('SEAT.CLICK', (seat: any) => {
          if (eventHandlersRef.current.onSeatClick) {
            eventHandlersRef.current.onSeatClick(seat);
          }
        });

        instance.eventManager.addEventListener('SEAT.SELECT', (seat: any) => {
          if (eventHandlersRef.current.onSeatSelect) {
            eventHandlersRef.current.onSeatSelect(seat);
          }
        });

        instance.eventManager.addEventListener('SEAT.UNSELECT', (seat: any) => {
          if (eventHandlersRef.current.onSeatUnselect) {
            eventHandlersRef.current.onSeatUnselect(seat);
          }
        });

        instance.eventManager.addEventListener('BLOCK.CLICK', (block: any) => {
          if (eventHandlersRef.current.onBlockClick) {
            eventHandlersRef.current.onBlockClick(block);
          }
        });

        // Load initial data
        if (data && data.length > 0) {
          instance.data.replaceData(data);
          if (autoZoomToVenue) {
            setTimeout(() => {
              instance.zoomManager.zoomToVenue();
            }, 100);
          }
        }

        // Call onReady callback
        if (onReady) {
          onReady(instance);
        }
      }

      // Cleanup
      return () => {
        seatmapRef.current = null;
      };
    }, [mounted, options]); // Only run once after mount

    // Watch for data changes
    useEffect(() => {
      if (!mounted) return;
      
      if (seatmapRef.current && data && data.length > 0) {
        seatmapRef.current.data.replaceData(data);
        if (autoZoomToVenue) {
          setTimeout(() => {
            seatmapRef.current?.zoomManager.zoomToVenue();
          }, 100);
        }
        if (onDataChange) {
          onDataChange(data);
        }
      }
    }, [data, autoZoomToVenue, onDataChange, mounted]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getInstance: () => seatmapRef.current,
      seatmap: seatmapRef.current,
    }));

    // Show skeleton/placeholder during SSR and initial client render
    if (!mounted) {
      return (
        <div
          className={className}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            ...style,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e0e0e0',
              borderTop: '4px solid #666',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={className}
        style={{ width: '100%', height: '100%', ...style }}
      />
    );
  }
);

SeatmapCanvasComponent.displayName = 'SeatmapCanvas';

export default SeatmapCanvasComponent;
