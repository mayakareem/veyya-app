# VEYYA – SLA & GUARDRAIL FRAMEWORK

**Applies to:** Beauty, Wellness, Cleaning, Pets, Fitness, Home Services

## 1. OBJECTIVES OF THE FRAMEWORK

1. Deliver best-in-class customer experience through reliability, punctuality, and consistent service quality.
2. Protect Veyya financially from the margin erosion caused by cancellations, no-shows, and operational disruptions.
3. Create accountability for service providers through transparent and fair performance metrics.
4. Set clear expectations for customers to reduce friction and last-minute cancellations.
5. Establish automated escalation paths to minimize manual operational effort.

## 2. SERVICE PROVIDER SLA & GUARDRAILS

### 2.1 Key Events & Targets

| Event | SLA Target | Guardrail / Penalty | Notes |
|-------|-----------|---------------------|-------|
| Marked as Available but Declines Booking | Decline rate < 15% monthly | - Soft Warning at 15–20%<br>- Temporary "Low Priority" ranking >20%<br>- Suspension for 48h if >30% for 2 consecutive weeks | Protects liquidity and improves conversion/customer experience. |
| Accepts Booking but Cancels | Cancellation rate < 3% | - Auto fee: 10–20% of booking value deducted from future payout<br>- Reduced ranking for 7 days<br>- Mandatory coaching after 3 incidents in 30 days<br>- Suspension after 5 cancellations | High financial impact—strongest guardrail |
| Provider No-Show | 0–1 per quarter | - Auto fee: 50–100% of booking value<br>- Customer compensation funded by provider penalty<br>- Immediate 48h suspension<br>- Three no-shows = deactivation review | No-shows destroy trust → near-zero tolerance |
| Late Arrival (>15 minutes) | < 5% of bookings | - Auto flag; repeat offenders deprioritised<br>- Affects ranking score | Managed but less severe |

### 2.2 Provider Performance Score (PPS)

Used to rank providers in search results and match quality.

**Formula:**
```
PPS = Reliability (40%) + Customer Rating (30%) + Responsiveness (15%) + Veyya Compliance (15%)
```

**Impact of PPS:**
- **Top Tier ("Gold"):** priority access to peak hours, higher volume
- **Mid Tier:** standard access
- **Low Tier:** restricted access + coaching required

### 2.3 Financial Guardrails for Providers

**Penalty & Compensation Rules:**

- **Provider cancellation <6 hours:**
  - Provider pays 20% penalty; customer receives full refund + voucher.

- **Provider no-show:**
  - Provider pays 100% of booking value (deducted from future payout).
  - Customer gets full refund + 20% credit.

- **Provider declines >30%:**
  - Move to bottom of the algorithmic ranking for 7 days.

- **Chronic offenders:**
  - 3 no-shows OR 5 cancellations/month triggers SOP review + possible deactivation.

## 3. CUSTOMER SLA & GUARDRAILS

### 3.1 Customer Events

| Event | SLA Target | Guardrail |
|-------|-----------|-----------|
| Customer Cancellation (outside free window) | Encouraged to be <10% | - Free cancellation up to 6 hours before<br>- 50% charge 6–2 hours before<br>- 100% charge <2 hours |
| Customer No-Show | <3% | - 100% charge applied<br>- Provider compensated with 70–80% of booking value |

### 3.2 Customer Reliability Score (CRS)

Used to predict trustworthiness and reduce last-minute behaviour.

**CRS factors:**
- Cancellation ratio
- No-show history
- Payment disputes
- Rating behaviour consistency

**Low CRS customers may require:**
- Mandatory upfront full payment
- No access to peak times
- Limited access to premium providers

## 4. PLATFORM OPERATIONS SLA

| Process | SLA | Notes |
|---------|-----|-------|
| Reassignment after Provider Cancellation | < 15 minutes | Automated smart-matching logic |
| Customer Support Response Time | < 3 minutes chat / 8 minutes phone | Premium-like experience |
| Refund Issuance | Same day | Critical to trust |
| Incident Investigation | 24–48 hours | Clear communication loop |

## 5. ESCALATION PATHS

### 5.1 Provider Escalation
1. Automated System Warning (threshold breach)
2. Account Status Change: Low priority / temporary freeze
3. Ops Review Call
4. Mandatory Retraining
5. Deactivation

### 5.2 Customer Escalation
1. Automated reminder & strike
2. Temporary restriction
3. Limit future bookings (e.g., prepayment only)
4. Account lock if abusive behaviour persists

## 6. COMMUNICATION TEMPLATES (SHORT-FORM)

*(Used automatically through the app)*

**Provider Decline Warning**
> You declined X% of your assigned bookings this week. To ensure fair distribution and strong earnings, please keep declines under 15%. Continued declines may affect your ranking.

**Provider Cancellation Penalty**
> Your cancellation has triggered a service impact fee of XX%. This protects customer experience and ensures platform reliability.

**Customer Late Cancellation**
> This booking was cancelled within X hours. As per policy, a YY% fee applies to protect provider time and income.

## 7. ENGINEERING REQUIREMENTS (FOR IMPLEMENTATION)

**Event Tracking**
- Timestamped booking events (accept, decline, cancel, arrival, completion)
- Geo-based arrival verification
- Payment orchestration (automated penalties + refunds)
- Dynamic ranking engine (PPS & CRS logic)

**Automations**
- Penalty assessment
- Payment deductions in next payout cycle
- Reassignment engine
- Notifications to customers/providers
- Monthly SLA reports for operations

## 8. SUMMARY OF PROTECTIONS FOR VEYYA

**Financial**
- Provider-funded penalties reduce refund burden
- Customer cancellation/no-show charges protect revenue
- Ranking system optimizes liquidity and fill rates

**Operational**
- Automated escalations reduce manual workload
- Hard guardrails prevent systemic abuse
- SLA targets create measurable quality baselines

**Customer Experience**
- Near-zero no-shows
- Fast reassignment
- Clear communication & transparency
