# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Pick a lift, lock it into today's plan, and watch the week's work add up.

## 🚀 Live Demo

- **Live Link:** https://b14-a6-fit-log-umber.vercel.app
- **GitHub:** https://github.com/mdimranuddin/B14-A6-Fit-Log

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 | UI framework with App Router |
| Tailwind CSS | Utility-first styling |
| React Hot Toast | Toast notifications |
| Context API | Global state management |
| localStorage | Data persistence across reloads |

## ✨ Key Features

1. **Workout Library** — Browse 12 exercises in a responsive 3-column grid with image, category tags, equipment and stats
2. **Workout Detail Page** — Full two-column layout with key specs table, step-by-step instructions and action buttons
3. **Today's Plan** — Add up to 5 workouts to your daily plan with live metrics (exercises, minutes, calories)
4. **Save for Later** — Save workouts to a separate tab to revisit anytime
5. **Sort and Filter** — Sort the library by Duration, Calories or Rating using the dropdown
6. **Mark as Done** — Check off completed workouts with toast notification
7. **Persistent Storage** — Plan and saved data survive page reloads via localStorage
8. **Responsive Design** — Works on mobile, tablet and desktop with collapsible mobile navbar
9. **Loading States** — Spinner shown while fetching workout data from the API
10. **404 Page** — Custom not-found page for unknown routes

## 📡 API

- All workouts: https://api.api-store.workers.dev/api/fitlog
- Single workout: https://api.api-store.workers.dev/api/fitlog/:id

## 🏃 Getting Started

```bash
git clone https://github.com/mdimranuddin/B14-A6-Fit-Log.git
cd fitlog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
fitlog/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── not-found.js
│   ├── workout/[id]/page.js
│   └── my-plan/page.js
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
├── context/
│   └── PlanContext.jsx
└── public/
    ├── banner.png
    └── logo.png
```
