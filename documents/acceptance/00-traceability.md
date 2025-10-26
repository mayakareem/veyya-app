# Acceptance Traceability Matrix

## Document Information

**Version:** 1.0
**Date:** 2025-10-25
**Purpose:** Map User Stories → FRD Requirements → Components → Test Cases

**Related Documents:**
- User Stories: `documents/user-stories/00-core-stories.md`
- FRD: `documents/frd/00-frd.md`
- Component Inventory: `documents/components/00-inventory.md`
- Wireframes: `documents/design/00-wireframes.md`
- Data Model: `documents/data-model/00-data-model.md`

---

## Overview

This matrix provides full traceability from user stories through implementation to testing. Each row links:
- **User Story ID** → **FRD Requirement(s)** → **UI Components** → **API Endpoints** → **DB Tables** → **Test Cases**

**Test Case Notation:**
- `UT-XXX` - Unit Test
- `IT-XXX` - Integration Test
- `E2E-XXX` - End-to-End Test
- `ACC-XXX` - Acceptance Test

---

## Booker (Client) Stories Traceability

### BS-001: Discover and Filter Service Providers

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | BS-001 | As Amira, I want to search and filter providers by category, rating, distance, availability |
| **FRD Requirements** | R-DISCOVERY-001<br>R-DISCOVERY-002<br>R-DISCOVERY-003 | Service browsing, ranking algorithm, provider profile viewing |
| **Wireframes** | Screen 1.1, 1.2 | Home/Dashboard, Search Results |
| **Components** | [M-02] SearchBar<br>[O-06] FilterPanel<br>[O-01] ProviderCard<br>[M-07] EmptyState | Search input, filters, result cards, no results |
| **API Endpoints** | `GET /services`<br>`GET /providers/search`<br>`GET /providers/:id` | Fetch services, search with filters, get profile |
| **DB Tables** | `services`<br>`providers`<br>`provider_services`<br>`reviews` | Service catalog, provider data, ratings |
| **Test Cases** | `E2E-001`: Complete search flow<br>`IT-001`: Ranking algorithm validation<br>`UT-001`: Distance calculation<br>`UT-002`: Filter state management<br>`ACC-001`: Search results load <1.5s | End-to-end search, integration tests for ranking, unit tests for helpers |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN discovery screen, WHEN select category, THEN see ranked list → `E2E-001`, `IT-001`
2. ✓ GIVEN viewing results, WHEN apply filters, THEN only matching providers shown → `E2E-001`, `IT-002`
3. ✓ GIVEN view provider profile, WHEN tap details, THEN see credentials, portfolio, rating → `E2E-002`
4. ✓ GIVEN English-only filter, WHEN apply, THEN only English-speaking providers → `IT-003`
5. ✓ GIVEN no match, WHEN search empty, THEN suggest alternatives → `E2E-003`

---

### BS-002: Create Booking with Escrow Payment

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | BS-002 | As Praew, I want to book with transparent pricing and secure escrow payment |
| **FRD Requirements** | R-BOOKING-001<br>R-BOOKING-002<br>R-ESCROW-001 | Booking creation, payment processing, escrow |
| **Wireframes** | Screen 2.2-2.7 | Booking flow (5 steps), Confirmation |
| **Components** | [O-03] BookingForm<br>[M-01] FormField<br>[M-04] PriceDisplay<br>[M-06] Alert<br>[A-07] Spinner | Multi-step form, payment UI, loading states |
| **API Endpoints** | `POST /bookings/intents`<br>`POST /payments/intents`<br>`POST /payments/webhook` | Create booking, authorize payment, webhook handler |
| **DB Tables** | `bookings`<br>`transactions`<br>`availability_slots` | Booking record, payment tracking, slot locking |
| **Test Cases** | `E2E-010`: Complete booking flow<br>`IT-010`: Payment intent creation<br>`IT-011`: Escrow status transitions<br>`UT-010`: Slot conflict detection<br>`UT-011`: Price calculation<br>`ACC-010`: Booking <3 min (PRD KPI) | Full flow, payment integration, conflict handling |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN select provider/service, WHEN choose slot, THEN see pricing summary → `E2E-010`
2. ✓ GIVEN payment screen, WHEN review, THEN see escrow messaging → `E2E-010`, `ACC-011`
3. ✓ GIVEN submit payment, WHEN authorize, THEN funds HELD in escrow → `IT-010`, `IT-011`
4. ✓ GIVEN payment success, WHEN booking created, THEN status PENDING_PROVIDER, provider notified → `IT-012`
5. ✓ GIVEN payment failure, WHEN return, THEN clear error, retry option → `E2E-011`, `IT-013`

