# Veyya Low-Fidelity Wireframes

## Document Information

**Version:** 1.0
**Date:** 2025-10-25
**Type:** Low-Fidelity Screen Outlines

**Related Documents:**
- FRD: `documents/frd/00-frd.md`
- User Stories: `documents/user-stories/00-core-stories.md`
- Component Inventory: `documents/components/00-inventory.md`
- Data Model: `documents/data-model/00-data-model.md`

---

## Overview

This document provides low-fidelity wireframe outlines for Veyya's four core user flows. Each screen lists major sections and references components from the Component Inventory (`00-inventory.md`).

**Notation:**
- `[Component-ID]` - Reference to component in inventory
- `{data}` - Dynamic content placeholder
- `(action)` - User interaction
- `→` - Navigation flow

**Flows Covered:**
1. Search & Results Flow (Client)
2. Provider Detail & Booking Flow (Client)
3. Booking Management Flow (Client)
4. Provider Onboarding Flow (Provider)

---

## Flow 1: Search & Results

**User Story:** BS-001 - Discover and Filter Service Providers

**Entry Point:** Client home screen or main search

---

### Screen 1.1: Home / Dashboard (Client)

**Purpose:** Entry point for clients to discover services

**Layout:**
```
┌─────────────────────────────────────┐
│ [O-07] Navigation Bar               │ <- Top bar
│  Logo | Search | Bookings | Profile │
├─────────────────────────────────────┤
│ Hi, {user.name}! 👋                 │ <- Greeting
│                                     │
│ [M-02] Search Bar                   │ <- "Search services..."
│  (tap → navigate to search results) │
├─────────────────────────────────────┤
│ Upcoming Bookings                   │ <- Section heading
│ ────────────────────────             │
│ [O-04] BookingCard (next appt)      │
│  Service | Provider | Date/Time     │
│                                     │
│ [A-01] View All Bookings (link)     │
├─────────────────────────────────────┤
│ Featured Services                   │ <- Horizontal scroll
│ ────────────────────────             │
│ [Card] [Card] [Card] [Card]         │
│  Icon | Name | From ฿price          │
│  (tap → search by category)         │
├─────────────────────────────────────┤
│ Your Favorites (2)                  │
│ ────────────────────────             │
│ [O-01] ProviderCard                 │
│ [O-01] ProviderCard                 │
│                                     │
│ [A-01] Browse All Providers (link)  │
└─────────────────────────────────────┘
```

**Components Used:**
- [O-07] NavigationBar
- [M-02] SearchBar
- [O-04] BookingCard
- [O-01] ProviderCard
- [A-01] Button (link variant)

**User Actions:**
- Tap Search Bar → Navigate to Screen 1.2
- Tap Featured Service → Navigate to Screen 1.2 (filtered by category)
- Tap Provider Card → Navigate to Screen 2.1
- Tap View All Bookings → Navigate to Flow 3

**Data Requirements:**
- User name
- Next upcoming booking
- Featured service categories
- User's favorited providers (limit 2)

**Related Stories:** BS-001, BS-004

---

### Screen 1.2: Search Results

