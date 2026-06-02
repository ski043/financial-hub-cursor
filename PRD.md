# Finance Hub — Product Requirements Document

> **“Your complete financial life in one dashboard.”**

| | |
|---|---|
| **Status** | Draft v1 |
| **Author** | janmarshal |
| **Last updated** | 2026-06-02 |
| **Primary goal** | Benchmark-first: a realistic, premium consumer-finance app used to evaluate coding agents (Cursor, Claude Code, Codex) |
| **Target platform** | Responsive web (desktop-first), Next.js App Router |

---

## 0. Assumptions & open decisions

These are working defaults. Each is cheap to change; flag any you disagree with.

| # | Decision | Default | Alternatives |
|---|----------|---------|--------------|
| A1 | App purpose | Benchmark-first, but must *feel* like a shippable product | Product-first; pure throwaway benchmark |
| A2 | Data source | Seeded realistic demo data + manual add/edit | CSV import; Plaid/Teller live aggregation |
| A3 | Auth | Multi-user, email + password, one seeded demo user | OAuth; single no-auth demo |
| A4 | Stack | Next.js (App Router) + Prisma + Postgres + Tailwind + shadcn/ui | SQLite; Supabase; different framework |
| A5 | Insights engine | Rule-based / computed in v1 | Light AI summaries (fast-follow); full AI chat |
| A6 | Monetization | Out of scope for v1 | Stripe premium tier (future) |
| A7 | Currency | Single currency per user (default USD) — **cosmetic display only, never converted** | Multi-currency with FX |

---

## 1. Problem & context (the why)

People's money lives in fragments: a checking account in one app, a credit card in another, a brokerage somewhere else, subscriptions buried in email receipts, and debt on a statement they avoid opening. The result is that **most people cannot answer basic questions about their own finances** without a painful manual reconciliation:

- How much money do I have right now?
- How much came in this month, and how much went out?
- Where is my money actually going?
- What am I paying for in recurring subscriptions?
- What do I own (assets, investments) and what do I owe (debts)?
- What is my net worth — and is it trending up or down?

Existing tools (Mint, Monarch, Copilot) prove the demand, but they are either shutting down, expensive, or over-complicated. There is room for a **calm, premium overview** that answers the questions above at a glance.

### Why now

1. **Mint's shutdown** left millions of users actively looking for a clean personal-finance overview, validating both demand and willingness to switch.
2. **This codebase doubles as a coding-agent benchmark.** A personal-finance dashboard is the ideal stress test: it is universally understood (so correctness is easy to judge), yet genuinely non-trivial — it requires real data modeling, money math, aggregation, charts, state management, auth, and polished UI. That makes it a fair, repeatable way to measure how well Cursor, Claude Code, and Codex build a real product.

### Why this matters as a benchmark (secondary audience)

Beyond end users, this repo is evaluated by an engineering audience asking: *can a coding agent take this PRD and produce a correct, well-architected, good-looking app?* The PRD is therefore written to be **unambiguous and executable** — clear data models, acceptance criteria, and money-math rules — so agent output can be objectively scored.

---

## 2. Goals & non-goals

### Goals
- G1. A user can see their **complete financial picture** — net worth, cash flow, spending, subscriptions, assets, debts — in one dashboard.
- G2. The app answers all nine "simple questions" from section 1 in **≤ 2 clicks** from the dashboard.
- G3. The product **feels premium** (consumer fintech, not an admin panel): calm layout, clear typography, smooth interactions, dark-mode support.
- G4. Net worth and cash flow are **trended over time** so users can see if things are improving.
- G5. The codebase is a **fair, complete benchmark**: realistic scope, seedable data, clear acceptance criteria.

### Non-goals (v1)
- N1. Real bank aggregation (Plaid/Teller) — manual + seeded only.
- N2. Budgeting envelopes / goal planning (future).
- N3. AI chat / recommendations (light AI summaries are a fast-follow, not v1).
- N4. Bill pay, money movement, or any real financial transactions.
- N5. Multi-currency with live FX (single currency per user).
- N6. Mobile-native apps; tax features; shared/household accounts.
- N7. Monetization / paywall.

