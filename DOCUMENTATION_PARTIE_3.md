# Generic Restaurant Management System
## Part 3: Frontend Core Components - Technical Documentation

### 1. Overview
This document outlines the implementation details for **Part 3 (Frontend — Core Components)** of the real-time notification system. The objective was to build a reactive, real-time dashboard for a generic Restaurant Management System using Next.js 16 (App Router) and Server-Sent Events (SSE).

### 2. What Has Been Implemented

#### 2.1. The SSE Hook (`app/components/NotificationStream.tsx`)
A robust React custom hook (`useNotificationStream`) designed to handle real-time data streaming from the Python backend.
- **SSE Connection**: Connects to the backend via the native `EventSource` API (`http://localhost:8000/stream?channel=...`).
- **History Fetching**: Automatically fetches previous notifications via `GET /history` before appending real-time events, preventing data loss on reconnect.
- **Memory Safety**: Implements strict `useEffect` cleanup (`eventSource.close()`) and an `isMounted` flag to prevent React state updates on unmounted components (memory leaks).
- **State Management**: Returns the notification array, connection status (boolean), and error messages.

#### 2.2. The Real-time Dashboard (`app/dashboard/page.tsx`)
The main control hub for the restaurant staff to monitor incoming events.
- **Channel Subscription**: A sidebar allowing users to switch dynamically between restaurant-specific channels (e.g., `#orders`, `#kitchen-alerts`, `#staff-tasks`).
- **Reactive UI**: Notifications render instantly using smooth CSS animations (`.animate-slide-left`).
- **Professional SVG Icons**: Replaced generic emojis with lightweight, inline SVG icons for a premium look.
- **Semantic Styling**: Distinct visual cues based on notification types (e.g., Green for new orders, Red for critical alerts).

#### 2.3. The Broadcast Form (`app/dashboard/send/page.tsx`)
An interface allowing administrators to trigger manual notifications across the system.
- **Form Submission**: Sends a structured JSON payload to `POST http://localhost:8000/notify`.
- **UX Best Practices**: Includes loading states (spinners), input validation, and temporary Toast notifications for success/error feedback.

---

### 3. Action Required from Other Team Members

For the project to function end-to-end, the following actions must be taken by the respective team members:

#### 👉 To Person 1 (Backend Python)
- **Endpoints**: Ensure your FastAPI server is running on `http://localhost:8000`. The frontend expects exactly three endpoints:
  1. `GET /history?channel={channel_name}`
  2. `GET /stream?channel={channel_name}` (SSE endpoint)
  3. `POST /notify`
- **CORS Configuration**: This is **CRITICAL**. You must configure CORS middleware in FastAPI to allow requests from `http://localhost:3000`, otherwise, the browser will block the frontend connection.
- **Payload Structure**: The `POST /notify` expects a JSON body containing `title`, `message`, `type` (info, warning, alert, success, order), and `channel`.

#### 👉 To Person 2 (Redis & Infra)
- Ensure the Redis Pub/Sub architecture supports the standard channels defined in the frontend: `system`, `alerts`, `chat`, `orders`, and `tasks`.

#### 👉 To Person 4 (Auth & Pages)
- **Token Injection**: The Dashboard and Send pages are currently unprotected. Once you implement the Login page (`app/login/page.tsx`) and store the user session (e.g., in `sessionStorage` or Cookies), you **MUST** update the `fetch` request in `app/dashboard/send/page.tsx` to include the `Authorization` header.
- Look for the `// NOTE:` comments I left in the code to know exactly where to inject your security tokens.

#### 👉 To Person 5 (Cleanup & Generalization)
- As you remove the old "Mahrousa" specific files, please ensure you do not delete or alter the `globals.css` base classes (`.glass`, `--primary` variables, animations). The new generic dashboard relies heavily on this design system to maintain its premium look.