**Purpose:** Display ranked providers matching search criteria

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] [M-02] Search Bar     [Filter]  │ <- Header
│     "{search query}"                │
├─────────────────────────────────────┤
│ [M-05] Chip Filters (horizontal)    │ <- Active filters
│  Category: Beauty ✕ | Rating 4.5+ ✕│
│                                     │
│ Showing {count} providers           │
│ Sort by: [Recommended ▼]            │
├─────────────────────────────────────┤
│ [O-01] ProviderCard                 │
│  Avatar | Name | ⭐ 4.8 (32)        │
│  2.5km away • 95% response          │
│  Nails, Hair, Lashes                │
│  From ฿1,200                        │
│  [View Profile] [♡]                 │
├─────────────────────────────────────┤
│ [O-01] ProviderCard                 │
│  ...                                │
├─────────────────────────────────────┤
│ [O-01] ProviderCard                 │
│  ...                                │
├─────────────────────────────────────┤
│ [A-06] Skeleton (loading more)      │ <- Infinite scroll
│                                     │
│  OR                                 │
│                                     │
│ [M-07] EmptyState                   │ <- No results
│  Icon | "No providers found"        │
│  "Try adjusting your filters"       │
│  [Clear Filters]                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ [O-06] Filter Panel (Sheet/Sidebar) │ <- Opened via Filter button
│                                     │
│ Filters                             │
│ ────────────────────────             │
│ Service Category                    │
│  ☐ Beauty                           │
│  ☑ Pet Care                         │
│  ☐ Cleaning                         │
│                                     │
│ Minimum Rating                      │
│  [Rating selector: 4.5+ selected]   │
│                                     │
│ Distance                            │
│  [Slider: 0 ——○—— 50 km]           │
│  Within 10 km                       │
│                                     │
│ Price Range                         │
│  [Slider: ฿500 - ฿5,000]           │
│                                     │
│ Languages                           │
│  ☑ English                          │
│  ☑ Thai                             │
│                                     │
│ Availability                        │
│  ○ Anytime                          │
│  ● Today                            │
│  ○ Tomorrow                         │
│  ○ This Week                        │
│                                     │
│ Provider Type                       │
│  ☑ Veyya Verified                   │
│  ☐ Family-Friendly                  │
│                                     │
│ [Clear All] [Apply ({count})]       │ <- Actions
└─────────────────────────────────────┘
```

**Components Used:**
- [M-02] SearchBar
- [A-01] Button (Filter)
- [M-05] Chip (active filters)
- [O-01] ProviderCard (list)
- [A-06] Skeleton (loading)
- [M-07] EmptyState (no results)
- [O-06] FilterPanel (modal/sheet)

**User Actions:**
- Edit Search → Update results
- Tap Filter → Open filter panel
- Remove chip → Remove filter, update results
- Tap Provider Card → Navigate to Screen 2.1
- Tap Favorite icon → Add to favorites (toast confirmation)
- Apply Filters → Close panel, update results
- Scroll to bottom → Load more results (infinite scroll)

**Data Requirements:**
- Search query string
- Active filters (from FilterState)
- Provider list (paginated, 20 per page)
- Total result count

**Related Stories:** BS-001, R-DISCOVERY-002

---

## Flow 2: Provider Detail & Booking

**User Story:** BS-001, BS-002 - View Provider Profile and Create Booking

**Entry Point:** Search results or favorites list

---

### Screen 2.1: Provider Profile

**Purpose:** Detailed provider information and booking CTA

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back         [♡ Favorite] [...]│ <- Header (sticky)
├─────────────────────────────────────┤
│ [A-04] Avatar (large, centered)     │ <- Profile header
│                                     │
│ {provider.name}                     │ <- h1
│ [A-03] Badge "Veyya Verified" ✓     │
│ [A-03] Badge "Family-Friendly"      │
│                                     │
│ ⭐ {rating} ({reviewCount} reviews) │
│ 📍 {distance}km away                │
│ 💬 {responseRate}% response rate    │
│ 📅 {totalBookings} completed        │
│ 🌐 English, Thai                    │
├─────────────────────────────────────┤
│ About                               │ <- Section
│ ────────────────────────             │
│ {provider.bio}                      │
│ [Read More ▼]                       │
├─────────────────────────────────────┤
│ Portfolio                           │ <- Gallery
│ ────────────────────────             │
│ [Image] [Image] [Image] [Image]     │ <- Horizontal scroll
│  (tap → full-screen gallery)        │
├─────────────────────────────────────┤
│ Services & Pricing                  │
│ ────────────────────────             │
│ [Service Row]                       │
│  Icon | Gel Nails | ฿1,200          │
│  60 minutes                         │
│  [Book]                             │
│                                     │
│ [Service Row]                       │
│  Icon | Hair Styling | ฿1,500       │
│  90 minutes                         │
│  [Book]                             │
│                                     │
│ [... more services]                 │
├─────────────────────────────────────┤
│ Customer Reviews ({count})          │
│ ────────────────────────             │
│ [M-03] RatingDisplay                │
│  ⭐⭐⭐⭐⭐ 4.8 average               │
│                                     │
│ [Review Item]                       │
│  [A-04] Avatar | {name}             │
│  ⭐⭐⭐⭐⭐ {date}                    │
│  {comment}                          │
│  [Photos if any]                    │
│                                     │
│ [Review Item]                       │
│  ...                                │
│                                     │
│ [A-01] Show All Reviews             │
├─────────────────────────────────────┤
│ Availability                        │
│ ────────────────────────             │
│ Next available: {nextSlot}          │
│ [View Full Calendar]                │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [A-01] Book Service (sticky bottom) │ <- CTA
└─────────────────────────────────────┘
```

**Components Used:**
- [A-04] Avatar (large)
- [A-03] Badge (verification, tags)
- [M-03] RatingDisplay
- [M-04] PriceDisplay
- [A-01] Button (Book, Show All)
- Gallery component (custom organism)

**User Actions:**
- Tap Back → Return to search results
- Tap Favorite → Toggle favorite status
- Tap Share → Open share sheet
- Tap Portfolio Image → Open full-screen gallery
- Tap Book on Service → Navigate to Screen 2.2 (pre-select service)
- Tap Book Service (bottom CTA) → Navigate to Screen 2.2
- Tap Show All Reviews → Navigate to reviews page

**Data Requirements:**
- Provider full profile
- Services offered with pricing
- Reviews (paginated, show 3 initially)
- Portfolio photos
- Next available slot preview

**Related Stories:** BS-001, R-DISCOVERY-003

---

### Screen 2.2: Booking Flow - Step 1 (Select Service)

**Purpose:** Choose service and see pricing

**Layout:**
```
┌─────────────────────────────────────┐
│ [X] Close      [●○○○○] Step 1 of 5  │ <- Progress header
│ Select Service                      │
├─────────────────────────────────────┤
│ Booking with: {provider.name}       │ <- Context
│ [A-04] Avatar                       │
├─────────────────────────────────────┤
│ Choose a service                    │
│                                     │
│ [Service Card - Selectable]         │
│  ○ Gel Nails                        │
│     60 minutes | ฿1,200             │
│                                     │
│ [Service Card - Selected]           │
│  ● Hair Styling ✓                   │
│     90 minutes | ฿1,500             │
│                                     │
│ [Service Card]                      │
│  ○ Makeup Application               │
│     45 minutes | ฿2,000             │
│                                     │
│ Add-ons (optional)                  │
│  ☐ Nail Art (+฿300)                 │
│  ☐ Deep Conditioning (+฿400)        │
├─────────────────────────────────────┤
│ [M-04] Price Summary (sticky)       │
│  Subtotal: ฿1,500                   │
│  Add-ons: ฿0                        │
│  Total: ฿1,500                      │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Back] [Next: Choose Date & Time]   │ <- Navigation
└─────────────────────────────────────┘
```

