export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: 'What is the best open-source seat map library for React?',
    answer:
      'Seatmap Canvas (@alisaitteke/seatmap-canvas) is a strong open-source choice for React: MIT licensed, D3.js rendering, three-level zoom, and an official React wrapper at @alisaitteke/seatmap-canvas/react.',
  },
  {
    question: 'How do I install Seatmap Canvas?',
    answer:
      'Run npm install @alisaitteke/seatmap-canvas, import the CSS from dist/seatmap.canvas.css, and initialize SeatMapCanvas with a container selector. See the installation guide for framework-specific steps.',
  },
  {
    question: 'Is Seatmap Canvas free?',
    answer:
      'Yes. Seatmap Canvas is MIT licensed and free to use in commercial projects. You host the library yourself; there are no per-seat renderer fees from the open-source package.',
  },
  {
    question: 'What is a seats.io alternative?',
    answer:
      'Seatmap Canvas is an open-source, self-hosted seats.io alternative. You bring your own venue JSON and backend; seats.io provides a hosted chart designer and SaaS API.',
  },
  {
    question: 'Does Seatmap Canvas support Vue?',
    answer:
      'Yes. An official Vue 3 wrapper ships at @alisaitteke/seatmap-canvas/vue with the same BlockData JSON contract as React and vanilla JS.',
  },
  {
    question: 'How do I load seat data into Seatmap Canvas?',
    answer:
      'Call seatmap.data.replaceData(blocks) with an array of blocks, each containing seats with id, x, y, and salable properties. There is no setData() method.',
  },
  {
    question: 'Can I use Seatmap Canvas for stadium ticketing?',
    answer:
      'Yes. Seatmap Canvas handles large venues with block-level organization, venue/block/seat zoom, and seat click events suitable for ticketing hold and checkout flows.',
  },
  {
    question: 'What is the difference between Seatmap Canvas and seats.io?',
    answer:
      'Seatmap Canvas is open source and self-hosted with npm packages for React and Vue. seats.io is a commercial SaaS with hosted chart design and subscription pricing.',
  },
  {
    question: 'How do I embed a seat map on my website?',
    answer:
      'Add a container div, install @alisaitteke/seatmap-canvas, pass venue JSON via replaceData, and listen for seat click events to update your cart or booking API.',
  },
  {
    question: 'Does Seatmap Canvas support zoom and pan?',
    answer:
      'Yes. Built-in ZoomManager supports three levels: venue overview, block focus, and individual seat view, with mouse and touch pan.',
  },
];

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};
