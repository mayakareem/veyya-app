import { Sparkles, Scissors, Stethoscope, PawPrint, SprayCan, HeartPulse, Dumbbell, Hand, LucideIcon } from "lucide-react";

export type Category = {
  name: string;
  Icon: LucideIcon;
  description: string;
  services: string[];
};

export type ServiceDetail = {
  name: string;
  price: number;
  duration: number;
  description: string;
  partner?: string;
};

export type CategoryWithServices = Category & {
  detailedServices: ServiceDetail[];
};

export const SERVICE_CATEGORIES: Category[] = [
  {
    name: "Beauty",
    Icon: Sparkles,
    description: "Makeup, facials, and more",
    services: ["Facial Treatment", "Waxing", "Eyebrow Threading", "Eyelash Extensions"]
  },
  {
    name: "Nails",
    Icon: Hand,
    description: "Manicures, pedicures, extensions",
    services: ["Manicure", "Pedicure", "Gel Nails", "Nail Extensions", "Nail Art"]
  },
  {
    name: "Hair",
    Icon: Scissors,
    description: "Cuts, color, styling",
    services: ["Haircut", "Hair Color", "Balayage", "Hair Treatment", "Hair Styling"]
  },
  {
    name: "Healthcare",
    Icon: Stethoscope,
    description: "At-home medical services",
    services: ["Lab Tests", "IV Therapy", "Doctor Consultation", "Flu Vaccine", "Nurse Care", "Physiotherapy", "Psychotherapy & Counselling"]
  },
  {
    name: "Pet Care",
    Icon: PawPrint,
    description: "Grooming, walking, sitting",
    services: ["Dog Grooming", "Cat Grooming", "Pet Walking", "Pet Sitting"]
  },
  {
    name: "Cleaning",
    Icon: SprayCan,
    description: "Home and office cleaning",
    services: ["House Cleaning", "Deep Cleaning", "Move-in/out Cleaning", "Office Cleaning"]
  },
  {
    name: "Wellness",
    Icon: HeartPulse,
    description: "Massage and therapy",
    services: ["Deep Tissue Massage", "Thai Massage", "Swedish Massage", "Hot Stone Massage", "Aromatherapy Session"]
  },
  {
    name: "Fitness",
    Icon: Dumbbell,
    description: "Personal training and classes",
    services: ["Personal Training", "Yoga Class", "Pilates", "Nutrition Consultation"]
  },
];

