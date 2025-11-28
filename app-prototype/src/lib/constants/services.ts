// Complete service catalog with subcategories
export interface Service {
  id: string;
  name: string;
  duration?: string;
  priceRange?: string;
}

export interface ServiceSubcategory {
  id: string;
  name: string;
  description?: string;
  services: Service[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  subcategories: ServiceSubcategory[];
}

export const SERVICE_CATALOG: ServiceCategory[] = [
  {
    id: "beauty",
    name: "Beauty",
    description: "Makeup, facials, skin treatments, brows, lashes",
    subcategories: [
      {
        id: "face-skin",
        name: "Face & Skin",
        description: "Professional facial treatments and skin care",
        services: [
          { id: "basic-facial", name: "Basic facial", duration: "45 min", priceRange: "฿800-1,200" },
          { id: "deep-cleansing-facial", name: "Deep cleansing facial", duration: "60 min", priceRange: "฿1,200-1,800" },
          { id: "hydrating-facial", name: "Hydrating facial", duration: "60 min", priceRange: "฿1,500-2,200" },
          { id: "anti-aging-facial", name: "Anti-aging facial", duration: "75 min", priceRange: "฿2,000-3,000" },
          { id: "vitamin-c-facial", name: "Vitamin C facial", duration: "60 min", priceRange: "฿1,800-2,500" },
          { id: "collagen-facial", name: "Collagen facial", duration: "60 min", priceRange: "฿2,200-3,200" },
          { id: "microdermabrasion", name: "Microdermabrasion", duration: "45 min", priceRange: "฿1,500-2,500" },
          { id: "chemical-peel-light", name: "Chemical peel (light)", duration: "30 min", priceRange: "฿1,800-2,800" },
          { id: "led-therapy-addon", name: "LED therapy add-on", duration: "20 min", priceRange: "฿500-800" },
        ],
      },
      {
        id: "brows-lashes",
        name: "Brows & Lashes",
        description: "Eyebrow and eyelash enhancement services",
        services: [
          { id: "eyebrow-threading", name: "Eyebrow threading", duration: "15 min", priceRange: "฿150-300" },
          { id: "eyebrow-waxing", name: "Eyebrow waxing", duration: "15 min", priceRange: "฿200-350" },
          { id: "brow-tinting", name: "Brow tinting", duration: "20 min", priceRange: "฿300-500" },
          { id: "brow-lamination", name: "Brow lamination", duration: "45 min", priceRange: "฿800-1,200" },
          { id: "eyelash-tint", name: "Eyelash tint", duration: "30 min", priceRange: "฿400-600" },
          { id: "eyelash-lift", name: "Eyelash lift", duration: "60 min", priceRange: "฿1,000-1,500" },
          { id: "lash-extensions-classic", name: "Lash extensions (classic)", duration: "120 min", priceRange: "฿1,500-2,500" },
          { id: "lash-extensions-hybrid", name: "Lash extensions (hybrid)", duration: "150 min", priceRange: "฿2,000-3,000" },
          { id: "lash-extensions-volume", name: "Lash extensions (volume)", duration: "180 min", priceRange: "฿2,500-4,000" },
        ],
      },
      {
        id: "makeup",
        name: "Makeup",
        description: "Professional makeup services for all occasions",
        services: [
          { id: "everyday-glam-makeup", name: "Everyday/glam makeup", duration: "45 min", priceRange: "฿800-1,500" },
          { id: "party-event-makeup", name: "Party/Event makeup", duration: "60 min", priceRange: "฿1,500-2,500" },
          { id: "bridal-makeup-trial", name: "Bridal makeup trial", duration: "90 min", priceRange: "฿2,000-3,500" },
          { id: "bridal-makeup-package", name: "Bridal makeup package", duration: "180 min", priceRange: "฿5,000-10,000" },
          { id: "editorial-makeup", name: "Editorial makeup", duration: "90 min", priceRange: "฿2,500-4,000" },
          { id: "airbrush-makeup", name: "Airbrush makeup", duration: "60 min", priceRange: "฿2,000-3,500" },
        ],
      },
      {
        id: "hair-removal",
        name: "Hair Removal",
        description: "Professional waxing services",
        services: [
          { id: "full-face-wax", name: "Full face wax", duration: "30 min", priceRange: "฿500-800" },
          { id: "upper-lip-chin", name: "Upper lip / chin", duration: "15 min", priceRange: "฿200-350" },
          { id: "full-arms", name: "Full arms", duration: "30 min", priceRange: "฿600-900" },
          { id: "half-arms", name: "Half arms", duration: "20 min", priceRange: "฿400-600" },
          { id: "full-legs", name: "Full legs", duration: "45 min", priceRange: "฿900-1,400" },
          { id: "half-legs", name: "Half legs", duration: "30 min", priceRange: "฿600-900" },
          { id: "underarms", name: "Underarms", duration: "15 min", priceRange: "฿250-400" },
          { id: "body-waxing-packages", name: "Body waxing packages", duration: "90 min", priceRange: "฿2,000-3,500" },
        ],
      },
    ],
  },
  {
    id: "nails",
    name: "Nails",
    description: "Professional nail care and art",
    subcategories: [
      {
        id: "manicures",
        name: "Manicures",
        description: "Hand and nail care services",
        services: [
          { id: "classic-manicure", name: "Classic manicure", duration: "45 min", priceRange: "฿400-700" },
          { id: "gel-manicure", name: "Gel manicure", duration: "60 min", priceRange: "฿600-1,000" },
          { id: "french-manicure", name: "French manicure", duration: "60 min", priceRange: "฿700-1,100" },
          { id: "nail-art-addon", name: "Nail art add-on", duration: "30 min", priceRange: "฿300-800" },
          { id: "cut-file-polish", name: "Cut/file/polish", duration: "30 min", priceRange: "฿300-500" },
        ],
      },
      {
        id: "pedicures",
        name: "Pedicures",
        description: "Foot and nail care services",
        services: [
          { id: "classic-pedicure", name: "Classic pedicure", duration: "60 min", priceRange: "฿500-900" },
          { id: "gel-pedicure", name: "Gel pedicure", duration: "75 min", priceRange: "฿700-1,200" },
          { id: "spa-pedicure", name: "Spa pedicure", duration: "90 min", priceRange: "฿900-1,500" },
          { id: "foot-mask-addon", name: "Foot mask add-on", duration: "20 min", priceRange: "฿200-400" },
        ],
      },
      {
        id: "extensions",
        name: "Extensions & Maintenance",
        description: "Nail extensions and repair services",
        services: [
          { id: "acrylic-extensions", name: "Acrylic extensions", duration: "120 min", priceRange: "฿1,200-2,000" },
          { id: "gel-extensions", name: "Gel extensions", duration: "120 min", priceRange: "฿1,500-2,500" },
          { id: "refill-acrylic", name: "Refill (acrylic)", duration: "60 min", priceRange: "฿600-1,000" },
          { id: "refill-gel", name: "Refill (gel)", duration: "60 min", priceRange: "฿700-1,200" },
          { id: "nail-repair", name: "Nail repair", duration: "15 min", priceRange: "฿200-400" },
          { id: "removal-gel", name: "Removal (gel)", duration: "30 min", priceRange: "฿300-500" },
          { id: "removal-acrylic", name: "Removal (acrylic)", duration: "45 min", priceRange: "฿400-600" },
        ],
      },
    ],
  },
  {
    id: "hair",
    name: "Hair",
    description: "Cutting, color, styling, and treatments",
    subcategories: [
      {
        id: "haircuts",
        name: "Haircuts",
        description: "Professional hair cutting services",
        services: [
          { id: "womens-haircut", name: "Women's haircut", duration: "45 min", priceRange: "฿600-1,500" },
          { id: "mens-haircut", name: "Men's haircut", duration: "30 min", priceRange: "฿400-800" },
          { id: "kids-haircut", name: "Kids haircut", duration: "30 min", priceRange: "฿350-600" },
          { id: "blow-dry-short", name: "Blow-dry (short)", duration: "30 min", priceRange: "฿400-700" },
          { id: "blow-dry-medium", name: "Blow-dry (medium)", duration: "45 min", priceRange: "฿600-900" },
          { id: "blow-dry-long", name: "Blow-dry (long)", duration: "60 min", priceRange: "฿800-1,200" },
          { id: "wash-blowout", name: "Wash & blowout", duration: "60 min", priceRange: "฿700-1,200" },
        ],
      },
      {
        id: "styling",
        name: "Styling",
        description: "Hair styling for special occasions",
        services: [
          { id: "curl-styling", name: "Curl styling", duration: "60 min", priceRange: "฿800-1,500" },
          { id: "straighten-style", name: "Straighten & style", duration: "75 min", priceRange: "฿1,000-1,800" },
          { id: "updos", name: "Updos", duration: "90 min", priceRange: "฿1,500-2,500" },
          { id: "bridal-hairstyling", name: "Bridal hairstyling", duration: "120 min", priceRange: "฿3,000-6,000" },
        ],
      },
      {
        id: "coloring",
        name: "Coloring",
        description: "Hair coloring and highlighting services",
        services: [
          { id: "root-color", name: "Root color", duration: "90 min", priceRange: "฿1,500-2,500" },
          { id: "full-hair-color", name: "Full hair color", duration: "120 min", priceRange: "฿2,500-4,500" },
          { id: "highlights-partial", name: "Highlights (partial)", duration: "120 min", priceRange: "฿2,000-3,500" },
          { id: "highlights-full", name: "Highlights (full)", duration: "180 min", priceRange: "฿3,500-6,000" },
          { id: "balayage", name: "Balayage", duration: "180 min", priceRange: "฿4,000-8,000" },
          { id: "toning", name: "Toning", duration: "45 min", priceRange: "฿800-1,500" },
          { id: "hair-gloss", name: "Hair gloss", duration: "45 min", priceRange: "฿1,000-1,800" },
        ],
      },
      {
        id: "treatments",
        name: "Treatments",
        description: "Hair care and treatment services",
        services: [
          { id: "hair-spa", name: "Hair spa", duration: "60 min", priceRange: "฿1,200-2,000" },
          { id: "keratin-treatment", name: "Keratin treatment", duration: "180 min", priceRange: "฿3,500-7,000" },
          { id: "protein-treatment", name: "Protein treatment", duration: "60 min", priceRange: "฿1,500-2,500" },
          { id: "scalp-detox", name: "Scalp detox", duration: "45 min", priceRange: "฿1,000-1,800" },
          { id: "olaplex-treatment", name: "Olaplex treatment", duration: "45 min", priceRange: "฿1,500-2,500" },
        ],
      },
    ],
  },
  {
    id: "pet-care",
    name: "Pet Care",
    description: "Grooming, walking, sitting, and training",
    subcategories: [
      {
        id: "grooming",
        name: "Grooming",
        description: "Professional pet grooming services",
        services: [
          { id: "basic-grooming", name: "Basic grooming", duration: "60 min", priceRange: "฿600-1,200" },
          { id: "full-grooming", name: "Full grooming", duration: "120 min", priceRange: "฿1,200-2,500" },
          { id: "bath-blow-dry", name: "Bath + blow dry", duration: "60 min", priceRange: "฿500-1,000" },
          { id: "nail-trim", name: "Nail trim", duration: "15 min", priceRange: "฿150-300" },
          { id: "ear-cleaning", name: "Ear cleaning", duration: "15 min", priceRange: "฿150-300" },
          { id: "anal-gland-expression", name: "Anal gland expression", duration: "15 min", priceRange: "฿200-400" },
        ],
      },
      {
        id: "walking",
        name: "Walking",
        description: "Dog walking services",
        services: [
          { id: "walk-15min", name: "15-min walk", duration: "15 min", priceRange: "฿150-300" },
          { id: "walk-30min", name: "30-min walk", duration: "30 min", priceRange: "฿250-450" },
          { id: "walk-60min", name: "60-min walk", duration: "60 min", priceRange: "฿400-700" },
        ],
      },
      {
        id: "sitting-visits",
        name: "Sitting & Home Visits",
        description: "Pet care at your home",
        services: [
          { id: "pet-sitting-hourly", name: "Pet sitting (hourly)", duration: "60 min", priceRange: "฿300-600" },
          { id: "pet-day-care", name: "Pet day care", duration: "8 hours", priceRange: "฿1,500-3,000" },
          { id: "home-checkin", name: "Home check-in (food, water, litter)", duration: "30 min", priceRange: "฿200-400" },
        ],
      },
      {
        id: "training",
        name: "Training",
        description: "Pet behavior and training services",
        services: [
          { id: "puppy-training", name: "Puppy training session", duration: "60 min", priceRange: "฿800-1,500" },
          { id: "behavior-consultation", name: "Behavior consultation", duration: "90 min", priceRange: "฿1,200-2,000" },
        ],
      },
    ],
  },
  {
    id: "cleaning",
    name: "Cleaning",
    description: "Home and office cleaning services",
    subcategories: [
      {
        id: "home-cleaning",
        name: "Home Cleaning",
        description: "Residential cleaning services",
        services: [
          { id: "general-home-cleaning", name: "General home cleaning (1 cleaner)", duration: "3 hours", priceRange: "฿800-1,500" },
          { id: "deep-cleaning", name: "Deep cleaning", duration: "6 hours", priceRange: "฿2,000-4,000" },
          { id: "kitchen-deep-clean", name: "Kitchen deep clean", duration: "2 hours", priceRange: "฿800-1,500" },
          { id: "bathroom-deep-clean", name: "Bathroom deep clean", duration: "1.5 hours", priceRange: "฿600-1,000" },
          { id: "move-in-out-cleaning", name: "Move-in/move-out cleaning", duration: "8 hours", priceRange: "฿3,000-6,000" },
          { id: "balcony-cleaning", name: "Balcony cleaning", duration: "1 hour", priceRange: "฿400-700" },
        ],
      },
      {
        id: "addons",
        name: "Add-ons",
        description: "Additional cleaning services",
        services: [
          { id: "inside-fridge", name: "Inside fridge", duration: "30 min", priceRange: "฿300-500" },
          { id: "inside-oven", name: "Inside oven", duration: "45 min", priceRange: "฿400-700" },
          { id: "inside-cabinets", name: "Inside cabinets", duration: "60 min", priceRange: "฿500-800" },
          { id: "windows-interior", name: "Windows (interior)", duration: "60 min", priceRange: "฿500-900" },
          { id: "ironing-services", name: "Ironing services", duration: "60 min", priceRange: "฿400-700" },
        ],
      },
      {
        id: "office-cleaning",
        name: "Office Cleaning",
        description: "Commercial cleaning services",
        services: [
          { id: "general-office-cleaning", name: "General office cleaning", duration: "4 hours", priceRange: "฿1,500-3,000" },
          { id: "meeting-room-refresh", name: "Meeting room refresh", duration: "1 hour", priceRange: "฿400-700" },
          { id: "pantry-cleaning", name: "Pantry cleaning", duration: "1 hour", priceRange: "฿400-700" },
        ],
      },
    ],
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Massage and alternative therapies",
    subcategories: [
      {
        id: "massage",
        name: "Massage",
        description: "Professional massage services",
        services: [
          { id: "swedish-massage-60", name: "Swedish massage (60 min)", duration: "60 min", priceRange: "฿1,000-1,800" },
          { id: "swedish-massage-90", name: "Swedish massage (90 min)", duration: "90 min", priceRange: "฿1,500-2,500" },
          { id: "deep-tissue-60", name: "Deep tissue massage (60 min)", duration: "60 min", priceRange: "฿1,200-2,000" },
          { id: "deep-tissue-90", name: "Deep tissue massage (90 min)", duration: "90 min", priceRange: "฿1,800-3,000" },
          { id: "aromatherapy-60", name: "Aromatherapy massage (60 min)", duration: "60 min", priceRange: "฿1,200-2,000" },
          { id: "aromatherapy-90", name: "Aromatherapy massage (90 min)", duration: "90 min", priceRange: "฿1,800-3,000" },
          { id: "hot-stone-90", name: "Hot stone massage (90 min)", duration: "90 min", priceRange: "฿2,000-3,500" },
          { id: "prenatal-massage", name: "Prenatal massage (60 min)", duration: "60 min", priceRange: "฿1,500-2,500" },
          { id: "sports-massage", name: "Sports massage (60 min)", duration: "60 min", priceRange: "฿1,200-2,000" },
        ],
      },
      {
        id: "therapies",
        name: "Therapies",
        description: "Alternative wellness therapies",
        services: [
          { id: "reflexology-60", name: "Reflexology (60 min)", duration: "60 min", priceRange: "฿800-1,500" },
          { id: "thai-stretching", name: "Thai stretching (90 min)", duration: "90 min", priceRange: "฿1,200-2,000" },
          { id: "lymphatic-drainage", name: "Lymphatic drainage (60 min)", duration: "60 min", priceRange: "฿1,500-2,500" },
          { id: "head-shoulder-massage", name: "Head/shoulder massage (30 min)", duration: "30 min", priceRange: "฿500-900" },
        ],
      },
      {
        id: "packages",
        name: "Packages",
        description: "Special wellness packages",
        services: [
          { id: "couples-massage-60", name: "Couples massage (60 min)", duration: "60 min", priceRange: "฿2,000-3,500" },
          { id: "couples-massage-90", name: "Couples massage (90 min)", duration: "90 min", priceRange: "฿3,000-5,000" },
          { id: "wellness-package-120", name: "Wellness package (120 min)", duration: "120 min", priceRange: "฿2,500-4,000" },
        ],
      },
    ],
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "Personal training and coaching",
    subcategories: [
      {
        id: "training",
        name: "Training",
        description: "One-on-one training sessions",
        services: [
          { id: "personal-training-home", name: "Personal training (home)", duration: "60 min", priceRange: "฿800-1,500" },
          { id: "strength-training", name: "Strength training session", duration: "60 min", priceRange: "฿800-1,500" },
          { id: "hiit-session", name: "HIIT session", duration: "45 min", priceRange: "฿700-1,200" },
          { id: "pilates-mat", name: "Pilates mat session", duration: "60 min", priceRange: "฿900-1,600" },
          { id: "yoga-session", name: "Yoga session", duration: "60 min", priceRange: "฿800-1,500" },
          { id: "boxing-kickboxing", name: "Boxing/kickboxing PT", duration: "60 min", priceRange: "฿1,000-1,800" },
        ],
      },
      {
        id: "assessments",
        name: "Assessments",
        description: "Fitness evaluation and coaching",
        services: [
          { id: "body-composition", name: "Body composition assessment", duration: "30 min", priceRange: "฿500-800" },
          { id: "form-coaching", name: "Form coaching session", duration: "45 min", priceRange: "฿700-1,200" },
        ],
      },
      {
        id: "plans",
        name: "Plans",
        description: "Training packages and plans",
        services: [
          { id: "weekly-package", name: "Weekly package (4 sessions)", duration: "4 hours", priceRange: "฿3,000-5,500" },
          { id: "monthly-package", name: "Monthly package (12 sessions)", duration: "12 hours", priceRange: "฿8,000-15,000" },
        ],
      },
    ],
  },
];

// Helper function to get category by ID
export function getCategoryById(categoryId: string): ServiceCategory | undefined {
  return SERVICE_CATALOG.find((cat) => cat.id === categoryId);
}

// Helper function to get subcategory by ID
export function getSubcategoryById(categoryId: string, subcategoryId: string): ServiceSubcategory | undefined {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find((sub) => sub.id === subcategoryId);
}

// Helper function to get service by ID across all categories
export function getServiceById(serviceId: string): { service: Service; subcategory: ServiceSubcategory; category: ServiceCategory } | undefined {
  for (const category of SERVICE_CATALOG) {
    for (const subcategory of category.subcategories) {
      const service = subcategory.services.find((s) => s.id === serviceId);
      if (service) {
        return { service, subcategory, category };
      }
    }
  }
  return undefined;
}
