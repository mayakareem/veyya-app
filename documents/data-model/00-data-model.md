# Veyya Logical Data Model

## Document Information

**Version:** 1.0
**Date:** 2025-10-25
**Status:** MVP Data Model Specification
**Database:** PostgreSQL 14+

**Related Documents:**
- FRD: `documents/frd/00-frd.md`
- System Architecture: `documents/data-model/03_System_Overview.md`
- API Specifications: `documents/frd/04_Booking_API.md`

---

## 1. Overview

This document defines the logical data model for Veyya's two-sided marketplace platform. The model supports:
- Multi-role user management (clients, providers, admins)
- Service catalog and provider offerings
- Booking lifecycle with escrow payments
- Review and rating system with weighted averages
- Weekly payout batch processing
- Calendar and availability management
- Comprehensive audit logging

**Design Principles:**
- Normalized to 3NF (Third Normal Form) to reduce redundancy
- Soft deletes via `deleted_at` timestamps (PDPA compliance)
- JSONB columns for flexible metadata and extensibility
- Optimized indexes for common query patterns
- Temporal data tracking (created_at, updated_at)
- Immutable audit logs (append-only)

---

## 2. Entity Relationship Diagram (ERD)

### 2.1 High-Level ERD (Text Format)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           VEYYA DATA MODEL                              │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│    users     │
│──────────────│
│ id (PK)      │
│ email        │
│ phone        │
│ name         │
│ role         │──────────┐
│ locale       │          │
│ created_at   │          │
└──────────────┘          │
       │                  │
       │ 1:1              │ 1:1
       │                  │
       ▼                  ▼
┌──────────────┐    ┌──────────────┐         ┌──────────────┐
│  providers   │    │   sessions   │         │  favorites   │
│──────────────│    │──────────────│         │──────────────│
│ user_id (PK) │    │ id (PK)      │         │ id (PK)      │
│ kyc_status   │    │ user_id (FK) │         │ user_id (FK) │
│ rating       │    │ token_hash   │         │ provider_id  │
│ response_rate│    │ expires_at   │         │ created_at   │
│ radius_km    │    └──────────────┘         └──────────────┘
│ bio          │
│ languages    │
└──────────────┘
       │
       │ 1:N
       ▼
┌──────────────────┐         ┌──────────────┐
│ provider_services│◄────────│  services    │
│──────────────────│  N:1    │──────────────│
│ id (PK)          │         │ id (PK)      │
│ provider_id (FK) │         │ category     │
│ service_id (FK)  │         │ title        │
│ price_override   │         │ base_price   │
│ active           │         │ duration_min │
└──────────────────┘         │ description  │
       │                     │ image_url    │
       │                     └──────────────┘
       │ 1:N                        │
       │                            │ managed in
       │                            │ Sanity CMS
       ▼                            ▼
┌──────────────┐             (External)
│   bookings   │
│──────────────│
│ id (PK)      │
│ client_id (FK) ──────► users.id
│ provider_id (FK) ─────► providers.user_id
│ service_id (FK) ───────► services.id
│ start_at     │
│ end_at       │
│ address      │
│ lat, lng     │
│ status       │
│ special_notes│
└──────────────┘
       │
       │ 1:1
       ▼
┌──────────────┐         ┌──────────────┐
│ transactions │         │   reviews    │
│──────────────│         │──────────────│
│ id (PK)      │         │ id (PK)      │
│ booking_id   │◄───1:1──│ booking_id   │
│ gross        │         │ rating       │
│ commission   │         │ comment      │
│ net          │         │ photos       │
│ status       │         │ moderated    │
│ gateway_ref  │         │ provider_resp│
└──────────────┘         └──────────────┘
       │
       │ N:1
       ▼
┌──────────────┐
│payout_batches│
│──────────────│
│ id (PK)      │
│ period_start │
│ period_end   │
│ total_net    │
│ status       │
└──────────────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│ payout_items │
│──────────────│
│ id (PK)      │
│ batch_id (FK)│
│ provider_id  │
│ amount_net   │
│ status       │
│ error_msg    │
└──────────────┘


┌──────────────────┐         ┌──────────────┐
│availability_slots│         │  audit_logs  │
│──────────────────│         │──────────────│
│ id (PK)          │         │ id (PK)      │
│ provider_id (FK) │         │ actor_id     │
│ start_at         │         │ action       │
│ end_at           │         │ entity_type  │
│ source           │         │ entity_id    │
│ status           │         │ metadata     │
│ google_event_id  │         │ ip_address   │
└──────────────────┘         │ created_at   │
                             └──────────────┘
                              (immutable)
```

### 2.2 Booking State Machine

```
┌──────────────────┐
│  Client Books    │
│  Service         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ PENDING_PROVIDER │ ◄─── Payment HELD (escrow)
│   (30 min max)   │
└────┬───┬─────────┘
     │   │
     │   └─────────► Timeout → Reassign or Cancel → HELD → REFUNDED
     │
     ▼
┌──────────────────┐
│    CONFIRMED     │ ◄─── Provider accepts
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    COMPLETED     │ ◄─── Provider marks complete
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ READY_FOR_PAYOUT │ ◄─── After review or +24h, HELD → READY
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│      PAID        │ ◄─── Weekly batch, READY → RELEASED
└──────────────────┘

Alternative flows:
- PENDING_PROVIDER → REJECTED → CANCELLED (refund)
- CONFIRMED → CANCELLED (by client/provider, policy applies)
- COMPLETED → DISPUTED → RESOLVED (admin mediation)
```

---

## 3. Entity Definitions

### 3.1 users

**Purpose:** Central user account for all roles (clients, providers, admins)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL, -- E.164 format: +66812345678
  name VARCHAR(255) NOT NULL,
  profile_photo_url TEXT,
  role VARCHAR(50) NOT NULL DEFAULT 'client',
    -- Enum: 'client', 'provider', 'admin'
  locale VARCHAR(5) DEFAULT 'th', -- 'th', 'en'
  notification_preferences JSONB DEFAULT '{"push": true, "sms": true, "email": true, "line": false}',
  preferred_channels JSONB DEFAULT '{"booking": ["push", "sms"], "payment": ["push", "email"]}',
  quiet_hours JSONB, -- {"start": "22:00", "end": "08:00"}
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE -- Soft delete for PDPA
);

-- Indexes
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_phone ON users(phone) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(role) WHERE deleted_at IS NULL;
```

