/*
 * useSeatmap.ts
 * Next.js Client Hook for Seatmap Canvas
 */

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import type { SeatmapOptions, BlockData, UseSeatmapReturn } from '../types';

export function useSeatmap(
  options: SeatmapOptions = {},
  initialData: BlockData[] = []
): UseSeatmapReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const seatmapRef = useRef<SeatMapCanvas | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

  // Hold the latest options/initialData in refs so the init effect can run
  // exactly once after mount. Inline object literals from callers would
  // otherwise change reference on every render and cause a re-init loop.
  const optionsRef = useRef(options);
  const initialDataRef = useRef(initialData);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    initialDataRef.current = initialData;
  }, [initialData]);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize seatmap exactly once after mount on the client.
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let cancelled = false;

    try {
      const instance = new SeatMapCanvas(containerRef.current, optionsRef.current);
      seatmapRef.current = instance;
      if (!cancelled) setIsReady(true);

      const updateSelectedSeats = () => {
        if (seatmapRef.current) {
          setSelectedSeats(seatmapRef.current.data.getSelectedSeats());
        }
      };

      instance.eventManager.addEventListener('SEAT.SELECT', updateSelectedSeats);
      instance.eventManager.addEventListener('SEAT.UNSELECT', updateSelectedSeats);

      const data = initialDataRef.current;
      if (data && data.length > 0) {
        instance.data.replaceData(data);
      }
    } catch (error) {
      console.error('Failed to initialize Seatmap Canvas:', error);
      if (!cancelled) setIsReady(false);
    }

    return () => {
      cancelled = true;
      seatmapRef.current = null;
    };
  }, [mounted]);

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
