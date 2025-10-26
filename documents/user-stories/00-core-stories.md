# Core User Stories

## Overview
This document contains detailed user stories for Veyya's MVP, derived from persona research and jobs-to-be-done analysis. Each story includes acceptance criteria and non-functional requirements aligned with platform KPIs and technical constraints.

**Related Documents:**
- Personas: `documents/personas/00-personas.md`
- FRD: `documents/frd/00-frd.md`
- Data Model: `documents/data-model/00-data-model.md`
- Component Inventory: `documents/components/00-inventory.md`
- Wireframes: `documents/design/00-wireframes.md`
- Traceability Matrix: `documents/acceptance/00-traceability.md`

---

## Booker (Client) User Stories

### BS-001: Discover and Filter Service Providers

**As** Amira (Expat Professional), **I want to** search and filter service providers by category, rating, distance, and availability **so that** I can quickly find verified, high-quality professionals who match my needs and schedule.

**Acceptance Criteria:**
1. GIVEN I am on the discovery screen, WHEN I select a service category (e.g., "Gel Nails"), THEN I see a ranked list of providers based on the algorithm: distance (40%) + rating (40%) + response_rate (20%)
2. GIVEN I am viewing provider results, WHEN I apply filters for "Rating 4.5+", "Within 5km", and "Available Tomorrow", THEN only providers matching all criteria are displayed
3. GIVEN I am viewing a provider profile, WHEN I tap to view details, THEN I see: verified credentials badge, portfolio photos, average rating with review count, response rate %, accepted services, pricing, and availability calendar
4. GIVEN I am viewing provider results, WHEN I select "English-speaking only" filter, THEN only providers with English language capability are displayed
5. GIVEN no providers match my filters, WHEN the search returns empty, THEN I see suggested alternatives with relaxed criteria

**Non-Functional Requirements:**
- **Performance**: Search results must load within 1.5 seconds on 4G connection (API <300ms p95)
- **Localization**: All service descriptions, filters, and provider information must support English and Thai with currency display in THB

**Priority:** P0 (MVP Critical)
**Related Personas:** Amira, Rania, Praew
**Module:** Discovery & Booking (Module 3)
**FRD Requirements:** R-DISCOVERY-001, R-DISCOVERY-002, R-DISCOVERY-003
**Components:** [M-02] SearchBar, [O-06] FilterPanel, [O-01] ProviderCard, [M-07] EmptyState
**Data Tables:** `services`, `providers`, `provider_services`, `reviews`
**Wireframes:** Screen 1.1 (Home/Dashboard), Screen 1.2 (Search Results)

---

### BS-002: Create Booking with Escrow Payment

**As** Praew (Young Local Professional), **I want to** book a service with transparent pricing and secure payment that is held until service completion **so that** I feel safe paying in advance and have recourse if service quality is poor.

**Acceptance Criteria:**
1. GIVEN I have selected a provider and service, WHEN I choose a time slot, THEN I see: service name, duration, base price, any add-ons, total price (in minor units), estimated start/end times, and provider's cancellation policy
2. GIVEN I am on the payment screen, WHEN I review the booking summary, THEN I see clear messaging: "Payment is held securely and only released after service completion and your review (or 24 hours)"
3. GIVEN I submit payment, WHEN the payment intent is created, THEN funds are authorized via Stripe/Omise and held in escrow with status HELD
4. GIVEN payment authorization succeeds, WHEN the booking is created, THEN booking status is PENDING_PROVIDER and provider receives notification within 30 seconds
5. GIVEN payment authorization fails, WHEN I am returned to the payment screen, THEN I see a clear error message (PAYMENT_REQUIRED) with option to retry or change payment method

**Non-Functional Requirements:**
- **Security**: Payment must use HTTPS with JWT authentication; all transactions encrypted at rest
- **Reliability**: Payment processing must support idempotency keys to prevent duplicate charges; 99.5% uptime SLA

