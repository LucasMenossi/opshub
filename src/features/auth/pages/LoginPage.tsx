import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl font-semibold">Sign in to OpsHub</h1>

            <p className="text-sm text-muted-foreground">
              Access the developer operations dashboard.
            </p>
          </div>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}
