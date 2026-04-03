# Mahapragya Vihar Static Website

Simple static website for Mahapragya Vihar, Bhuwana, Udaipur.

## Features

- Home page with room overview and gallery preview
- Rooms page with manual availability status
- Gallery, about, contact, support, terms, and privacy pages
- Admin panel for manual room status updates
- Footer branding for ParshWebCraft

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Run the app:

```bash
npm run dev
```

## Notes

- The old booking and payment routes have been removed from the site.
- Room availability is stored in the browser for the admin panel.
- If you want shared, multi-device room status later, we can connect the admin page to Supabase next.
