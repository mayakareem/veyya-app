# Veyya Sanity CMS Studio

Content management studio for the Veyya service marketplace platform.

## Quick Start

**First time setup:**
```bash
# 1. Login to Sanity
npx sanity login

# 2. Initialize project (creates project ID)
npx sanity init

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your project ID

# 4. Start the studio
npm run dev
```

**Studio will be available at:** http://localhost:3333

## Schema

### Provider Profile
Fields defined in `schemaTypes/providerProfile.ts`:
- name, rating, basePrice, categories
- nextAvailableISO, heroImage, shortBio, slug

## Scripts

```bash
npm run dev              # Start dev server (port 3333)
npm run build            # Build for production
npm run deploy           # Deploy to Sanity hosting
```

## Integration

This Studio manages content fetched by the Next.js app at `../veyya-web` via `@sanity/client`.
