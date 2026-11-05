import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Clock, ExternalLink, Heart, IndianRupee, MapPin, Navigation } from "lucide-react";
import { getDestination, mapsDirectionsUrl, mapsSearchUrl } from "@/data/destinations";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/destination/$id")({
  loader: ({ params }) => {
    const d = getDestination(params.id);
    if (!d) throw notFound();
    return { id: d.id };
  },
  head: ({ loaderData }) => {
    const d = loaderData ? getDestination(loaderData.id) : undefined;
    const title = d ? `${d.name} — LocalLens AI` : "Destination — LocalLens AI";
    return { meta: [{ title }, { name: "description", content: d?.short ?? "Destination details" }, { property: "og:title", content: title }, { property: "og:description", content: d?.short ?? "" }] };
  },
  component: Detail,
});

function Detail() {
  const { id } = Route.useLoaderData();
  const d = getDestination(id)!;
  const fav = useFavorites();
  const saved = fav.has(d.id);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link to="/discover" search={{ city: "Panipat" }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to discovery</Link>
      <img src={d.image} alt={d.name} width={1024} height={768} className="mt-4 aspect-[16/8] w-full rounded-3xl object-cover shadow-lift" />
      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold md:text-5xl">{d.name}</h1>
          <p className="mt-2 inline-flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" /> {d.locationHint}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => fav.toggle(d.id)} className="btn btn-outline"><Heart className={`h-4 w-4 ${saved ? "fill-destructive text-destructive" : ""}`} />{saved ? "Saved" : "Save"}</button>
          <a href={mapsSearchUrl(d.mapsQuery)} target="_blank" rel="noreferrer" className="btn btn-outline"><MapPin className="h-4 w-4" /> View on Google Maps</a>
          <a href={mapsDirectionsUrl(d.mapsQuery)} target="_blank" rel="noreferrer" className="btn btn-primary"><Navigation className="h-4 w-4" /> Directions</a>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <p className="text-lg leading-relaxed">{d.description}</p>
          <div><h2 className="text-2xl font-semibold">Cultural significance</h2><p className="mt-2 text-muted-foreground">{d.significance}</p></div>
          <div>
            <h2 className="text-2xl font-semibold">Key facts</h2>
            <ul className="mt-3 space-y-2">
              {d.facts.map((f) => (
                <li key={f.text} className="flex gap-3 rounded-xl border bg-card p-3 text-sm">
                  <span className={`h-fit shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${f.verification === "verified" ? "bg-success/15 text-success" : "bg-gold/20 text-foreground"}`}>{f.verification === "verified" ? "Verified" : "Local tradition"}</span>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/heritage" search={{ id: d.id }} className="btn btn-navy"><BookOpen className="h-4 w-4" /> Open AI Heritage Guide</Link>
        </div>
        <aside className="h-fit space-y-4 rounded-2xl border bg-card p-5 shadow-card text-sm">
          <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> ~{d.estVisitMinutes} min visit <em className="text-muted-foreground">(estimate)</em></p>
          <p className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-primary" /> {d.estCostINR ? `~₹${d.estCostINR} per person` : "Free entry"} <em className="text-muted-foreground">(estimate)</em></p>
          <p className="text-muted-foreground">{d.timings}</p>
          <div>
            <p className="font-semibold">Sources</p>
            {d.sources.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-1 text-primary hover:underline">{s.label} <ExternalLink className="h-3 w-3" /></a>)}
          </div>
        </aside>
      </div>
    </div>
  );
}
