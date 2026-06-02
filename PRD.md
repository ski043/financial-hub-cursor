# Finance Hub — Product Requirements Document

| | |
|---|---|
| **Status** | Draft v1 — ready to build |
| **Author** | Jan Marshal |
| **Last updated** | June 2, 2026 |
| **Target MVP launch** | "Demo Day" — a clickable, video-ready build |
| **One-line pitch** | Your entire financial life — income, spending, subscriptions, assets, debts, investments, and net worth — in one calm, modern dashboard. |

---

## 1. TL;DR

Finance Hub is a full-stack personal finance dashboard that lets an everyday person see their **complete financial picture in one place** and answer the question *"Am I doing okay?"* in under ten seconds.

The MVP is a **real, working app** — not a static mockup. Users sign up, manage their own transactions, subscriptions, assets, debts, and investments, and watch the dashboard, charts, and insights recompute from that data. A one-click **"Load demo data"** button instantly populates six months of realistic financial history so the product looks alive on first open and demos cleanly on video.

We are intentionally **not** building bank integrations, live market data, payments, tax tooling, or compliance. The bar is "feels like a real consumer fintech product you'd happily click through," scoped tightly enough to build fast.

---

## 2. Press release (working-backwards)

> **FOR IMMEDIATE RELEASE**
>
> **Finance Hub launches a calmer way to understand your money — all of it, in one place.**
>
> Today we're releasing Finance Hub, a personal finance dashboard that brings together everything that's normally scattered across banking apps, spreadsheets, brokerage logins, and the back of your mind.
>
> Most people can't answer a simple question: *"How am I actually doing financially?"* Their checking balance lives in one app, their subscriptions hide on credit card statements, their investments sit in a brokerage they rarely open, and their net worth is a number they've never actually calculated. Finance Hub fixes that.
>
> In one clean screen, Finance Hub shows your total net worth, this month's income and expenses, your cash flow and savings rate, where your money is going, which subscriptions are quietly draining you, what you own, what you owe, and whether things are trending up or down. It turns raw transactions into clear charts and plain-language insights like *"Your spending is up 18% vs last month"* or *"A €240 subscription renews in 3 days."*
>
> "We didn't want another intimidating accounting tool," said the team. "We wanted the feeling of finally seeing the whole board — calm, clear, and honest."
>
> Finance Hub is available today. Create an account, load a demo workspace to explore in seconds, or start adding your own numbers and watch your financial picture come to life.

**Why this works as our north star:** if the dashboard doesn't make a stranger go *"oh, I get it"* within ten seconds, we've missed.

---

## 3. Problem & context

### The problem
A normal person's financial life is **fragmented and invisible**:

- **Balances** are split across checking, savings, and cash.
- **Spending** is buried in transaction history nobody reviews.
- **Subscriptions** silently recur and accumulate.
- **Investments & crypto** sit in separate apps.
- **Debts** (credit cards, car loans, student loans) are felt but rarely totaled.
- **Net worth** — the single most honest financial number — is almost never calculated.

The result: people *feel* anxious or fine, but they don't *know*. There's no single, friendly place that says "here's where you stand, and here's the trend."

### Why now
1. **The build is the point.** This project is an end-to-end exercise to prove a coding agent can ship a real full-stack product — product structure, data modeling, CRUD, auth, dashboard math, charts, responsive design, seed data, and useful financial logic — not a toy.
2. **Foundation for a real product.** This is also an early, deliberate step toward something potentially launchable, so the data model and architecture should be sound enough to grow on, even if features are scoped to an MVP.
3. **The tooling moment.** A modern stack (Next.js App Router, Prisma, shadcn/ui, better-auth) makes a polished, real-data fintech UI achievable quickly — so the opportunity cost of doing it "for real" instead of as a fake mockup is low.

### Who it's for
**Primary persona — "Maya, the organized-but-overwhelmed earner."** Has a salary, rent, a pile of subscriptions, a checking + savings account, some index funds and a little crypto, plus a credit card balance and a car loan. She's financially curious but doesn't want a spreadsheet or an accountant. She wants **one screen that tells the truth**.

After Finance Hub ships, Maya logs in, sees her net worth and this month's cash flow at a glance, notices she's overspending on restaurants, spots a subscription she forgot, and feels *in control* — in minutes, not hours.

