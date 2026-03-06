/*
 * SeatmapSkeleton.tsx
 * Loading skeleton for Seatmap Canvas
 */

import React from 'react';
import type { SeatmapSkeletonProps } from '../types';

export function SeatmapSkeleton({ className = '', style = {} }: SeatmapSkeletonProps) {
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
        borderRadius: '8px',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #666',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p
          style={{
            margin: 0,
            color: '#666',
            fontSize: '14px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Loading seatmap...
        </p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
