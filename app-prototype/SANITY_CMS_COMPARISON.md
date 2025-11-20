# Sanity CMS Schema Comparison & Migration

## Schema Comparison: Data Model vs. Current Implementation

### ✅ Completed Schemas

| Schema | Data Model | Current Status | Fields | Changes |
|--------|------------|----------------|--------|---------|
| **providerProfile** | Reference | ✅ **Enhanced** | 24 fields | Added 16 fields |
| **serviceCategory** | Complete spec | ✅ **Created** | 8 fields | New schema |
| **service** | Complete spec | ✅ **Created** | 13 fields | New schema |

### 🔜 Pending Schemas (Post-MVP)

| Schema | Data Model | Priority | Notes |
|--------|------------|----------|-------|
| **staticPage** | Complete spec | P1 | FAQ, Terms, Privacy pages |
| **blogPost** | Complete spec | P2 | Content marketing |
| **banner** | Complete spec | P2 | Homepage promotions |
| **appSettings** | Complete spec | P1 | Global configuration |

---

## Provider Profile Schema Evolution

### Old Schema (Basic - 8 fields)
```typescript
{
  name: string,
  rating: number,
  basePrice: number,
  categories: string[],
  nextAvailableISO: datetime,
  heroImage: url,
  shortBio: text,
  slug: slug
}
```

### New Schema (Enhanced - 24 fields)

#### Identity & Status (4 fields)
```typescript
{
  name: string,           // Provider name
  slug: slug,             // URL-friendly identifier
  status: enum,           // PENDING_APPROVAL | APPROVED | SUSPENDED | REJECTED
}
```

#### Content & Media (5 fields)
```typescript
{
  bio: text,              // Full biography (unlimited)
  shortBio: text,         // Brief description (max 200 chars)
  profilePhoto: image,    // Profile avatar
  heroImage: image,       // Cover/hero image
  portfolio: image[12],   // Portfolio gallery (up to 12 images)
}
```

#### Statistics & Performance (5 fields)
```typescript
{
  rating: number,         // Weighted average 0-5
  reviewCount: number,    // Total reviews
  responseRate: number,   // 0-1 decimal (95% = 0.95)
  onTimeRate: number,     // 0-1 decimal (98% = 0.98)
  totalBookings: number,  // Completed bookings
}
```

#### Service Details (4 fields)
```typescript
{
  basePrice: number,      // Starting price in THB
  categories: string[],   // Beauty, Nails, Pet Care, etc.
  languages: string[],    // English, Thai, Mandarin, Japanese
  serviceRadius: number,  // Travel radius in km
}
```

#### Location & Scheduling (2 fields)
```typescript
{
  location: {
    lat: number,
    lng: number,
    address: string
  },
  nextAvailableISO: datetime,  // Next booking slot
}
```

#### Badges & Verification (1 field)
```typescript
{
  verifiedBadge: boolean,  // Auto-awarded: 100% profile, 10+ bookings, 4.5+ rating, 95%+ response
}
```

---

## Service Category Schema (NEW)

### Full Schema
```typescript
{
  slug: slug,                    // URL identifier
  title: { en: string, th: string },
  description: { en: text, th: text },
  icon: string,                  // Lucide icon name
  image: image,                  // Category image
  featured: boolean,             // Show on homepage
  displayOrder: number,          // Sort order
  active: boolean,               // Hide if inactive
}
```

### Multilingual Support
- English and Thai content
- Separate fields for title and description
- SEO-friendly slugs

---

## Service Schema (NEW)

### Full Schema
```typescript
{
  slug: slug,
  category: reference(serviceCategory),
  subcategory: enum,             // nails, hair, dog_grooming, etc.
  title: { en: string, th: string },
  description: { en: text, th: text },
  shortDescription: { en: string(100), th: string(100) },
  basePrice: number,             // THB
  durationMinutes: number,
  image: image,
  addOns: [{
    nameEn: string,
    nameTh: string,
    price: number,
    durationMinutes: number
  }],
  active: boolean,
  displayOrder: number,
}
```

