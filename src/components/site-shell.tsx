import { Link } from "@tanstack/react-router";
import { Compass, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "@/hooks/use-favorites";

const NAV = [
  { to: "/discover", label: "Hidden Gems" },
  { to: "/planner", label: "Trip Planner" },
  { to: "/heritage", label: "Heritage Guide" },
  { to: "/experiences", label: "Experiences" },
  { to: "/map", label: "Map" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-navy">
        <Compass className="h-5 w-5" />
      </span>
      LocalLens<span className="text-primary">AI</span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { ids } = useFavorites();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "rounded-full px-3 py-2 text-sm font-semibold bg-accent text-accent-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/saved" className="btn btn-outline !px-3 !py-2" aria-label="Saved destinations">
            <Heart className="h-4 w-4" /> <span className="text-xs">{ids.length}</span>
          </Link>
          <button className="btn btn-outline !px-3 !py-2 lg:hidden" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-background px-4 py-3 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium hover:bg-muted">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-navy-gradient text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl">LocalLens AI</div>
          <p className="mt-2 text-sm opacity-75">Discover Beyond the Famous. Explore the Hidden.</p>
        </div>
        <div className="text-sm opacity-80">
          <p className="font-semibold opacity-100">Explore</p>
          <div className="mt-2 grid gap-1">
            {NAV.map((n) => <Link key={n.to} to={n.to} className="hover:underline">{n.label}</Link>)}
          </div>
        </div>
        <p className="text-sm opacity-75">
          Historical facts are labelled <b>Verified</b> or <b>Local tradition</b>. Costs and timings are estimates — please confirm locally.
          AI content is generated with Google Gemini and clearly marked.
        </p>
      </div>
    </footer>
  );
}
