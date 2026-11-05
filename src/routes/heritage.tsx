import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, ExternalLink, RefreshCw } from "lucide-react";
import { DESTINATIONS, getDestination } from "@/data/destinations";
import { heritageGuide } from "@/lib/travel.functions";
import { EmptyState, PageHeader, SourceBadge } from "@/components/destination-card";

export const Route = createFileRoute("/heritage")({
  validateSearch: (s: Record<string, unknown>): { id?: string | undefined } => ({ id: typeof s["id"] === "string" ? s["id"] : undefined }),
  head: () => ({
    meta: [
      { title: "AI Heritage Guide — LocalLens AI" },
      { name: "description", content: "History, cultural significance and traditions of local monuments." },
      { property: "og:title", content: "AI Heritage Guide — LocalLens AI" },
      { property: "og:description", content: "Fact-checked heritage stories powered by Gemini AI." },
    ],
  }),
  component: Heritage,
});

function Heritage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: "/heritage" });
  const fn = useServerFn(heritageGuide);
  const q = useQuery({ queryKey: ["heritage", id], queryFn: () => fn({ data: { id: id! } }), enabled: !!id && !!getDestination(id), staleTime: Infinity });
  const d = id ? getDestination(id) : undefined;

  return (
    <>
      <PageHeader eyebrow="AI Heritage Guide" title="Stories behind the stones" text="Choose a place to hear its history, significance and living traditions — fact-labelled and source-linked." />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex gap-3 overflow-x-auto pb-3">
          {DESTINATIONS.map((x) => (
            <button key={x.id} onClick={() => navigate({ search: { id: x.id } })} data-active={x.id === id}
              className="group flex w-44 shrink-0 flex-col overflow-hidden rounded-2xl border bg-card text-left shadow-card transition hover:-translate-y-0.5 data-[active=true]:ring-2 data-[active=true]:ring-primary">
              <img src={x.image} alt="" loading="lazy" width={1024} height={768} className="h-24 w-full object-cover" />
              <span className="p-3 text-sm font-semibold">{x.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          {!d ? (
            <EmptyState title="Select a destination" text="Pick any place above to open its heritage guide." />
          ) : q.isPending ? (
            <div className="grid gap-4 md:grid-cols-2">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-40" />)}</div>
          ) : q.isError ? (
            <EmptyState title="Couldn't load the guide" text={q.error.message}><button className="btn btn-navy" onClick={() => q.refetch()}>Retry</button></EmptyState>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-4xl font-semibold">{d.name}</h2>
                <div className="flex items-center gap-2">
                  <SourceBadge source={q.data.source} />
                  <button className="btn btn-outline !py-1.5" onClick={() => q.refetch()} disabled={q.isFetching}><RefreshCw className={`h-3.5 w-3.5 ${q.isFetching ? "animate-spin" : ""}`} /> Regenerate</button>
                </div>
              </div>
              {q.data.notice && <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><AlertTriangle className="h-4 w-4 text-gold" />{q.data.notice}</p>}
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Block title="Historical background" text={q.data.background} />
                <Block title="Cultural significance" text={q.data.significance} />
                <Block title="Local traditions" text={q.data.traditions} />
                <Block title="Why it's worth visiting" text={q.data.whyVisit} />
              </div>
              <div className="mt-5 rounded-2xl border bg-card p-6 shadow-card">
                <h3 className="text-xl font-semibold">Interesting facts</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {q.data.facts.map((f) => (
                    <li key={f.text} className="flex gap-3">
                      <span className={`h-fit shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${f.verification === "verified" ? "bg-success/15 text-success" : "bg-gold/20"}`}>{f.verification === "verified" ? "Verified" : "Local tradition"}</span>{f.text}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  {d.sources.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">{s.label} <ExternalLink className="h-3 w-3" /></a>)}
                </div>
                {q.data.source === "ai" && <p className="mt-3 text-xs text-muted-foreground">AI-written narrative is grounded in our verified notes; facts list comes directly from the dataset.</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border bg-card p-6 shadow-card"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{text}</p></div>;
}
