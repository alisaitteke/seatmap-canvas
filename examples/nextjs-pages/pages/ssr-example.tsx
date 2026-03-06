import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
import type { GetServerSideProps } from 'next';
import type { BlockData } from '@alisaitteke/seatmap-canvas/nextjs';
import Link from 'next/link';

interface Props {
  data: BlockData[];
  timestamp: string;
}

export default function SSRExamplePage({ data, timestamp }: Props) {
  return (
    <div className="container">
      <div className="header">
        <h1>SSR Example</h1>
        <p>Server-Side Rendering with getServerSideProps</p>
      </div>

      <div className="nav">
        <Link href="/">← Back to Home</Link>
      </div>

      <div className="seatmap-wrapper">
        <SeatmapCanvas
          data={data}
          options={{
            legend: true,
            style: {
              seat: {
                hover: '#27ae60',
                selected: '#27ae60',
              },
            },
          }}
          onSeatClick={(seat: any) => {
            if (seat.item.salable) {
              seat.isSelected() ? seat.unSelect() : seat.select();
            }
          }}
        />
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '8px' }}>
        <h3>About SSR</h3>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          This page is rendered on the server for every request using getServerSideProps.
          The data is always fresh, making it ideal for real-time data that changes frequently.
        </p>
        <p style={{ color: '#999', marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Rendered at: {timestamp}
        </p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data: BlockData[] = [
    {
      id: 'block-ssr-1',
      title: 'SSR Block',
      color: '#27ae60',
      seats: Array.from({ length: 60 }, (_, i) => ({
        id: `seat-${i}`,
        x: (i % 10) * 38,
        y: Math.floor(i / 10) * 38,
        salable: Math.random() > 0.15,
        title: `R${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
      })),
    },
  ];

  return {
    props: {
      data,
      timestamp: new Date().toLocaleString(),
    },
  };
};
