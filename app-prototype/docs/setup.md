# Veyya App Prototype - Setup Guide

## Overview

This Next.js application implements the Veyya two-sided marketplace for on-demand home services in Thailand.

## Prerequisites

- Node.js 18+ (currently using v24.10.0)
- npm 9+ (currently using v11.6.0)
- PostgreSQL 14+
- Redis (for caching)

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials.

### 3. Database Setup

```bash
# Create database
createdb veyya

# Run migrations (when available)
npm run db:migrate
```

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app-prototype/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Auth route group
│   │   ├── (client)/     # Client routes
│   │   └── (provider)/   # Provider routes
│   │
│   ├── components/       # UI Components (Atomic Design)
│   │   ├── ui/          # Atoms (shadcn/ui)
│   │   ├── molecules/   # Simple compositions
│   │   ├── organisms/   # Complex compositions
│   │   └── templates/   # Page layouts
│   │
│   ├── lib/             # Utilities
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript definitions
│   └── store/           # State management
│
├── tests/               # Test suites
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── docs/                # Documentation
```

## Component Development

Components follow **Atomic Design** methodology:

1. **Atoms** (`src/components/ui/`) - Basic UI primitives from shadcn/ui
2. **Molecules** (`src/components/molecules/`) - Simple component compositions
3. **Organisms** (`src/components/organisms/`) - Complex, feature-rich components
4. **Templates** (`src/components/templates/`) - Page-level layouts

See `src/components/README.md` for implementation priority and details.

## Documentation References

All specifications are in the `documents/` folder at the project root:

- **Component Specs**: `../documents/components/00-inventory.md`
- **User Stories**: `../documents/user-stories/00-core-stories.md`
- **FRD**: `../documents/frd/00-frd.md`
- **Data Model**: `../documents/data-model/00-data-model.md`
- **Wireframes**: `../documents/design/00-wireframes.md`
- **Traceability**: `../documents/acceptance/00-traceability.md`
- **Setup Blueprint**: `../documents/00-app-prototype-audit.md`

## Implementation Roadmap

Follow the 8-week phased approach in `../documents/00-app-prototype-audit.md`:

### Phase 1: Foundation (Week 1) ✅ CURRENT
- ✅ Next.js setup with TypeScript
- ✅ Tailwind CSS configuration
- ✅ shadcn/ui initialization
- ✅ Essential atoms installed (Button, Input, Badge, Avatar, Skeleton, Separator)
- ✅ Project structure created
- ✅ Type definitions started
- ⏳ Install Icon component (lucide-react)
- ⏳ Create Spinner component

### Phase 2: Core Molecules (Week 2)
- SearchBar [M-02] - **CRITICAL for BS-001**
- FormField [M-01]
- RatingDisplay [M-03]
- PriceDisplay [M-04]
- Chip [M-05]
- Alert [M-06]
- EmptyState [M-07]

### Phase 3: Critical Path (Week 3-4)
- ProviderCard [O-01] - BS-001
- FilterPanel [O-06] - BS-001
- BookingForm [O-03] - BS-002
- BookingCard [O-04] - BS-003
- NavigationBar [O-07] - All flows

### Phase 4-8: See `../documents/00-app-prototype-audit.md`

## Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing (when configured)
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:watch   # Watch mode

# Code Quality
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add dialog select slider tabs toast
```

## Development Workflow

1. **Check User Story**: Start with the user story ID (e.g., BS-001)
2. **Review Specs**: Read component specs in `documents/components/00-inventory.md`
3. **Check Wireframes**: See UI in `documents/design/00-wireframes.md`
4. **Implement Component**: Follow Atomic Design hierarchy
5. **Write Tests**: Co-locate test files
6. **Update Documentation**: Keep README.md updated

## Testing Strategy

Based on `documents/acceptance/00-traceability.md`:

### E2E Tests (Playwright)
Priority P0 test cases:
- E2E-001: Complete search and filter flow
- E2E-010: Complete booking flow with payment
- E2E-020: Provider accepts booking
- E2E-040: Submit review
- E2E-100: Complete provider onboarding
- E2E-120: Accept booking request

### Performance SLAs
- Search results: <1.5s
- API p95: <300ms
- Notification delivery: <30s
- Dashboard load: <1.5s
- Booking completion: <3 min

## Accessibility

All components must meet **WCAG 2.1 AA** standards:

- Min 44x44px touch targets
- 4.5:1 text contrast ratio
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators visible

Test with:
```bash
npm run test:a11y  # (when configured)
```

## Localization

Support for:
- English (en)
- Thai (th)

Currency:
- THB (primary)
- USD, AED (supported)

## Deployment

See `docs/deployment.md` for production deployment instructions.

## Contributing

See `docs/contributing.md` for contribution guidelines.

## Support

For questions or issues:
1. Check `../documents/00-documentation-summary.md` for navigation
2. Review relevant user stories and FRD requirements
3. Consult traceability matrix for implementation details

---

**Status**: Phase 1 Complete ✅ | Ready for Phase 2 Development