**Key Fields:**
- `id`: UUID primary key for global uniqueness
- `email`, `phone`: Unique identifiers, encrypted at application level before storage
- `role`: Single role per user; dual role support via separate client/provider behavior flags
- `notification_preferences`: JSONB for flexible channel configuration
- `deleted_at`: Soft delete timestamp for PDPA compliance (right to erasure)

**Business Rules:**
- Email and phone must be unique across active users (WHERE deleted_at IS NULL)
- Password-less authentication via OTP (no password field)
- Users can switch between client and provider roles if `providers.user_id` exists

---

### 3.2 providers

**Purpose:** Provider-specific profile and performance metrics

```sql
CREATE TABLE providers (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  kyc_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    -- Enum: 'pending', 'approved', 'rejected', 'suspended'
  kyc_documents JSONB, -- URLs to ID, certificates in S3
  kyc_reviewed_by UUID REFERENCES users(id), -- Admin who reviewed
  kyc_reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,

  -- Profile
  bio TEXT,
  languages VARCHAR(50)[] DEFAULT ARRAY['th'], -- ['th', 'en']
  service_radius_km INTEGER DEFAULT 10,

  -- Performance Metrics (calculated)
  rating DECIMAL(3,2) DEFAULT 0.0, -- Weighted average, 0.00 to 5.00
  total_reviews INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  response_rate DECIMAL(5,2) DEFAULT 100.0, -- Percentage, 0.00 to 100.00
  on_time_rate DECIMAL(5,2) DEFAULT 100.0, -- Percentage

  -- Financial
  commission_rate DECIMAL(4,2) DEFAULT 30.0, -- 25.00 to 30.00 (percentage)
  bank_account_number VARCHAR(50),
  bank_name VARCHAR(100),
  bank_branch VARCHAR(100),

  -- Verification badges
  verified BOOLEAN DEFAULT FALSE, -- "Veyya Verified" badge
  family_friendly BOOLEAN DEFAULT FALSE,

  -- Portfolio
  portfolio_photos JSONB, -- Array of {url, caption, service_id}

  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_providers_kyc_status ON providers(kyc_status);
CREATE INDEX idx_providers_rating ON providers(rating DESC) WHERE kyc_status = 'approved';
CREATE INDEX idx_providers_verified ON providers(verified) WHERE kyc_status = 'approved';
```

**Key Fields:**
- `user_id`: Foreign key to users (1:1 relationship)
- `kyc_status`: Workflow state for admin approval
- `rating`: Weighted average using formula: `(recent_5 * 0.6) + (older * 0.4)`
- `response_rate`: `(accepted_within_30_min / total_requests) * 100`
- `commission_rate`: Percentage taken by platform (typically 25-30%)
- `verified`: Badge awarded when: profile 100% complete, 10+ bookings, 4.5+ rating, 95%+ response rate

**Business Rules:**
- Only providers with `kyc_status = 'approved'` appear in search results
- Rating recalculated on each new review (weighted formula)
- Response rate updated on each booking request (accept/reject/timeout)
- Bank details required before first payout

---

### 3.3 services

**Purpose:** Service catalog (synced from Sanity CMS)

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sanity_id VARCHAR(255) UNIQUE, -- Reference to Sanity document _id
  category VARCHAR(100) NOT NULL, -- 'beauty', 'pet_care', 'cleaning'
  subcategory VARCHAR(100), -- 'nails', 'hair', 'dog_grooming', etc.
  title JSONB NOT NULL, -- {"en": "Gel Nails", "th": "ทำเล็บเจล"}
  description JSONB, -- {"en": "...", "th": "..."}
  base_price INTEGER NOT NULL, -- In minor units (satang), e.g., 150000 = ฿1,500
  duration_minutes INTEGER NOT NULL,
  image_url TEXT,
  required_certifications TEXT[], -- Array of certification types
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_services_category ON services(category) WHERE active = TRUE;
CREATE INDEX idx_services_sanity ON services(sanity_id);
CREATE INDEX idx_services_featured ON services(featured, display_order) WHERE active = TRUE;
```

**Key Fields:**
- `sanity_id`: Link to Sanity CMS for content management
- `title`, `description`: JSONB for multi-language support
- `base_price`: Always in minor units (satang for THB) to avoid floating-point issues
- `duration_minutes`: Default service duration for scheduling

**Business Rules:**
- Service catalog managed in Sanity CMS, synced via API every hour
- Providers can override `base_price` via `provider_services` table
- Inactive services (`active = FALSE`) hidden from UI but preserved for historical bookings

---

### 3.4 provider_services

**Purpose:** Many-to-many relationship between providers and services with custom pricing

```sql
CREATE TABLE provider_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(user_id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  price_override INTEGER, -- In minor units; NULL = use base_price
  custom_description TEXT, -- Provider's personalized description
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(provider_id, service_id)
);

