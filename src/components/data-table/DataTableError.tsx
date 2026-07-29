import { Card } from "@/components/ui";

interface DataTableErrorProps {
  title?: string;
  description?: string;
  isRetrying?: boolean;
  onRetry: () => void;
}

export function DataTableError({
  title = "Failed to load data",
  description = "The data could not be retrieved.",
  isRetrying = false,
  onRetry,
}: DataTableErrorProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium">{title}</p>

          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="h-9 rounded-lg border px-3 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRetrying ? "Retrying..." : "Retry"}
        </button>
      </div>
    </Card>
  );
}
