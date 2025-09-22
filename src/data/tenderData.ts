// TenderBoard Data Structure and Seed Data

export interface SubMetrics {
  taste: number;
  crunch: number;
  juiciness: number;
  breading: number;
  sauce: number;
  value: number;
}

export interface TenderTags {
  heat: 0 | 1 | 2; // mild, medium, spicy
  crunch: 0 | 1 | 2; // soft, medium, crunch
  price: 0 | 1 | 2; // budget, medium, premium
  comfort: 0 | 1 | 2; // comfort, balanced, chaotic
  share: 0 | 1 | 2; // solo, share, host
  sauce: 0 | 1 | 2; // dry, classic, signature
}

export interface Tender {
  id: string;
  name: string;
  sub: SubMetrics;
  overall: number;
  tries: number;
  notes: string;
  tags: TenderTags;
}

export interface SessionVote {
  tenderId: string;
  stars: 1 | 2 | 3 | 4 | 5;
  emoji: string;
  blurb: string;
  ts: number;
}

export interface Poll {
  aTenderId: string;
  bTenderId: string;
  votesA: number;
  votesB: number;
  ts: number;
}

export type QuizVector = [number, number, number, number, number, number]; // 0..2 for each axis

export const ICON_SET = ["Canes", "Chick fil a", "Popeyes", "Kfc", "Albaik"];

export const PERSONALITY_BLURBS: Record<string, string> = {
  "albaik": "Local legend energy. Garlic diplomacy with heat.",
  "canes": "Ritual minimalist. One sauce, many dreams.",
  "chick-fil-a": "Polished planner. Sauce taxonomy expert.",
  "popeyes": "Crisp maximalist. Flavor spikes > small talk.",
  "kfc": "Bucket traditionalist. Crunch historian.",
  "mcdonalds": "Comfort optimizer. Predictability is a skill.",
  "burger-king": "Budget rebel. Char drama enjoyer.",
  "nandos": "Peri-peri tourist with loyalty perks.",
  "section-b": "Premium crunch sommelier.",
  "fattboy": "High-voltage chaos. Extra by default.",
  "texas-chicken": "Straight shooter. Crunch without ceremony.",
  "salt": "Minimalist aesthetic. Vibes per square inch.",
  "chicken-republic": "Bold spice, zero shyness.",
  "tndr": "Sauce-forward tinkerer.",
  "tndr-cart": "Street-smart crunch with personality.",
  "crispy-bucket": "Party pack pragmatist.",
  "hardees": "Old-school crunch, unbothered.",
  "wendys": "Coupon core. Square and proud.",
  "rustic-grill": "Premium vibes, patio philosophy.",
  "homemade": "Cozy chaos at 3am. Your rules."
};

export const BADGE_DEFINITIONS = {
  "🔥": { name: "Spice Lord", description: "Masters the art of heat" },
  "💸": { name: "Budget Banger", description: "Amazing value, unbeatable price" },
  "🧈": { name: "Comfort Classic", description: "Your go-to comfort choice" },
  "⭐": { name: "Icon", description: "Legendary status achieved" },
  "🧪": { name: "Wildcard", description: "Defies neat categories" },
  "🏆": { name: "Try-Hard", description: "Dedication through repetition" }
};