-- Indexes
CREATE INDEX idx_provider_services_provider ON provider_services(provider_id) WHERE active = TRUE;
CREATE INDEX idx_provider_services_service ON provider_services(service_id) WHERE active = TRUE;
```

**Key Fields:**
- `price_override`: Allows providers to set custom pricing (within ±30% of base_price, enforced in application logic)
- `active`: Providers can temporarily disable services without deleting record

**Business Rules:**
- Price override must be within platform-defined range (enforced in API layer)
- Providers must have relevant certifications for services (validated during onboarding)
- At least one active service required for provider to appear in search

---

### 3.5 bookings

**Purpose:** Core booking entity tracking service requests through lifecycle

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Parties
  client_id UUID NOT NULL REFERENCES users(id),
  provider_id UUID NOT NULL REFERENCES providers(user_id),
  service_id UUID NOT NULL REFERENCES services(id),

  -- Scheduling
  start_at TIMESTAMP WITH TIME ZONE NOT NULL,
  end_at TIMESTAMP WITH TIME ZONE NOT NULL,

  -- Location
  address TEXT NOT NULL,
  address_notes TEXT, -- Gate code, parking, etc.
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,

  -- Details
  special_notes TEXT, -- Client instructions
  household_notes TEXT, -- Saved household preferences (pets, kids, allergies)

  -- Status tracking
  status VARCHAR(50) NOT NULL DEFAULT 'pending_provider',
    -- Enum: 'pending_provider', 'confirmed', 'in_progress', 'completed',
    --       'cancelled', 'disputed', 'ready_for_payout', 'paid'

  -- Timestamps for state transitions
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,

  -- Cancellation handling
  cancelled_by UUID REFERENCES users(id),
  cancellation_reason VARCHAR(50), -- 'client_request', 'provider_unavailable', 'timeout', etc.
  cancellation_fee INTEGER, -- In minor units, if applicable

  -- Provider notes
  provider_notes TEXT, -- Added at acceptance or completion
  completion_proof JSONB, -- {photos: [urls], note: "..."}

  -- Derived fields
  duration_minutes INTEGER NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_bookings_client ON bookings(client_id);
CREATE INDEX idx_bookings_provider ON bookings(provider_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_start_at ON bookings(start_at);
CREATE INDEX idx_bookings_provider_status ON bookings(provider_id, status);
CREATE INDEX idx_bookings_date_range ON bookings(start_at, end_at);
```

**Key Fields:**
- `status`: Drives booking lifecycle and workflow logic
- `lat`, `lng`: Used for distance calculations in provider ranking
- `household_notes`: Persisted across bookings for same client (reusable)
- `completion_proof`: JSONB with photo URLs and notes from provider

**Business Rules:**
- `start_at` must be in the future (at booking creation)
- Duration calculated: `EXTRACT(EPOCH FROM (end_at - start_at)) / 60`
- Status transitions enforced in application layer (state machine)
- Cancelled bookings retain all data for dispute resolution and audit

---

### 3.6 transactions

