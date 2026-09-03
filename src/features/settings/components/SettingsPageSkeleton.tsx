export function SettingsPageSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading settings">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border bg-white p-6"
        >
          <div className="h-5 w-32 rounded bg-zinc-200" />

          <div className="mt-2 h-4 w-64 rounded bg-zinc-100" />

          <div className="mt-6 space-y-4">
            <div className="h-10 rounded bg-zinc-100" />
            <div className="h-10 rounded bg-zinc-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
