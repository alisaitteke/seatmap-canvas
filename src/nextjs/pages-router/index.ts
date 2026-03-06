/*
 * pages-router/index.ts
 * Pages Router specific exports for Next.js Plugin
 * Uses dynamic import with SSR disabled to prevent hydration issues
 */

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled for Pages Router
// This prevents hydration mismatches and window/document access errors
export const SeatmapCanvas = dynamic(
  () => import('../client/SeatmapCanvas').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => {
      // Inline loading component to avoid additional imports
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
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
    },
  }
);

// Hook can be used directly as it doesn't have SSR issues
export { useSeatmap } from '../client/useSeatmap';

// SSG/ISR Utilities for Pages Router
export {
  getStaticSeatmapProps,
  getServerSideSeatmapProps,
  generateSeatmapStaticParams,
} from '../server/utils';

// Types
export type {
  SeatmapOptions,
  SeatmapCanvasProps,
  SeatClickEvent,
  BlockData,
  SeatData,
  UseSeatmapReturn,
  SeatmapCanvasRef,
  Venue,
} from '../types';