**Purpose:** Financial tracking for escrow payments and payouts

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,

  -- Amounts (all in minor units)
  gross INTEGER NOT NULL, -- Total booking amount charged to client
  commission INTEGER NOT NULL, -- Platform fee (gross * commission_rate)
  tax_withholding INTEGER NOT NULL, -- Thai tax withholding (3-5%)
  net INTEGER NOT NULL, -- Amount to provider (gross - commission - tax)

  -- Calculation backup
  commission_rate DECIMAL(4,2) NOT NULL, -- Snapshot at booking time
  tax_rate DECIMAL(4,2) NOT NULL, -- Snapshot at booking time

  -- Payment gateway
  gateway VARCHAR(50) NOT NULL, -- 'stripe', 'omise'
  gateway_payment_id VARCHAR(255), -- Payment Intent ID from gateway
  gateway_payout_id VARCHAR(255), -- Payout ID when transferred to provider
  payment_method VARCHAR(50), -- 'card', 'promptpay', etc.

  -- Status tracking
  status VARCHAR(50) NOT NULL DEFAULT 'held',
    -- Enum: 'held', 'ready', 'released', 'refunded', 'disputed'

  -- Timestamps
  held_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ready_at TIMESTAMP WITH TIME ZONE, -- When eligible for payout
  released_at TIMESTAMP WITH TIME ZONE, -- When included in payout batch
  refunded_at TIMESTAMP WITH TIME ZONE,

  -- Refund tracking
  refund_amount INTEGER, -- In minor units
  refund_reason TEXT,

  -- Dispute tracking
  dispute_id UUID, -- Link to disputes table (future)
  disputed_at TIMESTAMP WITH TIME ZONE,
  dispute_resolved_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_booking ON transactions(booking_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_ready_at ON transactions(ready_at) WHERE status = 'ready';
CREATE INDEX idx_transactions_gateway_payment ON transactions(gateway_payment_id);
```

**Key Fields:**
- `gross`, `commission`, `tax_withholding`, `net`: Always in minor units (satang)
- `status`: Mirrors booking lifecycle for financial state
- `commission_rate`, `tax_rate`: Snapshots at booking time (immutable for that transaction)
- `gateway_payment_id`: Stripe Payment Intent ID or Omise Charge ID

**Business Rules:**
- `net = gross - commission - tax_withholding`
- Status transitions: `held → ready` (after review or +24h) → `released` (in payout batch)
- Transactions with `status = 'disputed'` excluded from payout batches
- Refunds processed via gateway API, status changes to `refunded`

**Calculations:**
```sql
-- Example: ฿1,500 booking with 30% commission and 5% tax
-- gross = 150000 (satang)
-- commission = 150000 * 0.30 = 45000
-- tax_withholding = 150000 * 0.05 = 7500
-- net = 150000 - 45000 - 7500 = 97500 (฿975)
```

---

### 3.7 reviews

**Purpose:** Customer reviews and ratings for completed bookings

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id), -- Always client
  provider_id UUID NOT NULL REFERENCES providers(user_id), -- For quick queries

  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  photos JSONB, -- Array of photo URLs from S3

  -- Moderation
  moderation_status VARCHAR(50) DEFAULT 'pending',
    -- Enum: 'pending', 'approved', 'rejected', 'flagged'
  moderated_by UUID REFERENCES users(id),
  moderated_at TIMESTAMP WITH TIME ZONE,
  moderation_notes TEXT,

  -- Provider response
  provider_response TEXT,
  provider_responded_at TIMESTAMP WITH TIME ZONE,
  response_moderation_status VARCHAR(50),

  -- Metadata
  helpful_count INTEGER DEFAULT 0, -- Users who found review helpful
  flagged_count INTEGER DEFAULT 0, -- Users who flagged as inappropriate

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_reviews_provider ON reviews(provider_id);
CREATE INDEX idx_reviews_booking ON reviews(booking_id);
CREATE INDEX idx_reviews_moderation ON reviews(moderation_status);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

**Key Fields:**
- `rating`: Integer 1-5 (not decimal for simplicity)
- `moderation_status`: Reviews enter queue before public display
- `provider_response`: Optional response from provider (also moderated)

**Business Rules:**
- One review per booking (enforced via UNIQUE constraint on booking_id)
- Reviews can only be submitted for bookings with `status = 'completed'`
- Rating contributes to provider's weighted average
- Photos automatically stripped of EXIF metadata on upload
- Auto-flagged if: rating 1-2, contains profanity, mentions competitor

**Weighted Rating Calculation:**
```sql
-- Weighted average: recent 5 reviews = 60%, older = 40%
WITH recent_reviews AS (
  SELECT rating
  FROM reviews
  WHERE provider_id = :provider_id AND moderation_status = 'approved'
  ORDER BY created_at DESC
  LIMIT 5
),
older_reviews AS (
  SELECT rating
  FROM reviews
  WHERE provider_id = :provider_id AND moderation_status = 'approved'
  ORDER BY created_at DESC
  OFFSET 5
)
SELECT
  (COALESCE(AVG(r.rating), 0) * 0.6 + COALESCE(AVG(o.rating), 0) * 0.4) AS weighted_rating
FROM recent_reviews r, older_reviews o;
```

---

### 3.8 payout_batches

**Purpose:** Weekly batch aggregation for provider payouts

```sql
CREATE TABLE payout_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Period covered
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,

  -- Aggregates
  total_net INTEGER NOT NULL, -- Sum of all payout_items.amount_net in minor units
  transaction_count INTEGER NOT NULL, -- Number of transactions included
  provider_count INTEGER NOT NULL, -- Number of providers paid

  -- Status tracking
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
    -- Enum: 'pending', 'processing', 'completed', 'failed'

  -- Processing
  initiated_by UUID REFERENCES users(id), -- Admin or automated job
  initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  failure_reason TEXT,

  -- Gateway
  gateway VARCHAR(50) NOT NULL, -- 'stripe', 'omise'
  gateway_batch_id VARCHAR(255), -- Batch ID from gateway if supported

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payout_batches_status ON payout_batches(status);
CREATE INDEX idx_payout_batches_period ON payout_batches(period_start, period_end);
```

**Key Fields:**
- `period_start`, `period_end`: Defines which transactions are included (Monday-Sunday)
- `total_net`: Sum validation (must match sum of payout_items)
- `status`: Batch processing state

**Business Rules:**
- Batches run every Monday at 00:00 UTC+7 for previous week's completed bookings
- Only transactions with `status = 'ready'` included
- Disputed transactions excluded
- Failed batches can be retried manually by admin

---

### 3.9 payout_items

**Purpose:** Individual provider payouts within a batch

```sql
CREATE TABLE payout_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES payout_batches(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(user_id),

  -- Amount
  amount_net INTEGER NOT NULL, -- Sum of all provider's transactions in minor units
  transaction_ids UUID[] NOT NULL, -- Array of transaction IDs included

  -- Bank details (snapshot at payout time)
  bank_account_number VARCHAR(50) NOT NULL,
  bank_name VARCHAR(100) NOT NULL,

  -- Gateway
  gateway_transfer_id VARCHAR(255), -- Transfer ID from Stripe/Omise

  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
    -- Enum: 'pending', 'processing', 'completed', 'failed'

  -- Timestamps
  processed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payout_items_batch ON payout_items(batch_id);
CREATE INDEX idx_payout_items_provider ON payout_items(provider_id);
CREATE INDEX idx_payout_items_status ON payout_items(status);
```

**Key Fields:**
- `transaction_ids`: Array of UUIDs linking back to transactions
- `bank_account_number`: Snapshot of provider's bank details at payout time
- `gateway_transfer_id`: Used for tracking and reconciliation

**Business Rules:**
- One payout_item per provider per batch
- Amount must equal sum of linked transaction.net values
- Bank details captured at payout time (immutable record even if provider changes bank)
- Failed items can be retried individually without reprocessing entire batch

---

### 3.10 availability_slots

**Purpose:** Provider availability for booking scheduling

```sql
CREATE TABLE availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(user_id) ON DELETE CASCADE,

  -- Time range
  start_at TIMESTAMP WITH TIME ZONE NOT NULL,
  end_at TIMESTAMP WITH TIME ZONE NOT NULL,

  -- Source tracking
  source VARCHAR(50) NOT NULL DEFAULT 'manual',
    -- Enum: 'manual', 'google_calendar', 'recurring'
  google_event_id VARCHAR(255), -- If synced from Google Calendar
  recurring_pattern_id UUID, -- If part of recurring schedule

  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'available',
    -- Enum: 'available', 'booked', 'blocked'
  booking_id UUID REFERENCES bookings(id), -- If status = 'booked'

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_availability_provider ON availability_slots(provider_id);
CREATE INDEX idx_availability_time_range ON availability_slots(provider_id, start_at, end_at);
CREATE INDEX idx_availability_status ON availability_slots(status);
CREATE INDEX idx_availability_google ON availability_slots(google_event_id) WHERE google_event_id IS NOT NULL;

-- Constraint to prevent overlapping availability for same provider
CREATE UNIQUE INDEX idx_availability_no_overlap
ON availability_slots(provider_id, tstzrange(start_at, end_at))
WHERE status != 'blocked';
```

**Key Fields:**
- `source`: Tracks whether slot created manually, synced from Google, or generated from recurring pattern
- `google_event_id`: Links to Google Calendar event for bidirectional sync
- `status`: Lifecycle of slot (available → booked when booking confirmed)

**Business Rules:**
- Overlapping slots for same provider not allowed (enforced via exclusion constraint with tstzrange)
- Google Calendar sync every 15 minutes: pull busy times, mark as `blocked`
- When booking confirmed, slot status changes to `booked` and `booking_id` populated
- Past slots automatically archived (deleted after 90 days)

**Recurring Pattern Generation:**
```sql
-- Example: Generate weekly availability Mon-Sat 9am-7pm for next 90 days
INSERT INTO availability_slots (provider_id, start_at, end_at, source, recurring_pattern_id)
SELECT
  :provider_id,
  day::date + interval '9 hours' AS start_at,
  day::date + interval '19 hours' AS end_at,
  'recurring',
  :pattern_id
FROM generate_series(
  NOW()::date,
  NOW()::date + interval '90 days',
  interval '1 day'
) AS day
WHERE EXTRACT(DOW FROM day) BETWEEN 1 AND 6; -- Mon=1, Sat=6
```

---

### 3.11 favorites

**Purpose:** Client's saved favorite providers for quick rebooking

```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(user_id) ON DELETE CASCADE,

  -- Metadata
  first_booking_id UUID REFERENCES bookings(id), -- First booking with this provider
  last_booking_at TIMESTAMP WITH TIME ZONE,
  total_bookings INTEGER DEFAULT 0,

  notes TEXT, -- Client's private notes about provider

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, provider_id)
);

