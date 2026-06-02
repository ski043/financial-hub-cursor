# Account balances are derived from an opening balance plus activity

An Account stores only `openingBalanceCents`; its current balance is computed as `openingBalance + Σ(transactions on the account) − Σ(transfers out) + Σ(transfers in)`, rather than being a manually maintained `balance` field. This makes balances, cash totals, and net worth reconcile to the penny by construction (the §3 data-integrity success metric) and keeps the money math unit-testable.

Trade-off: balances are computed on read (can be cached if needed) instead of stored, so there is no authoritative stored balance to drift — but also no place to record a balance that disagrees with history. Accepted: in this app, history *is* the truth.
