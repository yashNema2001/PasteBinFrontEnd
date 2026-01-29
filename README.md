# Pastebin Frontend

A modern, responsive React-based pastebin application that allows users to create, share, and view temporary text pastes with optional view limits and automatic expiration.

## Features

- **Create Pastes**: Share code snippets, text, and other content instantly
- **Optional View Limits**: Set a maximum number of views before the paste expires
- **Auto-Expiration**: Pastes automatically expire after 1 hour
- **Copy to Clipboard**: Easily copy generated URLs for sharing
- **View Tracking**: See how many views remain on a paste
- **Expiration Display**: Check when a paste will expire
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Modern, intuitive interface with Tailwind CSS styling

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pastebin-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Setup

Ensure your backend server is running on `http://localhost:8080`. The frontend communicates with the following endpoints:

- `POST /api/pastes` - Create a new paste
- `GET /api/pastes/:id` - Retrieve a paste by ID

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Check TypeScript types without emitting files

## Project Structure

```
src/
├── components/
│   ├── Home.tsx          # Main paste creation interface
│   └── ViewPaste.tsx     # Paste viewing interface
├── App.tsx               # Main app component with routing
├── main.tsx              # Application entry point
├── index.css             # Global styles
└── vite-env.d.ts         # Vite type declarations
```

## Usage

### Creating a Paste

1. Navigate to the home page
2. Enter your content in the text area
3. (Optional) Set a maximum number of views
4. Click "Create Paste"
5. Copy the generated URL to share

### Viewing a Paste

1. Click the generated URL or navigate to `/p/:id`
2. View the paste content
3. Check remaining views and expiration time
4. Return to home to create another paste

## API Integration

The frontend expects a backend API with the following contract:

### Create Paste
```
POST /api/pastes
Content-Type: application/json

{
  "content": "string",
  "ttl_seconds": 3600,
  "max_views": number (optional)
}

Response:
{
  "url": "http://localhost:8080/p/{id}"
}
```

### Get Paste
```
GET /api/pastes/:id

Response:
{
  "content": "string",
  "remaining_views": number | null,
  "expires_at": "ISO-8601 timestamp" | null
}
```

## Deployment

### Production Build

```bash
npm run build
```

This generates an optimized build in the `dist/` directory.

### Environment Configuration

Update the API endpoint in the components if deploying to production:
- Home.tsx: `fetch('http://localhost:8080/api/pastes', ...)`
- ViewPaste.tsx: `fetch('http://localhost:8080/api/pastes/${id}', ...)`

Replace `http://localhost:8080` with your production API URL.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
