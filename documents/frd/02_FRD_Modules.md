# Veyya Functional Requirements (Modules + Flowcharts)

## Conventions
- Status enums: BOOKING = PENDING_PROVIDER → CONFIRMED → COMPLETED → READY_FOR_PAYOUT → PAID
- Transactions: HELD → READY → RELEASED
- Idempotency headers on effectful POSTs

## Module 1: Auth & Profiles
### Objective
Secure signup/login via OTP; role switch (client ↔ provider).
### Flow
```
[Start]→[Enter Email/Phone]→[Send OTP]→[Verify]→[Create/Retrieve User]→[Assign Role]→[JWT Session]→[Home]
```
### Data
- email, phone (E.164), otp(6), role{client|provider}

## Module 2: Provider Onboarding & Verification
### Flow
```
[Become Provider]→[Upload ID + ≥2 Certificates + Profile]→[Validation]→[Admin Review]→(Approve|Reject)→[Set Availability]
```
### Rules
- Only APPROVED providers visible in search.

## Module 3: Discovery & Booking
### Ranking
distance(40%) + rating(40%) + response_rate(20%)
### Flow
```
[Select Service]→[Filters]→[Ranked Providers]→[Slot Check]→[Payment Auth (Escrow)]→[Create Booking PENDING_PROVIDER]→[Notify Provider]
            →(Accept→CONFIRMED | Reject→Suggest Alternatives | Timeout→Reassign)
```

## Module 4: Escrow & Payout
### Flow
```
[Payment HELD]→[Service Completed]→[Review or +24h]→[READY_FOR_PAYOUT]→[Weekly Batch]→[Commission Deduction]→[Release]
```
### Commission
25–30% before payout.

## Module 5: Ratings & Reviews
- 1–5 stars; optional text/photos; moderation queue.
- Weighted average: recent5=60%, older=40%.

## Module 6: Calendar & Availability
- Manual slot entry + Google Calendar OAuth
- Pull busy every 15m; push event on confirm
- Prevent overlap at creation time

## Module 7: Admin Dashboard & Analytics
- Provider approvals; booking monitor; disputes
- Finance payouts; CSV exports; audit logs
- BI: GMV, commission, cancellations, NPS

See also: [[04_Booking_API.md]], [[03_System_Overview.md]]