---

### BS-003: Receive Booking Confirmation and Track Status

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | BS-003 | As Rania, I want real-time confirmation and status tracking |
| **FRD Requirements** | R-BOOKING-003<br>R-BOOKING-004<br>R-BOOKING-005<br>R-NOTIF-001 | Provider notification, accept/reject, status tracking, notifications |
| **Wireframes** | Screen 3.1, 3.2 | Booking List, Booking Detail |
| **Components** | [O-04] BookingCard<br>[A-03] Badge<br>[O-08] NotificationCard<br>[M-06] Alert | Status display, notifications, alerts |
| **API Endpoints** | `GET /bookings`<br>`GET /bookings/:id`<br>`POST /bookings/:id/accept`<br>`POST /bookings/:id/reject` | List bookings, get details, provider actions |
| **DB Tables** | `bookings`<br>`notifications` | Booking status, notification log |
| **Test Cases** | `E2E-020`: Provider accepts booking<br>`E2E-021`: Provider rejects booking<br>`E2E-022`: Timeout reassignment<br>`IT-020`: Notification delivery<br>`UT-020`: Status transition validation<br>`ACC-020`: Notification <30s (NFR) | Status flows, real-time updates |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN PENDING_PROVIDER, WHEN accept <30 min, THEN notification, status CONFIRMED → `E2E-020`, `IT-020`
2. ✓ GIVEN CONFIRMED, WHEN view details, THEN see contact, address, calendar add → `E2E-023`
3. ✓ GIVEN reject, WHEN occurs, THEN notification, un-hold funds, suggest alternatives → `E2E-021`
4. ✓ GIVEN no response 30 min, WHEN timeout, THEN notification, reassign option → `E2E-022`
5. ✓ GIVEN CONFIRMED, WHEN <24h, THEN reminder notification → `IT-021`

---

### BS-004: Rebook Favorite Provider Quickly

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | BS-004 | As Amira, I want to save favorites and rebook in <30 seconds |
| **FRD Requirements** | R-AUTH-003 (favorites)<br>R-BOOKING-001 (rebooking) | Profile management, booking creation |
| **Wireframes** | Screen 1.1 (Favorites section) | Dashboard with favorite providers |
| **Components** | [O-01] ProviderCard<br>[A-01] Button<br>[M-07] EmptyState | Favorite list, quick actions |
| **API Endpoints** | `POST /favorites`<br>`DELETE /favorites/:id`<br>`GET /favorites`<br>`POST /bookings/quick` | Manage favorites, quick rebook |
| **DB Tables** | `favorites`<br>`bookings` | Favorite providers, booking history |
| **Test Cases** | `E2E-030`: Add to favorites<br>`E2E-031`: Quick rebook flow<br>`UT-030`: Pre-populate booking data<br>`ACC-030`: Rebook <30s (NFR) | Favorites management, speed test |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN completed booking 4-5 stars, WHEN review, THEN "Add to Favorites" option → `E2E-030`
2. ✓ GIVEN favorites list, WHEN navigate, THEN see provider, last service, next slot, rebook button → `E2E-031`
3. ✓ GIVEN tap rebook, WHEN taken to flow, THEN pre-populated details → `E2E-031`, `UT-030`
4. ✓ GIVEN rebooking, WHEN "Book with Same Details", THEN created <30s → `ACC-030`
5. ✓ GIVEN favorite available, WHEN open slots in range, THEN proactive notification → `IT-030`

---

