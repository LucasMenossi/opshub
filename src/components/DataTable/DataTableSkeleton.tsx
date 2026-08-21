interface DataTableSkeletonProps {
  columns: number;
  rows?: number;
}

export function DataTableSkeleton({
  columns,
  rows = 10,
}: DataTableSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="h-10 w-full max-w-sm animate-pulse rounded-lg bg-muted" />
        <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
        <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div
          className="grid border-b bg-muted/50"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="px-6 py-3">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>

        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid border-b last:border-b-0"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, columnIndex) => (
              <div key={columnIndex} className="px-6 py-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
