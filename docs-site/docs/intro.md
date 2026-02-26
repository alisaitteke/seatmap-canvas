# Seatmap Canvas

Build performant seatmaps for stadiums, theaters, and event spaces. Built with **D3.js** and **TypeScript**.

<div style={{textAlign: 'center', margin: '2rem 0 1.5rem'}}>
  <a href="/getting-started/installation" style={{
    display: 'inline-block',
    padding: '10px 28px',
    marginRight: '0.75rem',
    marginBottom: '0.5rem',
    backgroundColor: 'var(--ifm-color-primary)',
    color: 'white',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '1.5',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
  }}>
    Get Started
  </a>
  <a href="https://alisaitteke.github.io/seatmap-canvas" target="_blank" style={{
    display: 'inline-block',
    padding: '10px 28px',
    marginBottom: '0.5rem',
    backgroundColor: 'transparent',
    color: 'var(--ifm-color-primary)',
    border: '2px solid var(--ifm-color-primary)',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '1.5'
  }}>
    Try a Demo
  </a>
  <div style={{marginTop: '1rem'}}>
    <a href="https://github.com/alisaitteke/seatmap-canvas" target="_blank" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'var(--ifm-color-emphasis-700)',
      textDecoration: 'none'
    }}>
      ⭐ Star
      <span style={{
        backgroundColor: 'var(--ifm-color-emphasis-200)',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '0.85rem',
        fontWeight: '600'
      }}>1.2k</span>
    </a>
  </div>
</div>

