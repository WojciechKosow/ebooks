# content/

Your two deliverables live here:

- `ebook.pdf` — the PDF
- `ebook.zip` — the zip bundle

**Replace both placeholder files with your real ones**, keeping the same
filenames (or update the names in `lib/product.ts`).

These files are committed to the repo but are **never served as static
files**. They are only sent to a buyer through `/api/download/...`, which
first verifies the Stripe payment. Do **not** move them into `/public` —
anything in `/public` is downloadable by anyone without paying.
