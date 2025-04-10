# Blog Platform

A modern blog platform built with React, TypeScript, and Supabase. Features user authentication, blog post creation, and real-time updates.

## Features

- 🔐 User authentication (signup/login)
- ✍️ Create, read, update, and delete blog posts
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🔒 Row Level Security with Supabase
- ⚡ Real-time updates

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Authentication & Database)
- React Router DOM
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

### Database Setup

The project uses Supabase as the backend. The database schema and policies are managed through migration files located in the `supabase/migrations` directory.

Key tables:
- `posts`: Stores blog posts with title, content, and author information
- Authentication is handled by Supabase Auth

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth)
│   ├── lib/           # Utility functions and configurations
│   ├── pages/         # Page components
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── supabase/
│   └── migrations/    # Database migrations
└── package.json       # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security

- Row Level Security (RLS) is enabled on all tables
- Authentication is handled securely through Supabase
- Environment variables are used for sensitive data
- CORS is properly configured

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
