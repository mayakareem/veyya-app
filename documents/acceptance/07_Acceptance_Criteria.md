# Acceptance Criteria (MVP)

## Booking
- Given a verified provider and open slot, when a client pays successfully, then the booking is created with status=PENDING_PROVIDER and funds=HELD.
- When the provider accepts within 30 minutes, the booking becomes CONFIRMED and events are written to both calendars.

## Escrow & Payout
- After completion and review or +24h, booking is flagged READY_FOR_PAYOUT.
- Weekly batch deducts 25–30% commission and releases net to provider; failures are retried next batch.

## Reviews
- Only completed bookings can create a review; rating in [1..5]; abusive text flagged.

## Calendar
- If external calendar shows busy, the slot is blocked on the platform.
