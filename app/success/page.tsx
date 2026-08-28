import Link from "next/link";
import { isSessionPaid } from "@/lib/access";
import { product } from "@/lib/product";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const raw = (await searchParams).session_id;
  const sessionId = Array.isArray(raw) ? raw[0] : raw;
  const paid = await isSessionPaid(sessionId);

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        {paid ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Thank you!
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Your payment was successful. Download your files below.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`/api/download/pdf?session_id=${encodeURIComponent(sessionId!)}`}
                className="flex w-full items-center justify-between rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <span>Download PDF</span>
                <span aria-hidden>↓</span>
              </a>
              <a
                href={`/api/download/zip?session_id=${encodeURIComponent(sessionId!)}`}
                className="flex w-full items-center justify-between rounded-lg border border-zinc-300 px-4 py-3 font-medium text-black transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                <span>Download ZIP</span>
                <span aria-hidden>↓</span>
              </a>
            </div>

            <p className="mt-6 text-xs text-zinc-400">
              Keep this page bookmarked — the links stay valid for this
              order. You bought: {product.name}.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              We couldn&apos;t confirm your payment
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              If you just paid, wait a moment and refresh. Otherwise, please
              start again.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Back to store
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
