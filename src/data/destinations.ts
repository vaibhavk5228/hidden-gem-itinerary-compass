import heroImg from "@/assets/hero.jpg";
import tombImg from "@/assets/tomb.jpg";
import museumImg from "@/assets/museum.jpg";
import mosqueImg from "@/assets/mosque.jpg";
import templeImg from "@/assets/temple.jpg";
import marketImg from "@/assets/market.jpg";
import foodImg from "@/assets/food.jpg";

export type Interest = "history" | "food" | "culture" | "nature" | "adventure" | "spiritual" | "shopping";
export const INTERESTS: Interest[] = ["history", "culture", "food", "spiritual", "shopping", "nature", "adventure"];

/** "verified" = documented by ASI / state archaeology / standard histories. "tradition" = local belief or oral history. */
export type Verification = "verified" | "tradition";

export type Destination = {
  id: string;
  city: string;
  name: string;
  categories: Interest[];
  hiddenGem: boolean;
  image: string;
  short: string;
  description: string;
  significance: string;
  facts: { text: string; verification: Verification }[];
  traditions: string;
  locationHint: string;
  /** Text query used for Google Maps — we never store invented coordinates. */
  mapsQuery: string;
  /** Approximate values — always shown to users as estimates. */
  estVisitMinutes: number;
  estCostINR: number;
  timings: string;
  sources: { label: string; url: string }[];
};

export type Experience = {
  id: string;
  city: string;
  name: string;
  category: "food" | "market" | "shopping" | "handicraft" | "culture";
  image: string;
  description: string;
  tip: string;
  estCostINR: string;
  mapsQuery: string;
  verification: Verification;
};

export const CITIES = [{ id: "panipat", name: "Panipat", state: "Haryana", image: heroImg }];

