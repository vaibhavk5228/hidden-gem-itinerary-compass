import { createFileRoute, Link } from "@tanstack/react-router";
import { DESTINATIONS } from "@/data/destinations";
import { useFavorites } from "@/hooks/use-favorites";
import { DestinationCard, EmptyState, PageHeader } from "@/components/destination-card";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Destinations — LocalLens AI" },
      { name: "description", content: "Your favourite places, saved on this device." },
      { property: "og:title", content: "Saved Destinations — LocalLens AI" },
      { property: "og:description", content: "Your personal shortlist of hidden gems." },
    ],
  }),
  component: Saved,
});

function Saved() {
  const { ids } = useFavorites();
  const list = DESTINATIONS.filter((d) => ids.includes(d.id));
  return (
    <>
      <PageHeader eyebrow="Your shortlist" title="Saved destinations" text="Tap the heart on any place to keep it here. Saved on this device only." />
      <div className="mx-auto max-w-7xl px-4 py-10">
        {list.length === 0 ? (
          <EmptyState title="No saved places yet" text="Browse hidden gems and tap the heart to save them.">
            <Link to="/discover" search={{ city: "Panipat" }} className="btn btn-navy">Discover places</Link>
          </EmptyState>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((d) => <DestinationCard key={d.id} d={d} />)}</div>
        )}
      </div>
    </>
  );
}
