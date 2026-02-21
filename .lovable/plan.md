

## iSorter SaaS Dashboard — Implementation Plan

### Overview
A Foreplay-style swipe file dashboard where users save, organize, search, and share Instagram content collected via the iSorter Chrome extension. Built with React + Supabase (replacing Next.js + API routes).

---

### 1. Project Initialization
- Set up React + Vite + TypeScript + Tailwind project structure
- Install shadcn/ui components
- Configure Supabase client (anon key for client, service role for edge functions)
- Set up React Router with all required routes

---

### 2. Supabase Backend Setup

**Authentication:**
- Email/password login via Supabase Auth

**Database Tables:**
- `workspaces` — user workspace with plan (free/pro/agency)
- `boards` — boards belonging to a workspace
- `media_items` — Instagram content metadata (unique by workspace + ig_shortcode)
- `board_items` — junction table linking media to boards
- `shares` — public share links for boards and items

**Storage:**
- `thumbnails` bucket with path: `{user_id}/{ig_shortcode}.jpg`

**Row-Level Security:**
- Users can only access their own workspace, boards, and media
- Public share routes bypass auth via edge functions using service role

---

### 3. Supabase Edge Functions (replacing API routes)

- **bootstrap** — Auto-create workspace + default board on first login
- **items-save** — Validate JWT, validate board ownership, upsert media item, link to board
- **thumbnail-upload** — Accept file/base64, upload to storage, return path
- **share-create** — Generate public share ID for a board or item
- **share-resolve** — Fetch shared content without auth (service role)

All edge functions validate the Supabase JWT from `Authorization: Bearer <token>` header (sent by the Chrome extension).

---

### 4. Pages & UI

**Login Page (`/login`)**
- Email/password form
- On login, call bootstrap to ensure workspace + default board exist

**Dashboard (`/dashboard`)**
- Overview with quick stats (total saved items, boards count)
- Recent saves

**Boards List (`/boards`)**
- Grid of board cards
- Create new board button (gated by plan: free = 1 board max)

**Board Detail (`/boards/:id`)**
- Grid of saved media cards showing: thumbnail, type badge, likes/comments/views, date, rating
- **Filters:** search by caption/hashtags, filter by type, min likes, min views
- **Sort:** by likes, views, comments, date

**Item Detail (`/item/:id`)**
- Large thumbnail
- Full metrics display
- Caption with copy button
- Hashtags with copy button
- Editable tags, rating (1–5), and notes
- Share button

**Connect Page (`/connect`)**
- Displays user's Supabase access token for copying into the Chrome extension

**Public Share Pages (`/share/item/:shareId`, `/share/board/:shareId`)**
- No login required
- Fetches data via edge function using service role
- Shows signed thumbnail URLs for private bucket

---

### 5. Layout & Design
- Dark-mode-friendly, clean minimal SaaS design
- Left sidebar navigation (Foreplay-style) with: Dashboard, Boards, Connect
- Card-based grid layouts
- Responsive design
- shadcn/ui components throughout

---

### 6. Pricing Gating
- `workspace.plan` field controls limits (free/pro/agency)
- Board creation checks plan server-side in edge function
- Free: 1 board, Pro: unlimited boards, Agency: future multi-workspace

---

### 7. Implementation Order
1. Project setup + Supabase connection + auth
2. Database schema + RLS policies + storage bucket
3. Sidebar layout + routing
4. Bootstrap edge function + dashboard page
5. Boards CRUD with plan gating
6. Items save + thumbnail upload edge functions
7. Board detail view with grid + filters
8. Item detail page with tags/rating/notes
9. Share link generation + public pages
10. Connect page (token display)

