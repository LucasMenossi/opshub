interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="py-8 text-center">
      <p className="font-medium">{title}</p>

      {description && (
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}