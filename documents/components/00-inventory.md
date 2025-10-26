# Veyya UI Component Inventory

## Document Information

**Version:** 1.0
**Date:** 2025-10-25
**Design System:** shadcn/ui + Tailwind CSS
**Framework:** React / Next.js

**Related Documents:**
- FRD: `documents/frd/00-frd.md`
- User Stories: `documents/user-stories/00-core-stories.md`
- Wireframes: `documents/design/00-wireframes.md`

---

## Overview

This document catalogs all UI components for the Veyya platform following the Atomic Design methodology and shadcn/ui conventions. Components are designed mobile-first with accessibility (WCAG 2.1 AA) and localization (Thai/English) built-in.

**Design Principles:**
- Mobile-first responsive design (360px-414px baseline)
- Touch-friendly targets (min 44x44px)
- High contrast ratios (4.5:1 for text)
- RTL support not required (Thai and English are LTR)
- Semantic HTML with ARIA attributes
- Keyboard navigation support

---

## Component Hierarchy

```
Atoms (Primitives)
  ↓
Molecules (Simple Compositions)
  ↓
Organisms (Complex Compositions)
  ↓
Templates (Page Layouts)
```

---

## Atoms (Primitives)

### A-01: Button

**Purpose:** Primary interaction element for actions

**Variants:**
- `default` - Primary action (brand color)
- `secondary` - Secondary action (outline)
- `ghost` - Tertiary action (minimal styling)
- `destructive` - Dangerous action (red)
- `link` - Text link style

**Props:**
```typescript
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}
```

**States:**
- Default
- Hover
- Active (pressed)
- Focused (keyboard)
- Disabled
- Loading (with spinner)

**Accessibility:**
- `role="button"` (if not `<button>`)
- `aria-disabled="true"` when disabled
- `aria-label` for icon-only buttons
- Focus indicator (2px outline)
- Min touch target: 44x44px

**Related Stories:** All (universal component)

---

### A-02: Input

**Purpose:** Text input for forms

**Variants:**
- `text` - Standard text input
- `email` - Email with validation
- `tel` - Phone number
- `number` - Numeric input
- `password` - Obscured text
- `search` - Search with icon