**Priority:** P0 (MVP Critical)
**Related Personas:** Praew, Amira
**Module:** Discovery & Booking, Escrow & Payout (Modules 3, 4)
**FRD Requirements:** R-BOOKING-001, R-BOOKING-002, R-ESCROW-001
**Components:** [O-03] BookingForm, [M-01] FormField, [M-04] PriceDisplay, [M-06] Alert, [A-07] Spinner
**Data Tables:** `bookings`, `transactions`, `availability_slots`
**Wireframes:** Screens 2.2-2.7 (Booking Flow 5 steps, Confirmation)
**API Endpoints:** POST /bookings/intents, POST /payments/intents

---

### BS-003: Receive Booking Confirmation and Track Status

**As** Rania (Busy Parent), **I want to** receive immediate confirmation when my booking is accepted and track the provider's status in real-time **so that** I can coordinate household schedules and reduce anxiety about service fulfillment.

**Acceptance Criteria:**
1. GIVEN my booking is in PENDING_PROVIDER status, WHEN the provider accepts within 30 minutes, THEN I receive push notification and in-app alert with status change to CONFIRMED
2. GIVEN my booking is CONFIRMED, WHEN I view booking details, THEN I see: provider contact button (WhatsApp/LINE), service address, start time with calendar add option, provider photo/name, and cancellation policy
3. GIVEN the provider rejects my booking, WHEN rejection occurs, THEN I receive notification with reason_code and message, funds are un-held, and I see alternative provider suggestions
4. GIVEN the provider doesn't respond within 30 minutes, WHEN acceptance timeout occurs, THEN I receive notification that booking is being reassigned and can see alternative providers
5. GIVEN my booking is CONFIRMED, WHEN the service date is within 24 hours, THEN I receive reminder notification with provider details and option to contact or reschedule

**Non-Functional Requirements:**
- **Performance**: Notifications must be delivered within 30 seconds of status change via Firebase/Twilio
- **Availability**: Real-time status tracking must maintain 99.5% uptime during business hours

**Priority:** P0 (MVP Critical)
**Related Personas:** Rania, Amira
**Module:** Discovery & Booking, Notifications (Modules 3, 7)
**FRD Requirements:** R-BOOKING-003, R-BOOKING-004, R-BOOKING-005, R-NOTIF-001
**Components:** [O-04] BookingCard, [A-03] Badge, [O-08] NotificationCard, [M-06] Alert
**Data Tables:** `bookings`, `notifications`
**Wireframes:** Screen 3.1 (Booking List), Screen 3.2 (Booking Detail)
**API Endpoints:** GET /bookings, GET /bookings/:id, POST /bookings/:id/accept, POST /bookings/:id/reject

---

### BS-004: Rebook Favorite Provider Quickly

**As** Amira (Expat Professional), **I want to** save my favorite providers and rebook them in under 30 seconds **so that** I can maintain relationships with trusted professionals and minimize time spent on rebooking routine services.

**Acceptance Criteria:**
1. GIVEN I have completed a booking, WHEN I rate the provider 4 or 5 stars, THEN I see an option to "Add to Favorites" which saves provider to my favorites list
2. GIVEN I have favorited providers, WHEN I navigate to "My Favorites", THEN I see a list with provider name, last service, average rating, next available slot, and "Rebook" button
3. GIVEN I tap "Rebook" on a favorite provider, WHEN I am taken to booking flow, THEN previous service details (service type, location, notes) are pre-populated
4. GIVEN I am rebooking a favorite, WHEN I select "Book with Same Details", THEN the booking is created with saved preferences in <30 seconds (requiring only time slot selection and payment confirmation)
5. GIVEN a favorite provider is available, WHEN they have open slots in my preferred time range, THEN I receive proactive notification suggesting a rebooking

**Non-Functional Requirements:**
- **Performance**: Rebooking flow completion time must be <30 seconds from favorites list to confirmed booking
- **Usability**: Rebooking must require no more than 3 taps/interactions for returning customers

