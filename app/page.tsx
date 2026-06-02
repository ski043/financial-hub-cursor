import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  LayoutDashboard,
  Lightbulb,
  Lock,
  PieChart,
  Receipt,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { SiteHeader } from "@/components/landing/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: LayoutDashboard,
    title: "Overview dashboard",
    body: "Net worth, cash flow, spending, and upcoming charges — your whole financial life above the fold.",
  },
  {
    icon: Receipt,
    title: "Transactions",
    body: "Search, filter, and recategorize. Every total stays consistent across every view, to the penny.",
  },
  {
    icon: PieChart,
    title: "Spending & income",
    body: "See exactly where your money goes each month, with clear month-over-month comparisons.",
  },
  {
    icon: RefreshCw,
    title: "Subscriptions",
    body: "Track every recurring charge with normalized monthly and annual totals. Catch what you forgot.",
  },
  {
    icon: Wallet,
    title: "Assets & investments",
    body: "Cash, holdings, and other assets roll up into one number — each counted exactly once.",
  },
  {
    icon: CreditCard,
    title: "Debts",
    body: "Credit cards, loans, and balances in one place. Watch the number go down.",
  },
  {
    icon: TrendingUp,
    title: "Net worth tracking",
    body: "A 12-month trend from real monthly snapshots, so you can tell if things are getting better.",
  },
  {
    icon: Lightbulb,
    title: "Insights",
    body: "Plain-language nudges about what changed this month and what deserves a second look.",
  },
];

const questions = [
  "How much do I have right now?",
  "How much came in and went out this month?",
  "Where is my money actually going?",
  "What am I paying for in subscriptions?",
  "What do I own and what do I owe?",
  "Is my net worth trending up or down?",
];

const steps = [
  {
    step: "01",
    title: "Load your data",
    body: "Start with realistic demo data in one click, or add your accounts, transactions, and balances manually.",
  },
  {
    step: "02",
    title: "See the full picture",
    body: "Everything rolls up into a single calm dashboard — net worth, cash flow, spending, and trends.",
  },
  {
    step: "03",
    title: "Track what changes",
    body: "Monthly snapshots and rule-based insights show whether you're improving, month over month.",
  },
];

const faqs = [
  {
    q: "Does Finance Hub connect to my bank?",
    a: "Not in this version. You add accounts and transactions manually, or load realistic demo data to explore. No bank credentials, ever.",
  },
  {
    q: "How is net worth calculated?",
    a: "Net worth is total assets minus total debts. Cash, investments, and other assets are tracked as separate, non-overlapping sets, so every value is counted exactly once.",
  },
  {
    q: "How are subscriptions counted?",
    a: "Each subscription is the single source of truth for its recurring cost. We smooth it into a normalized monthly figure so your spending stays stable and legible.",
  },
  {
    q: "Is my data private?",
    a: "Your data is scoped to your account and never sold or shared. You can clear everything at any time.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* ambient background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-1/2 top-[-10%] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
          </div>

          <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-20 sm:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                  <Sparkles className="size-3.5 text-primary" />
                  Calm, premium personal finance
                </span>
              </div>

              <h1 className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-100 duration-700 mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                Your complete financial life,
                <span className="block text-muted-foreground">
                  in one dashboard.
                </span>
              </h1>

              <p className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-200 duration-700 mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                Net worth, cash flow, spending, subscriptions, assets, and debts —
                tracked over time and reconciled to the penny. Finally answer
                &ldquo;am I okay?&rdquo; at a glance.
              </p>

              <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-300 duration-700 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 w-full px-6 text-[15px] sm:w-auto",
                  )}
                >
                  Open your dashboard
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 w-full px-6 text-[15px] sm:w-auto",
                  )}
                >
                  Sign in
                </Link>
              </div>

              <p className="animate-in fade-in fill-mode-both delay-500 duration-700 mt-4 text-xs text-muted-foreground">
                No bank connection required · Light &amp; dark mode · Free to explore
              </p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-500 duration-1000 relative mx-auto mt-16 max-w-4xl">
              <DashboardPreview />
            </div>
          </div>
        </section>

        {/* Questions band */}
        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                The questions everyone struggles to answer.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Your money lives in fragments — accounts, cards, brokerages, and
                buried receipts. Finance Hub answers the basics without a
                spreadsheet.
              </p>
            </div>
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {questions.map((q) => (
                <li
                  key={q}
                  className="flex items-start gap-3 text-sm text-foreground/90"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="size-3" />
                  </span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-primary">Everything in one place</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Eight modules, one calm overview
              </h2>
              <p className="mt-4 text-muted-foreground">
                Each part of your finances gets a dedicated, beautifully simple
                view — all wired to a single, consistent source of truth.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-card p-6 transition-colors hover:bg-muted/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-medium tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / penny-perfect */}
        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Lock className="size-3.5 text-primary" />
                Built on exact money math
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Numbers you can actually trust
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every amount is stored in exact cents and only formatted at the
                edge — no floating-point drift. Account balances are derived from
                their history, so cash, spending, and net worth always reconcile.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Net worth reconciles to the penny across every view",
                  "Transfers move money without distorting cash flow",
                  "Subscriptions counted once — never double-booked",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <ShieldCheck className="size-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {[
                { value: "9/9", label: "Money questions answered" },
                { value: "12 mo", label: "Net-worth trend history" },
                { value: "$0.00", label: "Rounding error, by design" },
                { value: "100%", label: "Your data, scoped to you" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card p-6">
                  <dt className="font-mono text-3xl font-semibold tracking-tight tabular-nums">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-primary">How it works</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                A populated dashboard in under a minute
              </h2>
            </div>
            <ol className="mt-14 grid gap-8 md:grid-cols-3">
              {steps.map((step) => (
                <li key={step.step} className="relative">
                  <span className="font-mono text-sm font-medium text-primary">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-lg font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 border-t border-border/60 bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20">
            <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Frequently asked
            </h2>
            <dl className="mt-12 divide-y divide-border">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-6">
                  <dt className="font-medium tracking-tight">{faq.q}</dt>
                  <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center shadow-sm">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-40 bg-gradient-to-b from-primary/[0.08] to-transparent"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                See your whole financial picture today
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Open the dashboard with realistic demo data, or sign in to start
                tracking your own.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 w-full px-6 text-[15px] sm:w-auto",
                  )}
                >
                  Open your dashboard
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 w-full px-6 text-[15px] sm:w-auto",
                  )}
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <PieChart className="size-3.5" />
            </span>
            Finance Hub
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Finance Hub. Your money, in focus.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="#features" className="transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </Link>
            <Link href="/login" className="transition-colors hover:text-foreground">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