### Key Features
- **Multilingual**: English/Thai content
- **Add-ons**: Optional service additions
- **Pricing**: Base price with add-on options
- **Duration**: Service time estimation
- **Categorization**: Reference to parent category + subcategory

---

## Seed Data Summary

### 6 Sample Providers

| Provider | Status | Rating | Bookings | Verified | Details |
|----------|--------|--------|----------|----------|---------|
| **Lina Beauty Studio** | APPROVED | 4.8 (127 reviews) | 145 | ✓ | Beauty, Nails • 96% response • 15km radius |
| **Clean & Calm** | APPROVED | 4.6 (89 reviews) | 112 | ✓ | Cleaning • 92% response • 20km radius |
| **Pawsitive Pet Care** | APPROVED | 4.9 (203 reviews) | 228 | ✓ | Pet Care • 98% response • 12km radius |
| **Glam Squad** | APPROVED | 4.7 (65 reviews) | 78 | ✗ | Beauty, Makeup, Hair • 89% response |
| **Zen Wellness & Massage** | APPROVED | 4.85 (156 reviews) | 178 | ✓ | Wellness • 94% response • 10km radius |
| **Sparkle Home Services** | PENDING_APPROVAL | No rating | 0 | ✗ | Cleaning • New provider |

### 3 Service Categories

1. **Beauty Services** (featured)
   - Icon: sparkles
   - Subcategories: Nails, Hair, Makeup, Lashes

2. **Pet Care** (featured)
   - Icon: dog
   - Subcategories: Dog/Cat Grooming, Walking, Sitting

3. **Cleaning Services**
   - Icon: sparkles
   - Subcategories: Deep, Regular, Move-in/out

### 3 Services

1. **Gel Manicure** - ฿120, 60 min
   - Category: Beauty → Nails
   - Add-ons: Nail Art (฿20), Hand Paraffin (฿50)

2. **Spa Pedicure** - ฿150, 75 min
   - Category: Beauty → Nails

3. **Dog Grooming** - ฿200, 90 min
   - Category: Pet Care → Dog Grooming

---

## Migration Path

### Phase 1: ✅ Schema Updates (Completed)
- [x] Enhanced providerProfile with 16 new fields
- [x] Created serviceCategory schema
- [x] Created service schema
- [x] Updated schema index

### Phase 2: ✅ Seed Script (Completed)
- [x] Created seed.ts with sample data
- [x] 6 diverse provider profiles
- [x] 3 service categories
- [x] 3 services with add-ons
- [x] Added seed command to package.json

### Phase 3: 🔜 Sanity Setup (Next)
1. Run `npx sanity login`
2. Run `npx sanity init` (if not already)
3. Start Studio: `npm run dev`
4. Run seed: `npm run seed`
5. Verify data in Studio

