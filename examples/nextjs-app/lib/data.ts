import type { BlockData } from '@alisaitteke/seatmap-canvas/nextjs';

export async function fetchVenueData(venueId: string): Promise<BlockData[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data - in real app, this would fetch from API
  return [
    {
      id: 'block-server-1',
      title: 'Premium Section',
      color: '#9b59b6',
      seats: Array.from({ length: 40 }, (_, i) => ({
        id: `seat-p-${i}`,
        x: (i % 8) * 45,
        y: Math.floor(i / 8) * 45,
        salable: true,
        title: `P${Math.floor(i / 8) + 1}-${(i % 8) + 1}`,
        custom_data: {
          price: 150,
          category: 'Premium',
        },
      })),
    },
    {
      id: 'block-server-2',
      title: 'Economy Section',
      color: '#3498db',
      seats: Array.from({ length: 60 }, (_, i) => ({
        id: `seat-e-${i}`,
        x: 400 + (i % 10) * 35,
        y: Math.floor(i / 10) * 35,
        salable: Math.random() > 0.1,
        title: `E${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
        custom_data: {
          price: 30,
          category: 'Economy',
        },
      })),
    },
  ];
}
