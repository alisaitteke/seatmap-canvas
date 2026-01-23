# Seatmap Canvas
Seatmap Canvas is an advanced, open-source library for interactive seat selection in various settings such as stadiums, theaters, and event spaces. Designed with d3.js, this code version is optimized for developers looking for a customizable and efficient solution to handle seat arrangements and user interactions.

[![LIVE DEMO](assets/banner_ui.png)](https://alisaitteke.github.io/seatmap-canvas)

## Features

- **Framework Agnostic** - Core library works with vanilla JS, plus official React and Vue 3 wrappers
- **Dynamic Seat Selection** - Interactive selection, categorization, and location of seats
- **Custom Seat Shapes** - Circle, rectangle, path-based shapes, or upload your own SVG files
- **Customizable Styles** - Extensive styling options for seats, blocks, labels, and tooltips
- **Interactive Seat Models** - Define properties like salability, notes, colors, and custom data
- **Block Organization** - Organize seats into blocks with titles, colors, and labels
- **Modern Tooltips** - Auto-sizing tooltips with shadows, padding, and centered text
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
  click_enable_sold_seats: true,  // Enable clicking on unavailable seats (default: false)
  
  style: {
    seat: {
      // Custom Seat Shapes
      shape: "circle",        // "auto" | "circle" | "rect" | "path" | "svg"
      size: 24,              // For rect/path shapes (optional)
      corner_radius: 4,      // For rect shape (optional)
      path: "M12 0L24 24H0Z",     // Custom SVG path (for path shape)
      path_box: "0 0 24 24",      // ViewBox for path (for path shape)
      svg: "assets/seat.svg",     // External SVG file URL (for svg shape)
      
      // Colors
      color: "#6796ff",
      hover: "#5671ff",
      selected: "#56aa45",
      not_salable: "#424747"
    },
    
    tooltip: {
      // Modern Tooltip Styling
      bg: "#ffffff",
      color: "#1f2937",
      border_color: "rgba(0,0,0,0.08)",
      border_width: 1,
      border_radius: 10,
      padding: 14,
      font_size: "14px",
      font_weight: "600",
      line_height: 20,
      shadow: "0 8px 24px rgba(0,0,0,0.2)",
      text_align: "center",
      width: 160
      // Height is auto-calculated based on content
    }
  }
}
```

</details>

<details>
<summary><strong>🎨 Custom Seat Shapes</strong></summary>

#### Shape Types

**1. Circle (Default)**
```js
style: {
  seat: {
    shape: "circle",
    radius: 12
  }
}
```

**2. Rectangle**
```js
style: {
  seat: {
    shape: "rect",
    size: 24,
    corner_radius: 4  // 0 for sharp corners
  }
}
```

**3. Custom Path**
```js
style: {
  seat: {
    shape: "path",
    size: 24,
    path: "M12 0L22 12L12 24L2 12Z",  // Diamond shape
    path_box: "0 0 24 24"
  }
}
```

**4. External SVG File**
```js
style: {
  seat: {
    shape: "svg",  // or "auto"
    svg: "assets/custom-seat.svg",
    radius: 12
  }
}
```

#### How to Use Your Own SVG Files

**Method 1: Using SVG Path (Recommended)**

1. Open your SVG file in a text editor
2. Find the `<path d="...">` element
3. Copy the `d` attribute value
4. Use it in your configuration:

```js
// Example: Heart icon
style: {
  seat: {
    shape: "path",
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    path_box: "0 0 24 24",  // Copy from viewBox attribute
    size: 24
  }
}
```

**Method 2: Using External SVG File**

1. Place your SVG file in your assets folder
2. Reference it in configuration:

```js
style: {
  seat: {
    shape: "svg",
    svg: "/assets/my-custom-icon.svg",
    radius: 12
  }
}
```

**Method 3: Programmatic Upload (Demo Feature)**

Our demo page includes an SVG upload feature that:
- Accepts any `.svg` file
- Automatically extracts path data from supported elements:
  - `<path>` - Direct path extraction
  - `<polygon>` - Converts to path
  - `<polyline>` - Converts to path
  - `<rect>` - Converts to path
  - `<circle>` - Approximates as path
  - Multiple paths - Combines into single path
- Auto-detects viewBox or calculates from width/height
- Handles complex SVGs from Figma, Illustrator, Inkscape, etc.

**Supported SVG Formats:**
```xml
<!-- Simple path -->
<svg viewBox="0 0 24 24">
  <path d="M12 2L22 22H2Z"/>
