# Subscriptions are recurring Expenses, smoothed and single-source-of-truth

A `Subscription` is its own entity with billing-cycle/renewal/status, and it IS counted as spending — it flows into Monthly Expenses, cash flow, and spending-by-category. It is the **single source of truth** for that recurring cost: the same charge is never also recorded as a `Transaction`, and there is no "Subscriptions" transaction category. This avoids double-counting while keeping a rich, dedicated Subscriptions section.

Each active Subscription contributes its **normalized monthly cost** (weekly ×52/12, monthly ×1, quarterly ×1/3, annual ×1/12) to every month — i.e. spend is **smoothed**, not booked as a lump on the renewal date.

Trade-off: a yearly subscription is spread across 12 months rather than shown when cash actually leaves, so "Expenses (month)" is a stable budgeting figure rather than literal cash-out. Accepted for the MVP because legibility and a consistent Subscription-spend figure matter more than per-day cash accuracy.