**Priority:** P1 (High Value)
**Related Personas:** Amira, Rania
**Module:** Discovery & Booking, Profiles (Modules 1, 3)
**FRD Requirements:** R-AUTH-003 (favorites), R-BOOKING-001 (rebooking)
**Components:** [O-01] ProviderCard, [A-01] Button, [M-07] EmptyState
**Data Tables:** `favorites`, `bookings`
**Wireframes:** Screen 1.1 (Favorites section)
**API Endpoints:** POST /favorites, DELETE /favorites/:id, GET /favorites, POST /bookings/quick

---

### BS-005: Rate and Review Service Provider

**As** Praew (Young Local Professional), **I want to** rate my service experience and leave a review with photos **so that** I can help other customers make informed choices and hold providers accountable for quality.

**Acceptance Criteria:**
1. GIVEN my booking status is COMPLETED, WHEN I open the app, THEN I see a review prompt within 2 hours asking for rating (1-5 stars) and optional comment/photos
2. GIVEN I am leaving a review, WHEN I submit rating and comment, THEN the review enters moderation queue and provider's weighted average is recalculated (recent 5 reviews = 60%, older = 40%)
3. GIVEN I am leaving a review, WHEN I attach photos, THEN I can upload up to 3 photos (max 5MB each) to support my review
4. GIVEN I leave a review or 24 hours pass, WHEN the review window closes, THEN transaction status changes from HELD to READY_FOR_PAYOUT
5. GIVEN I am viewing a provider profile, WHEN I read reviews, THEN I see: star distribution, verified review badge, review text, customer photos, provider response (if any), and review date

**Non-Functional Requirements:**
- **Performance**: Review submission must complete within 2 seconds; photos uploaded to Object Storage within 5 seconds
- **Security**: Review moderation must flag inappropriate content using automated filters before public display; PDPA compliance for customer data in reviews

**Priority:** P0 (MVP Critical)
**Related Personas:** Praew, Amira, Rania
**Module:** Ratings & Reviews (Module 5)
**API Reference:** `04_Booking_API.md` - POST /reviews

---

### BS-006: Manage Multi-Service Household Needs

**As** Rania (Busy Parent), **I want to** book and manage multiple service categories (beauty, pet grooming, cleaning) in one platform with saved household notes **so that** I can consolidate vendor relationships and reduce cognitive load from juggling multiple apps.

**Acceptance Criteria:**
1. GIVEN I am booking a service, WHEN I enter location details, THEN I can save household notes (e.g., "2 dogs - Golden Retrievers", "Kids home after 3pm", "Gate code: 1234") that persist across bookings
2. GIVEN I am browsing providers, WHEN I filter by "Family-Friendly" badge, THEN only providers with verified experience with kids/pets are shown
3. GIVEN I have upcoming bookings, WHEN I view "My Bookings" dashboard, THEN I see all services across categories with unified status tracking, color-coded by category
4. GIVEN I have multiple active bookings, WHEN providers arrive or complete service, THEN I receive notifications grouped by household with option to view all via WhatsApp/LINE integration
5. GIVEN I book recurring services, WHEN I set up monthly pet grooming, THEN the system auto-creates bookings with my preferred provider and sends confirmation requests 7 days prior

**Non-Functional Requirements:**
- **Usability**: Household note field must support Thai and English input up to 500 characters; notes encrypted at rest for privacy
- **Performance**: Multi-service dashboard must load all bookings (up to 50) within 2 seconds

**Priority:** P1 (High Value)
**Related Personas:** Rania
**Module:** Discovery & Booking, Profiles (Modules 1, 3)

---

### BS-007: Cancel or Reschedule Booking

**As** Amira (Expat Professional), **I want to** cancel or reschedule my booking with clear policy enforcement **so that** I understand any fees and can adjust my plans without unexpected charges.

