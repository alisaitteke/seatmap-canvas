export const VENUE_DATA = [
  {
    id: 'block-a',
    title: 'Block A',
    color: '#3498db',
    seats: [
      { id: 'A1', x: 10, y: 10, salable: true },
      { id: 'A2', x: 40, y: 10, salable: true },
      { id: 'A3', x: 70, y: 10, salable: true },
      { id: 'A4', x: 100, y: 10, salable: false },
      { id: 'A5', x: 10, y: 40, salable: true },
      { id: 'A6', x: 40, y: 40, salable: true },
      { id: 'A7', x: 70, y: 40, salable: true },
      { id: 'A8', x: 100, y: 40, salable: true },
    ]
  },
  {
    id: 'block-b',
    title: 'Block B',
    color: '#e74c3c',
    seats: [
      { id: 'B1', x: 150, y: 10, salable: true },
      { id: 'B2', x: 180, y: 10, salable: true },
      { id: 'B3', x: 210, y: 10, salable: true },
      { id: 'B4', x: 150, y: 40, salable: true },
      { id: 'B5', x: 180, y: 40, salable: true },
      { id: 'B6', x: 210, y: 40, salable: false },
    ]
  },
  {
    id: 'block-c',
    title: 'VIP Section',
    color: '#f39c12',
    seats: [
      { id: 'V1', x: 80, y: 80, salable: true },
      { id: 'V2', x: 110, y: 80, salable: true },
      { id: 'V3', x: 140, y: 80, salable: true },
      { id: 'V4', x: 80, y: 110, salable: true },
      { id: 'V5', x: 110, y: 110, salable: true },
      { id: 'V6', x: 140, y: 110, salable: true },
    ]
  }
];

export const SEATMAP_OPTIONS = {
  seat: {
    radius: 12
  }
};
