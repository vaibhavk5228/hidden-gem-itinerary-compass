import { createServerFn } from "@tanstack/react-start";
import {
  DESTINATIONS,
  EXPERIENCES,
  TIME_OPTIONS,
  TRAVEL_COST_PER_LEG,
  TRAVEL_MIN_BETWEEN,
  fallbackItinerary,
  getDestination,
  searchDestinations,
  type ItineraryStop,
} from "@/data/destinations";

const MODEL = "google/gemini-3-flash-preview" as const;

async function askGeminiJSON(system: string, user: string): Promise<unknown | null> {
  if (!process.env["LOVABLE_API_KEY"]) return null;
  try {
    const { generateChatCompletion } = await import("@lovable.dev/ai-gateway");
    const res = await generateChatCompletion({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    });
    const content = (res as { choices?: { message?: { content?: unknown } }[] }).choices?.[0]?.message?.content;
    if (typeof content !== "string") return null;
    const cleaned = content.replace(/^```(?:json)?\s*|\s*```$/g, "");
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("[ai] request failed", err);
    return null;
  }
}

export const listDestinations = createServerFn({ method: "GET" })
  .inputValidator((d: { city?: string | undefined; query?: string | undefined; interests?: string[]; hiddenOnly?: boolean | undefined }) => ({
    city: String(d?.city ?? "").slice(0, 80),
    query: String(d?.query ?? "").slice(0, 80),
    interests: Array.isArray(d?.interests) ? d.interests.map(String).slice(0, 10) : [],
    hiddenOnly: Boolean(d?.hiddenOnly),
  }))
  .handler(async ({ data }) => ({ destinations: searchDestinations(data) }));

export const listExperiences = createServerFn({ method: "GET" })
  .inputValidator((d: { city?: string; category?: string }) => ({
    city: String(d?.city ?? "panipat").toLowerCase(),
    category: String(d?.category ?? "all"),
  }))
  .handler(async ({ data }) => ({
    experiences: EXPERIENCES.filter(
      (e) => (!data.city || e.city === data.city) && (data.category === "all" || e.category === data.category),
    ),
  }));

export type PlanInput = { city: string; budget: number; minutes: number; interests: string[]; travellers: number };
export type PlanResult = {
  source: "ai" | "fallback";
  notice?: string;
  summary: string;
  stops: ItineraryStop[];
  totalMinutes: number;
  totalCostINR: number;
  tips: string[];
};

