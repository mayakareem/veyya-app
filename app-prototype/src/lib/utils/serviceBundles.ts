// Service bundle recommendations and discount calculations

export interface BundleOption {
  serviceId: string;
  serviceName: string;
  price: number;
  duration: string;
  category: string;
  subcategory: string;
}

export interface Bundle {
  title: string;
  description: string;
  discount: number; // percentage
  services: BundleOption[];
  savings: number; // calculated savings amount
}

// Map service IDs to commonly bundled services
export const SERVICE_BUNDLES: Record<string, BundleOption[]> = {
  // Beauty - Face & Skin
  "basic-facial": [
    { serviceId: "eyebrow-threading", serviceName: "Eyebrow Threading", price: 200, duration: "15 min", category: "Beauty", subcategory: "Brows & Lashes" },
    { serviceId: "upper-lip-threading", serviceName: "Upper Lip Threading", price: 100, duration: "10 min", category: "Beauty", subcategory: "Hair Removal" },
    { serviceId: "deep-cleansing-facial", serviceName: "Upgrade to Deep Cleansing", price: 400, duration: "15 min extra", category: "Beauty", subcategory: "Face & Skin" },
  ],
  "deep-cleansing-facial": [
    { serviceId: "led-therapy-addon", serviceName: "LED Therapy Add-on", price: 500, duration: "20 min", category: "Beauty", subcategory: "Face & Skin" },
    { serviceId: "eyebrow-waxing", serviceName: "Eyebrow Waxing", price: 250, duration: "15 min", category: "Beauty", subcategory: "Hair Removal" },
  ],

  // Nails
  "gel-manicure": [
    { serviceId: "gel-pedicure", serviceName: "Gel Pedicure", price: 900, duration: "60 min", category: "Nails", subcategory: "Pedicures" },
    { serviceId: "nail-art-simple", serviceName: "Simple Nail Art", price: 200, duration: "15 min", category: "Nails", subcategory: "Nail Art & Design" },
  ],
  "basic-manicure": [
    { serviceId: "basic-pedicure", serviceName: "Basic Pedicure", price: 600, duration: "45 min", category: "Nails", subcategory: "Pedicures" },
    { serviceId: "gel-manicure", serviceName: "Upgrade to Gel", price: 200, duration: "15 min extra", category: "Nails", subcategory: "Manicures" },
  ],
  "spa-pedicure": [
    { serviceId: "luxury-spa-manicure", serviceName: "Luxury Spa Manicure", price: 900, duration: "60 min", category: "Nails", subcategory: "Manicures" },
    { serviceId: "nail-art-simple", serviceName: "Simple Nail Art", price: 200, duration: "15 min", category: "Nails", subcategory: "Nail Art & Design" },
  ],

  // Hair
  "women's-haircut": [
    { serviceId: "hair-wash", serviceName: "Hair Wash & Blow Dry", price: 300, duration: "30 min", category: "Hair", subcategory: "Cuts & Styling" },
    { serviceId: "deep-conditioning", serviceName: "Deep Conditioning Treatment", price: 800, duration: "30 min", category: "Hair", subcategory: "Hair Treatments" },
  ],
  "balayage": [
    { serviceId: "deep-conditioning", serviceName: "Deep Conditioning", price: 800, duration: "30 min", category: "Hair", subcategory: "Hair Treatments" },
    { serviceId: "keratin", serviceName: "Keratin Treatment", price: 2000, duration: "90 min", category: "Hair", subcategory: "Hair Treatments" },
  ],
  "full-color": [
    { serviceId: "women's-haircut", serviceName: "Women's Haircut", price: 500, duration: "45 min", category: "Hair", subcategory: "Cuts & Styling" },
    { serviceId: "deep-conditioning", serviceName: "Deep Conditioning", price: 800, duration: "30 min", category: "Hair", subcategory: "Hair Treatments" },
  ],

  // Makeup
  "bridal-makeup": [
    { serviceId: "bridal-hair", serviceName: "Bridal Hair Styling", price: 2500, duration: "90 min", category: "Hair", subcategory: "Special Occasion" },
    { serviceId: "classic-eyelash", serviceName: "Classic Eyelash Extensions", price: 1500, duration: "90 min", category: "Beauty", subcategory: "Brows & Lashes" },
  ],
  "party-makeup": [
    { serviceId: "updo-styling", serviceName: "Updo Styling", price: 1200, duration: "60 min", category: "Hair", subcategory: "Special Occasion" },
    { serviceId: "volume-eyelash", serviceName: "Volume Lashes", price: 1800, duration: "120 min", category: "Beauty", subcategory: "Brows & Lashes" },
  ],

  // Wellness - Massage
  "deep-tissue-massage-60": [
    { serviceId: "foot-reflexology", serviceName: "Foot Reflexology", price: 600, duration: "30 min", category: "Wellness", subcategory: "Massage Therapy" },
    { serviceId: "head-shoulder-massage", serviceName: "Head & Shoulder Massage", price: 500, duration: "30 min", category: "Wellness", subcategory: "Massage Therapy" },
  ],
  "thai-massage-60": [
    { serviceId: "foot-reflexology", serviceName: "Foot Reflexology", price: 600, duration: "30 min", category: "Wellness", subcategory: "Massage Therapy" },
    { serviceId: "thai-massage-90", serviceName: "Upgrade to 90 min", price: 500, duration: "30 min extra", category: "Wellness", subcategory: "Massage Therapy" },
  ],
  "swedish-massage-60": [
    { serviceId: "aromatherapy-massage-60", serviceName: "Upgrade to Aromatherapy", price: 300, duration: "Same duration", category: "Wellness", subcategory: "Massage Therapy" },
    { serviceId: "foot-reflexology", serviceName: "Foot Reflexology", price: 600, duration: "30 min", category: "Wellness", subcategory: "Massage Therapy" },
  ],

  // Fitness
  "personal-training-single": [
    { serviceId: "nutrition-consultation", serviceName: "Nutrition Consultation", price: 800, duration: "45 min", category: "Fitness", subcategory: "Nutrition & Wellness" },
    { serviceId: "personal-training-5", serviceName: "Upgrade to 5-Session Package", price: 2000, duration: "Save per session", category: "Fitness", subcategory: "Personal Training" },
  ],
  "yoga-beginner": [
    { serviceId: "private-yoga", serviceName: "Upgrade to Private Session", price: 1000, duration: "60 min", category: "Fitness", subcategory: "Yoga & Pilates" },
    { serviceId: "nutrition-consultation", serviceName: "Nutrition Consultation", price: 800, duration: "45 min", category: "Fitness", subcategory: "Nutrition & Wellness" },
  ],

  // Pet Care
  "small-dog-bath": [
    { serviceId: "nail-trimming-dog", serviceName: "Nail Trimming", price: 200, duration: "15 min", category: "Pet Care", subcategory: "Grooming" },
    { serviceId: "small-dog-full", serviceName: "Upgrade to Full Grooming", price: 500, duration: "30 min extra", category: "Pet Care", subcategory: "Grooming" },
  ],
  "medium-dog-full": [
    { serviceId: "teeth-cleaning", serviceName: "Teeth Cleaning", price: 400, duration: "20 min", category: "Pet Care", subcategory: "Grooming" },
    { serviceId: "de-shedding", serviceName: "De-shedding Treatment", price: 500, duration: "30 min", category: "Pet Care", subcategory: "Grooming" },
  ],

  // Cleaning
  "basic-house-cleaning-medium": [
    { serviceId: "window-cleaning", serviceName: "Window Cleaning", price: 800, duration: "45 min", category: "Cleaning", subcategory: "Specialized Cleaning" },
    { serviceId: "deep-cleaning-medium", serviceName: "Upgrade to Deep Cleaning", price: 1500, duration: "60 min extra", category: "Cleaning", subcategory: "Deep Cleaning" },
  ],
  "deep-cleaning-medium": [
    { serviceId: "carpet-cleaning", serviceName: "Carpet Cleaning", price: 1500, duration: "60 min", category: "Cleaning", subcategory: "Specialized Cleaning" },
    { serviceId: "window-cleaning", serviceName: "Window Cleaning", price: 800, duration: "45 min", category: "Cleaning", subcategory: "Specialized Cleaning" },
  ],
};