---

## 4. Goals & non-goals

### Goals (what success requires)
- A **real, persistent, multi-section app** a user can sign up for and use.
- **Full CRUD** (create, read, update, delete) in Transactions, Subscriptions, Assets/Debts, and Investments — and it persists.
- **Dashboard metrics and charts computed from the user's data**, never hardcoded.
- **One-click demo data** so the app looks alive immediately and demos beautifully on video.
- **Polished, calm, finance-appropriate UI** that works on desktop, tablet, and mobile.
- **Rule-based insights** that make the product feel smart without AI.

### Non-goals (explicitly out of scope for MVP)
- Real bank connections / Plaid / open banking.
- Live/real-time market data as a requirement.
- Payment processing, billing, or paid plans (the product is free; no pricing section).
- Tax planning, regulated financial advice, multi-currency FX.
- Multi-user households, sharing, roles/permissions.
- Native mobile apps.
- Production-grade security audits, compliance, advanced account management.
- Email-based auth flows (verification, password reset emails).

> These may appear as **visual placeholders** (e.g., a "Connect account" button that opens a "coming soon" modal) but must not be implemented.

---

## 5. Success criteria

This MVP is "done" when **all** of the following are demonstrably true:

| # | Success signal | How we'll verify it |
|---|---|---|
| S1 | **Click-through realism** | A new user can navigate every section and it feels like a shipped consumer app. |
| S2 | **Persistent CRUD** | Create/edit/delete a record in each core section; refresh; the change persists in Postgres. |
| S3 | **Computed dashboard** | Changing or deleting underlying data visibly changes dashboard metrics and charts (nothing hardcoded). |
| S4 | **Demo-ready** | "Load demo data" produces a rich, believable financial picture; the full happy path records cleanly as a video. |
| S5 | **Responsive & polished** | Layout holds up and stays usable at desktop, tablet, and mobile breakpoints. |

**Guardrail metric:** *Time-to-"I get it"* — a first-time viewer of the dashboard understands their financial standing in **≤10 seconds**.

---

## 6. Product scope — app map

```
Public
  └─ Landing page (marketing, value prop, dashboard preview, features, trust, FAQ, CTA — free, no pricing)
  └─ Auth (sign up / log in / log out)

Protected app (requires session)
  ├─ Dashboard        ← the hero screen; everything summarized
  ├─ Transactions     ← income & expenses, full CRUD + search/filter/categorize
  ├─ Subscriptions    ← recurring spend, full CRUD + renewal math
  ├─ Net Worth        ← assets & debts, full CRUD + net worth over time
  ├─ Investments      ← portfolio overview, holdings, allocation, gain/loss
  ├─ Insights         ← rule-based observations
  └─ Settings         ← profile, currency, salary, savings target, placeholders
```

---

## 7. Detailed requirements

Each area lists **user stories** and **acceptance criteria** (AC). Requirements use MoSCoW: **[M]ust**, **[S]hould**, **[C]ould**.

### 7.1 Landing page `[M]`
**Story:** As a visitor, I understand what Finance Hub is and why I'd want it within seconds, and I can sign up.

- **AC1** Sections present: hero with headline + CTA, value proposition, **dashboard preview** (real-looking screenshot/visual), feature highlights, trust/security section, FAQ, footer CTA.
- **AC2** Feels premium, trustworthy, calm, modern — consistent with the in-app design language.
- **AC3** Fully responsive; primary CTA routes to sign up.
- **AC4** **Finance Hub is free** — a simple "free, no credit card" callout near the CTA; no pricing tiers or payment.

### 7.2 Authentication `[M]`
**Story:** As a user, I can create an account and log in, and I can't reach the app while logged out.

- **AC1** Sign up, log in, log out using **better-auth** with **email + password** (no email sending/verification/reset).
- **AC2** All `/app/*` routes are **protected**; unauthenticated users are redirected to login.
- **AC3** Each user only ever sees **their own** data (row-level ownership by `userId`).
- **AC4** Sensible auth UX: validation errors, loading states, "already have an account?" links.

### 7.3 Dashboard `[M]`
**Story:** As a user, I open one screen and immediately understand my financial standing and trend.

