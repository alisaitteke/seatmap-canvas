/*
 * SeatmapCanvas.tsx
 * React Component for Seatmap Canvas
 */

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { SeatMapCanvas } from '../lib/canvas.index';
import type { SeatmapCanvasProps } from './types';

export interface SeatmapCanvasRef {
  getInstance: () => SeatMapCanvas | null;
  seatmap: SeatMapCanvas | null;
}

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

    // Initialize seatmap
    useEffect(() => {
      if (!containerRef.current) return;

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
    }, []); // Only run once on mount

    // Watch for data changes
    useEffect(() => {
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
    }, [data, autoZoomToVenue, onDataChange]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getInstance: () => seatmapRef.current,
      seatmap: seatmapRef.current,
    }));

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