### BS-005: Rate and Review Service Provider

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | BS-005 | As Praew, I want to rate and review with photos |
| **FRD Requirements** | R-REVIEW-001<br>R-REVIEW-002<br>R-ESCROW-001 | Review submission, moderation, transaction release |
| **Wireframes** | Screen 3.3 | Leave Review |
| **Components** | [O-05] ReviewForm<br>[M-03] RatingDisplay<br>[M-01] FormField | Review interface, star selector, photo upload |
| **API Endpoints** | `POST /reviews`<br>`PATCH /reviews/:id/moderate` | Submit review, admin moderation |
| **DB Tables** | `reviews`<br>`transactions`<br>`providers` | Review storage, transaction update, rating recalc |
| **Test Cases** | `E2E-040`: Submit review with photos<br>`E2E-041`: Review moderation flow<br>`IT-040`: Weighted rating calculation<br>`IT-041`: Transaction status update HELD→READY<br>`UT-040`: Photo EXIF stripping<br>`ACC-040`: Review submission <2s | Review flow, calculations, privacy |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN status COMPLETED, WHEN open app <2h, THEN review prompt → `E2E-040`, `IT-042`
2. ✓ GIVEN leaving review, WHEN submit rating+comment, THEN enters moderation, rating recalculated → `IT-040`, `IT-043`
3. ✓ GIVEN leaving review, WHEN attach photos, THEN upload max 3, 5MB each → `E2E-040`, `UT-040`
4. ✓ GIVEN leave review OR +24h, WHEN window closes, THEN transaction HELD→READY → `IT-041`
5. ✓ GIVEN viewing provider, WHEN read reviews, THEN see distribution, text, photos, response → `E2E-041`

---

### BS-006: Manage Multi-Service Household Needs

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | BS-006 | As Rania, I want to book multiple categories with saved household notes |
| **FRD Requirements** | R-AUTH-003<br>R-BOOKING-001 | Profile management, booking creation |
| **Wireframes** | Screen 2.4 (Location with household notes) | Booking flow location step |
| **Components** | [M-01] FormField<br>[O-03] BookingForm | Household notes, multi-category support |
| **API Endpoints** | `PATCH /users/:id/household-notes`<br>`GET /bookings` (multi-category) | Save notes, fetch bookings |
| **DB Tables** | `users`<br>`bookings` | User preferences, booking records |
| **Test Cases** | `E2E-050`: Save and reuse household notes<br>`E2E-051`: Book services across categories<br>`UT-050`: Note encryption<br>`ACC-050`: Dashboard load <2s with multi-category bookings | Multi-service flows, performance |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN booking, WHEN enter location, THEN save household notes (persist across bookings) → `E2E-050`
2. ✓ GIVEN browsing, WHEN filter "Family-Friendly", THEN only providers with kid/pet experience → `IT-050`
3. ✓ GIVEN upcoming bookings, WHEN view dashboard, THEN all services unified, color-coded → `E2E-051`, `ACC-050`
4. ✓ GIVEN multiple bookings, WHEN provider arrives/completes, THEN notifications grouped → `IT-051`
5. ✓ GIVEN recurring services, WHEN set up monthly, THEN auto-create, send confirmation 7 days prior → `E2E-052`

---

### BS-007: Cancel or Reschedule Booking

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | BS-007 | As Amira, I want to cancel/reschedule with clear policy |
| **FRD Requirements** | R-BOOKING-006 | Cancellation and rescheduling |
| **Wireframes** | Screen 3.2 (Booking Detail with actions) | Detail screen with cancel/reschedule buttons |
| **Components** | [O-04] BookingCard<br>[A-01] Button<br>[M-06] Alert | Booking actions, policy display, confirmation |
| **API Endpoints** | `POST /bookings/:id/cancel`<br>`PATCH /bookings/:id/reschedule` | Cancel, reschedule operations |
| **DB Tables** | `bookings`<br>`transactions` | Status update, refund processing |
| **Test Cases** | `E2E-060`: Cancel ≥12h (free)<br>`E2E-061`: Cancel <12h (50% fee)<br>`E2E-062`: Reschedule successful<br>`IT-060`: Refund processing<br>`UT-060`: Policy calculation<br>`ACC-060`: Cancel/reschedule <5s | Cancellation flows, refund logic |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN CONFIRMED, WHEN view details, THEN see policy: "Free ≥12h, <12h = 50% fee" → `E2E-060`
2. ✓ GIVEN cancel ≥12h, WHEN confirmed, THEN status CANCELLED, full refund 3-5 days, provider notified → `E2E-060`, `IT-060`
3. ✓ GIVEN cancel <12h, WHEN confirmed, THEN 50% to provider, 50% refunded, clear breakdown → `E2E-061`, `IT-061`
4. ✓ GIVEN reschedule, WHEN select "Change Time", THEN see available slots next 14 days, select without re-pay (if >12h) → `E2E-062`
5. ✓ GIVEN reschedule success, WHEN new time confirmed, THEN original booking updated, provider notified, confirmation → `E2E-062`

---

## Provider Stories Traceability