---

## 3. Definition of success

### Product success metrics
| Metric | Target |
|--------|--------|
| Time-to-first-insight | New user sees a populated, meaningful dashboard in **< 30s** (via seeded demo or quick manual entry) |
| Question coverage | **9/9** of the section-1 questions answerable from the UI |
| Glanceability | Core dashboard KPIs visible **above the fold** on a 1280px viewport with no scrolling |
| Data integrity | Net worth = Σ assets − Σ debts, reconciles to the penny across every view |
| Perceived quality | Passes a design review for "premium consumer fintech" feel (spacing, type, motion, empty states) |

### Benchmark success criteria
The build is considered a strong agent result when:
- **Correctness:** all money math (balances, cash flow, net worth, category totals, subscription cost normalization) is exact and consistent across views.
- **Completeness:** all v1 modules (section 5) are implemented and wired to a shared data model.
- **Architecture:** clean separation of data layer (Prisma), domain/aggregation logic, and UI; no business logic duplicated in components.
- **Polish:** responsive, accessible (keyboard + screen-reader basics), loading/empty/error states present.
- **Reproducibility:** `seed` produces a realistic dataset; app runs from a clean clone with documented setup.

---

## 4. Personas

- **Alex — "The Overwhelmed Optimizer" (primary).** 28–40, financially active across 4–6 accounts. Wants a single calm dashboard to answer "am I okay?" without spreadsheets. Values clarity and trend lines over granular control.
- **Sam — "The Debt Crusher."** Focused on paying down student loans / credit cards. Lives in the Debts and Net Worth views; motivated by seeing the line go up.
- **The Evaluator (secondary, non-end-user).** An engineer/PM scoring how faithfully a coding agent implemented this spec. Cares about correctness, architecture, and polish.

---

## 5. Scope — modules & user stories

Eight modules, organized around a central dashboard. **MVP priority** is marked P0 (must-have v1) / P1 (v1 if time) / P2 (fast-follow).

### 5.1 Overview Dashboard — P0
The home screen. Answers the headline questions instantly.
- KPI cards: **Net Worth**, **Cash In (month-to-date)**, **Cash Out (month-to-date)**, **Net Cash Flow**. Current-month figures are month-to-date and labeled "MTD" so a partial month isn't read as a full one.
- Net worth trend chart (line, last 12 months).
- Spending-by-category breakdown (donut or bar, current month).
- Recent transactions (latest 5–8) with quick category badges.
- Upcoming subscriptions / recurring charges (next 30 days).
- A single "improving or getting worse?" signal (e.g., net worth vs last month, with up/down delta).

**Stories**
- As Alex, I open the app and immediately see my net worth and this month's in/out without clicking.
- As Alex, I can tell at a glance whether I'm trending up or down vs last month.

### 5.2 Transactions — P0
The system of record for cash flow.
- Paginated, searchable, filterable list (by date range, account, category, type, amount).
- Add / edit / delete a transaction (date, payee, amount, account, category, note, income vs expense).
- Record **transfers** between two Accounts (from → to); a transfer adjusts both balances and is excluded from income/expense, cash flow, and category totals.
- Bulk recategorization.
- Auto-categorization on create via simple rules (payee keyword → category); user can override.

**Stories**
- As Alex, I can search "coffee" and see every related transaction.
- As Alex, I can recategorize a transaction and have every total update consistently.

### 5.3 Income & Expense Tracking — P0
- Monthly income vs expense summary with month switcher.
- Spending by category with month-over-month comparison.
- Top merchants / payees.

**Stories**
- As Alex, I can see where my money went this month vs last month.

### 5.4 Subscription Tracker — P0
- Manually track recurring charges you add (Netflix, Spotify, gym, SaaS, etc.). A Subscription is the **single source of truth** for its recurring cost — it is *not* also entered as a Transaction, and there is no "Subscriptions" transaction category.
- Per-subscription: name, amount, cadence (monthly/annual/weekly/quarterly), next charge date, category, status (active/paused/canceled).
- **Normalized monthly cost** and **annualized cost** totals.
- Active subscriptions count into Expenses/spending (smoothed by normalized monthly cost; see §7 money-math).

