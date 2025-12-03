// Comprehensive services data structure
export interface ServiceVariant {
  name: string;
  notes?: string;
}

export interface Service {
  name: string;
  variants?: ServiceVariant[];
  notes?: string;
}

export interface Subcategory {
  name: string;
  services: Service[];
}

export interface MainCategory {
  name: string;
  subcategories: Subcategory[];
}

export const servicesData: MainCategory[] = [
  {
    name: "Beauty & Personal Care",
    subcategories: [
      {
        name: "Hair",
        services: [
          { name: "Women's Haircut" },
          { name: "Men's Haircut" },
          { name: "Kids' Haircut" },
          {
            name: "Blow-Dry",
            variants: [
              { name: "Short" },
              { name: "Medium" },
              { name: "Long" },
            ],
          },
          {
            name: "Hair Styling",
            notes: "updo, curls, straightened",
          },
          {
            name: "Hair Colour",
            variants: [{ name: "Full" }, { name: "Roots" }],
          },
          { name: "Balayage" },
          { name: "Highlights" },
          { name: "Treatments" },
          { name: "Scalp Treatment" },
        ],
      },
      {
        name: "Nails",
        services: [
          {
            name: "Manicure",
            variants: [
              { name: "Classic" },
              { name: "Gel" },
              { name: "Acrylic" },
            ],
          },
          {
            name: "Pedicure",
            variants: [{ name: "Classic" }, { name: "Gel" }, { name: "Spa" }],
          },
          {
            name: "Nail Art",
            variants: [{ name: "Simple" }, { name: "Premium" }],
          },
          {
            name: "Nail Extensions",
            variants: [
              { name: "Acrylic" },
              { name: "Gel" },
              { name: "Polygel" },
            ],
          },
          { name: "Gel Removal" },
        ],
      },
      {
        name: "Face",
        services: [
          {
            name: "Brows Shape",
            variants: [{ name: "Threading" }, { name: "Wax" }],
          },
          { name: "Brows Lamination" },
          { name: "Brows Tint" },
          {
            name: "Lash Extensions",
            variants: [
              { name: "Classic" },
              { name: "Hybrid" },
              { name: "Volume" },
              { name: "Russian" },
            ],
          },
          { name: "Lash Lift" },
          { name: "Lash Tint" },
          {
            name: "Facial",
            variants: [
              { name: "Glow", notes: "Sensitive yes or no" },
              { name: "Anti-Aging", notes: "Sensitive yes or no" },
              { name: "Face Massage", notes: "Sensitive yes or no" },
              { name: "Korean", notes: "Sensitive yes or no" },
              { name: "Deep Clean / Acne", notes: "Sensitive yes or no" },
            ],
          },
          {
            name: "Makeup",
            variants: [
              { name: "Airbrush" },
              { name: "Classic" },
              { name: "Event" },
            ],
          },
        ],
      },
      {
        name: "Massage & Body",
        services: [
          {
            name: "Thai Massage",
            variants: [{ name: "60 mins" }, { name: "90 mins" }],
            notes: "pressure: light, medium, hard",
          },
          {
            name: "Swedish",
            variants: [{ name: "60 mins" }, { name: "90 mins" }],
            notes: "pressure: light, medium, hard",
          },
          {
            name: "Sports",
            variants: [{ name: "60 mins" }, { name: "90 mins" }],
            notes: "pressure: light, medium, hard",
          },
          {
            name: "Deep Tissue",
            variants: [{ name: "60 mins" }, { name: "90 mins" }],
            notes: "pressure: light, medium, hard",
          },
          {
            name: "Stretch Therapy",
            variants: [{ name: "60 mins" }, { name: "90 mins" }],
            notes: "pressure: light, medium, hard",
          },
          {
            name: "Aromatherapy",
            variants: [{ name: "60 mins" }, { name: "90 mins" }],
            notes: "pressure: light, medium, hard",
          },
          {
            name: "Back & Shoulder",
            variants: [{ name: "60 mins" }, { name: "90 mins" }],
            notes: "pressure: light, medium, hard",
          },
          {
            name: "Foot Massage",
            variants: [{ name: "60 mins" }, { name: "90 mins" }],
            notes: "pressure: light, medium, hard",
          },
          {
            name: "Head Massage",
            variants: [{ name: "30 mins" }, { name: "60 mins" }],
            notes: "pressure: light, medium, hard",
          },
          {
            name: "Face Yoga / Massage",
            variants: [{ name: "30 mins" }, { name: "60 mins" }],
            notes: "pressure: light, medium, hard",
          },
        ],
      },
      {
        name: "Waxing & Hair Removal",
        services: [
          {
            name: "Full Body Wax",
            variants: [{ name: "Lycon" }, { name: "Normal" }],
            notes: "strip",
          },
          {
            name: "Legs Wax",
            variants: [{ name: "Lycon" }, { name: "Normal" }],
            notes: "strip",
          },
          {
            name: "Arms Wax",
            variants: [{ name: "Lycon" }, { name: "Normal" }],
            notes: "strip",
          },
          {
            name: "Underarm Wax",
            variants: [{ name: "Lycon" }, { name: "Normal" }],
            notes: "strip",
          },
          {
            name: "Bikini Wax",
            variants: [{ name: "Lycon" }, { name: "Normal" }],
            notes: "hot wax",
          },
          {
            name: "Brazilian Wax",
            variants: [{ name: "Lycon" }, { name: "Normal" }],
            notes: "hot wax",
          },
          {
            name: "Sugaring",
            variants: [{ name: "Lycon" }, { name: "Normal" }],
          },
        ],
      },
      {
        name: "Threading",
        services: [
          { name: "Lip" },
          { name: "Chin" },
          { name: "Full Face" },
          { name: "Eyebrows" },
        ],
      },
    ],
  },
  {
    name: "Home",
    subcategories: [
      {
        name: "Cleaning",
        services: [
          { name: "Standard Cleaning", notes: "Hour-based / subscription" },
          { name: "Deep Cleaning", notes: "Team required" },
          { name: "Move-In / Move-Out Cleaning" },
          {
            name: "Furniture Cleaning",
            variants: [{ name: "Sofa" }, { name: "Mattress" }],
          },
          { name: "Carpet Cleaning" },
          { name: "Window Cleaning" },
          { name: "Balcony Cleaning" },
        ],
      },
      {
        name: "AC Services",
        services: [
          {
            name: "AC Cleaning",
            variants: [{ name: "Standard" }, { name: "Deep Chemical" }],
          },
          { name: "AC Repair" },
          { name: "Gas Refill" },
        ],
      },
      {
        name: "Handyman",
        services: [
          {
            name: "Furniture Assembly",
            notes: "Charged hourly for all home services",
          },
          { name: "TV Mounting", notes: "Charged hourly for all home services" },
          {
            name: "Shelf / Frame Mounting",
            notes: "Charged hourly for all home services",
          },
          {
            name: "Minor Repairs",
            notes: "Charged hourly for all home services",
          },
          {
            name: "Electrical Fixes",
            notes: "Charged hourly for all home services",
          },
          {
            name: "Plumbing Fixes",
            notes: "Charged hourly for all home services",
          },
        ],
      },
      {
        name: "Appliances",
        services: [
          { name: "Washing Machine Service" },
          { name: "Dishwasher Service" },
          { name: "Fridge / Freezer Service" },
          { name: "Water Purifier Installation" },
        ],
      },
      {
        name: "Pest Control",
        services: [
          { name: "General Pest" },
          { name: "Termites" },
          { name: "Cockroaches / Ants / Mosquitos" },
          { name: "Bed Bugs" },
        ],
      },
    ],
  },
  {
    name: "Wellness",
    subcategories: [
      {
        name: "Fitness",
        services: [
          {
            name: "Personal Training",
            variants: [
              { name: "Strength" },
              { name: "Weight Loss" },
              { name: "Mobility" },
            ],
          },
          {
            name: "Yoga",
            variants: [{ name: "Vinyasa" }, { name: "Hatha" }],
          },
          {
            name: "Pilates",
            variants: [{ name: "Mat" }],
          },
        ],
      },
    ],
  },
  {
    name: "Healthcare at Home",
    subcategories: [
      {
        name: "Wellness",
        services: [
          {
            name: "IV Therapy",
            variants: [
              { name: "Health" },
              { name: "Beauty & Anti-Aging" },
              { name: "Immune" },
              { name: "Recovery" },
              { name: "Hydration" },
            ],
          },
          {
            name: "Lab Tests",
            variants: [
              { name: "Food Intolerance" },
              { name: "Vitamin / Mineral Panel" },
              { name: "Tests" },
              { name: "Full Blood Count" },
              { name: "Thyroid & Hormones" },
              { name: "Comprehensive Female" },
              { name: "Comprehensive Male" },
              { name: "Urine Tests" },
              { name: "Stool Tests" },
            ],
          },
          {
            name: "Vaccines",
            variants: [{ name: "PCR" }, { name: "FLU" }],
          },
          { name: "Physio" },
          {
            name: "Weight Loss",
            variants: [{ name: "GLP Injections" }, { name: "Diet" }],
          },
        ],
      },
      {
        name: "Medical",
        services: [
          {
            name: "Nurse Care",
            notes: "final cost dependent on treatments",
          },
          {
            name: "Doctor Consult",
            notes: "final cost dependent on treatments",
          },
          {
            name: "Psychotherapy",
            notes: "final cost dependent on treatments",
          },
        ],
      },
    ],
  },
  {
    name: "Pets",
    subcategories: [
      {
        name: "Grooming",
        services: [
          {
            name: "Dog Grooming",
            variants: [{ name: "Small" }, { name: "Medium" }, { name: "Large" }],
          },
          {
            name: "Cat Grooming",
            variants: [{ name: "Short Hair" }, { name: "Long Hair" }],
          },
          { name: "Bath & Blowdry" },
          { name: "Flea & Tick Treatment" },
          { name: "Nail Clipping" },
        ],
      },
      {
        name: "Training & Walking",
        services: [
          { name: "Dog Walking", notes: "time based" },
          { name: "Basic Training", notes: "time based" },
          { name: "Behavioural Training", notes: "time based" },
        ],
      },
    ],
  },
  {
    name: "Lifestyle",
    subcategories: [
      {
        name: "Personal Services",
        services: [
          {
            name: "Personal Chef",
            variants: [{ name: "Meal Prep" }, { name: "Dinner Party" }],
          },
          { name: "Laundry & Ironing" },
          {
            name: "Shoe/Bag Repair",
            variants: [
              { name: "Full Restoration" },
              { name: "Minor Tidy Up" },
            ],
          },
          { name: "Shoe Cleaning" },
        ],
      },
      {
        name: "Content",
        services: [
          { name: "Photography", notes: "time based" },
          { name: "Videography", notes: "time based" },
        ],
      },
      {
        name: "Errands",
        services: [{ name: "Grocery Run" }, { name: "Parcel Pick/Drop" }],
      },
      {
        name: "Kids",
        services: [{ name: "Babysitting" }],
      },
    ],
  },
  {
    name: "Events",
    subcategories: [
      {
        name: "Special Occasions",
        services: [
          {
            name: "Wedding",
            notes: "bundle based on number of services",
          },
          {
            name: "Engagement Party",
            notes: "bundle based on number of services",
          },
          {
            name: "Bachelorettes",
            notes: "bundle based on number of services",
          },
          {
            name: "Birthday Parties",
            notes: "bundle based on number of services",
          },
          {
            name: "Pre Event",
            notes: "bundle based on number of services",
          },
        ],
      },
    ],
  },
];