**Components Used:**
- [A-04] Avatar
- [M-04] PriceDisplay
- [A-01] Button
- Radio cards for service selection

**User Actions:**
- Select Service → Update price
- Toggle Add-ons → Update price
- Tap Next → Navigate to Screen 2.3
- Tap Back/Close → Confirm exit dialog

**Data Requirements:**
- Provider services with pricing
- Available add-ons

**Related Stories:** BS-002, R-BOOKING-001

---

### Screen 2.3: Booking Flow - Step 2 (Date & Time)

**Purpose:** Select date and time slot

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back       [●●○○○] Step 2 of 5  │
│ Choose Date & Time                  │
├─────────────────────────────────────┤
│ Service: Hair Styling (90 min)      │ <- Context
│ Provider: {name}                    │
├─────────────────────────────────────┤
│ Select Date                         │
│                                     │
│ [Calendar Widget]                   │
│  Sun Mon Tue Wed Thu Fri Sat        │
│   24  25  [26] 27  28  29  30       │
│        ●   ○   ●   ●   ●            │ <- Availability indicator
│                                     │
│ Selected: Wednesday, Oct 26, 2025   │
├─────────────────────────────────────┤
│ Available Time Slots                │
│                                     │
│ Morning                             │
│  [09:00 AM] [10:30 AM]              │ <- Selectable chips
│                                     │
│ Afternoon                           │
│  [01:00 PM] [●02:30 PM✓] [04:00 PM]│ <- Selected
│                                     │
│ Evening                             │
│  [06:00 PM] (No slots)              │ <- Disabled
│                                     │
│ Duration: 90 minutes                │
│ Ends at: 04:00 PM                   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Back] [Next: Enter Location]       │
└─────────────────────────────────────┘
```

**Components Used:**
- Calendar component (custom organism)
- [M-05] Chip (time slots)
- [A-01] Button

**User Actions:**
- Select Date → Load available slots for that date
- Select Time Slot → Show end time
- Tap Next → Navigate to Screen 2.4

**Data Requirements:**
- Provider availability slots (filtered by selected date)
- Service duration

**Related Stories:** BS-002, R-BOOKING-001, R-CALENDAR-003

---

### Screen 2.4: Booking Flow - Step 3 (Location)

**Purpose:** Enter service location

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back       [●●●○○] Step 3 of 5  │
│ Service Location                    │
├─────────────────────────────────────┤
│ Where should {provider.name} come?  │
├─────────────────────────────────────┤
│ [M-02] Address Search               │
│  🔍 Search address...               │
│  [Use Current Location] (button)    │
│                                     │
│ [Autocomplete Results]              │
│  123 Sukhumvit Rd, Bangkok          │
│  456 Silom Rd, Bangkok              │
│  ...                                │
├─────────────────────────────────────┤
│ Selected Address:                   │
│ 123 Sukhumvit Rd, Khlong Toei       │
│ Bangkok 10110                       │
│                                     │
│ [Map Preview]                       │
│  {interactive map with pin}         │
│                                     │
│ [M-01] Address Details (optional)   │
│  Unit/Floor: ___________________    │
│  Building Name: ________________    │
│  Access Notes: _________________    │
│   (Gate code, parking, etc.)        │
│                                     │
│ [Checkbox]                          │
│  ☑ Save for future bookings         │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Back] [Next: Add Instructions]     │
└─────────────────────────────────────┘
```

**Components Used:**
- [M-02] SearchBar (address autocomplete)
- [M-01] FormField (text inputs)
- [A-01] Button
- Map component (Mapbox/Google Maps)

**User Actions:**
- Type Address → Show autocomplete results
- Tap Current Location → Get GPS coordinates, reverse geocode
- Select Address → Show on map, populate fields
- Tap Next → Navigate to Screen 2.5

**Data Requirements:**
- Address autocomplete via Maps API
- GPS coordinates
- Saved addresses (if available)

**Related Stories:** BS-002, R-BOOKING-001

---

### Screen 2.5: Booking Flow - Step 4 (Instructions)

