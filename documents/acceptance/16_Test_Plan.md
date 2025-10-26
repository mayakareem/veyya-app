# Test Plan (MVP)

## Scope
- Functional: auth, booking, payment, review, payout, calendar
- Non‑functional: performance, security, localization

## Test Types
- Unit, Integration, Contract (API), E2E (happy & sad paths)
- Webhook replay & idempotency
- Payout reconciliation

## Key E2E Cases
- Book → Pay (HELD) → Accept → Complete → Review → Batch → Release
- Reject/Timeout → Alternate provider offer
- Dispute before payout → exclusion from batch
