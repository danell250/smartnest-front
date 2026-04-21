export interface CatalogReview {
  id: number;
  author: string;
  location: string;
  rating: number;
  title: string;
  text: string;
  verified: boolean;
  date: string;
  helpful: number;
}

export interface CatalogProduct {
  id: number;
  name: string;
  brand: string;
  priceZAR: number;
  minOrder: string;
  features: string[];
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  supplier: {
    sourceLabel: string;
    sourceUrl: string;
    supplierPriceUSD: string;
    minimumOrder: number;
    dispatchWindow?: string;
    pricingNote: string;
  };
  highlights: string[];
  reviews?: CatalogReview[];
}

const USD_TO_ZAR = 18.5;
const FX_DATE = "April 20, 2026";
const LANDED_COST_MULTIPLIER = 1.25;
const PAYMENT_RESERVE_RATE = 0.06;
const RETURNS_RESERVE_RATE = 0.03;
const TARGET_MARGIN = 0.23;

const imagePool = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663463860697/SLdhiRT72VUh4Up8w2TPrH/hero-robot-vacuum-Bo28tem9ezqsyYNVYR359h.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663463860697/SLdhiRT72VUh4Up8w2TPrH/feature-smart-control-ZnPojKZCRH6NB37rHPekXr.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663463860697/SLdhiRT72VUh4Up8w2TPrH/feature-laser-navigation-bvkTKBYG8xJWkT5snsVE5H.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663463860697/SLdhiRT72VUh4Up8w2TPrH/feature-wet-dry-EAtVMPw82q5GFn3eNNVufc.webp",
  "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80",
  "https://images.unsplash.com/photo-1563162433-286a0b7f6c32?w=800&q=80",
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
];

const normalizePublicImagePath = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const segments = path.split("/").filter(Boolean);
  const fileName = segments[segments.length - 1] || path;
  return `/${fileName}`;
};

const teendowImages = [
  "/teendow-d10s-max-robot-vacuum-1.jpg",
  "/teendow-d10s-max-robot-vacuum-2.jpg",
  "/teendow-d10s-max-robot-vacuum-3.jpg",
  "/teendow-d10s-max-robot-vacuum-4.jpg",
  "/teendow-d10s-max-robot-vacuum-5.jpg",
  "/teendow-d10s-max-robot-vacuum-6.jpg",
];

const teendowLDSImages = [
  "/teendow-lds-self-emptying-robot-vacuum-1.jpeg",
  "/teendow-lds-self-emptying-robot-vacuum-2.jpeg",
];

const airroboImages = [
  "/airrobo-usa-multifunctional-vacuum-1.jpeg",
  "/airrobo-usa-multifunctional-vacuum-2.jpeg",
  "/airrobo-usa-multifunctional-vacuum-3.jpeg",
  "/airrobo-usa-multifunctional-vacuum-4.jpeg",
  "/airrobo-usa-multifunctional-vacuum-5.jpeg",
  "/airrobo-usa-multifunctional-vacuum-6.jpeg",
  "/airrobo-usa-multifunctional-vacuum-7.jpeg",
];

const airrobo5500Images = [
  "/irrobo-5500pa-rubber-brush-1.jpeg",
  "/irrobo-5500pa-rubber-brush-2.jpeg",
  "/irrobo-5500pa-rubber-brush-3.jpeg",
  "/irrobo-5500pa-rubber-brush-4.jpeg",
];

const ultraHepaImages = [
  "/ultra-hepa-auto-mop-robot-vacuum-1.jpeg",
  "/ultra-hepa-auto-mop-robot-vacuum-2.jpeg",
  "/ultra-hepa-auto-mop-robot-vacuum-3.jpeg",
  "/ultra-hepa-auto-mop-robot-vacuum-4.jpeg",
  "/ultra-hepa-auto-mop-robot-vacuum-5.jpeg",
  "/ultra-hepa-auto-mop-robot-vacuum-6.jpeg",
];

const lefantImages = [
  "/lefant-m210-mini-robot-vacuum-1.jpeg",
  "/lefant-m210-mini-robot-vacuum-2.jpeg",
  "/lefant-m210-mini-robot-vacuum-3.jpeg",
  "/lefant-m210-mini-robot-vacuum-4.jpeg",
  "/lefant-m210-mini-robot-vacuum-5.jpeg",
  "/lefant-m210-mini-robot-vacuum-6.jpeg",
];

const ilifeV3sImages = [
  "/ilife-v3s-pro-series-robot-vacuum-1.jpeg",
  "/ilife-v3s-pro-series-robot-vacuum-2.jpeg",
  "/ilife-v3s-pro-series-robot-vacuum-3.jpeg",
  "/ilife-v3s-pro-series-robot-vacuum-4.jpeg",
  "/ilife-v3s-pro-series-robot-vacuum-5.jpeg",
  "/ilife-v3s-pro-series-robot-vacuum-6.jpeg",
];

const yeediK650Images = [
  "/yeedi-k650-pet-robot-vacuum-1.jpeg",
  "/yeedi-k650-pet-robot-vacuum-2.jpeg",
  "/yeedi-k650-pet-robot-vacuum-3.jpeg",
  "/yeedi-k650-pet-robot-vacuum-4.jpeg",
  "/yeedi-k650-pet-robot-vacuum-5.jpeg",
  "/yeedi-k650-pet-robot-vacuum-6.jpeg",
  "/yeedi-k650-pet-robot-vacuum-7.jpeg",
  "/yeedi-k650-pet-robot-vacuum-8.jpeg",
];

const qicenImages = [
  "/qicen-smart-robot-vacuum-cleaner-1.jpeg",
  "/qicen-smart-robot-vacuum-cleaner-2.jpeg",
  "/qicen-smart-robot-vacuum-cleaner-3.jpeg",
  "/qicen-smart-robot-vacuum-cleaner-4.jpeg",
  "/qicen-smart-robot-vacuum-cleaner-5.jpeg",
  "/qicen-smart-robot-vacuum-cleaner-6.jpeg",
];

const airroboP20Images = [
  "/airrobo-p20-suction-power-pro-1.jpeg",
  "/airrobo-p20-suction-power-pro-2.jpeg",
  "/airrobo-p20-suction-power-pro-3.jpeg",
  "/airrobo-p20-suction-power-pro-4.jpeg",
];

const liectrouxC30BImages = [
  "/liectroux-c30b-1.jpeg",
  "/liectroux-c30b-2.jpeg",
  "/liectroux-c30b-3.jpeg",
  "/liectroux-c30b-4.jpeg",
  "/liectroux-c30b-5.jpeg",
  "/liectroux-c30b-6.jpeg",
];

const xiaomiS20Images = [
  "/xiaomi-s20-1.jpeg",
  "/xiaomi-s20-2.jpeg",
  "/xiaomi-s20-3.jpeg",
  "/xiaomi-s20-4.jpeg",
  "/xiaomi-s20-5.jpeg",
  "/xiaomi-s20-6.jpeg",
];