### PS-001: Complete Onboarding and KYC Verification

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | PS-001 | As Nok, I want streamlined onboarding with KYC verification |
| **FRD Requirements** | R-PROVIDER-001<br>R-PROVIDER-002 | Provider registration, KYC, admin approval |
| **Wireframes** | Screen 4.1-4.7 | Onboarding flow (5 steps), Confirmation |
| **Components** | [M-01] FormField<br>[A-04] Avatar<br>[A-01] Button<br>[M-06] Alert | Multi-step form, document upload, progress |
| **API Endpoints** | `POST /providers`<br>`POST /providers/:id/documents`<br>`PATCH /providers/:id/approve` | Create provider, upload docs, admin approve |
| **DB Tables** | `providers`<br>`users`<br>`audit_logs` | Provider profile, user link, approval log |
| **Test Cases** | `E2E-100`: Complete onboarding flow<br>`E2E-101`: Admin KYC review<br>`IT-100`: Document upload to S3<br>`IT-101`: Status transitions<br>`UT-100`: Document validation<br>`ACC-100`: Approval within 24-48h | Onboarding, admin workflow, SLA |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN new provider, WHEN start, THEN complete: profile, ID, certs (min 2), bank details → `E2E-100`
2. ✓ GIVEN submit docs, WHEN complete, THEN status PENDING_APPROVAL, confirmation, timeline 24-48h → `E2E-100`, `ACC-100`
3. ✓ GIVEN admin reviews, WHEN approved, THEN status APPROVED, welcome notification, profile visible → `E2E-101`, `IT-101`
4. ✓ GIVEN admin rejects, WHEN occurs, THEN notification with reason_code, can resubmit → `E2E-101`
5. ✓ GIVEN APPROVED, WHEN complete optional tasks, THEN progress tracker, "Veyya Verified" badge at 100% → `IT-102`

---

### PS-002: Set Availability and Sync Calendar

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | PS-002 | As Nok, I want manual availability and Google Calendar sync |
| **FRD Requirements** | R-CALENDAR-001<br>R-CALENDAR-002<br>R-CALENDAR-003 | Manual slots, Google OAuth, conflict prevention |
| **Wireframes** | Screen 4.5 (Availability setup) | Onboarding availability, ongoing calendar management |
| **Components** | [O-10] AvailabilityCalendar<br>[A-01] Button<br>[M-06] Alert | Calendar interface, Google sync toggle |
| **API Endpoints** | `POST /availability-slots`<br>`GET /calendar/google/auth`<br>`POST /calendar/google/sync` | Create slots, OAuth flow, sync |
| **DB Tables** | `availability_slots`<br>`bookings` | Slot records, booking conflicts |
| **Test Cases** | `E2E-110`: Create recurring availability<br>`E2E-111`: Connect Google Calendar<br>`E2E-112`: Sync busy times<br>`IT-110`: OAuth flow<br>`IT-111`: Conflict detection (atomic)<br>`UT-110`: Overlap prevention<br>`ACC-110`: Availability check <200ms | Calendar management, sync, performance |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN setting availability, WHEN use manager, THEN create recurring weekly slots, block dates/times → `E2E-110`
2. ✓ GIVEN connect Google OAuth, WHEN authorize, THEN pull busy times every 15 min, mark unavailable → `E2E-111`, `IT-110`, `IT-111`
3. ✓ GIVEN customer books, WHEN status CONFIRMED, THEN push event to Google Calendar with details → `IT-112`
4. ✓ GIVEN overlapping availability, WHEN slot booked, THEN immediately unavailable, prevent duplicates (atomic) → `IT-111`, `ACC-110`
5. ✓ GIVEN cancel availability, WHEN delete/modify slot, THEN existing CONFIRMED bookings NOT affected → `UT-111`

---

