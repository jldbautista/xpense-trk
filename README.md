# xpense.trk

A pixel-art styled expense tracker built with Next.js and Supabase. Log your expenses, set a monthly budget, and watch your Pixel Cat companion react to your spending habits.

## Features

- **Track** — log expenses quickly and keep every purchase in one place
- **Budget** — set a monthly spending limit and see how much room is left
- **Check in** — watch your Pixel Cat's mood change as your budget gets used
- **Review** — scan totals, transactions, and your top spending category at a glance
- Email/password authentication with protected dashboard routes
- Filter and search expenses by category, month, and keyword

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev)
- [Supabase](https://supabase.com) for authentication and data storage (Postgres with Row Level Security)
- [Tailwind CSS](https://tailwindcss.com)
- TypeScript

## Getting started

### Prerequisites

- Node.js
- A [Supabase](https://supabase.com) project

### Setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your Supabase project credentials:

   ```bash
   cp .env.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Run the database migrations in `supabase/migrations` against your Supabase project. These create the `expenses` and `budgets` tables with Row Level Security policies so each user can only access their own data.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Project structure

```
app/
  actions/        Server actions (auth, expenses, budget)
  components/
    auth/         Login and signup UI
    landing/      Marketing/landing page sections
    tracker/      Dashboard expense tracker UI
    ui/           Shared pixel-styled UI primitives
  dashboard/      Protected dashboard route
  lib/            Data access helpers and Supabase client
  login/          Login route
  signup/         Signup route
supabase/
  migrations/     SQL migrations for the database schema and RLS policies
proxy.ts          Auth middleware (redirects based on session state)
```

## Database

This project uses Supabase Postgres with Row Level Security enabled. 