# Veyya App Prototype Audit & Setup Recommendations

**Date:** 2025-10-25
**Status:** 🔴 Empty Directory - Initialization Required

---

## Current State

**Directory:** `/Users/sindhusreenath/Projects/veyya/app-prototype`
**Status:** Empty directory (no files)

---

## Recommended Project Structure

Based on the FRD, component inventory, and wireframes, here's the recommended Next.js project structure:

```
app-prototype/
├── .env.local                      # Environment variables
├── .env.example                    # Example env file
├── .eslintrc.json                  # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── next.config.js                  # Next.js configuration
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.ts              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── README.md                       # Project documentation
│
├── public/                         # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/                        # Next.js 14+ App Router
│   │   ├── (auth)/                 # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (client)/               # Client route group
│   │   │   ├── layout.tsx          # Client layout with nav
│   │   │   ├── page.tsx            # Client dashboard (T-05)
│   │   │   ├── search/
│   │   │   │   └── page.tsx        # Search results (T-01)
│   │   │   ├── providers/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx    # Provider detail (T-02)
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx        # Booking list
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx    # Booking detail
│   │   │   │   └── new/
│   │   │   │       └── page.tsx    # Booking flow (T-03)
│   │   │   ├── favorites/
│   │   │   │   └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (provider)/             # Provider route group
│   │   │   ├── layout.tsx          # Provider layout with nav
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx        # Provider dashboard (T-06)
│   │   │   ├── bookings/
│   │   │   │   └── page.tsx
│   │   │   ├── earnings/
│   │   │   │   └── page.tsx
│   │   │   ├── availability/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── onboarding/
│   │   │       └── page.tsx        # Provider onboarding (T-04)
│   │   │
│   │   ├── api/                    # API routes
│   │   │   ├── auth/
│   │   │   │   └── route.ts
│   │   │   ├── bookings/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── providers/
│   │   │   │   └── route.ts
│   │   │   ├── payments/
│   │   │   │   └── route.ts
│   │   │   └── webhooks/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   ├── error.tsx               # Error boundary
│   │   └── loading.tsx             # Loading state
│   │
│   ├── components/                 # UI Components (Atomic Design)
│   │   ├── ui/                     # shadcn/ui Atoms (A-01 to A-08)
│   │   │   ├── button.tsx          # [A-01] Button
│   │   │   ├── input.tsx           # [A-02] Input
│   │   │   ├── badge.tsx           # [A-03] Badge
│   │   │   ├── avatar.tsx          # [A-04] Avatar
│   │   │   ├── icon.tsx            # [A-05] Icon
│   │   │   ├── skeleton.tsx        # [A-06] Skeleton
│   │   │   ├── spinner.tsx         # [A-07] Spinner
│   │   │   └── separator.tsx       # [A-08] Divider
│   │   │
│   │   ├── molecules/              # Molecules (M-01 to M-07)
│   │   │   ├── form-field.tsx      # [M-01] FormField
│   │   │   ├── search-bar.tsx      # [M-02] SearchBar
│   │   │   ├── rating-display.tsx  # [M-03] RatingDisplay
│   │   │   ├── price-display.tsx   # [M-04] PriceDisplay
│   │   │   ├── chip.tsx            # [M-05] Chip
│   │   │   ├── alert.tsx           # [M-06] Alert
│   │   │   └── empty-state.tsx     # [M-07] EmptyState
│   │   │
│   │   ├── organisms/              # Organisms (O-01 to O-10)
│   │   │   ├── provider-card.tsx           # [O-01] ProviderCard
│   │   │   ├── provider-profile.tsx        # [O-02] ProviderProfile
│   │   │   ├── booking-form.tsx            # [O-03] BookingForm
│   │   │   ├── booking-card.tsx            # [O-04] BookingCard
│   │   │   ├── review-form.tsx             # [O-05] ReviewForm
│   │   │   ├── filter-panel.tsx            # [O-06] FilterPanel
│   │   │   ├── navigation-bar.tsx          # [O-07] NavigationBar
│   │   │   ├── notification-card.tsx       # [O-08] NotificationCard
│   │   │   ├── provider-earnings-card.tsx  # [O-09] ProviderEarningsCard
│   │   │   └── availability-calendar.tsx   # [O-10] AvailabilityCalendar
│   │   │
│   │   └── templates/              # Page Templates (T-01 to T-06)
│   │       ├── search-results.tsx          # [T-01] SearchResultsPage
│   │       ├── provider-detail.tsx         # [T-02] ProviderDetailPage
│   │       ├── booking-flow.tsx            # [T-03] BookingFlowPage
│   │       ├── provider-onboarding.tsx     # [T-04] ProviderOnboardingPage
│   │       ├── client-dashboard.tsx        # [T-05] DashboardPage (Client)
│   │       └── provider-dashboard.tsx      # [T-06] DashboardPage (Provider)
│   │
│   ├── lib/                        # Utilities and configurations
│   │   ├── utils.ts                # cn() utility, helpers
│   │   ├── api.ts                  # API client
│   │   ├── auth.ts                 # Authentication helpers
│   │   ├── constants.ts            # Constants (status values, etc.)
│   │   ├── validators.ts           # Validation schemas (Zod)
│   │   └── sanity.ts               # Sanity client configuration
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-auth.ts             # useAuth hook
│   │   ├── use-booking.ts          # useBooking hook
│   │   ├── use-provider.ts         # useProvider hook
│   │   └── use-toast.ts            # useToast hook
│   │
│   ├── types/                      # TypeScript type definitions
│   │   ├── index.ts                # Main exports
│   │   ├── user.ts                 # User, Provider types
│   │   ├── booking.ts              # Booking types
│   │   ├── service.ts              # Service types
│   │   ├── transaction.ts          # Transaction types
│   │   └── api.ts                  # API response types
│   │
│   ├── store/                      # State management (Zustand)
│   │   ├── auth-store.ts           # Auth state
│   │   ├── booking-store.ts        # Booking state
│   │   └── ui-store.ts             # UI state (modals, etc.)
│   │
│   └── styles/                     # Global styles
│       └── globals.css             # Tailwind directives, global styles
│
├── tests/                          # Test files
│   ├── unit/                       # Unit tests
│   ├── integration/                # Integration tests
│   └── e2e/                        # E2E tests (Playwright)
│       ├── booker/                 # BS-001 through BS-007
│       ├── provider/               # PS-001 through PS-008
│       └── cross-cutting/          # CS-001, CS-002
│
└── docs/                           # Additional documentation
    ├── setup.md                    # Setup instructions
    ├── deployment.md               # Deployment guide
    └── contributing.md             # Contribution guidelines
```