-- Indexes
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_provider ON favorites(provider_id);
```

**Business Rules:**
- Favorites automatically suggested after 4-5 star review
- Used for proactive rebooking notifications
- Appears prominently in client's booking flow

---

### 3.12 sessions

**Purpose:** JWT token management and session tracking

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Token
  token_hash VARCHAR(255) UNIQUE NOT NULL, -- SHA-256 hash of JWT
  refresh_token_hash VARCHAR(255) UNIQUE, -- For token refresh

  -- Metadata
  device_type VARCHAR(50), -- 'mobile', 'desktop', 'tablet'
  device_id VARCHAR(255), -- Device fingerprint
  user_agent TEXT,
  ip_address INET,

  -- Expiry
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Logout tracking
  revoked_at TIMESTAMP WITH TIME ZONE, -- Manual logout

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token_hash);
CREATE INDEX idx_sessions_expires ON sessions(expires_at) WHERE revoked_at IS NULL;
```

**Business Rules:**
- Token expires after 24 hours (configurable)
- Refresh token extends session for 30 days
- Manual logout sets `revoked_at` (token blacklist)
- Old sessions cleaned up after expiry + 7 days

---

### 3.13 audit_logs

**Purpose:** Immutable audit trail for compliance and debugging

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Actor
  actor_id UUID REFERENCES users(id), -- NULL for system actions
  actor_role VARCHAR(50), -- Snapshot of role at action time

  -- Action
  action VARCHAR(100) NOT NULL,
    -- Examples: 'LOGIN', 'APPROVE_PROVIDER', 'CREATE_BOOKING',
    --           'ACCEPT_BOOKING', 'COMPLETE_BOOKING', 'SUBMIT_REVIEW',
    --           'PROCESS_PAYOUT', 'RESOLVE_DISPUTE'

  -- Entity affected
  entity_type VARCHAR(100), -- 'user', 'provider', 'booking', 'transaction', etc.
  entity_id UUID,

  -- Details
  metadata JSONB, -- Before/after state, reason codes, etc.

  -- Request context
  ip_address INET,
  user_agent TEXT,
  request_id UUID, -- For tracing

  -- Timestamp (immutable)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
```

**Key Fields:**
- `metadata`: JSONB for flexible event-specific data (before/after snapshots, reason codes)
- `request_id`: UUID for distributed tracing across microservices

**Business Rules:**
- Append-only table (no updates or deletes)
- Retention: 24 months minimum (compliance requirement)
- All P0 actions must be logged (authentication, bookings, payments, admin actions)
- Sensitive data (phone, email) masked in metadata

**Example Metadata:**
```json
{
  "before": {"kyc_status": "pending"},
  "after": {"kyc_status": "approved"},
  "reason": "All documents verified",
  "admin_notes": "Approved certificates valid"
}
```

---

## 4. Relationships Summary

### 4.1 One-to-One (1:1)
- `users` ↔ `providers` (via `providers.user_id`)
- `bookings` ↔ `transactions` (via `transactions.booking_id`)
- `bookings` ↔ `reviews` (via `reviews.booking_id`)

### 4.2 One-to-Many (1:N)
- `users` → `bookings` (as client)
- `providers` → `bookings` (as provider)
- `providers` → `provider_services`
- `services` → `provider_services`
- `providers` → `availability_slots`
- `payout_batches` → `payout_items`
- `users` → `favorites`
- `users` → `sessions`

### 4.3 Many-to-Many (M:N)
- `providers` ↔ `services` (via `provider_services` junction table)

---

## 5. Example Queries

### 5.1 Provider Search with Ranking

```sql
-- Search providers for a service within distance, ranked by algorithm
-- Algorithm: distance(40%) + rating(40%) + response_rate(20%)

