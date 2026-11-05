import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { INTERESTS } from "@/data/destinations";
import { listDestinations } from "@/lib/travel.functions";
import { DestinationCard, EmptyState, PageHeader } from "@/components/destination-card";

type S = { city?: string; q?: string; cat?: string; hidden?: boolean };

const destQuery = (s: S) =>
  queryOptions({
    queryKey: ["destinations", s],
    queryFn: () => listDestinations({ data: { city: s.city, query: s.q, interests: s.cat ? [s.cat] : [], hiddenOnly: s.hidden } }),
  });

export const Route = createFileRoute("/discover")({
  validateSearch: (s: Record<string, unknown>): S => ({
    city: typeof s.city === "string" ? s.city : "Panipat",
    q: typeof s.q === "string" ? s.q : undefined,
    cat: typeof s.cat === "string" ? s.cat : undefined,
    hidden: s.hidden === true || s.hidden === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Hidden Gems Discovery — LocalLens AI" },
      { name: "description", content: "Search lesser-known attractions by city and interest." },
      { property: "og:title", content: "Hidden Gems Discovery — LocalLens AI" },
      { property: "og:description", content: "Filter hidden heritage sites, temples, shrines and more." },
    ],
  }),
  component: Discover,
});

function Discover() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/discover" });
  const [city, setCity] = useState(search.city ?? "");
  const [q, setQ] = useState(search.q ?? "");
  useEffect(() => { setCity(search.city ?? ""); setQ(search.q ?? ""); }, [search.city, search.q]);
  const { data, isPending, isError, refetch } = useQuery(destQuery(search));
  const set = (patch: Partial<S>) => navigate({ search: (p) => ({ ...p, ...patch }) });

  return (
    <>
      <PageHeader eyebrow="AI Hidden Gems" title="Discover the lesser-known" text="Search by city, pick an interest, and uncover places with real history behind them." />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <form onSubmit={(e) => { e.preventDefault(); set({ city: city.trim(), q: q.trim() || undefined }); }} className="grid gap-3 rounded-2xl border bg-card p-4 shadow-card md:grid-cols-[1fr_1fr_auto]">
          <input className="field" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City (e.g. Panipat)" aria-label="City" />
          <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search places, e.g. tomb" aria-label="Search" />
          <button className="btn btn-navy"><Search className="h-4 w-4" /> Search</button>
        </form>
        <div className="mt-5 flex flex-wrap gap-2">
          <button className="chip" data-active={!search.cat} onClick={() => set({ cat: undefined })}>All</button>
          {INTERESTS.map((i) => (
            <button key={i} className="chip capitalize" data-active={search.cat === i} onClick={() => set({ cat: i })}>{i}</button>
          ))}
          <button className="chip" data-active={!!search.hidden} onClick={() => set({ hidden: search.hidden ? undefined : true })}>✦ Hidden gems only</button>
        </div>

        <div className="mt-8">
          {isPending ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-96" />)}</div>
          ) : isError ? (
            <EmptyState title="Couldn't load destinations" text="Please check your connection and try again."><button className="btn btn-navy" onClick={() => refetch()}>Retry</button></EmptyState>
          ) : data.destinations.length === 0 ? (
            <EmptyState title="No destinations match" text={`We currently cover Panipat, Haryana. Try clearing filters or searching "Panipat".`}>
              <button className="btn btn-navy" onClick={() => navigate({ search: { city: "Panipat" } })}>Reset filters</button>
            </EmptyState>
          ) : (
            <>
              <p className="mb-4 text-sm text-muted-foreground">{data.destinations.length} places found</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.destinations.map((d) => <DestinationCard key={d.id} d={d} />)}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
