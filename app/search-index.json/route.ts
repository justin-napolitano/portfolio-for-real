import { getDocsCatalog } from "@/lib/federated-docs";
export const dynamic = "force-static";
/** Emit static search data derived solely from the approved public documentation snapshot. */
export function GET() {
  const catalog = getDocsCatalog();
  return Response.json(catalog.documents.map(document => ({ title: document.title, repo: document.repo, href: document.href, text: document.body, topics: catalog.sources.find(source => source.repo === document.repo)?.topics ?? [] })), { headers: { "X-Content-Type-Options": "nosniff" } });
}