**Acceptance Criteria:**
1. GIVEN my booking is CONFIRMED, WHEN I view booking details, THEN I see cancellation policy: "Free cancellation ≥12 hours prior; <12 hours = 50% fee"
2. GIVEN I cancel ≥12 hours before service, WHEN cancellation is confirmed, THEN booking status changes to CANCELLED, escrow funds are fully released back to me within 3-5 business days, and provider is notified
3. GIVEN I cancel <12 hours before service, WHEN cancellation is confirmed, THEN 50% of booking value is transferred to provider, 50% is released back to me, and clear breakdown is shown
4. GIVEN I want to reschedule, WHEN I select "Change Time", THEN I see provider's available slots for next 14 days and can select new time without re-paying (if >12 hours prior)
5. GIVEN I reschedule successfully, WHEN new time is confirmed, THEN original booking is updated (not duplicated), provider is notified, and I receive updated confirmation

**Non-Functional Requirements:**
- **Security**: Refund processing must use secure payment gateway APIs with transaction logging to audit_logs table
- **Performance**: Cancellation/reschedule must process within 5 seconds with immediate status update and notification sent within 30 seconds

**Priority:** P0 (MVP Critical)
**Related Personas:** Amira, Rania, Praew
**Module:** Discovery & Booking, Escrow & Payout (Modules 3, 4)

---

## Provider User Stories

### PS-001: Complete Onboarding and KYC Verification

**As** Nok (Freelance Beautician), **I want to** complete a streamlined onboarding process with KYC verification **so that** I can start receiving bookings quickly and gain platform credibility through verified status.

**Acceptance Criteria:**
1. GIVEN I am a new provider, WHEN I start onboarding, THEN I complete: profile setup (name, photo, bio), service selection (from catalog), ID upload (Thai ID or passport), certificate uploads (min 2), and bank account details (for payouts)
2. GIVEN I upload KYC documents, WHEN I submit for review, THEN my status changes to PENDING_APPROVAL and I receive confirmation via SMS/email with expected review timeline (24-48 hours)
3. GIVEN admin reviews my profile, WHEN approved, THEN my status changes to APPROVED, I receive welcome notification with onboarding checklist, and my profile becomes visible in search results
4. GIVEN admin rejects my profile, WHEN rejection occurs, THEN I receive notification with specific reason_code (INVALID_ID, INSUFFICIENT_CERTIFICATES, etc.) and can resubmit corrected documents
5. GIVEN I am APPROVED, WHEN I complete optional onboarding tasks (set availability, add portfolio photos, complete training module), THEN I see progress tracker and earn "Veyya Verified" badge at 100% completion

**Non-Functional Requirements:**
- **Security**: ID documents and certificates stored in encrypted Object Storage with access restricted to RBAC-approved admin roles
- **Compliance**: KYC process must comply with Thailand PDPA with explicit consent for data collection and 30-day document retention after rejection

**Priority:** P0 (MVP Critical)
**Related Personas:** Nok, Somchai
**Module:** Provider Onboarding (Module 2)
**API Reference:** `02_FRD_Modules.md` - Module 2 flow

---

### PS-002: Set Availability and Sync Calendar

**As** Nok (Freelance Beautician), **I want to** set my availability manually and sync with Google Calendar **so that** I can prevent double bookings and maintain control over my schedule without manual updates.

**Acceptance Criteria:**
1. GIVEN I am setting availability, WHEN I use the availability manager, THEN I can create recurring weekly slots (e.g., "Mon-Sat 9am-7pm") and block specific dates/times
2. GIVEN I connect Google Calendar OAuth, WHEN I authorize access, THEN the system pulls busy times every 15 minutes and marks those slots as unavailable in my booking calendar
3. GIVEN a customer books my service, WHEN booking status becomes CONFIRMED, THEN the system automatically pushes event to my Google Calendar with customer name, service, and location
4. GIVEN I have overlapping availability, WHEN a time slot is booked, THEN that slot is immediately marked unavailable and prevented from duplicate bookings (atomic transaction)
5. GIVEN I need to cancel availability, WHEN I delete or modify a slot, THEN existing confirmed bookings in that slot are NOT affected, only future booking requests

**Non-Functional Requirements:**
- **Reliability**: Calendar sync must handle Google API failures gracefully with exponential backoff; manual availability always takes precedence over synced data
- **Performance**: Availability checks must complete within 200ms during booking flow to prevent booking conflicts; Redis caching for frequently accessed provider schedules