### PS-003: Accept or Reject Booking Requests

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | PS-003 | As Nok, I want to receive notifications and respond within time limit |
| **FRD Requirements** | R-BOOKING-003<br>R-BOOKING-004 | Booking request notification, accept/reject actions |
| **Wireframes** | Provider Dashboard (pending requests with countdown) | Dashboard with request cards |
| **Components** | [O-04] BookingCard<br>[A-01] Button<br>[A-03] Badge<br>[M-06] Alert | Request cards, countdown timer, status |
| **API Endpoints** | `GET /bookings?status=pending_provider`<br>`POST /bookings/:id/accept`<br>`POST /bookings/:id/reject` | List pending, accept, reject |
| **DB Tables** | `bookings`<br>`providers` | Booking record, response rate update |
| **Test Cases** | `E2E-120`: Accept booking request<br>`E2E-121`: Reject with reason<br>`E2E-122`: Timeout scenario<br>`IT-120`: Response rate calculation<br>`UT-120`: Countdown timer accuracy<br>`ACC-120`: Accept/reject <1s processing | Request handling, metrics |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN customer books, WHEN intent created PENDING_PROVIDER, THEN notification <30s with details, 30-min countdown → `IT-120`, `ACC-120`
2. ✓ GIVEN view request, WHEN review, THEN see: service, time, location, customer rating, gross/net amounts, countdown → `E2E-120`
3. ✓ GIVEN accept, WHEN tap "Accept" + optional note, THEN status CONFIRMED, customer notified, payment HELD, calendar event → `E2E-120`
4. ✓ GIVEN reject, WHEN tap "Reject" + reason_code, THEN status REJECTED, customer notified, can suggest alternatives → `E2E-121`
5. ✓ GIVEN no response 30 min, WHEN timeout, THEN booking reassigned, response_rate decreases, reminder notification → `E2E-122`, `IT-121`

---

### PS-004: Complete Service and Submit Proof

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | PS-004 | As Somchai, I want to mark complete with optional proof photos |
| **FRD Requirements** | R-ESCROW-001 | Service completion, transaction update |
| **Wireframes** | Booking Detail (provider view with complete button) | Provider booking detail screen |
| **Components** | [M-01] FormField<br>[A-01] Button | Completion form, photo upload |
| **API Endpoints** | `POST /bookings/:id/complete` | Mark booking complete with proof |
| **DB Tables** | `bookings`<br>`transactions` | Status update, transaction transition |
| **Test Cases** | `E2E-130`: Complete service with photos<br>`IT-130`: Transaction HELD→READY timing<br>`UT-130`: EXIF metadata stripping<br>`ACC-130`: Completion <2s processing | Completion flow, privacy, performance |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN CONFIRMED booking, service time arrived, WHEN start, THEN tap "Service in Progress" (optional), notify customer → `E2E-130`
2. ✓ GIVEN finish service, WHEN tap "Mark Complete", THEN add note (optional), upload photos (max 3) → `E2E-130`
3. ✓ GIVEN submit completion, WHEN confirmed, THEN status COMPLETED, customer notified to review, transaction READY (after review or +24h) → `IT-130`, `IT-131`
4. ✓ GIVEN submit photos, WHEN customer reviews, THEN photos in portfolio (with customer consent) → `E2E-131`
5. ✓ GIVEN customer doesn't review 24h, WHEN auto-release window closes, THEN transaction READY_FOR_PAYOUT without review → `IT-132`

---

### PS-005: Track Earnings and View Payout Schedule

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | PS-005 | As Nok, I want real-time earnings dashboard and payout visibility |
| **FRD Requirements** | R-ESCROW-003<br>R-ESCROW-004 | Weekly payout batch, earnings dashboard |
| **Wireframes** | Provider Dashboard with Earnings Card, Earnings Detail | Dashboard and detail views |
| **Components** | [O-09] ProviderEarningsCard<br>[M-04] PriceDisplay<br>[A-01] Button | Earnings display, breakdown, export |
| **API Endpoints** | `GET /providers/:id/earnings`<br>`GET /payouts/batches`<br>`GET /payout-items/:id` | Get earnings, batch history, item details |
| **DB Tables** | `transactions`<br>`payout_batches`<br>`payout_items` | Transaction tracking, payout records |
| **Test Cases** | `E2E-140`: View earnings breakdown<br>`E2E-141`: Payout batch processing<br>`IT-140`: Earnings calculation accuracy<br>`IT-141`: Batch creation and transfer<br>`UT-140`: Commission and tax calculation<br>`ACC-140`: Dashboard load <1.5s | Earnings display, payout automation |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN active bookings, WHEN view wallet, THEN see: Pending (in-progress), Ready (awaiting batch), Paid (transferred) → `E2E-140`, `ACC-140`
2. ✓ GIVEN tap Ready earnings, WHEN view breakdown, THEN per-booking: ID, date, customer, gross, commission, tax, net, status → `E2E-140`
3. ✓ GIVEN weekly batch runs, WHEN earnings included, THEN notification with amount, deposit date (2-3 days), batch ID, CSV → `E2E-141`, `IT-141`
4. ✓ GIVEN want schedule info, WHEN view wallet, THEN see: "Payouts process every Monday for services completed through previous Sunday. Funds arrive in 2-3 business days." → `E2E-140`
5. ✓ GIVEN booking under dispute, WHEN view wallet, THEN disputed amount marked "On Hold - Dispute #ID", excluded from available, link to details → `E2E-142`

