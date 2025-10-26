# Requirements Index (Spec Crosswalk)

This document ties PRD goals → user stories → acceptance criteria → FRD modules so the team can trace scope end‑to‑end.

## 1. Crosswalk Table

| PRD Goal | User Story | Acceptance Criteria | FRD Module(s) | KPI |
|---|---|---|---|---|
| Seamless discovery | As a client, I can filter providers by rating/price/distance. | Given active providers and a service selected, when I apply filters, then a sorted list returns < 1.5s. | Discovery & Booking | Time to first result |
| Reliable execution | As a client, I pay into escrow before service. | Given verified provider and open slot, when payment succeeds, then booking=PENDING_PROVIDER and funds=HELD. | Escrow & Payout; Booking | Dispute rate < 2% |
| Provider empowerment | As a provider, I set availability or connect calendar. | Busy slots from external calendar are not bookable; overlap prevented on create. | Calendar & Availability | Provider NPS > 60 |
| Data-driven ops | As an admin, I see GMV, cancellations, NPS at a glance. | Dashboard loads KPIs with < 3s p95; exports downloadable. | Admin Dashboard & Analytics | Weekly dashboard usage |
| Scalable infra | As a PM, I launch Thailand first with locales/currencies. | App supports EN/TH, THB; config-driven locales/currencies. | System Overview; Auth | Multi-locale readiness |

## 2. Detailed Traceability (Top 12 Requirements)

| ID | Requirement | User Story | Acceptance | Module | Notes |
|----|-------------|------------|------------|--------|------|
| R-001 | Escrow hold before service | Client wants safe payment | Funds=HELD post-success webhook | Payments/Escrow | Webhook signature verified |
| R-002 | Weekly provider payout | Provider wants predictability | Batch computes net=(gross-commission-fees) | Payouts | Retry failed payouts |
| R-003 | Prevent double booking | Provider calendar sync | Slot conflicts blocked on create | Calendar | Pull busy q15m; push on confirm |
| R-004 | Reviews post-completion | Authentic feedback | Only COMPLETED bookings can review | Reviews | Abuse filter |
| R-005 | Provider approval gating | Safety & quality | Only APPROVED appear in search | Provider Onboarding | KYC docs ≥ 2 |
| R-006 | Ranking relevance | Faster selection | Providers ranked by distance/rating/response | Discovery | Tunable weights |
| R-007 | Acceptance timeout | Reliability | Auto-reassign or suggest alternates after 30m | Booking | Configurable |
| R-008 | Cancellation window | Fairness | Free ≥ 12h prior; else fee | Booking | Regional policy |
| R-009 | Notifications | Clarity | T-24h & T-2h reminders | Notifications | Backoff/queue |
| R-010 | Auditability | Compliance | All admin actions logged | Admin/RBAC | Immutable logs |
| R-011 | Localization | Regional fit | EN/TH UI, THB pricing | System | Currency formatting |
| R-012 | Performance | Smooth UX | API p95 < 300ms; app load < 2s | Platform | Monitor & alert |

## 3. Change Control
- Each requirement labeled R-### must reference a Jira ticket and a test ID.
- Any scope change must update this index, FRD section, and test cases.

## 4. Acceptance Evidence
- Link E2E test runs, screenshots, API traces, finance payout reconciliation CSVs.
