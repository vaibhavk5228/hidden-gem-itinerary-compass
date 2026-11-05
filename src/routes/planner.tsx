import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, Clock, IndianRupee, Loader2, Navigation, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { INTERESTS, TIME_OPTIONS, getDestination, mapsDirectionsUrl } from "@/data/destinations";
import { generateItinerary, type PlanResult } from "@/lib/travel.functions";
import { EmptyState, PageHeader, SourceBadge } from "@/components/destination-card";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Smart AI Trip Planner — LocalLens AI" },
      { name: "description", content: "Generate a personalised itinerary for your time, budget and interests." },
      { property: "og:title", content: "Smart AI Trip Planner — LocalLens AI" },
      { property: "og:description", content: "AI-planned local journeys with costs in INR." },
    ],
  }),
  component: Planner,
});

const fmt = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60 ? `${m % 60}m` : ""}` : `${m}m`);

function Planner() {
  const gen = useServerFn(generateItinerary);
  const [form, setForm] = useState({ city: "Panipat", budget: "1000", minutes: 240, travellers: "2", interests: ["history"] as string[] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const m = useMutation({ mutationFn: (data: Parameters<typeof gen>[0]["data"]) => gen({ data }) });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    const budget = Number(form.budget), travellers = Number(form.travellers);
    if (!form.city.trim()) er["city"] = "Enter a destination city.";
    if (!form.budget || !Number.isFinite(budget) || budget < 0) er["budget"] = "Enter a valid budget in ₹.";
    if (!Number.isInteger(travellers) || travellers < 1 || travellers > 50) er["travellers"] = "1 – 50 travellers.";
    if (!form.interests.length) er["interests"] = "Pick at least one interest.";
    setErrors(er);
    if (Object.keys(er).length) return;
    m.mutate({ city: form.city.trim(), budget, minutes: form.minutes, travellers, interests: form.interests });
  };
  const toggle = (i: string) => setForm((f) => ({ ...f, interests: f.interests.includes(i) ? f.interests.filter((x) => x !== i) : [...f.interests, i] }));

  return (
    <>
      <PageHeader eyebrow="Smart AI Trip Planner" title="Generate your journey" text="Tell us your time, budget and interests. Gemini AI builds a route from verified local places." />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[380px_1fr]">
        <form onSubmit={submit} noValidate className="h-fit space-y-5 rounded-2xl border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <Field label="Destination city" error={errors["city"]}><input className="field" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Budget (₹)" error={errors["budget"]}><input className="field" type="number" min={0} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} /></Field>
            <Field label="Travellers" error={errors["travellers"]}><input className="field" type="number" min={1} max={50} value={form.travellers} onChange={(e) => setForm({ ...form, travellers: e.target.value })} /></Field>
          </div>
          <Field label="Available time">
            <div className="grid grid-cols-2 gap-2">
              {TIME_OPTIONS.map((t) => <button type="button" key={t.value} className="chip justify-center" data-active={form.minutes === t.value} onClick={() => setForm({ ...form, minutes: t.value })}>{t.label}</button>)}
            </div>
          </Field>
          <Field label="Interests" error={errors["interests"]}>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => <button type="button" key={i} className="chip capitalize" data-active={form.interests.includes(i)} onClick={() => toggle(i)}>{i}</button>)}
            </div>
          </Field>
          <button className="btn btn-primary w-full" disabled={m.isPending}>
            {m.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Planning…</> : <><Sparkles className="h-4 w-4" /> Generate My Journey</>}
          </button>
        </form>

        <div>
          {m.isPending && <div className="space-y-4">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-36" />)}<p className="text-center text-sm text-muted-foreground">Gemini is crafting your route…</p></div>}
          {m.isError && <EmptyState title="Couldn't generate a plan" text={m.error.message}><button className="btn btn-navy" onClick={() => m.reset()}>Try again</button></EmptyState>}
          {m.isIdle && <EmptyState title="Your itinerary will appear here" text="Fill in your preferences and press Generate My Journey." />}
          {m.data && <Result r={m.data} />}
        </div>
      </div>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold">{label}</p>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function Result({ r }: { r: PlanResult }) {
  if (!r.stops.length) return <EmptyState title="No stops fit your plan" text={r.notice ?? "Try increasing your time or budget, or choosing more interests."} />;
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-navy-gradient p-6 text-navy-foreground">
        <SourceBadge source={r.source} />
        {r.notice && <p className="mt-3 flex items-start gap-2 text-sm opacity-90"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{r.notice}</p>}
        <p className="mt-3 text-lg">{r.summary}</p>
        <div className="mt-4 flex flex-wrap gap-5 text-sm">
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-teal" /> {fmt(r.totalMinutes)} total</span>
          <span className="inline-flex items-center gap-1"><IndianRupee className="h-4 w-4 text-teal" /> ~₹{r.totalCostINR.toLocaleString("en-IN")} est. (incl. local travel)</span>
          <span className="inline-flex items-center gap-1"><Users className="h-4 w-4 text-teal" /> {r.stops.length} stops</span>
        </div>
      </div>
      <ol className="relative space-y-4 border-l-2 border-dashed border-primary/40 pl-6">
        {r.stops.map((s) => {
          const d = getDestination(s.destinationId)!;
          return (
            <li key={s.destinationId} className="relative">
              <span className="absolute -left-[37px] top-5 grid h-7 w-7 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-navy">{s.order}</span>
              <div className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card sm:flex-row">
                <img src={d.image} alt={d.name} loading="lazy" width={1024} height={768} className="h-40 w-full object-cover sm:h-auto sm:w-44" />
                <div className="flex-1 p-5">
                  <h3 className="text-xl font-semibold">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.reason}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> ~{s.minutes} min</span>
                    <span className="inline-flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" /> {s.costINR ? `~₹${s.costINR}` : "Free"}</span>
                    <Link to="/destination/$id" params={{ id: d.id }} className="font-semibold text-primary hover:underline">Details</Link>
                    <a href={mapsDirectionsUrl(d.mapsQuery)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"><Navigation className="h-3.5 w-3.5" /> Directions</a>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      {r.tips.length > 0 && (
        <div className="rounded-2xl border bg-card p-5"><p className="font-semibold">Travel tips</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{r.tips.map((t) => <li key={t}>{t}</li>)}</ul></div>
      )}
      <p className="text-xs text-muted-foreground">Times and costs are approximate estimates. Confirm opening hours locally.</p>
    </div>
  );
}
