# Veyya UI Components

This directory follows the **Atomic Design** methodology as specified in `documents/components/00-inventory.md`.

## Structure

```
components/
├── ui/              # Atoms (A-01 to A-08) - shadcn/ui primitives
│   ├── button.tsx   # [A-01] Button
│   ├── input.tsx    # [A-02] Input
│   ├── badge.tsx    # [A-03] Badge
│   ├── avatar.tsx   # [A-04] Avatar
│   ├── skeleton.tsx # [A-06] Skeleton
│   └── separator.tsx# [A-08] Divider
│
├── molecules/       # Molecules (M-01 to M-07) - Simple compositions
│   ├── form-field.tsx      # [M-01] FormField
│   ├── search-bar.tsx      # [M-02] SearchBar (Critical - BS-001)
│   ├── rating-display.tsx  # [M-03] RatingDisplay
│   ├── price-display.tsx   # [M-04] PriceDisplay
│   ├── chip.tsx            # [M-05] Chip
│   ├── alert.tsx           # [M-06] Alert
│   └── empty-state.tsx     # [M-07] EmptyState
│
├── organisms/       # Organisms (O-01 to O-10) - Complex compositions
│   ├── provider-card.tsx           # [O-01] ProviderCard (BS-001)
│   ├── provider-profile.tsx        # [O-02] ProviderProfile
│   ├── booking-form.tsx            # [O-03] BookingForm (BS-002)
│   ├── booking-card.tsx            # [O-04] BookingCard (BS-003)
│   ├── review-form.tsx             # [O-05] ReviewForm (BS-005)
│   ├── filter-panel.tsx            # [O-06] FilterPanel (BS-001)
│   ├── navigation-bar.tsx          # [O-07] NavigationBar (All flows)
│   ├── notification-card.tsx       # [O-08] NotificationCard
│   ├── provider-earnings-card.tsx  # [O-09] ProviderEarningsCard (PS-005)
│   └── availability-calendar.tsx   # [O-10] AvailabilityCalendar (PS-002)
│
└── templates/       # Templates (T-01 to T-06) - Page layouts
    ├── search-results.tsx          # [T-01] SearchResultsPage
    ├── provider-detail.tsx         # [T-02] ProviderDetailPage
    ├── booking-flow.tsx            # [T-03] BookingFlowPage
    ├── provider-onboarding.tsx     # [T-04] ProviderOnboardingPage
    ├── client-dashboard.tsx        # [T-05] DashboardPage (Client)
    └── provider-dashboard.tsx      # [T-06] DashboardPage (Provider)
```

## Implementation Priority

Follow the phased approach in `documents/00-app-prototype-audit.md`:

### Phase 1: Atoms (Week 1)
✅ Button, Input, Badge, Avatar, Skeleton, Separator - **INSTALLED**
⏳ Icon (use lucide-react)
⏳ Spinner (custom)

### Phase 2: Molecules (Week 2)
- [M-02] SearchBar - **CRITICAL** for BS-001
- [M-01] FormField
- [M-03] RatingDisplay
- [M-04] PriceDisplay
- [M-05] Chip
- [M-06] Alert
- [M-07] EmptyState

### Phase 3: Critical Path Organisms (Week 3-4)
- [O-01] ProviderCard - **BS-001: Search Results**
- [O-06] FilterPanel - **BS-001: Filters**
- [O-03] BookingForm - **BS-002: Booking Flow**
- [O-04] BookingCard - **BS-003: Booking Management**
- [O-07] NavigationBar - **All flows**

## Component Naming Convention

- Files: kebab-case (`provider-card.tsx`)
- Components: PascalCase (`ProviderCard`)
- Tests: co-located (`provider-card.test.tsx`)

## Reference Documentation

- **Full specs**: `../../../documents/components/00-inventory.md`
- **Wireframes**: `../../../documents/design/00-wireframes.md`
- **User Stories**: `../../../documents/user-stories/00-core-stories.md`
- **Traceability**: `../../../documents/acceptance/00-traceability.md`