WITH provider_candidates AS (
  SELECT
    p.user_id,
    u.name,
    p.rating,
    p.response_rate,
    p.service_radius_km,
    ps.price_override,
    s.base_price,
    -- Calculate distance using Haversine formula (simplified with PostGIS)
    ST_Distance(
      ST_MakePoint(:user_lng, :user_lat)::geography,
      ST_MakePoint(p.lng, p.lat)::geography
    ) / 1000 AS distance_km -- Convert meters to km
  FROM providers p
  JOIN users u ON p.user_id = u.id
  JOIN provider_services ps ON ps.provider_id = p.user_id
  JOIN services s ON ps.service_id = s.id
  WHERE
    p.kyc_status = 'approved'
    AND ps.active = TRUE
    AND ps.service_id = :service_id
    AND u.deleted_at IS NULL
)
SELECT
  user_id,
  name,
  rating,
  response_rate,
  distance_km,
  COALESCE(price_override, base_price) AS price,
  -- Ranking score calculation
  (
    (1 - (distance_km / 50.0)) * 0.40 +  -- Distance: normalize by max 50km
    (rating / 5.0) * 0.40 +              -- Rating: normalize to 0-1
    (response_rate / 100.0) * 0.20       -- Response rate: normalize to 0-1
  ) AS rank_score
FROM provider_candidates
WHERE distance_km <= service_radius_km -- Provider willing to travel
  AND distance_km <= :max_distance      -- User's filter (e.g., 10km)
  AND rating >= :min_rating             -- User's filter (e.g., 4.5)
ORDER BY rank_score DESC, rating DESC
LIMIT 20;
```

---

### 5.2 Check Slot Availability (Atomic)

```sql
-- Check if time slot is available for provider (used during booking creation)
-- Must run in transaction with row-level locking to prevent double booking

BEGIN;

-- Lock provider's availability slots for duration of transaction
SELECT id
FROM availability_slots
WHERE provider_id = :provider_id
  AND status = 'available'
  AND tstzrange(start_at, end_at) @> tstzrange(:booking_start, :booking_end)
FOR UPDATE;

-- If slot found, create booking and update slot
-- If no slot found, rollback

INSERT INTO bookings (
  client_id, provider_id, service_id,
  start_at, end_at, address, lat, lng,
  status, duration_minutes
) VALUES (
  :client_id, :provider_id, :service_id,
  :booking_start, :booking_end, :address, :lat, :lng,
  'pending_provider', :duration
)
RETURNING id;

UPDATE availability_slots
SET status = 'booked', booking_id = :booking_id
WHERE provider_id = :provider_id
  AND tstzrange(start_at, end_at) @> tstzrange(:booking_start, :booking_end);

COMMIT;
```

---

### 5.3 Calculate Provider Weighted Rating

```sql
-- Update provider's weighted rating after new review
-- Formula: (avg of recent 5 reviews * 0.6) + (avg of older reviews * 0.4)

WITH recent_reviews AS (
  SELECT rating
  FROM reviews
  WHERE provider_id = :provider_id
    AND moderation_status = 'approved'
  ORDER BY created_at DESC
  LIMIT 5
),
older_reviews AS (
  SELECT rating
  FROM reviews
  WHERE provider_id = :provider_id
    AND moderation_status = 'approved'
  ORDER BY created_at DESC
  OFFSET 5
)
UPDATE providers
SET
  rating = ROUND(
    COALESCE(
      (SELECT AVG(rating) FROM recent_reviews), 0
    ) * 0.6 +
    COALESCE(
      (SELECT AVG(rating) FROM older_reviews), 0
    ) * 0.4,
    2
  ),
  total_reviews = (
    SELECT COUNT(*) FROM reviews
    WHERE provider_id = :provider_id
      AND moderation_status = 'approved'
  )
WHERE user_id = :provider_id;
```

---

### 5.4 Weekly Payout Batch Creation

```sql
-- Create weekly payout batch for previous week (Mon-Sun)
-- Run every Monday at 00:00 UTC+7

BEGIN;

-- Create batch record
INSERT INTO payout_batches (
  period_start,
  period_end,
  total_net,
  transaction_count,
  provider_count,
  gateway,
  status
)
SELECT
  DATE_TRUNC('week', NOW() - INTERVAL '1 week') AS period_start,
  DATE_TRUNC('week', NOW()) - INTERVAL '1 second' AS period_end,
  SUM(t.net) AS total_net,
  COUNT(t.id) AS transaction_count,
  COUNT(DISTINCT t.provider_id) AS provider_count,
  'stripe' AS gateway,
  'processing' AS status
FROM transactions t
JOIN bookings b ON t.booking_id = b.id
WHERE t.status = 'ready'
  AND t.ready_at >= DATE_TRUNC('week', NOW() - INTERVAL '1 week')
  AND t.ready_at < DATE_TRUNC('week', NOW())
  AND t.dispute_id IS NULL
RETURNING id INTO :batch_id;

-- Create payout items per provider
INSERT INTO payout_items (
  batch_id,
  provider_id,
  amount_net,
  transaction_ids,
  bank_account_number,
  bank_name,
  status
)
SELECT
  :batch_id,
  b.provider_id,
  SUM(t.net) AS amount_net,
  ARRAY_AGG(t.id) AS transaction_ids,
  p.bank_account_number,
  p.bank_name,
  'pending' AS status
FROM transactions t
JOIN bookings b ON t.booking_id = b.id
JOIN providers p ON b.provider_id = p.user_id
WHERE t.status = 'ready'
  AND t.ready_at >= DATE_TRUNC('week', NOW() - INTERVAL '1 week')
  AND t.ready_at < DATE_TRUNC('week', NOW())
  AND t.dispute_id IS NULL
GROUP BY b.provider_id, p.bank_account_number, p.bank_name;

-- Update transaction status to 'released'
UPDATE transactions
SET
  status = 'released',
  released_at = NOW()
WHERE status = 'ready'
  AND ready_at >= DATE_TRUNC('week', NOW() - INTERVAL '1 week')
  AND ready_at < DATE_TRUNC('week', NOW())
  AND dispute_id IS NULL;

COMMIT;
```

---

### 5.5 Provider Earnings Dashboard Query

```sql
-- Get provider's earnings breakdown (Pending, Ready, Paid)