**Time scope:** the dashboard has a **period selector** with presets — *This month* (default), *Last 30 days*, *Last 3 months*, *Year to date*, and *All time* — plus a custom range. Period-sensitive metrics (income, expenses, cash flow, savings rate, spending-by-category) respect the selection; balance-type metrics (net worth, cash, investments, debt) reflect current state.

**Metric cards (computed from data):**
- Total net worth, Cash balance, Monthly income, Monthly expenses, Monthly cash flow, Savings rate, Subscription spend (monthly), Investment value, Total debt.

**Visualizations:**
- Net worth over time (line/area), Income vs expenses (bar/grouped, by month), Spending by category (donut/bar), Asset allocation (donut).

**Summary widgets:**
- Recent transactions (latest N), Upcoming subscription renewals, Top spending categories, Financial insights (top 2–3), Investment summary.

- **AC1** Every number is derived from the user's records for the **current period** (see §8 for formulas); zero hardcoded values.
- **AC2** With demo data loaded, the dashboard looks rich and believable; with an empty account, **empty states** guide the user to add data or load the demo.
- **AC3** Charts use a single charting lib (Recharts) and are responsive.
- **AC4** Each summary widget links to its full section.

### 7.4 Transactions `[M]`
**Story:** As a user, I manage my income and expenses and trust that they power the rest of the app.

- **Fields:** description, amount, type (`income` | `expense`), category, **account (required link to an Account, §7.6)**, date, notes.
- **Categories (seed list):** Salary, Rent, Groceries, Restaurants, Transport, Shopping, Subscriptions, Investments, Travel, Health, Utilities, Insurance, Other.
- **AC1** Full CRUD with a clean form (modal or side panel) and inline validation.
- **AC2** **Search** by description; **filter** by type, category, account, and date range.
- **AC3** Sort by date/amount; paginated or virtualized list for long histories.
- **AC4** Changes immediately affect dashboard metrics and charts.
- **AC5** Amounts display in the user's selected currency (§7.9).

### 7.5 Subscriptions `[M]`
**Story:** As a user, I see every recurring cost and what it really adds up to.

- **Fields:** name, cost, billing cycle (`monthly` | `yearly` | `weekly` | `quarterly`), category, status (`active` | `paused` | `canceled`), next renewal date, payment method/account.
- **Computed:** monthly subscription spend (normalized across cycles), annualized spend, # active subscriptions, upcoming renewals (next 30 days), most expensive subscriptions.
- **AC1** Full CRUD.
- **AC2** Billing cycles are **normalized to a monthly figure** for totals (see §8).
- **AC3** Upcoming renewals surface here and on the dashboard.
- **AC4** Active-subscription monthly spend feeds the dashboard "Subscription spend" card.

### 7.6 Net Worth (Assets, Accounts & Debts) `[M]`
**Story:** As a user, I record what I own and owe and see my net worth and its trend.

- **Accounts as cash assets:** the **first-class `Account` entity** (checking / savings / cash) that transactions link to (§7.4) **doubles as a cash asset** — an account's balance counts toward total assets and the "cash balance" card. Non-cash assets (property, retirement, etc.) are tracked as standalone Assets.
- **Asset types:** checking, savings, cash *(via Accounts)*; stocks, ETFs, crypto *(via Investments, §7.7)*; retirement, property, other *(standalone Assets)*.
- **Liability types:** credit card, car loan, student loan, mortgage, personal loan, other.
- **Computed:** total assets (accounts + standalone assets + investment value), total liabilities, **net worth = assets − liabilities**, net worth over time.
- **AC1** Full CRUD for accounts, standalone assets, and liabilities (name, type, value/balance, notes).
- **AC2** Net worth recalculates live as items change.
- **AC3** Net-worth-over-time chart is **computed live on read** from current balances and reconstructed monthly cash-flow deltas from transaction history (no stored snapshot table — see §8.4); demo data's 6 months of transactions produce a believable curve.
- **AC4** "Cash balance" dashboard card = sum of all Account balances (checking + savings + cash).

### 7.7 Investments `[M]`
**Story:** As a user, I see a simple portfolio: what I hold, what it's worth, and my gain/loss.