**Stories**
- As Alex, I can see everything I'm subscribed to and my total monthly recurring spend.
- As Alex, I can see what I'd save annually by canceling something.

### 5.5 Assets & Investments — P0
Owned value is modeled by **three disjoint entities** so nothing is double-counted:
- **Accounts** — cash only (checking, savings, cash); the balance counts as a cash asset.
- **Holdings** — investments (stocks, ETFs, crypto): quantity × (static mock) current price. No live market data in v1.
- **Other Assets** — non-cash, non-market items (retirement balance, real estate, vehicle, other).
- Per-item: name, type, value (or quantity/price for Holdings), optional last-updated.
- All three roll up into total assets / net worth, each counted exactly once.

**Stories**
- As Alex, I can list what I own and see the total value of my assets.

### 5.6 Debts / Liabilities — P0
- Track liabilities (debts): credit card, student loan, mortgage, auto loan, personal loan, other.
- Per-debt: name, type, current balance, APR, minimum payment, optional original amount.
- Total debts roll up into net worth.

**Stories**
- As Sam, I can see all my debts, their balances, and total amount owed.

### 5.7 Net Worth Tracking — P0
- Net worth = total assets − total debts.
- Trend over time from **monthly `NetWorthSnapshot`s**: demo data is seeded with history; for real users the current month's snapshot is **captured/upserted on dashboard view** (no cron), so history accrues going forward. **No pre-signup backfill** — until months accumulate, the chart shows a short series with an empty-state hint. Snapshots store the *true* net worth at capture time (so the trend reflects market/asset revaluation, not a cash-flow estimate). See ADR-0001.
- Breakdown view: assets vs debts composition.

**Stories**
- As Sam, I can watch my net worth climb month over month.

### 5.8 Financial Insights — P1
Rule-based in v1 (no AI). Surfaces computed observations.
- "Spending up X% vs last month in {category}."
- "Net worth {up/down} ${amount} this month."
- "{N} subscriptions cost ${total}/mo; largest is {name} at ${amount}/mo."
- "Largest expense this month: {payee}."
- Overall health signal: improving / stable / declining.

**Stories**
- As Alex, I get plain-language nudges about what changed and what to look at.

> **P2 fast-follow:** light AI layer that turns the computed insights into a short natural-language monthly summary.

---

## 6. Information architecture & navigation

- Persistent left sidebar (desktop) / bottom nav (mobile): **Dashboard, Transactions, Spending, Subscriptions, Assets, Debts, Net Worth, Insights**.
- Global top bar: month/period selector, account filter, search, user menu.
- Each module: header with key totals → primary visualization → detail table/list.

---

## 7. Data model (Prisma-oriented)

Authoritative entity sketch. Money stored as integer **minor units (cents)** to avoid float errors; never use floats for money.

