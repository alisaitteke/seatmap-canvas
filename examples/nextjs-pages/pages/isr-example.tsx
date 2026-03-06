import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/nextjs/pages-router';
import type { GetStaticProps } from 'next';
import type { BlockData } from '@alisaitteke/seatmap-canvas/nextjs';
import Link from 'next/link';

interface Props {
  data: BlockData[];
  generatedAt: string;
}

export default function ISRExamplePage({ data, generatedAt }: Props) {
  return (
    <div className="container">
      <div className="header">
        <h1>ISR Example</h1>
        <p>Incremental Static Regeneration</p>
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
                hover: '#e67e22',
                selected: '#e67e22',
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
        <h3>About ISR</h3>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          This page uses Incremental Static Regeneration with a 60-second revalidation period.
          The page is regenerated in the background after 60 seconds, combining the benefits
          of static generation with dynamic data updates.
        </p>
        <p style={{ color: '#999', marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Generated at: {generatedAt}
        </p>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data: BlockData[] = [
    {
      id: 'block-isr-1',
      title: 'ISR Block',
      color: '#e67e22',
      seats: Array.from({ length: 50 }, (_, i) => ({
        id: `seat-${i}`,
        x: (i % 10) * 40,
        y: Math.floor(i / 10) * 40,
        salable: Math.random() > 0.2,
        title: `I${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
      })),
    },
  ];

  return {
    props: {
      data,
      generatedAt: new Date().toISOString(),
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};