**Priority:** P0 (MVP Critical)
**Related Personas:** Nok, Somchai
**Module:** Calendar & Availability (Module 6)
**API Reference:** `02_FRD_Modules.md` - Module 6 flow

---

### PS-003: Accept or Reject Booking Requests

**As** Nok (Freelance Beautician), **I want to** receive booking notifications and respond within a time limit **so that** I can maintain my response rate score and make informed decisions about which jobs to accept.

**Acceptance Criteria:**
1. GIVEN a customer books my service, WHEN booking intent is created with status PENDING_PROVIDER, THEN I receive push notification and in-app alert within 30 seconds with booking details (service, time, location, customer rating, payment status: HELD)
2. GIVEN I view a booking request, WHEN I review details, THEN I see: service type, date/time, duration, location with map preview, customer name/rating, gross payment amount, net amount after commission (70%), and 30-minute countdown timer
3. GIVEN I decide to accept, WHEN I tap "Accept" and optionally add note, THEN booking status changes to CONFIRMED, customer is notified, escrow payment remains HELD, and event is added to my calendar
4. GIVEN I decide to reject, WHEN I tap "Reject" and select reason_code (SLOT_CONFLICT, OUTSIDE_SERVICE_AREA, PERSONAL_REASON), THEN booking status changes to REJECTED, customer is notified with reason, and I can optionally suggest alternative times
5. GIVEN I don't respond within 30 minutes, WHEN timeout occurs, THEN booking is automatically reassigned to alternative providers, my response_rate score decreases, and I receive reminder notification

**Non-Functional Requirements:**
- **Performance**: Accept/reject actions must process within 1 second with immediate status update; notifications delivered within 30 seconds
- **Reliability**: Response rate calculation must accurately track percentage of requests accepted within 30-minute window; metric updated in real-time and visible in provider profile

**Priority:** P0 (MVP Critical)
**Related Personas:** Nok, Somchai
**Module:** Discovery & Booking (Module 3)
**API Reference:** `04_Booking_API.md` - POST /bookings/{id}/accept, POST /bookings/{id}/reject

---

### PS-004: Complete Service and Submit Proof

**As** Somchai (Mobile Pet Groomer), **I want to** mark a service as completed with optional proof photos **so that** I can trigger payment release and build portfolio evidence of quality work.

**Acceptance Criteria:**
1. GIVEN my booking status is CONFIRMED and service time has arrived, WHEN I start service, THEN I can optionally tap "Service in Progress" to notify customer and update status for tracking
2. GIVEN I finish service, WHEN I tap "Mark Complete", THEN I can add optional completion note (e.g., "Used hypoallergenic shampoo") and upload up to 3 photos (before/after shots)
3. GIVEN I submit completion, WHEN completion is confirmed, THEN booking status changes to COMPLETED, customer receives notification to review, and transaction status changes to READY (awaiting customer review or +24h auto-release)
4. GIVEN I submit completion photos, WHEN customer reviews service, THEN my completion photos appear in my portfolio gallery and can be featured in my profile (with customer consent)
5. GIVEN customer doesn't review within 24 hours, WHEN auto-release window closes, THEN transaction status automatically changes to READY_FOR_PAYOUT without customer review required

**Non-Functional Requirements:**
- **Performance**: Service completion must process within 2 seconds; photos uploaded to Object Storage within 5 seconds with automatic thumbnail generation
- **Security**: Completion photos must include EXIF metadata stripping for privacy; photos only used in portfolio with explicit customer consent (PDPA compliance)

**Priority:** P0 (MVP Critical)
**Related Personas:** Nok, Somchai
**Module:** Discovery & Booking, Ratings & Reviews (Modules 3, 5)
**API Reference:** `04_Booking_API.md` - POST /bookings/{id}/complete

---

### PS-005: Track Earnings and View Payout Schedule