**Props:**
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}
```

**States:**
- Empty
- Filled
- Focused
- Error
- Disabled
- Read-only

**Accessibility:**
- `<label>` associated with input via `htmlFor`
- `aria-invalid="true"` on error
- `aria-describedby` for error messages
- `aria-required="true"` if required
- `autocomplete` attributes for autofill

**Related Stories:** BS-002, PS-001, R-AUTH-001

---

### A-03: Badge

**Purpose:** Status indicators and labels

**Variants:**
- `default` - Neutral badge
- `success` - Positive status (green)
- `warning` - Attention needed (yellow)
- `danger` - Critical status (red)
- `info` - Informational (blue)

**Props:**
```typescript
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}
```

**Use Cases:**
- Booking status (PENDING, CONFIRMED, COMPLETED)
- Provider verification badge ("Veyya Verified")
- Category tags
- Language indicators

**Accessibility:**
- Semantic color (not color-only indicators)
- `role="status"` for dynamic badges
- Text alternative for icon-only badges

**Related Stories:** BS-003, PS-006

---

### A-04: Avatar

**Purpose:** User/provider profile image

**Variants:**
- `circle` - Circular (default)
- `square` - Rounded square
- `sm`, `md`, `lg`, `xl` - Size variants

**Props:**
```typescript
interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string; // Initials or icon
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away'; // Status indicator
}
```

**States:**
- Image loaded
- Image loading (skeleton)
- Image error (fallback)
- No image (initials or icon)

**Accessibility:**
- `alt` text describes person
- Fallback uses initials from name
- Status indicator has `aria-label`

**Related Stories:** BS-001, PS-003

---

### A-05: Icon

**Purpose:** Iconography using Lucide React

**Props:**
```typescript
interface IconProps {
  name: string; // Lucide icon name
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
}
```

**Usage:**
```tsx
<Icon name="star" size={20} ariaLabel="Rating" />
<Icon name="map-pin" ariaHidden={true} /> // Decorative
```

**Accessibility:**
- `aria-hidden="true"` for decorative icons
- `aria-label` for meaningful icons
- Never icon-only buttons without text/label

**Icon Library:** Lucide React (consistent, customizable)

---

### A-06: Skeleton

**Purpose:** Loading placeholder

**Variants:**
- `text` - Text line(s)
- `circle` - Circular (avatar)
- `rectangle` - Rectangle (image, card)

**Props:**
```typescript
interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rectangle';
  width?: string | number;
  height?: string | number;
  count?: number; // For multiple text lines
  className?: string;
}
```

**Accessibility:**
- `aria-busy="true"` on parent container
- `aria-label="Loading content"`
- Smooth animation (respects `prefers-reduced-motion`)

**Related Stories:** BS-001 (search loading)

---

### A-07: Spinner

**Purpose:** Inline loading indicator

**Variants:**
- `sm`, `md`, `lg` - Size variants

**Props:**
```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string; // For screen readers
}
```

**Accessibility:**
- `role="status"`
- `aria-label="Loading"`
- Visible label or `aria-live="polite"` region

**Related Stories:** BS-002 (payment processing)

---

### A-08: Divider

**Purpose:** Visual separator

**Variants:**
- `horizontal`
- `vertical`
- `dashed` / `solid`

**Props:**
```typescript
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed';
  spacing?: 'sm' | 'md' | 'lg'; // Margin around divider
  label?: string; // Optional centered label
}
```

**Accessibility:**
- `role="separator"`
- `aria-orientation` attribute
- Decorative (not keyboard-navigable)

---

## Molecules (Simple Compositions)

### M-01: FormField

**Purpose:** Complete form field with label, input, error message

**Composition:** Label + Input + Error Text

**Props:**
```typescript
interface FormFieldProps {
  label: string;
  name: string;
  type?: InputProps['type'];
  required?: boolean;
  error?: string;
  helpText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}
```

**Accessibility:**
- Label-input association via `htmlFor`
- Error message linked via `aria-describedby`
- Help text linked via `aria-describedby`
- Required indicator (`*`) with `aria-required`

**Related Stories:** BS-002, PS-001, R-AUTH-001

---

### M-02: SearchBar

**Purpose:** Search input with icon and clear button

**Composition:** Input + Search Icon + Clear Button

**Props:**
```typescript
interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
  loading?: boolean;
  suggestions?: string[];
}
```

**States:**
- Empty (show search icon)
- Typing (show clear button)
- Loading (show spinner)
- Suggestions visible

**Accessibility:**
- `role="search"` on container
- `aria-label="Search services"`
- Clear button: `aria-label="Clear search"`
- Suggestions: `role="listbox"` with `aria-activedescendant`

**Related Stories:** BS-001

---

### M-03: RatingDisplay

**Purpose:** Show star rating (read-only or interactive)

**Composition:** Star Icons + Rating Text

**Props:**
```typescript
interface RatingDisplayProps {
  rating: number; // 0-5
  maxRating?: number; // Default 5
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean; // Clickable for selection
  onChange?: (rating: number) => void;
  showCount?: boolean;
  ariaLabel?: string;
}
```

**Variants:**
- Read-only (display)
- Interactive (selection)

**Accessibility:**
- `aria-label="Rating: 4.5 out of 5 stars (120 reviews)"`
- Interactive: `role="radiogroup"` with `role="radio"` per star
- Keyboard navigation (arrow keys)

**Related Stories:** BS-001, BS-005

---

### M-04: PriceDisplay

**Purpose:** Format and display prices with currency

**Composition:** Currency Symbol + Amount

**Props:**
```typescript
interface PriceDisplayProps {
  amount: number; // In minor units (satang)
  currency?: 'THB' | 'USD' | 'AED';
  size?: 'sm' | 'md' | 'lg';
  showCurrency?: boolean;
  strikethrough?: boolean; // For discounts
  ariaLabel?: string;
}
```

**Formatting:**
- THB: ฿1,234.56
- USD: $12.34
- AED: د.إ 12.34

**Accessibility:**
- `aria-label="Price: 1,234 baht 56 satang"`
- Proper number formatting for locale

**Related Stories:** BS-001, BS-002

---

### M-05: Chip

**Purpose:** Compact filter tag or selection

**Composition:** Badge + Remove Icon (optional)

**Props:**
```typescript
interface ChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
}
```

**States:**
- Default
- Selected (filled background)
- Hover
- Disabled

**Accessibility:**
- `role="button"` if clickable
- `aria-pressed={selected}` for toggle chips
- Remove button: `aria-label="Remove filter: Category"`

**Related Stories:** BS-001 (filters)

---

### M-06: Alert

**Purpose:** Inline notification or message

**Composition:** Icon + Text + Close Button (optional)

**Variants:**
- `info` - Informational (blue)
- `success` - Success message (green)
- `warning` - Warning (yellow)
- `error` - Error message (red)

**Props:**
```typescript
interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**Accessibility:**
- `role="alert"` for errors/warnings
- `role="status"` for info/success
- `aria-live="polite"` or `"assertive"`
- Close button: `aria-label="Dismiss alert"`

