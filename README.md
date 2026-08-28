# Ebook store

A dead-simple store that sells one product (a PDF + a ZIP) with Stripe
Checkout. Flow: **landing → Stripe payment → download both files**.

## How it stays secure

The two files live in `/content`, **not** `/public`. Files in `/public`
are served to anyone on the internet; files in `/content` are only sent
through `/api/download/...`, which first checks with Stripe that the order
was paid. So no one can download without buying.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your Stripe secret key. Copy `.env.example` to `.env.local` and set:

   ```
   STRIPE_SECRET_KEY=sk_test_your_key_here
   ```

   Get the key at https://dashboard.stripe.com/apikeys (use a `sk_test_...`
   key while developing).

3. Put your real files in `content/` (replace the placeholders):
   - `content/ebook.pdf`
   - `content/ebook.zip`

4. Edit product name, price, and description in `lib/product.ts`.

5. Run it:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000. Use Stripe's test card `4242 4242 4242 4242`,
   any future expiry, any CVC.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. In the Vercel project settings, add the environment variable
   `STRIPE_SECRET_KEY` (use your **live** key, `sk_live_...`, for real
   sales).
4. Deploy. That's it — no webhook or database needed.

## Files

| Path                              | What it does                              |
| --------------------------------- | ----------------------------------------- |
| `lib/product.ts`                  | Product name, price, filenames (edit me)  |
| `app/page.tsx`                    | Landing page with the Buy button          |
| `app/api/checkout/route.ts`       | Creates the Stripe Checkout session       |
| `app/success/page.tsx`            | Post-payment page with download links     |
| `app/api/download/[file]/route.ts`| Verifies payment, then streams the file   |
| `content/`                        | Your PDF + ZIP (never web-served)         |
