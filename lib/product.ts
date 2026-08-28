// ─────────────────────────────────────────────────────────────
//  Edit your product here. This is the only file you need to
//  touch to change the title, description, price, or filenames.
// ─────────────────────────────────────────────────────────────

export const product = {
  // Shown on the landing page and the Stripe checkout page.
  name: "My Ebook",
  description: "A short description of what the buyer gets.",

  // Price in the smallest currency unit (cents). 1900 = $19.00
  priceInCents: 1900,
  currency: "usd",

  // The two files delivered after payment. They live in /content
  // (NOT /public — that would let anyone download them for free).
  // Replace these files with your real ones, keeping the same names
  // or updating them here.
  files: {
    pdf: {
      path: "ebook.pdf",
      // Name the browser suggests when the buyer saves the file.
      downloadAs: "ebook.pdf",
      contentType: "application/pdf",
    },
    zip: {
      path: "ebook.zip",
      downloadAs: "ebook.zip",
      contentType: "application/zip",
    },
  },
} as const;

export type ProductFileKey = keyof typeof product.files;

export function formattedPrice(): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceInCents / 100);
}