- **Fields per holding:** asset name, ticker, asset type (`stock` | `etf` | `crypto`), quantity, average cost, current price, current value, gain/loss, gain/loss %.
- **Computed:** portfolio value, total gain/loss (abs + %), allocation by asset type, daily change (from mock price), per-holding value/gain.
- **AC1** Full CRUD for holdings.
- **AC2** **Current prices are static mock values stored in the DB**; `currentValue = quantity × currentPrice`, `gainLoss = currentValue − (quantity × avgCost)`.
- **AC3** Holdings table + allocation donut + summary cards.
- **AC4** Watchlist `[C]` and a "daily change" indicator `[S]` (derived from a stored previous-close field) if cheap to add.
- **AC5** Total investment value feeds the dashboard "Investment value" card and the asset-allocation view.

### 7.8 Insights `[M]`
**Story:** As a user, I get plain-language, useful observations about my finances.

Rule-based (no AI). Generated from the user's data. Examples:
- Spending is higher/lower than last month (with %).
- Savings rate this month is positive/negative (with value).
- A large subscription renewal is coming up (name + date + amount).
- Largest expense category this month.
- Net worth increased/decreased over the last N months.
- Subscription spending is trending up.
- Investment allocation is heavily concentrated in one asset type (>X%).

- **AC1** At least **6 distinct insight rules** implemented; each only shows when its condition is met.
- **AC2** Insights are ranked (e.g., by severity/recency) and the top few surface on the dashboard.
- **AC3** Each insight has an icon, a short title, and a one-line explanation; empty state when none apply.

### 7.9 Settings `[M]`
**Story:** As a user, I set basic preferences and the app respects them.

- **Fields:** name, email (read-only or editable), **preferred currency** (drives all formatting), monthly salary, savings target, notification preferences (toggles, presentational), connected accounts placeholder, data export placeholder.
- **AC1** Currency selection changes the display currency symbol/formatting app-wide (single currency, **no FX conversion**).
- **AC2** Monthly salary and savings target can feed insights/targets (e.g., savings-rate vs target).
- **AC3** Placeholders (connected accounts, export, notifications) render as believable but clearly non-functional ("coming soon").

### 7.10 Demo data `[M]`
**Story:** As a user (or demoer), I can fill the app with realistic data in one click, and reset it.

- **AC1** A **"Load demo data"** action seeds the current account with a coherent financial story.
- **AC2** A **"Reset demo data"** action clears the user's data back to empty (with confirm).
- **AC3** Demo dataset includes: ~6 months of transactions (salary, rent, groceries, restaurants, transport, utilities, subscriptions, health, travel) — which **drive the live-computed net worth trend** (§8.4); active subscriptions; checking + savings accounts; stock + ETF + crypto holdings; credit card debt + car loan.
- **AC4** After loading, every dashboard metric, chart, and insight is populated and believable.
- **AC5** Demo data is generated **per-user and owned by that user** (not global), so it round-trips through the same CRUD + calculation paths as real data.

---

## 8. Financial calculation logic (the part that must not be faked)

All figures derive from the user's records. "Current month" = calendar month of `now` in the user's context.

### 8.1 Cash flow & income/expense
- `monthlyIncome   = Σ amount where type=income  and date ∈ current month`
- `monthlyExpenses = Σ amount where type=expense and date ∈ current month`
- `monthlyCashFlow = monthlyIncome − monthlyExpenses`
- `savingsRate     = monthlyIncome > 0 ? monthlyCashFlow / monthlyIncome : 0` (shown as %)

### 8.2 Subscriptions (normalize to monthly)
- weekly → `cost × 52 / 12`; monthly → `cost`; quarterly → `cost / 3`; yearly → `cost / 12`.
- `monthlySubscriptionSpend = Σ normalizedMonthly where status=active`
- `annualizedSubscriptionSpend = monthlySubscriptionSpend × 12`
- `upcomingRenewals = subscriptions where nextRenewal ∈ [now, now+30d]`

### 8.3 Assets, debts, net worth
- `cashBalance      = Σ account.balance` (all Accounts: checking + savings + cash)
- `totalAssets      = cashBalance + Σ standaloneAsset.value + portfolioValue`
- `totalLiabilities = Σ liability.balance`
- `netWorth         = totalAssets − totalLiabilities`