export const DETAILED_SERVICES: Record<string, ServiceDetail[]> = {
  "Beauty": [
    { name: "Classic Facial", price: 800, duration: 60, description: "Deep cleansing facial with extraction and mask" },
    { name: "Anti-Aging Facial", price: 1200, duration: 75, description: "Advanced facial with collagen boost and massage" },
    { name: "Hydrating Facial", price: 900, duration: 60, description: "Intensive moisture treatment for dry skin" },
    { name: "Acne Treatment Facial", price: 1000, duration: 60, description: "Specialized treatment for acne-prone skin" },
    { name: "Brightening Facial", price: 1100, duration: 75, description: "Vitamin C treatment for radiant skin" },
    { name: "Full Face Waxing", price: 600, duration: 30, description: "Complete facial hair removal" },
    { name: "Eyebrow Waxing", price: 200, duration: 15, description: "Professional eyebrow shaping" },
    { name: "Upper Lip Waxing", price: 150, duration: 10, description: "Quick and gentle upper lip hair removal" },
    { name: "Full Body Waxing", price: 2500, duration: 120, description: "Complete body hair removal" },
    { name: "Eyebrow Threading", price: 150, duration: 15, description: "Precise eyebrow shaping with thread" },
    { name: "Upper Lip Threading", price: 100, duration: 10, description: "Gentle facial hair removal" },
    { name: "Full Face Threading", price: 400, duration: 30, description: "Complete facial hair removal by threading" },
    { name: "Classic Eyelash Extensions", price: 1500, duration: 120, description: "Natural-looking lash extensions" },
    { name: "Volume Eyelash Extensions", price: 2000, duration: 150, description: "Dramatic volume lash extensions" },
    { name: "Lash Refill", price: 800, duration: 60, description: "Touch up existing extensions" },
    { name: "Lash Removal", price: 300, duration: 30, description: "Safe extension removal" },
  ],
  "Nails": [
    { name: "Basic Manicure", price: 300, duration: 45, description: "Nail shaping, cuticle care, and polish" },
    { name: "Gel Manicure", price: 500, duration: 60, description: "Long-lasting gel polish manicure" },
    { name: "French Manicure", price: 600, duration: 60, description: "Classic French tips with gel" },
    { name: "Luxury Spa Manicure", price: 800, duration: 75, description: "Manicure with exfoliation and massage" },
    { name: "Basic Pedicure", price: 400, duration: 60, description: "Foot care with polish" },
    { name: "Gel Pedicure", price: 600, duration: 75, description: "Pedicure with gel polish" },
    { name: "Spa Pedicure", price: 900, duration: 90, description: "Luxury pedicure with scrub and massage" },
    { name: "Nail Extensions - Acrylic", price: 1200, duration: 120, description: "Full set acrylic extensions" },
    { name: "Nail Extensions - Gel", price: 1500, duration: 120, description: "Natural-looking gel extensions" },
    { name: "Extension Refill", price: 700, duration: 60, description: "Maintenance for existing extensions" },
    { name: "Nail Art - Simple", price: 100, duration: 15, description: "Basic designs per nail" },
    { name: "Nail Art - Complex", price: 300, duration: 30, description: "Detailed designs and embellishments" },
    { name: "Chrome Nails", price: 800, duration: 75, description: "Metallic chrome finish" },
    { name: "Ombre Nails", price: 700, duration: 75, description: "Gradient color nails" },
  ],
  "Hair": [
    { name: "Women's Haircut", price: 500, duration: 60, description: "Cut and blow dry" },
    { name: "Men's Haircut", price: 300, duration: 30, description: "Professional men's cut" },
    { name: "Kids Haircut", price: 250, duration: 30, description: "Haircut for children under 12" },
    { name: "Hair Wash & Blow Dry", price: 400, duration: 45, description: "Professional styling" },
    { name: "Full Color", price: 2500, duration: 180, description: "Complete hair color application" },
    { name: "Root Touch Up", price: 1200, duration: 90, description: "Cover regrowth" },
    { name: "Balayage", price: 3500, duration: 240, description: "Hand-painted highlights" },
    { name: "Highlights - Full", price: 3000, duration: 210, description: "Full head highlights" },
    { name: "Highlights - Partial", price: 2000, duration: 150, description: "Partial highlights" },
    { name: "Keratin Treatment", price: 4000, duration: 180, description: "Smoothing treatment for frizz" },
    { name: "Deep Conditioning", price: 800, duration: 60, description: "Intensive moisture treatment" },
    { name: "Scalp Treatment", price: 900, duration: 60, description: "Therapeutic scalp care" },
    { name: "Hair Perm", price: 2500, duration: 180, description: "Permanent wave or curl" },
    { name: "Hair Straightening", price: 3000, duration: 180, description: "Japanese straightening treatment" },
    { name: "Updo Styling", price: 1500, duration: 90, description: "Special occasion updo" },
    { name: "Bridal Hair", price: 2500, duration: 120, description: "Wedding day hair styling" },
  ],
  "Healthcare": [
    { name: "Complete Blood Count (CBC)", price: 800, duration: 30, description: "Comprehensive blood analysis at home", partner: "Patrangsit Hospital" },
    { name: "Lipid Profile Test", price: 1200, duration: 30, description: "Cholesterol and triglyceride screening", partner: "Patrangsit Hospital" },
    { name: "Diabetes Panel (HbA1c + Glucose)", price: 1500, duration: 30, description: "Complete diabetes monitoring", partner: "Patrangsit Hospital" },
    { name: "Thyroid Function Test", price: 1800, duration: 30, description: "TSH, T3, T4 analysis", partner: "Patrangsit Hospital" },
    { name: "Liver Function Test", price: 1400, duration: 30, description: "Complete liver health screening", partner: "Patrangsit Hospital" },
    { name: "Kidney Function Test", price: 1300, duration: 30, description: "Creatinine and urea analysis", partner: "Patrangsit Hospital" },
    { name: "Vitamin D Test", price: 1600, duration: 30, description: "Vitamin D level assessment", partner: "Patrangsit Hospital" },
    { name: "Hydration IV Therapy", price: 2500, duration: 60, description: "Rehydration with essential vitamins", partner: "Patrangsit Hospital" },
    { name: "Immunity Boost IV Therapy", price: 3500, duration: 60, description: "High-dose Vitamin C and zinc infusion", partner: "Patrangsit Hospital" },
    { name: "Energy Boost IV Therapy", price: 3000, duration: 60, description: "B-complex and amino acids", partner: "Patrangsit Hospital" },
    { name: "Beauty IV Therapy", price: 4000, duration: 60, description: "Glutathione and collagen boost", partner: "Patrangsit Hospital" },
    { name: "General Practitioner Home Visit", price: 3000, duration: 45, description: "Doctor consultation at home", partner: "Patrangsit Hospital" },
    { name: "Pediatrician Home Visit", price: 3500, duration: 45, description: "Child health consultation", partner: "Patrangsit Hospital" },
    { name: "Flu Vaccine", price: 800, duration: 20, description: "Seasonal influenza vaccination", partner: "Patrangsit Hospital" },
    { name: "COVID-19 Vaccine", price: 1200, duration: 20, description: "COVID vaccination at home", partner: "Patrangsit Hospital" },
    { name: "Hepatitis B Vaccine", price: 1000, duration: 20, description: "Hep B immunization", partner: "Patrangsit Hospital" },
    { name: "Registered Nurse Visit - 2 hours", price: 1500, duration: 120, description: "Professional nursing care", partner: "Patrangsit Hospital" },
    { name: "Registered Nurse Visit - 4 hours", price: 2800, duration: 240, description: "Extended nursing care", partner: "Patrangsit Hospital" },
    { name: "Wound Care & Dressing", price: 1200, duration: 45, description: "Professional wound management", partner: "Patrangsit Hospital" },
    { name: "Post-Surgery Care", price: 2000, duration: 90, description: "Post-operative home care", partner: "Patrangsit Hospital" },
    { name: "Physiotherapy Session", price: 2500, duration: 60, description: "Physical therapy and rehabilitation", partner: "Patrangsit Hospital" },
    { name: "Sports Injury Physiotherapy", price: 3000, duration: 75, description: "Specialized sports rehab", partner: "Patrangsit Hospital" },
    { name: "Post-Stroke Physiotherapy", price: 3500, duration: 90, description: "Stroke rehabilitation therapy", partner: "Patrangsit Hospital" },
    { name: "Individual Psychotherapy", price: 2500, duration: 60, description: "One-on-one counselling session", partner: "Patrangsit Hospital" },
    { name: "Couples Therapy", price: 3500, duration: 90, description: "Relationship counselling", partner: "Patrangsit Hospital" },
    { name: "Family Therapy", price: 4000, duration: 90, description: "Family counselling session", partner: "Patrangsit Hospital" },
    { name: "CBT Session", price: 3000, duration: 60, description: "Cognitive Behavioral Therapy", partner: "Patrangsit Hospital" },
    { name: "Anxiety & Depression Counselling", price: 2800, duration: 60, description: "Mental health support", partner: "Patrangsit Hospital" },
  ],
  "Pet Care": [
    { name: "Small Dog Bath & Brush", price: 500, duration: 60, description: "Bath and brushing for small dogs" },
    { name: "Medium Dog Bath & Brush", price: 700, duration: 75, description: "Bath and brushing for medium dogs" },
    { name: "Large Dog Bath & Brush", price: 1000, duration: 90, description: "Bath and brushing for large dogs" },
    { name: "Small Dog Full Grooming", price: 1200, duration: 120, description: "Full groom with haircut" },
    { name: "Medium Dog Full Grooming", price: 1500, duration: 150, description: "Complete grooming service" },
    { name: "Large Dog Full Grooming", price: 2000, duration: 180, description: "Full service for large breeds" },
    { name: "Cat Grooming", price: 1000, duration: 90, description: "Gentle cat grooming and bath" },
    { name: "Nail Trimming - Dog", price: 200, duration: 15, description: "Quick nail trim" },
    { name: "Nail Trimming - Cat", price: 200, duration: 15, description: "Gentle nail trimming" },
    { name: "Teeth Cleaning", price: 400, duration: 30, description: "Pet dental care" },
    { name: "De-shedding Treatment", price: 600, duration: 45, description: "Remove excess fur" },
    { name: "Dog Walking - 30min", price: 300, duration: 30, description: "Half hour neighborhood walk" },
    { name: "Dog Walking - 60min", price: 500, duration: 60, description: "One hour exercise walk" },
    { name: "Pet Sitting - Half Day", price: 800, duration: 240, description: "4 hours pet care at home" },
    { name: "Pet Sitting - Full Day", price: 1500, duration: 480, description: "8 hours pet care" },
    { name: "Overnight Pet Sitting", price: 2500, duration: 720, description: "12 hours overnight care" },
  ],
  "Cleaning": [
    { name: "Basic House Cleaning - Small", price: 1500, duration: 120, description: "Clean home up to 50 sqm" },
    { name: "Basic House Cleaning - Medium", price: 2000, duration: 180, description: "Clean home 50-100 sqm" },
    { name: "Basic House Cleaning - Large", price: 2500, duration: 240, description: "Clean home over 100 sqm" },
    { name: "Deep Cleaning - Small", price: 2500, duration: 180, description: "Thorough cleaning up to 50 sqm" },
    { name: "Deep Cleaning - Medium", price: 3500, duration: 240, description: "Deep clean 50-100 sqm" },
    { name: "Deep Cleaning - Large", price: 4500, duration: 300, description: "Deep clean over 100 sqm" },
    { name: "Move-in/out Cleaning - Small", price: 3000, duration: 180, description: "Detailed cleaning for moving" },
    { name: "Move-in/out Cleaning - Medium", price: 4000, duration: 240, description: "Complete move cleaning" },
    { name: "Move-in/out Cleaning - Large", price: 5000, duration: 300, description: "Full move-in/out service" },
    { name: "Office Cleaning - Small", price: 1800, duration: 120, description: "Small office space" },
    { name: "Office Cleaning - Medium", price: 2800, duration: 180, description: "Medium office cleaning" },
    { name: "Office Cleaning - Large", price: 4000, duration: 240, description: "Large office space" },
    { name: "Kitchen Deep Clean", price: 1500, duration: 120, description: "Intensive kitchen cleaning" },
    { name: "Bathroom Deep Clean", price: 1000, duration: 90, description: "Thorough bathroom cleaning" },
    { name: "Window Cleaning", price: 800, duration: 60, description: "Inside and outside windows" },
    { name: "Carpet Cleaning", price: 1200, duration: 90, description: "Professional carpet cleaning" },
  ],
  "Wellness": [
    { name: "Deep Tissue Massage - 60min", price: 1200, duration: 60, description: "Intense muscle work" },
    { name: "Deep Tissue Massage - 90min", price: 1700, duration: 90, description: "Extended deep tissue" },
    { name: "Thai Massage - 60min", price: 1000, duration: 60, description: "Traditional Thai massage" },
    { name: "Thai Massage - 90min", price: 1400, duration: 90, description: "Extended Thai massage" },
    { name: "Thai Massage - 120min", price: 1800, duration: 120, description: "Full Thai massage session" },
    { name: "Swedish Massage - 60min", price: 1100, duration: 60, description: "Relaxing Swedish massage" },
    { name: "Swedish Massage - 90min", price: 1600, duration: 90, description: "Extended relaxation" },
    { name: "Hot Stone Massage - 60min", price: 1400, duration: 60, description: "Heated stone therapy" },
    { name: "Hot Stone Massage - 90min", price: 1900, duration: 90, description: "Extended stone massage" },
    { name: "Aromatherapy Massage - 60min", price: 1300, duration: 60, description: "Essential oil massage" },
    { name: "Aromatherapy Massage - 90min", price: 1800, duration: 90, description: "Extended aromatherapy" },
    { name: "Sports Massage", price: 1400, duration: 60, description: "Athletic recovery massage" },
    { name: "Prenatal Massage", price: 1500, duration: 60, description: "Safe pregnancy massage" },
    { name: "Couples Massage - 60min", price: 2200, duration: 60, description: "Side-by-side massage" },
    { name: "Head & Shoulder Massage", price: 600, duration: 30, description: "Quick tension relief" },
    { name: "Foot Reflexology - 60min", price: 800, duration: 60, description: "Therapeutic foot massage" },
  ],
  "Fitness": [
    { name: "Personal Training - Single Session", price: 1500, duration: 60, description: "One-on-one fitness training" },
    { name: "Personal Training - 5 Sessions", price: 7000, duration: 60, description: "Package of 5 sessions" },
    { name: "Personal Training - 10 Sessions", price: 13000, duration: 60, description: "Package of 10 sessions" },
    { name: "Group Training - Per Person", price: 500, duration: 60, description: "Small group fitness class" },
    { name: "Yoga Class - Beginner", price: 600, duration: 60, description: "Introduction to yoga" },
    { name: "Yoga Class - Intermediate", price: 700, duration: 75, description: "Progressive yoga practice" },
    { name: "Yoga Class - Advanced", price: 800, duration: 90, description: "Advanced yoga techniques" },
    { name: "Private Yoga Session", price: 1200, duration: 60, description: "One-on-one yoga instruction" },
    { name: "Pilates Class", price: 700, duration: 60, description: "Mat Pilates class" },
    { name: "Private Pilates", price: 1300, duration: 60, description: "Personal Pilates session" },
    { name: "HIIT Training", price: 800, duration: 45, description: "High-intensity interval training" },
    { name: "Boxing Training", price: 900, duration: 60, description: "Boxing fitness class" },
    { name: "Nutrition Consultation", price: 1500, duration: 60, description: "Personalized nutrition plan" },
    { name: "Fitness Assessment", price: 1000, duration: 60, description: "Complete fitness evaluation" },
    { name: "Meal Planning Service", price: 2000, duration: 90, description: "Custom meal plan creation" },
  ],
};