export const SEED_TENDERS: Tender[] = [
  { id: "wister", name: "Wister", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 1, price: 1, comfort: 1, share: 1, sauce: 1 } },
  { id: "canes", name: "Canes", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 0, crunch: 0, price: 1, comfort: 0, share: 1, sauce: 2 } },
  { id: "kfc", name: "Kfc", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 1, comfort: 0, share: 1, sauce: 1 } },
  { id: "popeyes", name: "Popeyes", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 2, crunch: 2, price: 1, comfort: 1, share: 1, sauce: 1 } },
  { id: "chkn", name: "Chkn", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 1, price: 1, comfort: 1, share: 1, sauce: 2 } },
  { id: "crispers", name: "Crispers", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 0, crunch: 1, price: 1, comfort: 0, share: 1, sauce: 1 } },
  { id: "chicken-republic", name: "Chicken republic", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 2, crunch: 2, price: 0, comfort: 1, share: 1, sauce: 1 } },
  { id: "hardees", name: "Hardees", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 1, comfort: 1, share: 0, sauce: 1 } },
  { id: "jan-burger", name: "Jan burger", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 1, price: 1, comfort: 1, share: 1, sauce: 1 } },
  { id: "fryd-chicken", name: "Fryd chicken", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 2, crunch: 2, price: 1, comfort: 2, share: 1, sauce: 1 } },
  { id: "chick-out", name: "Chick out", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 1, comfort: 1, share: 1, sauce: 1 } },
  { id: "japang", name: "Japang", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 1, price: 2, comfort: 1, share: 1, sauce: 2 } },
  { id: "salt", name: "SALT", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 0, crunch: 1, price: 2, comfort: 0, share: 1, sauce: 1 } },
  { id: "wendys", name: "Wendys", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 0, crunch: 1, price: 0, comfort: 0, share: 0, sauce: 1 } },
  { id: "rustic-grill", name: "Rustic grill", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 1, price: 2, comfort: 0, share: 1, sauce: 1 } },
  { id: "mcdonalds", name: "McDonald's", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 0, crunch: 0, price: 0, comfort: 0, share: 0, sauce: 1 } },
  { id: "albaik", name: "Albaik", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 2, crunch: 2, price: 0, comfort: 0, share: 2, sauce: 2 } },
  { id: "al-tazij", name: "Al tazij", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 0, crunch: 0, price: 1, comfort: 0, share: 1, sauce: 0 } },
  { id: "mumbo", name: "Mumbo", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 1, price: 1, comfort: 1, share: 1, sauce: 2 } },
  { id: "nandos", name: "Nandos", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 2, crunch: 0, price: 2, comfort: 1, share: 1, sauce: 2 } },
  { id: "tndr", name: "Tndr", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 1, comfort: 1, share: 1, sauce: 2 } },
  { id: "smpl-burger", name: "Smpl burger", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 1, price: 1, comfort: 1, share: 1, sauce: 1 } },
  { id: "tndr-cart", name: "Tndr cart", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 0, comfort: 1, share: 1, sauce: 2 } },
  { id: "crispy-bucket", name: "Crispy bucket", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 0, comfort: 1, share: 1, sauce: 1 } },
  { id: "burger-king", name: "Burger King", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 0, comfort: 1, share: 0, sauce: 1 } },
  { id: "homemade", name: "Homemade", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 0, crunch: 1, price: 0, comfort: 0, share: 2, sauce: 0 } },
  { id: "section-b", name: "Section-B", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 2, comfort: 1, share: 1, sauce: 1 } },
  { id: "thndr", name: "Thndr", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 1, comfort: 2, share: 1, sauce: 2 } },
  { id: "crusted", name: "Crusted", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 1, comfort: 1, share: 1, sauce: 2 } },
  { id: "texas-chicken", name: "Texas chicken", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 1, crunch: 2, price: 0, comfort: 1, share: 1, sauce: 1 } },
  { id: "hoti", name: "Hoti", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 2, crunch: 2, price: 1, comfort: 2, share: 1, sauce: 1 } },
  { id: "fattboy", name: "Fattboy", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 2, crunch: 2, price: 2, comfort: 2, share: 2, sauce: 2 } },
  { id: "chick-fil-a", name: "Chick fil a", sub: { taste: 0, crunch: 0, juiciness: 0, breading: 0, sauce: 0, value: 0 }, overall: 0, tries: 0, notes: "", tags: { heat: 0, crunch: 1, price: 1, comfort: 0, share: 1, sauce: 2 } }
];

export const QUIZ_QUESTIONS = [
  {
    question: "Heat tolerance",
    options: [
      { text: "Milk-only", value: 0 },
      { text: "Medium salsa", value: 1 },
      { text: "I drink hot sauce", value: 2 }
    ]
  },
  {
    question: "Crunch mood",
    options: [
      { text: "Pillow", value: 0 },
      { text: "Balanced", value: 1 },
      { text: "Shatter glass", value: 2 }
    ]
  },
  {
    question: "Budget mood",
    options: [
      { text: "Coupons", value: 0 },
      { text: "Whatever", value: 1 },
      { text: "\"Surprise me\"", value: 2 }
    ]
  },
  {
    question: "Chaos level",
    options: [
      { text: "I plan my bites", value: 0 },
      { text: "I vibe", value: 1 },
      { text: "I freestyle with 3 sauces", value: 2 }
    ]
  },
  {
    question: "Share style",
    options: [
      { text: "Solo hunter", value: 0 },
      { text: "I share sometimes", value: 1 },
      { text: "I host platters", value: 2 }
    ]
  },
  {
    question: "Sauce identity",
    options: [
      { text: "Dry rub loyalist", value: 0 },
      { text: "Classic dips", value: 1 },
      { text: "Signature or nothing", value: 2 }
    ]
  }
];

