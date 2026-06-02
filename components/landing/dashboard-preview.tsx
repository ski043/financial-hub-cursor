import { ArrowUpRight, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

const trend = [38, 41, 39, 44, 47, 46, 52, 55, 53, 61, 64, 72];
const maxTrend = Math.max(...trend);

const spend = [
  { label: "Housing", pct: 34, color: "#6366f1" },
  { label: "Food", pct: 22, color: "#10b981" },
  { label: "Transport", pct: 16, color: "#06b6d4" },
  { label: "Lifestyle", pct: 15, color: "#f59e0b" },
  { label: "Other", pct: 13, color: "#8b5cf6" },
];

function buildLinePath(values: number[], width: number, height: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = width / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / span) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const W = 280;
const H = 90;
const linePath = buildLinePath(trend, W, H);
const areaPath = `${linePath} L${W},${H} L0,${H} Z`;

/**
 * A static, non-interactive snapshot of the product used to anchor the hero.
 * Intentionally hand-built (no real data) so the landing page stays self-contained.
 */
export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/5 ring-1 ring-black/[0.02] dark:shadow-black/40",
        className,
      )}
      aria-hidden
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <div className="ml-3 h-5 w-40 rounded-md bg-foreground/[0.06]" />
        <div className="ml-auto h-5 w-16 rounded-md bg-foreground/[0.06]" />
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-5">
        {/* Net worth + trend */}
        <div className="sm:col-span-3 rounded-xl border border-border/70 bg-background/60 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Net worth
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold tracking-tight tabular-nums">
                $312,480
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="size-3" />
              +4.2%
            </span>
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="mt-3 h-24 w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="preview-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#preview-area)" />
            <path
              d={linePath}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={W}
              cy={H - ((trend[trend.length - 1] - Math.min(...trend)) / (maxTrend - Math.min(...trend))) * H}
              r="3"
              fill="var(--primary)"
            />
          </svg>
        </div>

        {/* Spending donut */}
        <div className="sm:col-span-2 rounded-xl border border-border/70 bg-background/60 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            This month
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Donut segments={spend} />
            <ul className="space-y-1.5">
              {spend.slice(0, 4).map((s) => (
                <li key={s.label} className="flex items-center gap-1.5 text-[11px]">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-muted-foreground">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* KPI chips */}
        {[
          { label: "Cash in", value: "$5,810", tone: "up" },
          { label: "Cash out", value: "$3,944", tone: "down" },
          { label: "Subscriptions", value: "$214/mo", tone: "flat" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-border/70 bg-background/60 p-3 sm:col-span-1 [&:nth-child(3)]:sm:col-span-1"
          >
            <p className="text-[11px] font-medium text-muted-foreground">
              {kpi.label}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold tabular-nums">
              {kpi.value}
            </p>
          </div>
        ))}

        {/* Recent row */}
        <div className="sm:col-span-2 rounded-xl border border-border/70 bg-background/60 p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-muted-foreground">
              Latest
            </p>
            <ArrowUpRight className="size-3.5 text-muted-foreground" />
          </div>
          <div className="mt-2 space-y-2">
            {[
              ["Whole Foods", "-$82.40"],
              ["Payroll", "+$2,905"],
            ].map(([payee, amt]) => (
              <div
                key={payee}
                className="flex items-center justify-between text-[11px]"
              >
                <span className="text-foreground/80">{payee}</span>
                <span
                  className={cn(
                    "font-mono tabular-nums",
                    amt.startsWith("+")
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-foreground/70",
                  )}
                >
                  {amt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Donut({
  segments,
}: {
  segments: { label: string; pct: number; color: string }[];
}) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  const arcs = segments.map((s, i) => {
    const length = (s.pct / 100) * circumference;
    const offset = segments
      .slice(0, i)
      .reduce((sum, prev) => sum + (prev.pct / 100) * circumference, 0);
    return { ...s, length, offset };
  });

  return (
    <svg viewBox="0 0 64 64" className="size-16 shrink-0 -rotate-90">
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="var(--muted)"
        strokeWidth="9"
      />
      {arcs.map((arc) => (
        <circle
          key={arc.label}
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={arc.color}
          strokeWidth="9"
          strokeDasharray={`${arc.length} ${circumference - arc.length}`}
          strokeDashoffset={-arc.offset}
        />
      ))}
    </svg>
  );
}
