# Veyya Functional Requirements Document (FRD)

## Document Information

**Version:** 1.0
**Date:** 2025-10-25
**Status:** MVP Specification
**Owner:** Product & Engineering

**Related Documents:**
- PRD: `documents/requirements/01_PRD_Veyya.md`
- User Stories: `documents/user-stories/00-core-stories.md`
- Personas: `documents/personas/00-personas.md`
- System Architecture: `documents/data-model/03_System_Overview.md`
- API Specifications: `documents/frd/04_Booking_API.md`
- Data Model: `documents/data-model/09_Data_Model.md`

---

## 1. Executive Summary

Veyya is a two-sided marketplace platform connecting customers (Bookers) with verified home service professionals (Providers) in Thailand, with initial focus on beauty and pet care services. This FRD defines the functional requirements for the MVP launch targeting Bangkok with 50 providers and 1,000 customers by Month 6.

**Platform Positioning:** Premium but accessible; trust and curation over mass scale
**Target Markets:** Thailand (Bangkok), UAE, SEA (expansion phases)
**Revenue Model:** 25-30% commission on completed bookings with weekly provider payouts
**Success Metrics:** <3 min booking time, <2% dispute rate, >60 Provider NPS, >40% repeat bookings by Month 6, >$50K USD monthly GMV

---

## 2. Scope Definition

### 2.1 In Scope (MVP - P0)

**Client (Booker) Experience:**
- User registration and authentication via OTP
- Service discovery with ranking and filtering
- Provider profile viewing with portfolios, ratings, and availability
- Booking creation with escrow payment
- Real-time booking status tracking and notifications
- Service rating and review submission
- Booking cancellation and rescheduling
- Multi-language support (English/Thai)

**Provider Experience:**
- Provider onboarding with KYC verification
- Profile and portfolio management
- Manual availability management and Google Calendar sync
- Booking request acceptance/rejection (30-minute SLA)
- Service completion with proof submission
- Real-time earnings dashboard (Pending/Ready/Paid)
- Weekly payout visibility and breakdown
- Dispute response workflow

**Admin Portal:**
- Provider KYC approval workflow
- Booking monitoring dashboard
- Dispute resolution tools
- Payout batch processing and monitoring
- Platform analytics (GMV, cancellations, ratings, NPS)
- Audit log access

**Core Platform Services:**
- Escrow payment processing with Stripe/Omise integration
- Automated notification system (Push/SMS/Email/LINE)
- Review moderation queue
- Weekly payout batch automation
- Geolocation-based provider ranking
- Role-based access control (RBAC)

### 2.2 Out of Scope (Post-MVP)

- Native iOS/Android apps (MVP is mobile-responsive web)
- Loyalty programs and referral systems (P4)
- Subscription/bundle packages
- AI-driven matching and predictive scheduling
- Corporate/B2B booking portals
- Multi-currency beyond THB (expansion phase)
- In-app messaging/chat (using WhatsApp/LINE integration instead)
- Service professional teams/franchise management
- Dynamic pricing algorithms

### 2.3 Assumptions

- Providers are independent contractors (not employees) per Thai legal framework
- Initial market limited to Bangkok metropolitan area (50km radius)
- Payment processing via Stripe for international cards, Omise/PromptPay for Thai payment methods
- Mobile-first responsive web app with PWA capabilities
- Google Maps API for geolocation and routing
- Firebase/Twilio for push notifications and SMS
- Object storage (AWS S3/Firebase Storage) for documents and photos
- PostgreSQL for transactional data; Redis for caching

---

## 3. Functional Requirements by Module

### Module 1: Authentication & User Profiles

#### R-AUTH-001: OTP-Based Registration and Login
**Priority:** P0
**User Stories:** Foundation for all user flows

**Requirements:**
- System SHALL support user registration via email or phone (E.164 format)
- System SHALL generate and send 6-digit OTP with 5-minute expiry
- System SHALL verify OTP and create/retrieve user account
- System SHALL issue JWT token with 24-hour expiry and role claims
- System SHALL support password-less authentication for subsequent logins
- System MUST rate-limit OTP requests to 3 attempts per 15 minutes per user

**Acceptance Criteria:**
- OTP delivery within 30 seconds via SMS (Twilio) or Email (SES)
- Login flow completion in <90 seconds
- Token refresh mechanism before expiry
- Support for both Thai (+66) and international phone numbers

**Integrations:**
- Twilio SMS API for OTP delivery
- AWS SES for email OTP
- JWT library for token generation

---

#### R-AUTH-002: Role Management and Switching
**Priority:** P0
**User Stories:** CS-001

**Requirements:**
- System SHALL support dual roles (client and provider) for single user account
- System SHALL allow users to switch between roles without re-authentication
- System SHALL persist role selection across sessions
- System SHALL display role-appropriate UI, navigation, and features based on active role
- JWT token MUST include role claims for API authorization

**Acceptance Criteria:**
- Role switch completes within 500ms without app reload
- Backend APIs validate role-appropriate access via RBAC middleware
- Notifications grouped by role in notification center

---

#### R-AUTH-003: User Profile Management
**Priority:** P0
**User Stories:** BS-004, PS-006

**Requirements:**
- System SHALL store user profile: name, email, phone, profile photo, preferred language (EN/TH), location
- System SHALL allow users to edit profile information
- System SHALL support profile photo upload (max 5MB, JPG/PNG)
- System SHALL validate email format and phone number format
- System MUST encrypt sensitive data (phone, email) at rest

**Acceptance Criteria:**
- Profile updates save within 2 seconds
- Profile photo optimized and served via CDN (<1s load time)
- PDPA-compliant consent flow for data collection

---

### Module 2: Provider Onboarding & Verification

#### R-PROVIDER-001: Provider Registration and KYC Submission
**Priority:** P0
**User Stories:** PS-001

**Requirements:**
- System SHALL collect provider information: name, bio (500 chars), service categories, service area radius (km)
- System SHALL require ID document upload (Thai ID or Passport, max 10MB PDF/JPG)
- System SHALL require minimum 2 professional certificates upload (max 10MB each)
- System SHALL require bank account details for payouts (account number, bank name, branch)
- System SHALL collect portfolio photos (up to 12 images, max 5MB each)
- System SHALL set initial status to PENDING_APPROVAL upon submission
- System MUST store documents in encrypted Object Storage with access logs

**Acceptance Criteria:**
- Onboarding form completion in <10 minutes
- Document upload with progress indicator
- Confirmation notification sent within 1 minute of submission
- Documents accessible only to RBAC-approved admin roles

**Integrations:**
- AWS S3 or Firebase Storage for document storage
- Image optimization service for portfolio photos

---

#### R-PROVIDER-002: Admin KYC Approval Workflow
**Priority:** P0
**User Stories:** PS-001

**Requirements:**
- Admin portal SHALL display pending provider applications in queue
- Admin SHALL be able to review: ID documents, certificates, profile information, portfolio
- Admin SHALL be able to Approve or Reject application with reason code
- System SHALL send notification to provider within 1 hour of decision
- Rejection SHALL include reason codes: INVALID_ID, INSUFFICIENT_CERTIFICATES, INCOMPLETE_PROFILE, QUALITY_CONCERNS
- Upon approval, provider status SHALL change to APPROVED and profile becomes searchable
- System SHALL maintain audit log of all approval decisions

**Acceptance Criteria:**
- Review process target: 24-48 hours
- Rejected providers can resubmit with corrected documents
- Approval decisions logged with admin ID, timestamp, and reason

---

#### R-PROVIDER-003: Provider Profile Customization
**Priority:** P1
**User Stories:** PS-006

**Requirements:**
- Providers SHALL set custom pricing for services (within ±30% of base platform price)
- Providers SHALL write service descriptions in Thai and/or English (max 500 chars per service)
- Providers SHALL upload portfolio photos organized by service category
- Providers SHALL add certifications with issue date and institution name
- System SHALL display provider stats: average rating, total bookings, response rate, on-time rate, languages, service radius
- System SHALL award "Veyya Verified" badge when provider completes: 100% profile, 10+ bookings, 4.5+ rating, 95%+ response rate

**Acceptance Criteria:**
- Profile edits save within 2 seconds
- Portfolio images cached via CDN
- Badge criteria automatically evaluated and awarded
- Profile analytics show views, booking conversion rate, optimization recommendations

---

### Module 3: Discovery & Booking

#### R-DISCOVERY-001: Service Category Browsing
**Priority:** P0
**User Stories:** BS-001

**Requirements:**
- System SHALL display service categories: Beauty (subcategories: Nails, Hair, Makeup, Lashes), Pet Care (subcategories: Grooming, Walking, Sitting)
- System SHALL show category images, average price range, and available provider count
- System SHALL support category-level filtering before provider search
- System SHALL display featured/promoted providers within categories (admin configurable)

**Acceptance Criteria:**
- Category page loads within 1.5 seconds
- Images optimized and lazy-loaded
- Localized category names and descriptions (Thai/English)

---

#### R-DISCOVERY-002: Provider Search and Ranking
**Priority:** P0
**User Stories:** BS-001

