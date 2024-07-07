# Seatmap Canvas
Seatmap Canvas is an advanced, open-source library for interactive seat selection in various settings such as stadiums, theaters, and event spaces. Designed with d3.js, this code version is optimized for developers looking for a customizable and efficient solution to handle seat arrangements and user interactions.

[![LIVE DEMO](assets/banner_ui.png)](https://alisaitteke.github.io/seatmap-canvas)

## Features
* React Integration: Designed specifically for React projects, offering a streamlined development experience.
* Dynamic Seat Selection: Enables interactive selection, categorization, and location of seats.
* Customizable Styles: Extensive styling options for seats, blocks, and labels to fit your application's design.
* Interactive Seat Models: Define properties and behaviors for seats, including salability, notes, and custom data.
* Block Model Configuration: Organize seats into blocks with customizable titles, colors, and labels.
* Event Handling: Simplified event listeners for seat interactions, allowing dynamic responses to user actions.

## Screenshot
[![LIVE DEMO](assets/screenshot_1.png)](https://alisaitteke.github.io/seatmap-canvas)

## Planned
- [x]  React & React Native Integration
- [ ]  Vue & Nuxt Integration
- [ ]  Angular Integration

[LIVE DEMO](https://alisaitteke.github.io/seatmap-canvas/)



## What does it do?
#### In any organization
- Seat selection
- Seat categorizing
- Locating
- Turnstile and Gate information



## Installation

<pre>
npm i <a href="https://npm.pkg.github.com/alisaitteke/seatmap-canvas">@alisaitteke/seatmap-canvas</a> --save
OR
yarn add <a href="https://npm.pkg.github.com/alisaitteke/seatmap-canvas">@alisaitteke/seatmap-canvas</a> --save
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
Ali Sait Teke <alisaitt@gmail.com>
