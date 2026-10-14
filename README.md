# EventHub – Event Management System

A React app for exploring events from the **Ticketmaster Discovery API**, registering for them and managing your registrations.

Built with **React**, **Redux Toolkit**, **React Router** and **Vite**.

## Features

- **Authentication** – register, login and logout (frontend simulation, saved in Local Storage so you stay logged in after refresh)
- **Explore events** – browse, search by keyword, filter by category, city and date range, sort, and paginate
- **Upcoming events** and **categories** on the home page, plus a full Categories page
- **Event details** – image, date & time, venue, location, category, status, price range, performers, seat map, ticket sale date and more
- **Registration** – logged-in users can register for an event, duplicates are prevented, and registrations can be cancelled
- **My Events** – see your registered events split into *Upcoming* and *Completed*
- Protected routes, loading and error states, form validation and a responsive layout

## Project Structure

```
src/
  api/ticketmaster.js        # API requests
  components/                # Reusable UI components
  features/
    auth/authSlice.js        # users + current user
    events/eventsSlice.js    # event list, filters, details, categories
    registrations/registrationsSlice.js
  pages/                     # One component per route
  store/store.js             # configureStore + Local Storage saving
  utils/eventHelpers.js      # Helpers for formatting event data
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/events` | Event list with search and filters |
| `/events/:id` | Event details |
| `/categories` | Categories |
| `/login`, `/register` | Authentication |
| `/my-events` | My Events (login required) |

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Umairmaqsood00/Web_A2.git
   cd Web_A2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**

   Get a free key (the *Consumer Key*) from https://developer.ticketmaster.com/ then copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   and put your key in it:
   ```
   VITE_TM_API_KEY=your_key_here
   ```
   The `.env` file is ignored by Git, so your key is never committed.

4. **Run the app**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

5. **Production build**
   ```bash
   npm run build
   npm run preview
   ```

## Notes

- Authentication is a frontend-only simulation. Users, the logged-in user and registrations are stored in the browser's Local Storage.
- The free Ticketmaster key allows 5,000 requests per day and 2 requests per second.