**Purpose:** Add special notes and household preferences

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back       [●●●●○] Step 4 of 5  │
│ Special Instructions                │
├─────────────────────────────────────┤
│ Anything {provider.name} should     │
│ know?                               │
├─────────────────────────────────────┤
│ [M-01] Textarea                     │
│  Placeholder: "E.g., I have two     │
│  dogs, please ring the bell twice"  │
│                                     │
│  {user input}                       │
│                                     │
│  0 / 500 characters                 │
├─────────────────────────────────────┤
│ Saved Household Notes (optional)    │
│                                     │
│ [Checkbox]                          │
│  ☐ 2 Golden Retrievers (friendly)   │
│  ☐ Kids home after 3pm              │
│  ☐ Allergic to strong fragrances    │
│                                     │
│ [A-01] Manage Household Notes (link)│
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Back] [Next: Review & Pay]         │
└─────────────────────────────────────┘
```

**Components Used:**
- [M-01] FormField (textarea)
- [A-01] Button
- Checkboxes for saved notes

**User Actions:**
- Type Instructions → Save to booking
- Select Saved Notes → Add to booking
- Tap Next → Navigate to Screen 2.6

**Data Requirements:**
- User's saved household notes
- Booking special instructions

**Related Stories:** BS-002, BS-006

---

### Screen 2.6: Booking Flow - Step 5 (Review & Pay)

**Purpose:** Confirm booking details and complete payment

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back       [●●●●●] Step 5 of 5  │
│ Review & Pay                        │
├─────────────────────────────────────┤
│ Booking Summary                     │
│ ────────────────────────             │
│ Provider: {name}                    │
│ [A-04] Avatar                       │
│                                     │
│ Service: Hair Styling               │
│ Date: Wed, Oct 26, 2025             │
│ Time: 2:30 PM - 4:00 PM (90 min)    │
│                                     │
│ Location:                           │
│ 123 Sukhumvit Rd, Bangkok           │
│ Unit 5B, Gate code: 1234            │
│                                     │
│ Special Instructions:               │
│ "Please ring twice, dogs present"   │
│                                     │
│ [Edit] (link next to each section)  │
├─────────────────────────────────────┤
│ Price Breakdown                     │
│ ────────────────────────             │
│ Hair Styling          ฿1,500        │
│ Add-on: Treatment       ฿400        │
│                       ──────        │
│ Total                 ฿1,900        │
│                                     │
│ [M-06] Alert (info variant)         │
│  💳 Payment is held securely and    │
│  only released after service        │
│  completion and your review.        │
├─────────────────────────────────────┤
│ Payment Method                      │
│ ────────────────────────             │
│ [Payment Card Selector]             │
│  ● Credit/Debit Card                │
│  ○ PromptPay                        │
│                                     │
│ [Card Input Fields] (if card)       │
│  Card Number: ____________________  │
│  Expiry: _______ CVV: ____          │
│  Name: ________________________     │
│                                     │
│  [Checkbox]                         │
│  ☑ Save card for future bookings    │
├─────────────────────────────────────┤
│ Cancellation Policy                 │
│  Free cancellation ≥12 hours prior  │
│  <12 hours = 50% fee                │
│                                     │
│ [Checkbox] Required                 │
│  ☑ I agree to the Terms of Service  │
│  and Cancellation Policy            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Back] [Confirm & Pay ฿1,900]       │ <- CTA (primary)
│          [A-07] Spinner (if loading)│
└─────────────────────────────────────┘
```

**Components Used:**
- [A-04] Avatar
- [M-04] PriceDisplay
- [M-06] Alert
- [M-01] FormField (payment inputs)
- [A-01] Button
- [A-07] Spinner (loading)

**User Actions:**
- Tap Edit → Go back to respective step
- Select Payment Method → Show relevant input fields
- Enter Payment Details → Validate
- Tap Confirm & Pay → Process payment, create booking
  - Success → Navigate to Screen 2.7
  - Failure → Show error alert, allow retry

**Data Requirements:**
- Complete booking summary
- Payment gateway integration (Stripe/Omise)
- Terms and cancellation policy content

**Related Stories:** BS-002, R-BOOKING-001, R-BOOKING-002

---

### Screen 2.7: Booking Confirmation

