[![LIVE DEMO](https://raw.githubusercontent.com/seatmap/canvas/master/assets/banner_ui.png?raw=true)](https://alisaitteke.github.io/seatmap-canvas)

[LIVE DEMO](https://alisaitteke.github.io/seatmap-canvas/)
# Seatmap Canvas
An opensource seat selection
---

[![LIVE DEMO](https://raw.githubusercontent.com/seatmap/canvas/master/assets/bn.jpg?raw=true)](https://alisaitteke.github.io/seatmap-canvas)



## What does it do?
#### In any organization
- Seat selection
- Seat categorizing
- Locating
- Turnstile and Gate information


## Installation

<pre>
npm i <a href="https://www.npmjs.com/package/@seatmap/canvas">@seatmap/canvas</a> --save
</pre>

### Github registry install
<pre>
npm i <a href="https://npm.pkg.github.com/alisaitteke/seatmap-canvas">@alisaitteke/seatmap-canvas</a> --save
</pre>




#### Example Config
```json
{
    "resizable": true,
    "seat_style": {
        "radius": 12,
        "color": "#6796ff",
        "hover": "#5671ff",
        "not_salable": "#424747",
        "selected": "#56aa45",
        "focus": "#435fa4",
        "focus_out": "#56aa45"
    },
    "block_style": {
        "fill": "#e2e2e2",
        "stroke": "#e2e2e2"
    },
    "label_style": {
        "color": "#000",
        "radius": 12,
        "font-size": "12px",
        "bg": "#ffffff"
    }
}

```

#### Usage
```js
var seatmap = new SeatmapCanvas(".seats_container",config);
```

#### Seat Model
```json
{
  "id": 1,
  "title": "49",
  "x": 0,
  "y": 0,
  "salable": true,
  "note": "note test",
  "color":"#ffffff",
  "custom_data": {
    "any": "things"
  }
}
```


#### Block Model
```json
{
  "blocks": [
    {
      "id": 1,
      "title": "Test Block 1",
      "color": "#2c2828",
      "labels": [
        {
          "title": "A",
          "x": -30,
          "y": 0
        },
        {
          "title": "B",
          "x": 120,
          "y": 30
        }
      ],
      "seats": [
        {
          "id": 1,
          "x": 0,
          "y": 0,
          "salable": true,
          "note": "note test",
          "title": "49"
        },
        {
          "id": 2,
          "x": 30,
          "y": 0,
          "salable": true,
          "note": "note test",
          "title": "47"
        }
      ]
    }
  ]
}

```

#### Set Block Data
```js
seatmap.setData(data);
```

#### Seat Click Trigger
```js
seatmap.addEventListener("seat_click", (seat) => {
    console.log(seat);
    if (seat.selected) {
        seatmap.seatUnselect(seat);
    } else {
        seatmap.seatSelect(seat);
    }
});
```

#### Activated unsalable seat click 
##### click_enable_sold_seats param add to config object 
```javascript
let config = {
    click_enable_sold_seats: true // default false
}
```

#### Get selected seat
```javascript
seatmap.addEventListener("seat_click", (seat) => {
    var selectedSeats = seatmap.getSelectedSeats();
});
```
## Contributors

Ali Sait TEKE <alisaitt@gmail.com>