export const DESTINATIONS: Destination[] = [
  {
    id: "panipat-museum",
    city: "panipat",
    name: "Panipat Museum",
    categories: ["history", "culture"],
    hiddenGem: false,
    image: museumImg,
    short: "A compact museum dedicated to the three historic Battles of Panipat.",
    description:
      "Run by the Haryana Department of Archaeology & Museums, the museum tells the story of the three Battles of Panipat through maps, weapons, armour, coins and illustrated panels, alongside regional art and crafts.",
    significance:
      "It is the best single place to understand why this small town on the old Grand Trunk route shaped Indian history three times — in 1526, 1556 and 1761.",
    facts: [
      { text: "The First Battle of Panipat (1526) between Babur and Ibrahim Lodi established Mughal rule in India.", verification: "verified" },
      { text: "The Second Battle (1556) saw Akbar's forces defeat Hemu.", verification: "verified" },
      { text: "The Third Battle (1761) was fought between the Marathas and Ahmad Shah Abdali.", verification: "verified" },
    ],
    traditions: "School groups and history enthusiasts often begin a Panipat heritage walk here before visiting the battle-era monuments.",
    locationHint: "Near G.T. Road, Panipat",
    mapsQuery: "Panipat Museum, Panipat, Haryana",
    estVisitMinutes: 60,
    estCostINR: 20,
    timings: "Usually 10:00–17:00, closed Mondays & gazetted holidays (verify locally)",
    sources: [
      { label: "Haryana Archaeology & Museums", url: "https://haryanaarchaeology.gov.in/" },
      { label: "Wikipedia – Battles of Panipat", url: "https://en.wikipedia.org/wiki/Battles_of_Panipat" },
    ],
  },
  {
    id: "kabuli-bagh",
    city: "panipat",
    name: "Kabuli Bagh Mosque",
    categories: ["history", "spiritual"],
    hiddenGem: true,
    image: mosqueImg,
    short: "One of the earliest Mughal-built monuments in India, raised by Babur.",
    description:
      "A garden mosque complex built by Babur after his victory at the First Battle of Panipat. It is a centrally protected monument of the Archaeological Survey of India and sits quietly away from the busy town centre.",
    significance:
      "It marks the very beginning of Mughal architecture in India — a rare chance to see where a 330-year dynasty first left its mark in stone.",
    facts: [
      { text: "Built by Babur c. 1527–28 to commemorate his victory over Ibrahim Lodi.", verification: "verified" },
      { text: "Named after Babur's wife, Kabuli Begum.", verification: "verified" },
      { text: "Protected as a Monument of National Importance by the ASI.", verification: "verified" },
    ],
    traditions: "Locals still use the surrounding garden as a calm green space; visitors are expected to dress modestly.",
    locationHint: "Kabuli Bagh, near Panipat city",
    mapsQuery: "Kabuli Bagh Mosque, Panipat, Haryana",
    estVisitMinutes: 45,
    estCostINR: 0,
    timings: "Daylight hours (verify locally)",
    sources: [
      { label: "Wikipedia – Kabuli Bagh", url: "https://en.wikipedia.org/wiki/Kabuli_Bagh" },
      { label: "ASI – Monuments list (Haryana)", url: "https://asi.nic.in/" },
    ],
  },
  {
    id: "ibrahim-lodi-tomb",
    city: "panipat",
    name: "Ibrahim Lodi's Tomb",
    categories: ["history"],
    hiddenGem: true,
    image: tombImg,
    short: "The modest resting place of the last Sultan of Delhi.",
    description:
      "A simple tomb on a raised platform near the tehsil office, commemorating Ibrahim Lodi, who fell in the First Battle of Panipat. The British later renovated it and added an inscription.",
    significance:
      "It is one of the very few tombs in India of a Sultan who died in battle — the end point of the Delhi Sultanate.",
    facts: [
      { text: "Ibrahim Lodi was the last ruler of the Lodi dynasty and the Delhi Sultanate.", verification: "verified" },
      { text: "He was killed in the First Battle of Panipat on 21 April 1526.", verification: "verified" },
      { text: "The structure was renovated by the British in 1866.", verification: "verified" },
    ],
    traditions: "Often visited as part of a 'three battles' trail together with Kabuli Bagh and Kala Amb.",
    locationHint: "Near Tehsil office, Panipat",
    mapsQuery: "Ibrahim Lodhi Tomb, Panipat, Haryana",
    estVisitMinutes: 30,
    estCostINR: 0,
    timings: "Daylight hours (verify locally)",
    sources: [{ label: "Wikipedia – Ibrahim Lodi", url: "https://en.wikipedia.org/wiki/Ibrahim_Lodi" }],
  },
  {
    id: "devi-temple",
    city: "panipat",
    name: "Devi Temple (Devi Mandir)",
    categories: ["spiritual", "culture"],
    hiddenGem: false,
    image: templeImg,
    short: "A beloved temple beside a large pond, busy during Navratri.",
    description:
      "One of Panipat's best-known Hindu temples, set on the bank of a pond. The complex is a centre of the town's religious life, especially during festivals.",
    significance:
      "It offers a living, everyday side of Panipat — evening aarti, festival crowds and local families — balancing the town's battlefield history.",
    facts: [
      { text: "The temple stands on the banks of a large pond in the old part of the city.", verification: "verified" },
      { text: "Local tradition links the temple's history to the Maratha period of the 18th century.", verification: "tradition" },
    ],
    traditions: "Navratri and Dussehra draw large gatherings; evening aarti is the most atmospheric time to visit.",
    locationHint: "Old city, Panipat",
    mapsQuery: "Devi Mandir, Panipat, Haryana",
    estVisitMinutes: 40,
    estCostINR: 0,
    timings: "Early morning to night (verify locally)",
    sources: [{ label: "Haryana Tourism", url: "https://haryanatourism.gov.in/" }],
  },
  {
    id: "salar-gunj-gate",
    city: "panipat",
    name: "Salar Gunj Gate",
    categories: ["history", "culture"],
    hiddenGem: true,
    image: heroImg,
    short: "A historic gateway into Panipat's old walled quarter.",
    description:
      "A surviving historic gateway in the older part of the city, surrounded by busy lanes and markets. It is easily missed — and that's exactly what makes it rewarding.",
    significance:
      "It is a physical reminder of Panipat's past as a fortified town on a major north Indian trade and military route.",
    facts: [
      { text: "The gate stands in the old city and is listed among Panipat's heritage structures.", verification: "verified" },
      { text: "Its exact construction date and patron are not firmly documented; local accounts differ.", verification: "tradition" },
    ],
    traditions: "Combine with a walk through the surrounding bazaar lanes.",
    locationHint: "Old city, Panipat",
    mapsQuery: "Salar Gunj Gate, Panipat, Haryana",
    estVisitMinutes: 20,
    estCostINR: 0,
    timings: "Open public street",
    sources: [{ label: "Wikipedia – Panipat", url: "https://en.wikipedia.org/wiki/Panipat" }],
  },
  {
    id: "kala-amb",
    city: "panipat",
    name: "Kala Amb Memorial",
    categories: ["history", "nature"],
    hiddenGem: true,
    image: tombImg,
    short: "The memorial site of the Third Battle of Panipat (1761).",
    description:
      "A landscaped memorial park at the spot traditionally identified as the centre of the Third Battle of Panipat, named after a 'black mango' tree that once stood here.",
    significance:
      "It is a place of remembrance — especially for visitors from Maharashtra — for one of the largest battles of the 18th century.",
    facts: [
      { text: "The Third Battle of Panipat was fought on 14 January 1761.", verification: "verified" },
      { text: "The name 'Kala Amb' refers to a mango tree said to have darkened from the bloodshed.", verification: "tradition" },
    ],
    traditions: "Commemorative events are held around 14 January each year.",
    locationHint: "Sanauli Road, outside Panipat city",
    mapsQuery: "Kala Amb Memorial, Panipat, Haryana",
    estVisitMinutes: 45,
    estCostINR: 0,
    timings: "Daylight hours (verify locally)",
    sources: [{ label: "Wikipedia – Third Battle of Panipat", url: "https://en.wikipedia.org/wiki/Third_Battle_of_Panipat" }],
  },
  {
    id: "bu-ali-shah",
    city: "panipat",
    name: "Dargah of Bu Ali Shah Qalandar",
    categories: ["spiritual", "culture", "history"],
    hiddenGem: true,
    image: mosqueImg,
    short: "A centuries-old Sufi shrine, alive with devotees and qawwali.",
    description:
      "The shrine of the Sufi saint Shah Sharafuddin Bu Ali Qalandar is one of Panipat's oldest and most visited religious places, welcoming people of all faiths.",
    significance:
      "It reflects Panipat's long Sufi heritage and the shared devotional culture of north India.",
    facts: [
      { text: "Bu Ali Shah Qalandar was a Sufi saint of the 13th–14th century.", verification: "verified" },
      { text: "The annual Urs draws devotees from across the region.", verification: "verified" },
    ],
    traditions: "Thursday evenings are traditionally busiest; cover your head and remove shoes before entering.",
    locationHint: "Qalandar Chowk, Panipat",
    mapsQuery: "Dargah Bu Ali Shah Qalandar, Panipat, Haryana",
    estVisitMinutes: 40,
    estCostINR: 0,
    timings: "Open daily (verify locally)",
    sources: [{ label: "Wikipedia – Bu Ali Shah Qalandar", url: "https://en.wikipedia.org/wiki/Bu_Ali_Shah_Qalandar" }],
  },
  {
    id: "hemu-samadhi",
    city: "panipat",
    name: "Hemu's Samadhi Sthal",
    categories: ["history", "adventure"],
    hiddenGem: true,
    image: heroImg,
    short: "A little-visited memorial to Hemu, the last Hindu emperor of Delhi.",
    description:
      "A memorial at Shodapur village marking the place associated with Hemu after the Second Battle of Panipat. It sits off the usual tourist trail and suits curious history travellers.",
    significance:
      "Hemu briefly ruled Delhi as 'Vikramaditya' before the Second Battle — a remarkable and often overlooked chapter of Indian history.",
    facts: [
      { text: "Hemu was defeated by Akbar's forces in the Second Battle of Panipat on 5 November 1556.", verification: "verified" },
      { text: "The memorial's exact location is based on local tradition.", verification: "tradition" },
    ],
    traditions: "Local commemorations are occasionally held on the battle anniversary.",
    locationHint: "Shodapur village, near Panipat",
    mapsQuery: "Hemu Samadhi, Shodapur, Panipat, Haryana",
    estVisitMinutes: 30,
    estCostINR: 0,
    timings: "Daylight hours (verify locally)",
    sources: [{ label: "Wikipedia – Hemu", url: "https://en.wikipedia.org/wiki/Hemu" }],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "handloom-shopping",
    city: "panipat",
    name: "Handloom & Home Textile Shopping",
    category: "shopping",
    image: marketImg,
    description:
      "Panipat is widely known as India's 'City of Weavers' and a major hub for home furnishings — durries, rugs, blankets and bedsheets are sold at wholesale-style prices.",
    tip: "Ask for factory-outlet showrooms and compare prices across a few shops.",
    estCostINR: "₹300 – ₹3,000 per item (estimate)",
    mapsQuery: "handloom shops Panipat",
    verification: "verified",
  },
  {
    id: "durrie-weaving",
    city: "panipat",
    name: "Watch Durrie Weaving",
    category: "handicraft",
    image: marketImg,
    description:
      "Small workshops still weave flat-woven cotton durries. Some shops can point you to local weavers who welcome respectful visitors.",
    tip: "Call ahead through a shopkeeper; tipping the artisan is appreciated.",
    estCostINR: "Free to watch; durries from ₹500 (estimate)",
    mapsQuery: "durrie manufacturers Panipat",
    verification: "tradition",
  },
  {
    id: "insar-bazaar",
    city: "panipat",
    name: "Insar Bazaar & Old City Lanes",
    category: "market",
    image: marketImg,
    description:
      "A busy traditional market area for clothes, utensils, spices and everyday goods — an authentic slice of local life near the old city.",
    tip: "Best explored on foot in the late afternoon; keep small change handy.",
    estCostINR: "Free to explore",
    mapsQuery: "Insar Bazar Panipat",
    verification: "verified",
  },
  {
    id: "haryanvi-meal",
    city: "panipat",
    name: "Traditional Haryanvi Meal",
    category: "food",
    image: foodImg,
    description:
      "Try regional staples such as bajra roti with white butter, kadhi, saag in winter, and a tall glass of lassi at local dhabas.",
    tip: "Highway dhabas on G.T. Road are popular with families and travellers.",
    estCostINR: "₹150 – ₹400 per person (estimate)",
    mapsQuery: "dhaba GT Road Panipat",
    verification: "verified",
  },
  {
    id: "pickles-sweets",
    city: "panipat",
    name: "Pickles & Mithai Shops",
    category: "food",
    image: foodImg,
    description:
      "Mixed-vegetable achar and seasonal sweets like gajar halwa (winter) make easy, travel-friendly souvenirs.",
    tip: "Buy sealed jars for travel.",
    estCostINR: "₹100 – ₹500 (estimate)",
    mapsQuery: "sweet shop Panipat",
    verification: "tradition",
  },
  {
    id: "qawwali-evening",
    city: "panipat",
    name: "Thursday Qawwali at the Dargah",
    category: "culture",
    image: mosqueImg,
    description: "Devotional music at the Bu Ali Shah Qalandar shrine, open to visitors of every faith.",
    tip: "Dress modestly and carry a scarf to cover your head.",
    estCostINR: "Free (offerings optional)",
    mapsQuery: "Dargah Bu Ali Shah Qalandar, Panipat",
    verification: "tradition",
  },
  {
    id: "evening-aarti",
    city: "panipat",
    name: "Evening Aarti at Devi Mandir",
    category: "culture",
    image: templeImg,
    description: "Lamps, bells and chants by the temple pond — the town's calmest and most photogenic hour.",
    tip: "Arrive around sunset; festival evenings are crowded.",
    estCostINR: "Free",
    mapsQuery: "Devi Mandir, Panipat",
    verification: "tradition",
  },
];

