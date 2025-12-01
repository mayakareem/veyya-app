export interface BrandProduct {
  name: string;
  description: string;
  features: string[];
  price?: string;
}

export interface BrandService {
  name: string;
  description: string;
  duration: string;
  price: string;
  products: BrandProduct[];
}

export interface Voucher {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minSpend: number;
  expiresAt: string;
  description: string;
}

export interface ServiceBundle {
  name: string;
  description: string;
  services: string[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  voucherCode?: string;
  validUntil: string;
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  logo: string;
  services: BrandService[];
  about: string;
  certifications?: string[];
  vouchers: Voucher[];
  bundles: ServiceBundle[];
}

export const BRAND_COLLABORATIONS: Record<string, Brand> = {
  loreal: {
    id: "loreal",
    name: "L'Oréal Professional",
    tagline: "Premium Hair Care Excellence",
    description: "Professional salon-quality hair treatments using L'Oréal's cutting-edge formulations and innovative color technology.",
    category: "Hair Care",
    logo: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=80&fit=crop",
    about: "L'Oréal Professional brings over 100 years of hair care expertise to Veyya. Our certified professionals use only authentic L'Oréal products to deliver salon-quality results in the comfort of your home.",
    certifications: ["L'Oréal Certified Colorist", "Professional Styling Specialist"],
    services: [
      {
        name: "Color Excellence",
        description: "Professional hair coloring with L'Oréal's INOA ammonia-free technology",
        duration: "2-3 hours",
        price: "฿2,500 - ฿4,500",
        products: [
          {
            name: "L'Oréal INOA Color",
            description: "Revolutionary ammonia-free permanent color",
            features: [
              "Zero ammonia formula",
              "60% shinier hair",
              "100% grey coverage",
              "Long-lasting vibrant color"
            ],
          },
          {
            name: "Série Expert Color Mask",
            description: "Color protection and nourishment treatment",
            features: [
              "UV protection",
              "Color lock technology",
              "Intense hydration",
              "Extends color vibrancy"
            ],
          }
        ]
      },
      {
        name: "Keratin Smoothing Treatment",
        description: "Professional smoothing treatment with L'Oréal Smartbond technology",
        duration: "3-4 hours",
        price: "฿3,500 - ฿5,500",
        products: [
          {
            name: "L'Oréal Smartbond",
            description: "Bond strengthening system for healthier hair",
            features: [
              "Protects hair bonds during service",
              "Reduces breakage by up to 94%",
              "Improves hair strength",
              "Works with any chemical service"
            ],
          },
          {
            name: "Liss Unlimited Smoothing Treatment",
            description: "Pro-keratin smoothing system",
            features: [
              "Frizz control for up to 3 months",
              "Heat protection up to 230°C",
              "Humidity resistance",
              "Natural movement retention"
            ],
          }
        ]
      },
      {
        name: "Hair Spa Treatment",
        description: "Luxurious scalp and hair restoration therapy",
        duration: "90 minutes",
        price: "฿1,800 - ฿2,500",
        products: [
          {
            name: "Absolut Repair Molecular",
            description: "Intensive repair for damaged hair",
            features: [
              "Peptides + ceramides formula",
              "Repairs from within",
              "77% less breakage",
              "Silky smooth finish"
            ],
          },
          {
            name: "Scalp Advanced Serum",
            description: "Professional scalp treatment",
            features: [
              "Niacinamide infused",
              "Soothes irritation",
              "Balances scalp pH",
              "Promotes healthy hair growth"
            ],
          }
        ]
      }
    ],
    vouchers: [
      {
        code: "LOREAL20",
        discount: 20,
        type: "percentage",
        minSpend: 2000,
        expiresAt: "2025-12-31",
        description: "20% off all L'Oréal hair treatments"
      },
      {
        code: "COLOR500",
        discount: 500,
        type: "fixed",
        minSpend: 3000,
        expiresAt: "2025-12-25",
        description: "฿500 off Color Excellence service"
      },
      {
        code: "FIRSTLOREAL",
        discount: 15,
        type: "percentage",
        minSpend: 1500,
        expiresAt: "2026-01-15",
        description: "15% off your first L'Oréal treatment"
      }
    ],
    bundles: [
      {
        name: "Complete Color Transformation",
        description: "Color Excellence + Hair Spa Treatment",
        services: ["Color Excellence", "Hair Spa Treatment"],
        originalPrice: 4300,
        bundlePrice: 3499,
        savings: 801,
        voucherCode: "COLORBUNDLE",
        validUntil: "2025-12-31"
      },
      {
        name: "Smoothing & Repair Package",
        description: "Keratin Smoothing + Hair Spa with Smartbond",
        services: ["Keratin Smoothing Treatment", "Hair Spa Treatment"],
        originalPrice: 5500,
        bundlePrice: 4599,
        savings: 901,
        voucherCode: "SMOOTHPRO",
        validUntil: "2025-12-31"
      }
    ]
  },
  opi: {
    id: "opi",
    name: "OPI",
    tagline: "Luxury Nail Artistry",
    description: "Premium manicure and pedicure services using OPI's iconic nail lacquers and professional-grade treatments.",
    category: "Nail Care",
    logo: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=80&fit=crop",
    about: "OPI has been the nail industry leader for over 40 years. Our Veyya technicians are trained in the latest OPI techniques and use only genuine OPI products for chip-resistant, salon-quality nails.",
    certifications: ["OPI Certified Nail Technician", "Gel Color Specialist"],
    services: [
      {
        name: "OPI GelColor Manicure",
        description: "Long-lasting gel manicure with OPI's signature colors",
        duration: "60 minutes",
        price: "฿800 - ฿1,200",
        products: [
          {
            name: "OPI GelColor",
            description: "Professional gel polish system",
            features: [
              "Lasts up to 3 weeks",
              "No chips or smudges",
              "Vibrant color selection (200+ shades)",
              "Fast LED curing"
            ],
          },
          {
            name: "ProSpa Nail & Cuticle Oil",
            description: "Nourishing treatment oil",
            features: [
              "Cupuaçu butter infused",
              "White tea extract",
              "Softens cuticles",
              "Strengthens nails"
            ],
          }
        ]
      },
      {
        name: "OPI Infinite Shine Manicure",
        description: "3-step long-wear polish system",
        duration: "45 minutes",
        price: "฿600 - ฿900",
        products: [
          {
            name: "OPI Infinite Shine",
            description: "Extended wear lacquer system",
            features: [
              "Lasts up to 11 days",
              "Gel-like shine",
              "Easy removal (no soaking)",
              "Over 200 shades available"
            ],
          },
          {
            name: "ProSpa Exfoliating Sugar Scrub",
            description: "Hand and cuticle treatment",
            features: [
              "Natural sugar crystals",
              "Coconut oil enriched",
              "Gentle exfoliation",
              "Hydrating formula"
            ],
          }
        ]
      },
      {
        name: "Luxury Pedicure",
        description: "Complete foot care treatment with OPI products",
        duration: "75 minutes",
        price: "฿1,000 - ฿1,500",
        products: [
          {
            name: "OPI GelColor Pedicure",
            description: "Long-lasting gel polish for toes",
            features: [
              "Chip-resistant formula",
              "Vibrant color payoff",
              "Perfect for sandal season",
              "Professional finish"
            ],
          },
          {
            name: "ProSpa Advanced Callus Softening Gel",
            description: "Professional callus treatment",
            features: [
              "Lactic acid formula",
              "Softens rough skin",
              "Quick-acting",
              "Spa-quality results"
            ],
          }
        ]
      }
    ],
    vouchers: [
      {
        code: "OPI25",
        discount: 25,
        type: "percentage",
        minSpend: 1000,
        expiresAt: "2025-12-31",
        description: "25% off all OPI nail services"
      },
      {
        code: "GELCOLOR300",
        discount: 300,
        type: "fixed",
        minSpend: 1500,
        expiresAt: "2025-12-20",
        description: "฿300 off GelColor treatments"
      },
      {
        code: "NAILSPA",
        discount: 20,
        type: "percentage",
        minSpend: 800,
        expiresAt: "2026-01-10",
        description: "20% off manicure & pedicure combo"
      }
    ],
    bundles: [
      {
        name: "Complete Nail Care Package",
        description: "GelColor Manicure + Luxury Pedicure",
        services: ["OPI GelColor Manicure", "Luxury Pedicure"],
        originalPrice: 2200,
        bundlePrice: 1799,
        savings: 401,
        voucherCode: "NAILPERFECT",
        validUntil: "2025-12-31"
      },
      {
        name: "Monthly Maintenance",
        description: "2x GelColor Manicures (valid for 60 days)",
        services: ["OPI GelColor Manicure", "OPI GelColor Manicure"],
        originalPrice: 2400,
        bundlePrice: 1999,
        savings: 401,
        voucherCode: "MONTHLYNAILS",
        validUntil: "2025-12-31"
      }
    ]
  },
  aveda: {
    id: "aveda",
    name: "Aveda",
    tagline: "Plant-Powered Wellness",
    description: "Holistic beauty and wellness treatments using Aveda's pure plant and flower essences.",
    category: "Wellness & Spa",
    logo: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=80&fit=crop",
    about: "Aveda brings the power of nature to your wellness journey. Our certified aromatherapists and estheticians use 100% certified organic essential oils and plant-based formulas for transformative treatments.",
    certifications: ["Aveda Institute Certified", "Aromatherapy Specialist"],
    services: [
      {
        name: "Botanical Therapy Massage",
        description: "Customized aromatherapy massage with pure essential oils",
        duration: "90 minutes",
        price: "฿2,200 - ฿2,800",
        products: [
          {
            name: "Aveda Stress-Fix Body Lotion",
            description: "Aromatherapy body treatment",
            features: [
              "Lavender, lavandin & clary sage",
              "Reduces stress and tension",
              "Organic shea butter",
              "Certified vegan formula"
            ],
          },
          {
            name: "Blue Oil Balancing Concentrate",
            description: "Therapeutic body oil",
            features: [
              "98% naturally derived",
              "Blue chamomile & tamanu",
              "Balances and soothes",
              "Multi-purpose wellness oil"
            ],
          }
        ]
      },
      {
        name: "Tulasāra Facial",
        description: "Radiance-enhancing facial with Ayurvedic principles",
        duration: "75 minutes",
        price: "฿2,500 - ฿3,200",
        products: [
          {
            name: "Tulasāra Wedding Masque",
            description: "Overnight bright treatment",
            features: [
              "Wild turmeric & neem",
              "95% naturally derived",
              "Evens skin tone",
              "Bridal-ready radiance"
            ],
          },
          {
            name: "Botanical Kinetics Intense Hydrator",
            description: "Deep hydration treatment",
            features: [
              "Hyaluronic acid",
              "Plant-based moisturizers",
              "24-hour hydration",
              "Plumps and smooths"
            ],
          }
        ]
      },
      {
        name: "Scalp Solutions Treatment",
        description: "Deep cleansing and balancing scalp therapy",
        duration: "60 minutes",
        price: "฿1,500 - ฿2,000",
        products: [
          {
            name: "Pramasana Purifying Scalp Cleanser",
            description: "Deep exfoliating treatment",
            features: [
              "Seaweed-derived ingredients",
              "Removes buildup",
              "96% naturally derived",
              "Balances scalp"
            ],
          },
          {
            name: "Invati Advanced Scalp Revitalizer",
            description: "Energizing scalp treatment",
            features: [
              "Reduces hair loss by 53%",
              "Turmeric & ginseng",
              "Increases scalp microcirculation",
              "Clinically proven"
            ],
          }
        ]
      }
    ],
    vouchers: [
      {
        code: "AVEDA30",
        discount: 30,
        type: "percentage",
        minSpend: 2500,
        expiresAt: "2025-12-31",
        description: "30% off all Aveda wellness treatments"
      },
      {
        code: "BOTANICAL400",
        discount: 400,
        type: "fixed",
        minSpend: 3000,
        expiresAt: "2025-12-28",
        description: "฿400 off Botanical Therapy Massage"
      },
      {
        code: "WELLNESS20",
        discount: 20,
        type: "percentage",
        minSpend: 1800,
        expiresAt: "2026-01-20",
        description: "20% off facial and massage combo"
      }
    ],
    bundles: [
      {
        name: "Complete Wellness Ritual",
        description: "Botanical Massage + Tulasāra Facial",
        services: ["Botanical Therapy Massage", "Tulasāra Facial"],
        originalPrice: 4700,
        bundlePrice: 3899,
        savings: 801,
        voucherCode: "WELLNESSZEN",
        validUntil: "2025-12-31"
      },
      {
        name: "Hair & Scalp Revival",
        description: "Scalp Solutions + Hair Spa Treatment",
        services: ["Scalp Solutions Treatment", "Hair Spa Treatment"],
        originalPrice: 3500,
        bundlePrice: 2899,
        savings: 601,
        voucherCode: "SCALPCARE",
        validUntil: "2025-12-31"
      }
    ]
  },
  dermalogica: {
    id: "dermalogica",
    name: "Dermalogica",
    tagline: "Professional Skincare Science",
    description: "Advanced clinical skincare treatments tailored to your unique skin needs by certified skin therapists.",
    category: "Skincare",
    logo: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=80&fit=crop",
    about: "Dermalogica's professional-grade skincare has transformed skin for over 30 years. Our expert skin therapists use Face Mapping® skin analysis to customize treatments with the most advanced formulations.",
    certifications: ["Dermalogica Expert", "Face Mapping® Certified"],
    services: [
      {
        name: "ProSkin 60 Facial",
        description: "Customized professional facial with Face Mapping® analysis",
        duration: "60 minutes",
        price: "฿2,800 - ฿3,500",
        products: [
          {
            name: "AGE Smart MultiVitamin Power Serum",
            description: "Age-fighting vitamin treatment",
            features: [
              "Vitamins A, C, E & F",
              "Reduces fine lines",
              "Brightens skin tone",
              "Antioxidant protection"
            ],
          },
          {
            name: "Dynamic Skin Recovery SPF50",
            description: "Protective moisturizer",
            features: [
              "Broad spectrum protection",
              "Peptide complex",
              "Firms and hydrates",
              "Environmental defense"
            ],
          }
        ]
      },
      {
        name: "BioLumin-C Facial",
        description: "Vitamin C brightening treatment for radiant skin",
        duration: "75 minutes",
        price: "฿3,200 - ฿4,000",
        products: [
          {
            name: "BioLumin-C Serum",
            description: "High-performance vitamin C serum",
            features: [
              "Ultra-stable vitamin C",
              "Increases skin luminosity",
              "Lactic acid exfoliation",
              "Visible results in 7 days"
            ],
          },
          {
            name: "BioLumin-C Eye Serum",
            description: "Brightening eye treatment",
            features: [
              "Reduces dark circles",
              "Vitamin C & peptides",
              "Smooths fine lines",
              "Caffeine energizing"
            ],
          }
        ]
      },
      {
        name: "Skin Resurfacing Treatment",
        description: "Professional microdermabrasion and peel treatment",
        duration: "90 minutes",
        price: "฿3,800 - ฿5,000",
        products: [
          {
            name: "Daily Microfoliant",
            description: "Rice-based enzyme powder exfoliant",
            features: [
              "Gentle daily exfoliation",
              "Salicylic acid",
              "Brightens complexion",
              "Smooths texture"
            ],
          },
          {
            name: "Pro Power Peel",
            description: "Professional strength resurfacing",
            features: [
              "30% lactic acid complex",
              "Accelerated cell renewal",
              "Clinical-grade results",
              "Minimal downtime"
            ],
          }
        ]
      }
    ],
    vouchers: [
      {
        code: "DERMA35",
        discount: 35,
        type: "percentage",
        minSpend: 3500,
        expiresAt: "2025-12-31",
        description: "35% off all Dermalogica facials"
      },
      {
        code: "SKIN600",
        discount: 600,
        type: "fixed",
        minSpend: 4000,
        expiresAt: "2025-12-22",
        description: "฿600 off skin resurfacing treatment"
      },
      {
        code: "FIRSTSKIN",
        discount: 25,
        type: "percentage",
        minSpend: 2500,
        expiresAt: "2026-01-25",
        description: "25% off your first Dermalogica facial"
      }
    ],
    bundles: [
      {
        name: "Anti-Aging Power Duo",
        description: "BioLumin-C Facial + Skin Resurfacing",
        services: ["BioLumin-C Facial", "Skin Resurfacing Treatment"],
        originalPrice: 7000,
        bundlePrice: 5799,
        savings: 1201,
        voucherCode: "AGELESS",
        validUntil: "2025-12-31"
      },
      {
        name: "Monthly Glow Package",
        description: "3x ProSkin 60 Facials (valid for 90 days)",
        services: ["ProSkin 60 Facial", "ProSkin 60 Facial", "ProSkin 60 Facial"],
        originalPrice: 9600,
        bundlePrice: 7999,
        savings: 1601,
        voucherCode: "GLOWMONTH",
        validUntil: "2025-12-31"
      }
    ]
  },
  aromatherapy: {
    id: "aromatherapy",
    name: "Aromatherapy Associates",
    tagline: "Essential Oil Wellness",
    description: "Therapeutic aromatherapy massage treatments using pure essential oil blends for mind and body wellness.",
    category: "Massage & Wellness",
    logo: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=80&fit=crop",
    about: "Aromatherapy Associates has been crafting pure essential oil blends for over 30 years. Our certified aromatherapists create personalized wellness experiences using the finest botanical ingredients.",
    certifications: ["Certified Aromatherapist", "Clinical Massage Therapist"],
    services: [
      {
        name: "Deep Relax Massage",
        description: "Stress-relief massage with vetiver and camomile oils",
        duration: "90 minutes",
        price: "฿2,500 - ฿3,200",
        products: [
          {
            name: "Deep Relax Bath & Shower Oil",
            description: "Calming essential oil blend",
            features: [
              "Vetiver, camomile & sandalwood",
              "Reduces stress and anxiety",
              "Promotes deep sleep",
              "100% natural fragrance"
            ],
          },
          {
            name: "Deep Relax Body Cream",
            description: "Nourishing relaxation therapy",
            features: [
              "Shea butter base",
              "Calming aromatherapy",
              "Deeply moisturizing",
              "Perfect for bedtime ritual"
            ],
          }
        ]
      },
      {
        name: "Revive Morning Massage",
        description: "Energizing massage with pink grapefruit and rosemary",
        duration: "60 minutes",
        price: "฿1,800 - ฿2,400",
        products: [
          {
            name: "Revive Morning Bath & Shower Oil",
            description: "Energizing essential oil blend",
            features: [
              "Pink grapefruit & rosemary",
              "Awakens mind and body",
              "Improves focus",
              "Uplifting aroma"
            ],
          },
          {
            name: "Revive Morning Body Gel",
            description: "Invigorating body treatment",
            features: [
              "Lightweight gel texture",
              "Quick absorption",
              "Energizing botanicals",
              "Perfect morning boost"
            ],
          }
        ]
      },
      {
        name: "Rose Indulgence Massage",
        description: "Luxurious rose-infused therapeutic massage",
        duration: "120 minutes",
        price: "฿3,500 - ฿4,500",
        products: [
          {
            name: "The Atomiser",
            description: "Pure essential oil nebulizer",
            features: [
              "Concentrated rose absolute",
              "Damascus rose essential oil",
              "Aromatherapeutic benefits",
              "Mood enhancement"
            ],
          },
          {
            name: "Rose Infinity Eye Cream",
            description: "Luxurious eye treatment",
            features: [
              "24k gold & rose damascena",
              "Reduces puffiness",
              "Smooths fine lines",
              "Premium anti-aging"
            ],
          }
        ]
      }
    ],
    vouchers: [
      {
        code: "AROMA28",
        discount: 28,
        type: "percentage",
        minSpend: 2800,
        expiresAt: "2025-12-31",
        description: "28% off all aromatherapy treatments"
      },
      {
        code: "MASSAGE500",
        discount: 500,
        type: "fixed",
        minSpend: 3500,
        expiresAt: "2025-12-26",
        description: "฿500 off Rose Indulgence Massage"
      },
      {
        code: "RELAX22",
        discount: 22,
        type: "percentage",
        minSpend: 2000,
        expiresAt: "2026-01-18",
        description: "22% off Deep Relax treatment"
      }
    ],
    bundles: [
      {
        name: "Ultimate Relaxation Package",
        description: "Deep Relax + Revive Morning Massage",
        services: ["Deep Relax Massage", "Revive Morning Massage"],
        originalPrice: 4300,
        bundlePrice: 3599,
        savings: 701,
        voucherCode: "DOUBLERELAX",
        validUntil: "2025-12-31"
      },
      {
        name: "Luxury Rose Experience",
        description: "Rose Indulgence Massage (120min)",
        services: ["Rose Indulgence Massage"],
        originalPrice: 4500,
        bundlePrice: 3799,
        savings: 701,
        voucherCode: "ROSETREAT",
        validUntil: "2025-12-31"
      }
    ]
  },
  ghd: {
    id: "ghd",
    name: "ghd",
    tagline: "Professional Styling Tools",
    description: "Expert hair styling services using ghd's revolutionary heat technology for salon-perfect results.",
    category: "Hair Styling",
    logo: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=80&fit=crop",
    about: "ghd (good hair day) revolutionized hair styling with its patented heat technology. Our certified stylists use professional ghd tools to create stunning styles while protecting your hair's health.",
    certifications: ["ghd Certified Stylist", "Advanced Styling Techniques"],
    services: [
      {
        name: "Signature Blow-Dry",
        description: "Professional blow-dry styling with ghd helios dryer",
        duration: "45 minutes",
        price: "฿800 - ฿1,200",
        products: [
          {
            name: "ghd helios™ Professional Hair Dryer",
            description: "Ultra-fast professional dryer",
            features: [
              "120mph airflow",
              "Aeroprecis™ technology",
              "75% shinier hair",
              "30% more volume"
            ],
          },
          {
            name: "ghd Total Volume Foam",
            description: "Heat-activated styling foam",
            features: [
              "Long-lasting volume",
              "Heat protection",
              "No stiffness or stickiness",
              "Professional salon finish"
            ],
          }
        ]
      },
      {
        name: "Sleek & Smooth Styling",
        description: "Professional straightening with ghd platinum+ styler",
        duration: "60 minutes",
        price: "฿1,000 - ฿1,500",
        products: [
          {
            name: "ghd platinum+ Styler",
            description: "Ultra-zone™ technology straightener",
            features: [
              "Predictive technology",
              "185°C optimal temperature",
              "70% stronger hair",
              "2x more color protection"
            ],
          },
          {
            name: "ghd Sleek & Smooth Spray",
            description: "Anti-humidity styling spray",
            features: [
              "Heat protection up to 220°C",
              "Humidity resistance",
              "Frizz control",
              "Glossy finish"
            ],
          }
        ]
      },
      {
        name: "Glam Curls & Waves",
        description: "Beautiful curls created with ghd curve wand",
        duration: "60 minutes",
        price: "฿1,200 - ฿1,800",
        products: [
          {
            name: "ghd curve® Creative Curl Wand",
            description: "Tapered barrel curling wand",
            features: [
              "28-23mm tapered barrel",
              "Ultra-zone™ technology",
              "Protective cool tip",
              "Long-lasting curls"
            ],
          },
          {
            name: "ghd Final Shine Spray",
            description: "Finishing spray",
            features: [
              "Mirror-like shine",
              "Lightweight formula",
              "Flexible hold",
              "UV protection"
            ],
          }
        ]
      }
    ],
    vouchers: [
      {
        code: "GHD18",
        discount: 18,
        type: "percentage",
        minSpend: 1200,
        expiresAt: "2025-12-31",
        description: "18% off all ghd styling services"
      },
      {
        code: "STYLE200",
        discount: 200,
        type: "fixed",
        minSpend: 1500,
        expiresAt: "2025-12-27",
        description: "฿200 off any styling service"
      },
      {
        code: "GLAMCURLS",
        discount: 15,
        type: "percentage",
        minSpend: 1000,
        expiresAt: "2026-01-12",
        description: "15% off curls & waves styling"
      }
    ],
    bundles: [
      {
        name: "Complete Styling Package",
        description: "Blow-Dry + Sleek Styling",
        services: ["Signature Blow-Dry", "Sleek & Smooth Styling"],
        originalPrice: 2200,
        bundlePrice: 1849,
        savings: 351,
        voucherCode: "STYLEALL",
        validUntil: "2025-12-31"
      },
      {
        name: "Weekly Styling Pass",
        description: "4x Signature Blow-Dry (valid for 30 days)",
        services: ["Signature Blow-Dry", "Signature Blow-Dry", "Signature Blow-Dry", "Signature Blow-Dry"],
        originalPrice: 4800,
        bundlePrice: 3999,
        savings: 801,
        voucherCode: "WEEKLYGHD",
        validUntil: "2025-12-31"
      }
    ]
  },
  kerastase: {
    id: "kerastase",
    name: "Kérastase",
    tagline: "Luxury Hair Rituals",
    description: "Premium hair treatments and customized care rituals using Kérastase's haute couture formulations.",
    category: "Hair Treatment",
    logo: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200&h=80&fit=crop",
    about: "Kérastase represents the pinnacle of luxury hair care. Our master stylists perform personalized hair diagnostics and create bespoke treatment rituals using Kérastase's advanced formulations.",
    certifications: ["Kérastase Master Colorist", "Hair Diagnostic Specialist"],
    services: [
      {
        name: "Fusio-Dose Treatment",
        description: "Customized in-salon booster treatment for instant transformation",
        duration: "30 minutes",
        price: "฿1,500 - ฿2,000",
        products: [
          {
            name: "Fusio-Dose Concentrates",
            description: "Personalized hair boosters",
            features: [
              "5 targeted concentrates",
              "Customized to hair needs",
              "Instant visible results",
              "Professional strength formula"
            ],
          },
          {
            name: "Fusio-Dose Homelab",
            description: "At-home booster system",
            features: [
              "Maintain salon results",
              "Easy application",
              "Concentrated care",
              "Professional quality"
            ],
          }
        ]
      },
      {
        name: "Chronologiste Luxury Ritual",
        description: "Ultimate revitalizing treatment for all hair types",
        duration: "90 minutes",
        price: "฿3,500 - ฿4,500",
        products: [
          {
            name: "Chronologiste Caviar Pre-Shampoo",
            description: "Luxurious caviar treatment",
            features: [
              "Caviar & vitamin E",
              "Revitalized scalp",
              "Strengthens hair fiber",
              "Sublime shine"
            ],
          },
          {
            name: "Chronologiste Masque",
            description: "Regenerating hair mask",
            features: [
              "Abyssine & hyaluronic acid",
              "Deep regeneration",
              "Youthful vitality",
              "Exceptional softness"
            ],
          }
        ]
      },
      {
        name: "Elixir Ultime Oil Treatment",
        description: "Sublime oil ritual for radiant, nourished hair",
        duration: "60 minutes",
        price: "฿2,000 - ฿2,800",
        products: [
          {
            name: "Elixir Ultime L'Original Oil",
            description: "Legendary beautifying oil",
            features: [
              "Marula, camellia & argan oil",
              "Multi-use oil",
              "Instant shine & softness",
              "Heat protection"
            ],
          },
          {
            name: "Elixir Ultime Le Masque",
            description: "Oil-enriched mask",
            features: [
              "Imperial tea extract",
              "Deep nourishment",
              "Silky texture",
              "Radiant finish"
            ],
          }
        ]
      }
    ],
    vouchers: [
      {
        code: "KERA32",
        discount: 32,
        type: "percentage",
        minSpend: 3000,
        expiresAt: "2025-12-31",
        description: "32% off all Kérastase treatments"
      },
      {
        code: "CHRONO700",
        discount: 700,
        type: "fixed",
        minSpend: 4000,
        expiresAt: "2025-12-29",
        description: "฿700 off Chronologiste Luxury Ritual"
      },
      {
        code: "FUSIO15",
        discount: 15,
        type: "percentage",
        minSpend: 1500,
        expiresAt: "2026-01-22",
        description: "15% off Fusio-Dose treatments"
      }
    ],
    bundles: [
      {
        name: "Ultimate Hair Luxury",
        description: "Chronologiste Ritual + Fusio-Dose Treatment",
        services: ["Chronologiste Luxury Ritual", "Fusio-Dose Treatment"],
        originalPrice: 5000,
        bundlePrice: 4199,
        savings: 801,
        voucherCode: "KERALUX",
        validUntil: "2025-12-31"
      },
      {
        name: "Elixir Oil Experience",
        description: "Elixir Ultime Treatment + At-home Oil",
        services: ["Elixir Ultime Oil Treatment"],
        originalPrice: 2800,
        bundlePrice: 2399,
        savings: 401,
        voucherCode: "OILTREAT",
        validUntil: "2025-12-31"
      }
    ]
  },
  clarins: {
    id: "clarins",
    name: "Clarins",
    tagline: "Spa-Quality Skincare",
    description: "Luxurious facial and body treatments using Clarins' plant-powered formulations and expert massage techniques.",
    category: "Spa & Beauty",
    logo: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=80&fit=crop",
    about: "Clarins has been a pioneer in plant-based beauty for over 65 years. Our trained beauty therapists combine Clarins' expertise with signature massage techniques for transformative spa experiences.",
    certifications: ["Clarins Spa Therapist", "Advanced Facial Specialist"],
    services: [
      {
        name: "Precious Facial",
        description: "Anti-aging facial with pure gold and silk tree extract",
        duration: "90 minutes",
        price: "฿3,800 - ฿5,000",
        products: [
          {
            name: "Precious La Crème",
            description: "Ultimate anti-aging cream",
            features: [
              "Pure 24k gold",
              "Organic oat sugars",
              "Lifts and firms",
              "Exceptional luxury"
            ],
          },
          {
            name: "Precious La Lotion",
            description: "Youth-enhancing essence",
            features: [
              "Silver vine extract",
              "Prepares skin",
              "Boosts radiance",
              "Sublime texture"
            ],
          }
        ]
      },
      {
        name: "Super Restorative Treatment",
        description: "Targeted anti-aging treatment for mature skin",
        duration: "75 minutes",
        price: "฿2,800 - ฿3,500",
        products: [
          {
            name: "Super Restorative Day Cream",
            description: "Replenishing anti-aging day cream",
            features: [
              "Harungana extract",
              "Restores radiance",
              "Lifts and firms",
              "SPF 20 protection"
            ],
          },
          {
            name: "Super Restorative Rose Radiance Cream",
            description: "Rosy glow illuminating cream",
            features: [
              "Natural rose pigments",
              "Instant radiance",
              "Evens skin tone",
              "Youthful appearance"
            ],
          }
        ]
      },
      {
        name: "Body Shaping Treatment",
        description: "Contouring body treatment with drainage massage",
        duration: "90 minutes",
        price: "฿2,500 - ฿3,200",
        products: [
          {
            name: "Body Fit Anti-Cellulite Contouring Expert",
            description: "Targeted slimming treatment",
            features: [
              "Quince leaf extract",
              "Visible results in 28 days",
              "Smooths skin texture",
              "Firms and tones"
            ],
          },
          {
            name: "Tonic Body Treatment Oil",
            description: "100% pure plant extracts oil",
            features: [
              "Rosemary & mint",
              "Firms skin",
              "Improves elasticity",
              "Energizing aroma"
            ],
          }
        ]
      }
    ],
    vouchers: [
      {
        code: "CLARINS27",
        discount: 27,
        type: "percentage",
        minSpend: 3200,
        expiresAt: "2025-12-31",
        description: "27% off all Clarins spa treatments"
      },
      {
        code: "PRECIOUS800",
        discount: 800,
        type: "fixed",
        minSpend: 4500,
        expiresAt: "2025-12-30",
        description: "฿800 off Precious Facial treatment"
      },
      {
        code: "BODYFIT",
        discount: 23,
        type: "percentage",
        minSpend: 2500,
        expiresAt: "2026-01-28",
        description: "23% off body shaping treatments"
      }
    ],
    bundles: [
      {
        name: "Anti-Aging Spa Package",
        description: "Precious Facial + Super Restorative Treatment",
        services: ["Precious Facial", "Super Restorative Treatment"],
        originalPrice: 6300,
        bundlePrice: 5299,
        savings: 1001,
        voucherCode: "AGELESSSPA",
        validUntil: "2025-12-31"
      },
      {
        name: "Complete Body & Face",
        description: "Body Shaping + Super Restorative Facial",
        services: ["Body Shaping Treatment", "Super Restorative Treatment"],
        originalPrice: 5700,
        bundlePrice: 4799,
        savings: 901,
        voucherCode: "TOTALSPA",
        validUntil: "2025-12-31"
      }
    ]
  }
};