SELECT
  -- Pending: Bookings confirmed/in-progress but not completed
  COALESCE(SUM(
    CASE WHEN b.status IN ('confirmed', 'in_progress')
    THEN t.net ELSE 0 END
  ), 0) AS pending_amount,

  -- Ready: Completed bookings awaiting next payout batch
  COALESCE(SUM(
    CASE WHEN t.status = 'ready'
    THEN t.net ELSE 0 END
  ), 0) AS ready_amount,

  -- Paid: Already released in payout batches
  COALESCE(SUM(
    CASE WHEN t.status = 'released'
    THEN t.net ELSE 0 END
  ), 0) AS paid_amount,

  -- Count of bookings in each status
  COUNT(CASE WHEN b.status IN ('confirmed', 'in_progress') THEN 1 END) AS pending_count,
  COUNT(CASE WHEN t.status = 'ready' THEN 1 END) AS ready_count,
  COUNT(CASE WHEN t.status = 'released' THEN 1 END) AS paid_count

FROM bookings b
JOIN transactions t ON b.id = t.booking_id
WHERE b.provider_id = :provider_id
  AND b.created_at >= NOW() - INTERVAL '90 days'; -- Last 90 days
```

---

### 5.6 Booking Status History (Audit Trail)

```sql
-- Reconstruct booking status timeline from audit logs

SELECT
  al.created_at,
  al.action,
  al.metadata->>'from_status' AS from_status,
  al.metadata->>'to_status' AS to_status,
  u.name AS actor_name,
  al.metadata->>'reason' AS reason
FROM audit_logs al
LEFT JOIN users u ON al.actor_id = u.id
WHERE al.entity_type = 'booking'
  AND al.entity_id = :booking_id
  AND al.action IN (
    'CREATE_BOOKING',
    'ACCEPT_BOOKING',
    'REJECT_BOOKING',
    'COMPLETE_BOOKING',
    'CANCEL_BOOKING'
  )
ORDER BY al.created_at ASC;
```

---

### 5.7 Dispute Rate Calculation (KPI)

```sql
-- Calculate platform-wide dispute rate (target: <2%)

WITH completed_bookings AS (
  SELECT COUNT(*) AS total
  FROM bookings
  WHERE status = 'completed'
    AND completed_at >= NOW() - INTERVAL '30 days'
),
disputed_bookings AS (
  SELECT COUNT(*) AS total
  FROM bookings
  WHERE status = 'disputed'
    AND completed_at >= NOW() - INTERVAL '30 days'
)
SELECT
  d.total AS disputed_count,
  c.total AS completed_count,
  ROUND((d.total::DECIMAL / NULLIF(c.total, 0)) * 100, 2) AS dispute_rate_pct
FROM disputed_bookings d, completed_bookings c;
```

---

### 5.8 Proactive Rebooking Suggestion

```sql
-- Find clients due for rebooking (last booking >30 days ago)
-- Send notification with favorite provider availability

SELECT
  u.id AS user_id,
  u.name,
  u.email,
  f.provider_id,
  p_user.name AS provider_name,
  f.last_booking_at,
  EXTRACT(DAYS FROM NOW() - f.last_booking_at) AS days_since_last_booking,
  -- Get next 3 available slots for their favorite provider
  (
    SELECT ARRAY_AGG(
      jsonb_build_object(
        'start_at', a.start_at,
        'end_at', a.end_at
      )
    )
    FROM availability_slots a
    WHERE a.provider_id = f.provider_id
      AND a.status = 'available'
      AND a.start_at > NOW()
    ORDER BY a.start_at
    LIMIT 3
  ) AS available_slots
FROM favorites f
JOIN users u ON f.user_id = u.id
JOIN providers p ON f.provider_id = p.user_id
JOIN users p_user ON p.user_id = p_user.id
WHERE f.last_booking_at < NOW() - INTERVAL '30 days'
  AND f.total_bookings >= 2 -- Only for repeat customers
  AND u.deleted_at IS NULL
  AND p.kyc_status = 'approved'
ORDER BY f.last_booking_at ASC
LIMIT 100; -- Batch notification
```

---

## 6. Data Migration & Seeding

### 6.1 Seed Admin User

```sql
-- Create initial admin account
INSERT INTO users (
  id, email, phone, name, role, locale
) VALUES (
  gen_random_uuid(),
  'admin@veyya.com',
  '+66812345678',
  'Admin User',
  'admin',
  'en'
);
```

---

### 6.2 Import Services from Sanity CMS

```sql
-- Run via application layer after Sanity sync
-- This is a placeholder for structure; actual sync via API

INSERT INTO services (
  id, sanity_id, category, subcategory,
  title, description, base_price, duration_minutes,
  image_url, active
)
SELECT
  gen_random_uuid(),
  s._id,
  s.category,
  s.subcategory,
  jsonb_build_object('en', s.title_en, 'th', s.title_th),
  jsonb_build_object('en', s.description_en, 'th', s.description_th),
  s.base_price * 100, -- Convert to minor units
  s.duration_minutes,
  s.image_url,
  s.active
FROM sanity_services_export s
ON CONFLICT (sanity_id) DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  base_price = EXCLUDED.base_price,
  updated_at = NOW();
```

---

## 7. Performance Optimization

### 7.1 Partitioning Strategy

**Bookings Table Partitioning (by date):**
```sql
-- Partition bookings by quarter for historical data
CREATE TABLE bookings_2025_q1 PARTITION OF bookings
FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');

CREATE TABLE bookings_2025_q2 PARTITION OF bookings
FOR VALUES FROM ('2025-04-01') TO ('2025-07-01');