// Calculate bundle discount and savings
export function calculateBundleDiscount(
  baseService: { price: number },
  bundleServices: BundleOption[]
): { discount: number; savings: number; originalTotal: number; discountedTotal: number } {
  const originalTotal = baseService.price + bundleServices.reduce((sum, s) => sum + s.price, 0);

  // Tiered discount based on number of services
  let discount = 10; // 10% for 1 additional service
  if (bundleServices.length === 2) discount = 15; // 15% for 2 additional services
  if (bundleServices.length >= 3) discount = 20; // 20% for 3+ additional services

  const savings = Math.round(originalTotal * (discount / 100));
  const discountedTotal = originalTotal - savings;

  return {
    discount,
    savings,
    originalTotal,
    discountedTotal,
  };
}

// Get bundle recommendations for a service
export function getBundleRecommendations(serviceId: string): BundleOption[] {
  return SERVICE_BUNDLES[serviceId] || [];
}

// Create a bundle object with discount calculation
export function createBundle(
  baseService: { name: string; price: number },
  selectedBundleServices: BundleOption[]
): Bundle {
  if (selectedBundleServices.length === 0) {
    return {
      title: "No Bundle Selected",
      description: "",
      discount: 0,
      services: [],
      savings: 0,
    };
  }

  const { discount, savings } = calculateBundleDiscount(baseService, selectedBundleServices);

  return {
    title: `${baseService.name} + ${selectedBundleServices.length} More`,
    description: `Save ${discount}% when you bundle services together`,
    discount,
    services: selectedBundleServices,
    savings,
  };
}