**Requirements:**
- System SHALL rank providers using algorithm: `score = distance(40%) + rating(40%) + response_rate(20%)`
- System SHALL calculate distance from user's location (GPS or entered address) to provider's service area
- System SHALL apply filters:
  - Rating threshold (e.g., 4.5+, 4.0+)
  - Distance radius (1km, 3km, 5km, 10km, custom)
  - Availability (Today, Tomorrow, This Week, Custom Date)
  - Language capability (Thai, English)
  - Price range (custom min/max)
  - Badge filters (Veyya Verified, Family-Friendly)
- System SHALL display only APPROVED providers with active status
- System SHALL support empty state with relaxed filter suggestions

**Acceptance Criteria:**
- Search results load within 1.5 seconds (API <300ms p95)
- Geolocation permission prompt on first use
- Results paginated (20 per page) with infinite scroll
- Filter combinations persist during session

**Integrations:**
- Mapbox or Google Maps Geocoding API for address-to-coordinates conversion
- Mapbox or Google Maps Distance Matrix API for distance calculations

---

#### R-DISCOVERY-003: Provider Profile Viewing
**Priority:** P0
**User Stories:** BS-001

**Requirements:**
- System SHALL display provider profile with:
  - Profile photo, name, bio
  - Verified credentials badge
  - Portfolio gallery (up to 12 photos with captions)
  - Service list with pricing and descriptions
  - Average rating (weighted: recent 5 = 60%, older = 40%) with total review count
  - Response rate % (accepted within 30 min / total requests)
  - On-time arrival rate %
  - Total completed bookings
  - Languages spoken
  - Service radius (km)
  - Availability calendar (next 14 days)
- System SHALL display customer reviews (paginated, 10 per page) with:
  - Star rating, review text, customer photos, review date
  - Provider response (if any)
  - Verified booking badge
- System SHALL support "Add to Favorites" action (if 4+ star rating given post-booking)

**Acceptance Criteria:**
- Profile loads within 2 seconds
- Portfolio images in gallery view with swipe/click navigation
- Reviews sorted by most recent first
- Availability calendar shows only open slots

---

#### R-BOOKING-001: Booking Creation Flow
**Priority:** P0
**User Stories:** BS-002

**Requirements:**
- System SHALL collect booking information:
  - Selected service and provider
  - Service date and time slot
  - Service duration (auto-calculated from service type)
  - Service location (GPS coordinates + address string)
  - Special instructions (optional, 500 chars)
  - Add-on services (if available)
- System SHALL validate slot availability in real-time (atomic check to prevent double booking)
- System SHALL display booking summary:
  - Service name and description
  - Provider name and photo
  - Date, time, duration
  - Service address
  - Base price + add-ons = Total (in THB minor units)
  - Cancellation policy reminder
  - Escrow payment explanation
- System SHALL create booking with status PENDING_PROVIDER
- System MUST use Idempotency-Key header to prevent duplicate booking creation

**Acceptance Criteria:**
- Booking flow completion in <3 minutes (PRD KPI)
- Slot conflict detected and user notified before payment
- All monetary values stored in minor units (satang for THB)
- Booking creation returns booking ID and confirmation timestamp

**API Reference:** `04_Booking_API.md` - POST /bookings/intents

---

#### R-BOOKING-002: Escrow Payment Processing
**Priority:** P0
**User Stories:** BS-002

**Requirements:**
- System SHALL support payment methods:
  - International credit/debit cards via Stripe
  - Thai bank cards via Omise
  - PromptPay via Omise
- System SHALL create payment intent with booking metadata
- System SHALL authorize (not capture) payment amount and hold funds in escrow
- Transaction status SHALL be HELD upon successful authorization
- System SHALL handle payment failures with clear error codes: PAYMENT_REQUIRED, INSUFFICIENT_FUNDS, CARD_DECLINED
- System SHALL provide retry mechanism and alternative payment method selection
- System MUST log all payment transactions to audit_logs table
- System MUST encrypt payment details at rest and in transit (PCI-DSS compliant)

**Acceptance Criteria:**
- Payment processing completes within 10 seconds
- 3D Secure/OTP flows handled seamlessly
- Failed payment does not create booking record
- Webhook handler processes payment confirmations within 30 seconds

**Integrations:**
- Stripe Payment Intents API for international cards
- Omise Payment API for Thai payment methods
- Stripe/Omise Webhooks for payment status updates

**API Reference:** `04_Booking_API.md` - POST /payments/intents, POST /payments/webhook

---

#### R-BOOKING-003: Provider Booking Request Notification
**Priority:** P0
**User Stories:** PS-003

**Requirements:**
- System SHALL send booking request notification to provider within 30 seconds of booking creation
- Notification SHALL include:
  - Customer name and rating
  - Service type
  - Date, time, duration
  - Service location with map preview
  - Gross payment amount
  - Net amount after commission (70%)
  - 30-minute countdown timer
- System SHALL deliver notification via:
  - Push notification (if enabled)
  - SMS (fallback or preference)
  - Email (always)
  - In-app notification badge
- System SHALL display pending requests in provider dashboard with countdown timer
- System SHALL auto-reject booking after 30-minute timeout with reassignment logic

**Acceptance Criteria:**
- Notification delivery within 30 seconds via Firebase/Twilio
- Multi-channel delivery based on provider preferences
- Push notification deep-links to booking details screen
- Countdown timer visible in dashboard and notification

**Integrations:**
- Firebase Cloud Messaging for push notifications
- Twilio for SMS notifications
- AWS SES for email notifications

---

#### R-BOOKING-004: Provider Accept/Reject Booking
**Priority:** P0
**User Stories:** PS-003

**Requirements:**
- Provider SHALL accept booking with optional note (200 chars)
- Provider SHALL reject booking with mandatory reason code:
  - SLOT_CONFLICT
  - OUTSIDE_SERVICE_AREA
  - PERSONAL_REASON
  - OTHER (with free text, 200 chars)
- Upon acceptance:
  - Booking status changes to CONFIRMED
  - Customer notified within 30 seconds
  - Event added to provider's Google Calendar (if synced)
  - Escrow payment remains HELD
- Upon rejection:
  - Booking status changes to REJECTED
  - Customer notified with reason and alternative provider suggestions
  - Escrow payment un-held and funds released
  - Provider's response rate updated
- System SHALL track response time and calculate response_rate = (responses within 30 min / total requests) * 100
- System SHALL penalize response rate for timeouts

**Acceptance Criteria:**
- Accept/reject action processes within 1 second
- Status change and notifications sent within 30 seconds
- Response rate metric updated in real-time
- Alternative provider suggestions use same ranking algorithm with next 3 providers

**API Reference:** `04_Booking_API.md` - POST /bookings/{id}/accept, POST /bookings/{id}/reject

---

#### R-BOOKING-005: Booking Status Tracking
**Priority:** P0
**User Stories:** BS-003

**Requirements:**
- System SHALL display real-time booking status for customers:
  - PENDING_PROVIDER: "Waiting for provider to accept (XX min remaining)"
  - CONFIRMED: "Booking confirmed! [Provider Name] will arrive at [Time]"
  - IN_PROGRESS: "Service in progress" (optional provider trigger)
  - COMPLETED: "Service completed. Please rate your experience."
  - CANCELLED: "Booking cancelled" (with reason)
- System SHALL provide action buttons based on status:
  - PENDING_PROVIDER: "Cancel Booking"
  - CONFIRMED: "Contact Provider" (WhatsApp/LINE), "Reschedule", "Cancel"
  - COMPLETED: "Rate & Review"
- System SHALL send status change notifications via customer's preferred channels
- System SHALL send reminder notification 24 hours before confirmed booking
- System SHALL display booking timeline with timestamps

**Acceptance Criteria:**
- Status updates appear within 30 seconds of change
- Real-time updates via WebSocket or polling (30-second interval)
- Reminder notifications delivered at correct time
- Contact buttons deep-link to WhatsApp/LINE with pre-filled message template

---

#### R-BOOKING-006: Booking Cancellation and Rescheduling
**Priority:** P0
**User Stories:** BS-007

**Requirements:**
- System SHALL enforce cancellation policy:
  - Free cancellation if ≥12 hours before service start
  - 50% fee if <12 hours before service start
- Customer SHALL see cancellation policy at booking creation and in booking details
- Upon cancellation ≥12 hours:
  - Booking status changes to CANCELLED
  - Escrow funds fully released to customer (refund within 3-5 business days)
  - Provider notified immediately
- Upon cancellation <12 hours:
  - 50% of booking value transferred to provider (compensation)
  - 50% refunded to customer
  - Clear breakdown shown in confirmation
- Rescheduling SHALL:
  - Show provider's available slots for next 14 days
  - Update booking date/time without creating new booking
  - Not require re-payment if done ≥12 hours prior
  - Notify provider of time change
- Provider SHALL also be able to cancel with reason code (no penalty if >24h notice)

**Acceptance Criteria:**
- Cancellation processes within 5 seconds
- Refund initiated immediately with transaction ID
- Rescheduling updates existing booking (no duplicate records)
- Both parties receive cancellation/reschedule confirmation

---

### Module 4: Escrow & Payout Management

#### R-ESCROW-001: Service Completion
**Priority:** P0
**User Stories:** PS-004

