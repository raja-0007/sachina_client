# Employee Management Frontend

Modern employee management dashboard built with Next.js 16, React 19, and Tailwind CSS v4.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Lucide React (icons)
- Custom UI components

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Update the URL if your backend runs on a different port or domain.

## Running the App

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

The app will run on `http://localhost:3000`

## Project Structure

```
sachina_client/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles & Tailwind config
│   │   ├── layout.js         # Root layout with providers
│   │   └── page.js           # Dashboard page
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── EmployeesClient.jsx
│   │   ├── EmployeeForm.jsx
│   │   ├── EmployeeRow.jsx
│   │   ├── EmployeeDetail.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── StatCards.jsx
│   │   └── Sidebar.jsx
│   └── lib/
│       └── utils.js          # Helper functions & constants
├── public/                   # Static assets
├── .env.local               # Environment variables
└── package.json
```

## Features

- Employee CRUD operations
- Real-time search with debouncing
- Filter by department and status
- Pagination with customizable page size
- Employee statistics dashboard
- Responsive design (mobile-first)
- Toast notifications
- Modal dialogs
- Form validation
- Avatar generation from initials

## UI Components

Custom components in `src/components/ui/`:
- Button
- Input
- Select
- Textarea
- Modal
- ConfirmDialog
- Toast
- Badge
- Avatar

## Styling

Uses Tailwind CSS v4 with custom theme defined in `globals.css`:
- Primary color: Emerald (teal/green)
- Secondary color: Violet
- Accent color: Pink
- Custom shadows and animations
- Glassmorphism effects

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```

## Notes

- Make sure the backend is running before starting the frontend
- All API calls go through the backend at the URL specified in `.env.local`
