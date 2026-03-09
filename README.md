# Timeseries Viewer

React app for viewing and comparing time series data, built with Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** – build tool
- **Tailwind CSS v4** – styling
- **shadcn/ui** – UI components (Radix)
- **TanStack Table** – data tables
- **lightweight-charts** – charts
- **nuqs** – URL state (filters, pagination, sorting)
- **Jest** – unit tests

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

| Command                | Description                       |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start dev server (Vite)           |
| `npm run build`        | Type-check + build for production |
| `npm run preview`      | Preview production build          |
| `npm run lint`         | Run ESLint                        |
| `npm test`             | Run Jest tests                    |
| `npm run test:watch`   | Run tests in watch mode           |
| `npm run format`       | Format code with Prettier         |
| `npm run format:check` | Check formatting                  |

## Project Structure

```
src/
├── components/     # React components (ui, features)
├── hooks/         # Custom hooks (e.g. useDataTable)
├── lib/           # Helpers, configs, API
├── providers/     # Context providers (nuqs)
├── types/         # TypeScript types
├── data/          # Static data
└── test/          # Test setup & mocks
```

## Code Quality

- **ESLint** – linting
- **Prettier** – formatting
- **Husky** – pre-commit hooks (lint-staged, commitlint)
- **Commitlint** – Conventional Commits