const roborockS8Images = [
  "/roborock-s8-pro-ultra-robot-vacuum-1.jpeg",
  "/roborock-s8-pro-ultra-robot-vacuum-2.jpeg",
  "/roborock-s8-pro-ultra-robot-vacuum-3.jpeg",
  "/roborock-s8-pro-ultra-robot-vacuum-4.jpeg",
  "/roborock-s8-pro-ultra-robot-vacuum-5.jpeg",
  "/roborock-s8-pro-ultra-robot-vacuum-6.jpeg",
  "/roborock-s8-pro-ultra-robot-vacuum-7.jpeg",
  "/roborock-s8-pro-ultra-robot-vacuum-8.jpeg",
];

const dreameX30Images = [
  "/dreame-x30-ultra-robot-vacuum-1.jpeg",
  "/dreame-x30-ultra-robot-vacuum-2.jpeg",
  "/dreame-x30-ultra-robot-vacuum-3.jpeg",
  "/dreame-x30-ultra-robot-vacuum-4.jpeg",
  "/dreame-x30-ultra-robot-vacuum-5.jpeg",
  "/dreame-x30-ultra-robot-vacuum-6.jpeg",
];

const ecovacsX2Images = [
  "/ecovacs-deebot-x2-omni-robot-vacuum-1.jpeg",
  "/ecovacs-deebot-x2-omni-robot-vacuum-2.jpeg",
  "/ecovacs-deebot-x2-omni-robot-vacuum-3.jpeg",
  "/ecovacs-deebot-x2-omni-robot-vacuum-4.jpeg",
  "/ecovacs-deebot-x2-omni-robot-vacuum-5.jpeg",
  "/ecovacs-deebot-x2-omni-robot-vacuum-6.jpeg",
];

const ilifeA10sImages = [
  "/ilife-a10s-robot-vacuum-cleaner-1.jpeg",
  "/ilife-a10s-robot-vacuum-cleaner-2.jpeg",
  "/ilife-a10s-robot-vacuum-cleaner-3.jpeg",
  "/ilife-a10s-robot-vacuum-cleaner-4.jpeg",
  "/ilife-a10s-robot-vacuum-cleaner-5.jpeg",
  "/ilife-a10s-robot-vacuum-cleaner-6.jpeg",
];

const irobotI3Images = [
  "/irobot-i3-1.jpeg",
  "/irobot-i3-2.jpeg",
  "/irobot-i3-3.jpeg",
  "/irobot-i3-4.jpeg",
  "/irobot-i3-5.jpeg",
  "/irobot-i3-6.jpeg",
];

const sharkAIImages = [
  "/shark-ai-robot-vacuum-with-xl-hepa-1.jpeg",
  "/shark-ai-robot-vacuum-with-xl-hepa-2.jpeg",
  "/shark-ai-robot-vacuum-with-xl-hepa-3.jpeg",
  "/shark-ai-robot-vacuum-with-xl-hepa-4.jpeg",
  "/shark-ai-robot-vacuum-with-xl-hepa-5.jpeg",
  "/shark-ai-robot-vacuum-with-xl-hepa-6.jpeg",
];

const eufyX8Images = [
  "/eufy-robovac-x8-hybrid-robot-vacuum-1.jpeg",
  "/eufy-robovac-x8-hybrid-robot-vacuum-2.jpeg",
  "/eufy-robovac-x8-hybrid-robot-vacuum-3.jpeg",
  "/eufy-robovac-x8-hybrid-robot-vacuum-4.jpeg",
  "/eufy-robovac-x8-hybrid-robot-vacuum-5.jpeg",
];

const yeediC12Images = [
  "/yeedi-c12-robot-vacuum-cleaner-1.jpeg",
  "/yeedi-c12-robot-vacuum-cleaner-2.jpeg",
  "/yeedi-c12-robot-vacuum-cleaner-3.jpeg",
  "/yeedi-c12-robot-vacuum-cleaner-4.jpeg",
  "/yeedi-c12-robot-vacuum-cleaner-5.jpeg",
];

const neatoD10Images = [
  "/neato-d10-connected-robot-vacuum-1.jpeg",
  "/neato-d10-connected-robot-vacuum-2.jpeg",
  "/neato-d10-connected-robot-vacuum-3.jpeg",
  "/neato-d10-connected-robot-vacuum-4.jpeg",
  "/neato-d10-connected-robot-vacuum-5.jpeg",
  "/neato-d10-connected-robot-vacuum-6.jpeg",
];

const samsungJetBotImages = [
  "/samsung-jet-bot-1.jpeg",
  "/samsung-jet-bot-2.jpeg",
  "/samsung-jet-bot-3.jpeg",
  "/samsung-jet-bot-4.jpeg",
  "/samsung-jet-bot-5.jpeg",
  "/samsung-jet-bot-6.jpeg",
  "/samsung-jet-bot-7.jpeg",
];

const defaultReviews: CatalogReview[] = [
  {
    id: 1,
    author: "Thabo M.",
    location: "Johannesburg, SA",
    rating: 5,
    title: "Excellent cleaning performance",
    text: "The self-emptying feature is a game-changer. My floors have never been cleaner, and the app control makes it so convenient.",
    verified: true,
    date: "2 weeks ago",
    helpful: 18,
  },
  {
    id: 2,
    author: "Nomsa K.",
    location: "Cape Town, SA",
    rating: 5,
    title: "Great value for the price",
    text: "This robot vacuum has exceeded my expectations. The app control feature is amazing and it handles pet hair perfectly.",
    verified: true,
    date: "1 month ago",
    helpful: 12,
  },
  {
    id: 3,
    author: "David C.",
    location: "Durban, SA",
    rating: 4,
    title: "Good feature-to-price balance",
    text: "Reliable vacuum-and-mop combo with a price point that still works after delivery and payment costs.",
    verified: true,
    date: "1 month ago",
    helpful: 9,
  },
];

const roundRetailPrice = (amount: number) => Math.max(999, Math.ceil(amount / 100) * 100 - 1);

const getDeliveryReserveZAR = (highUsd: number) => {
  if (highUsd >= 300) return 299;
  if (highUsd >= 200) return 249;
  if (highUsd >= 120) return 199;
  return 149;
};

const calculateRetailPrice = (highUsd: number) => {
  const landedCostZAR = highUsd * USD_TO_ZAR * LANDED_COST_MULTIPLIER;
  const deliveryReserveZAR = getDeliveryReserveZAR(highUsd);
  const exVatRetail =
    (landedCostZAR + deliveryReserveZAR) /
    (1 - PAYMENT_RESERVE_RATE - RETURNS_RESERVE_RATE - TARGET_MARGIN);
  return roundRetailPrice(exVatRetail * 1.15);
};

const formatMargin = (lowUsd: number, highUsd: number, retailPriceZAR: number) => {
  const retailExVat = retailPriceZAR / 1.15;
  const lowMargin =
    ((retailExVat -
      (lowUsd * USD_TO_ZAR * LANDED_COST_MULTIPLIER + getDeliveryReserveZAR(lowUsd))) /
      retailExVat) *
    100;
  const highMargin =
    ((retailExVat -
      (highUsd * USD_TO_ZAR * LANDED_COST_MULTIPLIER + getDeliveryReserveZAR(highUsd))) /
      retailExVat) *
    100;

  return `${Math.round(Math.min(lowMargin, highMargin))}-${Math.round(Math.max(lowMargin, highMargin))}%`;
};

const buildImageSet = (offset: number) => [
  normalizePublicImagePath(imagePool[offset % imagePool.length]),
  normalizePublicImagePath(imagePool[(offset + 1) % imagePool.length]),
  normalizePublicImagePath(imagePool[(offset + 2) % imagePool.length]),
  normalizePublicImagePath(imagePool[(offset + 3) % imagePool.length]),
];

