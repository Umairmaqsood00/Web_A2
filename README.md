# EventHub - Event Management System

This is my Web Programming Assignment 2. EventHub is a website made with React where you can find events (like concerts and sports matches), see their details and register for the ones you like. The event data comes from the Ticketmaster API.

## What you can do

- Make an account, log in and log out
- Stay logged in even after you refresh the page
- See upcoming events and categories on the home page
- Search for events and filter them by category, city and date
- Open an event to see its date, time, venue, location and picture
- Register for an event (you can't register for the same event twice)
- Cancel your registration
- See your events on the My Events page, split into Upcoming and Completed

## Technologies used

- **React** - to build the pages
- **Redux Toolkit** - to keep data like the logged in user and registered events
- **React Router** - to move between pages
- **Ticketmaster API** - to get the events
- **Vite** - to run the project

## How to run the project

You need [Node.js](https://nodejs.org/) installed on your computer.

**1. Download the project**

```bash
git clone https://github.com/Umairmaqsood00/Web_A2.git
cd Web_A2
```

**2. Install the packages**

```bash
npm install
```

**3. Get a free API key**

Sign up at https://developer.ticketmaster.com/ and copy your **Consumer Key**.

**4. Add the key**

Make a file called `.env` in the project folder (you can copy `.env.example`) and put your key in it:

```
VITE_TM_API_KEY=your_key_here
```

**5. Start the project**

```bash
npm run dev
```

**6. Open it in your browser**

Go to http://localhost:5173

## Environment variable

| Name | What to put in it |
| --- | --- |
| `VITE_TM_API_KEY` | Your Ticketmaster API key |

The `.env` file is in `.gitignore`, so it is not uploaded to GitHub and the key stays private.

## Pages

- Home - `/`
- Events - `/events`
- Event Details - `/events/:id`
- Categories - `/categories`
- Login - `/login` and Register - `/register`
- My Events - `/my-events` (only when you are logged in)

## Folders

- `src/pages` - the pages of the website
- `src/components` - small parts used in the pages, like the navbar and event card
- `src/features` - Redux slices for login, events and registrations
- `src/store` - the Redux store
- `src/api` - code that gets data from the Ticketmaster API
- `src/utils` - small helper functions

## What I tested

- Sign up, login and logout
- Refreshing the page keeps me logged in
- Search and filters
- Event details page
- Registering for an event, and that I can't register twice
- Cancelling a registration
- My Events page (Upcoming and Completed)
- Loading, "no events found" and error messages
- How it looks on a phone and on a laptop

## Notes

- There is no real backend. Users and registrations are saved in the browser (localStorage).
- The free API key has a limit, so if you click too fast you may see a "Too many requests" message. Just wait a second and try again.
