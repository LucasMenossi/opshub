import { Card, Container } from "@/components/UI";

interface PageErrorStateProps {
  title?: string;
  description?: string;
  isRetrying?: boolean;
  onRetry?: () => void;
}

export function PageErrorState({
  title = "Something went wrong",
  description = "The requested resource could not be loaded.",
  isRetrying = false,
  onRetry,
}: PageErrorStateProps) {
  return (
    <Container>
      <Card className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">{title}</p>

            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>

          {onRetry && (
            <button
              type="button"
              disabled={isRetrying}
              onClick={onRetry}
              className="h-9 rounded-lg border px-3 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              {isRetrying ? "Retrying..." : "Retry"}
            </button>
          )}
        </div>
      </Card>
    </Container>
  );
}