---

### PS-006: Build and Manage Professional Profile

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | PS-006 | As Nok, I want compelling profile with portfolio and service descriptions |
| **FRD Requirements** | R-PROVIDER-003 | Provider profile customization |
| **Wireframes** | Provider Profile Edit | Profile management interface |
| **Components** | [M-01] FormField<br>[A-04] Avatar<br>[A-03] Badge | Profile editor, photo upload, badges |
| **API Endpoints** | `PATCH /providers/:id`<br>`POST /providers/:id/portfolio` | Update profile, manage portfolio |
| **DB Tables** | `providers`<br>`provider_services` | Profile data, services |
| **Test Cases** | `E2E-150`: Edit profile and portfolio<br>`IT-150`: Profile analytics tracking<br>`UT-150`: Price override validation<br>`ACC-150`: Profile save <2s, images <1s load (CDN) | Profile management, performance |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN editing profile, WHEN add portfolio, THEN upload 12 images max with captions (200 chars) organized by service → `E2E-150`
2. ✓ GIVEN offer services, WHEN set pricing, THEN override base (within ±30%), add Thai/English descriptions → `E2E-150`, `UT-150`
3. ✓ GIVEN showcase expertise, WHEN add certifications, THEN upload with issue date/institution, "Verified Credentials" badges → `E2E-150`
4. ✓ GIVEN customers view profile, WHEN see stats, THEN: average rating (weighted), total bookings, response rate, on-time rate, languages, radius, "Veyya Verified" badge → `E2E-151`
5. ✓ GIVEN improve visibility, WHEN view analytics, THEN: profile views, booking conversion, top services, recommendations → `IT-150`

---

### PS-007: Optimize Route with Clustered Bookings

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | PS-007 | As Somchai, I want bookings organized by geography for efficient routing |
| **FRD Requirements** | R-DISCOVERY-002 (distance calculations) | Provider search ranking, distance matrix |
| **Wireframes** | Provider Bookings with Map View | Route optimization interface |
| **Components** | Map component<br>[O-04] BookingCard<br>[A-01] Button | Interactive map, booking list, export |
| **API Endpoints** | `GET /bookings?date=today&sort=route`<br>`GET /bookings/:id/route-optimize` | Fetch bookings, optimize route |
| **DB Tables** | `bookings` | Booking locations (lat/lng) |
| **Test Cases** | `E2E-160`: View optimized route<br>`IT-160`: Route calculation<br>`UT-160`: Distance matrix accuracy<br>`ACC-160`: Route optimization <3s | Route display, calculation speed |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN multiple bookings, WHEN view "Today's Route", THEN see bookings on map with pins color-coded by time, route optimization suggested → `E2E-160`
2. ✓ GIVEN reviewing requests, WHEN view new request, THEN proximity to existing bookings shown (e.g., "2 other bookings within 3km today") → `E2E-161`
3. ✓ GIVEN plan day, WHEN view route summary, THEN: total distance, travel time, suggested order, export to Google Maps → `E2E-160`, `ACC-160`
4. ✓ GIVEN prefer clustering, WHEN ranking requests, THEN requests within service area on active days prioritized → `IT-161`
5. ✓ GIVEN complete booking, WHEN mark complete, THEN route updates, suggest optimal next destination → `E2E-162`

---

