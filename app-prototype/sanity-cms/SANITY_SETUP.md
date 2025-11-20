# Sanity CMS Setup Guide

## Overview

Complete Sanity CMS configuration for Veyya platform with schemas for:
- ✅ Provider Profiles (with portfolio, stats, location)
- ✅ Service Categories (multilingual)
- ✅ Services (with pricing, add-ons, FAQs)
- 🔜 Static Pages (FAQ, Terms, Privacy)
- 🔜 Blog Posts
- 🔜 Banners & Promotions

## Schema Comparison

### Current vs. Data Model

| Schema | Status | Fields | Notes |
|--------|--------|--------|-------|
| **providerProfile** | ✅ Enhanced | 24 fields | Added: portfolio, stats, location, verified badge |
| **serviceCategory** | ✅ Created | 8 fields | Multilingual, featured, display order |
| **service** | ✅ Created | 13 fields | With add-ons, pricing, duration |
| **staticPage** | 🔜 TODO | - | FAQ, Terms, Privacy content |
| **blogPost** | 🔜 TODO | - | Content marketing |
| **banner** | 🔜 TODO | - | Homepage promotions |

### Provider Profile Schema Changes

**Old (Simple):**
```typescript
{
  name, rating, basePrice, categories,
  nextAvailableISO, heroImage, shortBio, slug
}
```

**New (Enhanced):**
```typescript
{
  // Identity
  name, slug, status (PENDING/APPROVED/SUSPENDED/REJECTED),

  // Content
  bio, shortBio, profilePhoto, heroImage, portfolio[12],

  // Stats
  rating, reviewCount, responseRate, onTimeRate, totalBookings,

  // Services
  basePrice, categories[], languages[], serviceRadius,

  // Location
  location: { lat, lng, address },

  // Scheduling
  nextAvailableISO,

  // Badges
  verifiedBadge (auto-awarded: 100% profile, 10+ bookings, 4.5+ rating, 95%+ response)
}
```

## Installation & Setup

### 1. Initialize Sanity Project (First Time Only)

```bash
cd ~/Projects/veyya/app-prototype/sanity-cms

# Login to Sanity
npx sanity login

# Initialize project
npx sanity init

# Follow prompts:
# - Project name: veyya-cms
# - Dataset: production
# - Use default config: Yes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Sanity Studio

```bash
npm run dev
# Opens on http://localhost:3333
```

### 4. Seed Sample Data

```bash
# Add seed script to package.json
npm run seed

# Or run directly:
npx sanity exec scripts/seed.ts --with-user-token
```

## Seed Data

The seed script creates:

### Service Categories (3)
1. **Beauty Services** - Nails, Hair, Makeup, Lashes
2. **Pet Care** - Dog/Cat Grooming, Walking, Sitting
3. **Cleaning Services** - Deep, Regular, Move-in/out

### Services (3)
1. **Gel Manicure** - ฿120, 60 min
   - Add-ons: Nail Art (฿20), Hand Paraffin (฿50)
2. **Spa Pedicure** - ฿150, 75 min
3. **Dog Grooming** - ฿200, 90 min

### Provider Profiles (6)

| Provider | Status | Rating | Bookings | Verified | Categories |
|----------|--------|--------|----------|----------|------------|
| **Lina Beauty Studio** | APPROVED | 4.8 | 145 | ✓ | Beauty, Nails |
| **Clean & Calm** | APPROVED | 4.6 | 112 | ✓ | Cleaning |
| **Pawsitive Pet Care** | APPROVED | 4.9 | 228 | ✓ | Pet Care |
| **Glam Squad** | APPROVED | 4.7 | 78 | ✗ | Beauty, Makeup, Hair |
| **Zen Wellness & Massage** | APPROVED | 4.85 | 178 | ✓ | Wellness |
| **Sparkle Home Services** | PENDING_APPROVAL | - | 0 | ✗ | Cleaning |

## Environment Configuration

### Sanity Studio (sanity-cms/.env)

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2025-01-01
```

### Next.js App (veyya-web/.env.local)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_API_TOKEN=your-read-token  # Optional: for private datasets
```

## GROQ Queries for Next.js Integration

### Fetch Approved Providers with Location

```typescript
const query = `*[_type == "providerProfile" && status == "APPROVED"] | order(rating desc) {
  _id,
  name,
  slug,
  shortBio,
  "profilePhoto": profilePhoto.asset->url,
  "heroImage": heroImage.asset->url,
  "portfolio": portfolio[].asset->url,
  rating,
  reviewCount,
  responseRate,
  onTimeRate,
  totalBookings,
  basePrice,
  categories,
  languages,
  serviceRadius,
  location,
  nextAvailableISO,
  verifiedBadge
}`;

const providers = await sanityClient.fetch(query);
```

### Fetch Provider by Slug with Full Details

```typescript
const query = `*[_type == "providerProfile" && slug.current == $slug][0] {
  _id,
  name,
  bio,
  shortBio,
  "profilePhoto": profilePhoto.asset->url,
  "heroImage": heroImage.asset->url,
  "portfolio": portfolio[] {
    "url": asset->url,
    caption,
    alt
  },
  rating,
  reviewCount,
  responseRate,
  onTimeRate,
  totalBookings,
  basePrice,
  categories,
  languages,
  serviceRadius,
  location,
  nextAvailableISO,
  verifiedBadge,
  status
}`;