- **User** — id, email, passwordHash, name, baseCurrency, expectedMonthlyIncomeCents?, savingsTargetCents?, createdAt. `expectedMonthlyIncome` and `savingsTarget` are **reference values** for onboarding/insights only — never summed into actual Income/Expenses (actual income comes from Transactions). `baseCurrency` is display-only (never converted).
- **Account** (cash only) — id, userId, name, type (`CHECKING|SAVINGS|CASH`), institution?, openingBalanceCents, createdAt. **Current balance is derived** (= openingBalance + Σ transactions − Σ transfers out + Σ transfers in) and counts as a cash asset in net worth. See ADR-0002.
- **Transaction** — id, userId, accountId (required), date, payee, amountCents (signed: positive = inflow, negative = outflow), type (`INCOME|EXPENSE`), categoryId, note, createdAt.
- **Transfer** — id, userId, fromAccountId, toAccountId, amountCents (positive), date, note, createdAt. Moves money between two Accounts; adjusts both balances; **excluded from all income/expense/cash-flow/category math** (it is not a Transaction).
- **Category** — id, userId?, name, parentId?, icon, color, kind (`INCOME|EXPENSE`). Seeded defaults + user-custom. No "Subscriptions" category — recurring costs are Subscriptions, not transactions.
- **Subscription** — id, userId, name, amountCents, cadence (`MONTHLY|ANNUAL|WEEKLY|QUARTERLY`), nextChargeDate, categoryId, status (`ACTIVE|PAUSED|CANCELED`), createdAt. Single source of truth for its recurring cost; never also a Transaction.
- **Holding** (investments) — id, userId, name, ticker?, assetType (`STOCK|ETF|CRYPTO`), quantity, avgCostCents, currentPriceCents (static mock), createdAt.
- **OtherAsset** (non-cash, non-market) — id, userId, name, type (`RETIREMENT|REAL_ESTATE|VEHICLE|OTHER`), valueCents, lastUpdated.
- **Liability** (debts) — id, userId, name, type (`CREDIT_CARD|STUDENT_LOAN|MORTGAGE|AUTO_LOAN|PERSONAL_LOAN|OTHER`), balanceCents, aprBps?, minPaymentCents?, originalAmountCents?, lastUpdated.
- **NetWorthSnapshot** — id, userId, date, totalAssetsCents, totalDebtsCents, netWorthCents. One row per user per month (unique `userId`+month); current month is upserted on dashboard view. Seeded historically for the demo user; for real users history accrues going forward (no backfill). See ADR-0001.

### Money-math rules (must be exact)
1. All amounts are integer cents; render with currency formatting only at the edge.
2. **Net worth** = Σ(Account current balance) + Σ(Holding.quantity × Holding.currentPriceCents) + Σ(OtherAsset.valueCents) − Σ(Liability.balanceCents). The four entity types are disjoint, so each value is counted exactly once (no double-counting by construction).
3. **Income (month)** = Σ positive transactions in the period. **Expenses (month)** = Σ |negative| expense transactions in the period **+** Σ normalized-monthly cost of *active* Subscriptions (smoothed; counted once, never also a transaction). **Net cash flow** = income − expenses.
4. **Subscription normalized monthly** = amount × (cadence→monthly factor): weekly ×52/12, monthly ×1, quarterly ×1/3, annual ×1/12.
5. Category totals (for the active period, across every view) = Σ that category's transactions + the normalized-monthly cost of active Subscriptions in that category.
6. **Transfers** move money between Accounts and are excluded from income, expenses, net cash flow, and category totals — they change Account balances only, never net worth.
7. **Period semantics:** current-month KPIs are **month-to-date** (labeled "MTD"). Month-over-month comparisons and insights ("vs last month", improving/declining) use the **last complete month vs the month before it** — never the partial current month. Net-worth "vs last month" uses monthly snapshots.
8. **Account balance is derived:** currentBalance = openingBalanceCents + Σ(transaction amountCents on the account) − Σ(transfers out) + Σ(transfers in). Balances, cash, and net worth therefore reconcile to the penny by construction.

> **A-note (double-counting): resolved.** Cash lives only in `Account`, investments only in `Holding`, other owned items only in `OtherAsset`, and debts only in `Liability`. These sets are disjoint, so net worth sums each value exactly once by construction. A reconciliation unit test guards it.

---

## 8. Seed data requirements

A realistic single demo user (`demo@financehub.app`) with:
- 2–4 cash **Accounts** (checking/savings/cash).
- ~12 months of transactions (a few hundred), with believable payees, salary deposits, and seasonality.
- 6–10 **Subscriptions** of mixed cadence.
- 3–5 **Holdings** (stocks/ETFs/crypto, static mock prices) and 2–4 **Other Assets**.
- 2–4 **Liabilities** (debts).
- 12 monthly **NetWorthSnapshots** showing a generally improving (but non-monotonic) trend.

Seed must be deterministic and runnable via a single command. In addition to the seeded demo user, any user can **"Load demo data"** to populate their own empty workspace and **"Clear all data"** to wipe it (confirm dialog) — demo records are normal data with no provenance flag.

---

## 9. UX & design direction

