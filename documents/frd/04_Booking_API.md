# End-to-End Booking → Escrow → Acceptance → Completion → Review → Payout

## Conventions
- Base: /api/v1
- Auth: Bearer JWT
- Idempotency-Key on POSTs
- Money in minor units

## 1) Create Booking Intent
POST /bookings/intents
```json
{ "service_id":"svc_7a2e4f","provider_id":"pro_4c1b99","start_at":"2025-10-20T09:00:00Z",
  "end_at":"2025-10-20T10:00:00Z","location":{"address_line":"Bangkok","lat":13.7397,"lng":100.5585}}
```

## 2) Payment Intent (Escrow)
POST /payments/intents
```json
{ "booking_intent_id":"bint_01HX1M8K9G","payment_method":"card","return_url":"veYYa://payments/complete" }
```

## 3) Webhook (Succeeded → HELD)
POST /payments/webhook
```json
{"type":"payment_intent.succeeded","data":{"id":"pay_01HX1N2ZJQ","amount":127200,"metadata":{"booking_intent_id":"bint_01HX1M8K9G"}}}
```

## 4) Provider Accept/Reject
POST /bookings/{id}/accept
```json
{"note":"See you soon"}
```

POST /bookings/{id}/reject
```json
{"reason_code":"SLOT_CONFLICT","message":"Overlapping appointment"}
```

## 5) Completion & Review
POST /bookings/{id}/complete
```json
{"completion_proof":{"photo_urls":["https://s3/complete/abc.jpg"],"note":"Service done"}}
```
POST /reviews
```json
{"booking_id":"bok_01HX1P0YB4","rating":5,"comment":"Excellent work!","photos":[]}
```

## 6) Weekly Payout Batch
POST /payouts/batch/run
```json
{"period_start":"2025-10-13T00:00:00Z","period_end":"2025-10-20T00:00:00Z"}
```

## Sequence (ASCII)
```
Client→Backend→PG→Provider→Admin
Intent→Pay→Webhook→Accept→Complete→Review→Batch→Release
```

## Errors
VALIDATION_ERROR, SLOT_CONFLICT, PAYMENT_REQUIRED, NOT_AUTHORIZED, ALREADY_PROCESSED, STATE_CONFLICT
