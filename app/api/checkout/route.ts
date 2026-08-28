import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { product } from "@/lib/product";

export const runtime = "nodejs";

// The landing page posts a form here. We create a Stripe Checkout
// Session and redirect the buyer to Stripe's hosted payment page.
export async function POST() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  const origin = `${proto}://${host}`;

  let checkoutUrl: string | null = null;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.priceInCents,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
        },
      ],
      // {CHECKOUT_SESSION_ID} is replaced by Stripe with the real id.
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=1`,
    });
    checkoutUrl = session.url;
  } catch (err) {
    console.error("Stripe checkout failed:", err);
    return new Response(
      "Could not start checkout. Check that STRIPE_SECRET_KEY is set correctly.",
      { status: 500 },
    );
  }

  if (!checkoutUrl) {
    return new Response("Could not create checkout session.", { status: 500 });
  }

  // 303 turns the POST into a GET on the redirect target.
  return Response.redirect(checkoutUrl, 303);
}
