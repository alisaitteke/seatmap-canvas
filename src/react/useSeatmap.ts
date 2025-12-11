/*
 * useSeatmap.ts
 * React Hook for Seatmap Canvas
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { SeatMapCanvas } from '../lib/canvas.index';
import type { SeatmapOptions, BlockData, UseSeatmapReturn } from './types';

export function useSeatmap(
  options: SeatmapOptions = {},
  initialData: BlockData[] = []
): UseSeatmapReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const seatmapRef = useRef<SeatMapCanvas | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

  // Initialize seatmap
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      seatmapRef.current = new SeatMapCanvas(containerRef.current, options);
      setIsReady(true);

      // Update selected seats on seat events
      const updateSelectedSeats = () => {
        if (seatmapRef.current) {
          setSelectedSeats(seatmapRef.current.data.getSelectedSeats());
        }
      };

      seatmapRef.current.eventManager.addEventListener('SEAT.SELECT', updateSelectedSeats);
      seatmapRef.current.eventManager.addEventListener('SEAT.UNSELECT', updateSelectedSeats);

      // Load initial data if provided
      if (initialData && initialData.length > 0) {
        seatmapRef.current.data.replaceData(initialData);
      }
    } catch (error) {
      console.error('Failed to initialize Seatmap Canvas:', error);
      setIsReady(false);
    }

    // Cleanup
    return () => {
      seatmapRef.current = null;
      setIsReady(false);
      setSelectedSeats([]);
    };
  }, []); // Only run once on mount

  const loadData = useCallback((data: BlockData[]) => {
    if (!seatmapRef.current) {
      console.warn('Seatmap not initialized.');
      return;
    }
    seatmapRef.current.data.replaceData(data);
  }, []);

  const getSelectedSeats = useCallback(() => {
    if (!seatmapRef.current) return [];
    return seatmapRef.current.data.getSelectedSeats();
  }, []);

  const getSeat = useCallback((seatId: string, blockId: string) => {
    if (!seatmapRef.current) return null;
    return seatmapRef.current.data.getSeat(seatId, blockId);
  }, []);

  const getBlocks = useCallback(() => {
    if (!seatmapRef.current) return [];
    return seatmapRef.current.data.getBlocks();
  }, []);

  const zoomToBlock = useCallback((blockId: string) => {
    if (!seatmapRef.current) return;
    seatmapRef.current.zoomManager.zoomToBlock(blockId);
  }, []);

  const zoomToVenue = useCallback(() => {
    if (!seatmapRef.current) return;
    seatmapRef.current.zoomManager.zoomToVenue();
  }, []);

  const addEventListener = useCallback((event: string, callback: Function) => {
    if (!seatmapRef.current) {
      console.warn('Seatmap not initialized.');
      return;
    }
    seatmapRef.current.eventManager.addEventListener(event, callback);
  }, []);

  return {
    seatmapInstance: seatmapRef.current,
    isReady,
    selectedSeats,
    containerRef,
    loadData,
    getSelectedSeats,
    getSeat,
    getBlocks,
    zoomToBlock,
    zoomToVenue,
    addEventListener,
  };
}
