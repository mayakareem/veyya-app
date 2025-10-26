# Veyya App Prototype

> Two-sided marketplace platform for on-demand home services in Thailand

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000)](https://ui.shadcn.com/)

## Overview

Veyya is a premium, accessible platform connecting clients with verified service providers for beauty, pet care, cleaning, and wellness services in Thailand. This Next.js application implements the complete two-sided marketplace with:

- **Client Features**: Search, booking, payments, reviews, favorites
- **Provider Features**: Onboarding, availability management, earnings tracking
- **Admin Features**: KYC verification, dispute resolution, analytics

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Testing**: Playwright (E2E), Vitest (Unit), Testing Library
- **Database**: PostgreSQL (planned)
- **Payments**: Stripe + Omise
- **Maps**: Mapbox
- **CMS**: Sanity

## Project Structure

```
app-prototype/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/          # Authentication routes
│   │   ├── (client)/        # Client-facing routes
│   │   └── (provider)/      # Provider-facing routes
│   │
│   ├── components/          # UI Components (Atomic Design)
│   │   ├── ui/             # Atoms - shadcn/ui primitives ✅
│   │   ├── molecules/      # Simple compositions
│   │   ├── organisms/      # Complex components
│   │   └── templates/      # Page layouts
│   │
│   ├── lib/                # Utilities & configurations
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── store/              # State management (Zustand)
│
├── tests/                  # Test suites
│   ├── e2e/               # End-to-end tests (Playwright)
│   ├── integration/       # Integration tests
│   └── unit/              # Unit tests (Vitest)
│
├── docs/                   # Additional documentation
└── public/                 # Static assets
```

## Documentation

All project specifications are in the `../documents/` folder:

### Core Documentation
- **[Component Inventory](../documents/components/00-inventory.md)** - All 31 UI components (Atoms, Molecules, Organisms, Templates)
- **[User Stories](../documents/user-stories/00-core-stories.md)** - 17 user stories (BS-001 to BS-007, PS-001 to PS-008, CS-001 to CS-002)
- **[FRD](../documents/frd/00-frd.md)** - Functional requirements (47 requirements across 9 modules)
- **[Data Model](../documents/data-model/00-data-model.md)** - Database schema (13 tables with ERD)
- **[Wireframes](../documents/design/00-wireframes.md)** - Low-fidelity wireframes (19 screens across 4 flows)
- **[Traceability Matrix](../documents/acceptance/00-traceability.md)** - Complete mapping: Stories → Requirements → Components → Tests

### Setup & Planning
- **[App Prototype Audit](../documents/00-app-prototype-audit.md)** - Complete setup blueprint & 8-week roadmap
- **[Documentation Summary](../documents/00-documentation-summary.md)** - Navigation guide & quick reference
- **[Setup Guide](docs/setup.md)** - Detailed setup instructions

## Development Status

### ✅ Phase 1: Foundation (Week 1) - COMPLETE

- [x] Next.js 16 with TypeScript initialized
- [x] Tailwind CSS v4 configured
- [x] shadcn/ui installed and configured
- [x] Essential Atoms installed:
  - [A-01] Button
  - [A-02] Input
  - [A-03] Badge
  - [A-04] Avatar
  - [A-06] Skeleton
  - [A-08] Separator (Divider)
- [x] Project folder structure created
- [x] Type definitions started (`src/types/index.ts`)
- [x] Constants defined (`src/lib/constants.ts`)
- [x] Documentation created

### ⏳ Phase 2: Core Molecules (Week 2) - NEXT

Priority components to implement:
1. **[M-02] SearchBar** - CRITICAL for BS-001 (Search & Filter)
2. **[M-01] FormField** - Used in all forms
3. **[M-03] RatingDisplay** - Provider ratings
4. **[M-04] PriceDisplay** - Price formatting
5. **[M-05] Chip** - Filter tags
6. **[M-06] Alert** - Error/success messages
7. **[M-07] EmptyState** - No results messaging

## Component Implementation

Components follow **Atomic Design** methodology based on `documents/components/00-inventory.md`:

| Level | Count | Status | Description |
|-------|-------|--------|-------------|
| **Atoms** | 8 | 6/8 ✅ | Basic UI primitives (shadcn/ui) |
| **Molecules** | 7 | 0/7 ⏳ | Simple compositions (Week 2) |
| **Organisms** | 10 | 0/10 ⏳ | Complex components (Week 3-4) |
| **Templates** | 6 | 0/6 ⏳ | Page layouts (Week 5-6) |

See `src/components/README.md` for detailed implementation plan.

## User Stories Mapping

### Booker (Client) Stories
- **BS-001**: Discover and Filter Service Providers → Components: [M-02] SearchBar, [O-06] FilterPanel, [O-01] ProviderCard
- **BS-002**: Create Booking with Escrow Payment → Components: [O-03] BookingForm, [M-04] PriceDisplay
- **BS-003**: Receive Booking Confirmation → Components: [O-04] BookingCard, [O-08] NotificationCard
- **BS-004**: Rebook Favorite Provider → Components: [O-01] ProviderCard
- **BS-005**: Rate and Review Service → Components: [O-05] ReviewForm, [M-03] RatingDisplay
- **BS-006**: Manage Multi-Service Household → Components: [M-01] FormField, [O-03] BookingForm
- **BS-007**: Cancel or Reschedule Booking → Components: [O-04] BookingCard, [M-06] Alert

### Provider Stories
- **PS-001**: Complete Onboarding and KYC → Components: [M-01] FormField, [A-04] Avatar
- **PS-002**: Set Availability and Sync Calendar → Components: [O-10] AvailabilityCalendar
- **PS-003**: Accept or Reject Booking Requests → Components: [O-04] BookingCard, [A-01] Button
- **PS-004**: Complete Service and Submit Proof → Components: [M-01] FormField
- **PS-005**: Track Earnings and View Payout → Components: [O-09] ProviderEarningsCard, [M-04] PriceDisplay
- **PS-006**: Build Professional Profile → Components: [M-01] FormField, [A-04] Avatar, [A-03] Badge
- **PS-007**: Optimize Route with Clustered Bookings → Components: Map component, [O-04] BookingCard
- **PS-008**: Handle Disputes → Components: [M-01] FormField, [M-06] Alert

## Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing (to be configured)
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:watch   # Watch mode

# Code Quality
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Required for MVP
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_MAPBOX_TOKEN=...

# See .env.example for complete list
```

## Testing Strategy

Based on acceptance criteria in `documents/acceptance/00-traceability.md`:

### Priority P0 Test Cases
- **E2E-001**: Complete search and filter flow (BS-001)
- **E2E-010**: Complete booking flow with payment (BS-002)
- **E2E-020**: Provider accepts booking (BS-003, PS-003)
- **E2E-040**: Submit review with photos (BS-005)
- **E2E-100**: Complete provider onboarding (PS-001)
- **E2E-120**: Accept booking request (PS-003)

### Performance SLAs
- Search results: <1.5s (FRD requirement)
- API p95: <300ms
- Notification delivery: <30s
- Dashboard load: <1.5s
- Booking completion: <3 min

## Design System

Based on `documents/components/00-inventory.md`:

### Colors
```typescript
// Brand
primary: '#B6A28E'    // Warm beige
secondary: '#4B342F'  // Coffee brown
accent: '#B6C2A2'     // Sage green

// Semantic
success: '#10B981'    // Green
warning: '#F59E0B'    // Amber
error: '#EF4444'      // Red
info: '#3B82F6'       // Blue
```

### Typography
- **Primary**: Inter (English, numbers)
- **Thai**: Noto Sans Thai
- **Scale**: 12px (xs) to 36px (4xl)

### Spacing
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

## Accessibility

All components meet **WCAG 2.1 AA** standards:
- ✅ Min 44x44px touch targets
- ✅ 4.5:1 contrast ratio for text
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus indicators (2px outline)

## Localization

**Supported Languages:**
- English (en)
- Thai (th)

**Supported Currencies:**
- THB (primary)
- USD, AED

## Roadmap

### 8-Week MVP Implementation

| Week | Phase | Focus |
|------|-------|-------|
| 1 | ✅ Foundation | Next.js setup, atoms, project structure |
| 2 | ⏳ Molecules | SearchBar, FormField, PriceDisplay, etc. |
| 3-4 | Critical Path | Search, booking flow, payment integration |
| 5-6 | Provider Features | Onboarding, availability, earnings |
| 7-8 | Polish & Testing | E2E tests, accessibility, performance |

See `documents/00-app-prototype-audit.md` for detailed roadmap.

## Contributing

See `docs/contributing.md` for contribution guidelines.

## License

Proprietary - Veyya Platform

## Support

For development questions:
1. Check `docs/setup.md`
2. Review user story in `documents/user-stories/00-core-stories.md`
3. Check component specs in `documents/components/00-inventory.md`
4. Consult traceability matrix: `documents/acceptance/00-traceability.md`

---

**Built with** ❤️ **using Next.js, TypeScript, and shadcn/ui**

**Status**: Phase 1 Complete ✅ | Ready for Phase 2 Development