**As** Nok (Freelance Beautician), **I want to** view my real-time earnings breakdown and understand when I'll receive payouts **so that** I can manage my cash flow and trust the platform's payment transparency.

**Acceptance Criteria:**
1. GIVEN I have active bookings, WHEN I view my wallet dashboard, THEN I see three categories: "Pending" (bookings in progress), "Ready" (completed awaiting payout batch), "Paid" (already transferred to bank)
2. GIVEN I tap on "Ready" earnings, WHEN I view breakdown, THEN I see per-booking details: booking ID, service date, customer name, gross amount, commission (25-30%), net amount, and status (READY_FOR_PAYOUT)
3. GIVEN the weekly payout batch runs, WHEN my earnings are included, THEN I receive notification with transfer amount, expected deposit date (2-3 business days), batch ID, and detailed CSV breakdown via email
4. GIVEN I want to understand payout schedule, WHEN I view wallet info, THEN I see: "Payouts process every Monday for services completed through previous Sunday. Funds arrive in 2-3 business days."
5. GIVEN I have a booking under dispute, WHEN I view wallet, THEN disputed amount is clearly marked as "On Hold - Dispute #DISP-123" and excluded from available balance with link to dispute details

**Non-Functional Requirements:**
- **Performance**: Wallet dashboard must load within 1.5 seconds with real-time balance calculations from PostgreSQL
- **Security**: Earnings data encrypted at rest; bank account details masked except last 4 digits; payout history accessible for 12 months minimum for tax purposes

**Priority:** P0 (MVP Critical)
**Related Personas:** Nok, Somchai
**Module:** Escrow & Payout (Module 4)
**API Reference:** `04_Booking_API.md` - POST /payouts/batch/run; `09_Data_Model.md` - payout_batches, payout_items

---

### PS-006: Build and Manage Professional Profile

**As** Nok (Freelance Beautician), **I want to** create a compelling profile with portfolio photos and service descriptions **so that** I can attract quality customers and differentiate myself from competitors.

**Acceptance Criteria:**
1. GIVEN I am editing my profile, WHEN I add portfolio photos, THEN I can upload up to 12 images with captions (max 200 chars) organized by service type (Nails, Lashes, etc.)
2. GIVEN I offer services, WHEN I set pricing, THEN I can override base platform prices with my custom rates (within ±30% of base) and add service descriptions in Thai and English
3. GIVEN I want to showcase expertise, WHEN I add certifications, THEN I can upload certificate images with issue date and institution, which appear as "Verified Credentials" badges on my profile
4. GIVEN customers view my profile, WHEN they see my stats, THEN they see: average rating (weighted), total completed bookings, response rate %, on-time arrival rate %, languages spoken, service radius (km), and "Veyya Verified" badge if earned
5. GIVEN I want to improve visibility, WHEN I view profile analytics, THEN I see: profile views, booking conversion rate, top searched services, and recommendations for improvement (e.g., "Add portfolio photos to increase bookings by 40%")

**Non-Functional Requirements:**
- **Performance**: Profile edits must save within 2 seconds; portfolio images optimized and cached via CDN for fast loading (<1s)
- **Usability**: Profile builder must support Thai and English text input with character count indicators; image upload with real-time preview and crop tool

**Priority:** P1 (High Value)
**Related Personas:** Nok, Somchai
**Module:** Provider Onboarding, Auth & Profiles (Modules 1, 2)

---

### PS-007: Optimize Route with Clustered Bookings

**As** Somchai (Mobile Pet Groomer), **I want to** view my bookings organized by geographic area and time **so that** I can optimize my daily route and minimize travel time and fuel costs.

**Acceptance Criteria:**
1. GIVEN I have multiple bookings, WHEN I view "Today's Route", THEN I see bookings displayed on a map with pins color-coded by time slot and route optimization suggested
2. GIVEN I am reviewing booking requests, WHEN I view a new request, THEN I see proximity to existing bookings with indicator (e.g., "2 other bookings within 3km today")
3. GIVEN I want to plan my day, WHEN I view route summary, THEN I see: total travel distance, estimated travel time, suggested order of appointments, and option to export route to Google Maps
4. GIVEN I prefer geographic clustering, WHEN booking algorithm ranks requests for me, THEN requests within my current service area on active days are prioritized and highlighted
5. GIVEN I complete a booking, WHEN I mark it complete, THEN the route view updates and suggests optimal next destination based on remaining appointments

