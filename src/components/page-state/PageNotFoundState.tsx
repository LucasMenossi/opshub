import { Card, Container } from "@/components/ui";

interface PageNotFoundStateProps {
  title?: string;
  description?: string;
}

export function PageNotFoundState({
  title = "Not found",
  description = "The requested resource does not exist.",
}: PageNotFoundStateProps) {
  return (
    <Container>
      <Card className="p-6">
        <p className="font-medium">{title}</p>

        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </Card>
    </Container>
  );
}
