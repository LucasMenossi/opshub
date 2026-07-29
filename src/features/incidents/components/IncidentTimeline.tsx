import { Card } from "@/components/ui";
import { formatDateTime } from "@/lib/formatters";

import type { IncidentTimelineEvent } from "../api";

interface IncidentTimelineProps {
  events: IncidentTimelineEvent[];
}

export function IncidentTimeline({ events }: IncidentTimelineProps) {
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime(),
  );

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">Timeline</h2>

      {sortedEvents.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No timeline events yet.
        </p>
      ) : (
        <ol className="mt-6 space-y-6">
          {sortedEvents.map((event) => (
            <li key={event.id} className="relative pl-6">
              <span
                aria-hidden="true"
                className="absolute top-2 left-0 h-2 w-2 rounded-full bg-foreground"
              />

              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-medium">{event.title}</p>

                <time
                  dateTime={event.occurredAt}
                  className="text-sm text-muted-foreground"
                >
                  {formatDateTime(event.occurredAt)}
                </time>
              </div>

              {event.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.description}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
