import { describe, expect, it } from "vitest";
import { fallbackItinerary, searchDestinations } from "@/data/destinations";

describe("fallback planner", () => {
  it("stays within the time limit", () => {
    const r = fallbackItinerary({ city: "Panipat", budget: 5000, minutes: 120, interests: ["history"], travellers: 2 });
    expect(r.stops.length).toBeGreaterThan(0);
    expect(r.totalMinutes).toBeLessThanOrEqual(120);
  });
  it("stays within the budget", () => {
    const r = fallbackItinerary({ city: "Panipat", budget: 50, minutes: 540, interests: ["history"], travellers: 2 });
    expect(r.totalCostINR).toBeLessThanOrEqual(50);
  });
  it("returns nothing for unknown cities", () => {
    expect(searchDestinations({ city: "Atlantis" })).toHaveLength(0);
  });
});
