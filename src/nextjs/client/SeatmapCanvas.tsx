/*
 * SeatmapCanvas.tsx
 * Next.js Client Component for Seatmap Canvas
 * This component uses 'use client' directive for browser-only features
 */

'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
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

    // Keep latest values in refs so the init effect can run exactly once after
    // mount. Without this, callers passing inline `options`/`data` literals
    // would re-create the SeatMapCanvas instance on every render and trigger
    // a "Maximum update depth exceeded" loop.
    const optionsRef = useRef(options);
    const onReadyRef = useRef(onReady);
    const eventHandlersRef = useRef({
      onSeatClick,
      onSeatSelect,
      onSeatUnselect,
      onBlockClick,
    });

    useEffect(() => {
      optionsRef.current = options;
    }, [options]);

    useEffect(() => {
      onReadyRef.current = onReady;
    }, [onReady]);

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

    // Initialize seatmap exactly once after the component mounts on the client.
    useEffect(() => {
      if (!mounted || !containerRef.current) return;

      const instance = new SeatMapCanvas(containerRef.current, optionsRef.current);
      seatmapRef.current = instance;

      instance.eventManager.addEventListener('SEAT.CLICK', (seat: any) => {
        eventHandlersRef.current.onSeatClick?.(seat);
      });

      instance.eventManager.addEventListener('SEAT.SELECT', (seat: any) => {
        eventHandlersRef.current.onSeatSelect?.(seat);
      });

      instance.eventManager.addEventListener('SEAT.UNSELECT', (seat: any) => {
        eventHandlersRef.current.onSeatUnselect?.(seat);
      });

      instance.eventManager.addEventListener('BLOCK.CLICK', (block: any) => {
        eventHandlersRef.current.onBlockClick?.(block);
      });

      onReadyRef.current?.(instance);

      return () => {
        seatmapRef.current = null;
      };
    }, [mounted]);

    // Watch for data changes. We intentionally compare by JSON-serialized
    // payload so consumers can safely pass new array literals on every render
    // without triggering an effect (which would otherwise loop because
    // `replaceData` mutates internal state during the same render cycle).
    const dataSignature = React.useMemo(() => {
      if (!data || data.length === 0) return '';
      try {
        return JSON.stringify(data);
      } catch {
        return String(data.length);
      }
    }, [data]);

    useEffect(() => {
      if (!mounted) return;
      const instance = seatmapRef.current;
      if (!instance || !data || data.length === 0) return;

      instance.data.replaceData(data);

      if (autoZoomToVenue) {
        const timer = setTimeout(() => {
          seatmapRef.current?.zoomManager.zoomToVenue();
        }, 100);
        if (onDataChange) onDataChange(data);
        return () => clearTimeout(timer);
      }

      if (onDataChange) onDataChange(data);
    // `dataSignature` captures structural changes; `data`/`onDataChange` are
    // intentionally excluded to avoid render-loop on inline literals.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted, dataSignature, autoZoomToVenue]);

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
