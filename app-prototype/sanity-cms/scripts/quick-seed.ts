/**
 * Quick Seed Script - Create Sample Providers
 *
 * Run: npx tsx scripts/quick-seed.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xr0e8ps9',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN, // You'll need to add this
});

const providers = [
  {
    _type: 'providerProfile',
    _id: 'provider-lina',
    name: 'Lina Beauty Studio',
    slug: { current: 'lina-beauty-studio', _type: 'slug' },
    status: 'APPROVED',
    rating: 4.8,
    basePrice: 120,
    categories: ['Beauty', 'Nails'],
    shortBio: 'Professional nail art and beauty services with 8+ years experience',
  },
  {
    _type: 'providerProfile',
    _id: 'provider-clean-calm',
    name: 'Clean & Calm',
    slug: { current: 'clean-calm', _type: 'slug' },
    status: 'APPROVED',
    rating: 4.6,
    basePrice: 300,
    categories: ['Cleaning'],
    shortBio: 'Eco-friendly cleaning services for busy professionals',
  },
  {
    _type: 'providerProfile',
    _id: 'provider-pawsitive',
    name: 'Pawsitive Pet Care',
    slug: { current: 'pawsitive-pet-care', _type: 'slug' },
    status: 'APPROVED',
    rating: 4.9,
    basePrice: 200,
    categories: ['Pet Care'],
    shortBio: 'Loving care for your furry friends - grooming, walking, and sitting',
  },
  {
    _type: 'providerProfile',
    _id: 'provider-glam-squad',
    name: 'Glam Squad',
    slug: { current: 'glam-squad', _type: 'slug' },
    status: 'APPROVED',
    rating: 4.7,
    basePrice: 250,
    categories: ['Beauty', 'Hair', 'Makeup'],
    shortBio: 'Full service beauty team for events and special occasions',
  },
  {
    _type: 'providerProfile',
    _id: 'provider-zen-wellness',
    name: 'Zen Wellness & Massage',
    slug: { current: 'zen-wellness', _type: 'slug' },
    status: 'APPROVED',
    rating: 4.85,
    basePrice: 350,
    categories: ['Wellness'],
    shortBio: 'Traditional Thai massage and wellness treatments',
  },
  {
    _type: 'providerProfile',
    _id: 'provider-sparkle-home',
    name: 'Sparkle Home Services',
    slug: { current: 'sparkle-home', _type: 'slug' },
    status: 'PENDING_APPROVAL',
    rating: 0,
    basePrice: 280,
    categories: ['Cleaning'],
    shortBio: 'New professional cleaning service - move-in/move-out specialists',
  },
  {
    _type: 'providerProfile',
    _id: 'provider-hair-art',
    name: 'Hair Art Studio',
    slug: { current: 'hair-art-studio', _type: 'slug' },
    status: 'APPROVED',
    rating: 4.75,
    basePrice: 180,
    categories: ['Hair', 'Beauty'],
    shortBio: 'Creative hair styling and coloring by certified professionals',
  },
  {
    _type: 'providerProfile',
    _id: 'provider-fit-life',
    name: 'FitLife Personal Training',
    slug: { current: 'fitlife-training', _type: 'slug' },
    status: 'APPROVED',
    rating: 4.8,
    basePrice: 400,
    categories: ['Fitness', 'Wellness'],
    shortBio: 'Personalized fitness training at your home or condo gym',
  },
  {
    _type: 'providerProfile',
    _id: 'provider-paw-palace',
    name: 'Paw Palace Mobile Grooming',
    slug: { current: 'paw-palace', _type: 'slug' },
    status: 'APPROVED',
    rating: 4.7,
    basePrice: 220,
    categories: ['Pet Care'],
    shortBio: 'Mobile pet grooming - we come to you with our fully equipped van',
  },
  {
    _type: 'providerProfile',
    _id: 'provider-pure-glow',
    name: 'Pure Glow Spa',
    slug: { current: 'pure-glow-spa', _type: 'slug' },
    status: 'APPROVED',
    rating: 4.9,
    basePrice: 320,
    categories: ['Beauty', 'Wellness'],
    shortBio: 'Luxury spa treatments and facials in the comfort of your home',
  },
];

async function seed() {
  console.log('🌱 Starting quick seed...\n');

  try {
    // Create providers
    for (const provider of providers) {
      console.log(`📝 Creating: ${provider.name}`);
      await client.createOrReplace(provider);
      console.log(`✅ Created: ${provider.name}`);
    }

    console.log(`\n🎉 Successfully created ${providers.length} providers!`);
    console.log('\n✨ Visit http://localhost:3333 to see them in Sanity Studio');
    console.log('✨ Visit http://localhost:3000/search to see them in your app\n');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

seed();