### PS-008: Handle Disputes and Customer Issues

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | PS-008 | As Nok, I want to respond to disputes through fair resolution |
| **FRD Requirements** | R-ADMIN-004 | Dispute resolution dashboard and workflow |
| **Wireframes** | Dispute Detail (provider view) | Dispute response interface |
| **Components** | [M-01] FormField<br>[A-01] Button<br>[M-06] Alert | Response form, evidence upload, status display |
| **API Endpoints** | `GET /disputes/:id`<br>`POST /disputes/:id/respond`<br>`PATCH /disputes/:id/resolve` | View dispute, submit response, admin resolve |
| **DB Tables** | `bookings`<br>`transactions`<br>`audit_logs` | Dispute flag, payment hold, audit trail |
| **Test Cases** | `E2E-170`: Provider responds to dispute<br>`E2E-171`: Admin resolves dispute<br>`IT-170`: Disputed amount exclusion from payout<br>`UT-170`: Dispute rate tracking<br>`ACC-170`: Resolution <7 business days | Dispute flows, SLA, fairness |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN customer opens dispute, WHEN notified, THEN alert <1h with details (booking ID, complaint, disputed amount), 48h response deadline → `E2E-170`, `ACC-171`
2. ✓ GIVEN responding to dispute, WHEN submit response, THEN provide: explanation (1000 chars), evidence (photos), request admin mediation → `E2E-170`
3. ✓ GIVEN dispute under review, WHEN admin reviews, THEN disputed amount "HELD", excluded from weekly payout until resolution → `IT-170`
4. ✓ GIVEN admin resolves in favor, WHEN confirmed, THEN full amount moves READY_FOR_PAYOUT, customer notified, resolution note → `E2E-171`
5. ✓ GIVEN admin resolves against, WHEN confirmed, THEN disputed amount refunded, detailed explanation, booking dispute flag → `E2E-171`, `ACC-170`

---

## Cross-Cutting Stories Traceability

### CS-001: Switch Between Client and Provider Roles

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | CS-001 | As Nok (dual role), I want seamless role switching |
| **FRD Requirements** | R-AUTH-002 | Role management and switching |
| **Wireframes** | Navigation Bar with role switcher | Global navigation component |
| **Components** | [O-07] NavigationBar<br>[A-01] Button | Role toggle, context-aware UI |
| **API Endpoints** | `POST /auth/switch-role` | Update active role in session |
| **DB Tables** | `users`<br>`providers`<br>`sessions` | User roles, provider profile, session tokens |
| **Test Cases** | `E2E-180`: Switch from client to provider<br>`E2E-181`: Switch from provider to client<br>`UT-180`: JWT role claims validation<br>`ACC-180`: Role switch <500ms | Role switching, performance |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN both profiles, WHEN log in, THEN see role switcher in header/menu → `E2E-180`
2. ✓ GIVEN in client mode, WHEN switch to provider, THEN see provider dashboard with earnings, bookings, profile management → `E2E-180`
3. ✓ GIVEN in provider mode, WHEN switch to client, THEN see client home with discovery, my bookings → `E2E-181`
4. ✓ GIVEN switch roles, WHEN context changes, THEN notifications, menu items, actions update appropriately without re-login → `E2E-180`, `ACC-180`
5. ✓ GIVEN notifications in both roles, WHEN view center, THEN notifications grouped by role with clear visual distinction → `E2E-182`

---

### CS-002: Receive Localized Notifications via Preferred Channel

| Aspect | Reference | Details |
|--------|-----------|---------|
| **User Story** | CS-002 | As Praew (Thai Local), I want notifications in Thai via LINE/SMS |
| **FRD Requirements** | R-NOTIF-001<br>R-NOTIF-002<br>R-NOTIF-003 | Multi-channel notifications, preferences, WhatsApp/LINE integration |
| **Wireframes** | Notification Center, Settings | In-app notifications, preferences |
| **Components** | [O-08] NotificationCard<br>[M-01] FormField (preferences) | Notification display, settings |
| **API Endpoints** | `GET /notifications`<br>`PATCH /users/:id/notification-preferences` | Fetch notifications, update preferences |
| **DB Tables** | `users`<br>`notifications` | User preferences, notification log |
| **Test Cases** | `E2E-190`: Receive notification via LINE<br>`E2E-191`: Update notification preferences<br>`IT-190`: Multi-channel delivery<br>`IT-191`: Localization validation<br>`UT-190`: Thai date formatting<br>`ACC-190`: Delivery <30s, 99% success rate | Notification delivery, localization |

**Acceptance Criteria Mapping:**
1. ✓ GIVEN setting preferences, WHEN configure, THEN select: language (Thai/English), channels (push/LINE/SMS/email), types (bookings/promotions/reminders) → `E2E-191`
2. ✓ GIVEN selected Thai, WHEN receive notifications, THEN all content (titles, bodies, CTAs) in Thai with proper formatting (date format, politeness particles) → `IT-191`, `UT-190`
3. ✓ GIVEN enabled LINE, WHEN booking status changes, THEN notification via LINE Official Account with rich card, action buttons → `E2E-190`, `IT-190`
4. ✓ GIVEN multiple channels enabled, WHEN critical updates (confirmed, starting soon), THEN notification via all enabled channels → `IT-192`
5. ✓ GIVEN adjust preferences, WHEN changes saved, THEN take effect immediately, confirmation via selected channel → `E2E-191`, `ACC-191`