const buildProduct = ({
  id,
  name,
  brand,
  supplierPriceUSD,
  supplierPriceRange,
  minimumOrder,
  dispatchWindow,
  rating,
  reviewCount,
  imageOffset,
  image,
  images,
  description,
  features,
  specifications,
  highlights,
  sourceUrl,
  reviews = [],
}: {
  id: number;
  name: string;
  brand: string;
  supplierPriceUSD: string;
  supplierPriceRange: [number, number];
  minimumOrder: number;
  dispatchWindow?: string;
  rating: number;
  reviewCount: number;
  imageOffset: number;
  image?: string;
  images?: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  highlights: string[];
  sourceUrl: string;
  reviews?: CatalogReview[];
}): CatalogProduct => {
  const priceZAR = calculateRetailPrice(supplierPriceRange[1]);

  return {
    id,
    name,
    brand,
    priceZAR,
    minOrder: `${minimumOrder} ${minimumOrder === 1 ? "unit" : "units"}`,
    features,
    rating,
    reviewCount,
    image: normalizePublicImagePath(image || imagePool[imageOffset % imagePool.length]),
    images: (images || buildImageSet(imageOffset)).map(normalizePublicImagePath),
    description,
    specifications,
    supplier: {
      sourceLabel: "Alibaba showroom reference",
      sourceUrl,
      supplierPriceUSD,
      minimumOrder,
      dispatchWindow,
      pricingNote: `Priced from the top of the Alibaba range using USD/ZAR ${USD_TO_ZAR} on ${FX_DATE}, a 25% landed-cost buffer, and a delivery-inclusive margin reserve.`,
    },
    highlights,
    reviews,
  };
};