**Requirements:**
- Provider SHALL mark booking as complete after service delivery
- Provider MAY add completion note (500 chars)
- Provider MAY upload up to 3 completion photos (before/after, max 5MB each)
- Upon completion:
  - Booking status changes to COMPLETED
  - Customer notified to review service
  - Transaction status remains HELD pending review or 24-hour auto-release
- System SHALL strip EXIF metadata from photos for privacy (PDPA compliance)
- Completion photos MAY be added to provider portfolio (with customer consent checkbox)

**Acceptance Criteria:**
- Completion action processes within 2 seconds
- Photos uploaded to Object Storage within 5 seconds with thumbnail generation
- Customer receives review prompt within 2 hours
- EXIF data removed before storage

**API Reference:** `04_Booking_API.md` - POST /bookings/{id}/complete

---

#### R-ESCROW-002: Transaction Status Management
**Priority:** P0
**User Stories:** BS-002, PS-005

**Requirements:**
- System SHALL manage transaction states:
  - HELD: Payment authorized, funds escrowed (upon booking creation)
  - READY: Service completed and reviewed (or 24h elapsed), ready for payout batch
  - RELEASED: Included in payout batch, funds transferred to provider
  - REFUNDED: Booking cancelled, funds returned to customer
  - DISPUTED: Under dispute resolution, excluded from payout
- System SHALL automatically transition HELD → READY when:
  - Customer submits review after service completion, OR
  - 24 hours elapse after completion without review
- System SHALL calculate provider payout:
  - Net = Gross * (1 - Commission_Rate)
  - Commission_Rate = 0.25 to 0.30 (configurable per provider tier)
- System SHALL withhold 3-5% for Thai tax (per freelancer legal requirements)
- Disputed transactions SHALL be excluded from payout batches until resolution

**Acceptance Criteria:**
- Transaction state transitions logged in audit_logs
- Auto-transition to READY occurs exactly 24 hours post-completion
- Commission and tax calculations accurate to minor units
- Disputed bookings clearly flagged in admin dashboard

---

#### R-ESCROW-003: Weekly Payout Batch Processing
**Priority:** P0
**User Stories:** PS-005

**Requirements:**
- System SHALL run automated weekly payout batch every Monday at 00:00 UTC+7
- Batch SHALL include all transactions with status READY from previous week (Mon-Sun)
- System SHALL create payout_batch record with:
  - period_start, period_end
  - total_net amount
  - transaction count
  - status: PENDING → PROCESSING → COMPLETED