**Related Stories:** BS-002 (payment errors)

---

### M-07: EmptyState

**Purpose:** No results or empty list message

**Composition:** Icon + Heading + Description + Action Button

**Props:**
```typescript
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**Use Cases:**
- No search results
- No favorite providers
- Empty booking history

**Accessibility:**
- Semantic heading hierarchy
- Actionable CTA button

**Related Stories:** BS-001, BS-004

---

## Organisms (Complex Compositions)

### O-01: ProviderCard

**Purpose:** Provider summary in search results

**Composition:** Avatar + Name + Rating + Distance + Price + Services + CTA Button

**Props:**
```typescript
interface ProviderCardProps {
  provider: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    distance: number; // km
    responseRate: number;
    services: string[];
    minPrice: number;
    verified: boolean;
    languages: string[];
  };
  onClick?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}
```

**Layout:**
```
┌─────────────────────────────────┐
│ [Avatar] Name         ⭐ 4.8 (32)│
│         "Veyya Verified"         │
│ 2.5 km away • 95% response rate │
│ Services: Nails, Hair, Lashes   │
│ From ฿1,200                      │
│ 🇬🇧 🇹🇭 English, Thai              │
│ [View Profile] [♡ Favorite]    │
└─────────────────────────────────┘
```

**States:**
- Default
- Hover (elevation change)
- Loading (skeleton)
- Favorited (filled heart icon)

**Accessibility:**
- `role="article"` on card
- Semantic heading for name
- `aria-label` includes key info
- Keyboard navigable (focus on entire card or CTA)

**Related Stories:** BS-001

---

### O-02: ProviderProfile

**Purpose:** Detailed provider profile page content

**Composition:**
- Profile Header (Avatar + Name + Badges + Stats)
- Portfolio Gallery
- Service List with Pricing
- Reviews Section
- Availability Calendar
- Booking CTA

**Props:**
```typescript
interface ProviderProfileProps {
  provider: ProviderDetail;
  onBookService: (serviceId: string) => void;
  onFavorite: () => void;
  onContactProvider: () => void;
  isFavorited: boolean;
}
```

**Sections:**
1. Header with profile photo, name, verification badges
2. Key stats (rating, reviews, bookings, response rate)
3. Bio and languages
4. Portfolio gallery (images with captions)
5. Services offered with pricing
6. Customer reviews (paginated)
7. Availability quick view
8. Contact and booking actions

**Accessibility:**
- Landmark regions (`<header>`, `<main>`, `<section>`)
- Heading hierarchy (h1 for name, h2 for sections)
- Gallery: keyboard navigation, `aria-label` on images
- Reviews: proper list semantics

**Related Stories:** BS-001

---

### O-03: BookingForm

**Purpose:** Multi-step booking creation form

**Composition:**
- Service Selection
- Date/Time Selection (Calendar)
- Location Input (Address Autocomplete + Map)
- Special Instructions (Textarea)
- Price Summary
- Payment Method Selection
- Confirmation

**Props:**
```typescript
interface BookingFormProps {
  providerId: string;
  services: Service[];
  availability: AvailabilitySlot[];
  onSubmit: (booking: BookingData) => Promise<void>;
  onCancel: () => void;
}
```

**Steps:**
1. Select Service
2. Choose Date & Time
3. Enter Location
4. Add Instructions
5. Review & Pay
6. Confirmation

**Accessibility:**
- `role="group"` for step sections
- `aria-label="Step 2 of 5: Choose Date and Time"`
- Progress indicator with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Form validation with inline errors
- Summary of selections before payment

**Related Stories:** BS-002

---

### O-04: BookingCard

**Purpose:** Booking summary in booking list

**Composition:** Service Icon + Provider Info + Date/Time + Status Badge + Actions

**Props:**
```typescript
interface BookingCardProps {
  booking: {
    id: string;
    provider: {
      name: string;
      avatar: string;
    };
    service: {
      name: string;
      icon: string;
    };
    startAt: Date;
    endAt: Date;
    address: string;
    status: BookingStatus;
    price: number;
  };
  onViewDetails: () => void;
  onContact?: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
  onReview?: () => void;
}
```

**Layout by Status:**
- **PENDING**: Show countdown timer, Cancel button
- **CONFIRMED**: Show provider contact, Reschedule/Cancel buttons
- **COMPLETED**: Show Review button
- **CANCELLED**: Show reason, no actions

**Accessibility:**
- `role="article"`
- Status badge with semantic color + text
- Action buttons grouped with `role="group"`
- Countdown timer: `aria-live="polite"`

**Related Stories:** BS-003, BS-007

---

### O-05: ReviewForm

**Purpose:** Submit rating and review

**Composition:** Star Rating Selector + Text Area + Photo Upload + Submit Button

**Props:**
```typescript
interface ReviewFormProps {
  bookingId: string;
  providerName: string;
  onSubmit: (review: ReviewData) => Promise<void>;
  onCancel: () => void;
}
```

**Fields:**
- Rating (1-5 stars, required)
- Written review (optional, 1000 char max)
- Photos (optional, up to 3, max 5MB each)

**Validation:**
- Rating required
- Photo size and format validation
- Profanity filter warning (client-side)

**Accessibility:**
- Star rating: `role="radiogroup"` with arrow key navigation
- Photo upload: `aria-label="Upload review photo 1 of 3"`
- Character counter: `aria-live="polite"`

**Related Stories:** BS-005

---

### O-06: FilterPanel

**Purpose:** Search filters sidebar/sheet

**Composition:** Multiple Filter Groups (Category, Rating, Distance, Price, Language)

**Props:**
```typescript
interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  onApply: () => void;
  resultCount: number;
}