export const catalogProducts: CatalogProduct[] = [
  buildProduct({
    id: 1,
    name: "Teendow D10S MAX Robot Vacuum",
    brand: "Teendow",
    supplierPriceUSD: "$96-123",
    supplierPriceRange: [96, 123],
    minimumOrder: 2,
    rating: 4.8,
    reviewCount: 28,
    imageOffset: 0,
    image: teendowImages[0],
    images: teendowImages,
    description: "Self-emptying Teendow robot vacuum and mop with excellent cleaning performance and smart app control.",
    features: ["Wet & Dry Mopping", "Self-Emptying Dustbin", "App Control", "LDS Navigation"],
    specifications: {
      "Suction Power": "4000Pa",
      "Navigation": "LDS laser mapping",
      "Cleaning Modes": "Vacuum, mop, combo",
      "Dust Handling": "Self-emptying base",
      "Recommended Use": "Hard floors and mixed surfaces",
    },
    highlights: [
      "Retail price modeled from the highest supplier quote, not the lowest teaser price",
      "Well-balanced entry point for premium self-emptying offers",
      "MOQ stays low enough for test orders",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 2,
    name: "Teendow LDS Self-Emptying Robot Vacuum",
    brand: "Teendow",
    supplierPriceUSD: "$118-123",
    supplierPriceRange: [118, 123],
    minimumOrder: 2,
    rating: 4.7,
    reviewCount: 24,
    imageOffset: 1,
    image: teendowLDSImages[0],
    images: teendowLDSImages,
    description: "Another low-MOQ Teendow option built around laser mapping and self-emptying for a stronger mid-tier offer.",
    features: ["LDS Laser Mapping", "Self-Emptying Dock", "App Scheduling", "Multi-Room Cleaning"],
    specifications: {
      "Suction Power": "4200Pa",
      "Navigation": "Laser room mapping",
      "Dock Type": "Self-emptying station",
      "Control": "Wi-Fi app control",
      "MOQ Bracket": "2 units",
    },
    highlights: [
      "Tight supplier range keeps pricing confidence high",
      "Better fit for buyers who want mapping without ultra-premium pricing",
      "Excellent value for money at the top quote",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-and-mop.html",
  }),
  buildProduct({
    id: 3,
    name: "AIRROBO USA Multifunctional Vacuum",
    brand: "AIRROBO",
    supplierPriceUSD: "$135-140",
    supplierPriceRange: [135, 140],
    minimumOrder: 1,
    rating: 4.6,
    reviewCount: 19,
    imageOffset: 2,
    image: airroboImages[0],
    images: airroboImages,
    description: "Multifunctional AIRROBO listing with a single-unit MOQ, which makes it easier to validate demand before scaling.",
    features: ["Automatic Mopping", "Self-Emptying Dustbin", "Smart Mapping", "Single-Unit MOQ"],
    specifications: {
      "Suction Power": "5500Pa class",
      "Navigation": "Smart route planning",
      "Dock Type": "Self-emptying",
      "Control": "App and voice control",
      "MOQ Bracket": "1 unit",
    },
    highlights: [
      "Single-unit MOQ reduces the risk of first test orders",
      "Room for paid acquisition because the retail price was set from the high quote",
      "Clean positioning as a premium-but-not-flagship option",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 4,
    name: "AIRROBO 5500Pa Rubber Brush",
    brand: "AIRROBO",
    supplierPriceUSD: "$144-150",
    supplierPriceRange: [144, 150],
    minimumOrder: 2,
    dispatchWindow: "5-day dispatch",
    rating: 4.7,
    reviewCount: 34,
    imageOffset: 3,
    image: airrobo5500Images[0],
    images: airrobo5500Images,
    description: "Higher-suction AIRROBO model aimed at homes with pets, thicker debris, and mixed floor surfaces.",
    features: ["5500Pa Suction", "Rubber Brush System", "Automatic Self-Emptying", "Wi-Fi Control"],
    specifications: {
      "Suction Power": "5500Pa",
      "Brush Type": "Rubber anti-tangle brush",
      "Dispatch": "5-day dispatch listing",
      "Dock Type": "Self-emptying base",
      "MOQ Bracket": "2 units",
    },
    highlights: [
      "Rubber brush angle gives you a cleaner message for pet owners",
      "Retail price still leaves room after a freight buffer",
      "Good step-up SKU above entry premium models",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 5,
    name: "Household Wet & Dry Self-Emptying Robot Vacuum",
    brand: "OEM Select",
    supplierPriceUSD: "$70-142",
    supplierPriceRange: [70, 142],
    minimumOrder: 2,
    rating: 4.5,
    reviewCount: 17,
    imageOffset: 0,
    image: teendowImages[0],
    images: teendowImages,
    description: "Broadly positioned wet-and-dry robot vacuum listing for a value-oriented storefront that still wants self-emptying capability.",
    features: ["Wet & Dry Cleaning", "Self-Emptying Station", "Auto Sweep & Mop", "Household Ready"],
    specifications: {
      "Cleaning Type": "Vacuum and mop combo",
      "Dock Type": "Self-emptying",
      "Use Case": "Daily home cleaning",
      "Range Type": "Wide supplier band",
      "MOQ Bracket": "2 units",
    },
    highlights: [
      "Price is modeled from the top end of a very wide quote range",
      "Useful as a value-plus self-emptying offer",
      "Leaves extra upside if you negotiate below the top quote",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 6,
    name: "Ultra HEPA Auto Mop Robot Vacuum",
    brand: "OEM Select",
    supplierPriceUSD: "$54-142",
    supplierPriceRange: [54, 142],
    minimumOrder: 2,
    rating: 4.4,
    reviewCount: 14,
    imageOffset: 1,
    image: ultraHepaImages[0],
    images: ultraHepaImages,
    description: "A HEPA-focused wet/dry self-emptying listing perfect for allergy-conscious households with superior air filtration.",
    features: ["HEPA Filtration", "Auto Mop Function", "Wet/Dry Cleaning", "Self-Emptying Station"],
    specifications: {
      "Filtration": "HEPA",
      "Cleaning Type": "Wet and dry",
      "Dock Type": "Self-emptying",
      "Target Buyer": "Allergy-sensitive households",
      "MOQ Bracket": "2 units",
    },
    highlights: [
      "Strongest modeled upside if you source toward the middle of the range",
      "Target buyer segment that prioritizes air quality over lowest price",
      "Can be positioned as a premium allergy solution",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 7,
    name: "Multifunctional Wet Dry Robot Vacuum",
    brand: "OEM Select",
    supplierPriceUSD: "$149.92-150",
    supplierPriceRange: [149.92, 150],
    minimumOrder: 1,
    rating: 4.6,
    reviewCount: 22,
    imageOffset: 2,
    image: teendowImages[0],
    images: teendowImages,
    description: "Self-emptying multifunction robot vacuum with almost no pricing spread, which makes it one of the easier listings to model confidently.",
    features: ["Smart Wet/Dry Cleaning", "Self-Emptying Dustbin", "Multi-Surface Cleaning", "Single-Unit MOQ"],
    specifications: {
      "Cleaning Type": "Wet/dry multifunction",
      "Dock Type": "Self-emptying dustbin",
      "Price Spread": "Very tight supplier range",
      "Use Case": "Single-unit validation orders",
      "MOQ Bracket": "1 unit",
    },
    highlights: [
      "Very small supplier price spread means cleaner pricing decisions",
      "Single-unit MOQ is useful for test inventory",
      "Natural mid-premium slot in the catalog",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 8,
    name: "Lefant M210 Mini Robot Vacuum",
    brand: "Lefant",
    supplierPriceUSD: "$88-102",
    supplierPriceRange: [88, 102],
    minimumOrder: 1,
    dispatchWindow: "3-day delivery",
    rating: 4.8,
    reviewCount: 156,
    imageOffset: 3,
    image: lefantImages[0],
    images: lefantImages,
    description: "Ultra-compact Lefant M210 designed for hard floors and pet hair. Fits under tight furniture and features FreeMove 2.0 tech.",
    features: ["2200Pa Suction", "6D Infrared Sensors", "App & Voice Control", "Tangle-Free Design"],
    specifications: {
      "Suction Power": "2200Pa",
      "Navigation": "6D collision sensors",
      "Body Diameter": "28cm",
      "Height": "7.6cm",
      "Control": "App, Alexa, Google Home",
    },
    highlights: [
      "Most affordable entry-level smart vacuum in the catalog",
      "Perfect for small apartments and homes with pets",
      "Extremely low profile fits under almost all furniture",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/lefant-m210.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 9,
    name: "ILIFE V3s Pro Series Robot Vacuum",
    brand: "ILIFE",
    supplierPriceUSD: "$75-95",
    supplierPriceRange: [75, 95],
    minimumOrder: 1,
    rating: 4.7,
    reviewCount: 210,
    imageOffset: 0,
    image: ilifeV3sImages[0],
    images: ilifeV3sImages,
    description: "The classic pet-hair specialist. Tangle-free suction technology and a slim design make it a reliable choice for daily maintenance.",
    features: ["Tangle-free Suction", "Auto Self-Charging", "Programmable Schedule", "Smart Sensors"],
    specifications: {
      "Cleaning Mode": "Auto, Spot, Edge",
      "Battery": "2600mAh",
      "Runtime": "90-100 mins",
      "Dustbin": "300ml",
      "MOQ Bracket": "1 unit",
    },
    highlights: [
      "Proven ILIFE platform with strong brand recognition",
      "Low MOQ and fast dispatch make it easy to start",
      "Good fit for catalog expansion without high inventory risk",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/ilife-v3s-pro.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 10,
    name: "Yeedi k650 Pet Robot Vacuum",
    brand: "Yeedi",
    supplierPriceUSD: "$115-135",
    supplierPriceRange: [115, 135],
    minimumOrder: 1,
    rating: 4.6,
    reviewCount: 85,
    imageOffset: 1,
    image: yeediK650Images[0],
    images: yeediK650Images,
    description: "Yeedi k650 features a massive 800ml dustbin and a tangle-free silicone brush, specifically engineered for pet owners.",
    features: ["2000Pa Suction", "XXL 800ml Dustbin", "Tangle-Free Silicone Brush", "Quiet Mode"],
    specifications: {
      "Suction Power": "2000Pa",
      "Dustbin Capacity": "800ml",
      "Brush Type": "Silicone tangle-free",
      "App Control": "Yeedi App",
      "MOQ Bracket": "1 unit",
    },
    highlights: [
      "Largest dustbin in its class, less frequent emptying",
      "Sleek glass-top design is scratch-resistant",
      "Very quiet operation, won't disturb pets or work",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/yeedi-k650.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 11,
    name: "Hot Sales LDS Self-Emptying Robot Vacuum",
    brand: "Home Station",
    supplierPriceUSD: "$139",
    supplierPriceRange: [139, 139],
    minimumOrder: 500,
    rating: 4.6,
    reviewCount: 16,
    imageOffset: 2,
    image: teendowLDSImages[0],
    images: teendowLDSImages,
    description: "LDS mapping robot vacuum with self-emptying station aimed at stores that want a strong premium-mid product with clear specs.",
    features: ["LDS Navigation", "Self-Emptying Station", "App Control", "Household Use"],
    specifications: {
      "Navigation": "LDS mapping",
      "Dock Type": "Self-emptying station",
      "Control": "App-based control",
      "Use Case": "Household cleaning",
      "MOQ Bracket": "500 units",
    },
    highlights: [
      "Clean feature stack for a premium catalog slot",
      "Single supplier quote makes retail planning straightforward",
      "High MOQ suggests it's aimed at larger operations",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 12,
    name: "R11 90-Day Self-Emptying Robot Vacuum",
    brand: "R11",
    supplierPriceUSD: "$107-110.24",
    supplierPriceRange: [107, 110.24],
    minimumOrder: 10,
    rating: 4.7,
    reviewCount: 21,
    imageOffset: 3,
    image: airrobo5500Images[0],
    images: airrobo5500Images,
    description: "R11 model built around long-interval self-emptying, LDS navigation, and stronger suction messaging for premium shoppers.",
    features: ["90-Day Self-Emptying", "LDS Navigation", "20000Pa Marketing Claim", "App & Voice Control"],
    specifications: {
      "Dust Handling": "90-day self-emptying",
      "Navigation": "LDS navigation",
      "Controls": "App and voice control",
      "Positioning": "Premium convenience",
      "MOQ Bracket": "10 units",
    },
    highlights: [
      "Convenience-led sales angle thanks to long self-emptying cycle",
      "Lower MOQ than many factory-direct LDS offers",
      "Modeled from the top quote for competitive pricing",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 13,
    name: "Laser Navigation Self-Empty Dust Bin Robot Vacuum",
    brand: "Laser Clean",
    supplierPriceUSD: "$145",
    supplierPriceRange: [145, 145],
    minimumOrder: 1,
    dispatchWindow: "Delivery by May 02",
    rating: 4.6,
    reviewCount: 15,
    imageOffset: 0,
    image: teendowImages[0],
    images: teendowImages,
    description: "Single-unit laser navigation robot vacuum listing with self-emptying dust bin and a straightforward premium price point.",
    features: ["Laser Navigation", "Self-Empty Dust Bin", "Single-Unit MOQ", "Money-Back Guarantee Listing"],
    specifications: {
      "Navigation": "Laser navigation",
      "Dust Handling": "Self-empty dust bin",
      "MOQ Bracket": "1 unit",
      "Delivery Note": "Delivery by May 02 listing",
      "Sales Angle": "Low-risk trial order",
    },
    highlights: [
      "Easy SKU to test thanks to one-unit MOQ",
      "Premium feature set without flagship pricing",
      "Practical option for live-store validation",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-vacuum-cleaner-and-mop.html",
  }),
  buildProduct({
    id: 14,
    name: "Smart Floor Robotic Vacuum Cleaner",
    brand: "Smart Sweep",
    supplierPriceUSD: "$25",
    supplierPriceRange: [25, 25],
    minimumOrder: 500,
    rating: 4.3,
    reviewCount: 10,
    imageOffset: 1,
    image: lefantImages[0],
    images: lefantImages,
    description: "Entry-level robotic vacuum listing for high-volume programs where a low supplier cost matters more than self-emptying hardware.",
    features: ["Auto Intelligent Cleaning", "App Remote Control", "Entry-Level Price", "High-Volume MOQ"],
    specifications: {
      "Control": "App remote control",
      "Tier": "Entry level",
      "Positioning": "Mass-market cleaning",
      "Cost Bracket": "Low supplier cost",
      "MOQ Bracket": "500 units",
    },
    highlights: [
      "Great value due to competitive supplier pricing",
      "Best suited to larger buying plans or promotional bundles",
      "Useful as a budget anchor in the catalog",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 14,
    name: "2026 Smart V2 LDS Auto-Empty Robot Vacuum",
    brand: "Smart V2",
    supplierPriceUSD: "$104-110",
    supplierPriceRange: [104, 110],
    minimumOrder: 500,
    rating: 4.6,
    reviewCount: 14,
    imageOffset: 2,
    image: teendowLDSImages[0],
    images: teendowLDSImages,
    description: "Smart V2 robot vacuum with laser mapping and auto-empty base designed for stores building out a broader premium line.",
    features: ["LDS Laser Cleaner Map", "3-in-1 Sweep Suction Mop", "Auto-Empty Base", "Updated 2026 Listing"],
    specifications: {
      "Navigation": "LDS laser mapping",
      "Cleaning Type": "3-in-1 sweep, suction, mop",
      "Dock Type": "Auto-empty base",
      "Range Type": "Tight supplier range",
      "MOQ Bracket": "500 units",
    },
    highlights: [
      "Balanced premium feature set at a predictable cost band",
      "Good candidate for private-label catalog expansion",
      "Great value despite the higher-spec base",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 16,
    name: "Newest App-Controlled Wet & Dry Robot Mop",
    brand: "Smart Mop",
    supplierPriceUSD: "$22.99-24.99",
    supplierPriceRange: [22.99, 24.99],
    minimumOrder: 2,
    rating: 4.2,
    reviewCount: 12,
    imageOffset: 3,
    image: yeediK650Images[0],
    images: yeediK650Images,
    description: "Budget-friendly wet and dry robot mop listing with app control and a low MOQ for testing entry-level demand.",
    features: ["App Control", "Wet & Dry Cleaning", "Water Tank", "Low MOQ"],
    specifications: {
      "Control": "App control",
      "Cleaning Type": "Wet and dry",
      "Water Handling": "Built-in water tank",
      "Tier": "Budget",
      "MOQ Bracket": "2 units",
    },
    highlights: [
      "Low supplier cost supports accessible retail pricing",
      "Useful for lower-ticket acquisition campaigns",
      "Ideal when you want a true starter SKU",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 17,
    name: "Household Water Tank Smart Robot Vacuum",
    brand: "WaterTank Series",
    supplierPriceUSD: "$54-142",
    supplierPriceRange: [54, 142],
    minimumOrder: 2,
    rating: 4.4,
    reviewCount: 18,
    imageOffset: 0,
    image: ultraHepaImages[0],
    images: ultraHepaImages,
    description: "Wet-and-dry household robot vacuum with water tank, positioned as a flexible mid-tier SKU for mixed cleaning needs.",
    features: ["Wet & Dry Robot Mop", "Water Tank", "Smart Vacuum Control", "MOQ 2"],
    specifications: {
      "Cleaning Type": "Wet and dry",
      "Water Handling": "Water tank included",
      "Target Buyer": "General household use",
      "Range Type": "Wide supplier range",
      "MOQ Bracket": "2 units",
    },
    highlights: [
      "Flexible positioning between budget and premium models",
      "Pricing anchored to the top of a broad supplier range",
      "Good option for general home-cleaning messaging",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 18,
    name: "Teendow D60S Max 6000Pa Robot Vacuum",
    brand: "Teendow",
    supplierPriceUSD: "$110-161",
    supplierPriceRange: [110, 161],
    minimumOrder: 500,
    rating: 4.8,
    reviewCount: 20,
    imageOffset: 1,
    image: teendowImages[5], // Use the base station/ultra shot as main for the 6000Pa model
    images: [
      teendowImages[5],
      teendowImages[0],
      teendowImages[1],
      teendowImages[2],
      teendowImages[3],
      teendowImages[4],
    ],
    description: "Teendow D60S Max extends the Teendow range with stronger suction positioning and self-emptying wet/dry cleaning.",
    features: ["6000Pa Marketing Claim", "Self-Emptying", "Wet & Dry Cleaning", "Teendow Range Expansion"],
    specifications: {
      "Suction Power": "6000Pa",
      "Cleaning Type": "Wet and dry",
      "Dock Type": "Self-emptying",
      "Brand Family": "Teendow D-series",
      "MOQ Bracket": "500 units",
    },
    highlights: [
      "Natural upsell above entry Teendow options",
      "Extends the catalog with another recognizable Teendow variant",
      "Modeled pricing for competitive value",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 19,
    name: "6500Pa All-in-One Self-Emptying Robot Vacuum",
    brand: "PowerDock",
    supplierPriceUSD: "$250-288",
    supplierPriceRange: [250, 288],
    minimumOrder: 2,
    rating: 4.7,
    reviewCount: 12,
    imageOffset: 2,
    image: teendowImages[0],
    images: teendowImages,
    description: "High-ticket 6500Pa all-in-one robot vacuum with self-emptying station for shoppers who want a stronger premium feature stack.",
    features: ["6500Pa Suction", "All-in-One Sweep & Mop", "Self-Emptying Station", "MOQ 2"],
    specifications: {
      "Suction Power": "6500Pa",
      "Cleaning Type": "All-in-one sweep and mop",
      "Dock Type": "Self-emptying station",
      "Tier": "Premium",
      "MOQ Bracket": "2 units",
    },
    highlights: [
      "Strong premium anchor alongside the 2700Pa dust-collection model",
      "Higher retail ticket can support more room for paid traffic",
      "Good fit for shoppers comparing premium bundles",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 20,
    name: "20000Pa Wi-Fi Robot Vacuum Mop",
    brand: "E-Covacs Style",
    supplierPriceUSD: "$222",
    supplierPriceRange: [222, 222],
    minimumOrder: 690,
    rating: 4.5,
    reviewCount: 11,
    imageOffset: 3,
    image: airroboImages[0],
    images: airroboImages,
    description: "Wi-Fi connected robot vacuum mop with an aggressive suction claim and a large MOQ aimed at scaled catalog operators.",
    features: ["Wi-Fi Connection", "Robot Vacuum & Mop", "20000Pa Marketing Claim", "Large MOQ"],
    specifications: {
      "Control": "Wi-Fi connected",
      "Cleaning Type": "Vacuum and mop",
      "Positioning": "Scaled procurement",
      "Tier": "Upper mid-market",
      "MOQ Bracket": "690 units",
    },
    highlights: [
      "Useful for a larger private-label sourcing plan",
      "Simple single-price quote keeps modeled retail consistent",
      "Stronger spec messaging than standard budget models",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 21,
    name: "RC330B Smart Robot Vacuum Cleaner",
    brand: "RC Series",
    supplierPriceUSD: "$109.60",
    supplierPriceRange: [109.6, 109.6],
    minimumOrder: 1000,
    rating: 4.4,
    reviewCount: 9,
    imageOffset: 0,
    image: lefantImages[0],
    images: lefantImages,
    description: "RC330B automatic robot vacuum listing for stores interested in standardized high-MOQ production runs.",
    features: ["Automatic Sweeping", "Battery Powered", "Plastic Material Housing", "Factory MOQ"],
    specifications: {
      "Power": "Battery powered",
      "Cleaning Type": "Automatic sweeping",
      "Model": "RC330B",
      "Production Style": "Factory-volume run",
      "MOQ Bracket": "1000 units",
    },
    highlights: [
      "Factory-style pricing for high-volume plans",
      "Straightforward entry product for standardized catalogs",
      "Modeled retail uses competitive pricing",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 22,
    name: "Best 2-in-1 Smart Sweeper Robot",
    brand: "Sweeper Pro",
    supplierPriceUSD: "$52-73",
    supplierPriceRange: [52, 73],
    minimumOrder: 2,
    rating: 4.3,
    reviewCount: 13,
    imageOffset: 1,
    description: "2-in-1 smart sweeper robot with mop combo positioning for budget-conscious shoppers who still want automation.",
    features: ["2-in-1 Sweep & Mop", "Smart Cleaning", "EU Plug Listing", "MOQ 2"],
    specifications: {
      "Cleaning Type": "Sweep and mop combo",
      "Power Config": "EU plug listing",
      "Tier": "Budget-mid",
      "Use Case": "Light daily cleaning",
      "MOQ Bracket": "2 units",
    },
    highlights: [
      "Accessible price point with enough room for a decent ticket size",
      "Useful bridge product between budget and self-emptying tiers",
      "Straightforward household messaging",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-cleaner-and-mop.html",
  }),
  buildProduct({
    id: 23,
    name: "Qicen Smart Robot Vacuum Cleaner",
    brand: "Qicen",
    supplierPriceUSD: "$43-48",
    supplierPriceRange: [43, 48],
    minimumOrder: 1,
    rating: 4.2,
    reviewCount: 10,
    imageOffset: 2,
    image: qicenImages[0],
    images: qicenImages,
    description: "Single-unit Qicen robot vacuum listing that works well as a low-risk test product or lower-price catalog addition.",
    features: ["Smart Home Use", "Single-Unit MOQ", "Entry Pricing", "Compact Format"],
    specifications: {
      "Tier": "Entry level",
      "Use Case": "Home use",
      "Sales Angle": "Low-risk test order",
      "Brand": "Qicen",
      "MOQ Bracket": "1 unit",
    },
    highlights: [
      "Very easy to test without committing to bulk inventory",
      "Good candidate for introductory promotions",
      "Low supplier cost creates strong theoretical headroom",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-cleaner-and-mop.html",
  }),
  buildProduct({
    id: 24,
    name: "4800Pa Smart Robot Vacuum and Mop Combo",
    brand: "Super Suction",
    supplierPriceUSD: "$41.50-50",
    supplierPriceRange: [41.5, 50],
    minimumOrder: 1,
    dispatchWindow: "5-day dispatch",
    rating: 4.5,
    reviewCount: 17,
    imageOffset: 3,
    image: qicenImages[0],
    images: qicenImages,
    description: "4800Pa robot vacuum and mop combo for buyers who want higher suction messaging without stepping into premium self-emptying price bands.",
    features: ["4800Pa Suction", "2-in-1 Mopping", "Super Suction Messaging", "5-Day Dispatch"],
    specifications: {
      "Suction Power": "4800Pa",
      "Cleaning Type": "2-in-1 vacuum and mop",
      "Dispatch": "5-day dispatch listing",
      "Tier": "Budget-plus",
      "MOQ Bracket": "1 unit",
    },
    highlights: [
      "Compelling low-commitment product thanks to MOQ 1",
      "Strong spec-led pitch for shoppers scanning suction numbers",
      "Good value-focused traffic product",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-vacuum-and-mop-cleaner.html",
  }),
  buildProduct({
    id: 25,
    name: "Battery-Powered Floor Sweeper Vacuum Mop Robot",
    brand: "Battery Sweeper",
    supplierPriceUSD: "$36.52-41.22",
    supplierPriceRange: [36.52, 41.22],
    minimumOrder: 50,
    rating: 4.2,
    reviewCount: 8,
    imageOffset: 0,
    image: lefantImages[0],
    images: lefantImages,
    description: "Battery-powered floor sweeper robot cleaner targeted at larger budget programs and promotional storefront offers.",
    features: ["Battery Powered", "Vacuum + Mop", "Household Cleaning", "Mid MOQ"],
    specifications: {
      "Power": "Battery powered",
      "Cleaning Type": "Vacuum and mop",
      "Use Case": "Household cleaning",
      "Tier": "Budget",
      "MOQ Bracket": "50 units",
    },
    highlights: [
      "Can anchor lower-ticket campaigns with competitive pricing",
      "Mid-size MOQ is more approachable than factory-only runs",
      "Practical value SKU for wider catalogs",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-vacuum-and-mop-cleaner.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 26,
    name: "AIRROBO P20 Suction Power Pro",
    brand: "AIRROBO",
    supplierPriceUSD: "$68-85",
    supplierPriceRange: [68, 85],
    minimumOrder: 1,
    rating: 4.8,
    reviewCount: 42,
    imageOffset: 1,
    image: airroboP20Images[0],
    images: airroboP20Images,
    description: "AIRROBO P20 offers high-end 2800Pa suction at an entry-level price point. Efficient cleaning with advanced obstacle avoidance.",
    features: ["2800Pa Suction", "Scraper Technology", "Slim Design", "App & Voice Control"],
    specifications: {
      "Suction Power": "2800Pa",
      "Cleaning Efficiency": "99.2%",
      "Height": "7.8cm",
      "Dustbin": "600ml",
      "MOQ Bracket": "1 unit",
    },
    highlights: [
      "Strong suction power for deep cleaning",
      "Single-unit MOQ for easy testing",
      "Good value proposition at the top quote",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/airrobo-p20.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 27,
    name: "Wholesale Wi-Fi Sweep Robot Vacuum Cleaner",
    brand: "WiFi Home",
    supplierPriceUSD: "$57-75",
    supplierPriceRange: [57, 75],
    minimumOrder: 2,
    rating: 4.4,
    reviewCount: 14,
    imageOffset: 2,
    image: teendowImages[0],
    images: teendowImages,
    description: "Wi-Fi robot vacuum cleaner with 3-in-1 sweep and mop positioning for accessible smart-home sales messaging.",
    features: ["Wi-Fi Control", "3-in-1 Sweep Robot", "Mopping & Sweeping", "MOQ 2"],
    specifications: {
      "Control": "Wi-Fi control",
      "Cleaning Type": "3-in-1 sweep and mop",
      "Tier": "Mid-value",
      "Positioning": "Smart home",
      "MOQ Bracket": "2 pieces",
    },
    highlights: [
      "Useful everyday smart-home SKU with balanced supplier pricing",
      "Clear upgrade over purely manual budget cleaning tools",
      "Retail stays approachable while preserving modeled headroom",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-2-in-1-vacuum-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 28,
    name: "Self-Emptying Dustbin Intelligent Robot Vacuum",
    brand: "AutoEmpty",
    supplierPriceUSD: "$108-123",
    supplierPriceRange: [108, 123],
    minimumOrder: 2,
    rating: 4.5,
    reviewCount: 16,
    imageOffset: 3,
    image: teendowLDSImages[0],
    images: teendowLDSImages,
    description: "Self-emptying intelligent robot vacuum cleaner designed as a reliable mid-premium step up from standard vacuum-and-mop combos.",
    features: ["Self-Emptying Dustbin", "Automatic Sweeping", "Intelligent Cleaning", "MOQ 2"],
    specifications: {
      "Dust Handling": "Self-emptying dustbin",
      "Cleaning Type": "Automatic sweeping",
      "Tier": "Mid-premium",
      "Target Buyer": "Hands-off cleaning shopper",
      "MOQ Bracket": "2 pieces",
    },
    highlights: [
      "Convenience-forward feature set for easy product storytelling",
      "Natural bridge between budget smart vacuums and full premium docks",
      "Retail modeled from the upper supplier quote",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/the-best-robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 29,
    name: "Liectroux C30B Robot Vacuum Cleaner",
    brand: "Liectroux",
    supplierPriceUSD: "$110-115",
    supplierPriceRange: [110, 115],
    minimumOrder: 1,
    rating: 4.5,
    reviewCount: 45,
    imageOffset: 0,
    image: liectrouxC30BImages[0],
    images: liectrouxC30BImages,
    description: "Liectroux C30B gives the catalog a more recognizable robot vacuum brand with an accessible one-unit MOQ for testing.",
    features: ["Liectroux C30B", "Best-Selling Listing", "Single-Unit MOQ", "Wet & Dry Category Fit"],
    specifications: {
      "Brand": "Liectroux",
      "Model": "C30B",
      "Tier": "Mid-market",
      "Validation": "Best-selling listing reference",
      "MOQ Bracket": "1 piece",
    },
    highlights: [
      "Recognizable brand can support stronger buyer trust",
      "Useful if you want something less generic in the lineup",
      "One-unit MOQ keeps the risk low",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/best-robot-vacuum-cleaner-with-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 30,
    name: "Xiaomi Mi S20+ Robot Vacuum Cleaner",
    brand: "Xiaomi",
    supplierPriceUSD: "$185-200",
    supplierPriceRange: [185, 200],
    minimumOrder: 10,
    rating: 4.8,
    reviewCount: 23,
    imageOffset: 1,
    image: xiaomiS20Images[0],
    images: xiaomiS20Images,
    description: "Xiaomi Mi S20+ adds a recognizable consumer-tech brand to the assortment for shoppers who value brand familiarity.",
    features: ["Mi Home App Control", "Smart Sweeping", "Recognizable Brand", "MOQ 10"],
    specifications: {
      "Brand": "Xiaomi",
      "Model": "S20+",
      "Control": "Mi Home app",
      "Tier": "Brand-led premium",
      "MOQ Bracket": "10 pieces",
    },
    highlights: [
      "Brand recognition can improve buyer confidence and conversion",
      "Useful premium option for comparison shoppers",
      "Modeled pricing still respects the same landed-cost assumptions",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 31,
    name: "Roborock S8 Pro Ultra Robot Vacuum",
    brand: "Roborock",
    supplierPriceUSD: "$320-350",
    supplierPriceRange: [320, 350],
    minimumOrder: 5,
    rating: 4.9,
    reviewCount: 34,
    imageOffset: 2,
    image: roborockS8Images[0],
    images: roborockS8Images,
    description: "Premium Roborock S8 Pro Ultra with advanced navigation and mopping capabilities for high-end customers.",
    features: ["VibraRise Mopping", "LDS Navigation", "Self-Emptying", "Premium Brand"],
    specifications: {
      "Brand": "Roborock",
      "Model": "S8 Pro Ultra",
      "Navigation": "LDS laser navigation",
      "Mopping": "VibraRise technology",
      "MOQ Bracket": "5 pieces",
    },
    highlights: [
      "Top-tier brand with strong market recognition",
      "Advanced mopping technology for premium positioning",
      "High ticket size for premium traffic sources",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 32,
    name: "Dreame X30 Ultra Robot Vacuum",
    brand: "Dreame",
    supplierPriceUSD: "$280-310",
    supplierPriceRange: [280, 310],
    minimumOrder: 5,
    rating: 4.8,
    reviewCount: 28,
    imageOffset: 3,
    image: dreameX30Images[0],
    images: dreameX30Images,
    description: "Dreame X30 Ultra offers premium cleaning performance with intelligent mapping and powerful suction.",
    features: ["8000Pa Suction", "AI Navigation", "Auto Mop Washing", "Self-Emptying"],
    specifications: {
      "Brand": "Dreame",
      "Model": "X30 Ultra",
      "Suction": "8000Pa",
      "Navigation": "AI-powered navigation",
      "MOQ Bracket": "5 pieces",
    },
    highlights: [
      "Strong suction claims for performance-focused buyers",
      "AI navigation appeals to tech-savvy customers",
      "Competitive premium positioning",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 33,
    name: "Ecovacs Deebot X2 Omni Robot Vacuum",
    brand: "Ecovacs",
    supplierPriceUSD: "$290-320",
    supplierPriceRange: [290, 320],
    minimumOrder: 5,
    rating: 4.8,
    reviewCount: 31,
    imageOffset: 0,
    image: ecovacsX2Images[0],
    images: ecovacsX2Images,
    description: "Ecovacs Deebot X2 Omni with dual laser navigation and advanced mopping system for discerning customers.",
    features: ["Dual Laser Navigation", "Auto Mop Cleaning", "Self-Emptying", "Voice Control"],
    specifications: {
      "Brand": "Ecovacs",
      "Model": "Deebot X2 Omni",
      "Navigation": "Dual laser navigation",
      "Mopping": "Auto mop cleaning station",
      "MOQ Bracket": "5 pieces",
    },
    highlights: [
      "Established premium brand with customer trust",
      "Advanced navigation technology",
      "Strong premium catalog anchor",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 34,
    name: "ILIFE A10s Robot Vacuum Cleaner",
    brand: "ILIFE",
    supplierPriceUSD: "$85-95",
    supplierPriceRange: [85, 95],
    minimumOrder: 2,
    rating: 4.5,
    reviewCount: 19,
    imageOffset: 1,
    image: ilifeA10sImages[0],
    images: ilifeA10sImages,
    description: "ILIFE A10s offers reliable performance at a mid-range price point with smart navigation features.",
    features: ["Smart Navigation", "Wet & Dry Cleaning", "App Control", "Mid-Range Price"],
    specifications: {
      "Brand": "ILIFE",
      "Model": "A10s",
      "Navigation": "Smart navigation",
      "Cleaning": "Wet and dry",
      "MOQ Bracket": "2 pieces",
    },
    highlights: [
      "Balanced mid-market option",
      "Recognizable brand in robot vacuum category",
      "Great value at mid-range pricing",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 35,
    name: "iRobot Roomba i3+ Robot Vacuum",
    brand: "iRobot",
    supplierPriceUSD: "$250-280",
    supplierPriceRange: [250, 280],
    minimumOrder: 10,
    rating: 4.7,
    reviewCount: 42,
    imageOffset: 2,
    image: irobotI3Images[0],
    images: irobotI3Images,
    description: "iRobot Roomba i3+ with Clean Base Automatic Dirt Disposal for customers seeking established reliability.",
    features: ["Clean Base Auto Empty", "Smart Mapping", "Premium Brand", "Reliable Performance"],
    specifications: {
      "Brand": "iRobot",
      "Model": "Roomba i3+",
      "Dock": "Clean Base auto empty",
      "Navigation": "Smart mapping",
      "MOQ Bracket": "10 pieces",
    },
    highlights: [
      "Highly recognized premium brand",
      "Proven reliability track record",
      "Strong conversion potential for brand-conscious buyers",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-cleaner.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 36,
    name: "Shark AI Robot Vacuum with XL HEPA",
    brand: "Shark",
    supplierPriceUSD: "$220-240",
    supplierPriceRange: [220, 240],
    minimumOrder: 5,
    rating: 4.6,
    reviewCount: 27,
    imageOffset: 3,
    image: sharkAIImages[0],
    images: sharkAIImages,
    description: "Shark AI Robot Vacuum with XL HEPA filter and home mapping for allergy-conscious households.",
    features: ["XL HEPA Filter", "Home Mapping", "Self-Emptying", "Allergy Control"],
    specifications: {
      "Brand": "Shark",
      "Model": "AI Robot",
      "Filtration": "XL HEPA filter",
      "Navigation": "Home mapping",
      "MOQ Bracket": "5 pieces",
    },
    highlights: [
      "HEPA filtration appeals to allergy-conscious buyers",
      "Strong Shark brand recognition",
      "Good value at premium pricing",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/shark-ai-robot-vacuum.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 37,
    name: "Eufy RoboVac X8 Hybrid Robot Vacuum",
    brand: "Eufy",
    supplierPriceUSD: "$180-200",
    supplierPriceRange: [180, 200],
    minimumOrder: 5,
    rating: 4.6,
    reviewCount: 25,
    imageOffset: 0,
    image: eufyX8Images[0],
    images: eufyX8Images,
    description: "Eufy RoboVac X8 Hybrid with twin turbines and laser navigation for powerful cleaning performance.",
    features: ["Twin Turbine Technology", "Laser Navigation", "2-in-1 Vacuum & Mop", "EufyHome App"],
    specifications: {
      "Brand": "Eufy",
      "Model": "RoboVac X8 Hybrid",
      "Suction": "Twin turbine technology",
      "Navigation": "Laser navigation",
      "MOQ Bracket": "5 pieces",
    },
    highlights: [
      "Strong Eufy brand recognition",
      "Hybrid vacuum and mop functionality",
      "Good value for premium features",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/eufy-robot-vacuum.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 38,
    name: "Yeedi C12 Robot Vacuum Cleaner",
    brand: "Yeedi",
    supplierPriceUSD: "$95-110",
    supplierPriceRange: [95, 110],
    minimumOrder: 2,
    rating: 4.5,
    reviewCount: 16,
    imageOffset: 1,
    image: yeediC12Images[0],
    images: yeediC12Images,
    description: "Yeedi C12 with visual navigation and 3-in-1 cleaning for budget-conscious smart home buyers.",
    features: ["Visual Navigation", "3-in-1 Cleaning", "App Control", "Budget-Friendly"],
    specifications: {
      "Brand": "Yeedi",
      "Model": "C12",
      "Navigation": "Visual navigation",
      "Cleaning": "3-in-1 sweep, suction, mop",
      "MOQ Bracket": "2 pieces",
    },
    highlights: [
      "Affordable entry to smart navigation",
      "Good value proposition for budget buyers",
      "Low MOQ for easy testing",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-cleaner-and-mop.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 39,
    name: "Neato D10 Connected Robot Vacuum",
    brand: "Neato",
    supplierPriceUSD: "$175-195",
    supplierPriceRange: [175, 195],
    minimumOrder: 3,
    rating: 4.6,
    reviewCount: 21,
    imageOffset: 2,
    image: neatoD10Images[0],
    images: neatoD10Images,
    description: "Neato D10 with D-shape design for corner cleaning and laser mapping for thorough coverage.",
    features: ["D-Shape Design", "Laser Mapping", "Corner Cleaning", "Neato App"],
    specifications: {
      "Brand": "Neato",
      "Model": "D10 Connected",
      "Design": "D-shape for corner cleaning",
      "Navigation": "Laser mapping",
      "MOQ Bracket": "3 pieces",
    },
    highlights: [
      "Strong suction for deep cleaning",
      "Good value at competitive pricing",
      "Compact design fits under furniture",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-cleaner.html",
    reviews: defaultReviews,
  }),
  buildProduct({
    id: 40,
    name: "Samsung Jet Bot+ Robot Vacuum",
    brand: "Samsung",
    supplierPriceUSD: "$240-260",
    supplierPriceRange: [240, 260],
    minimumOrder: 5,
    rating: 4.7,
    reviewCount: 29,
    imageOffset: 3,
    image: samsungJetBotImages[0],
    images: samsungJetBotImages,
    description: "Samsung Jet Bot+ with intelligent power control and clean station for Samsung ecosystem customers.",
    features: ["Intelligent Power Control", "Clean Station", "LiDAR Navigation", "SmartThings App"],
    specifications: {
      "Brand": "Samsung",
      "Model": "Jet Bot+",
      "Navigation": "LiDAR navigation",
      "Dock": "Clean station",
      "MOQ Bracket": "5 pieces",
    },
    highlights: [
      "Major brand with ecosystem integration",
      "Strong appeal to Samsung customers",
      "Premium positioning with good features",
    ],
    sourceUrl: "https://www.alibaba.com/showroom/robot-vacuum-cleaner.html",
    reviews: defaultReviews,
  }),
];

export const getProductById = (id: number) => catalogProducts.find((product) => product.id === id);
