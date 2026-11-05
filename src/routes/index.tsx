import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Landmark, Route as RouteIcon, Search, Sparkles, Utensils } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { DESTINATIONS, EXPERIENCES } from "@/data/destinations";
import { DestinationCard } from "@/components/destination-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LocalLens AI — Discover Beyond the Famous" },
      { name: "description", content: "AI-powered local tourism: hidden gems, heritage stories, local food and personalised itineraries." },
      { property: "og:title", content: "LocalLens AI — Discover Beyond the Famous" },
      { property: "og:description", content: "Find hidden attractions and plan a personalised journey with AI." },
    ],
  }),
  component: Index,
});

function Index() {
  const [city, setCity] = useState("Panipat");
  const navigate = useNavigate();
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/discover", search: { city: city.trim() } });
  };
  const gems = DESTINATIONS.filter((d) => d.hiddenGem).slice(0, 3);
  const featured = DESTINATIONS.filter((d) => !d.hiddenGem);
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={heroImg} alt="Historic gateway and domed tomb at sunset" width={1600} height={912} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 text-navy-foreground md:pb-32 md:pt-40">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/30 bg-navy/40 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-teal" /> AI-powered local tourism
          </span>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">
            Discover Beyond the Famous. <span className="text-teal">Explore the Hidden.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg opacity-85">Hidden monuments, living traditions and local flavours — planned around your time, budget and interests.</p>
          <form onSubmit={go} className="mt-8 flex max-w-xl flex-col gap-2 rounded-2xl bg-card p-2 shadow-lift sm:flex-row">
            <label className="flex flex-1 items-center gap-2 px-3 text-foreground">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city, e.g. Panipat" aria-label="City" className="w-full bg-transparent py-3 outline-none" />
            </label>
            <button className="btn btn-primary">Explore Destinations <ArrowRight className="h-4 w-4" /></button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Hidden gems · Panipat</p>
            <h2 className="mt-2 text-4xl font-semibold">Places most travellers miss</h2>
          </div>
          <Link to="/discover" search={{ city: "Panipat" }} className="btn btn-outline">See all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{gems.map((d) => <DestinationCard key={d.id} d={d} />)}</div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-semibold">How LocalLens works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Search, t: "1. Pick your city & interests", d: "History, food, culture, nature or adventure — tell us what moves you.", to: "/discover" as const },
              { icon: RouteIcon, t: "2. Generate your journey", d: "Gemini AI orders verified places into a route that fits your time and rupee budget.", to: "/planner" as const },
              { icon: Landmark, t: "3. Explore with context", d: "Heritage stories, local experiences and one-tap Google Maps directions.", to: "/heritage" as const },
            ].map((s) => (
              <Link key={s.t} to={s.to} className="rounded-2xl bg-card p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                <s.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-4xl font-semibold">Featured destinations</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((d) => <DestinationCard key={d.id} d={d} />)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-navy-gradient text-navy-foreground md:grid-cols-2">
          <div className="p-10">
            <Utensils className="h-8 w-8 text-teal" />
            <h2 className="mt-4 text-4xl font-semibold">Taste & shop like a local</h2>
            <p className="mt-3 opacity-80">{EXPERIENCES.length} local experiences — handloom bazaars, Haryanvi meals and evening aarti.</p>
            <Link to="/experiences" className="btn btn-primary mt-6">Browse experiences <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <img src={EXPERIENCES[3].image} alt="Haryanvi food" loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
        </div>
      </section>
    </>
  );
}
