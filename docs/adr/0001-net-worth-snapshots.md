# Net worth history via monthly snapshots (not cash-flow reconstruction)

We store net worth history in a `NetWorthSnapshot` table (one row per user per month) instead of reconstructing it on read from current net worth minus historical cash flow. Reconstruction attributes all change to saving and is blind to market/asset revaluation (e.g. a crypto run-up would show as a flat line), so it is misleading. Snapshots record the true net worth at capture time, so the trend is accurate.

The current month's snapshot is **upserted on dashboard view** (no cron). Demo data is seeded with ~12 months of history; for real users there is **no pre-signup backfill** — history accrues going forward, and the chart shows a short series with an empty-state hint until months accumulate.

Trade-off: real users don't get instant historical depth (accepted, in exchange for correctness). Supersedes the earlier "compute net worth trend live, no snapshot table" idea.
