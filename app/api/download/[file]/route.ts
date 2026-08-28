import { readFile } from "node:fs/promises";
import path from "node:path";
import type { NextRequest } from "next/server";
import { isSessionPaid } from "@/lib/access";
import { product, type ProductFileKey } from "@/lib/product";

export const runtime = "nodejs";

// GET /api/download/pdf?session_id=...
// GET /api/download/zip?session_id=...
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;

  if (file !== "pdf" && file !== "zip") {
    return new Response("Not found.", { status: 404 });
  }
  const fileKey = file as ProductFileKey;

  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!(await isSessionPaid(sessionId))) {
    return new Response("Payment required.", { status: 403 });
  }

  const meta = product.files[fileKey];
  const absolutePath = path.join(process.cwd(), "content", meta.path);

  let data: Buffer;
  try {
    data = await readFile(absolutePath);
  } catch {
    return new Response("File not available.", { status: 404 });
  }

  return new Response(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": meta.contentType,
      "Content-Disposition": `attachment; filename="${meta.downloadAs}"`,
      "Content-Length": String(data.length),
      "Cache-Control": "no-store",
    },
  });
}