---

## Test Coverage Summary

### Test Type Distribution
- **E2E Tests:** 50+ scenarios (full user flows)
- **Integration Tests:** 40+ scenarios (API + service integrations)
- **Unit Tests:** 30+ scenarios (business logic, utilities)
- **Acceptance Tests:** 20+ scenarios (NFR validation: performance, SLA)

### Coverage by Module
| Module | User Stories | FRD Reqs | Components | Test Cases |
|--------|--------------|----------|------------|------------|
| Auth & Profiles | CS-001 | 3 | 5 | 8 |
| Provider Onboarding | PS-001 | 3 | 8 | 12 |
| Discovery & Booking | BS-001, BS-002, BS-003, BS-007 | 6 | 15 | 30 |
| Escrow & Payout | BS-002, PS-004, PS-005 | 4 | 8 | 18 |
| Ratings & Reviews | BS-005 | 3 | 6 | 10 |
| Calendar & Availability | PS-002, PS-007 | 3 | 4 | 12 |
| Admin Dashboard | PS-008 | 6 | 6 | 8 |
| Notifications | CS-002 | 3 | 4 | 10 |

### Priority Test Cases (Must Pass for MVP Launch)

**P0 - Critical Path:**
- `E2E-001`: Search and filter providers
- `E2E-010`: Complete booking flow with payment
- `E2E-020`: Provider accepts booking
- `E2E-040`: Submit review
- `E2E-100`: Provider onboarding
- `E2E-120`: Accept booking request
- `E2E-130`: Complete service
- `E2E-140`: View earnings

**P0 - NFR Validation:**
- `ACC-010`: Booking <3 min (PRD KPI)
- `ACC-020`: Notification <30s
- `ACC-100`: KYC approval 24-48h
- `ACC-110`: Availability check <200ms
- `ACC-140`: Dashboard load <1.5s
- `ACC-160`: Route optimization <3s
- `ACC-170`: Dispute resolution <7 days
- `ACC-180`: Role switch <500ms
- `ACC-190`: Notification delivery 99% success

---

## Test Environment Requirements

### Test Data
- **Users:** 100 test accounts (50 clients, 30 providers, 20 admins)
- **Bookings:** 500 test bookings across all statuses
- **Reviews:** 200 test reviews (various ratings)
- **Services:** Full service catalog synced from Sanity (staging)
- **Transactions:** Mix of HELD, READY, RELEASED states
- **Availability:** Provider schedules with varying patterns

### External Dependencies
- **Stripe:** Test mode with test card numbers
- **Omise:** Sandbox environment for Thai payments
- **Mapbox:** Test API tokens
- **Google Calendar:** Test OAuth credentials
- **Firebase/Twilio:** Test accounts for notifications
- **Sanity:** Staging dataset for CMS

### Performance Baselines
- API p95: <300ms (measured via New Relic/Datadog)
- Page load: <2s on 4G (Chrome DevTools throttling)
- Database queries: <100ms for simple, <500ms for complex
- Notification delivery: <30s (measured via webhook timestamps)

---

## Continuous Integration

### Pipeline Stages
1. **Lint & Format:** ESLint, Prettier
2. **Unit Tests:** Jest (80% coverage minimum)
3. **Integration Tests:** Supertest for APIs
4. **E2E Tests:** Playwright (critical paths only in CI)
5. **Accessibility:** axe-core, Pa11y
6. **Performance:** Lighthouse CI (scores >90)
7. **Security:** Snyk, npm audit

### Deployment Gates
- All P0 test cases passing
- No critical/high security vulnerabilities
- Accessibility score WCAG AA
- Performance budgets met
- Code coverage ≥80%

---

## Issue Tracking

### Bug Template
```
**Test Case:** E2E-XXX
**User Story:** BS-XXX
**FRD Requirement:** R-XXX
**Component:** [O-XX] Component Name
**Severity:** Critical/High/Medium/Low
**Steps to Reproduce:** ...
**Expected:** ...
**Actual:** ...
**Screenshots/Logs:** ...
```

### Defect Severity
- **Critical:** Blocker, no workaround (e.g., payment fails)
- **High:** Major functionality broken, workaround exists
- **Medium:** Feature partially works, impacts UX
- **Low:** Minor issue, cosmetic

---

**End of Traceability Matrix**
