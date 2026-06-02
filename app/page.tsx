import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-sm font-semibold tracking-tight">Finance Hub</span>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Foundation ready
        </h1>
        <p className="text-muted-foreground max-w-md text-sm leading-6">
          Next.js, TypeScript, Tailwind, shadcn/ui and dark mode are wired up.
          Time to start building the dashboard.
        </p>
      </main>
    </div>
  );
}
