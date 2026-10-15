# EventHub - Event Management System

Web Programming Assignment 2. It's a React app that shows events from the Ticketmaster Discovery API. You can sign up, log in, register for events and see the events you registered for.

Made with React, Redux Toolkit, React Router and Vite.

## Features

- Sign up, login and logout (no backend, users are saved in localStorage so you stay logged in after a refresh)
- Events page with search, filters (category, city, date range), sorting and pagination
- Home page with upcoming events and categories
- Event details page with date, venue, price range, performers, seat map etc.
- Register for an event (can't register twice) and cancel a registration
- My Events page with Upcoming and Completed tabs, only for logged in users
- 404 page, loading and error messages, form validation, works on mobile

## How to run

Clone the repo and install the packages:

```bash
git clone https://github.com/Umairmaqsood00/Web_A2.git
cd Web_A2
npm install
```

You need a Ticketmaster API key. Make a free account at https://developer.ticketmaster.com/ and copy the Consumer Key. Then copy `.env.example` to `.env` and put your key in it:

```
VITE_TM_API_KEY=your_key_here
```

`.env` is in `.gitignore` so the key doesn't get pushed.

Start the app:

```bash
npm run dev
```

and open http://localhost:5173

For a production build run `npm run build` (output goes to the `dist` folder) and `npm run preview` to test it.

## Pages

- `/` - home
- `/events` - all events with search and filters
- `/events/:id` - event details
- `/categories` - categories
- `/login`, `/register`
- `/my-events` - registered events (need to be logged in)

## Folders

- `src/api` - Ticketmaster API calls
- `src/features` - Redux slices (auth, events, registrations)
- `src/store` - Redux store, also saves data to localStorage
- `src/pages` - one file for each page
- `src/components` - smaller components used in the pages
- `src/utils` - helper functions for event data

## Notes

- Login is only a frontend simulation. Users, the logged in user and registrations are all kept in localStorage.
- The free API key allows 5000 requests a day and 2 per second, so if you click around very fast you might see a "Too many requests" error.