-- Queries automatically routed to relevant partition
-- Improves performance for date-range queries
```

---

### 7.2 Materialized Views

**Provider Statistics (for faster search):**
```sql
CREATE MATERIALIZED VIEW mv_provider_stats AS
SELECT
  p.user_id,
  p.rating,
  p.response_rate,
  p.total_bookings,
  COUNT(DISTINCT ps.service_id) AS service_count,
  ARRAY_AGG(DISTINCT ps.service_id) AS service_ids,
  MIN(COALESCE(ps.price_override, s.base_price)) AS min_price,
  MAX(COALESCE(ps.price_override, s.base_price)) AS max_price
FROM providers p
LEFT JOIN provider_services ps ON p.user_id = ps.provider_id AND ps.active = TRUE
LEFT JOIN services s ON ps.service_id = s.id
WHERE p.kyc_status = 'approved'
GROUP BY p.user_id, p.rating, p.response_rate, p.total_bookings;

-- Refresh nightly
CREATE INDEX idx_mv_provider_stats_rating ON mv_provider_stats(rating DESC);
CREATE UNIQUE INDEX idx_mv_provider_stats_user ON mv_provider_stats(user_id);

-- Refresh job (run daily at 2am)
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_provider_stats;
```

---

### 7.3 Redis Caching Strategy

**Cache Keys:**
```
provider:{provider_id}:profile        # TTL: 1 hour
provider:{provider_id}:availability   # TTL: 15 minutes (sync with Google Calendar)
service:catalog                       # TTL: 1 hour (synced from Sanity)
user:{user_id}:session:{token_hash}   # TTL: 24 hours
```

**Example Usage:**
```javascript
// Pseudo-code for availability check
const cacheKey = `provider:${providerId}:availability:${date}`;
let availability = await redis.get(cacheKey);

if (!availability) {
  availability = await db.query(/* SQL */);
  await redis.setex(cacheKey, 900, JSON.stringify(availability)); // 15 min
}
```

---

## 8. Backup & Recovery

### 8.1 Backup Strategy

**Automated Backups:**
- Full daily backups at 2am UTC+7
- Incremental backups every 6 hours
- Transaction log backups every 15 minutes
- 30-day retention for daily backups
- 90-day retention for weekly backups
- 1-year retention for monthly backups

**Critical Tables (Priority 1):**
- `users`, `providers`, `bookings`, `transactions`, `payout_batches`, `payout_items`

**Audit Tables (Priority 2):**
- `audit_logs` (immutable, append-only)

**Recoverable from Source (Priority 3):**
- `services` (synced from Sanity CMS)

---

### 8.2 Point-in-Time Recovery

**Recovery Time Objective (RTO):** 4 hours
**Recovery Point Objective (RPO):** 1 hour (max acceptable data loss)

```sql
-- Example: Restore to 1 hour before incident
-- (Specific commands vary by PostgreSQL hosting: RDS, Cloud SQL, etc.)

-- AWS RDS example
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier veyya-prod \
  --target-db-instance-identifier veyya-prod-restored \
  --restore-time 2025-10-25T14:00:00Z
```

---

## 9. Data Retention & Archival

### 9.1 Retention Policy (PDPA Compliance)

| Entity | Retention Period | Archive Strategy |
|--------|------------------|------------------|
| **users** (active) | Indefinite | Soft delete on account closure |
| **users** (deleted) | 30 days grace period | Permanent deletion after 30 days |
| **bookings** (completed) | 24 months | Archive to cold storage |
| **transactions** | 7 years | Required for tax/audit (Thai law) |
| **audit_logs** | 24 months | Archive to S3/Glacier |
| **reviews** | Indefinite | Soft delete with booking |
| **availability_slots** (past) | 90 days | Delete older slots |
| **sessions** (expired) | 7 days | Delete after expiry + 7 days |

---

### 9.2 Archival Script (Bookings)

```sql
-- Archive completed bookings older than 24 months to separate table
INSERT INTO bookings_archive
SELECT * FROM bookings
WHERE status = 'completed'
  AND completed_at < NOW() - INTERVAL '24 months';

DELETE FROM bookings
WHERE status = 'completed'
  AND completed_at < NOW() - INTERVAL '24 months';

-- Vacuum to reclaim space
VACUUM ANALYZE bookings;
```

---

## 10. Appendix

### 10.1 Data Types Reference

| Field Type | PostgreSQL Type | Notes |
|------------|----------------|-------|
| Primary Key | UUID | `gen_random_uuid()` for global uniqueness |
| Money | INTEGER | Always minor units (satang for THB) |
| Timestamps | TIMESTAMP WITH TIME ZONE | Always UTC+7 for Bangkok |
| Phone | VARCHAR(20) | E.164 format: +66812345678 |
| Coordinates | DECIMAL(10,8), DECIMAL(11,8) | Lat/Lng for geospatial |
| JSON | JSONB | Indexed, queryable JSON |
| Arrays | TEXT[], UUID[] | PostgreSQL native arrays |

---

### 10.2 Enum Values Reference

**Booking Status:**
- `pending_provider` - Awaiting provider acceptance
- `confirmed` - Provider accepted, scheduled
- `in_progress` - Service underway (optional)
- `completed` - Service finished
- `cancelled` - Cancelled by client/provider/system
- `disputed` - Under dispute resolution
- `ready_for_payout` - Eligible for payout
- `paid` - Provider paid

**Transaction Status:**
- `held` - Payment authorized, escrowed
- `ready` - Eligible for payout batch
- `released` - Included in payout batch
- `refunded` - Refunded to customer
- `disputed` - Under dispute

**KYC Status:**
- `pending` - Awaiting admin review
- `approved` - Verified and active
- `rejected` - Documents invalid
- `suspended` - Temporarily deactivated

---

### 10.3 Database Connection String

```
postgresql://username:password@host:5432/veyya_production?sslmode=require
```

**Recommended Settings:**
- Max connections: 100 (scale with traffic)
- Connection pooling: PgBouncer (session mode)
- Statement timeout: 30s
- Idle transaction timeout: 60s

---

**End of Data Model Document**
