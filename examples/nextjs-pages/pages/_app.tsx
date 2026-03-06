import type { AppProps } from 'next/app';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