---

## Required Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",

    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",

    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",

    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "class-variance-authority": "^0.7.0",

    "lucide-react": "^0.379.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",

    "zod": "^3.23.0",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.4",

    "zustand": "^4.5.0",

    "date-fns": "^3.6.0",

    "@sanity/client": "^6.15.0",
    "next-sanity": "^9.0.0",

    "@stripe/stripe-js": "^3.3.0",
    "@stripe/react-stripe-js": "^2.7.0",

    "mapbox-gl": "^3.3.0",
    "react-map-gl": "^7.1.0",

    "react-calendar": "^4.8.0"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.14",

    "@playwright/test": "^1.43.0",
    "vitest": "^1.5.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/user-event": "^14.5.0",

    "axe-core": "^4.9.0",
    "@axe-core/playwright": "^4.9.0",

    "@types/mapbox-gl": "^3.1.0"
  }
}
```

---

## Component Implementation Mapping

Based on `documents/components/00-inventory.md`, here's the priority order for implementation:

### Phase 1: Foundation (Week 1)
**Atoms - Essential UI primitives**
1. [A-01] Button
2. [A-02] Input
3. [A-03] Badge
4. [A-04] Avatar
5. [A-05] Icon
6. [A-06] Skeleton
7. [A-07] Spinner
8. [A-08] Divider

**Setup:**
- Initialize Next.js 14 with App Router
- Install and configure Tailwind CSS
- Set up shadcn/ui CLI
- Configure ESLint, Prettier
- Set up TypeScript strict mode

### Phase 2: Core Molecules (Week 2)
**Molecules - Common compositions**
1. [M-01] FormField
2. [M-02] SearchBar → **Critical for BS-001**
3. [M-03] RatingDisplay
4. [M-04] PriceDisplay
5. [M-05] Chip
6. [M-06] Alert
7. [M-07] EmptyState

**Setup:**
- Configure Zod for validation
- Set up react-hook-form
- Create form utilities
- Set up error handling

### Phase 3: Critical Path Organisms (Week 3-4)
**For Booker Stories (BS-001, BS-002, BS-003)**
1. [O-01] ProviderCard → **BS-001: Search Results**
2. [O-06] FilterPanel → **BS-001: Filters**
3. [O-03] BookingForm → **BS-002: Booking Flow**
4. [O-04] BookingCard → **BS-003: Booking List**
5. [O-07] NavigationBar → **All flows**

**Setup:**
- Set up API routes
- Configure Stripe payment integration
- Set up Sanity CMS integration
- Configure authentication (NextAuth.js)

### Phase 4: Provider Features (Week 5-6)
**For Provider Stories (PS-001 through PS-008)**
1. [O-09] ProviderEarningsCard → **PS-005: Earnings**
2. [O-10] AvailabilityCalendar → **PS-002: Availability**
3. [O-02] ProviderProfile → **BS-001, PS-006**
4. [O-08] NotificationCard → **BS-003, CS-002**
5. [O-05] ReviewForm → **BS-005: Reviews**

**Setup:**
- Google Calendar OAuth integration
- Mapbox integration for routing
- Firebase/Twilio for notifications
- Webhook handlers

### Phase 5: Templates & Pages (Week 7-8)
**Page-level implementations**
1. [T-01] SearchResultsPage → **Screen 1.2**
2. [T-02] ProviderDetailPage → **Screen 2.1**
3. [T-03] BookingFlowPage → **Screens 2.2-2.7**
4. [T-05] ClientDashboard → **Screen 1.1**
5. [T-04] ProviderOnboardingPage → **Screens 4.1-4.7**
6. [T-06] ProviderDashboard → **Provider Dashboard**

---

## File Naming Conventions

### Components
- Use kebab-case for files: `provider-card.tsx`, `booking-form.tsx`
- Use PascalCase for component names: `ProviderCard`, `BookingForm`
- Co-locate tests: `provider-card.test.tsx`

### Routes
- Use lowercase with hyphens for folders: `app/(client)/search/`
- Use `page.tsx` for route files (Next.js App Router convention)
- Use `layout.tsx` for layouts
- Use `loading.tsx` for loading states
- Use `error.tsx` for error boundaries

### Types
- Use kebab-case for type files: `booking.ts`, `user.ts`
- Export types/interfaces with PascalCase
- Use type aliases for complex unions

### Utilities
- Use kebab-case: `api-client.ts`, `date-utils.ts`
- Export functions with camelCase

---

## Configuration Files

### 1. `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '*.stripe.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
};