- System SHALL create payout_items for each provider with:
  - provider_id
  - amount_net (sum of all provider's READY transactions minus commission and tax)
  - transaction IDs included
  - status: PENDING → COMPLETED or FAILED
- System SHALL initiate bank transfers via payment gateway batch API
- System SHALL update transaction status READY → RELEASED upon successful transfer
- System SHALL send payout notification to providers with:
  - Transfer amount
  - Expected deposit date (2-3 business days)
  - Batch ID
  - Detailed CSV breakdown (email attachment)

**Acceptance Criteria:**
- Batch processing completes within 30 minutes for up to 10,000 transactions
- Failed transfers logged with error messages for manual resolution
- Providers receive notification within 1 hour of batch completion
- CSV export includes: booking_id, service_date, customer_name, gross, commission, tax, net

**Integrations:**
- Stripe/Omise Payout API for batch bank transfers

**API Reference:** `04_Booking_API.md` - POST /payouts/batch/run

---

#### R-ESCROW-004: Provider Earnings Dashboard
**Priority:** P0
**User Stories:** PS-005

**Requirements:**
- Provider dashboard SHALL display earnings in three categories:
  - **Pending**: Bookings CONFIRMED or IN_PROGRESS (not yet completed)
  - **Ready**: Bookings COMPLETED, transactions READY for next payout batch
  - **Paid**: Transactions RELEASED in previous payout batches
- System SHALL show per-booking breakdown for each category:
  - Booking ID (clickable to details)
  - Service date
  - Customer name
  - Service type
  - Gross amount
  - Commission % and amount
  - Tax withholding amount
  - Net amount
  - Status
- System SHALL show payout schedule information: "Payouts process every Monday for services completed through previous Sunday. Funds arrive in 2-3 business days."
- System SHALL show disputed bookings separately as "On Hold - Dispute #ID" with link to dispute details
- System SHALL maintain 12-month earning history for tax purposes
- Provider SHALL be able to export earnings reports as CSV

**Acceptance Criteria:**
- Dashboard loads within 1.5 seconds
- Real-time balance calculations from PostgreSQL
- Disputed amounts clearly separated from available balance
- Export CSV includes all transactions with Thai tax-compliant formatting

---

### Module 5: Ratings & Reviews

#### R-REVIEW-001: Customer Review Submission
**Priority:** P0
**User Stories:** BS-005

**Requirements:**
- System SHALL prompt customer to review within 2 hours of service completion
- Customer SHALL provide:
  - Star rating (1-5, required)
  - Written review (optional, 1000 chars)
  - Photos (optional, up to 3, max 5MB each)
- System SHALL validate:
  - Rating is integer between 1-5
  - Review text doesn't contain profanity (automated filter)
  - Photos are valid image formats (JPG/PNG)
- Review SHALL enter moderation queue (admin approval) before public display
- System SHALL update transaction status HELD → READY upon review submission
- System SHALL recalculate provider's average rating using weighted formula:
  - weighted_avg = (recent_5_reviews * 0.6) + (older_reviews * 0.4)
- System SHALL send notification to provider when review is published

**Acceptance Criteria:**
- Review submission processes within 2 seconds
- Photos uploaded within 5 seconds with automatic thumbnail generation
- Moderation queue items reviewed within 24 hours (admin SLA)
- Provider rating updated immediately upon review approval
- Auto-release to READY occurs even if customer doesn't review (24h timeout)

**Integrations:**
- Content moderation API (e.g., AWS Rekognition for image content, text profanity filter)

**API Reference:** `04_Booking_API.md` - POST /reviews

---

#### R-REVIEW-002: Review Moderation
**Priority:** P0
**User Stories:** BS-005

**Requirements:**
- Admin SHALL review pending reviews in moderation queue
- Admin SHALL be able to:
  - Approve review (makes public)
  - Reject review with reason (customer notified)
  - Edit review (remove profanity/PII) with approval
- System SHALL flag reviews for moderation if:
  - Automated profanity filter triggers
  - Rating is 1 or 2 stars (low rating)
  - Review mentions competitor names
  - Photos contain inappropriate content
- Approved reviews SHALL appear on provider profile immediately
- Rejected reviews SHALL NOT count toward rating calculation
- System SHALL log all moderation actions in audit_logs

**Acceptance Criteria:**
- Moderation queue sorted by submission time (oldest first)
- Bulk approval option for admins
- Moderation decisions processed within 2 seconds
- Automated flags reduce manual review load by 70%

---

#### R-REVIEW-003: Provider Response to Reviews
**Priority:** P1
**User Stories:** PS-006

**Requirements:**
- Provider MAY respond to customer reviews (500 chars)
- Response SHALL appear below review on provider profile
- Provider SHALL be notified of new reviews via preferred channels
- System SHALL support one response per review (no back-and-forth)
- Response SHALL also enter moderation queue before publishing

**Acceptance Criteria:**
- Response submission within 2 seconds
- Response appears within 24 hours after moderation approval
- Response linked to specific review in database

---

### Module 6: Calendar & Availability Management

#### R-CALENDAR-001: Manual Availability Management
**Priority:** P0
**User Stories:** PS-002

**Requirements:**
- Provider SHALL create availability slots with:
  - Start date and time
  - End date and time
  - Recurrence pattern: None (one-time), Daily, Weekly, Custom days
  - Status: AVAILABLE, BLOCKED
- Provider SHALL be able to:
  - Create recurring weekly schedule (e.g., "Mon-Sat 9am-7pm")
  - Block specific dates/times (holidays, personal time)
  - Edit or delete future availability
  - View calendar in day/week/month view
- System SHALL prevent overlapping availability slots
- System SHALL NOT allow modification/deletion of slots with confirmed bookings
- System SHALL mark slots as BOOKED when booking confirmed

**Acceptance Criteria:**
- Availability creation saves within 2 seconds
- Calendar view loads within 1.5 seconds
- Recurring pattern correctly generates slots for next 90 days
- Overlap validation prevents conflicts

---

#### R-CALENDAR-002: Google Calendar Integration
**Priority:** P0
**User Stories:** PS-002

**Requirements:**
- Provider SHALL connect Google Calendar via OAuth 2.0
- System SHALL request read/write calendar permissions
- System SHALL sync provider's calendar:
  - Pull busy times from Google Calendar every 15 minutes
  - Mark synced busy times as unavailable in Veyya calendar (source = "google")
  - Push confirmed Veyya bookings to Google Calendar as events
- Google Calendar events SHALL include:
  - Event title: "[Veyya] Service for [Customer Name]"
  - Location: Service address
  - Description: Booking ID, service type, customer phone
  - Start/end times
- System SHALL handle Google API failures gracefully:
  - Retry with exponential backoff
  - Fall back to manual availability only
  - Notify provider of sync issues
- Provider SHALL be able to disconnect Google Calendar integration
- Manual availability SHALL always take precedence over synced data

**Acceptance Criteria:**
- OAuth flow completes within 60 seconds
- Calendar sync runs every 15 minutes with <200ms processing time per provider
- Confirmed bookings appear in Google Calendar within 2 minutes
- Sync failures logged and retried (max 3 attempts)

**Integrations:**
- Google Calendar API v3

---

#### R-CALENDAR-003: Availability Validation During Booking
**Priority:** P0
**User Stories:** BS-002

**Requirements:**
- System SHALL perform atomic availability check during booking creation
- System SHALL verify:
  - Selected time slot is AVAILABLE (not BOOKED or BLOCKED)
  - Slot is within provider's service hours
  - Slot is not in the past
  - Slot hasn't been booked by another customer (race condition check)
- System SHALL use database transaction with row-level locking to prevent double booking
- System SHALL return SLOT_CONFLICT error if validation fails
- Upon successful booking, slot status SHALL change to BOOKED immediately

**Acceptance Criteria:**
- Availability check completes within 200ms
- Zero double bookings (atomic transaction enforcement)
- Clear error message when slot unavailable
- Real-time availability updates in UI

---

### Module 7: Admin Dashboard & Analytics

#### R-ADMIN-001: Provider KYC Review Dashboard
**Priority:** P0
**User Stories:** PS-001

**Requirements:**
- Admin SHALL see pending provider applications in queue
- Dashboard SHALL display:
  - Provider name, email, phone
  - Submission date
  - Days pending
  - Quick preview of documents
- Admin SHALL be able to:
  - View full application (documents, profile, portfolio)
  - Approve with one click
  - Reject with reason code and message
  - Request additional information
- System SHALL display approval metrics:
  - Total pending
  - Average review time
  - Approval rate %
  - Rejection reasons breakdown
- System SHALL support bulk actions (approve/reject multiple)

**Acceptance Criteria:**
- Queue loads within 2 seconds
- Document viewer supports PDF and images
- Approval/rejection processes within 2 seconds with notification sent
- Metrics updated in real-time

---

#### R-ADMIN-002: Booking Monitoring Dashboard
**Priority:** P0
**User Stories:** Admin workflow

**Requirements:**
- Admin SHALL see real-time booking feed with:
  - Booking ID, status, customer, provider, service, date/time
  - Status color coding (PENDING yellow, CONFIRMED green, COMPLETED blue, CANCELLED red)
  - Filters: status, date range, provider, customer, service category
- Admin SHALL be able to:
  - View booking details
  - Contact customer or provider
  - Manually cancel/reschedule booking (with reason)
  - Escalate to dispute
- Dashboard SHALL display KPIs:
  - Total bookings today/this week/this month
  - Booking status distribution (pie chart)
  - Average booking value
  - Cancellation rate %
  - Provider acceptance rate %

**Acceptance Criteria:**
- Real-time updates via WebSocket or 30-second polling
- Filters apply instantly (<500ms)
- Booking details modal loads within 1 second
- Export bookings as CSV

---

#### R-ADMIN-003: Financial Dashboard
**Priority:** P0
**User Stories:** Admin workflow

**Requirements:**
- Admin SHALL view financial metrics:
  - **GMV (Gross Merchandise Value)**: Total booking value (daily/weekly/monthly)
  - **Platform Revenue**: GMV * Commission Rate (25-30%)
  - **Total Payouts**: Amount transferred to providers
  - **Net Revenue**: Platform Revenue - Refunds - Fees
  - **Commission Rate**: Average across all bookings
- Admin SHALL view payout batch history:
  - Batch ID, date processed, period covered, provider count, total amount, status
  - Drill-down to payout items per batch
- Admin SHALL see transaction status distribution (HELD/READY/RELEASED/REFUNDED/DISPUTED)
- Admin SHALL export financial reports as CSV (for accounting)
- Dashboard SHALL display charts:
  - GMV trend line (last 90 days)
  - Revenue breakdown by service category
  - Top 10 providers by earnings

**Acceptance Criteria:**
- Dashboard loads within 2 seconds
- Data accuracy matches database queries exactly
- CSV exports include all required fields for accounting
- Charts render within 1 second using Chart.js or D3.js

---

#### R-ADMIN-004: Dispute Resolution Dashboard
**Priority:** P1
**User Stories:** PS-008

**Requirements:**
- Admin SHALL see all open disputes in queue
- Dispute record SHALL include:
  - Dispute ID, booking ID, customer, provider
  - Dispute reason from customer
  - Provider response (if submitted)
  - Evidence: photos, messages, completion proof
  - Disputed amount
  - Status: OPEN, UNDER_REVIEW, RESOLVED
- Admin SHALL be able to:
  - Review all evidence
  - Contact customer and/or provider for clarification
  - Resolve in favor of customer (full refund)
  - Resolve in favor of provider (payment released)
  - Resolve partial (split payment)
  - Add resolution notes
- Upon resolution:
  - Disputed transaction status updated
  - Funds transferred/refunded accordingly
  - Both parties notified with resolution details
  - Dispute closed with outcome logged
- System SHALL track dispute metrics:
  - Total disputes
  - Dispute rate % (disputes / completed bookings)
  - Average resolution time
  - Resolution outcomes distribution
- System SHALL flag providers with dispute rate >3 per 100 bookings for review

**Acceptance Criteria:**
- Dispute resolution completes within 7 business days (SLA)
- All actions logged in audit_logs
- Notifications sent within 1 hour of resolution
- Target dispute rate <2% platform-wide (PRD KPI)

---

#### R-ADMIN-005: Platform Analytics Dashboard
**Priority:** P0
**User Stories:** Admin workflow

**Requirements:**
- Admin SHALL view platform KPIs (aligned with PRD goals):
  - **Average booking completion time**: Target <3 minutes
  - **Dispute rate**: Target <2%
  - **Provider NPS**: Target >60 (quarterly survey)
  - **Repeat booking rate**: Target >40% by Month 6
  - **Monthly GMV**: Target >$50K USD by Month 6
- Admin SHALL view growth metrics:
  - Total registered users (customers)
  - Total active providers
  - New registrations (daily/weekly/monthly)
  - User retention rate (cohort analysis)
  - Provider retention rate
- Admin SHALL view engagement metrics:
  - Bookings per customer (average)
  - Services per provider (average)
  - Search-to-booking conversion rate
  - Favorite/rebooking usage rate
- Admin SHALL view operational metrics:
  - Provider response rate (average)
  - On-time arrival rate (average)
  - Average service rating
  - Cancellation rate by actor (customer vs provider)
- Dashboard SHALL support date range selection and comparison (e.g., this month vs last month)
- System SHALL calculate cohort retention: % of customers who book again in Month 2, 3, 6

**Acceptance Criteria:**
- Dashboard loads within 3 seconds
- All metrics calculated accurately from database
- Charts interactive with tooltips and legends
- Export capability for all reports
- Real-time updates for live metrics (GMV, bookings)

---

#### R-ADMIN-006: Audit Log Access
**Priority:** P1
**User Stories:** Admin workflow

**Requirements:**
- System SHALL log all critical actions to audit_logs table:
  - User authentication (login, logout, OTP requests)
  - Provider approval/rejection
  - Booking creation, acceptance, completion, cancellation
  - Payment transactions
  - Payout batch processing
  - Dispute creation and resolution
  - Admin actions (manual overrides, edits)
- Audit log SHALL capture:
  - actor_id (user who performed action)
  - action (enum: LOGIN, APPROVE_PROVIDER, CREATE_BOOKING, etc.)
  - entity (type and ID, e.g., booking#123)
  - metadata (JSON: before/after state, reason codes, IP address)
  - timestamp
- Admin SHALL search audit logs by:
  - Date range
  - Actor (user ID)
  - Action type
  - Entity type/ID
- Audit logs SHALL be immutable (append-only)
- System SHALL retain audit logs for minimum 24 months (compliance requirement)

**Acceptance Criteria:**
- All P0 actions logged with <10ms overhead
- Search returns results within 2 seconds (indexed queries)
- Log entries include sufficient context for forensic analysis
- Logs exportable as CSV with filters applied

---

### Module 8: Notifications & Communications

#### R-NOTIF-001: Multi-Channel Notification System
**Priority:** P0
**User Stories:** CS-002, BS-003, PS-003

**Requirements:**
- System SHALL support notification channels:
  - Push notifications (via Firebase Cloud Messaging)
  - SMS (via Twilio)
  - Email (via AWS SES)
  - LINE Messaging API (for Thai users)
- Users SHALL configure notification preferences:
  - Preferred channels per notification type
  - Language preference (Thai/English)
  - Quiet hours (optional, 10pm-8am no notifications)
- System SHALL send notifications for events:
  - **Booking flow**: request received, accepted, rejected, timeout, confirmed, reminder (24h), completed
  - **Payments**: payment success, payment failure, refund processed
  - **Reviews**: review received (provider), review published (customer)
  - **Payouts**: batch processed, payout completed, payout failed
  - **Disputes**: dispute opened, resolution reached
  - **Account**: OTP codes, password reset, profile approved
- Notifications SHALL be delivered within 30 seconds of event trigger
- System SHALL retry failed notifications (max 3 attempts, exponential backoff)
- System SHALL track delivery status (sent, delivered, failed, opened)

**Acceptance Criteria:**
- 99% delivery success rate for critical notifications (booking, payment)
- Notifications delivered within 30 seconds
- Thai language notifications use proper cultural formatting (politeness particles)
- Push notifications deep-link to relevant app screen

**Integrations:**
- Firebase Cloud Messaging for push
- Twilio for SMS
- AWS SES for email
- LINE Messaging API for LINE notifications

---

#### R-NOTIF-002: In-App Notification Center
**Priority:** P1
**User Stories:** CS-001

**Requirements:**
- App SHALL display notification center with badge count
- Notifications SHALL be grouped by role (client/provider) if dual role
- Notification SHALL display:
  - Icon (based on type)
  - Title and body
  - Timestamp (relative: "2 hours ago")
  - Read/unread status
  - Deep-link action
- User SHALL be able to:
  - Mark as read/unread
  - Clear individual notifications
  - Clear all notifications
- System SHALL auto-mark notifications as read when user views related entity (e.g., views booking)
- Notifications SHALL be retained for 30 days

**Acceptance Criteria:**
- Notification center loads within 1 second
- Badge count updates in real-time
- Pagination for >50 notifications
- Deep-links work correctly for all notification types

---

#### R-NOTIF-003: WhatsApp/LINE Direct Communication
**Priority:** P0
**User Stories:** BS-003

**Requirements:**
- App SHALL provide "Contact Provider" button in confirmed booking details
- Button SHALL deep-link to WhatsApp or LINE with:
  - Pre-filled recipient (provider's registered phone/LINE ID)
  - Pre-filled message template: "Hi [Provider Name], I'm [Customer Name]. I have a booking with you on [Date] at [Time] for [Service]. [Booking ID: #123]"
- Provider profile SHALL display communication preference badge (WhatsApp/LINE/Both)
- System SHALL NOT build in-app messaging (using external platforms reduces complexity)

**Acceptance Criteria:**
- Contact button opens WhatsApp/LINE app on mobile (<2 seconds)
- Message template includes all relevant booking info
- Provider phone/LINE ID correctly formatted for deep-link

---

### Module 9: Content Management

#### R-CMS-001: Service Catalog Management
**Priority:** P0
**User Stories:** Admin workflow

**Requirements:**
- Admin SHALL manage service catalog via Sanity CMS:
  - Service categories (Beauty, Pet Care, Cleaning)
  - Service types within categories (Gel Nails, Dog Grooming, etc.)
  - Service descriptions (Thai and English)
  - Base pricing
  - Duration estimates
  - Required certifications
  - Service images
- Service catalog SHALL sync to app via Sanity API
- System SHALL cache catalog data in Redis (1-hour TTL)
- Admin SHALL be able to:
  - Create/edit/archive services
  - Reorder service display
  - Set featured services
  - Bulk import services via CSV

**Acceptance Criteria:**
- Catalog changes appear in app within 5 minutes (cache refresh)
- Supports Thai and English localization
- Image assets served via Sanity CDN (<1s load)
- API queries <100ms via caching

**Integrations:**
- Sanity CMS for content management
- Sanity Content API for data retrieval

---

#### R-CMS-002: Dynamic Content Pages
**Priority:** P1
**User Stories:** Marketing/SEO

**Requirements:**
- Admin SHALL create content pages in Sanity:
  - FAQ
  - Terms of Service
  - Privacy Policy
  - Safety Guidelines
  - About Us
  - Blog posts
- Pages SHALL support rich text formatting (headings, lists, images, links)
- Pages SHALL be SEO-optimized (meta titles, descriptions, slugs)
- System SHALL render pages server-side for SEO (SSR/SSG)
- Content SHALL be localizable (Thai/English)

**Acceptance Criteria:**
- Pages load within 2 seconds
- Content editable by non-technical admins
- Mobile-responsive layout
- Indexed by search engines

**Integrations:**
- Sanity CMS for content authoring
- Next.js or similar for SSR/SSG rendering

---

---

## 4. Key Performance Indicators (KPIs)

### 4.1 Business KPIs (from PRD)

| KPI | Target | Measurement Method | Owner |
|-----|--------|-------------------|-------|
| **Average Booking Completion Time** | <3 minutes | Tracked via analytics: time from service selection to payment confirmation | Product |
| **Dispute Rate** | <2% | (Total disputes / Total completed bookings) * 100 | Operations |
| **Provider NPS** | >60 | Quarterly survey sent to active providers | Operations |
| **Repeat Booking Rate** | >40% by Month 6 | (Customers with 2+ bookings / Total customers) * 100 | Product |
| **Monthly GMV** | >$50K USD by Month 6 | Sum of all booking gross values per month | Finance |
| **Customer Acquisition Cost (CAC)** | <$10 | Marketing spend / New customers acquired | Marketing |
| **Customer Lifetime Value (LTV)** | >$150 | Average revenue per customer over 3 months | Finance |
| **LTV/CAC Ratio** | >15:1 | LTV / CAC | Finance |
| **Platform Revenue** | 30% of GMV | GMV * Commission Rate (25-30%) | Finance |
| **Provider Retention** | >80% | % of providers active after 6 months | Operations |

### 4.2 Technical KPIs

| KPI | Target | Measurement Method | Owner |
|-----|--------|-------------------|-------|
| **API Response Time (p95)** | <300ms | Server-side logging and APM (Application Performance Monitoring) | Engineering |
| **App Load Time (4G)** | <2 seconds | Google Lighthouse, Synthetic monitoring | Engineering |
| **Notification Delivery Time** | <30 seconds | Event trigger to delivery timestamp | Engineering |
| **Platform Uptime** | 99.5% | Uptime monitoring (UptimeRobot, Pingdom) | DevOps |
| **Payment Success Rate** | >98% | (Successful payments / Total payment attempts) * 100 | Engineering |
| **Search Results Load Time** | <1.5 seconds | Client-side performance monitoring | Engineering |
| **Payout Batch Processing Time** | <30 minutes | Batch start to completion timestamp for 10K transactions | Engineering |
| **Zero Double Bookings** | 100% accuracy | Atomic transaction enforcement, monitored via audit logs | Engineering |

### 4.3 Operational KPIs

| KPI | Target | Measurement Method | Owner |
|-----|--------|-------------------|-------|
| **Provider KYC Approval Time** | 24-48 hours | Submission timestamp to approval/rejection timestamp | Operations |
| **Provider Response Rate** | >90% | (Bookings accepted within 30 min / Total booking requests) * 100 | Operations |
| **On-Time Arrival Rate** | >95% | Provider-reported arrival time vs scheduled time | Operations |
| **Cancellation Rate (Customer)** | <10% | (Cancelled bookings by customers / Total bookings) * 100 | Operations |
| **Cancellation Rate (Provider)** | <5% | (Cancelled bookings by providers / Total bookings) * 100 | Operations |
| **Average Rating** | >4.5 | Weighted average of all provider ratings | Operations |
| **Dispute Resolution Time** | <7 business days | Dispute creation to resolution timestamp | Operations |

---

## 5. Third-Party Integrations

### 5.1 Payment Processing

#### Stripe
**Purpose:** International credit/debit card payments
**Integration Points:**
- Payment Intents API for escrow authorization
- Webhooks for payment status updates (payment_intent.succeeded, payment_intent.failed)
- Payouts API for weekly batch transfers to provider bank accounts
- 3D Secure / SCA compliance for European cards

**Configuration:**
- API Keys: Secret Key (server), Publishable Key (client)
- Webhook endpoint: `POST /api/webhooks/stripe`
- Webhook signing secret for verification
- Test mode for development/staging

**Data Flow:**
1. Customer submits payment → Frontend creates Payment Intent via backend
2. Backend calls Stripe API: `POST /v1/payment_intents` with booking metadata
3. Frontend confirms payment (with 3DS if required) via Stripe.js
4. Stripe webhook notifies backend of payment success/failure
5. Backend updates transaction status and booking status

**Security Requirements:**
- PCI-DSS Level 1 compliance (Stripe handles card data, never touches our servers)
- Webhook signature verification using signing secret
- API keys stored in environment variables, never in code
- HTTPS required for all API calls

---

#### Omise
**Purpose:** Thai payment methods (PromptPay, Thai bank cards, mobile banking)
**Integration Points:**
- Charges API for payment processing
- Webhooks for payment confirmations
- Transfers API for payouts to Thai bank accounts

**Configuration:**
- Public Key (client-side tokenization)
- Secret Key (server-side API calls)
- Webhook endpoint: `POST /api/webhooks/omise`

**Supported Payment Methods:**
- PromptPay (QR code and mobile number)
- Credit/debit cards (Thai and international)
- Internet banking (SCB, Kbank, Bangkok Bank, etc.)

**Data Flow:**
- Similar to Stripe flow but optimized for Thai banking infrastructure
- PromptPay: Generate QR code → Customer scans via banking app → Webhook confirms payment

---

### 5.2 Mapping & Geolocation

#### Mapbox (Primary)
**Purpose:** Maps, geocoding, distance calculations, routing
**Integration Points:**
- Geocoding API: Convert addresses to coordinates
- Distance API: Calculate distance between customer and provider
- Static Maps API: Generate map previews for bookings
- Directions API: Route optimization for providers (PS-007)

**Configuration:**
- Access Token (public for frontend, secret for backend)
- SDK: Mapbox GL JS for interactive maps

**Usage:**
- Provider search ranking (distance calculation)
- Service location map preview in booking flow
- Provider route optimization dashboard

**Rate Limits:**
- 100,000 free requests/month (sufficient for MVP)
- Caching: Store coordinates for frequent addresses to reduce API calls

**Fallback:** Google Maps API (if Mapbox issues)

---

#### Google Maps API (Alternative/Fallback)
**Purpose:** Geocoding, Distance Matrix, Calendar integration
**Integration Points:**
- Geocoding API
- Distance Matrix API
- Places API (autocomplete for address entry)

**Configuration:**
- API Key with restricted domains
- Billing account enabled (pay-as-you-go after free tier)

**Rate Limits:**
- $200 free credit/month
- Cost: ~$0.005 per geocoding request, $0.005-0.010 per distance matrix request

---

### 5.3 Notifications & Communications

#### Firebase Cloud Messaging (FCM)
**Purpose:** Push notifications for iOS, Android, and Web
**Integration Points:**
- Admin SDK for server-side notification sending
- Client SDK for receiving notifications

**Configuration:**
- Firebase project with Cloud Messaging enabled
- Server key for authentication
- Client-side registration tokens per device

**Notification Types:**
- Booking updates (request, acceptance, completion)
- Payment confirmations
- Review notifications
- Payout confirmations

**Features:**
- Topic-based messaging (e.g., all providers in Bangkok)
- Direct device messaging
- Rich notifications with images and actions
- Deep-linking to app screens

**Rate Limits:**
- No hard limits, but recommended batch size: 500 devices per request

---

#### Twilio
**Purpose:** SMS for OTP codes, critical notifications, fallback
**Integration Points:**
- Programmable SMS API
- Verify API for OTP delivery and validation

**Configuration:**
- Account SID and Auth Token
- Twilio phone number (Thai +66 number for local SMS)
- Webhook for delivery status (optional)

**Use Cases:**
- OTP codes for registration/login
- Booking request notifications (if push fails or disabled)
- Payment confirmations
- Critical alerts

**Pricing:**
- ~$0.07 per SMS in Thailand
- Budget: ~$500/month for 7,000 SMS (MVP scale)

---

#### AWS SES (Simple Email Service)
**Purpose:** Transactional emails
**Integration Points:**
- SMTP endpoint or SDK for sending emails
- Email templates with HTML rendering

**Configuration:**
- SMTP credentials or IAM role
- Verified sender domain (e.g., noreply@veyya.com)
- Bounce/complaint handling via SNS

**Email Types:**
- OTP codes (backup to SMS)
- Booking confirmations with calendar attachments
- Payout notifications with CSV reports
- Weekly/monthly summaries
- Password reset (if implemented)

**Rate Limits:**
- 50,000 free emails/month (AWS Free Tier)
- $0.10 per 1,000 emails after free tier

---

#### LINE Messaging API
**Purpose:** Notifications via LINE (popular in Thailand)
**Integration Points:**
- Messaging API for sending messages to users
- LINE Login for account linking (optional)

**Configuration:**
- Channel Access Token
- User IDs (obtained when user follows Veyya LINE Official Account)

**Features:**
- Rich message cards with images and buttons
- Preferred by Thai users over SMS
- Higher open rates than email

**Requirements:**
- Users must follow Veyya LINE Official Account
- Collect LINE User ID during registration/profile setup

**Pricing:**
- Free tier: 500 messages/month
- Pay-as-you-go: ~$0.03 per message

---

### 5.4 Calendar Integration

#### Google Calendar API
**Purpose:** Provider availability sync
**Integration Points:**
- OAuth 2.0 for user authorization
- Events API: Read user's calendar, create/update events

**Configuration:**
- OAuth Client ID and Secret
- Redirect URI for OAuth callback
- Scopes: `https://www.googleapis.com/auth/calendar.readonly`, `https://www.googleapis.com/auth/calendar.events`

**Data Flow (R-CALENDAR-002):**
1. Provider clicks "Connect Google Calendar"
2. OAuth flow redirects to Google consent screen
3. User grants permissions → Redirect back with authorization code
4. Backend exchanges code for access/refresh tokens
5. Store encrypted tokens in database
6. Background job: Every 15 minutes, fetch busy times from Google Calendar
7. Mark busy times as unavailable in Veyya calendar
8. On booking confirmation: Create event in Google Calendar

**Security:**
- Refresh tokens stored encrypted
- Access tokens refreshed automatically before expiry
- Users can revoke access anytime

**Rate Limits:**
- 1,000,000 queries/day (more than sufficient)
- Batch requests for efficiency

---

### 5.5 Content Management System

#### Sanity CMS
**Purpose:** Service catalog, dynamic content pages, localization
**Integration Points:**
- Content API (GraphQL or REST) for data retrieval
- Sanity Studio for admin content editing

**Configuration:**
- Project ID and Dataset (production/staging)
- API token for server-side queries
- CDN endpoint for images

**Content Types:**
- Service categories and services
- Blog posts
- Static pages (FAQ, Terms, Privacy)
- Promotional banners
- Help articles

**Features:**
- Real-time collaboration for content editors
- Version history
- Localization (Thai/English content variants)
- Image optimization and CDN delivery

**Data Flow:**
1. Admin edits content in Sanity Studio
2. Changes published to Sanity dataset
3. Backend fetches updated content via API
4. Redis cache invalidated and refreshed
5. App displays updated content

**Pricing:**
- Free tier: 3 users, 2 datasets (dev/prod)
- ~$99/month for team plan if scaling

---

### 5.6 Analytics & Monitoring

#### Mixpanel
**Purpose:** Product analytics, user behavior tracking, funnels
**Integration Points:**
- Client-side SDK for event tracking
- Server-side API for backend events

**Tracked Events:**
- User registration, login
- Service search, provider view, booking creation
- Payment success/failure
- Booking acceptance, completion
- Review submission
- Provider earnings views

**Key Metrics:**
- Booking funnel: Search → Provider View → Booking → Payment → Confirmation
- Drop-off points identification
- Cohort analysis for retention
- A/B test results (if running experiments)

**Configuration:**
- Project Token for client SDK
- API Secret for server events

**Pricing:**
- Free tier: 100K monthly tracked users (sufficient for MVP)

---

#### Google Analytics 4 (GA4)
**Purpose:** Web traffic analytics, SEO tracking
**Integration Points:**
- GA4 tracking code in web app
- Enhanced ecommerce tracking for bookings

**Tracked Data:**
- Page views, session duration
- Traffic sources (organic, paid, referral)
- Conversion rate (visitor to booking)
- Ecommerce events (add_to_cart → booking, purchase → completed booking)

**Configuration:**
- Measurement ID in app
- Google Tag Manager for event tracking

---

#### Sentry
**Purpose:** Error tracking and performance monitoring
**Integration Points:**
- Client SDK for frontend errors
- Server SDK for backend errors

**Features:**
- Real-time error alerts
- Stack traces and debugging context
- Performance monitoring (slow API calls, database queries)
- Release tracking

**Configuration:**
- DSN (Data Source Name) for project
- Environment tags (dev/staging/production)

**Pricing:**
- Free tier: 5,000 events/month
- ~$26/month for 50K events

---

#### LogRocket (Optional)
**Purpose:** Session replay and frontend monitoring
**Features:**
- Session recordings to debug user issues
- Console logs, network requests
- Performance metrics

**Use Case:** Debug complex user flows (e.g., payment failures, booking conflicts)

---

### 5.7 File Storage

#### AWS S3 or Firebase Storage
**Purpose:** Store user-uploaded files (IDs, certificates, photos)
**Integration Points:**
- S3 SDK or Firebase Admin SDK for server-side uploads
- Signed URLs for secure client-side uploads (optional)

**File Types:**
- Provider KYC documents (PDFs, images)
- Portfolio photos
- Completion proof photos
- Review photos

**Storage Structure:**
```
/providers/{provider_id}/kyc/{document_type}_{timestamp}.pdf
/providers/{provider_id}/portfolio/{photo_id}.jpg
/bookings/{booking_id}/completion/{photo_id}.jpg
/reviews/{review_id}/{photo_id}.jpg
```

**Security:**
- Private buckets with signed URL access
- Encryption at rest (AES-256)
- EXIF metadata stripping for privacy
- Virus scanning for uploads (AWS Lambda + ClamAV or similar)

**Pricing (S3):**
- $0.023 per GB/month for storage
- ~$500/month for 20TB storage + transfers at scale

**CDN:** CloudFront (AWS) or Firebase CDN for fast global delivery

---

### 5.8 Database & Caching

#### PostgreSQL (OLTP)
**Purpose:** Primary transactional database
**Hosting:** AWS RDS, Google Cloud SQL, or self-hosted
**Schema:** See `documents/data-model/09_Data_Model.md`

**Configuration:**
- Connection pooling (PgBouncer or built-in)
- Read replicas for analytics queries
- Automated backups (daily snapshots, 30-day retention)
- Point-in-time recovery enabled

**Performance:**
- Indexes on high-query columns (booking status, provider rating, etc.)
- Partitioning for large tables (bookings, transactions) by date

---

#### Redis
**Purpose:** Caching, session storage, rate limiting
**Hosting:** AWS ElastiCache, Redis Cloud, or self-hosted

**Use Cases:**
- Session tokens (JWT blacklist for logout)
- Provider availability cache (15-minute TTL)
- Service catalog cache (1-hour TTL)
- Rate limiting (OTP requests, API calls)
- Real-time leaderboards (top providers)

**Configuration:**
- Persistence: RDB snapshots + AOF for durability
- Memory: ~2GB for MVP scale

---

### 5.9 Infrastructure & DevOps

#### Hosting Options
**Option A: AWS (Recommended)**
- **Compute:** ECS Fargate or EC2 for backend APIs
- **Database:** RDS PostgreSQL
- **Cache:** ElastiCache Redis
- **Storage:** S3 + CloudFront
- **Monitoring:** CloudWatch

**Option B: Google Cloud Platform**
- **Compute:** Cloud Run or GKE
- **Database:** Cloud SQL PostgreSQL
- **Cache:** Memorystore Redis
- **Storage:** Cloud Storage + Cloud CDN

**Option C: Render.com (Simpler for MVP)**
- Managed Node.js hosting
- Managed PostgreSQL
- Managed Redis
- Built-in CI/CD
- Lower complexity, higher cost per unit

**Recommendation:** Start with Render for MVP (<$500/month), migrate to AWS/GCP when scaling

---

#### CI/CD
**Tools:** GitHub Actions, GitLab CI, or CircleCI
**Pipeline:**
1. Code push to GitHub
2. Run tests (unit, integration, E2E)
3. Build Docker images
4. Deploy to staging environment
5. Run smoke tests
6. Manual approval for production deploy
7. Deploy to production with zero-downtime (blue-green or rolling)

---

## 6. Security & Compliance

### 6.1 Authentication & Authorization

#### R-SEC-001: Secure Authentication
- JWT tokens with 24-hour expiry, refresh tokens for extended sessions
- OTP codes with 5-minute expiry, rate-limited to 3 attempts per 15 minutes
- Password hashing (if passwords used): bcrypt with cost factor 12
- Session invalidation on logout (JWT blacklist in Redis)
- Device fingerprinting for suspicious login detection

---

#### R-SEC-002: Role-Based Access Control (RBAC)
- Roles: Customer, Provider, Admin (sub-roles: Operations, Finance, Support)
- API endpoints protected by role middleware
- Admin portal requires admin role + email verification
- Provider-only endpoints verify provider status (APPROVED)
- Fine-grained permissions (e.g., Finance Admin can view payouts but not approve providers)

---

#### R-SEC-003: API Security
- HTTPS required for all API calls (TLS 1.2+)
- API rate limiting: 100 requests/minute per user, 1000/minute per IP
- CORS: Whitelist only app domains
- Input validation on all endpoints (sanitize SQL injection, XSS)
- Idempotency keys for POST/PUT requests to prevent duplicates
- Request signing for sensitive operations (e.g., payout batch)

---

### 6.2 Data Protection

#### R-SEC-004: Encryption
- **At Rest:** AES-256 encryption for database (RDS encryption), S3 encryption
- **In Transit:** HTTPS/TLS for all API traffic
- **Sensitive Fields:** Additional encryption for phone, email, bank account (application-level encryption before DB storage)
- **PCI-DSS:** Payment card data never stored on our servers (tokenized via Stripe/Omise)

---

#### R-SEC-005: PDPA Compliance (Thailand)
- Explicit opt-in consent for data collection during registration
- Privacy Policy and Terms displayed before sign-up
- Data retention: User data deleted upon account deletion request (30-day grace period)
- Data portability: Users can export their data as JSON/CSV
- Right to be forgotten: Users can request data deletion (compliance within 30 days)
- Cookie consent banner for web app (essential vs optional cookies)
- Data Processing Agreement (DPA) with third-party services (Stripe, Twilio, etc.)

---

#### R-SEC-006: EXIF Metadata Stripping
- All user-uploaded photos (portfolio, completion, reviews) processed to remove EXIF metadata (location, device info)
- Prevents accidental exposure of user location/device details
- Implemented via image processing library (Sharp, ImageMagick) on upload

---

### 6.3 Fraud Prevention

#### R-SEC-007: Payment Fraud Detection
- Stripe Radar enabled for credit card fraud detection
- Velocity checks: Max 3 payment attempts per hour per user
- Suspicious patterns: Multiple failed payments trigger account review
- Geolocation mismatch: Alert if payment card country differs from service location

---

#### R-SEC-008: Account Security
- Unusual login detection: New device, new location triggers email confirmation
- Account lockout after 5 failed login attempts (15-minute cooldown)
- Admin accounts require 2FA (TOTP via authenticator app)

---

### 6.4 Operational Security

#### R-SEC-009: Audit Logging
- All critical actions logged (authentication, bookings, payments, admin actions)
- Logs immutable (append-only)
- Log retention: 24 months minimum
- Logs include: timestamp, actor_id, action, entity, IP address, user agent
- Admin access logs reviewed monthly

---

#### R-SEC-010: Incident Response
- Security incident escalation process documented
- Data breach notification plan (notify users within 72 hours per PDPA)
- Regular security audits (quarterly penetration testing)
- Dependency scanning for vulnerabilities (Snyk, Dependabot)
- Bug bounty program (post-MVP, via HackerOne or Bugcrowd)

---

#### R-SEC-011: Backup & Disaster Recovery
- Database backups: Daily automated snapshots, 30-day retention
- Point-in-time recovery: Enabled for critical data
- Multi-region replication for disaster recovery (production only)
- Recovery Time Objective (RTO): 4 hours
- Recovery Point Objective (RPO): 1 hour (max data loss acceptable)

---

### 6.5 Compliance Summary

| Regulation | Applicable | Compliance Measures |
|------------|------------|---------------------|
| **Thailand PDPA** | Yes | Consent flows, data deletion, privacy policy, DPA with vendors |
| **GDPR** | Partial (expat users) | Data portability, right to erasure, cookie consent |
| **PCI-DSS** | Yes (via Stripe/Omise) | No card data stored, tokenization, secure transmission |
| **Thai Labor Law** | Yes (freelancers) | Independent contractor agreements, tax withholding (3-5%), no employment benefits |
| **Thai Revenue** | Yes (tax withholding) | Automated 3-5% withholding on provider payouts, annual tax reports |

---

## 7. Non-Functional Requirements Summary

### 7.1 Performance

| Metric | Requirement | Rationale |
|--------|-------------|-----------|
| API Response Time (p95) | <300ms | PRD constraint; ensures smooth user experience |
| App Load Time (4G) | <2 seconds | PRD constraint; critical for mobile users in Thailand |
| Search Results Load | <1.5 seconds | User story BS-001; fast discovery is key to conversion |
| Booking Flow Completion | <3 minutes | PRD KPI; minimize friction in booking process |
| Notification Delivery | <30 seconds | User stories BS-003, PS-003; real-time updates expected |
| Payout Batch Processing | <30 minutes (10K tx) | Scale requirement; weekly batches must complete reliably |

---

### 7.2 Scalability

| Dimension | MVP Target | 12-Month Target | Strategy |
|-----------|-----------|-----------------|----------|
| Concurrent Users | 500 | 5,000 | Horizontal scaling (load balancer + multiple API instances) |
| Providers | 100 | 1,000 | Database indexing, read replicas for analytics |
| Bookings/Month | 2,000 | 20,000 | Database partitioning by date, async processing |
| GMV/Month | $50K | $200K | Optimized payout batch processing |

---

### 7.3 Availability

- **Uptime SLA:** 99.5% (PRD constraint) = Max 3.6 hours downtime per month
- **Planned Maintenance:** Scheduled during low-traffic windows (2am-4am Bangkok time)
- **Monitoring:** Real-time uptime checks (1-minute intervals), alerting via PagerDuty/Opsgenie
- **Failover:** Multi-AZ database deployment, load balancer health checks

---

### 7.4 Reliability

- **Zero Double Bookings:** Atomic transactions with row-level locking (R-CALENDAR-003)
- **Payment Idempotency:** Prevent duplicate charges via Idempotency-Key (R-BOOKING-002)
- **Retry Logic:** Exponential backoff for external API failures (max 3 retries)
- **Error Handling:** Graceful degradation (e.g., if Mapbox fails, fall back to Google Maps; if push fails, send SMS)

---

### 7.5 Localization

- **Languages:** Thai (primary), English (secondary)
- **Currency:** THB (Thai Baht) displayed with proper formatting (฿1,234.56)
- **Date/Time:** Bangkok timezone (UTC+7), Thai Buddhist calendar option
- **Cultural Considerations:** Politeness particles in Thai notifications (ค่ะ/ครับ)
- **Right-to-Left Support:** Not required (Thai and English are LTR)

---

### 7.6 Usability

- **Mobile-First:** Responsive design optimized for 360px-414px screen widths
- **PWA Features:** Install prompt, offline mode for viewing past bookings, push notifications
- **Accessibility:** WCAG 2.1 Level AA compliance (color contrast, keyboard navigation, screen reader support)
- **Error Messages:** Clear, actionable, localized (e.g., "Payment failed. Please check your card details and try again.")
- **Loading States:** Skeleton screens for slow-loading content, progress indicators for multi-step flows

---

## 8. Development Phases & Prioritization

### Phase 1 (P0): MVP Core - Months 1-3

**Focus:** Minimum viable booking flow for Bangkok launch

**Features:**
- R-AUTH-001, R-AUTH-002, R-AUTH-003 (Authentication & Profiles)
- R-PROVIDER-001, R-PROVIDER-002 (Onboarding & KYC)
- R-DISCOVERY-001, R-DISCOVERY-002, R-DISCOVERY-003 (Discovery)
- R-BOOKING-001, R-BOOKING-002, R-BOOKING-003, R-BOOKING-004, R-BOOKING-005 (Booking Flow)
- R-ESCROW-001, R-ESCROW-002, R-ESCROW-003, R-ESCROW-004 (Payments & Payouts)
- R-CALENDAR-001, R-CALENDAR-002, R-CALENDAR-003 (Availability)
- R-REVIEW-001, R-REVIEW-002 (Ratings & Reviews)
- R-NOTIF-001, R-NOTIF-003 (Notifications)
- R-ADMIN-001, R-ADMIN-002, R-ADMIN-003, R-ADMIN-005 (Admin Dashboard)
- R-CMS-001 (Service Catalog)
- All security requirements (R-SEC-001 through R-SEC-011)

**Deliverable:** Functional app with 50 providers, 1,000 customers, $50K GMV/month

---

### Phase 2 (P1): Optimization - Months 4-6

**Focus:** Enhance user experience and retention

**Features:**
- R-BOOKING-006 (Cancellation & Rescheduling)
- R-PROVIDER-003 (Provider Profile Customization)
- R-REVIEW-003 (Provider Responses to Reviews)
- R-NOTIF-002 (In-App Notification Center)
- R-ADMIN-004 (Dispute Resolution)
- R-ADMIN-006 (Audit Log Access)
- R-CMS-002 (Dynamic Content Pages)
- Favorites & Rebooking (BS-004)
- Multi-Service Management (BS-006)
- Route Optimization (PS-007)

**Deliverable:** Improved retention, <2% dispute rate, >40% repeat booking rate

---

### Phase 3 (P2): Expansion - Months 7-10

**Focus:** Scale to new categories and markets

**Features:**
- Cleaning services category
- Loyalty program & referral system
- Corporate/B2B booking portal
- Singapore market launch (multi-currency support)
- Native iOS/Android apps (transition from PWA)

---

### Phase 4 (P3): Advanced Features - Months 11+

**Focus:** AI and automation

**Features:**
- AI-driven provider matching
- Predictive scheduling (proactive rebooking suggestions)
- Dynamic pricing based on demand
- Provider teams/franchise management
- Subscription bundles
- In-app messaging (replace WhatsApp/LINE)

---

## 9. Success Criteria & Launch Readiness

### MVP Launch Checklist

**Product:**
- [ ] All P0 user stories implemented and tested
- [ ] End-to-end booking flow functional (discover → book → pay → complete → review)
- [ ] Provider onboarding and payout working
- [ ] Admin dashboard operational

**Technical:**
- [ ] API response times <300ms (p95)
- [ ] App load time <2s on 4G
- [ ] Zero double bookings in stress testing
- [ ] Payment success rate >98%
- [ ] Uptime monitoring configured with 99.5% SLA

**Integrations:**
- [ ] Stripe/Omise payments live
- [ ] Mapbox/Google Maps working
- [ ] Firebase/Twilio notifications delivering <30s
- [ ] Google Calendar sync tested
- [ ] Sanity CMS content published

**Security:**
- [ ] HTTPS enforced, TLS 1.2+
- [ ] RBAC implemented and tested
- [ ] PDPA consent flows implemented
- [ ] Privacy Policy and Terms published
- [ ] Penetration test completed with no critical issues

**Operations:**
- [ ] 50 providers onboarded and approved
- [ ] 1,000 customers registered (waitlist conversion)
- [ ] Support team trained
- [ ] Incident response plan documented
- [ ] Backup and recovery tested

**Legal & Compliance:**
- [ ] Thailand OpCo entity registered
- [ ] Freelancer contractor agreements signed
- [ ] Tax withholding process automated (3-5%)
- [ ] Data Processing Agreements with vendors signed
- [ ] Insurance coverage in place (if applicable)

**Marketing:**
- [ ] Landing page live
- [ ] App Store / Play Store listings ready (post-PWA)
- [ ] Social media accounts active
- [ ] Launch PR/influencer partnerships confirmed

---

## 10. Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Payment gateway downtime** | High | Low | Dual integration (Stripe + Omise); retry logic; customer notification |
| **Provider low supply in MVP** | High | Medium | Pre-onboard 50 providers before launch; incentives for early adopters |
| **High dispute rate (>2%)** | Medium | Medium | Clear service standards; provider training; fast admin resolution |
| **Slow provider response rate** | Medium | Medium | 30-min timeout automation; push notification optimization; response rate visibility |
| **Security breach / data leak** | Critical | Low | Encryption, audit logs, penetration testing, incident response plan |
| **PDPA non-compliance** | High | Low | Legal review, consent flows, Data Protection Officer (DPO) appointment |
| **Double booking bug** | High | Low | Atomic transactions, extensive testing, monitoring |
| **Google Calendar API rate limit** | Low | Low | Caching, batch requests, graceful degradation to manual availability |
| **Scalability issues at 5x growth** | Medium | Medium | Horizontal scaling, database optimization, load testing |
| **Customer acquisition cost >$10** | Medium | Medium | Optimize marketing channels, referral program, organic growth via SEO |

---

## 11. Appendices

### Appendix A: API Endpoint Summary

See `documents/frd/04_Booking_API.md` for detailed API specifications.

**Base URL:** `https://api.veyya.com/v1`

**Key Endpoints:**
- `POST /auth/otp/send` - Send OTP
- `POST /auth/otp/verify` - Verify OTP and login
- `POST /providers` - Provider registration
- `GET /services` - List services (from Sanity CMS cache)
- `GET /providers/search` - Search providers with ranking
- `GET /providers/{id}` - Provider profile
- `POST /bookings/intents` - Create booking intent
- `POST /payments/intents` - Create payment intent
- `POST /bookings/{id}/accept` - Provider accept booking
- `POST /bookings/{id}/reject` - Provider reject booking
- `POST /bookings/{id}/complete` - Provider mark complete
- `POST /reviews` - Submit review
- `POST /payouts/batch/run` - Admin trigger payout batch (automated)
- `GET /providers/{id}/earnings` - Provider earnings dashboard

---

### Appendix B: Database Schema Summary

See `documents/data-model/09_Data_Model.md` for full schema.

**Key Tables:**
- `users` - All users (customers, providers, admins)
- `providers` - Provider-specific data
- `services` - Service catalog (synced from Sanity)
- `provider_services` - Provider-service associations with custom pricing
- `bookings` - All bookings with status
- `transactions` - Payment transactions with escrow status
- `reviews` - Customer reviews
- `payout_batches` - Weekly payout batches
- `payout_items` - Individual provider payouts within batch
- `availability_slots` - Provider availability
- `audit_logs` - Audit trail

---

### Appendix C: Error Codes

**Standard Format:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The selected time slot is no longer available.",
    "details": {
      "field": "time_slot",
      "value": "2025-10-20T09:00:00Z"
    }
  }
}
```

**Common Error Codes:**
- `VALIDATION_ERROR` - Input validation failed
- `SLOT_CONFLICT` - Booking slot unavailable
- `PAYMENT_REQUIRED` - Payment authorization failed
- `NOT_AUTHORIZED` - User lacks permission for action
- `ALREADY_PROCESSED` - Idempotency check: request already handled
- `STATE_CONFLICT` - Action invalid for current entity state (e.g., cancel completed booking)
- `NOT_FOUND` - Resource doesn't exist
- `RATE_LIMIT_EXCEEDED` - Too many requests

---

### Appendix D: Notification Templates

**Booking Request (Provider):**
```
🔔 New Booking Request!

Customer: [Name] (⭐ 4.8)
Service: [Service Name]
Date: [Date] at [Time]
Location: [Address]
Earnings: ฿[Net Amount] (after commission)

⏱️ Respond in 30 minutes

[Accept] [Reject]
```

**Booking Confirmed (Customer):**
```
✅ Booking Confirmed!

[Provider Name] will arrive at [Time] on [Date].

📍 Location: [Address]
📞 Contact: [WhatsApp/LINE button]

Need to reschedule? [Reschedule button]
```

---

## 12. Document Control

**Change Log:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-25 | Product Team | Initial FRD for MVP |

**Approval:**

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | [TBD] | [TBD] | [TBD] |
| Engineering Lead | [TBD] | [TBD] | [TBD] |
| Operations Lead | [TBD] | [TBD] | [TBD] |

---

**End of Document**
