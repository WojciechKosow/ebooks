import { product, formattedPrice } from "@/lib/product";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const canceled = (await searchParams).canceled;

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          {product.name}
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-black dark:text-zinc-50">
            {formattedPrice()}
          </span>
          <span className="text-sm text-zinc-500">one-time</span>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li>✓ PDF ebook</li>
          <li>✓ ZIP with the bonus files</li>
          <li>✓ Instant download after payment</li>
        </ul>

        {canceled ? (
          <p className="mt-6 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
            Payment canceled — you have not been charged.
          </p>
        ) : null}

        <form action="/api/checkout" method="POST" className="mt-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Buy now
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-400">
          Secure checkout powered by Stripe.
        </p>
      </main>
    </div>
  );
}
