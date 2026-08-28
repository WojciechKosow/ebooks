import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY is not set. Add it to .env.local (see .env.example).",
  );
}

// apiVersion is intentionally omitted so the SDK uses the version it
// was published against, avoiding type/behaviour mismatches on upgrade.
export const stripe = new Stripe(secretKey);