interface FilterState {
  category?: string;
  minRating?: number;
  maxDistance?: number;
  priceRange?: [number, number];
  languages?: string[];
  verified?: boolean;
  availability?: 'today' | 'tomorrow' | 'this_week';
}
```

**Filter Types:**
- Select (single choice)
- Multi-select (checkboxes)
- Range slider (distance, price)
- Date picker (availability)

**Accessibility:**
- `role="region"` with `aria-label="Filters"`
- Each filter group: `<fieldset>` with `<legend>`
- Clear filters: announces count cleared
- Apply button shows result count

**Related Stories:** BS-001

---

### O-07: NavigationBar

**Purpose:** App navigation (bottom tab bar or sidebar)

**Composition:** Nav Items with Icons + Labels + Badge (notifications)

**Props:**
```typescript
interface NavigationBarProps {
  activeRoute: string;
  items: NavItem[];
  notificationCounts?: Record<string, number>;
  onNavigate: (route: string) => void;
}

interface NavItem {
  route: string;
  label: string;
  icon: string;
  badge?: number;
}
```

**Structure:**
- Home
- Search
- Bookings
- Favorites
- Profile

**Accessibility:**
- `role="navigation"` with `aria-label="Main navigation"`
- Active item: `aria-current="page"`
- Badge: `aria-label="3 new notifications"`
- Focus indicator on keyboard nav

**Related Stories:** All (global navigation)

---

### O-08: NotificationCard

**Purpose:** In-app notification item

**Composition:** Icon + Title + Description + Timestamp + Actions

**Props:**
```typescript
interface NotificationCardProps {
  notification: {
    id: string;
    type: 'booking' | 'payment' | 'review' | 'payout' | 'system';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
    actionLabel?: string;
  };
  onMarkRead: () => void;
  onClick?: () => void;
}
```

**Variants by Type:**
- Booking: booking icon, blue
- Payment: money icon, green
- Review: star icon, yellow
- System: info icon, gray

**Accessibility:**
- Unread: `aria-label="Unread notification"`
- `role="article"`
- Timestamp: relative ("2 hours ago") with absolute in `aria-label`

**Related Stories:** BS-003, CS-002

---

### O-09: ProviderEarningsCard

**Purpose:** Provider earnings summary card

**Composition:** Period Selector + Earnings Breakdown + Payout Schedule + View Details Link

**Props:**
```typescript
interface ProviderEarningsCardProps {
  pending: number;
  ready: number;
  paid: number;
  nextPayoutDate: Date;
  onViewDetails: () => void;
}
```

**Layout:**
```
┌─────────────────────────┐
│ Earnings                │
│ ────────────────────────│
│ Pending:    ฿2,450      │
│ Ready:      ฿5,230      │
│ Paid:      ฿18,900      │
│ ────────────────────────│
│ Next payout: Mon, Oct 28│
│ [View Details]          │
└─────────────────────────┘
```

**Accessibility:**
- Amounts: `aria-label` with full context
- Next payout: `<time datetime="2025-10-28">`
- Semantic headings

**Related Stories:** PS-005

---

### O-10: AvailabilityCalendar

**Purpose:** Provider availability management calendar

**Composition:** Calendar Grid + Time Slot Selector + Recurring Pattern Options + Google Sync Toggle

**Props:**
```typescript
interface AvailabilityCalendarProps {
  providerId: string;
  slots: AvailabilitySlot[];
  onCreateSlot: (slot: NewSlot) => Promise<void>;
  onDeleteSlot: (slotId: string) => Promise<void>;
  googleCalendarConnected: boolean;
  onConnectGoogle: () => void;
}
```

**Features:**
- Month/week/day views
- Click to create slot
- Drag to resize slot
- Recurring patterns (weekly, custom)
- Color-coded slots (available, booked, blocked, synced)

**Accessibility:**
- `role="grid"` with `aria-label="Availability calendar"`
- Cells: `role="gridcell"` with date in `aria-label`
- Keyboard navigation (arrow keys, Enter to select)
- Screen reader announces slot details on focus

**Related Stories:** PS-002

---

## Templates (Page Layouts)

### T-01: SearchResultsPage

**Purpose:** Service provider search results

**Composition:**
- Header (App Bar with Search)
- Filter Panel (Sidebar or Bottom Sheet)
- Results Grid (ProviderCard list)
- Pagination or Infinite Scroll
- Empty State (if no results)

**Layout (Desktop):**
```
┌────────────────────────────────────────┐
│ [Logo] [Search Bar]         [Profile] │ <- Header
├────────────────────────────────────────┤
│ [Filters] │ [ProviderCard]             │
│           │ [ProviderCard]             │
│           │ [ProviderCard]             │
│           │ [ProviderCard]             │
│           │ [...more]                  │
│           │ [Load More]                │
└───────────┴────────────────────────────┘
```

**Layout (Mobile):**
```
┌────────────────────┐
│ [Logo] [Search]    │ <- Header
├────────────────────┤
│ [Filter Button]    │ <- Floating
├────────────────────┤
│ [ProviderCard]     │
│ [ProviderCard]     │
│ [ProviderCard]     │
│ [...more]          │
│ [Load More]        │
└────────────────────┘
```

**Related Stories:** BS-001

---

### T-02: ProviderDetailPage

**Purpose:** Provider profile and booking initiation

**Composition:**
- Header (Back button, Share, Favorite)
- Provider Profile (O-02)
- Sticky Booking CTA (Bottom Bar)

**Layout:**
```
┌────────────────────────────────────────┐
│ [<] Provider Name          [♡] [Share]│ <- Header
├────────────────────────────────────────┤
│ [Provider Profile Content]             │
│ - Header with avatar and badges        │
│ - Stats and bio                        │
│ - Portfolio gallery                    │
│ - Services with pricing                │
│ - Reviews                              │
│ - Availability preview                 │
├────────────────────────────────────────┤
│ [Book Service]                         │ <- Sticky CTA
└────────────────────────────────────────┘
```

**Related Stories:** BS-001, BS-002

---

### T-03: BookingFlowPage

**Purpose:** Multi-step booking creation

**Composition:**
- Header (Progress Indicator + Back/Close)
- Booking Form Steps (O-03)
- Navigation (Back/Next buttons)
- Price Summary (Sticky sidebar or accordion)

**Layout:**
```
┌────────────────────────────────────────┐
│ [X] Booking         [●●●○○] Step 3/5  │ <- Header
├────────────────────────────────────────┤
│ Step Content:                          │
│ [Form Fields]                          │
│ [Date/Time Picker]                     │
│ [Map Input]                            │
│ [etc.]                                 │
├────────────────────────────────────────┤
│ Price Summary: ฿1,500                  │ <- Sticky
│ [Back] [Next: Review & Pay]            │
└────────────────────────────────────────┘
```

**Related Stories:** BS-002

---

### T-04: ProviderOnboardingPage

**Purpose:** Provider KYC and profile setup

**Composition:**
- Progress Steps (similar to booking flow)
- Form Sections (Personal Info, Documents, Services, Availability)
- Document Upload Component
- Preview and Submit

**Steps:**
1. Personal Information
2. ID & Certifications Upload
3. Services & Pricing
4. Availability Setup
5. Review & Submit

**Layout:**
```
┌────────────────────────────────────────┐
│ Become a Provider  [●●●○○] Step 3/5   │ <- Header
├────────────────────────────────────────┤
│ Upload Your Certifications             │
│ ────────────────────────────────────   │
│ [ID Document]                          │
│ [+] Upload (PDF/JPG, max 10MB)         │
│                                        │
│ [Certificates] (Min 2 required)        │
│ [+] Upload Certificate 1               │
│ [+] Upload Certificate 2               │
│ [+] Upload Certificate 3               │
├────────────────────────────────────────┤
│ [Back] [Continue]                      │
└────────────────────────────────────────┘
```

**Related Stories:** PS-001

---

### T-05: DashboardPage (Client)

**Purpose:** Client homepage and booking overview

**Composition:**
- Greeting Header
- Quick Actions (Search, Favorites)
- Upcoming Bookings
- Featured Services
- Recent Providers

**Layout:**
```
┌────────────────────────────────────────┐
│ Hi, Amira! 👋                          │ <- Greeting
├────────────────────────────────────────┤
│ [Search services...]                   │ <- Search Bar
├────────────────────────────────────────┤
│ Upcoming Bookings                      │
│ [BookingCard - Next appointment]       │
│ [View All Bookings]                    │
├────────────────────────────────────────┤
│ Featured Services                      │
│ [ServiceCard] [ServiceCard] [...]      │
├────────────────────────────────────────┤
│ Your Favorites                         │
│ [ProviderCard] [ProviderCard]          │
└────────────────────────────────────────┘
```

**Related Stories:** BS-004, BS-001

---

### T-06: DashboardPage (Provider)

**Purpose:** Provider home with bookings and earnings

**Composition:**
- Earnings Summary (O-09)
- Today's Bookings
- Pending Requests (with countdown)
- Quick Actions (Manage Availability, View Profile)

**Layout:**
```
┌────────────────────────────────────────┐
│ Welcome back, Nok! 📊                  │ <- Greeting
├────────────────────────────────────────┤
│ [ProviderEarningsCard]                 │
├────────────────────────────────────────┤
│ Pending Requests (2) 🔔                │
│ [BookingCard - 28 min left]            │
│ [BookingCard - 15 min left]            │
├────────────────────────────────────────┤
│ Today's Schedule                       │
│ [BookingCard - 9:00 AM]                │
│ [BookingCard - 2:00 PM]                │
├────────────────────────────────────────┤
│ Quick Actions                          │
│ [Manage Availability] [View Profile]   │
└────────────────────────────────────────┘
```

**Related Stories:** PS-003, PS-005

---

## Accessibility Checklist

### Global Requirements

- [ ] All interactive elements have min 44x44px touch target
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI components)
- [ ] Keyboard navigation works for all interactions
- [ ] Focus indicators visible (2px outline, high contrast)
- [ ] Forms have proper label-input associations
- [ ] Error messages linked via `aria-describedby`
- [ ] Images have meaningful `alt` text (or `alt=""` if decorative)
- [ ] Headings follow logical hierarchy (no skipped levels)
- [ ] Landmark regions (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [ ] Page title unique and descriptive
- [ ] Language attribute set (`lang="en"` or `lang="th"`)
- [ ] Skip to main content link for keyboard users
- [ ] Loading states announced to screen readers
- [ ] Error announcements via `aria-live` regions
- [ ] Modal/dialog focus trap and close on Escape
- [ ] Reduced motion respected (`prefers-reduced-motion`)

### Testing Tools

- **Automated:** axe DevTools, Lighthouse Accessibility Audit
- **Manual:** NVDA (Windows), VoiceOver (Mac/iOS), TalkBack (Android)
- **Keyboard:** Tab, Shift+Tab, Enter, Space, Arrow keys, Escape
- **Color:** Contrast checker, color blindness simulator

---

## Design Tokens

### Colors (Tailwind CSS)

**Brand:**
- Primary: `#B6A28E` (Warm beige)
- Secondary: `#4B342F` (Coffee brown)
- Accent: `#B6C2A2` (Sage green)