export const mapsSearchUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsDirectionsUrl = (q: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

export const getDestination = (id: string) => DESTINATIONS.find((d) => d.id === id);

export function searchDestinations(opts: { city?: string; query?: string; interests?: string[]; hiddenOnly?: boolean }) {
  const city = (opts.city ?? "").trim().toLowerCase();
  const q = (opts.query ?? "").trim().toLowerCase();
  return DESTINATIONS.filter((d) => {
    if (city && !d.city.includes(city) && !city.includes(d.city)) return false;
    if (opts.interests?.length && !opts.interests.some((i) => d.categories.includes(i as Interest))) return false;
    if (opts.hiddenOnly && !d.hiddenGem) return false;
    if (q && !`${d.name} ${d.short} ${d.categories.join(" ")}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

export const TIME_OPTIONS = [
  { value: 120, label: "2 hours" },
  { value: 240, label: "4 hours" },
  { value: 360, label: "6 hours" },
  { value: 540, label: "Full day" },
] as const;

/** Travel between stops inside Panipat — approximate. */
export const TRAVEL_MIN_BETWEEN = 20;
export const TRAVEL_COST_PER_LEG = 80; // auto-rickshaw estimate, per group

export type ItineraryStop = {
  destinationId: string;
  name: string;
  order: number;
  minutes: number;
  costINR: number;
  reason: string;
};

/** Deterministic, dataset-based planner used when AI is unavailable. */
export function fallbackItinerary(input: { city: string; budget: number; minutes: number; interests: string[]; travellers: number }) {
  const pool = searchDestinations({ city: input.city });
  const scored = pool
    .map((d) => ({ d, score: d.categories.filter((c) => input.interests.includes(c)).length * 2 + (d.hiddenGem ? 1 : 0) }))
    .sort((a, b) => b.score - a.score);
  const stops: ItineraryStop[] = [];
  let used = 0;
  let spent = 0;
  for (const { d, score } of scored) {
    const t = d.estVisitMinutes + (stops.length ? TRAVEL_MIN_BETWEEN : 0);
    const c = d.estCostINR * input.travellers + (stops.length ? TRAVEL_COST_PER_LEG : 0);
    if (used + t > input.minutes || spent + c > input.budget) continue;
    used += t;
    spent += c;
    const matched = d.categories.filter((c2) => input.interests.includes(c2));
    stops.push({
      destinationId: d.id,
      name: d.name,
      order: stops.length + 1,
      minutes: d.estVisitMinutes,
      costINR: d.estCostINR * input.travellers,
      reason: matched.length && score > 0
        ? `Matches your interest in ${matched.join(", ")}. ${d.short}`
        : d.short,
    });
  }
  return { stops, totalMinutes: used, totalCostINR: spent };
}
