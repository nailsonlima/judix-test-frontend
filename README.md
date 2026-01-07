# Frontend – Judix Full Stack Assignment

This is the frontend application for the Judix Full Stack Developer Intern assignment.

## Tech Stack
- Next.js (App Router)
- React
- TailwindCSS
- Axios
- React Hook Form

## Features
- User authentication (register/login/logout)
- Protected dashboard routes
- Task management (CRUD)
- Search and filter functionality
- Responsive UI

## Environment Variables
Create a `.env.local` file:


NEXT_PUBLIC_API_URL=http://localhost:3001/api
Running Locally

npm install
npm run dev
Authentication Flow
User logs in or registers

JWT token is stored securely

Protected routes validate session via backend

Invalid or expired tokens trigger logout

UI/UX
Fully responsive design

Loading and error states

Clean and minimal interface

Scalability Notes
Centralized API client

Clear separation of concerns

Easily extendable with React Query or server components

Deployment
Deployed using Vercel (free tier) and integrated with the backend hosted on Render.
