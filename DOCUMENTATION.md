# Al Mahrousa Restaurant — Technical Documentation

> **Project:** Al Mahrousa Restaurant Web Application  
> **Location:** Tangier, Morocco  
> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · Prisma 7 + SQLite  
> **Repository:** `restaurant-2` (private)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture & Data Flow](#3-architecture--data-flow)
4. [Directory Structure](#4-directory-structure)
5. [Routing & Pages](#5-routing--pages)
6. [Database Schema](#6-database-schema)
7. [State Management](#7-state-management)
8. [Internationalization (i18n)](#8-internationalization-i18n)
9. [UI/UX Design System](#9-uiux-design-system)
10. [Admin Dashboard](#10-admin-dashboard)
11. [Public Components](#11-public-components)
12. [Scripts & Tooling](#12-scripts--tooling)
13. [Development Setup](#13-development-setup)
14. [Testing](#14-testing)
15. [Deployment](#15-deployment)
16. [Git History](#16-git-history)
17. [Known Issues & Technical Debt](#17-known-issues--technical-debt)
18. [Future Roadmap](#18-future-roadmap)
19. [Contributing Guidelines](#19-contributing-guidelines)

---

## 1. Project Overview

Al Mahrousa is a premium multi-language web application for the Al Mahrousa Restaurant chain (4 branches) in Tangier, Morocco. It serves dual purposes:

- **Customer-facing:** Digital menu browsing, item customization, cart management, and WhatsApp-based ordering.
- **Admin dashboard:** Order management, CRM, analytics, menu editor, and system settings.

The application uses a **hybrid Server Component / Client Component** architecture provided by Next.js 16's App Router, with React Context API for state management, Prisma ORM backed by SQLite for persistence, and a glassmorphism-inspired premium UI design.

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.4 |
| Language | TypeScript (strict mode) / JavaScript | TS 5.x |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS (v4) + custom CSS variables | ^4 |
| ORM / DB | Prisma + Better-SQLite3 | Prisma 7.8.0 |
| Database | SQLite (local file) | via `better-sqlite3` 12.10.0 |
| State Mgmt | React Context API | built-in |
| Linting | ESLint 9 (Next.js core-web-vitals + TS configs) | ^9 |
| E2E Testing | Puppeteer | ^25.0.4 |
| Fonts | Google Fonts (Anton, Alexandria, Outfit, Playfair Display, Inter) | — |
| Package Mgr | npm | — |

---

## 3. Architecture & Data Flow

### 3.1 Application Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Root Layout                       │
│  ┌────────────────────────────────────────────────┐ │
│  │           LanguageProvider (Context)            │ │
│  │  ┌──────────────────────────────────────────┐  │ │
│  │  │          CartProvider (Context)           │  │ │
│  │  │  ┌────────────────────────────────────┐  │  │ │
│  │  │  │         Page Content (pages)        │  │  │ │
│  │  │  │  - Landing Page                     │  │  │ │
│  │  │  │  - Branch Menu (dynamic route)      │  │  │ │
│  │  │  │  - Category Items (dynamic route)   │  │  │ │
│  │  │  │  - Admin Dashboard                  │  │  │ │
│  │  │  │  - Static Pages (About/History/...) │  │  │ │
│  │  │  └────────────────────────────────────┘  │  │ │
│  │  └──────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

1. **Static Data Source:** `app/lib/branch-data.ts` contains hardcoded branches, categories, and 87 menu items. This is the initial data loaded on first page visit.

2. **Database (Prisma + SQLite):** Menu items and orders are also persisted in `dev.db`. On mount, pages attempt to fetch from Prisma; if data exists, it overrides the static fallback.

3. **State Persistence:**
   - Language preference → `localStorage` (`lang` key)
   - Cart items → `localStorage` (not yet restored on reload — known issue)
   - Admin auth → `sessionStorage` (`admin_auth`)
   - Admin settings (password, hours, branch status, notifications) → `localStorage`

4. **Order Flow:** Customer browses → adds to cart → checkout → Upsell modal (drinks) → Order form → Server Action (`createOrder`) → SQLite save → WhatsApp redirect with formatted receipt.

---

## 4. Directory Structure

```
restaurant-management/
├── .git/
├── .gitignore
├── README.md
├── DOCUMENTATION.md              # This file
├── package.json                  # Dependencies & scripts
├── package-lock.json
├── tsconfig.json                 # TypeScript strict config
├── next.config.ts                # serverExternalPackages for SQLite
├── postcss.config.mjs            # Tailwind v4 PostCSS config
├── eslint.config.mjs             # ESLint flat config (Next.js)
├── prisma.config.ts              # Prisma config (dotenv, schema path)
├── dev.db                        # SQLite database file
│
├── generate_menu.js              # Script to auto-generate branch-data.ts
├── seed-menu.ts                  # TypeScript seed script
├── test-clicks.js                # Puppeteer E2E test script
│
├── public/
│   └── Logo Mahrousa.png         # Brand logo
│
├── prisma/
│   └── schema.prisma             # Database schema (4 models)
│
├── scripts/
│   └── seed-menu.js              # JS seed script
│
└── app/
    ├── globals.css               # Global styles, Tailwind, CSS variables, animations
    ├── layout.tsx                # Root layout (providers, fonts, metadata)
    ├── page.tsx                  # Landing page (Hero + Signature + Ateliers)
    ├── error.tsx                 # 500 error page
    ├── not-found.tsx             # 404 page
    ├── favicon.ico
    │
    ├── lib/
    │   ├── db.ts                 # Prisma client singleton
    │   ├── translations.ts       # i18n dictionary (en/fr/ar)
    │   └── branch-data.ts        # Static data: branches, categories, menu items
    │
    ├── actions/
    │   ├── orders.ts             # Server Actions for Order CRUD
    │   └── menu.ts               # Server Actions for MenuItem CRUD
    │
    ├── components/
    │   ├── Navbar.tsx             # Navigation bar (language switcher, cart, mobile)
    │   ├── Footer.tsx             # Global footer
    │   ├── LanguageProvider.tsx   # Language context provider
    │   ├── CartProvider.tsx       # Cart context provider
    │   ├── CartSidebar.tsx       # Slide-out cart sidebar
    │   ├── OrderModal.tsx        # Checkout modal with form
    │   ├── UpsellModal.tsx       # Drink upsell modal
    │   ├── ItemDetailModal.tsx   # Item detail with options selector
    │   └── homePage/
    │       ├── Hero.tsx          # Landing hero section
    │       ├── SignatureDish.tsx # Featured dish section
    │       └── Ateliers.tsx      # Branch selection cards
    │
    ├── [branch]/
    │   └── menu/
    │       ├── layout.tsx        # Shared layout (navbar, cart sidebar, modals)
    │       ├── page.tsx          # Category selection grid
    │       └── [category]/
    │           └── page.tsx      # Items within a category (search, filter, sort)
    │
    ├── menu/
    │   └── page.tsx              # Global menu overview (redirects to branch)
    │
    ├── about/
    │   └── page.tsx              # About Us page
    ├── history/
    │   └── page.tsx              # Our History page
    ├── contact/
    │   └── page.tsx              # Contact page with form
    │
    └── admin/
        ├── page.tsx              # Admin dashboard (auth-gated, tabbed)
        └── components/
            ├── types.ts          # TypeScript types + config constants
            ├── AdminLogin.tsx    # Password-protected login
            ├── AdminSidebar.tsx  # Sidebar nav + mobile bottom nav
            ├── OrdersTab.tsx     # Order management (CRUD, bulk, print, CSV)
            ├── AnalyticsTab.tsx  # Revenue analytics, KPIs, charts
            ├── CRMTab.tsx        # Customer segmentation (VIP/Regular/New)
            ├── MenuTab.tsx       # Menu item editor (add/edit/delete, bulk pricing)
            ├── NotificationsTab.tsx # Notification inbox
            └── SettingsTab.tsx   # Settings (branch availability, hours, password)
```

---

## 5. Routing & Pages

| Route | File | Type | Description |
|-------|------|------|-------------|
| `/` | `app/page.tsx` | Client | Landing page (Hero, Signature Dish, Branches) |
| `/menu` | `app/menu/page.tsx` | Client | Global menu overview → redirects to branch selection |
| `/[branch]/menu` | `app/[branch]/menu/page.tsx` | Client | Category selection grid for a branch |
| `/[branch]/menu/[category]` | `app/[branch]/menu/[category]/page.tsx` | Client | Items in a category with search, filter, sort |
| `/admin` | `app/admin/page.tsx` | Client | Admin dashboard (auth-protected) |
| `/about` | `app/about/page.tsx` | Client | About Us page |
| `/history` | `app/history/page.tsx` | Client | Our History page |
| `/contact` | `app/contact/page.tsx` | Client | Contact page with form |
| `/*` | `app/not-found.tsx` | Server | 404 page |
| `/error` | `app/error.tsx` | Client | 500 error page with retry |

### 5.1 Route Parameters

- **`[branch]`**: Dynamic branch slug — `beni-makada`, `mesnana`, `aaouama`, `drissia`
- **`[category]`**: Dynamic category slug — `featured`, `burgers`, `sandwichs`, `shawarmas`, `plats`, `pizzas`, `tacos`, `salades`, `extras`, `boissons`, `jus`, `jus_presse`, `jus_za3za3`

---

## 6. Database Schema

**File:** `prisma/schema.prisma`  
**Provider:** SQLite (via `@prisma/adapter-better-sqlite3`)

### 6.1 Models

#### Order
```prisma
model Order {
  id        Int         @id @default(autoincrement())
  customer  String
  phone     String
  address   String
  total     Float
  branch    String
  date      DateTime    @default(now())
  status    String      @default("pending")   // pending | confirmed | preparing | delivered | cancelled
  note      String?
  items     OrderItem[]
}
```

#### OrderItem
```prisma
model OrderItem {
  id       Int    @id @default(autoincrement())
  orderId  Int
  order    Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)
  name     String
  quantity Int
  price    Float
}
```

#### MenuItem
```prisma
model MenuItem {
  id           Int      @id @default(autoincrement())
  categoryId   String
  featured     Boolean  @default(false)
  available    Boolean  @default(true)
  nameEn       String
  nameFr       String
  nameAr       String
  descEn       String
  descFr       String
  descAr       String
  price        Float
  image        String
  optionsEn    String?   // JSON-encoded array of option labels
  optionsFr    String?
  optionsAr    String?
}
```

#### Customer (defined but not actively used in server actions)
```prisma
model Customer {
  id         Int      @id @default(autoincrement())
  name       String
  phone      String   @unique
  totalSpent Float    @default(0)
  orderCount Int      @default(0)
  lastOrder  DateTime @default(now())
  favBranch  String
  segment    String   @default("new")
}
```

#### Notification (defined but not actively used in server actions)
```prisma
model Notification {
  id      Int      @id @default(autoincrement())
  type    String
  message String
  date    DateTime @default(now())
  read    Boolean  @default(false)
}
```

### 6.2 Known Data Issues

- **Customer & Notification** models are defined in the schema but have no server actions. The admin dashboard currently uses in-memory aggregation from orders (CRM tab) and `localStorage` (notifications).
- Menu items use separate columns per language (`nameEn`, `nameFr`, `nameAr`) rather than a normalized translation table.
- Options are stored as JSON strings in nullable columns.

---

## 7. State Management

### 7.1 LanguageProvider

**File:** `app/components/LanguageProvider.tsx`

- Stores current language (`en` | `fr` | `ar`) in React state.
- Persists to `localStorage` (`lang` key).
- Sets `document.documentElement.dir` (rtl/ltr) and `lang` on change.
- Exposes `language`, `setLanguage()`, and `t` (translation object) via `useLanguage()` hook.
- Wraps children in a `<div>` with `.rtl` class when Arabic is active.

### 7.2 CartProvider

**File:** `app/components/CartProvider.tsx`

- Stores `CartItem[]` in React state with `{ id, name, price, quantity, image, categoryId }`.
- Exposes `addToCart()`, `removeFromCart()`, `clearCart()`, and `totalPrice` via `useCart()` hook.
- **Note:** Cart is not restored from `localStorage` on page load (reset on every full page navigation).

### 7.3 Admin Auth

- `sessionStorage.getItem('admin_auth') === 'true'` gates the admin dashboard.
- Default password: `admin123`
- Password can be changed in Settings tab (stored in `localStorage`).
- 5-attempt lockout protection.

---

## 8. Internationalization (i18n)

**File:** `app/lib/translations.ts`

Three languages supported: **English** (`en`), **French** (`fr`), **Arabic** (`ar`).

### 8.1 Translation Keys

The translation object is hierarchical with ~130 keys covering:

| Namespace | Keys |
|-----------|------|
| Top-level | `welcome`, `select_branch`, `our_menu`, `order_now`, `add_to_cart`, `cart`, `checkout`, `name`, `number`, `address`, `confirm_order`, `total`, etc. |
| `nav` | `masterpieces`, `ateliers`, `backstage`, `discover` |
| `hero` | `eyebrow`, `beyond`, `dining`, `description`, `select_atelier`, `signature_piece`, `explore` |
| `signature` | `eyebrow`, `crafted`, `authentic`, `tangier` |
| `ateliers` | `eyebrow`, `title`, `watermark` |
| `footer` | `quote`, `navigate`, `connect`, `rights`, `location` |
| `cart_labels` | `title`, `subtitle`, `empty`, `explore_menu`, `subtotal`, `proceed`, `items` |
| `order_labels` | `concierge`, `finalize`, `selection`, `confirm_wa`, `sending`, `send_to`, `success_title`, `success_subtitle`, `fullname_placeholder`, `phone_placeholder`, `address_placeholder` |
| `menu_labels` | `search`, `sort_by`, `curated`, `price_low`, `price_high`, `heritage`, `narrative` |
| `categories` | 13 category names (`featured`, `burgers`, `sandwichs`, `shawarmas`, `plats`, `pizzas`, `tacos`, `salades`, `extras`, `boissons`, `jus`, `jus_presse`, `jus_za3za3`) |
| `modal` | `signature`, `masterpiece`, `refine`, `incorporate` |
| `filters` | `daily`, `weekly`, `monthly` |

### 8.2 RTL Support

Arabic activates right-to-left layout via:
- `document.documentElement.dir = 'rtl'`
- CSS class `.rtl` on the provider wrapper, which swaps font to Alexandria (Arabic-friendly) and disables text-transform/letter-spacing.

---

## 9. UI/UX Design System

### 9.1 Design Tokens (CSS Variables)

Defined in `app/globals.css` under `:root` and `[data-theme='dark']`:

| Token | Light | Dark |
|-------|-------|------|
| `--primary` | `#EC3F28` (red) | same |
| `--primary-dark` | `#cc3520` | same |
| `--secondary` | `#3950A1` (blue) | same |
| `--background` | `#ffffff` | `#0a0a0a` |
| `--foreground` | `#1a1a1a` | `#f4f4f4` |
| `--muted` | `#f8f9fa` | `#1e1e1e` |
| `--card` | `#ffffff` | `#141414` |
| `--border` | `#eeeeee` | `#2e2e2e` |
| `--radius` | `12px` | same |
| `--shadow` | `0 10px 40px rgba(0,0,0,0.05)` | `0 10px 40px rgba(0,0,0,0.4)` |

### 9.2 Typography

| Font | Usage | Weight |
|------|-------|--------|
| **Anton** | Headings (h1-h4), brand font | 400 (all caps) |
| **Alexandria** | Arabic mode headings | 300-900 |
| **Outfit** | General UI (not heavily used) | 300-900 |
| **Playfair Display** | Serif/italic accents, decorative text | 400, 700, 900 |
| **Inter** | Body text | 400, 500, 700 |

### 9.3 Glassmorphism

- `.glass` class: `background: rgba(255,255,255,0.7)`, `backdrop-filter: blur(10px)`, border.
- Dark mode variant uses dark backgrounds.
- Applied to navbar, modals, cart sidebar, filter panels.

### 9.4 Animations

| Class | Animation |
|-------|-----------|
| `.animate-fade-in` | Fade in + translate up (0.5s) |
| `.animate-slide-left` | Slide in from right (0.5s, cubic-bezier) |
| `.animate-pulse-slow` | Slow scale pulse (8s) |
| `.animate-spin-slow` | Slow rotation (20s) |
| `.animate-float` | Vertical float (6s) |
| `.btn-primary` | Scale on hover, color transition |
| Image hover | `grayscale` → no filter, `opacity` 0.4 → 1 |

### 9.5 Image Styling

All menu item and category images use Unsplash URLs. Images appear initially in grayscale with low opacity, transitioning to full color on hover — a design choice for a premium aesthetic.

---

## 10. Admin Dashboard

**Route:** `/admin`  
**Auth:** Password-protected (default: `admin123`), 5-attempt lockout, stored in `localStorage`.

### 10.1 Tabs

| Tab | Component | Features |
|-----|-----------|----------|
| Orders | `OrdersTab.tsx` | List with expand/collapse, status filter, branch filter, search, bulk status update (multi-select), print receipt, WhatsApp contact, CSV export, delete, add/edit internal notes, server action driven |
| Analytics | `AnalyticsTab.tsx` | Period filter (daily/weekly/monthly), revenue goal with progress bar, KPI cards (revenue, avg order, cancelled, conversion rate), 14-day sparkline chart (bar), hourly heatmap, branch revenue breakdown, top 7 items, status breakdown, repeat customers |
| Clients | `CRMTab.tsx` | Customer profiles grouped by segment (VIP ≥500 DH / Regular ≥100 DH / New), total spent, order count, last order, favorite branch, lifetime value, WhatsApp quick-contact, CSV export |
| Menu | `MenuTab.tsx` | Add/edit/delete items, category filter, bulk price adjustment (% increase), featured/availability toggles, save to Prisma via server actions |
| Notifications | `NotificationsTab.tsx` | In-app notification list, auto-generated on new pending orders (localStorage), type-based styling (order/info/warning), mark read, delete, clear all |
| Settings | `SettingsTab.tsx` | Restaurant info (name/phone/city), branch activation toggles (per-branch), business hours per day (with closed toggle), auto-notify toggle, change password, danger zone (reset menu / clear orders) |

### 10.2 Server Actions

| Action File | Functions |
|-------------|-----------|
| `app/actions/orders.ts` | `getOrders()`, `createOrder()`, `updateOrderStatus()`, `updateOrderNote()`, `deleteOrder()`, `bulkUpdateOrders()` |
| `app/actions/menu.ts` | `getMenuItems()`, `saveMenuItems()` (clear + re-insert all) |

### 10.3 Admin Types

Defined in `app/admin/components/types.ts`:

- **`Order`**: `{ id, customer, phone, address, items, total, branch, date, status, note? }`
- **`MenuItem`**: `{ id, categoryId, featured, available?, names, descriptions, price, image, options? }`
- **`Client`**: `{ name, phone, orders, totalSpent, orderCount, lastOrder, favBranch, segment }`
- **`Notification`**: `{ id, type, message, date, read }`
- **`OrderStatus`**: `'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled'`
- **`Tab`**: `'orders' | 'analytics' | 'crm' | 'menu' | 'settings' | 'notifications'`

---

## 11. Public Components

### 11.1 Navbar (`Navbar.tsx`)

- Fixed position, transforms on scroll (taller → compact, opacity changes).
- Brand logo (left), desktop nav links (center: Masterpieces, Branches, Backstage), language switcher (EN/FR/AR pills), cart button (menu variant only).
- Mobile: hamburger → full-screen overlay with animated links and language buttons.
- Props: `scrolled: boolean`, `variant: 'landing' | 'menu'`, `onCartOpen?: () => void`.

### 11.2 Footer (`Footer.tsx`)

- Static footer with brand quote, navigation links, contact info.
- Multi-language support via translation keys.

### 11.3 CartSidebar (`CartSidebar.tsx`)

- Slide-in panel from right (`.animate-slide-left`).
- Displays cart items with thumbnail, quantity controls (+/−), remove button.
- Empty state: decorative icon + message + "Explore Menu" link.
- Footer: item count, total price, "Proceed to Order" button.
- Props: `isOpen`, `onClose`, `onCheckout`.

### 11.4 UpsellModal (`UpsellModal.tsx`)

- Appears before checkout when cart has no drinks.
- Fetches 3 random drink items from Prisma (boissons, jus, jus_presse, jus_za3za3 categories).
- User can add a drink and proceed, or skip ("Non merci").
- Props: `isOpen`, `onClose`, `onProceed`.

### 11.5 OrderModal (`OrderModal.tsx`)

- Checkout form: name, phone, delivery address.
- Submits order to Prisma via `createOrder` server action.
- On success: shows confirmation animation, opens WhatsApp with formatted receipt message, clears cart.
- Receipt format includes: restaurant name, branch, customer info, items list, total.
- Props: `isOpen`, `onClose`, `branch` (branch object for phone number).

### 11.6 ItemDetailModal (`ItemDetailModal.tsx`)

- Full-screen modal showing item image (hero), name, description, price.
- Options grid (if item has options like sauces, extras) — multi-select toggle.
- "Incorporate Selection" CTA button adds item to cart with selected options appended to name.
- Props: `item`, `isOpen`, `onClose`.

### 11.7 Home Page Sections

| Component | File | Description |
|-----------|------|-------------|
| `Hero` | `homePage/Hero.tsx` | Full-screen hero with "BEYOND DINING." tagline, description, two CTAs |
| `SignatureDish` | `homePage/SignatureDish.tsx` | Featured dish highlight section |
| `Ateliers` | `homePage/Ateliers.tsx` | 4 branch cards with image, name, hours, location, "Order Now" CTA |

---

## 12. Scripts & Tooling

### 12.1 Package Scripts (`npm run <script>`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server (port 3000) |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Run ESLint on the project |

### 12.2 Seed Scripts

#### `seed-menu.ts` (TypeScript — `npx tsx seed-menu.ts`)
- Imports Prisma client and static menu items from `branch-data.ts`.
- Clears all existing menu items, then inserts all 87 items.
- Sets `available: true` for every item.

#### `scripts/seed-menu.js` (JavaScript — `node scripts/seed-menu.js`)
- Standalone JS version with inline data.
- Same logic: clear + insert.
- Note: data slightly differs from `branch-data.ts` (e.g., uses default images).

### 12.3 Generator Script

#### `generate_menu.js`
- Node.js script that generates the contents of `app/lib/branch-data.ts`.
- Contains all menu data, branches, and categories as hardcoded arrays.
- Writes the complete `branch-data.ts` file via `fs.writeFileSync`.
- Useful for regenerating the static data if the source reference changes.

### 12.4 Prisma Client Config

**File:** `app/lib/db.ts`

```typescript
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

const prismaClientSingleton = () => {
  const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' })
  return new PrismaClient({ adapter })
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
export default prisma
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
```

Uses Node.js global singleton pattern to prevent multiple instances during hot reload.

### 12.5 ESLint Config

**File:** `eslint.config.mjs`

Uses the new ESLint flat config format with:
- `eslint-config-next/core-web-vitals` — Next.js core web vitals rules
- `eslint-config-next/typescript` — TypeScript-specific rules
- Custom ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### 12.6 Next.js Config

**File:** `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3", "@prisma/client"],
};
```

Marks native SQLite/Prisma packages as external on the server to avoid bundling issues.

---

## 13. Development Setup

### 13.1 Prerequisites

- **Node.js** v18+ (tested with v20+)
- **npm** (or yarn/pnpm)

### 13.2 Quick Start

```bash
# 1. Clone the repository
git clone <repo-url>
cd restaurant-management

# 2. Install dependencies
npm install

# 3. Generate Prisma client
npx prisma generate

# 4. (Optional) Seed the database with menu items
npx tsx seed-menu.ts
# or: node scripts/seed-menu.js

# 5. Start development server
npm run dev
```

### 13.3 Environment Variables

No `.env` file is required for local development. The Prisma config (`prisma.config.ts`) expects `DATABASE_URL`, but the local singleton in `app/lib/db.ts` hardcodes the SQLite file path (`file:./dev.db`) directly.

For production, set `DATABASE_URL` in your environment.

---

## 14. Testing

### 14.1 Current Testing Status

Testing is minimal:

- **E2E (Puppeteer):** `test-clicks.js` navigates to `http://localhost:3000`, finds the "EN" language switcher button, and checks if it is clickable (not obscured by other elements).
  - Run with: `node test-clicks.js` (must have dev server running).
- **No unit tests** or integration test frameworks are configured.
- **No linting CI** pipeline configured.

### 14.2 Testing Recommendations

- Add Vitest or Jest for unit/integration testing.
- Use Playwright (modern Puppeteer successor) for E2E.
- Test critical paths: browse menu → add to cart → checkout → WhatsApp redirect.

---

## 15. Deployment

### 15.1 Vercel (Recommended)

The project is optimized for Vercel deployment:

```bash
npm run build   # Produces .next/ output
```

**Important Consideration:** SQLite (`dev.db`) is a local file database and **cannot be used in serverless environments** like Vercel. For production deployment:

1. Change `datasource db` in `prisma/schema.prisma` from `provider = "sqlite"` to `provider = "postgresql"` (or `mysql`).
2. Set up a managed PostgreSQL database (e.g., Neon, Supabase, AWS RDS).
3. Update the adapter in `app/lib/db.ts` accordingly.
4. Configure `DATABASE_URL` environment variable on Vercel.

### 15.2 Alternative Deployments

- **Docker:** No Dockerfile currently exists. Containerization would require bundling the SQLite file or switching to PostgreSQL.
- **VPS:** Can run on any Node.js host with `npm start` for production.
- **Cloudflare Pages / Netlify:** May need additional adapter configuration.

### 15.3 Build Optimization

- `next.config.ts` marks `better-sqlite3` and `@prisma/client` as `serverExternalPackages` — needed because these are native Node.js modules that can't be bundled by webpack.

---

## 16. Git History

```
3f25ee5 feat: implement full-stack order management system with Prisma and Next.js server actions
a9d7cd6 feat: localize Ateliers section typography and styling for Arabic language support
506e53f refactor: update global design system with light mode support, new typography, and secondary color branding
9db1065 refactor: remove redundant fallback values and clean up menu page file structure
25619d5 feat: implement admin dashboard with management tabs and refine UI components
fd5f46b feat: implement restaurant frontend with navigation, cart, language support, and modular component architecture
6bdda68 Initial commit from Create Next App
```

Development timeline: Initial scaffold → Frontend MVP → Admin Dashboard → Design refinements → Arabic localization → Order management backend.

---

## 17. Known Issues & Technical Debt

### 17.1 Dual Data Sources

Menu items exist in two places with potential for inconsistency:
- **Static:** `app/lib/branch-data.ts` (87 items)
- **Database:** `dev.db` via Prisma (seeded from the static data)

Pages load static data first, then attempt to fetch from Prisma. If the database is empty, stale, or inconsistent, the user experience is unpredictable.

### 17.2 Cart Persistence

`CartProvider` does not restore cart from `localStorage` on mount. The cart always starts empty on page load or refresh.

### 17.3 Admin Auth

Authentication is minimal:
- Password stored in `localStorage` (plaintext).
- Auth state in `sessionStorage`.
- No role-based access, no session expiry, no HTTPS enforcement in code.
- **Not suitable for production** without a proper auth system.

### 17.4 Orphaned Prisma Models

- `Customer` model is defined but has no CRUD server actions.
- `Notification` model is defined but unused in the backend — notifications use `localStorage`.

### 17.5 Menu Item Options

The `MenuItem` model has `optionsEn/Fr/Ar` (JSON strings), but the admin `MenuTab` provides no UI to manage options. Options can only be set via direct database manipulation or code changes.

### 17.6 No Payment Gateway

Orders are finalized by WhatsApp message only. No Stripe, CMI, or other payment integration exists.

### 17.7 Image Dependencies

All images are hotlinked from Unsplash. If Unsplash changes URLs or rate-limits the app, images will break. Consider downloading and serving assets locally.

### 17.8 Mobile Responsiveness

The app uses Tailwind breakpoints (`md:`, `lg:`) but some sections (particularly the admin dashboard) may have layout issues on very small screens.

---

## 18. Future Roadmap

### Short-term (v1.1)

- [ ] Connect `Customer` and `Notification` Prisma models to actual server actions.
- [ ] Implement cart persistence from `localStorage` on mount.
- [ ] Drop the static `branch-data.ts` dependency — make Prisma the single source of truth.
- [ ] Add proper error boundaries and loading skeletons.
- [ ] Implement menu item options editor in the admin `MenuTab`.

### Medium-term (v1.2)

- [ ] Migrate from SQLite to PostgreSQL for production deployment.
- [ ] Implement proper authentication (NextAuth.js, Supabase Auth, or similar).
- [ ] Add payment gateway integration (Stripe, CMI).
- [ ] Image upload (instead of Unsplash URLs).
- [ ] Unit and integration test framework (Vitest + Testing Library).
- [ ] CI/CD pipeline (GitHub Actions for lint + test + build).

### Long-term (v2.0)

- [ ] Real-time order notifications (WebSockets / Server-Sent Events).
- [ ] In-branch tablet ordering mode.
- [ ] Customer accounts and order history.
- [ ] Delivery zone / fee management.
- [ ] Multi-language slug-based SEO routes.
- [ ] PWA support for offline menu browsing.
- [ ] Native mobile app (React Native / Expo).

---

## 19. Contributing Guidelines

1. **Code Style:** Follow existing patterns — Tailwind utility classes, custom CSS variables from `globals.css`, TypeScript strict mode.
2. **Translations:** Any new UI text must be added to `app/lib/translations.ts` in all three languages (en/fr/ar).
3. **Menu Data:** Use the admin Menu tab to edit items, or edit `app/lib/branch-data.ts` and re-seed the database.
4. **Branches:** Add new branches to `app/lib/branch-data.ts` and the Prisma schema if needed.
5. **State:** Prefer React Context over prop drilling. Avoid adding Redux or other heavy state libraries.
6. **Server Actions:** Keep data mutations in `app/actions/` directory. Always validate and handle errors.
7. **Pre-Commit Checklist:**
   - `npm run lint` passes
   - `npm run build` succeeds
   - Test the full cart → checkout flow manually
   - Verify all three languages display correctly
