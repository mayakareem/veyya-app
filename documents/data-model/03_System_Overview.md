# System Flow Overview & Architecture

## Components
- Client App (iOS/Android/Web) — React Native/Flutter
- Backend — Node.js/NestJS microservices
- Admin Portal — Web (RBAC)
- Data Layer — PostgreSQL (OLTP), Redis, Object Storage
- Integrations — Stripe/Tap/Paymob, Google Maps, Google Calendar, Twilio/Firebase, SES

## High-Level Diagram (text)
```
Client App ↔ Backend API ↔ Admin Portal
             ││
             ├┼─ Auth, Users, Providers, Catalog
             ├┼─ Booking, Calendar, Ratings
             ├┼─ Payments/Escrow, Payouts, Wallet
             ├┼─ Notifications, Files, BI/Reports, RBAC, Audit
External: Payment GW | Maps | Calendar | SMS/Push
```

## Key Flows
- End-to-end booking lifecycle (see [[04_Booking_API.md]])
- Weekly payout batches
- Provider onboarding & approval

## Entities
users, providers, services, provider_services, bookings, transactions, reviews, payout_batches, payout_items, availability_slots, audit_logs

## Events
booking.created, booking.confirmed, booking.completed, transaction.held, transaction.ready_for_payout, payout.batch.created, payout.batch.released

## SLAs & Guardrails
- Acceptance timeout: 30m
- Free cancellation: ≥12h prior
- Dispute lock excludes bookings from payout