**Non-Functional Requirements:**
- **Performance**: Route optimization calculations must complete within 3 seconds using Google Maps Distance Matrix API with caching for frequent routes
- **Accuracy**: Distance and time estimates must be within ±10% accuracy using real-time traffic data when available

**Priority:** P1 (High Value)
**Related Personas:** Somchai
**Module:** Calendar & Availability, Discovery & Booking (Modules 3, 6)
**Dependencies:** Google Maps API integration

---

### PS-008: Handle Disputes and Customer Issues

**As** Nok (Freelance Beautician), **I want to** respond to customer complaints and disputes through a fair resolution process **so that** I can protect my earnings and reputation while maintaining quality standards.

**Acceptance Criteria:**
1. GIVEN a customer opens a dispute, WHEN I am notified, THEN I receive alert within 1 hour with dispute details (booking ID, customer complaint, disputed amount) and 48-hour response deadline
2. GIVEN I am responding to a dispute, WHEN I submit my response, THEN I can provide: written explanation (max 1000 chars), supporting photos/evidence, and request for admin mediation
3. GIVEN a dispute is under review, WHEN admin reviews both sides, THEN disputed amount remains in "HELD" status and excluded from my weekly payout until resolution
4. GIVEN admin resolves dispute in my favor, WHEN resolution is confirmed, THEN full disputed amount moves to READY_FOR_PAYOUT, customer is notified, and resolution note is added to booking record
5. GIVEN admin resolves dispute against me, WHEN resolution is confirmed, THEN disputed amount is refunded to customer, I receive detailed explanation, and booking is marked with dispute flag (not visible to future customers unless pattern detected)

**Non-Functional Requirements:**
- **Security**: Dispute process must maintain audit trail in audit_logs table with all communications, evidence, and resolution steps; RBAC controls restrict access to admin dispute role
- **Fairness**: Dispute resolution must complete within 7 business days; provider disputes >3 per 100 bookings trigger profile review; customer dispute rate <2% platform-wide KPI

**Priority:** P1 (High Value)
**Related Personas:** Nok, Somchai
**Module:** Admin Dashboard, Escrow & Payout (Modules 4, 7)
**Related KPI:** Dispute rate <2% (from PRD)

---

## Cross-Cutting User Stories

### CS-001: Switch Between Client and Provider Roles

**As** Nok (who also books services), **I want to** seamlessly switch between client and provider modes in the app **so that** I can book services for myself while also managing my professional bookings.

**Acceptance Criteria:**
1. GIVEN I have both client and provider profiles, WHEN I log in, THEN I see a role switcher in the app header/menu
2. GIVEN I am in client mode, WHEN I switch to provider mode, THEN I see provider dashboard with earnings, bookings, and profile management
3. GIVEN I am in provider mode, WHEN I switch to client mode, THEN I see client home screen with service discovery and my bookings
4. GIVEN I switch roles, WHEN context changes, THEN notifications, menu items, and available actions update appropriately without re-login
5. GIVEN I have notifications in both roles, WHEN I view notifications center, THEN notifications are grouped by role with clear visual distinction

**Non-Functional Requirements:**
- **Performance**: Role switching must complete within 500ms without full app reload
- **Security**: JWT token must include role claims; backend API validates role-appropriate access to endpoints (RBAC enforcement)

**Priority:** P1 (High Value)
**Related Personas:** Nok (and others who may have dual roles)
**Module:** Auth & Profiles (Module 1)
**API Reference:** `02_FRD_Modules.md` - Module 1 role switching

---

### CS-002: Receive Localized Notifications via Preferred Channel