### 8.4 Net worth over time (computed live, no snapshots)
- No `NetWorthSnapshot` table. The trend is **reconstructed on read**: start from the **current** `netWorth`, then walk backward month over month subtracting each month's net cash flow (`monthlyIncome − monthlyExpenses` from transactions) to estimate prior-month net worth.
- `netWorth[m-1] = netWorth[m] − netCashFlow(month m)`; produce a series for the selected range (default trailing 6 months).
- This keeps history "computed, not hardcoded," and demo data's 6 months of transactions yield a believable curve. *(Trade-off: the curve reflects cash-flow movement, not historical asset price/value changes — acceptable for the MVP.)*

### 8.5 Investments
- per holding: `currentValue = quantity × currentPrice`; `costBasis = quantity × avgCost`; `gainLoss = currentValue − costBasis`; `gainLossPct = costBasis > 0 ? gainLoss / costBasis : 0`.
- `portfolioValue = Σ currentValue`; `totalGainLoss = Σ gainLoss`; allocation = per-type share of `portfolioValue`.

### 8.6 Spending by category
- `categoryTotals = Σ amount grouped by category where type=expense and date ∈ current month`; "top categories" = sorted desc.

---

## 9. Tech architecture

| Layer | Choice |
|---|---|
| Framework | **Next.js 16 (App Router)**, React Server Components + Server Actions for mutations |
| Language | TypeScript (strict) |
| Styling/UI | **TailwindCSS + shadcn/ui** |
| Charts | **Recharts** (single charting lib for consistency) |
| Auth | **better-auth** — email + password, session-based; no email sending |
| ORM | **Prisma** |
| Database | **PostgreSQL** (hosted, e.g. Neon/Supabase Postgres in prod; local Postgres in dev) |
| Validation | Zod (shared client/server schemas) |
| Deployment | Vercel (app) + hosted Postgres *(assumption — easily changed)* |
| Money handling | Store amounts as integer minor units or `Decimal`; format by user currency on display |

**Principles:** server-side data fetching for protected pages; all mutations via Server Actions guarded by session + ownership checks; calculations live in a typed `lib/finance` module (pure functions, unit-testable) so dashboard math is single-sourced and trustworthy.

---

## 10. Data model (concise)

```
User          id, name, email, passwordHash(better-auth), currency,
              monthlySalary, savingsTarget, createdAt
Account       id, userId, name, type (checking|savings|cash), balance, createdAt
              // first-class; counts as a cash asset for net worth
Transaction   id, userId, description, amount, type (income|expense),
              category, accountId (required → Account), date, notes, createdAt
Subscription  id, userId, name, cost, billingCycle, category, status,
              nextRenewal, paymentMethod, createdAt
Asset         id, userId, name, type (retirement|property|other), value, notes, createdAt
              // standalone non-cash assets only; cash lives in Account, market assets in Holding
Liability     id, userId, name, type, balance, notes, createdAt
Holding       id, userId, name, ticker, assetType (stock|etf|crypto),
              quantity, avgCost, currentPrice, prevClose?, createdAt
```
No net-worth snapshot table — the trend is computed live (§8.4). Every record is owned by `userId`; all queries filter by the session user. (Final schema lives in `prisma/schema.prisma` at build time.)

---

## 11. Design direction

- **Feel:** premium, trustworthy, calm, clean, modern, clear. Clarity over visual noise.
- **System:** shadcn/ui components; a restrained finance palette (neutral base + one confident accent; semantic green/red used sparingly for gains/losses and cash flow).
- **Patterns:** card-based dashboard; generous whitespace; tabular data with clear hierarchy; clear empty states and loading skeletons; accessible color contrast.
- **Responsive:** mobile-first; sidebar collapses to a bottom/hamburger nav; charts and tables reflow gracefully on tablet/mobile.
- **Motion:** subtle, purposeful (hover/press feedback, chart enter), never flashy.

---

## 12. Build plan / milestones

1. **Foundation** — Next.js + Tailwind + shadcn + Prisma + Postgres + better-auth; protected route shell; base layout/nav.
2. **Data layer** — schema, migrations, `lib/finance` calc module + unit tests for §8 formulas.
3. **Core CRUD** — Transactions → Subscriptions → Assets/Debts → Investments (form + list + filters per section).
4. **Dashboard** — wire metric cards + charts + summary widgets to computed data; empty states.
5. **Insights** — implement ≥6 rules + ranking; surface on dashboard.
6. **Settings** — currency, salary, savings target, placeholders.
7. **Demo data** — seed generator + "Load/Reset demo data"; tune for a believable, video-ready picture.
8. **Landing page** — full marketing page + auth entry points.
9. **Polish pass** — responsive QA, loading/empty/error states, design consistency, record demo.