- **Tone:** calm, premium, confidence-inspiring. Mint/Monarch/Copilot energy — not a SaaS admin table.
- Generous whitespace, strong numeric typography, restrained color; semantic color only for up/down/positive/negative.
- Light + dark mode.
- Every list/chart has explicit **loading, empty, and error** states.
- Charts: net worth line, spending donut/bar, cash-flow bars. Accessible (labels, not color-only).
- Fast perceived performance: skeletons, optimistic edits where safe.
- Accessibility: keyboard navigable, focus states, ARIA on interactive controls, sufficient contrast.

---

## 10. Technical requirements

- **Framework:** Next.js (App Router), TypeScript, Server Components for data fetching; Server Actions or route handlers for mutations.
- **DB/ORM:** Postgres + Prisma. Migrations checked in.
- **UI:** Tailwind + shadcn/ui; a charting lib (e.g., Recharts/visx).
- **Auth:** email/password (e.g., Auth.js/NextAuth credentials) with hashed passwords; protected routes; per-user data scoping on every query.
- **Architecture:** dedicated domain/aggregation layer (money math, net worth, summaries) separate from UI; no duplicated business logic in components.
- **Quality:** typed end-to-end; lint + typecheck clean; a handful of unit tests for the money-math functions.
- **Setup:** one documented path from clone → install → migrate → seed → run.

---

## 11. Acceptance criteria (v1 "done")

- [ ] User can sign up / log in; all data is scoped to the user.
- [ ] Dashboard shows Net Worth, Cash In, Cash Out, Net Cash Flow, net-worth trend, spending breakdown, recent transactions, upcoming subscriptions, and an up/down signal — above the fold on desktop.
- [ ] Transactions: list with search + filters; create/edit/delete; recategorize; totals stay consistent everywhere.
- [ ] Spending view: month switcher; category breakdown with MoM comparison; top payees.
- [ ] Subscriptions: list with cadence, next charge, status; correct normalized monthly + annual totals; counted into expenses once, never duplicated as transactions.
- [ ] Accounts, Holdings, Other Assets, and Liabilities: full CRUD; each rolls into net worth exactly once.
- [ ] Transfers between accounts adjust both balances and never affect income, expenses, cash flow, or net worth.
- [ ] Account balances are derived (opening balance + activity) and reconcile to the penny.
- [ ] Net Worth: equals assets − debts everywhere; 12-month trend renders from snapshots.
- [ ] Insights: at least 4 rule-based insights + an overall health signal.
- [ ] Seed command produces the section-8 dataset; app runs clean from a fresh clone.
- [ ] Light + dark mode; loading/empty/error states; basic a11y pass.
- [ ] All money math validated by unit tests.

---

## 12. Milestones

1. **M0 — Foundation:** Next.js app, Prisma schema, auth, seed script, layout/nav shell.
2. **M1 — Data & money core:** Transactions CRUD + aggregation layer + money-math tests.
3. **M2 — Dashboard:** KPI cards, net-worth trend, spending breakdown, recent activity.
4. **M3 — Modules:** Subscriptions, Assets, Debts, Net Worth views.
5. **M4 — Insights + polish:** rule-based insights, empty/error states, dark mode, a11y, design pass.
6. **M5 (fast-follow):** light AI monthly summary; CSV import.

---

## 13. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Double-counting in net worth | Disjoint entities (Account=cash, Holding=investments, OtherAsset=other, Liability=debts) — each value counted once; reconciliation unit test |
| Float rounding errors in money | Integer cents everywhere; format only at render |
| "Admin panel" feel instead of premium | Explicit design direction (§9) + design review gate in success criteria |
| Scope creep (budgets, AI, Plaid) | Hard non-goals (§2); P2 fast-follow lane |
| Ambiguity hurts benchmark fairness | Executable acceptance criteria (§11) + deterministic seed (§8) |

---

## 14. Future / out-of-scope backlog

Plaid/Teller live aggregation · budgeting & goals · AI chat + recommendations · multi-currency + FX · CSV/OFX import · shared household accounts · mobile-native apps · Stripe premium tier · investment live pricing · alerts/notifications.