**As** Praew (Thai Local), **I want to** receive notifications in Thai via my preferred channel (push, LINE, or SMS) **so that** I stay informed about bookings in my native language through my preferred communication method.

**Acceptance Criteria:**
1. GIVEN I am setting up my profile, WHEN I configure notification preferences, THEN I can select: preferred language (Thai/English), channels (push/LINE/SMS/email), and notification types (bookings/promotions/reminders)
2. GIVEN I have selected Thai language, WHEN I receive notifications, THEN all notification content (titles, bodies, CTAs) is displayed in Thai with proper cultural formatting (e.g., Thai date format, ค่ะ/ครับ politeness particles)
3. GIVEN I have enabled LINE integration, WHEN a booking status changes, THEN I receive notification via LINE official account with rich card format including action buttons
4. GIVEN I have multiple notification channels enabled, WHEN critical updates occur (booking confirmed, service starting soon), THEN I receive notification via all enabled channels
5. GIVEN I want to reduce notifications, WHEN I adjust preferences, THEN changes take effect immediately and I receive confirmation via selected channel

**Non-Functional Requirements:**
- **Performance**: Notifications must be delivered within 30 seconds via Twilio/Firebase/LINE API with 99% delivery success rate
- **Localization**: All notification templates must support Thai (UTF-8 encoding) and English with culturally appropriate tone and formatting

**Priority:** P0 (MVP Critical)
**Related Personas:** Praew, Rania, Nok, Somchai
**Module:** Notifications (included in all modules)
**Dependencies:** Firebase Cloud Messaging, Twilio, LINE Messaging API

---

## Story Mapping Summary

### MVP Priorities (P0 - Must Have)
**Booker:** BS-001, BS-002, BS-003, BS-005, BS-007
**Provider:** PS-001, PS-002, PS-003, PS-004, PS-005
**Cross-Cutting:** CS-002

**Total P0 Stories:** 11

### High Value (P1 - Should Have)
**Booker:** BS-004, BS-006
**Provider:** PS-006, PS-007, PS-008
**Cross-Cutting:** CS-001

**Total P1 Stories:** 6

### Coverage Analysis
- **Auth & Profiles (Module 1):** CS-001, PS-006
- **Provider Onboarding (Module 2):** PS-001
- **Discovery & Booking (Module 3):** BS-001, BS-002, BS-003, BS-007, PS-003, PS-007
- **Escrow & Payout (Module 4):** BS-002, BS-007, PS-005, PS-008
- **Ratings & Reviews (Module 5):** BS-005, PS-004
- **Calendar & Availability (Module 6):** PS-002, PS-007
- **Admin Dashboard (Module 7):** PS-008
- **Notifications (Cross-Cutting):** BS-003, CS-002

---

## Implementation Notes

### Development Sequence (Recommended)
1. **Foundation:** PS-001 (Onboarding), CS-001 (Role Switching), CS-002 (Notifications)
2. **Core Booking Flow:** BS-001 (Discovery), BS-002 (Booking + Payment), PS-002 (Availability), PS-003 (Accept/Reject)
3. **Completion Flow:** PS-004 (Complete Service), BS-005 (Reviews), PS-005 (Earnings)
4. **Status & Tracking:** BS-003 (Confirmation & Tracking)
5. **Optimization:** BS-004 (Favorites), BS-006 (Multi-Service), PS-006 (Profile), PS-007 (Route Optimization)
6. **Edge Cases:** BS-007 (Cancel/Reschedule), PS-008 (Disputes)

### Testing Requirements
- Each story requires unit tests (backend logic), integration tests (API contracts), and E2E tests (user flows)
- Non-functional requirements must include performance benchmarks (load testing) and security audits (penetration testing, PDPA compliance review)
- Acceptance criteria should be converted to Gherkin scenarios for automated BDD testing

### Related Documentation
- Acceptance Criteria Details: `documents/acceptance/07_Acceptance_Criteria.md`
- Test Plan: `documents/acceptance/16_Test_Plan.md`
- Requirements Traceability: `documents/requirements/13_Requirements_Traceability.md`