export interface PartnerArchetype {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
  tags: TenderTags;
}

export const PARTNER_ARCHETYPES: PartnerArchetype[] = [
  {
    id: "budget-bae",
    name: "Budget Bae",
    emoji: "💸",
    blurb: "Always brings coupons and loves KFC value boxes. Will split a 10-piece with you and call it romance.",
    tags: { heat: 0, crunch: 1, price: 0, comfort: 1, share: 1, sauce: 1 }
  },
  {
    id: "spice-fiance",
    name: "Spice Fiancé",
    emoji: "🔥",
    blurb: "Can't date anyone who fears hot sauce. Judges your relationship potential by your ghost pepper tolerance.",
    tags: { heat: 2, crunch: 1, price: 1, comfort: 2, share: 1, sauce: 2 }
  },
  {
    id: "crispy-royalty",
    name: "Crispy Queen/King",
    emoji: "👑",
    blurb: "Obsessed with crunch, hates soggy breading. Will break up with you over a limp tender.",
    tags: { heat: 1, crunch: 2, price: 1, comfort: 1, share: 1, sauce: 1 }
  },
  {
    id: "comfort-companion",
    name: "Comfort Companion",
    emoji: "🧈",
    blurb: "Only eats tenders as comfort food at 2 AM. Perfect for Netflix binges and emotional eating sessions.",
    tags: { heat: 0, crunch: 0, price: 1, comfort: 0, share: 2, sauce: 1 }
  },
  {
    id: "signature-saucer",
    name: "Signature Saucer",
    emoji: "🥫",
    blurb: "Judges you entirely by your dip game. Has strong opinions about ranch vs honey mustard debates.",
    tags: { heat: 1, crunch: 1, price: 2, comfort: 1, share: 1, sauce: 2 }
  },
  {
    id: "chaos-catalyst",
    name: "Chaos Catalyst",
    emoji: "🌪️",
    blurb: "Mixes three sauces minimum and eats tenders with a fork. Unpredictable but never boring.",
    tags: { heat: 2, crunch: 2, price: 2, comfort: 2, share: 2, sauce: 2 }
  },
  {
    id: "minimalist-mate",
    name: "Minimalist Mate",
    emoji: "🤍",
    blurb: "Dry rub loyalist who finds sauce 'too complicated'. Appreciates the simple things in tender life.",
    tags: { heat: 0, crunch: 1, price: 0, comfort: 0, share: 0, sauce: 0 }
  },
  {
    id: "premium-partner",
    name: "Premium Partner",
    emoji: "✨",
    blurb: "Only the finest artisanal tenders will do. Expects truffle oil and gold leaf on everything.",
    tags: { heat: 1, crunch: 1, price: 2, comfort: 0, share: 2, sauce: 2 }
  }
];

export const PARTNER_COMPATIBILITY_COPY = {
  high: "Congrats, you've found your Sauce-mate for life.",
  medium: "A crunchy future awaits—just watch the spice levels.",
  low: "Opposites snack-tract, maybe not long-term."
};

export const DENY_LIST = [
  'kill', 'bomb', 'nazi', 'rape', 'suicide', 'terror', '<script', 'http://', 'https://',
  'hate', 'stupid', 'idiot', 'dumb', 'suck', 'worst'
];

// Helper functions
export function calculateOverall(sub: SubMetrics): number {
  const sum = sub.taste + sub.crunch + sub.juiciness + sub.breading + sub.sauce + sub.value;
  return Math.round((sum / 6) * 10) / 10;
}

export function getBadges(tender: Tender): string[] {
  const badges: string[] = [];
  
  if (tender.tags.heat === 2) badges.push("🔥");
  if (tender.tags.price === 0 && tender.overall >= 8.0) badges.push("💸");
  if (tender.tags.comfort === 0) badges.push("🧈");
  if (ICON_SET.includes(tender.name)) badges.push("⭐");
  if (tender.overall >= 8.0 && tender.tags.heat === 0 && tender.tags.crunch === 0) badges.push("🧪");
  if (tender.tries >= 3) badges.push("🏆");
  
  return badges;
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}