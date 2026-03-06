import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
import type { GetStaticProps } from 'next';
import type { BlockData } from '@alisaitteke/seatmap-canvas/nextjs';
import Link from 'next/link';

interface Props {
  data: BlockData[];
}

export default function SSGExamplePage({ data }: Props) {
  return (
    <div className="container">
      <div className="header">
        <h1>SSG Example</h1>
        <p>Static Site Generation with getStaticProps</p>
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
                hover: '#8e44ad',
                selected: '#8e44ad',
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
        <h3>About SSG</h3>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          This page was generated at build time using getStaticProps.
          The data is fetched once during the build process and served as static HTML.
          This provides the best performance for content that doesn't change frequently.
        </p>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // Simulate fetching data
  const data: BlockData[] = [
    {
      id: 'block-ssg-1',
      title: 'SSG Block',
      color: '#8e44ad',
      seats: Array.from({ length: 40 }, (_, i) => ({
        id: `seat-${i}`,
        x: (i % 8) * 45,
        y: Math.floor(i / 8) * 45,
        salable: true,
        title: `S${Math.floor(i / 8) + 1}-${(i % 8) + 1}`,
      })),
    },
  ];

  return {
    props: {
      data,
    },
  };
};