**Semantic:**
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)
- Info: `#3B82F6` (Blue)

**Neutrals:**
- Gray: `#6B7280`, `#D1D5DB`, `#F3F4F6`
- White: `#FFFFFF`
- Black: `#111827`

### Typography

**Fonts:**
- Primary: `Inter` (English, numbers)
- Thai: `Noto Sans Thai` (Thai language)
- Fallback: System font stack

**Scale:**
- xs: 12px / 0.75rem
- sm: 14px / 0.875rem
- base: 16px / 1rem
- lg: 18px / 1.125rem
- xl: 20px / 1.25rem
- 2xl: 24px / 1.5rem
- 3xl: 30px / 1.875rem
- 4xl: 36px / 2.25rem

### Spacing

- xs: 4px / 0.25rem
- sm: 8px / 0.5rem
- md: 16px / 1rem
- lg: 24px / 1.5rem
- xl: 32px / 2rem
- 2xl: 48px / 3rem

### Breakpoints

- Mobile: 0-639px
- Tablet: 640px-1023px
- Desktop: 1024px+

---

## Component Development Guidelines

### File Structure
```
components/
├── ui/              # shadcn/ui primitives (atoms)
│   ├── button.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   └── ...
├── molecules/       # Molecules
│   ├── form-field.tsx
│   ├── search-bar.tsx
│   └── ...
├── organisms/       # Organisms
│   ├── provider-card.tsx
│   ├── booking-form.tsx
│   └── ...
└── templates/       # Page templates
    ├── search-results.tsx
    ├── provider-detail.tsx
    └── ...
```

### Component Template
```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  // Props
}

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('base-styles', className)}
      {...props}
    >
      {/* Content */}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';
```

### Testing Requirements

- Unit tests for component logic
- Accessibility tests (jest-axe)
- Visual regression tests (Chromatic/Percy)
- E2E tests for critical flows (Playwright)

---

## Related Documentation

- **FRD Requirements:** Each component maps to specific functional requirements
- **User Stories:** Components implement features from user stories
- **Wireframes:** `documents/design/00-wireframes.md` shows component usage in layouts
- **Traceability:** `documents/acceptance/00-traceability.md` links components to test cases

---

**End of Component Inventory**
