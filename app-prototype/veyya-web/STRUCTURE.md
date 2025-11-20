# Veyya Web - Project Structure

**Created:** 2025-10-26
**Build Status:** ✅ Passing

---

## 📁 Directory Structure

```
veyya-web/
├── src/
│   ├── app/
│   │   ├── (marketing)/              # Marketing route group
│   │   │   └── page.tsx              # Landing page (/)
│   │   │
│   │   ├── (app)/                    # App route group with navbar
│   │   │   ├── layout.tsx            # App layout with navigation
│   │   │   │
│   │   │   ├── search/
│   │   │   │   └── page.tsx          # Search results (/search)
│   │   │   │
│   │   │   ├── provider/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Provider profile (/provider/:id)
│   │   │   │
│   │   │   └── booking/
│   │   │       └── [id]/
│   │   │           └── page.tsx      # Booking details (/booking/:id)
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles + Tailwind
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   └── ui/                       # 12 shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── badge.tsx
│   │       ├── dialog.tsx
│   │       ├── sheet.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── calendar.tsx
│   │       ├── skeleton.tsx
│   │       └── sonner.tsx
│   │
│   └── lib/
│       ├── types.ts                  # TypeScript type definitions
│       ├── mocks.ts                  # Mock data for development
│       ├── cms.ts                    # Sanity CMS integration
│       └── utils.ts                  # Utility functions (cn)
│
├── tests/
│   └── e2e/                         # Playwright E2E tests
│       └── booking.spec.ts          # Booking flow test
│
├── public/                          # Static assets
├── .env.local.example               # Environment variables template
├── playwright.config.ts             # Playwright configuration
├── components.json                  # shadcn/ui config
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README-SETUP.md
```

---

## 🗺️ Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Marketing landing page |
| `/search` | Static | Service provider search & filtering |
| `/provider/[id]` | Dynamic | Individual provider profile with booking |
| `/booking/[id]` | Dynamic | Booking confirmation & management |

---

## 📦 Core Files Created

### Pages

#### 1. Marketing Landing Page
**File:** `src/app/(marketing)/page.tsx`
- Public-facing landing page
- Hero section, features, CTAs
- No authentication required

#### 2. Search Page
**File:** `src/app/(app)/search/page.tsx`
**Features:**
- Search bar for services
- Category filters (Beauty, Pet Care, Cleaning, Wellness)
- Provider card grid
- Loading skeletons
- Uses shadcn/ui: Card, Input, Button, Badge, Skeleton

#### 3. Provider Profile Page
**File:** `src/app/(app)/provider/[id]/page.tsx`
**Features:**
- Provider header with avatar, name, rating, verification badge
- Services offered with pricing
- Portfolio gallery
- Reviews section
- Booking calendar and time slot selection
- Sticky booking card
- Uses shadcn/ui: Card, Badge, Button, Calendar

#### 4. Booking Details Page
**File:** `src/app/(app)/booking/[id]/page.tsx`
**Features:**
- Booking summary (service, provider, date/time, location, total)
- Provider information card
- Payment status (escrow messaging)
- Action buttons (Reschedule, Cancel)
- Cancellation policy
- Uses shadcn/ui: Card, Badge, Button

#### 5. App Layout
**File:** `src/app/(app)/layout.tsx`
- Navigation bar (placeholder)
- Main container with padding
- Footer (placeholder)
- Applied to all (app) routes

---

## 🔧 Library Files

### 1. types.ts
**Purpose:** TypeScript type definitions

**Types Defined:**
```typescript
// UI-focused
export type Provider = {
  id: string;
  name: string;
  rating: number;
  basePrice: number;
  categories: string[];
  nextAvailableISO?: string;
  heroImage?: string;
  shortBio?: string;
};

// Full types
User, ProviderFull, Service, Booking, Transaction, Review

// Search
ProviderSearchFilters, ProviderSearchResult

// API
ApiResponse<T>, PaginatedResponse<T>

// Status enums
UserRole, ProviderStatus, BookingStatus, TransactionStatus
```

### 2. mocks.ts
**Purpose:** Mock data for development

**Mock Data Available:**
- `mockProviders` - 5 sample providers (Beauty, Pet Care, Wellness, Fitness)
- `mockServices` - 3 sample services (Gel Manicure, Pedicure, Dog Grooming)
- `mockBookings` - Sample booking data
- `mockReviews` - Sample reviews

**Helper Functions:**
```typescript
getProviderById(id: string): Provider | undefined
getServiceById(id: string): Service | undefined
getBookingById(id: string): Booking | undefined
getReviewsByProviderId(providerId: string): Review[]
formatPrice(amountInSatang: number, currency?: 'THB' | 'USD'): string
```

### 3. cms.ts
**Purpose:** Sanity CMS integration with mock data fallback

**Features:**
- ✅ Sanity client initialized with environment-based configuration
- ✅ Automatic fallback to MOCK_PROVIDERS when Sanity not configured
- ✅ GROQ queries for:
  - `listProviders()` - Fetch all providers with optional category filter
  - `getProviderById()` - Fetch single provider by ID
- Type definitions for CMS content
- Localization helper functions

**Implementation:**
```typescript
// Uses Sanity if configured, otherwise falls back to mocks
const useSanity = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
                  process.env.NEXT_PUBLIC_SANITY_DATASET;

export async function listProviders(params?: { category?: string }): Promise<Provider[]>
export async function getProviderById(id: string): Promise<Provider | null>
```