**Purpose:** Confirm successful booking

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│         ✓ Booking Confirmed!        │ <- Success message
│                                     │
├─────────────────────────────────────┤
│ Your request has been sent to       │
│ {provider.name}.                    │
│                                     │
│ ⏱️ They have 30 minutes to respond. │
│                                     │
│ Booking ID: #BK-123456              │
├─────────────────────────────────────┤
│ [O-04] BookingCard (summary)        │
│  Hair Styling with {name}           │
│  Wed, Oct 26 at 2:30 PM             │
│  Status: PENDING_PROVIDER 🟡        │
├─────────────────────────────────────┤
│ What happens next?                  │
│ 1. Provider reviews your request    │
│ 2. You'll get notified when accepted│
│ 3. Payment will be held securely    │
│                                     │
│ [M-06] Alert (info)                 │
│  📧 Confirmation sent to {email}    │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [View Booking Details]              │ <- Navigate to booking detail
│ [Book Another Service]              │ <- Return to search
│ [Done] (Go to Dashboard)            │
└─────────────────────────────────────┘
```

**Components Used:**
- Success icon/animation
- [O-04] BookingCard
- [M-06] Alert
- [A-01] Button

**User Actions:**
- Tap View Booking Details → Navigate to Flow 3 (Booking Detail)
- Tap Book Another → Return to search/home
- Tap Done → Navigate to dashboard

**Data Requirements:**
- Created booking with ID and status
- Confirmation timestamp

**Related Stories:** BS-002, BS-003

---

## Flow 3: Booking Management

**User Story:** BS-003, BS-007 - Track Status, Cancel, Reschedule

**Entry Point:** Bookings tab or notification

---

### Screen 3.1: Booking List

**Purpose:** View all bookings (upcoming, past)

**Layout:**
```
┌─────────────────────────────────────┐
│ Bookings                [Filter ▼]  │ <- Header
├─────────────────────────────────────┤
│ [Tabs]                              │
│  ● Upcoming  ○ Past  ○ Cancelled    │
├─────────────────────────────────────┤
│ [O-04] BookingCard                  │
│  Hair Styling with Nok              │
│  Tomorrow at 2:30 PM                │
│  Status: CONFIRMED ✅               │
│  [View Details] [Contact]           │
├─────────────────────────────────────┤
│ [O-04] BookingCard                  │
│  Gel Nails with Som                 │
│  Next Monday at 10:00 AM            │
│  Status: PENDING_PROVIDER 🟡        │
│  ⏱️ 18 minutes left to accept       │
│  [View Details] [Cancel]            │
├─────────────────────────────────────┤
│ [O-04] BookingCard                  │
│  ...                                │
├─────────────────────────────────────┤
│  OR                                 │
│                                     │
│ [M-07] EmptyState                   │
│  📅 "No upcoming bookings"          │
│  "Book a service to get started"    │
│  [Browse Services]                  │
└─────────────────────────────────────┘
```

**Components Used:**
- [O-04] BookingCard (list)
- [M-07] EmptyState
- [A-01] Button
- Tab navigation

**User Actions:**
- Switch Tabs → Filter bookings by status
- Tap Booking Card → Navigate to Screen 3.2
- Tap Contact → Open WhatsApp/LINE
- Tap Cancel → Show confirmation dialog → Cancel booking

**Data Requirements:**
- User's bookings (filtered by tab)
- Real-time status updates

**Related Stories:** BS-003

---

### Screen 3.2: Booking Detail

**Purpose:** View detailed booking info and manage

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back          Booking #{id}     │ <- Header
├─────────────────────────────────────┤
│ [A-03] Status Badge CONFIRMED ✅    │ <- Prominent
│                                     │
│ Service Details                     │
│ ────────────────────────             │
│ Hair Styling                        │
│ 90 minutes                          │
├─────────────────────────────────────┤
│ Date & Time                         │
│ ────────────────────────             │
│ Wednesday, October 26, 2025         │
│ 2:30 PM - 4:00 PM                   │
│ [Add to Calendar] (button)          │
│                                     │
│ [M-06] Alert (info)                 │
│  ⏰ Reminder: Service in 24 hours   │
├─────────────────────────────────────┤
│ Provider                            │
│ ────────────────────────             │
│ [A-04] Avatar | {name}              │
│ ⭐ 4.8 (32 reviews)                 │
│ 📞 [Contact Provider] (WhatsApp)    │
│ [View Profile]                      │
├─────────────────────────────────────┤
│ Location                            │
│ ────────────────────────             │
│ 123 Sukhumvit Rd, Bangkok           │
│ Unit 5B, Gate code: 1234            │
│ [Map Preview]                       │
│ [Get Directions]                    │
├─────────────────────────────────────┤
│ Special Instructions                │
│ ────────────────────────             │
│ "Please ring twice, dogs present"   │
├─────────────────────────────────────┤
│ Payment                             │
│ ────────────────────────             │
│ Total: ฿1,900                       │
│ Status: Payment held (Escrow) 🔒    │
│ [View Receipt]                      │
├─────────────────────────────────────┤
│ Cancellation Policy                 │
│ ────────────────────────             │
│ Free cancellation until             │
│ Oct 26, 2:30 AM (12 hours prior)    │
│ After: 50% cancellation fee         │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Reschedule] [Cancel Booking]       │ <- Actions (if allowed)
│                                     │
│  OR (if completed)                  │
│                                     │
│ [Leave a Review]                    │ <- CTA
└─────────────────────────────────────┘
```

**Components Used:**
- [A-03] Badge (status)
- [A-04] Avatar
- [M-06] Alert (reminders)
- [M-04] PriceDisplay
- [A-01] Button
- Map preview

**User Actions:**
- Tap Contact Provider → Open WhatsApp/LINE with pre-filled message
- Tap Add to Calendar → Export .ics file or calendar app
- Tap Get Directions → Open Maps app
- Tap Reschedule → Navigate to reschedule flow
- Tap Cancel → Show confirmation dialog with policy info
- Tap Leave Review → Navigate to Screen 3.3

**Data Requirements:**
- Complete booking details
- Cancellation policy calculation (time remaining)

**Related Stories:** BS-003, BS-007

---

### Screen 3.3: Leave Review

**Purpose:** Submit rating and review after service

**Layout:**
```
┌─────────────────────────────────────┐
│ [X] Close      Rate Your Experience │ <- Header
├─────────────────────────────────────┤
│ How was your service with           │
│ {provider.name}?                    │
│                                     │
│ Service: Hair Styling               │
│ Date: Oct 26, 2025                  │
├─────────────────────────────────────┤
│ Rating (required)                   │
│ ────────────────────────             │
│ [M-03] Rating Selector (interactive)│
│  ☆ ☆ ☆ ☆ ☆ → ⭐⭐⭐⭐⭐             │
│  Tap a star to rate                 │
├─────────────────────────────────────┤
│ Tell us more (optional)             │
│ ────────────────────────             │
│ [M-01] Textarea                     │
│  "Share your experience..."         │
│                                     │
│  {user input}                       │
│                                     │
│  0 / 1000 characters                │
├─────────────────────────────────────┤
│ Add Photos (optional)               │
│ ────────────────────────             │
│ [Photo Upload Slots]                │
│  [+] [+] [+]                        │
│  Up to 3 photos, max 5MB each       │
│                                     │
│  [Preview thumbnails if uploaded]   │
├─────────────────────────────────────┤
│ [Checkbox]                          │
│  ☑ Add {provider.name} to favorites │
│                                     │
│ [M-06] Alert (info)                 │
│  Your review will be visible after  │
│  moderation (usually within 24hrs)  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Cancel] [Submit Review]            │ <- Actions
└─────────────────────────────────────┘
```

