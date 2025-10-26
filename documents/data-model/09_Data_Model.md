# Data Model (ER Sketch)

## Entities
- users(id, name, email, phone, role, locale, created_at)
- providers(user_id, kyc_status, rating, radius_km, join_date)
- services(id, category, title, base_price, duration_min)
- provider_services(provider_id, service_id, price_override, active)
- bookings(id, client_id, provider_id, service_id, start_at, end_at, addr, lat, lng, status)
- transactions(id, booking_id, gross, commission, net, status, gateway_ref)
- reviews(id, booking_id, rating, comment, photos jsonb)
- payout_batches(id, period_start, period_end, total_net, count, status)
- payout_items(batch_id, provider_id, amount_net, status, error_msg)
- availability_slots(provider_id, start_at, end_at, source, status)
- audit_logs(id, actor_id, action, entity, metadata jsonb, ts)

## Indexing
- bookings(start_at, provider_id), bookings(status)
- providers(rating DESC), provider_services(active)