</svg>

<!-- Polygon -->
<svg viewBox="0 0 100 100">
  <polygon points="50,10 90,90 10,90"/>
</svg>

<!-- Complex multi-element SVG -->
<svg viewBox="0 0 110 135">
  <path d="M55,.68c-13.95,0-25.25,11.3..."/>
  <path d="M31.86,69.21v33.19c0,1.47..."/>
</svg>

<!-- Rectangle -->
<svg viewBox="0 0 50 50">
  <rect x="10" y="10" width="30" height="30" rx="5"/>
</svg>
```

**Tips for Best Results:**
- Use SVG files with viewBox attribute for proper scaling
- Keep paths simple for better performance
- Monochrome SVGs work best (fill color is controlled by library)
- Recommended viewBox: Square aspect ratio (e.g., "0 0 24 24")
- File size: Keep under 10KB for optimal loading

#### Predefined Shapes
```js
// Triangle
{ shape: "path", path: "M12 0L24 24H0Z", path_box: "0 0 24 24" }

// Diamond
{ shape: "path", path: "M12 0L24 12L12 24L0 12Z", path_box: "0 0 24 24" }

// Star
{ shape: "path", path: "M12 0L15 9L24 9L17 15L20 24L12 18L4 24L7 15L0 9L9 9Z", path_box: "0 0 24 24" }
```

#### Interactive Hit Areas
All custom shapes include invisible hit areas for better UX:
- Path shapes use circular hit areas covering the entire seat space
- Rectangle shapes use rect hit areas matching the seat size
- Ensures consistent click/hover behavior regardless of shape complexity

#### Getting Started with Custom SVG

**Step-by-Step Guide:**

1. **Find or Create Your SVG Icon**
   - Download from icon libraries (Material Icons, Font Awesome, Heroicons, etc.)
   - Create in design tools (Figma, Illustrator, Inkscape)
   - Use existing SVG files

2. **Extract the Path Data**
   ```xml
   <!-- Original SVG file -->
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
     <path d="M12 2L22 22H2Z"/>
   </svg>
   ```

3. **Use in Your Configuration**
   ```js
   const seatmap = new SeatmapCanvas(".container", {
     style: {
       seat: {
         shape: "path",
         path: "M12 2L22 22H2Z",    // Copy this from <path d="">
         path_box: "0 0 24 24",      // Copy this from viewBox=""
         size: 24
       }
     }
   });
   ```

**Example: Using a Heart Icon**
```js
style: {
  seat: {
    shape: "path",
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    path_box: "0 0 24 24",
    size: 24,
    color: "#ff6b6b",
    selected: "#ff0000"
  }
}
```

**Troubleshooting:**
- **Icon too small/large?** Adjust the `size` property
- **Icon not centered?** Make sure viewBox starts at "0 0"
- **Icon looks distorted?** Use square viewBox dimensions
- **Can't find path?** Use our demo's upload feature to auto-extract

</details>

<details>
<summary><strong>💬 Modern Tooltips</strong></summary>

#### Tooltip Configuration

```js
style: {
  tooltip: {
    bg: "#ffffff",              // Background color
    color: "#1f2937",           // Text color
    border_color: "rgba(0,0,0,0.08)",
    border_width: 1,
    border_radius: 10,          // Rounded corners
    padding: 14,                // Inner spacing (top/bottom/left/right)
    font_size: "14px",
    font_weight: "600",         // Semi-bold
    line_height: 20,            // Line spacing
    shadow: "0 8px 24px rgba(0,0,0,0.2)",  // Drop shadow
    text_align: "center",       // Text alignment
    width: 160
    // Height is automatically calculated based on content
  }
}
```

#### Features
- **Auto-sizing**: Height adjusts dynamically based on number of text lines
- **Centered Text**: Text is automatically centered horizontally
- **Modern Design**: Rounded corners, subtle shadows, and clean borders
- **Readable Spacing**: Proper padding and line-height for easy reading
- **Customizable**: All visual properties can be configured

#### Height Calculation
```
Height = (line_count × line_height) + (padding × 2)
```
- 1 line: ~48px
- 2 lines: ~68px
- 3 lines: ~88px

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