**Components Used:**
- [M-03] RatingDisplay (interactive)
- [M-01] FormField (textarea)
- [M-06] Alert
- [A-01] Button
- Photo upload component

**User Actions:**
- Select Rating → Enable submit button (required)
- Type Review → Character count updates
- Upload Photos → Preview thumbnails
- Toggle Favorite → Add/remove from favorites
- Tap Submit → Upload review, show success message
- Tap Cancel → Confirm exit dialog

**Data Requirements:**
- Booking info (service, provider)
- Photo upload to Object Storage

**Related Stories:** BS-005, BS-004, R-REVIEW-001

---

## Flow 4: Provider Onboarding

**User Story:** PS-001 - Complete KYC and Profile Setup

**Entry Point:** "Become a Provider" CTA or signup flow

---

### Screen 4.1: Provider Onboarding - Welcome

**Purpose:** Introduction to provider program

**Layout:**
```
┌─────────────────────────────────────┐
│ [X] Close                           │
├─────────────────────────────────────┤
│         🌟                          │
│    Become a Veyya Provider          │
│                                     │
│ Join our community of verified      │
│ professionals and grow your         │
│ business                            │
├─────────────────────────────────────┤
│ What you'll get:                    │
│                                     │
│ ✓ Steady stream of bookings        │
│ ✓ Weekly payouts (70% of booking)  │
│ ✓ Flexible schedule                │
│ ✓ Professional training             │
│ ✓ Free marketing & visibility       │
├─────────────────────────────────────┤
│ Requirements:                       │
│                                     │
│ • Valid Thai ID or Passport         │
│ • Professional certifications (2+)  │
│ • Service experience                │
│ • Bank account for payouts          │
├─────────────────────────────────────┤
│ Approval time: 24-48 hours          │
│ Onboarding takes ~15 minutes        │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Get Started]                       │ <- CTA
│ [Learn More] (link)                 │
└─────────────────────────────────────┘
```

**Components Used:**
- Icons/illustrations
- [A-01] Button
- [M-06] Alert (optional, for requirements)

**User Actions:**
- Tap Get Started → Navigate to Screen 4.2
- Tap Learn More → Open FAQ page

**Related Stories:** PS-001

---

### Screen 4.2: Provider Onboarding - Step 1 (Personal Info)

**Purpose:** Collect basic profile information

**Layout:**
```
┌─────────────────────────────────────┐
│ [X] Close      [●○○○○] Step 1 of 5  │
│ Personal Information                │
├─────────────────────────────────────┤
│ Let's start with the basics         │
├─────────────────────────────────────┤
│ [M-01] FormField                    │
│  Full Name *                        │
│  ___________________________        │
│                                     │
│ [M-01] FormField                    │
│  Phone Number *                     │
│  +66 _______________________        │
│                                     │
│ [M-01] FormField                    │
│  Email *                            │
│  ___________________________        │
│                                     │
│ Profile Photo                       │
│  [A-04] Avatar Upload               │
│  [Change Photo]                     │
│                                     │
│ Bio (optional)                      │
│  [M-01] Textarea                    │
│  "Tell clients about yourself..."   │
│  0 / 500 characters                 │
│                                     │
│ Service Area                        │
│  Willing to travel up to:           │
│  [Slider: 5 ——○—— 50 km]           │
│  15 km from your location           │
│                                     │
│ Languages Spoken *                  │
│  [Checkboxes]                       │
│  ☑ Thai                             │
│  ☑ English                          │
│  ☐ Other: ___________               │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Save & Continue]                   │
└─────────────────────────────────────┘
```

**Components Used:**
- [M-01] FormField (various types)
- [A-04] Avatar (upload)
- Slider component

**User Actions:**
- Fill Fields → Enable continue button
- Upload Photo → Preview and crop
- Tap Continue → Validate, save, navigate to Screen 4.3

**Data Requirements:**
- User account info (pre-filled if available)

**Related Stories:** PS-001, R-PROVIDER-001

---

### Screen 4.3: Provider Onboarding - Step 2 (Documents)

