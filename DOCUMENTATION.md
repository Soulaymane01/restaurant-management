# Technical Documentation: Al Mahrousa Web Application

## 1. System Architecture

This project is built on **Next.js (App Router)**. It leverages Server Components where possible and Client Components (`'use client'`) where interactivity (like state or hooks) is required.

### Key Directories:
- `app/`: Next.js App Router root.
- `app/components/`: Reusable UI components.
- `app/lib/`: Core utilities, data, and translations.
- `app/admin/`: Admin dashboard portal.
- `app/[branch]/`: Dynamic routing for branch-specific pages.

## 2. Core Providers & State Management

The application avoids complex third-party state managers like Redux in favor of React's Context API to keep the bundle size small and performance high.

### LanguageProvider (`app/components/LanguageProvider.tsx`)
Handles the internationalization (i18n) of the app.
- Manages the current language state (`en`, `fr`, `ar`).
- Persists the user's choice to `localStorage`.
- Dynamically updates the document's `dir` (rtl/ltr) and `lang` attributes.
- Exposes a translation object `t` to be used across the app.

### CartProvider (`app/components/CartProvider.tsx`)
Manages the user's shopping basket.
- Persists cart state to `localStorage`.
- Exposes methods to add, remove, and clear items.

## 3. Data Layer

Static data is stored in `app/lib/branch-data.ts`. This acts as a pseudo-database for the frontend. 
- `branches`: Contains location, coordinates, and contact info for all Mahrousa branches.
- `menuItems`: Contains detailed food items, pricing, pictures, and multi-lingual descriptions.
- `translations.ts`: Stores all text strings for internationalization.

## 4. Admin Dashboard (`app/admin/`)

The application features an administrative interface accessible at `/admin`.
- **Authentication:** Protected by a simple session-based login (password: `admin123`).
- **Features:** Order management, CRM (Customer Relationship Management), basic analytics, and menu adjustments.
- **Storage:** Currently relies on `localStorage` to simulate a database. *For production, this should be hooked up to a real backend (e.g., Node.js/Express, Firebase, or Supabase).*

## 5. UI / UX Design

The project uses **Tailwind CSS** extended with custom CSS variables in `globals.css` to achieve a premium "Glassmorphism" aesthetic.
- Global theme switching is supported via the `light`/`dark` class on the `<html>` tag.
- Typography relies on custom Google Fonts (Anton, Alexandria, Outfit, Playfair Display) loaded in `layout.tsx`.

## 6. Future Roadmap for Team

1. **Backend Integration:** Replace the static `branch-data.ts` and `localStorage` admin functions with a real database.
2. **Payment Gateway:** Currently, orders are finalized by redirecting the user to WhatsApp. A potential next step is integrating a Stripe or CMI payment gateway for seamless online ordering.
3. **SEO Optimization:** While basic Next.js metadata is present, individual menu items and static pages (`/about`, `/history`) could benefit from dynamic open graph tags.
