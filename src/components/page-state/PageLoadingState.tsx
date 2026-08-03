import { Card, Container } from "@/components/ui";

interface PageLoadingStateProps {
  message?: string;
}

export function PageLoadingState({
  message = "Loading...",
}: PageLoadingStateProps) {
  return (
    <Container>
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">{message}</p>
      </Card>
    </Container>
  );
}