**Purpose:** Upload KYC documents

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back       [●●○○○] Step 2 of 5  │
│ Identity & Certifications           │
├─────────────────────────────────────┤
│ We need to verify your identity     │
│ and qualifications                  │
├─────────────────────────────────────┤
│ ID Document * (Required)            │
│                                     │
│ [Document Upload Card]              │
│  Thai ID or Passport                │
│  [📄 +] Upload                      │
│  Accepted: PDF, JPG, PNG (max 10MB) │
│                                     │
│  OR (if uploaded)                   │
│                                     │
│  [✓ thai_id.pdf] (2.3 MB)           │
│  [Preview] [Remove]                 │
├─────────────────────────────────────┤
│ Professional Certifications *       │
│ (Minimum 2 required)                │
│                                     │
│ [Document Upload Card]              │
│  Certificate 1                      │
│  [✓ cosmetology_cert.pdf] (1.8 MB)  │
│  [Preview] [Remove]                 │
│                                     │
│ [Document Upload Card]              │
│  Certificate 2                      │
│  [📄 +] Upload                      │
│                                     │
│ [A-01] + Add Another Certificate    │
│                                     │
│ [M-06] Alert (info)                 │
│  💡 Tip: Upload clear, readable     │
│  copies. Blurry documents will be   │
│  rejected.                          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┘
│ [Back] [Continue]                   │
└─────────────────────────────────────┘
```

**Components Used:**
- [M-01] FormField (file upload)
- [M-06] Alert (tips)
- [A-01] Button
- Document preview modal

**User Actions:**
- Upload Documents → Validate size/format
- Tap Preview → Open full-screen view
- Tap Remove → Delete document
- Tap Continue → Validate (min 2 certs), save, navigate to Screen 4.4

**Data Requirements:**
- Upload to Object Storage
- File validation

**Related Stories:** PS-001, R-PROVIDER-001

---

### Screen 4.4: Provider Onboarding - Step 3 (Services)

**Purpose:** Select services and set pricing

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back       [●●●○○] Step 3 of 5  │
│ Services & Pricing                  │
├─────────────────────────────────────┤
│ What services do you offer?         │
├─────────────────────────────────────┤
│ Select Services (Min 1 required)    │
│                                     │
│ [Service Selector - Accordion]      │
│  ▼ Beauty                           │
│     ☑ Gel Nails                     │
│        Base: ฿1,200 | Your price:   │
│        [฿_____] (±30% of base)      │
│                                     │
│     ☑ Hair Styling                  │
│        Base: ฿1,500 | Your price:   │
│        [฿1,500] ✓                   │
│                                     │
│     ☐ Makeup Application            │
│        Base: ฿2,000                 │
│                                     │
│  ▶ Pet Care                         │
│  ▶ Cleaning                         │
│                                     │
│ [M-06] Alert (info)                 │
│  Your pricing must be within ±30%   │
│  of base price. You can adjust      │
│  anytime from your profile.         │
│                                     │
│ Portfolio (Optional but recommended)│
│                                     │
│ Upload photos of your work          │
│  [Photo Upload Grid]                │
│  [+] [+] [+] [+] [+] [+]            │
│  Up to 12 photos, 5MB each          │
│                                     │
│  [Uploaded thumbnails if any]       │
│  [Photo 1] [Photo 2] [Photo 3]      │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Back] [Continue]                   │
└─────────────────────────────────────┘
```

**Components Used:**
- Accordion/expandable list
- [M-01] FormField (price inputs)
- [M-06] Alert
- Photo upload grid
- [A-01] Button

**User Actions:**
- Select Services → Expand category, check services
- Enter Custom Price → Validate range (±30%)
- Upload Portfolio Photos → Preview thumbnails
- Tap Continue → Validate (min 1 service), save, navigate to Screen 4.5

**Data Requirements:**
- Service catalog from Sanity
- Price validation logic

**Related Stories:** PS-001, PS-006, R-PROVIDER-001, R-PROVIDER-003

---

### Screen 4.5: Provider Onboarding - Step 4 (Availability)

**Purpose:** Set initial availability

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back       [●●●●○] Step 4 of 5  │
│ Availability                        │
├─────────────────────────────────────┤
│ When are you available to work?     │
├─────────────────────────────────────┤
│ Recurring Weekly Schedule           │
│                                     │
│ [Day Selector]                      │
│  ☑ Monday     09:00 - 18:00         │
│     [Start ▼] [End ▼]               │
│                                     │
│  ☑ Tuesday    09:00 - 18:00         │
│  ☑ Wednesday  09:00 - 18:00         │
│  ☑ Thursday   09:00 - 18:00         │
│  ☑ Friday     09:00 - 18:00         │
│  ☑ Saturday   10:00 - 16:00         │
│  ☐ Sunday     (Off)                 │
│                                     │
│ [A-01] Copy Schedule to All Days    │
│                                     │
│ [M-06] Alert (info)                 │
│  You can adjust your availability   │
│  anytime from your calendar.        │
│                                     │
│ Google Calendar Sync (Optional)     │
│                                     │
│  Connect your Google Calendar to    │
│  automatically sync busy times.     │
│                                     │
│  [Connect Google Calendar] (button) │
│  [Icon] Connected as {email}        │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Back] [Continue]                   │
└─────────────────────────────────────┘
```

**Components Used:**
- Checkboxes (day selection)
- Time pickers
- [A-01] Button
- [M-06] Alert

**User Actions:**
- Toggle Days → Enable/disable
- Set Times → Validate (start < end)
- Connect Google Calendar → OAuth flow
- Tap Continue → Save schedule, navigate to Screen 4.6

**Data Requirements:**
- Availability slots creation
- Google Calendar OAuth integration

**Related Stories:** PS-001, PS-002, R-CALENDAR-001, R-CALENDAR-002

---

### Screen 4.6: Provider Onboarding - Step 5 (Bank & Review)

**Purpose:** Add payout details and submit for review

**Layout:**
```
┌─────────────────────────────────────┐
│ [<] Back       [●●●●●] Step 5 of 5  │
│ Bank Details & Review               │
├─────────────────────────────────────┤
│ Bank Account for Payouts *          │
│                                     │
│ [M-01] FormField                    │
│  Bank Name *                        │
│  [Dropdown: Bangkok Bank, SCB, ...] │
│                                     │
│ [M-01] FormField                    │
│  Account Number *                   │
│  ___________________________        │
│                                     │
│ [M-01] FormField                    │
│  Account Holder Name *              │
│  ___________________________        │
│  (Must match ID document)           │
│                                     │
│ [M-01] FormField                    │
│  Branch (Optional)                  │
│  ___________________________        │
│                                     │
│ [M-06] Alert (info)                 │
│  💰 Payouts processed weekly on     │
│  Mondays. You'll receive 70% of     │
│  booking value after 25-30%         │
│  platform commission.               │
├─────────────────────────────────────┤
│ Review Your Profile                 │
│ ────────────────────────             │
│ [Expandable Sections]               │
│  ▶ Personal Info ✓                  │
│  ▶ Documents ✓ (ID + 2 certs)       │
│  ▶ Services ✓ (3 selected)          │
│  ▶ Availability ✓ (Mon-Sat)         │
│  ▶ Bank Account ✓                   │
│                                     │
│ [Checkbox] Required                 │
│  ☑ I agree to the Provider Terms    │
│  of Service and understand the      │
│  commission structure.              │
│                                     │
│ [Checkbox] Required                 │
│  ☑ I confirm all information        │
│  provided is accurate.              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Back] [Submit for Review]          │ <- Final CTA
└─────────────────────────────────────┘
```

**Components Used:**
- [M-01] FormField (text, dropdown)
- [M-06] Alert
- Expandable review sections
- [A-01] Button

**User Actions:**
- Fill Bank Details → Validate
- Review Sections → Expand to see summary
- Accept Terms → Required to submit
- Tap Submit → Create provider record, navigate to Screen 4.7

**Data Requirements:**
- Bank validation
- Provider record creation (status: PENDING_APPROVAL)

**Related Stories:** PS-001, R-PROVIDER-001

---

### Screen 4.7: Provider Onboarding - Confirmation

**Purpose:** Confirmation and next steps

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│         ✓ Submitted!                │
│                                     │
│    Your profile is under review     │
├─────────────────────────────────────┤
│ [Icon: Document with checkmark]     │
│                                     │
│ Thank you, {name}!                  │
│                                     │
│ We're reviewing your profile and    │
│ documents. You'll receive an email  │
│ within 24-48 hours.                 │
├─────────────────────────────────────┤
│ What happens next?                  │
│                                     │
│ 1. ✉️ Check your email for updates  │
│ 2. 📱 Download the Veyya app        │
│ 3. 🎓 Complete training (optional)  │
│ 4. ✅ Get approved and start earning│
├─────────────────────────────────────┤
│ [M-06] Alert (info)                 │
│  While you wait, explore our        │
│  Provider Handbook and training     │
│  resources.                         │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [View Provider Handbook]            │
│ [Go to Dashboard]                   │
└─────────────────────────────────────┘
```

