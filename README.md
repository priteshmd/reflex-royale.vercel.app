# 🎮 Reflex Royale

A multiplayer real-time game client built with modern web technologies. Players can create or join game rooms to compete in reflex-based challenges with real-time synchronization.

## Features

- **Real-time Multiplayer**: Socket.io-powered real-time communication
- **Room System**: Create or join game rooms with unique room codes
- **Responsive Design**: Tailwind CSS for beautiful, responsive UI
- **Type-Safe**: Full TypeScript support for robust development
- **Fast Development**: Vite for instant HMR and quick builds

## Tech Stack

- **Frontend Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite 7.2
- **Routing**: React Router DOM 7.13
- **Real-time Communication**: Socket.io Client 4.8
- **Styling**: Tailwind CSS 3.4
- **Linting**: ESLint 9.39
- **Development Server**: TypeScript with HMR support

## Project Structure

```
src/
├── pages/
│   ├── Home.tsx       # Main landing page with room creation/join
│   ├── Room.tsx       # Waiting room for players
│   └── Game.tsx       # Main game interface
├── App.tsx            # Root component with routing
├── socket.ts          # Socket.io client configuration
├── main.tsx           # Entry point
├── App.css            # Global styles
└── index.css          # Base styles

public/               # Static assets
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/priteshmd/reflex-royale.vercel.app.git
   cd reflex-royale.vercel.app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment** (if needed)
   - Ensure the backend server is running on `http://localhost:4000`
   - Update `socket.ts` if using a different backend URL

## Development

### Start the development server
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (default Vite port)

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint code
```bash
npm run lint
```

## How to Play

1. **Create a Room**
   - Enter your name
   - Click "Create Room"
   - Share the generated room code with friends

2. **Join a Room**
   - Enter your name
   - Enter a room code
   - Click "Join Room"

3. **Play the Game**
   - Wait for all players to join
   - Compete in reflex challenges
   - Real-time updates keep all players synchronized

## Architecture

### Routing
- `/` - Home page (create/join rooms)
- `/room/:roomId` - Waiting room
- `/game/:roomId` - Game interface

### Socket.io Events
- `create_room` - Create a new game room
- `join_room` - Join an existing room
- Additional game events handled in respective components

## Configuration Files

- `vite.config.ts` - Vite configuration with React plugin
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.js` - Linting rules
- `postcss.config.js` - CSS processing pipeline

## Browser Support

Works in all modern browsers that support:
- ES2020
- WebSockets (for Socket.io)
- CSS Grid and Flexbox

## Deployment

This project is configured for deployment on Vercel. Simply push to your repository and connect it to Vercel for automatic deployments.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