module.exports = nextConfig;
```

### 2. `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from design tokens
        brand: {
          primary: '#B6A28E',
          secondary: '#4B342F',
          accent: '#B6C2A2',
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        thai: ['Noto Sans Thai', 'sans-serif'],
      },
      spacing: {
        xs: '0.25rem',  // 4px
        sm: '0.5rem',   // 8px
        md: '1rem',     // 16px
        lg: '1.5rem',   // 24px
        xl: '2rem',     // 32px
        '2xl': '3rem',  // 48px
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 3. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/store/*": ["./src/store/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4. `.env.example`

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/veyya

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Omise (Thai Payments)
OMISE_SECRET_KEY=skey_test_...
NEXT_PUBLIC_OMISE_PUBLIC_KEY=pkey_test_...

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...

# Google Calendar
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Firebase/Twilio (Notifications)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-email
FIREBASE_PRIVATE_KEY=your-key
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token

# AWS S3 (File Storage)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=veyya-uploads
AWS_REGION=ap-southeast-1
```

---

## Type Definitions

### Core Types (`src/types/`)

Based on `documents/data-model/00-data-model.md`:

**`src/types/user.ts`**
```typescript
export type UserRole = 'CLIENT' | 'PROVIDER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  language: 'en' | 'th';
  createdAt: Date;
  updatedAt: Date;
}

export interface Provider {
  userId: string;
  bio: string;
  profilePhotoUrl: string;
  rating: number;
  reviewCount: number;
  responseRate: number;
  serviceRadius: number; // km
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'SUSPENDED' | 'REJECTED';
  verifiedAt: Date | null;
  languages: string[];
  bankAccountNumber: string;
  bankName: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**`src/types/booking.ts`**
```typescript
export type BookingStatus =
  | 'PENDING_PROVIDER'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'READY_FOR_PAYOUT'
  | 'PAID';

export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  startAt: Date;
  endAt: Date;
  address: string;
  lat: number;
  lng: number;
  status: BookingStatus;
  totalAmount: number; // in minor units (satang)
  specialInstructions: string | null;
  cancellationReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

**`src/types/transaction.ts`**
```typescript
export type TransactionStatus = 'HELD' | 'READY' | 'RELEASED';

export interface Transaction {
  id: string;
  bookingId: string;
  grossAmount: number;
  commission: number;
  netAmount: number;
  status: TransactionStatus;
  stripePaymentIntentId: string | null;
  omiseChargeId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Initial Setup Commands

```bash
# Navigate to app-prototype directory
cd /Users/sindhusreenath/Projects/veyya/app-prototype

# Initialize Next.js project
npx create-next-app@latest . --typescript --tailwind --app --use-npm

# Install shadcn/ui
npx shadcn-ui@latest init

# Install additional dependencies
npm install @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-tabs @radix-ui/react-toast \
  lucide-react class-variance-authority clsx tailwind-merge \
  zod react-hook-form @hookform/resolvers zustand date-fns \
  @stripe/stripe-js @stripe/react-stripe-js \
  mapbox-gl react-map-gl react-calendar \
  @sanity/client next-sanity

# Install dev dependencies
npm install -D @playwright/test vitest @testing-library/react \
  @testing-library/jest-dom @testing-library/user-event \
  axe-core @axe-core/playwright \
  prettier prettier-plugin-tailwindcss

# Install shadcn/ui components
npx shadcn-ui@latest add button input badge avatar skeleton separator
```

---

## Missing Components Analysis

Based on component inventory (`documents/components/00-inventory.md`):

### 🔴 Missing (31 components to implement)

**Atoms (8):**
- [A-01] Button ⚠️ Use shadcn/ui
- [A-02] Input ⚠️ Use shadcn/ui
- [A-03] Badge ⚠️ Use shadcn/ui
- [A-04] Avatar ⚠️ Use shadcn/ui
- [A-05] Icon ⚠️ Use lucide-react
- [A-06] Skeleton ⚠️ Use shadcn/ui
- [A-07] Spinner ⚠️ Build custom
- [A-08] Divider ⚠️ Use shadcn/ui separator

**Molecules (7):**
- [M-01] FormField ❌ Build custom
- [M-02] SearchBar ❌ Build custom (Critical - BS-001)
- [M-03] RatingDisplay ❌ Build custom
- [M-04] PriceDisplay ❌ Build custom
- [M-05] Chip ❌ Build custom
- [M-06] Alert ❌ Build custom
- [M-07] EmptyState ❌ Build custom

**Organisms (10):**
- [O-01] ProviderCard ❌ Build custom (Critical - BS-001)
- [O-02] ProviderProfile ❌ Build custom
- [O-03] BookingForm ❌ Build custom (Critical - BS-002)
- [O-04] BookingCard ❌ Build custom (Critical - BS-003)
- [O-05] ReviewForm ❌ Build custom
- [O-06] FilterPanel ❌ Build custom (Critical - BS-001)
- [O-07] NavigationBar ❌ Build custom (Critical - All)
- [O-08] NotificationCard ❌ Build custom
- [O-09] ProviderEarningsCard ❌ Build custom
- [O-10] AvailabilityCalendar ❌ Build custom

**Templates (6):**
- [T-01] SearchResultsPage ❌ Build custom
- [T-02] ProviderDetailPage ❌ Build custom
- [T-03] BookingFlowPage ❌ Build custom
- [T-04] ProviderOnboardingPage ❌ Build custom
- [T-05] ClientDashboard ❌ Build custom
- [T-06] ProviderDashboard ❌ Build custom

---

## API Integration Requirements

Based on traceability matrix (`documents/acceptance/00-traceability.md`):

### Critical Endpoints (P0 - MVP)

**Discovery & Search (BS-001)**
- `GET /api/services` - Fetch service catalog
- `GET /api/providers/search` - Search with filters
- `GET /api/providers/:id` - Get provider profile

**Booking Flow (BS-002)**
- `POST /api/bookings/intents` - Create booking intent
- `POST /api/payments/intents` - Create payment intent
- `POST /api/payments/webhook` - Handle Stripe/Omise webhooks

**Booking Management (BS-003, BS-007)**
- `GET /api/bookings` - List bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings/:id/accept` - Provider accepts
- `POST /api/bookings/:id/reject` - Provider rejects
- `POST /api/bookings/:id/cancel` - Cancel booking
- `PATCH /api/bookings/:id/reschedule` - Reschedule booking

**Reviews (BS-005)**
- `POST /api/reviews` - Submit review
- `PATCH /api/reviews/:id/moderate` - Admin moderation

**Provider Features (PS-001, PS-002, PS-005)**
- `POST /api/providers` - Create provider
- `POST /api/providers/:id/documents` - Upload KYC docs
- `POST /api/availability-slots` - Create availability
- `GET /api/providers/:id/earnings` - Get earnings
- `GET /api/payouts/batches` - Get payout history

**Notifications (CS-002)**
- `GET /api/notifications` - Fetch notifications
- `PATCH /api/users/:id/notification-preferences` - Update preferences

---

## Testing Strategy

Based on test cases in traceability matrix:

### E2E Tests (Playwright)
**Priority P0:**
- `E2E-001`: Complete search and filter flow
- `E2E-010`: Complete booking flow with payment
- `E2E-020`: Provider accepts booking
- `E2E-040`: Submit review with photos
- `E2E-100`: Complete provider onboarding
- `E2E-120`: Accept booking request

**Test file structure:**
```
tests/e2e/
├── booker/
│   ├── search-and-filter.spec.ts       # E2E-001
│   ├── booking-flow.spec.ts            # E2E-010
│   ├── booking-tracking.spec.ts        # E2E-020
│   └── leave-review.spec.ts            # E2E-040
├── provider/
│   ├── onboarding.spec.ts              # E2E-100
│   └── accept-booking.spec.ts          # E2E-120
└── shared/
    └── fixtures.ts
```

### Acceptance Tests (Performance)
- `ACC-010`: Booking completion <3 min
- `ACC-020`: Notification delivery <30s
- `ACC-110`: Availability check <200ms
- `ACC-140`: Dashboard load <1.5s
- `ACC-180`: Role switch <500ms

---

## Accessibility Checklist

From component inventory accessibility requirements:

### Global Requirements
- [ ] All interactive elements have min 44x44px touch target
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Keyboard navigation works for all interactions
- [ ] Focus indicators visible (2px outline, high contrast)
- [ ] Forms have proper label-input associations
- [ ] Error messages linked via `aria-describedby`
- [ ] Images have meaningful `alt` text
- [ ] Headings follow logical hierarchy
- [ ] Landmark regions (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [ ] Page title unique and descriptive
- [ ] Language attribute set (`lang="en"` or `lang="th"`)
- [ ] Skip to main content link
- [ ] Loading states announced to screen readers
- [ ] Modal/dialog focus trap and close on Escape
- [ ] Reduced motion respected (`prefers-reduced-motion`)

### Testing Tools Setup
```bash
# Install accessibility testing tools
npm install -D @axe-core/playwright pa11y eslint-plugin-jsx-a11y
```

---

## Localization Setup

Based on FRD requirement R-NOTIF-002:

### i18n Configuration

```bash
# Install next-intl for internationalization
npm install next-intl
```

**Supported Languages:**
- English (en)
- Thai (th)

**Requirements:**
- Date formatting (Thai Buddhist calendar)
- Currency formatting (THB, USD, AED)
- Politeness particles in Thai notifications
- RTL not required (both languages are LTR)

---

## Deployment Checklist

### Environment Setup
- [ ] Configure production environment variables
- [ ] Set up PostgreSQL database
- [ ] Configure Redis for caching
- [ ] Set up AWS S3 for file storage
- [ ] Configure Stripe production keys
- [ ] Configure Omise production keys
- [ ] Set up Firebase/Twilio production credentials
- [ ] Configure Sanity production dataset

### Performance
- [ ] Enable Next.js Image Optimization
- [ ] Configure CDN (CloudFront or Vercel Edge)
- [ ] Set up caching headers
- [ ] Enable gzip/brotli compression
- [ ] Implement rate limiting
- [ ] Set up monitoring (Datadog/New Relic)

### Security
- [ ] Enable HTTPS only
- [ ] Configure CSP headers
- [ ] Set up CORS policies
- [ ] Enable rate limiting on API routes
- [ ] Implement request validation (Zod)
- [ ] Set up webhook signature verification
- [ ] Configure session security (httpOnly, secure, sameSite)

### SEO
- [ ] Configure meta tags
- [ ] Set up sitemap.xml
- [ ] Configure robots.txt
- [ ] Enable Open Graph tags
- [ ] Set up Google Analytics

---

## Next Steps - Implementation Order

### Week 1: Foundation
1. Initialize Next.js project with TypeScript
2. Set up Tailwind CSS and shadcn/ui
3. Configure path aliases and project structure
4. Install and configure shadcn/ui atoms (Buttons, Inputs, etc.)
5. Set up ESLint, Prettier, Git hooks
6. Create basic type definitions

### Week 2: Core Components
1. Implement critical molecules (SearchBar, FormField)
2. Set up authentication structure (NextAuth.js)
3. Create API route handlers structure
4. Set up Sanity CMS integration
5. Implement error handling and loading states

### Week 3-4: Critical Path (BS-001, BS-002)
1. Implement [O-01] ProviderCard and [O-06] FilterPanel
2. Build search results page (Screen 1.2)
3. Implement [O-03] BookingForm (5-step wizard)
4. Set up Stripe integration
5. Build booking flow pages (Screens 2.2-2.7)

### Week 5-6: Provider Features
1. Implement provider onboarding flow (Screens 4.1-4.7)
2. Build [O-10] AvailabilityCalendar
3. Set up Google Calendar integration
4. Implement [O-09] ProviderEarningsCard
5. Build provider dashboard

### Week 7-8: Polish & Testing
1. Implement E2E test suite
2. Accessibility audit and fixes
3. Performance optimization
4. Localization setup
5. Documentation

---

## References

All specifications derived from:
- **Component Inventory:** `documents/components/00-inventory.md`
- **Wireframes:** `documents/design/00-wireframes.md`
- **User Stories:** `documents/user-stories/00-core-stories.md`
- **FRD:** `documents/frd/00-frd.md`
- **Data Model:** `documents/data-model/00-data-model.md`
- **Traceability Matrix:** `documents/acceptance/00-traceability.md`

---

**Status:** 📋 Ready for Implementation

This audit provides a complete blueprint for initializing the Next.js app-prototype based on all documentation created. Follow the phased implementation approach to build the MVP systematically.

