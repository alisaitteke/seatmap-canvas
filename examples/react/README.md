# Seatmap Canvas - React Example

This is a complete example of using Seatmap Canvas with React.

## Setup

1. Install dependencies:
```bash
cd examples/react
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open your browser at http://localhost:3001

## Features Demonstrated

- Component-based integration with TypeScript
- Ref usage for advanced control
- Event handling (seat clicks, selections)
- Dynamic data generation
- Zoom controls
- Selected seats management
- Price calculation
- Custom styling

## Project Structure

```
examples/react/
├── index.html          # HTML entry point
├── src/
│   ├── main.tsx       # React app initialization
│   ├── App.tsx        # Main component with full example
│   └── App.css        # Styles
├── package.json       # Dependencies
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## Usage Patterns

This example demonstrates:

1. **Component with Ref**: Using forwardRef to access seatmap instance
2. **Props & Events**: Passing options, data, and event handlers
3. **State Management**: Managing selected seats with React state
4. **TypeScript**: Full type safety with TypeScript
5. **Zoom Controls**: Programmatic zoom control
6. **Dynamic Data**: Generating random seat data

## Learn More

- [React Plugin Documentation](../../src/react/README.md)
- [GitHub Repository](https://github.com/alisaitteke/seatmap-canvas)
