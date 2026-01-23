# Seatmap Canvas
Seatmap Canvas is an advanced, open-source library for interactive seat selection in various settings such as stadiums, theaters, and event spaces. Designed with d3.js, this code version is optimized for developers looking for a customizable and efficient solution to handle seat arrangements and user interactions.

[![LIVE DEMO](assets/banner_ui.png)](https://alisaitteke.github.io/seatmap-canvas)

## Features

- **Framework Agnostic** - Core library works with vanilla JS, plus official React and Vue 3 wrappers
- **Dynamic Seat Selection** - Interactive selection, categorization, and location of seats
- **Customizable Styles** - Extensive styling options for seats, blocks, and labels
- **Interactive Seat Models** - Define properties like salability, notes, colors, and custom data
- **Block Organization** - Organize seats into blocks with titles, colors, and labels
- **Event System** - Simplified event listeners for seat interactions

## Screenshot
[![LIVE DEMO](assets/screenshot_1.png)](https://alisaitteke.github.io/seatmap-canvas)

## 🚀 Framework Plugins & Integrations

### 🌐 Web Frameworks

<p align="center">
  <a href="src/vue/README.md">
    <img src="https://img.shields.io/badge/Vue.js_3-⚠️_Testing-orange?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js 3"/>
  </a>
  &nbsp;&nbsp;
  <a href="src/react/README.md">
    <img src="https://img.shields.io/badge/React-⚠️_Testing-orange?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  </a>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Next.js-Coming_Soon-000000?style=for-the-badge&logo=next.js&logoColor=white&color=gray" alt="Next.js"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Svelte-Coming_Soon-FF3E00?style=for-the-badge&logo=svelte&logoColor=white&color=gray" alt="Svelte"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Angular-Coming_Soon-dd0031?style=for-the-badge&logo=angular&logoColor=white&color=gray" alt="Angular"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Nuxt-Coming_Soon-00dc82?style=for-the-badge&logo=nuxt.js&logoColor=white&color=gray" alt="Nuxt"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Solid.js-Coming_Soon-2c4f7c?style=for-the-badge&logo=solid&logoColor=white&color=gray" alt="Solid.js"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Astro-Coming_Soon-FF5D01?style=for-the-badge&logo=astro&logoColor=white&color=gray" alt="Astro"/>
</p>

### 📱 Mobile Frameworks

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-Coming_Soon-61dafb?style=for-the-badge&logo=react&logoColor=white&color=gray" alt="React Native"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Flutter-Coming_Soon-02569B?style=for-the-badge&logo=flutter&logoColor=white&color=gray" alt="Flutter"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Expo-Coming_Soon-000020?style=for-the-badge&logo=expo&logoColor=white&color=gray" alt="Expo"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Ionic-Coming_Soon-3880FF?style=for-the-badge&logo=ionic&logoColor=white&color=gray" alt="Ionic"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Capacitor-Coming_Soon-119EFF?style=for-the-badge&logo=capacitor&logoColor=white&color=gray" alt="Capacitor"/>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/.NET_MAUI-Coming_Soon-512BD4?style=for-the-badge&logo=.net&logoColor=white&color=gray" alt=".NET MAUI"/>
</p>

---

### 🌐 Web Framework Integrations

<div align="center">

| Framework | Status | Package | Documentation | Example |
|:----------|:------:|:--------|:-------------:|:-------:|
| **Vanilla JS** | ✅ Available | `@alisaitteke/seatmap-canvas` | [📖 Documentation](#vanilla-javascript) | [🎯 Example](examples/) |
| **Vue.js 3** | ⚠️ Testing | `@alisaitteke/seatmap-canvas/vue` | [📖 Documentation](src/vue/README.md) | [🎯 Example](examples/vue/) |
| **React** | ⚠️ Testing | `@alisaitteke/seatmap-canvas/react` | [📖 Documentation](src/react/README.md) | [🎯 Example](examples/react/) |
| **Next.js** | 🔜 Coming Soon | - | - | - |
| **Svelte** | 🔜 Coming Soon | - | - | - |
| **Angular** | 🔜 Coming Soon | - | - | - |
| **Nuxt** | 🔜 Coming Soon | - | - | - |
| **Solid.js** | 🔜 Coming Soon | - | - | - |
| **Astro** | 🔜 Coming Soon | - | - | - |

</div>

### 📱 Mobile Framework Integrations

<div align="center">

| Framework | Platform | Status | Package | Documentation | Example |
|:----------|:--------:|:------:|:--------|:-------------:|:-------:|
| **React Native** | iOS • Android | 🔜 Coming Soon | - | - | - |
| **Flutter** | iOS • Android | 🔜 Coming Soon | - | - | - |
| **Expo** | iOS • Android | 🔜 Coming Soon | - | - | - |
| **Ionic** | iOS • Android • Web | 🔜 Coming Soon | - | - | - |
| **Capacitor** | iOS • Android • Web | 🔜 Coming Soon | - | - | - |
| **.NET MAUI** | iOS • Android • Windows • macOS | 🔜 Coming Soon | - | - | - |

</div>

---

[LIVE DEMO](https://alisaitteke.github.io/seatmap-canvas/)



## What does it do?
#### In any organization
- Seat selection
- Seat categorizing
- Locating
- Turnstile and Gate information



## Installation

```bash
npm install @alisaitteke/seatmap-canvas
```

## Quick Start

---

<h3>
  <img src="https://api.iconify.design/logos:vue.svg" width="28" height="28" alt="Vue.js" style="vertical-align: middle;" />
  &nbsp;Vue.js 3
</h3>

<table>
<tr>
<td width="50%">

**Installation**

```bash
npm install @alisaitteke/seatmap-canvas
```

**Setup** (`main.ts`)

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import SeatmapCanvasPlugin from '@alisaitteke/seatmap-canvas/vue';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

const app = createApp(App);
app.use(SeatmapCanvasPlugin);
app.mount('#app');
```

</td>
<td width="50%">

**Component Usage**

```vue
<template>
  <SeatmapCanvas
    :options="seatmapOptions"
    :data="blocks"
    @seat-click="onSeatClick"
  />
</template>

<script setup lang="ts">
const seatmapOptions = {
  legend: true,
  style: {
    seat: {
      hover: '#8fe100',
      selected: '#8fe100',
    }
  }
};

const onSeatClick = (seat) => {
  seat.isSelected() ? seat.unSelect() : seat.select();
};
</script>
```

</td>
</tr>
</table>

<p align="center">
  <a href="src/vue/README.md"><img src="https://img.shields.io/badge/📖_Full_Documentation-4FC08D?style=for-the-badge&logoColor=white" alt="Documentation"/></a>
  &nbsp;
  <a href="examples/vue/"><img src="https://img.shields.io/badge/🎯_Examples-35495E?style=for-the-badge&logoColor=white" alt="Examples"/></a>
</p>

---

<h3>
  <img src="https://api.iconify.design/logos:react.svg" width="28" height="28" alt="React" style="vertical-align: middle;" />
  &nbsp;React
</h3>

<table>
<tr>
<td width="50%">

**Installation**

```bash
npm install @alisaitteke/seatmap-canvas
```

</td>
<td width="50%">

**Component Usage**

```tsx
import { SeatmapCanvas } from '@alisaitteke/seatmap-canvas/react';
import '@alisaitteke/seatmap-canvas/dist/seatmap.canvas.css';

function App() {
  const handleSeatClick = (seat) => {
    seat.isSelected() ? seat.unSelect() : seat.select();
  };

  return (
    <SeatmapCanvas
      options={{
        legend: true,
        style: {
          seat: { hover: '#8fe100', selected: '#8fe100' }
        }
      }}
      data={blocks}
      onSeatClick={handleSeatClick}
    />
  );
}
```

</td>
</tr>
</table>

<p align="center">
  <a href="src/react/README.md"><img src="https://img.shields.io/badge/📖_Full_Documentation-61DAFB?style=for-the-badge&logoColor=black" alt="Documentation"/></a>
  &nbsp;
  <a href="examples/react/"><img src="https://img.shields.io/badge/🎯_Examples-20232A?style=for-the-badge&logoColor=white" alt="Examples"/></a>
</p>

---

<h3>
  <img src="https://api.iconify.design/logos:javascript.svg" width="24" height="24" alt="JavaScript" style="vertical-align: middle;" />
  &nbsp;Vanilla JavaScript
</h3>

<table>
<tr>
<td width="50%">

**Quick Setup**

```js
const config = {
  resizable: true,
  seat_style: {
    radius: 12,
    color: "#6796ff",
    hover: "#5671ff",
    selected: "#56aa45"
  }
};

const seatmap = new SeatmapCanvas(".container", config);
seatmap.setData(data);
```

</td>
<td width="50%">

**Event Handling**

```js
seatmap.addEventListener("seat_click", (seat) => {
  if (seat.selected) {
    seatmap.seatUnselect(seat);
  } else {
    seatmap.seatSelect(seat);
  }
});

// Get selected seats
const selected = seatmap.getSelectedSeats();
```

</td>
</tr>
</table>

<details>
<summary><strong>📋 Data Models Reference</strong></summary>

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
  "blocks": [{
    "id": 1,
    "title": "Test Block 1",
    "color": "#2c2828",
    "labels": [{ "title": "A", "x": -30, "y": 0 }],
    "seats": [
      { "id": 1, "x": 0, "y": 0, "salable": true, "title": "49" },
      { "id": 2, "x": 30, "y": 0, "salable": true, "title": "47" }
    ]
  }]
}
```

#### Configuration Options
```js
{
  click_enable_sold_seats: true  // Enable clicking on unavailable seats (default: false)
}
```

</details>

<details>
<summary><strong>📝 Complete Example</strong></summary>
```javascript

var config = {
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

var seatmap = new SeatmapCanvas(".seats_container",config);
seatmap.addEventListener("seat_click", (seat) => {
    console.log(seat);
    if (seat.selected) {
        seatmap.seatUnselect(seat);
    } else {
        seatmap.seatSelect(seat);
    }
});
var data = {
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

// SET SEATS DATA
seatmap.setData(data);
```

</details>

<p align="center">
  <a href="examples/"><img src="https://img.shields.io/badge/📖_Documentation-F7DF1E?style=for-the-badge&logoColor=black" alt="Documentation"/></a>
  &nbsp;
  <a href="examples/"><img src="https://img.shields.io/badge/🎯_Examples-333333?style=for-the-badge&logoColor=white" alt="Examples"/></a>
</p>

---

## Contributors

<a href="https://github.com/alisaitteke">
  <img src="https://img.shields.io/badge/Ali_Sait_Teke-Maintainer-blue?style=flat-square&logo=github" alt="Ali Sait Teke"/>
</a>