**Components Used:**
- Success illustration
- [M-06] Alert
- [A-01] Button

**User Actions:**
- Tap Handbook → Open static content page
- Tap Dashboard → Navigate to provider dashboard (limited access until approved)

**Related Stories:** PS-001, R-PROVIDER-002

---

## Responsive Layout Notes

### Mobile (360px - 414px)
- Single column layouts
- Bottom sheets for filters/modals
- Sticky CTAs at bottom
- Hamburger menu for navigation
- Touch targets min 44x44px
- Horizontal scrolling for cards

### Tablet (640px - 1023px)
- Two-column where appropriate (e.g., filters sidebar + results)
- Modal dialogs instead of bottom sheets
- Expanded navigation (tab bar or sidebar)
- Larger touch targets (48x48px)

### Desktop (1024px+)
- Multi-column layouts (sidebar + content + detail)
- Hover states prominent
- Persistent sidebars
- Inline modals and popovers
- Keyboard shortcuts

---

## Navigation Patterns

### Primary Navigation (Bottom Tab Bar - Mobile)
- Home (🏠)
- Search (🔍)
- Bookings (📅)
- Favorites (♡)
- Profile (👤)

### Secondary Navigation
- Back button (header)
- Breadcrumbs (desktop)
- Deep linking support
- Tab persistence across sessions

---

## State Management Notes

### Loading States
- Skeleton screens for content
- Spinners for actions
- Progress bars for multi-step flows
- Optimistic UI updates where safe

### Error States
- Inline form errors
- Alert banners for page-level errors
- Empty states with recovery actions
- Retry mechanisms

### Success States
- Confirmation screens
- Toast notifications (brief, non-blocking)
- Success animations (celebrate key milestones)

---

## Accessibility Implementation

### Keyboard Navigation
- Tab order follows visual flow
- Focus traps in modals
- Escape key closes modals/sheets
- Enter/Space activates buttons
- Arrow keys for carousels/galleries

### Screen Reader Support
- ARIA landmarks (`main`, `navigation`, `search`)
- ARIA labels for icon buttons
- Live regions for dynamic updates
- Descriptive link text
- Form field associations

### Visual Accessibility
- 4.5:1 contrast ratio (text)
- 3:1 contrast ratio (UI components)
- Focus indicators (2px outline)
- No color-only indicators
- Resizable text support

---

## Design System Reference

All components detailed in: `documents/components/00-inventory.md`

**Atomic Design Hierarchy:**
- **Atoms:** Button, Input, Badge, Avatar, Icon, Skeleton, Spinner, Divider
- **Molecules:** FormField, SearchBar, RatingDisplay, PriceDisplay, Chip, Alert, EmptyState
- **Organisms:** ProviderCard, ProviderProfile, BookingForm, BookingCard, ReviewForm, FilterPanel, NavigationBar, NotificationCard, ProviderEarningsCard, AvailabilityCalendar
- **Templates:** SearchResultsPage, ProviderDetailPage, BookingFlowPage, ProviderOnboardingPage, DashboardPage (Client/Provider)

---

**End of Wireframes Document**
