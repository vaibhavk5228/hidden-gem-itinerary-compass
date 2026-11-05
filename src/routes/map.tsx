import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { DESTINATIONS, mapsDirectionsUrl, mapsSearchUrl } from "@/data/destinations";
import { PageHeader } from "@/components/destination-card";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Explore on Map — LocalLens AI" },
      { name: "description", content: "See every destination on Google Maps and get directions." },
      { property: "og:title", content: "Explore on Map — LocalLens AI" },
      { property: "og:description", content: "One-tap Google Maps directions to hidden gems." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [sel, setSel] = useState(DESTINATIONS[0]!);
  return (
    <>
      <PageHeader eyebrow="Explore on Map" title="Find your way" text="Locations are looked up by name on Google Maps — we never invent coordinates." />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[340px_1fr]">
        <ul className="max-h-[560px] space-y-2 overflow-y-auto">
          {DESTINATIONS.map((d) => (
            <li key={d.id}>
              <button onClick={() => setSel(d)} className={`w-full rounded-xl border p-3 text-left transition ${sel.id === d.id ? "border-primary bg-accent" : "bg-card hover:border-primary"}`}>
                <p className="font-semibold">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.locationHint}</p>
              </button>
            </li>
          ))}
        </ul>
        <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
          <iframe title={`Map of ${sel.name}`} className="h-[440px] w-full" loading="lazy"
            src={`https://www.google.com/maps?q=${encodeURIComponent(sel.mapsQuery)}&output=embed`} />
          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div><p className="text-lg font-semibold">{sel.name}</p><p className="text-sm text-muted-foreground">{sel.locationHint}</p></div>
            <div className="flex gap-2">
              <a href={mapsSearchUrl(sel.mapsQuery)} target="_blank" rel="noreferrer" className="btn btn-outline"><MapPin className="h-4 w-4" /> View on Google Maps</a>
              <a href={mapsDirectionsUrl(sel.mapsQuery)} target="_blank" rel="noreferrer" className="btn btn-primary"><Navigation className="h-4 w-4" /> Directions</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