const provider = await sanityClient.fetch(query, { slug: 'lina-beauty-studio' });
```

### Fetch Services by Category

```typescript
const query = `*[_type == "service" && active == true && category->slug.current == $categorySlug] | order(displayOrder asc) {
  _id,
  slug,
  title,
  shortDescription,
  description,
  basePrice,
  durationMinutes,
  "imageUrl": image.asset->url,
  "category": category-> {
    title,
    slug
  },
  subcategory,
  addOns,
  displayOrder
}`;

const services = await sanityClient.fetch(query, { categorySlug: 'beauty' });
```

### Search Providers with Filters

```typescript
// Backend ranking algorithm should be applied after fetch
const query = `*[_type == "providerProfile" && status == "APPROVED" && $category in categories] {
  _id,
  name,
  slug,
  rating,
  basePrice,
  categories,
  responseRate,
  location,
  nextAvailableISO,
  verifiedBadge,
  "profilePhoto": profilePhoto.asset->url
}`;

const providers = await sanityClient.fetch(query, { category: 'Beauty' });

// Then apply ranking algorithm (distance 40% + rating 40% + response 20%)
```

## Update Next.js CMS Integration

Update `/src/lib/cms.ts`:

```typescript
import { createClient } from "@sanity/client";

const useSanity =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your-project-id' &&
  process.env.NEXT_PUBLIC_SANITY_DATASET;

const client = useSanity ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: true,
}) : null;

export async function listProviders(filters?: {
  category?: string;
  status?: string;
}) {
  if (!useSanity || !client) {
    return MOCK_PROVIDERS; // Fallback
  }

  const categoryFilter = filters?.category
    ? `&& "${filters.category}" in categories`
    : "";

  const statusFilter = filters?.status
    ? `&& status == "${filters.status}"`
    : `&& status == "APPROVED"`;

  const query = `*[_type == "providerProfile" ${statusFilter} ${categoryFilter}] {
    _id,
    name,
    slug,
    rating,
    basePrice,
    categories,
    nextAvailableISO,
    "heroImage": heroImage.asset->url,
    shortBio,
    verifiedBadge,
    responseRate,
    location
  }[0...100]`;

  return await client.fetch(query);
}
```

## Sanity Studio Customization

### Custom Document Actions

Add admin workflows in `sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  // ... existing config

  // Custom structure for better organization
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Providers')
              .child(
                S.list()
                  .title('Provider Status')
                  .items([
                    S.listItem()
                      .title('Pending Approval')
                      .child(
                        S.documentList()
                          .title('Pending')
                          .filter('_type == "providerProfile" && status == "PENDING_APPROVAL"')
                      ),
                    S.listItem()
                      .title('Approved')
                      .child(
                        S.documentList()
                          .title('Approved')
                          .filter('_type == "providerProfile" && status == "APPROVED"')
                      ),
                    S.divider(),
                    ...S.documentTypeListItems().filter(
                      (listItem) => listItem.getId() === 'providerProfile'
                    ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Service Catalog')
              .child(
                S.list()
                  .title('Services')
                  .items([
                    S.documentTypeListItem('serviceCategory').title('Categories'),
                    S.documentTypeListItem('service').title('Services'),
                  ])
              ),
          ]),
    }),
  ],
});
```

## Testing

### 1. Verify Studio Access

```bash
open http://localhost:3333
```

Should see:
- 6 provider profiles (5 approved, 1 pending)
- 3 service categories
- 3 services

### 2. Test GROQ Queries in Vision Tool

Sanity Studio → Vision tab → Try queries:

```groq
// Count providers by status
{
  "approved": count(*[_type == "providerProfile" && status == "APPROVED"]),
  "pending": count(*[_type == "providerProfile" && status == "PENDING_APPROVAL"]),
  "total": count(*[_type == "providerProfile"])
}
```

### 3. Test Next.js Integration

```bash
cd ~/Projects/veyya/app-prototype/veyya-web

# Update .env.local with Sanity credentials
pnpm dev

# Visit http://localhost:3000/search
# Should load providers from Sanity instead of mocks
```

## Deployment

### Sanity Studio

```bash
npm run build
npm run deploy

# Deploys to: https://your-project.sanity.studio
```

### Production Dataset

Create separate dataset for production:

```bash
npx sanity dataset create production

# Update environment variables
SANITY_STUDIO_DATASET=production
```

## Maintenance

### Backup Data

```bash
npx sanity dataset export production backup.tar.gz
```

### Import Data

```bash
npx sanity dataset import backup.tar.gz production
```

### Reset Development Data

```bash
npm run seed
```

## Troubleshooting

### "Cannot find project"

```bash
# Re-init project
npx sanity init --reconfigure
```

### "Missing schema type"

```bash
# Restart Sanity Studio
npm run dev
```

### CORS Errors in Next.js

Add domain to Sanity project settings:
1. Go to https://sanity.io/manage
2. Select project
3. API → CORS Origins
4. Add: `http://localhost:3000`, `https://your-domain.com`

## Next Steps

1. ✅ Run seed script to populate data
2. ✅ Update Next.js CMS integration to use Sanity
3. 🔜 Add image uploads to provider portfolios
4. 🔜 Create admin approval workflow for pending providers
5. 🔜 Add static pages (FAQ, Terms, Privacy)
6. 🔜 Set up webhooks to sync services to PostgreSQL

## Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Cheat Sheet**: https://www.sanity.io/docs/query-cheat-sheet
- **Sanity Studio**: http://localhost:3333
- **Manage Project**: https://sanity.io/manage

---

**Status**: ✅ Ready for seeding and integration
**Last Updated**: 2025-10-26
**Version**: 1.0.0
