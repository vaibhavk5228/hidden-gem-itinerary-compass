import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { IndianRupee, Lightbulb, MapPin } from "lucide-react";
import { mapsSearchUrl } from "@/data/destinations";
import { listExperiences } from "@/lib/travel.functions";
import { EmptyState, PageHeader } from "@/components/destination-card";

const CATS = ["all", "food", "market", "shopping", "handicraft", "culture"] as const;

export const Route = createFileRoute("/experiences")({
  validateSearch: (s: Record<string, unknown>): { cat?: string } => ({ cat: typeof s.cat === "string" ? s.cat : undefined }),
  head: () => ({
    meta: [
      { title: "Local Experiences — LocalLens AI" },
      { name: "description", content: "Traditional food, markets, handicrafts and cultural experiences." },
      { property: "og:title", content: "Local Experiences — LocalLens AI" },
      { property: "og:description", content: "Eat, shop and celebrate like a local in Panipat." },
    ],
  }),
  component: Experiences,
});

function Experiences() {
  const { cat = "all" } = Route.useSearch();
  const navigate = useNavigate({ from: "/experiences" });
  const q = useQuery({ queryKey: ["exp", cat], queryFn: () => listExperiences({ data: { city: "panipat", category: cat } }) });
  return (
    <>
      <PageHeader eyebrow="Local Experiences" title="Taste, shop & celebrate" text="Food, markets, handicrafts and living traditions of Panipat — the 'City of Weavers'." />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => <button key={c} className="chip capitalize" data-active={cat === c} onClick={() => navigate({ search: { cat: c === "all" ? undefined : c } })}>{c}</button>)}
        </div>
        <div className="mt-8">
          {q.isPending ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-80" />)}</div>
          ) : q.isError ? (
            <EmptyState title="Couldn't load experiences" text="Please try again."><button className="btn btn-navy" onClick={() => q.refetch()}>Retry</button></EmptyState>
          ) : q.data.experiences.length === 0 ? (
            <EmptyState title="Nothing in this category yet" text="Try another category." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {q.data.experiences.map((e) => (
                <article key={e.id} className="overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                  <img src={e.image} alt={e.name} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold capitalize text-accent-foreground">{e.category}</span>
                      <span className="text-[11px] font-semibold text-muted-foreground">{e.verification === "verified" ? "Well known" : "Local suggestion"}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold">{e.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
                    <p className="mt-3 flex gap-2 text-sm"><Lightbulb className="h-4 w-4 shrink-0 text-gold" />{e.tip}</p>
                    <p className="mt-2 flex items-center gap-1 text-sm font-semibold"><IndianRupee className="h-4 w-4 text-primary" />{e.estCostINR}</p>
                    <a href={mapsSearchUrl(e.mapsQuery)} target="_blank" rel="noreferrer" className="btn btn-outline mt-4 w-full"><MapPin className="h-4 w-4" /> Find on Google Maps</a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
