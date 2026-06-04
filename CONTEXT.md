# finance bro

The ubiquitous language for finance bro — a personal finance dashboard where a person tracks their income, spending, subscriptions, accounts, investments, debts, and net worth. This file is a glossary only; it holds no implementation details.

## Language

**User**:
The authentication identity — the person who signs up and logs in. Owns all of their own financial records.
_Avoid_: Account (when you mean the login), Customer, Member

**Account**:
A cash-holding place owned by a User — a checking account, savings account, or physical cash. Its current balance is *derived* from an opening balance plus its Transactions and Transfers, and counts toward cash balance and net worth. Always financial, never the login.
_Avoid_: Account (to mean the login — use User), Wallet, Bank

**Holding**:
A single investment position a User owns — a stock, ETF, or crypto — with a quantity and an average cost. Valued at a (mock) current price. The set of Holdings is the User's portfolio.
_Avoid_: Investment (as an entity), Position, Security

**OtherAsset**:
A manually-tracked owned item that is neither cash (Account) nor a market position (Holding) — e.g. retirement balance, property, a vehicle, valuables.
_Avoid_: Asset (the bare word — that's the umbrella sum), ManualAsset

**Assets** (umbrella):
A calculated net-worth category, not a table: the combined value of all Accounts (cash) + Holdings (investments) + OtherAssets. "Total assets" means this sum.
_Avoid_: using "Asset" (singular entity) to mean this total

**Liability**:
A single debt a User owes — credit card, student loan, mortgage, auto loan, personal loan, or other — with a current balance. Reduces net worth.
_Avoid_: Debt (as the entity name — that's the umbrella), Loan (as a catch-all)

**Debts** (umbrella):
A calculated net-worth category, not a table: the combined balance of all Liabilities. "Total debts" means this sum.
_Avoid_: using "Liability" (singular entity) to mean this total

**Transaction**:
A single, actual money movement — income or expense — recorded against one Account on a date, with a category. One-off by nature; recurring costs are Subscriptions and money moved between Accounts is a Transfer — neither is a Transaction.
_Avoid_: Entry, Payment, Record

**Transfer**:
A movement of money from one Account to another. Adjusts both balances but is never Income or Expense — excluded from cash flow, spending, and net worth.
_Avoid_: Transaction (a Transfer is not one), Payment

**Subscription**:
A recurring Expense a User commits to, with a cost, billing cycle, next renewal date, and status (active/paused/canceled). It IS counted as spending and is the single source of truth for that recurring cost — the same charge is never also logged as a Transaction.
_Avoid_: Recurring transaction, Bill, Plan; do not also tag it as a "Subscriptions" Transaction category

**Expenses** (umbrella):
A calculated "money out" category: one-off expense Transactions plus active Subscriptions. Feeds Monthly Expenses, cash flow, savings rate, and spending-by-category.
_Avoid_: treating Subscriptions as separate from Expenses (they are part of it)

**Income**:
A calculated "money in" category: the sum of income-type Transactions in a period. The single source of truth for Monthly Income, cash flow, and savings rate.
_Avoid_: deriving income from the Expected monthly income setting

**Expected monthly income**:
A Settings reference value (the User's typical salary). Used only for onboarding defaults, demo seeding, and goal/insight comparisons — never summed into Income.
_Avoid_: monthlySalary (as a source of actual income), Salary (as a number that counts)

**Demo data**:
Seeded sample records (Accounts, Transactions, Subscriptions, Holdings, OtherAssets, Liabilities) used to make a fresh workspace look alive. Indistinguishable from real data — no provenance flag. "Clear all data" deletes everything for the User (not just demo).
_Avoid_: "Reset demo data" (implies only demo is removed), Seed data, Sample mode

**Currency**:
A per-User display preference (symbol + formatting) only. All money is stored as plain unitless numbers and is never converted — changing Currency just relabels.
_Avoid_: exchange rate, FX, multi-currency, per-record currency

**Net worth**:
A User's total Assets minus total Debts at a point in time.
_Avoid_: Equity, Balance

**Net worth snapshot**:
A stored record of a User's net worth (and its asset/debt totals) for one month. Demo data seeds history; for real Users the current month is captured on dashboard view and history accrues going forward (no backfill). The source of truth for the net-worth trend.
_Avoid_: reconstructing the trend from cash flow

## Flagged ambiguities

- **"Account"** must never mean the login — that's a **User**. Account is always cash.
- **"Asset"** (singular) is the **OtherAsset** entity; the umbrella total is **Assets** (Accounts + Holdings + OtherAssets).
- **Subscriptions are Expenses** (single source of truth), so there is no "Subscriptions" Transaction category — recurring costs live only as Subscriptions.
- **"This month"** KPIs are **month-to-date**; **"vs last month"** comparisons/insights use the **last completed month**, not the partial current one.