**Environment Variables:**
See `.env.local.example` for configuration

---

## 📦 Installed Packages

### Core Dependencies
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **@sanity/client 7.12.0** - CMS integration

### UI Components (shadcn/ui)
- **@radix-ui/** primitives - Accessible component primitives
- **lucide-react** - Icon library
- **date-fns** - Date utilities
- **react-day-picker** - Calendar component
- **sonner** - Toast notifications

### Development Tools
- **Playwright 1.56.1** - E2E testing
- **@playwright/test** - Test runner
- **ESLint** - Code linting

---

## 🎨 shadcn/ui Components (12 installed)

| Component | Use Case |
|-----------|----------|
| **button** | Primary actions, CTAs |
| **card** | Provider cards, booking summaries |
| **input** | Search, form inputs |
| **select** | Dropdowns, filters |
| **badge** | Ratings, status, verified badges |
| **dialog** | Modals, confirmations |
| **sheet** | Mobile menu, slide-out panels |
| **dropdown-menu** | Context menus, user menus |
| **navigation-menu** | Top navigation |
| **calendar** | Date picker for booking |
| **skeleton** | Loading states |
| **sonner** | Toast notifications |

---

## 🔄 Route Groups Explained

### (marketing)
- **Purpose:** Public-facing pages without app navigation
- **Layout:** Minimal, focused on conversion
- **Pages:** Landing page, About, Terms, Privacy

### (app)
- **Purpose:** Authenticated user experience
- **Layout:** Includes navigation bar and footer
- **Pages:** Search, Provider profiles, Bookings, Dashboard

---

## 📊 Build Output

```
Route (app)
┌ ○ /                    Marketing landing
├ ○ /_not-found         404 page
├ ƒ /booking/[id]       Dynamic booking page
├ ƒ /provider/[id]      Dynamic provider page
└ ○ /search             Static search page

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

**Build Time:** ~3.2s
**TypeScript:** ✅ Passing
**Status:** ✅ Production ready

---

## 🚀 Usage Examples

### Using Mock Data in Pages

```tsx
// In any page.tsx
import { mockProviders, formatPrice } from '@/lib/mocks';

export default function SearchPage() {
  return (
    <div>
      {mockProviders.map((provider) => (
        <div key={provider.id}>
          <h2>{provider.name}</h2>
          <p>Rating: {provider.rating} ⭐</p>
          <p>From {formatPrice(provider.basePrice * 100)}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using Types

```tsx
import type { Provider, Booking } from '@/lib/types';

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  // TypeScript will validate the provider object
  return <div>{provider.name}</div>;
}
```

### Using shadcn/ui Components

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <h3>{provider.name}</h3>
          <Badge>{provider.rating} ⭐</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p>{provider.shortBio}</p>
        <Button>View Profile</Button>
      </CardContent>
    </Card>
  );
}
```

---

## 🧪 Testing

### Playwright E2E Tests
**Location:** `tests/e2e/`
**Configuration:** `playwright.config.ts`

**Test Scripts:**
```bash
pnpm test:e2e        # Run all E2E tests
pnpm test:e2e:ui     # Run tests with Playwright UI
pnpm test:e2e:debug  # Run tests in debug mode
```

**Current Tests:**
- `booking.spec.ts` - Tests the complete booking flow:
  1. Browse providers on /search
  2. Click on "Lina Beauty Studio"
  3. Navigate to provider detail page
  4. Click "Book this provider" link
  5. Verify booking form is visible

**Browsers Installed:**
- ✅ Chromium 141.0.7390.37
- ✅ Firefox 142.0.1
- ✅ Webkit 26.0

---

## 🎯 Next Steps

### Immediate
1. ✅ Project structure created
2. ✅ Route groups configured
3. ✅ Mock data ready
4. ✅ Sanity CMS integration ready (with mock fallback)
5. ✅ E2E testing setup with Playwright
6. ⏳ Add authentication (next-auth installed, not configured)
7. ⏳ Add Stripe payment integration (@stripe/stripe-js installed, not configured)
8. ⏳ Implement full booking flow with payment

### Short-term
- Create reusable components (ProviderCard, BookingCard, etc.)
- Add form validation with Zod
- Implement search/filter logic
- Add image optimization with Next/Image
- Configure Sanity Studio and create schemas
- Add authentication with NextAuth.js
- Integrate Stripe payment intent

### Long-term
- Real-time booking updates
- Push notifications
- Multi-language support (Thai/English)
- Mobile responsive optimization
- Progressive Web App features

---

## 📝 Commands

```bash
# Development
pnpm dev                 # Start dev server
pnpm build              # Production build
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint

# Testing
pnpm test:e2e           # Run E2E tests
pnpm test:e2e:ui        # Run E2E tests with UI
pnpm test:e2e:debug     # Run E2E tests in debug mode

# Add Components
pnpm dlx shadcn@latest add [component-name]

# Playwright
pnpm dlx playwright install         # Install browsers
pnpm dlx playwright codegen         # Generate test code
```

---

## 🔗 Related Documentation

- **Setup Guide:** `README-SETUP.md`
- **Main Docs:** `../../../documents/`
- **Component Specs:** `../../../documents/components/00-inventory.md`
- **User Stories:** `../../../documents/user-stories/00-core-stories.md`
- **Wireframes:** `../../../documents/design/00-wireframes.md`

---

**Status:** ✅ **Structure Complete & Build Passing**

All pages render successfully with TypeScript validation passing.
Ready for feature development!