### Phase 4: 🔜 Next.js Integration (Next)
1. Get Sanity project ID from Studio
2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_VERSION=2025-01-01
   ```
3. Update `src/lib/cms.ts` with Sanity queries
4. Test provider fetching
5. Update search page to use Sanity data

### Phase 5: 🔜 Additional Schemas (Post-MVP)
- [ ] Static pages (FAQ, Terms, Privacy)
- [ ] Blog posts for content marketing
- [ ] Banners for promotions
- [ ] App settings for global config

---

## Key Improvements

### 1. Provider Profiles
- **Before**: Basic info (8 fields, no portfolio, no stats)
- **After**: Complete profile (24 fields, portfolio, stats, location, verification)

### 2. Service Catalog
- **Before**: None (hardcoded in frontend)
- **After**: Full CMS-managed catalog with categories, services, pricing, add-ons

### 3. Multilingual Support
- **Before**: English only
- **After**: English + Thai for all content

### 4. Status Management
- **Before**: No approval workflow
- **After**: PENDING → APPROVED → SUSPENDED workflow

### 5. Location & Distance
- **Before**: No location data
- **After**: GPS coordinates + address + service radius

### 6. Portfolio & Media
- **Before**: Single hero image
- **After**: Profile photo + hero image + 12 portfolio images

### 7. Performance Metrics
- **Before**: Only rating
- **After**: Rating, reviews, response rate, on-time rate, total bookings

### 8. Verification Badge
- **Before**: None
- **After**: Auto-awarded "Veyya Verified" badge based on criteria

---

## GROQ Query Examples

### Fetch All Approved Providers with Stats

```groq
*[_type == "providerProfile" && status == "APPROVED"] | order(rating desc) {
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
}
```

### Fetch Provider by Slug with Full Details

```groq
*[_type == "providerProfile" && slug.current == $slug][0] {
  ...,
  "profilePhoto": profilePhoto.asset->url,
  "heroImage": heroImage.asset->url,
  "portfolio": portfolio[] {
    "url": asset->url,
    caption,
    alt
  }
}
```

### Fetch Services by Category

```groq
*[_type == "service" && active == true && category->slug.current == $categorySlug] | order(displayOrder asc) {
  _id,
  slug,
  title,
  shortDescription,
  basePrice,
  durationMinutes,
  "imageUrl": image.asset->url,
  "category": category->{title, slug},
  addOns
}
```

### Search Providers with Filters

```groq
*[_type == "providerProfile"
  && status == "APPROVED"
  && $category in categories
  && rating >= $minRating
] {
  _id,
  name,
  slug,
  rating,
  basePrice,
  categories,
  responseRate,
  location,
  "profilePhoto": profilePhoto.asset->url
}
```

---

## Testing Checklist

### Sanity Studio Tests
- [ ] All schemas visible in Studio
- [ ] Can create new provider profile
- [ ] Can upload portfolio images
- [ ] Can create services with add-ons
- [ ] Status dropdown works (PENDING → APPROVED)
- [ ] Preview shows correctly in list view

### Seed Script Tests
- [ ] Seed runs without errors
- [ ] 6 providers created
- [ ] 3 categories created
- [ ] 3 services created
- [ ] Provider stats populate correctly
- [ ] Location data includes lat/lng
- [ ] Portfolio images array populated

### Next.js Integration Tests
- [ ] Can fetch providers from Sanity
- [ ] Search page displays Sanity data
- [ ] Provider detail page loads correctly
- [ ] Images render from Sanity CDN
- [ ] Filtering by category works
- [ ] Rating and stats display correctly

---

## File Changes Summary

### New Files Created (5)
```
sanity-cms/
├── schemaTypes/
│   ├── serviceCategory.ts    (NEW - 95 lines)
│   ├── service.ts             (NEW - 130 lines)
│   └── index.ts               (UPDATED - added imports)
├── scripts/
│   └── seed.ts                (NEW - 350 lines)
├── SANITY_SETUP.md            (NEW - 400 lines documentation)
└── package.json               (UPDATED - added seed script)
```

### Updated Files (2)
```
sanity-cms/
├── schemaTypes/
│   └── providerProfile.ts     (ENHANCED - 8 → 24 fields)
└── package.json               (UPDATED - added "seed" script)
```

### Documentation Created (2)
```
app-prototype/
├── SANITY_CMS_COMPARISON.md   (NEW - this file)
└── sanity-cms/
    └── SANITY_SETUP.md        (NEW - setup guide)
```

---

## Next Steps

1. **Initialize Sanity Project** (if not already)
   ```bash
   cd sanity-cms
   npx sanity login
   npx sanity init
   ```

2. **Start Studio**
   ```bash
   npm run dev
   ```

3. **Run Seed Script**
   ```bash
   npm run seed
   ```

4. **Verify Data in Studio**
   - Open http://localhost:3333
   - Check Providers (should see 6)
   - Check Service Categories (should see 3)
   - Check Services (should see 3)

5. **Update Next.js Integration**
   - Get project ID from Studio
   - Update `.env.local`
   - Update `src/lib/cms.ts` queries
   - Test provider fetching

6. **Deploy to Production**
   ```bash
   npm run build
   npm run deploy
   ```

---

**Status**: ✅ **Schema migration complete, ready for seeding**
**Last Updated**: 2025-10-26
**Files Created**: 7 files (5 new, 2 updated)
**Total Lines**: ~1,200 lines of schemas and seed data