---

## 13. Key decisions & trade-offs (living log)

| Decision | Choice | Rationale / trade-off |
|---|---|---|
| Stack | Next.js 16 + Prisma + Postgres + shadcn + better-auth | Modern, fast to build, sound foundation for a real product. |
| Auth | better-auth, email+password, no email | Simplest viable real auth; skips email infra for MVP. |
| Demo data | Empty by default + "Load/Reset demo data" button | Showcases instantly *and* proves real CRUD/calc paths; avoids "fake dashboard" smell. |
| Currency | Single currency per user, no FX | Keeps money logic simple; FX is a known non-goal. |
| Investments | Static mock prices in DB | Looks like a real tracker without a market-data dependency. |
| Charts | Recharts | One consistent, React-friendly charting lib. |
| Money storage | Integer minor units / Decimal | Avoids float rounding errors in financial sums. |
| Net worth history | Computed live from balances + transaction cash flow (no snapshots) | Simpler schema; "computed not hardcoded." Trade-off: reflects cash flow, not asset-value history. |
| Dashboard period | Flexible range with presets (This month default, Last 30d, Last 3m, YTD, All time, custom) | More useful/demoable; balance metrics stay current-state. |
| Accounts | First-class `Account` entity; transactions require an account; accounts double as cash assets | One source of truth for cash; cleaner net-worth math. |
| Pricing | None — product is free, no tiers or payment | Removes Stripe/billing scope entirely for the MVP. |
| Deployment | Vercel + hosted Postgres | Default assumption; trivially swappable. |

---

## 14. Risks & mitigations

- **Scope creep into a real fintech** → strict non-goals (§4) and placeholders for anything bank/market/payment related.
- **Hardcoded-dashboard temptation** → all metrics routed through `lib/finance` pure functions with unit tests (S3 gate).
- **Demo data feels fake** → curate realistic amounts/cadence, 6 months of history, coherent net-worth trend.
- **Currency/decimal bugs** → integer-minor-units/Decimal storage + centralized formatting.
- **Responsive breakage** → mobile-first build + explicit breakpoint QA milestone.

---

## 15. Open questions

All initial open questions are **resolved** (see §13 Key decisions):

1. ~~Period selector~~ → **Resolved:** flexible range with presets (This month default).
2. ~~Accounts model~~ → **Resolved:** first-class `Account` entity; transactions require an account; accounts double as cash assets.
3. ~~Net worth snapshot cadence~~ → **Resolved:** no snapshots; net worth trend computed live from balances + transaction cash flow.
4. ~~Landing pricing tiers~~ → **Resolved:** none; the product is free.

*No open questions remain. New questions surfaced during the build will be logged here.*

---

## 16. FAQ

**Is this connected to my real bank?** No — Finance Hub is self-entered (or demo) data by design. Bank connections are explicitly out of scope.

**Are the stock/crypto prices live?** No — prices are realistic mock values stored in the app, so the portfolio behaves like a real tracker without a market-data dependency.

**What does it cost?** Nothing — Finance Hub is free, with no plans or payment in the MVP.

**Does it handle multiple currencies?** You pick one display currency in Settings. There's no FX conversion in the MVP.

**Will my data persist?** Yes — everything you create is saved to Postgres and tied to your account.

**Is it secure enough for real money decisions?** It's a demo-quality MVP, not an audited financial product. No compliance/security guarantees — by design.

---

## 17. Appendix — reference lists

- **Transaction categories:** Salary, Rent, Groceries, Restaurants, Transport, Shopping, Subscriptions, Investments, Travel, Health, Utilities, Insurance, Other.
- **Asset types:** checking, savings, cash, stocks, ETFs, crypto, retirement, property, other.
- **Liability types:** credit card, car loan, student loan, mortgage, personal loan, other.
- **Billing cycles:** weekly, monthly, quarterly, yearly.
- **Investment asset types:** stock, ETF, crypto.
