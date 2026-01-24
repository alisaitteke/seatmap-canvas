# Basic Usage Examples

Simple examples to get you started.

## Minimal Example

```javascript
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

const config = {
  style: {
    seat: {
      radius: 12,
      color: "#6796ff",
      hover: "#5671ff",
      selected: "#56aa45"
    }
  }
};

const seatmap = new SeatmapCanvas(".container", config);

const data = {
  blocks: [{
    id: 1,
    title: "Section A",
    seats: [
      { id: 1, x: 0, y: 0, title: "A1", salable: true },
      { id: 2, x: 30, y: 0, title: "A2", salable: true }
    ]
  }]
};

seatmap.setData(data);

seatmap.addEventListener("seat_click", (seat) => {
  seat.isSelected() ? seat.unSelect() : seat.select();
});
```

For complete examples, see the [GitHub repository](https://github.com/alisaitteke/seatmap-canvas/tree/master/examples).
