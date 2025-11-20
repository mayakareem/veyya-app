/**
 * Sanity Data Seeding Script
 *
 * Creates sample providers, services, and categories for development
 *
 * Usage:
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * Or add to package.json:
 *   "seed": "sanity exec scripts/seed.ts --with-user-token"
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

// ============================================================================
// SAMPLE DATA
// ============================================================================

const serviceCategories = [
  {
    _type: 'serviceCategory',
    _id: 'category-beauty',
    slug: { current: 'beauty', _type: 'slug' },
    title: {
      en: 'Beauty Services',
      th: 'บริการความงาม',
    },
    description: {
      en: 'Professional beauty treatments at your doorstep',
      th: 'บริการความงามมืออาชีพถึงบ้านคุณ',
    },
    icon: 'sparkles',
    featured: true,
    displayOrder: 1,
    active: true,
  },
  {
    _type: 'serviceCategory',
    _id: 'category-petcare',
    slug: { current: 'pet-care', _type: 'slug' },
    title: {
      en: 'Pet Care',
      th: 'ดูแลสัตว์เลี้ยง',
    },
    description: {
      en: 'Professional pet grooming and care services',
      th: 'บริการตัดแต่งและดูแลสัตว์เลี้ยงมืออาชีพ',
    },
    icon: 'dog',
    featured: true,
    displayOrder: 2,
    active: true,
  },
  {
    _type: 'serviceCategory',
    _id: 'category-cleaning',
    slug: { current: 'cleaning', _type: 'slug' },
    title: {
      en: 'Cleaning Services',
      th: 'บริการทำความสะอาด',
    },
    description: {
      en: 'Professional home and office cleaning',
      th: 'ทำความสะอาดบ้านและสำนักงานอย่างมืออาชีพ',
    },
    icon: 'sparkles',
    featured: false,
    displayOrder: 3,
    active: true,
  },
];

const services = [
  {
    _type: 'service',
    _id: 'service-gel-manicure',
    slug: { current: 'gel-manicure', _type: 'slug' },
    category: { _type: 'reference', _ref: 'category-beauty' },
    subcategory: 'nails',
    title: {
      en: 'Gel Manicure',
      th: 'ทาเล็บเจล',
    },
    description: {
      en: 'Long-lasting gel polish application with nail shaping, cuticle care, and hand massage',
      th: 'ทาเล็บเจลที่ทนทานพร้อมตัดแต่งเล็บ ดูแลหนังเล็บ และนวดมือ',
    },
    shortDescription: {
      en: 'Long-lasting gel polish with nail care',
      th: 'เล็บเจลทนทานพร้อมการดูแล',
    },
    basePrice: 120,
    durationMinutes: 60,
    addOns: [
      {
        nameEn: 'Nail Art (per nail)',
        nameTh: 'ลายเล็บ (ต่อเล็บ)',
        price: 20,
        durationMinutes: 10,
      },
      {
        nameEn: 'Hand Paraffin Treatment',
        nameTh: 'บำรุงมือด้วยพาราฟิน',
        price: 50,
        durationMinutes: 15,
      },
    ],
    active: true,
    displayOrder: 1,
  },
  {
    _type: 'service',
    _id: 'service-spa-pedicure',
    slug: { current: 'spa-pedicure', _type: 'slug' },
    category: { _type: 'reference', _ref: 'category-beauty' },
    subcategory: 'nails',
    title: {
      en: 'Spa Pedicure',
      th: 'สปาเท้า',
    },
    description: {
      en: 'Relaxing foot soak, exfoliation, nail shaping, cuticle care, massage, and polish',
      th: 'แช่เท้าผ่อนคลาย ขัดผิว ตัดแต่งเล็บ ดูแลหนังเล็บ นวด และทาเล็บ',
    },
    shortDescription: {
      en: 'Complete foot care and relaxation',
      th: 'ดูแลและผ่อนคลายเท้าอย่างครบวงจร',
    },
    basePrice: 150,
    durationMinutes: 75,
    active: true,
    displayOrder: 2,
  },
  {
    _type: 'service',
    _id: 'service-dog-grooming',
    slug: { current: 'dog-grooming', _type: 'slug' },
    category: { _type: 'reference', _ref: 'category-petcare' },
    subcategory: 'dog_grooming',
    title: {
      en: 'Dog Grooming',
      th: 'ตัดแต่งสุนัข',
    },
    description: {
      en: 'Full grooming service including bath, brush, haircut, nail trim, and ear cleaning',
      th: 'บริการตัดแต่งครบวงจร รวมอาบน้ำ หวีขน ตัดขน ตัดเล็บ และทำความสะอาดหู',
    },
    shortDescription: {
      en: 'Complete grooming for your furry friend',
      th: 'ตัดแต่งสุนัขอย่างครบวงจร',
    },
    basePrice: 200,
    durationMinutes: 90,
    active: true,
    displayOrder: 1,
  },
];

const providerProfiles = [
  {
    _type: 'providerProfile',
    _id: 'provider-lina',
    name: 'Lina Beauty Studio',
    slug: { current: 'lina-beauty-studio', _type: 'slug' },
    status: 'APPROVED',
    bio: 'Professional beauty specialist with over 8 years of experience in nail art and spa treatments. Certified in gel application, nail art design, and reflexology. Known for attention to detail and creating a relaxing atmosphere. All tools are sanitized and single-use items are provided for each client.',
    shortBio: 'Premium beauty at-home services with hygiene-first standards and 8+ years experience.',
    rating: 4.8,
    reviewCount: 127,
    responseRate: 0.96,
    onTimeRate: 0.98,
    totalBookings: 145,
    basePrice: 120,
    categories: ['Beauty', 'Nails'],
    languages: ['English', 'Thai'],
    serviceRadius: 15,
    location: {
      lat: 13.7563,
      lng: 100.5018,
      address: 'Sukhumvit Area, Bangkok',
    },
    nextAvailableISO: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(), // 6 hours from now
    verifiedBadge: true,
  },
  {
    _type: 'providerProfile',
    _id: 'provider-clean-calm',
    name: 'Clean & Calm',
    slug: { current: 'clean-calm', _type: 'slug' },
    status: 'APPROVED',
    bio: 'Professional home cleaning service with a team of experienced cleaners. We specialize in deep cleaning, regular maintenance, and move-in/out services. Using eco-friendly products and modern equipment. Insured and background-checked team members.',
    shortBio: 'Trusted home cleaning specialists with eco-friendly products and flexible hours.',
    rating: 4.6,
    reviewCount: 89,
    responseRate: 0.92,
    onTimeRate: 0.95,
    totalBookings: 112,
    basePrice: 80,
    categories: ['Cleaning'],
    languages: ['English', 'Thai'],
    serviceRadius: 20,
    location: {
      lat: 13.7441,
      lng: 100.5339,
      address: 'Sathorn Area, Bangkok',
    },
    nextAvailableISO: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(), // 12 hours from now
    verifiedBadge: true,
  },
  {
    _type: 'providerProfile',
    _id: 'provider-pawsitive',
    name: 'Pawsitive Pet Care',
    slug: { current: 'pawsitive-pet-care', _type: 'slug' },
    status: 'APPROVED',
    bio: 'Certified pet groomer and veterinary assistant with 6 years of experience working with dogs and cats of all breeds and sizes. Specialized in gentle grooming techniques for nervous or senior pets. Mobile grooming van equipped with professional-grade tools and climate control.',
    shortBio: 'Gentle, certified pet grooming for all breeds. Mobile service with professional equipment.',
    rating: 4.9,
    reviewCount: 203,
    responseRate: 0.98,
    onTimeRate: 0.99,
    totalBookings: 228,
    basePrice: 180,
    categories: ['Pet Care'],
    languages: ['English', 'Thai', 'Japanese'],
    serviceRadius: 12,
    location: {
      lat: 13.7308,
      lng: 100.5418,
      address: 'Silom Area, Bangkok',
    },
    nextAvailableISO: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours from now
    verifiedBadge: true,
  },
  {
    _type: 'providerProfile',
    _id: 'provider-glam-squad',
    name: 'Glam Squad',
    slug: { current: 'glam-squad', _type: 'slug' },
    status: 'APPROVED',
    bio: 'Professional makeup artist and hairstylist team available for weddings, events, and special occasions. Portfolio includes work with fashion shows, TV productions, and celebrity clients. Using high-end cosmetics and professional-grade equipment. Trial sessions available.',
    shortBio: 'Professional makeup and hair for weddings and special events. High-end products.',
    rating: 4.7,
    reviewCount: 65,
    responseRate: 0.89,
    onTimeRate: 0.93,
    totalBookings: 78,
    basePrice: 250,
    categories: ['Beauty', 'Makeup', 'Hair'],
    languages: ['English', 'Thai'],
    serviceRadius: 25,
    location: {
      lat: 13.7465,
      lng: 100.5355,
      address: 'Chong Nonsi Area, Bangkok',
    },
    nextAvailableISO: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 48 hours from now
    verifiedBadge: false, // New provider, hasn't met all criteria yet
  },
  {
    _type: 'providerProfile',
    _id: 'provider-zen-wellness',
    name: 'Zen Wellness & Massage',
    slug: { current: 'zen-wellness-massage', _type: 'slug' },
    status: 'APPROVED',
    bio: 'Certified Thai massage therapist with traditional training from Wat Pho and modern spa techniques. Specializing in therapeutic massage, aromatherapy, and reflexology. Portable massage table and organic massage oils included. Perfect for stress relief and muscle recovery.',
    shortBio: 'Traditional Thai massage with modern techniques. Certified therapist, organic oils.',
    rating: 4.85,
    reviewCount: 156,
    responseRate: 0.94,
    onTimeRate: 0.97,
    totalBookings: 178,
    basePrice: 160,
    categories: ['Wellness'],
    languages: ['Thai', 'English', 'Mandarin'],
    serviceRadius: 10,
    location: {
      lat: 13.7279,
      lng: 100.5241,
      address: 'Lumphini Area, Bangkok',
    },
    nextAvailableISO: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(), // 8 hours from now
    verifiedBadge: true,
  },
  {
    _type: 'providerProfile',
    _id: 'provider-sparkle-home',
    name: 'Sparkle Home Services',
    slug: { current: 'sparkle-home-services', _type: 'slug' },
    status: 'PENDING_APPROVAL',
    bio: 'New to Veyya but experienced in professional cleaning. Family-run business with 4 years in the industry. Specialized in post-construction cleaning and deep sanitization. All team members are trained and background-checked.',
    shortBio: 'Family-run cleaning business specializing in deep cleaning and sanitization.',
    rating: null,
    reviewCount: 0,
    responseRate: null,
    onTimeRate: null,
    totalBookings: 0,
    basePrice: 75,
    categories: ['Cleaning'],
    languages: ['Thai'],
    serviceRadius: 15,
    location: {
      lat: 13.7650,
      lng: 100.5380,
      address: 'Phrom Phong Area, Bangkok',
    },
    nextAvailableISO: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(), // 3 hours from now
    verifiedBadge: false,
  },
];

// ============================================================================
// SEED FUNCTIONS
// ============================================================================

async function deleteExistingData() {
  console.log('🗑️  Deleting existing data...');

  // Delete in reverse order of dependencies
  await client.delete({ query: '*[_type == "service"]' });
  await client.delete({ query: '*[_type == "providerProfile"]' });
  await client.delete({ query: '*[_type == "serviceCategory"]' });

  console.log('✅ Existing data deleted\n');
}

async function seedCategories() {
  console.log('📦 Seeding service categories...');

  for (const category of serviceCategories) {
    await client.createOrReplace(category);
    console.log(`  ✓ Created: ${category.title.en}`);
  }

  console.log('✅ Categories seeded\n');
}

async function seedServices() {
  console.log('🛠️  Seeding services...');

  for (const service of services) {
    await client.createOrReplace(service);
    console.log(`  ✓ Created: ${service.title.en}`);
  }

  console.log('✅ Services seeded\n');
}

async function seedProviders() {
  console.log('👤 Seeding provider profiles...');

  for (const provider of providerProfiles) {
    await client.createOrReplace(provider);
    console.log(`  ✓ Created: ${provider.name} (${provider.status})`);
  }

  console.log('✅ Providers seeded\n');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('\n🌱 Starting Sanity data seed...\n');
  console.log('Dataset:', client.config().dataset);
  console.log('Project ID:', client.config().projectId);
  console.log('\n');

  try {
    await deleteExistingData();
    await seedCategories();
    await seedServices();
    await seedProviders();

    console.log('🎉 Seed completed successfully!\n');
    console.log('Summary:');
    console.log(`  - ${serviceCategories.length} categories`);
    console.log(`  - ${services.length} services`);
    console.log(`  - ${providerProfiles.length} providers`);
    console.log(`  - ${providerProfiles.filter(p => p.status === 'APPROVED').length} approved providers`);
    console.log(`  - ${providerProfiles.filter(p => p.verifiedBadge).length} verified providers\n`);

    console.log('🚀 Next steps:');
    console.log('  1. Open Sanity Studio: http://localhost:3333');
    console.log('  2. View provider profiles and services');
    console.log('  3. Update Next.js app to fetch from Sanity\n');

  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  }
}

main();
