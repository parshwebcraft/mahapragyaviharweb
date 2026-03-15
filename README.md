# Mahapragya Vihar Booking Platform

Production-grade booking platform for Mahapragya Vihar, Bhuwana, Udaipur. The stack is aligned to the requested architecture:

- Next.js 14 + TypeScript + TailwindCSS
- Shadcn-style component structure
- Supabase PostgreSQL + Supabase Auth
- Razorpay payments
- Resend email
- Twilio WhatsApp
- OpenAI-powered chatbot
- Vercel deployment
- PWA installability

## Features

- Smart room booking with automatic room assignment
- Event booking engine for halls, garden, and kitchen
- Dynamic pricing for weekday, weekend, and festival dates
- Razorpay order creation and webhook endpoint scaffold
- PDF invoice generation endpoint
- AI chatbot endpoint and floating widget
- Admin dashboard shell for inventory, approvals, payments, and analytics
- Supabase SQL schema with row-level security policies

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

4. Apply the SQL schema in Supabase:

- Open Supabase SQL editor.
- Run [`supabase/schema.sql`](./supabase/schema.sql).
- Configure Storage buckets for `gallery` and `invoices`.

## Deployment Guide

### Vercel

1. Import the repo into Vercel.
2. Add all variables from `.env.example`.
3. Set the project framework to Next.js.
4. Deploy.

### Supabase

1. Create a new Supabase project.
2. Enable Email OTP / Magic Link in Auth.
3. Run the SQL schema.
4. Create an admin user and update `public.profiles.role` to `admin`.

### Razorpay

1. Add API keys in Vercel environment variables.
2. Configure webhook to:

```text
https://your-domain.com/api/razorpay/webhook
```

3. Use `RAZORPAY_WEBHOOK_SECRET` to validate webhook signatures in production.

### Resend / Twilio / OpenAI

- Resend sends branded booking confirmations and invoice emails.
- Twilio sends WhatsApp confirmations with booking summary and map link.
- OpenAI powers richer concierge responses when you replace the current scripted fallback.

## Folder Structure

```text
app/
components/
lib/
services/
supabase/
types/
utils/
public/
```

## Production Notes

- Replace mock data reads with Supabase queries in `services/supabase-bookings.ts`.
- Lock admin routes behind server-side auth checks.
- Complete Razorpay webhook signature verification and payment persistence.
- Upload gallery media to Supabase Storage and swap placeholder images.
# mahapragyaviharweb
