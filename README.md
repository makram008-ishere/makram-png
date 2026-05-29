# makram-png

A dark-themed developer + graphic designer portfolio built with Next.js 14, TypeScript, Tailwind CSS, Supabase, and Framer Motion.

## Features

- Public pages: Home, Projects, Designs, Blog, Contact
- Admin panel: login, dashboard, posts, projects, designs
- Supabase auth and CRUD management
- Markdown blog support with `react-markdown`
- Image upload support for design uploads
- Responsive dark UI with animated transitions

## Folder structure

- `app/`: Next.js App Router pages and layouts
- `components/`: reusable UI and admin components
- `lib/`: Supabase client helpers
- `types/`: Supabase table type definitions
- `styles/`: optional CSS assets

## Supabase setup

1. Create a Supabase project.
2. Create database tables:

- `posts` with columns:
  - `id` UUID primary key default `gen_random_uuid()`
  - `title` text
  - `content` text
  - `created_at` timestamp with time zone default `now()`
  - `tags` text[]
  - `cover_image` text

- `projects` with columns:
  - `id` UUID primary key default `gen_random_uuid()`
  - `title` text
  - `description` text
  - `image_url` text
  - `github_link` text
  - `live_link` text
  - `tags` text[]

- `designs` with columns:
  - `id` UUID primary key default `gen_random_uuid()`
  - `title` text
  - `image_url` text
  - `description` text
  - `tags` text[]
  - `created_at` timestamp with time zone default `now()`

3. Create a storage bucket named `designs`, and set public access for uploaded image previews.
4. Configure Supabase Auth for your admin user.

## Environment variables

Create a `.env.local` file at the project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> Use the service role key only server-side. It is included here for server-side admin operations if you later extend the backend.

## Run locally

```bash
npm install
npm run dev
```

## Vercel deployment

1. Push the repository to GitHub.
2. In Vercel, create a new project and connect your repo.
3. Set environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy. Vercel will automatically detect the Next.js app.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial makram-png portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/makram-png.git
git push -u origin main
```

## Notes

- The admin routes require Supabase Auth and will redirect to `/admin/login` if not signed in.
- The blog detail page renders markdown securely using `react-markdown`.
- Use the admin panel to add content and keep the site portfolio-ready.
