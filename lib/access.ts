import { stripe } from "@/lib/stripe";

// Returns true only if the given Checkout Session id corresponds to a
// real, fully-paid session. This is the single gate that protects the
// files: a download is served only when this returns true.
export async function isSessionPaid(
  sessionId: string | undefined | null,
): Promise<boolean> {
  if (!sessionId) return false;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch {
    // Unknown / malformed session id.
    return false;
  }
}
