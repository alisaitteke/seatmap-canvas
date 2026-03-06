/*
 * SeatmapServerWrapper.tsx
 * Server Component Wrapper for Seatmap Canvas
 * Handles server-side data fetching with Suspense integration
 */

import React, { Suspense } from 'react';
import SeatmapCanvas from '../client/SeatmapCanvas';
import { SeatmapSkeleton } from './SeatmapSkeleton';
import type { SeatmapServerWrapperProps, BlockData } from '../types';

async function fetchSeatmapData(dataSource: string | (() => Promise<BlockData[]>)): Promise<BlockData[]> {
  if (typeof dataSource === 'function') {
    return await dataSource();
  }

  // If dataSource is a URL string
  const response = await fetch(dataSource, {
    next: { revalidate: 3600 }, // Default 1 hour cache
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch seatmap data: ${response.statusText}`);
  }

  return await response.json();
}

async function SeatmapServerContent({
  dataSource,
  options,
  className,
  style,
  revalidate,
  onSeatClick,
  onSeatSelect,
  onSeatUnselect,
  onBlockClick,
}: Omit<SeatmapServerWrapperProps, 'fallback'>) {
  const data = await fetchSeatmapData(dataSource);

  return (
    <SeatmapCanvas
      data={data}
      options={{ ...options, revalidate }}
      className={className}
      style={style}
      onSeatClick={onSeatClick}
      onSeatSelect={onSeatSelect}
      onSeatUnselect={onSeatUnselect}
      onBlockClick={onBlockClick}
    />
  );
}

export function SeatmapServerWrapper({
  fallback,
  ...props
}: SeatmapServerWrapperProps) {
  return (
    <Suspense fallback={fallback || <SeatmapSkeleton className={props.className} style={props.style} />}>
      <SeatmapServerContent {...props} />
    </Suspense>
  );
}
