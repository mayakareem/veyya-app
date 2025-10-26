# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Veyya is a two-sided marketplace for on-demand home services (beauty, pet care) with a premium positioning. The MVP targets Thailand (Bangkok) first, with planned expansion to UAE and SEA. This repository contains product documentation, research, and design specifications for the platform.

## Repository Structure

This is primarily a **documentation and planning repository** organized into:

- **`/research`** - Market analysis, competitive research, business model, and strategy documents
- **`/documents`** - Product specifications split by concern:
  - `/requirements` - PRD, requirements traceability, risks/assumptions
  - `/frd` - Functional requirements, API specifications, module definitions
  - `/data-model` - System architecture, data model, entity relationships
  - `/design` - Design specifications
  - `/components` - Component specs and process playbooks
  - `/user-stories` - User stories and persona definitions
  - `/acceptance` - Test plans and acceptance criteria
- **`/app-prototype`** - Empty directory reserved for future code

## Architecture Principles

### System Components
The planned architecture consists of:
- **Client App** - React Native/Flutter (iOS/Android/Web)
- **Backend** - Node.js/NestJS microservices
- **Admin Portal** - Web with RBAC
- **Data Layer** - PostgreSQL (OLTP), Redis, Object Storage
- **Integrations** - Stripe/Tap/Paymob, Google Maps, Google Calendar, Twilio/Firebase, SES

### Core Modules
1. **Auth & Profiles** - OTP-based auth, role switching (client/provider)
2. **Provider Onboarding** - KYC verification, admin approval workflow
3. **Discovery & Booking** - Ranked search, slot checking, escrow payments
4. **Escrow & Payout** - Weekly batch payouts with 25-30% commission
5. **Ratings & Reviews** - Weighted average (recent 60%, older 40%)
6. **Calendar & Availability** - Manual slots + Google Calendar sync
7. **Admin Dashboard** - Approvals, monitoring, analytics, disputes

### Key Entity Model
```
users → providers → provider_services ← services
                ↓
             bookings → transactions → payout_items ← payout_batches
                ↓
             reviews
             availability_slots
```

## Critical Business Logic

### Booking State Machine
```
PENDING_PROVIDER → CONFIRMED → COMPLETED → READY_FOR_PAYOUT → PAID
```
- 30-minute acceptance timeout
- Free cancellation ≥12 hours prior
- Dispute lock excludes from payout

### Transaction Flow
```
HELD → READY → RELEASED
```
Funds are escrowed on booking creation, held until completion + review (or +24h), then batched weekly for payout after commission deduction.

### Provider Ranking Algorithm
```
score = distance(40%) + rating(40%) + response_rate(20%)
```

### API Conventions
- Base path: `/api/v1`
- Auth: Bearer JWT
- Idempotency-Key header on effectful POSTs
- Money values in minor units
- Error codes: `VALIDATION_ERROR`, `SLOT_CONFLICT`, `PAYMENT_REQUIRED`, `NOT_AUTHORIZED`, `ALREADY_PROCESSED`, `STATE_CONFLICT`

## Key Constraints & SLAs

- **Performance**: API <300ms p95, app load <2s on 4G
- **Security**: HTTPS, JWT, encryption at rest, RBAC
- **Uptime**: 99.5% target
- **Localization**: EN/TH/AR, multi-currency (THB/AED/USD)
- **Compliance**: Thailand PDPA, Singapore PDPA, GDPR

## Product Goals & KPIs

- Time to complete booking: <3 minutes
- Dispute rate: <2%
- Provider NPS: >60
- Repeat bookings: >40% by month 6
- Monthly GMV: >$50k USD by month 6

## Development Phases

- **P1 (0-2 mo)**: Design, APIs, wireframes
- **P2 (3-5 mo)**: MVP build
- **P3 (6 mo)**: Pilot Bangkok with 50 providers
- **P4 (8-10 mo)**: Add categories + loyalty/referrals

## Technology Strategy

The tech strategy prioritizes:
1. **Speed to Market**: Launch POC within 10 weeks
2. **Low Dev Cost**: <$50K for MVP
3. **API-First Design**: Enable partner integrations
4. **Data Control**: PDPA/GDPR compliance from day one

Recommended approach is a **hybrid model**: purchased front-end template (CodeCanyon/UI8) with custom backend for long-term scalability.

## Reference Documents

When implementing specific features, consult:
- Booking flow: `documents/frd/04_Booking_API.md`
- System architecture: `documents/data-model/03_System_Overview.md`
- Module specs: `documents/frd/02_FRD_Modules.md`
- Data model: `documents/data-model/09_Data_Model.md`
- Product requirements: `documents/requirements/01_PRD_Veyya.md`
- Tech strategy: `research/05_Veyya_Product_and_Tech_Strategy.md`

## Glossary

- **Escrow**: Funds held until service conditions met
- **GMV**: Gross Merchandise Value
- **KYC**: Know Your Customer/Provider verification
- **NPS**: Net Promoter Score
- **RBAC**: Role-based access control