export const generateItinerary = createServerFn({ method: "POST" })
  .inputValidator((d: PlanInput): PlanInput => {
    const city = String(d?.city ?? "").trim();
    const budget = Number(d?.budget);
    const minutes = Number(d?.minutes);
    const travellers = Number(d?.travellers);
    if (!city) throw new Error("Please enter a destination city.");
    if (!Number.isFinite(budget) || budget < 0 || budget > 1_000_000) throw new Error("Budget must be between ₹0 and ₹10,00,000.");
    if (!TIME_OPTIONS.some((t) => t.value === minutes)) throw new Error("Please choose a valid time option.");
    if (!Number.isInteger(travellers) || travellers < 1 || travellers > 50) throw new Error("Travellers must be between 1 and 50.");
    const interests = Array.isArray(d.interests) ? d.interests.map(String).slice(0, 10) : [];
    if (!interests.length) throw new Error("Pick at least one interest.");
    return { city, budget, minutes, travellers, interests };
  })
  .handler(async ({ data }): Promise<PlanResult> => {
    const pool = searchDestinations({ city: data.city });
    if (!pool.length) {
      return { source: "fallback", summary: "", stops: [], totalMinutes: 0, totalCostINR: 0, tips: [],
        notice: `We don't have verified places for "${data.city}" yet. Try Panipat.` };
    }

    const catalog = pool.map((d) => ({
      id: d.id, name: d.name, categories: d.categories, location: d.locationHint,
      visitMinutes: d.estVisitMinutes, entryCostPerPersonINR: d.estCostINR, about: d.short,
    }));
    const ai = (await askGeminiJSON(
      `You are LocalLens AI, a careful local travel planner for India. Only use places from the provided catalog (by id). Never invent places, facts or coordinates. Respect the time and budget. Account for ~${TRAVEL_MIN_BETWEEN} min and ~₹${TRAVEL_COST_PER_LEG} (per group) travel between stops. Reply with JSON: {"summary": string, "stops": [{"id": string, "minutes": number, "costINR": number, "reason": string}], "tips": string[]}. Order stops in a logical visiting sequence. costINR is total for the whole group.`,
      JSON.stringify({ preferences: data, catalog }),
    )) as { summary?: string; stops?: { id: string; minutes: number; costINR: number; reason: string }[]; tips?: string[] } | null;

    const valid = ai?.stops?.filter((s) => getDestination(s.id) && pool.some((p) => p.id === s.id)) ?? [];
    if (ai && valid.length) {
      const stops: ItineraryStop[] = valid.map((s, i) => ({
        destinationId: s.id,
        name: getDestination(s.id)!.name,
        order: i + 1,
        minutes: Math.max(10, Math.round(Number(s.minutes) || getDestination(s.id)!.estVisitMinutes)),
        costINR: Math.max(0, Math.round(Number(s.costINR) || 0)),
        reason: String(s.reason ?? "").slice(0, 400),
      }));
      const legs = Math.max(0, stops.length - 1);
      return {
        source: "ai",
        summary: String(ai.summary ?? "").slice(0, 600),
        stops,
        totalMinutes: stops.reduce((a, s) => a + s.minutes, 0) + legs * TRAVEL_MIN_BETWEEN,
        totalCostINR: stops.reduce((a, s) => a + s.costINR, 0) + legs * TRAVEL_COST_PER_LEG,
        tips: (ai.tips ?? []).map(String).slice(0, 5),
      };
    }

    const fb = fallbackItinerary(data);
    return {
      source: "fallback",
      notice: "AI is unavailable right now, so this plan was built by our rule-based planner from the verified local dataset.",
      summary: fb.stops.length
        ? `${fb.stops.length} stops in ${data.city} matched to your interests, time and budget.`
        : "",
      ...fb,
      tips: ["Carry water and cash for auto-rickshaws.", "Check opening hours locally — timings can change."],
    };
  });

export type HeritageResult = {
  source: "ai" | "fallback";
  notice?: string;
  background: string;
  significance: string;
  facts: { text: string; verification: "verified" | "tradition" }[];
  traditions: string;
  whyVisit: string;
};

export const heritageGuide = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => {
    const id = String(d?.id ?? "");
    if (!getDestination(id)) throw new Error("Unknown destination.");
    return { id };
  })
  .handler(async ({ data }): Promise<HeritageResult> => {
    const d = getDestination(data.id)!;
    const ai = (await askGeminiJSON(
      `You are a careful heritage guide. Write engaging but strictly factual content. Base it on the provided verified notes and only widely documented history. If unsure, say it is uncertain. Do not invent dates, names or legends. Reply JSON: {"background": string, "significance": string, "traditions": string, "whyVisit": string}. Keep each field 2-4 sentences.`,
      JSON.stringify({ name: d.name, city: "Panipat, Haryana, India", notes: { description: d.description, significance: d.significance, facts: d.facts, traditions: d.traditions } }),
    )) as Partial<Record<"background" | "significance" | "traditions" | "whyVisit", string>> | null;

    if (ai?.background) {
      return {
        source: "ai",
        background: String(ai.background),
        significance: String(ai.significance ?? d.significance),
        traditions: String(ai.traditions ?? d.traditions),
        whyVisit: String(ai.whyVisit ?? d.short),
        facts: d.facts,
      };
    }
    return {
      source: "fallback",
      notice: "AI is unavailable right now — showing information from our verified local dataset.",
      background: d.description,
      significance: d.significance,
      traditions: d.traditions,
      whyVisit: d.short,
      facts: d.facts,
    };
  });

export const destinationCount = DESTINATIONS.length;
