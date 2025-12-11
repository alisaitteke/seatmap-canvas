# Seatmap Canvas - Vue.js Example

This is a complete example of using Seatmap Canvas with Vue.js 3.

## Setup

1. Install dependencies:
```bash
cd examples/vue
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open your browser at http://localhost:3000

## Features Demonstrated

- Component-based integration
- Event handling (seat clicks, selections)
- Dynamic data generation
- Zoom controls
- Selected seats management
- Price calculation
- Custom styling

## Project Structure

```
examples/vue/
├── index.html          # HTML entry point
├── main.ts            # Vue app initialization
├── App.vue            # Main component with full example
├── package.json       # Dependencies
├── vite.config.ts     # Vite configuration
└── README.md          # This file
```

## Usage Patterns

This example demonstrates:

1. **Global Plugin Registration**: Plugin is registered in `main.ts`
2. **Component Props**: Passing options and data to the component
3. **Event Handling**: Listening to seat click/select/unselect events
4. **Ref Access**: Using component ref to access the seatmap instance
5. **Data Management**: Managing selected seats state in Vue
6. **Zoom Controls**: Programmatic zoom control

## Learn More

- [Seatmap Canvas Documentation](../../src/vue/README.md)
- [GitHub Repository](https://github.com/alisaitteke/seatmap-canvas)
