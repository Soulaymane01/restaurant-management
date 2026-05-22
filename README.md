# Al Mahrousa Restaurant - Frontend Web Application

Welcome to the Al Mahrousa Restaurant Web Application repository. This project is a premium, multi-language Next.js web application built for the Al Mahrousa Restaurant chain in Tangier, Morocco.

## Overview

The application is built using modern web development practices and technologies:
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS with a custom Glassmorphism and premium design system
- **Language Support:** Built-in multi-language support (English, French, Arabic) via custom Context Provider
- **State Management:** React Context API for Cart and Language state

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) installed.

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

For a detailed technical overview, architectural decisions, and component breakdown, please refer to the [DOCUMENTATION.md](./DOCUMENTATION.md) file included in this repository.

## Contribution Guidelines

- Ensure your code follows the existing style, specifically regarding Tailwind classes and custom CSS variables defined in `app/globals.css`.
- Any updates to static text must be reflected in `app/lib/translations.ts` across all three languages.
- When adding new menu items or branches, update `app/lib/branch-data.ts`.

## Deployment

The project is optimized for deployment on Vercel. 
Simply link the repository to a Vercel project, and it will automatically build and deploy using the `next build` command.
