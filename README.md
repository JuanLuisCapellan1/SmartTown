# Smart Town Dashboard

Smart Town Dashboard is a modern React application for monitoring and controlling a smart city's traffic infrastructure. It provides real-time status and manual/automatic controls for semaphores, barriers, pedestrian crossings, motor and buzzer systems, and displays a registry of traffic violations.

## Features

- **Dashboard Overview:** Visual status cards for parked vehicles, heavy vehicles, violations, and waiting pedestrians.
- **Traffic Semaphore Control:** Switch between automatic and manual modes for traffic lights.
- **Pedestrian Crossing Control:** Monitor pedestrian crossings and their status.
- **Barriers Control:** Manage the state of entry/exit barriers.
- **Motor & Buzzer Control:** Manual and automatic control for motors and buzzers.
- **Violations Registry:** Table of recent traffic violations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/JuanLuisCapellan1/SmartTown.git
   cd smart_town
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the App in Development

```sh
npm run dev
```

This will start the Vite development server. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Building for Production

```sh
npm run build
```

The production-ready files will be in the `dist` folder.

### Linting

```sh
npm run lint
```

## Project Structure

- `src/` - Main source code
  - `components/` - Reusable UI components
  - `pages/` - Page-level components (main dashboard)
  - `theme.js` - Theme definitions for light/dark mode
- `public/` - Static assets

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [styled-components](https://styled-components.com/)
- [Lucide React Icons](https://lucide.dev/)
- [Ant Design](https://ant.design/) (for potential UI elements)

---