[![LIVE DEMO](/img/screenshot_1.png)](https://alisaitteke.github.io/seatmap-canvas)

## ✨ Features

<div className="row">
  <div className="col col--6">
    <h3><img src={require('@site/static/img/icons/settings.svg').default} alt="Customizable" style={{width: '24px', height: '24px', verticalAlign: 'middle', marginRight: '8px'}} /> Highly Customizable</h3>
    <ul>
      <li><strong>Custom Shapes</strong> - Circles, rectangles, paths, and SVG files</li>
      <li><strong>Styling Options</strong> - Full control over colors, sizes, and appearance</li>
      <li><strong>Background Images</strong> - Global and per-block backgrounds</li>
    </ul>
  </div>
  <div className="col col--6">
    <h3><img src={require('@site/static/img/icons/lightning.svg').default} alt="Fast" style={{width: '24px', height: '24px', verticalAlign: 'middle', marginRight: '8px'}} /> Developer Friendly</h3>
    <ul>
      <li><strong>Framework Agnostic</strong> - Works with vanilla JS, React, Vue 3</li>
      <li><strong>TypeScript</strong> - Full type definitions included</li>
      <li><strong>Event System</strong> - Simple and powerful event handling</li>
    </ul>
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <h3><img src={require('@site/static/img/icons/rocket.svg').default} alt="Performance" style={{width: '24px', height: '24px', verticalAlign: 'middle', marginRight: '8px'}} /> Performance</h3>
    <ul>
      <li><strong>Built with D3.js</strong> - Smooth rendering and interactions</li>
      <li><strong>Zoom & Pan</strong> - Three-level zoom (VENUE, BLOCK, SEAT)</li>
      <li><strong>Optimized</strong> - Handles thousands of seats efficiently</li>
    </ul>
  </div>
  <div className="col col--6">
    <h3><img src={require('@site/static/img/icons/package.svg').default} alt="Easy" style={{width: '24px', height: '24px', verticalAlign: 'middle', marginRight: '8px'}} /> Easy to Use</h3>
    <ul>
      <li><strong>Simple API</strong> - Get started in minutes</li>
      <li><strong>Custom Data</strong> - Attach any data to seats</li>
      <li><strong>Block Organization</strong> - Organize seats logically</li>
    </ul>
  </div>
</div>

## Quick Links

- [Live Demo](https://alisaitteke.github.io/seatmap-canvas)
- [GitHub Repository](https://github.com/alisaitteke/seatmap-canvas)
- [NPM Package](https://www.npmjs.com/package/@alisaitteke/seatmap-canvas)
- [Getting Started](/getting-started/installation)

## Framework Support

### 🌐 Web Frameworks

| Framework | Status | Package | Documentation |
|:----------|:------:|:--------|:-------------:|
| **Vanilla JS** | ✅ Available | `@alisaitteke/seatmap-canvas` | [📖 Docs](/frameworks/vanilla-js) |
| **Vue.js 3** | ⚠️ Testing | `@alisaitteke/seatmap-canvas/vue` | [📖 Docs](/frameworks/vue) |
| **React** | ⚠️ Testing | `@alisaitteke/seatmap-canvas/react` | [📖 Docs](/frameworks/react) |
| **Next.js** | 🔜 Coming Soon | - | - |
| **Svelte** | 🔜 Coming Soon | - | - |
| **Angular** | 🔜 Coming Soon | - | - |

### 📱 Mobile Frameworks

| Framework | Platform | Status |
|:----------|:--------:|:------:|
| **React Native** | iOS • Android | 🔜 Coming Soon |
| **Flutter** | iOS • Android | 🔜 Coming Soon |
| **Expo** | iOS • Android | 🔜 Coming Soon |

## 🎯 What Can You Build?

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', margin: '2rem 0'}}>
  <div style={{padding: '1.5rem', border: '2px solid var(--ifm-color-primary-lighter)', borderRadius: '12px', textAlign: 'center'}}>
    <img src={require('@site/static/img/icons/stadium.svg').default} alt="Stadium" style={{width: '48px', height: '48px', margin: '0 auto 0.5rem'}} />
    <h4>Stadium Seating</h4>
    <p>Interactive seat maps for sports venues</p>
  </div>
  <div style={{padding: '1.5rem', border: '2px solid var(--ifm-color-primary-lighter)', borderRadius: '12px', textAlign: 'center'}}>
    <img src={require('@site/static/img/icons/theater.svg').default} alt="Theater" style={{width: '48px', height: '48px', margin: '0 auto 0.5rem'}} />
    <h4>Theater Booking</h4>
    <p>Seat selection for concerts and shows</p>
  </div>
  <div style={{padding: '1.5rem', border: '2px solid var(--ifm-color-primary-lighter)', borderRadius: '12px', textAlign: 'center'}}>
    <img src={require('@site/static/img/icons/location.svg').default} alt="Event" style={{width: '48px', height: '48px', margin: '0 auto 0.5rem'}} />
    <h4>Event Spaces</h4>
    <p>Flexible seating for conferences</p>
  </div>
  <div style={{padding: '1.5rem', border: '2px solid var(--ifm-color-primary-lighter)', borderRadius: '12px', textAlign: 'center'}}>
    <img src={require('@site/static/img/icons/restaurant.svg').default} alt="Restaurant" style={{width: '48px', height: '48px', margin: '0 auto 0.5rem'}} />
    <h4>Restaurants</h4>
    <p>Table and seat management</p>
  </div>
  <div style={{padding: '1.5rem', border: '2px solid var(--ifm-color-primary-lighter)', borderRadius: '12px', textAlign: 'center'}}>
    <img src={require('@site/static/img/icons/airplane.svg').default} alt="Transportation" style={{width: '48px', height: '48px', margin: '0 auto 0.5rem'}} />
    <h4>Transportation</h4>
    <p>Bus, train, airplane seating</p>
  </div>
  <div style={{padding: '1.5rem', border: '2px solid var(--ifm-color-primary-lighter)', borderRadius: '12px', textAlign: 'center'}}>
    <img src={require('@site/static/img/icons/classroom.svg').default} alt="Classroom" style={{width: '48px', height: '48px', margin: '0 auto 0.5rem'}} />
    <h4>Classrooms</h4>
    <p>Student seating arrangements</p>
  </div>
</div>

## 🚀 Getting Started

Ready to dive in? Head over to the [Installation Guide](/getting-started/installation) to get started!

```bash
npm install @alisaitteke/seatmap-canvas
```

:::info Quick Start
Check out our [Quick Start Guide](/getting-started/quick-start) to create your first seatmap in less than 5 minutes! ⚡
:::

## Community & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/alisaitteke/seatmap-canvas/issues)
- **NPM**: [@alisaitteke/seatmap-canvas](https://www.npmjs.com/package/@alisaitteke/seatmap-canvas)

## License

Seatmap Canvas is [MIT licensed](https://github.com/alisaitteke/seatmap-canvas/blob/master/LICENSE).
