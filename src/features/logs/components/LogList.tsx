import { useEffect, useRef } from "react";

import { useVirtualizer } from "@tanstack/react-virtual";

import type { LogEntry } from "../api";

import { LogItem } from "./LogItem";

interface LogListProps {
  logs: LogEntry[];
  selectedLogId: string | null;
  onSelect: (log: LogEntry) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

export function LogList({
  logs,
  selectedLogId,
  onSelect,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: LogListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: logs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 76,
    overscan: 10,
  });

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: parentRef.current,
        rootMargin: "200px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div
        ref={parentRef}
        className="h-[min(450px,60vh)] overflow-auto px-2 py-2"
      >
        <ul
          className="relative w-full"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const log = logs[virtualRow.index];

            if (!log) {
              return null;
            }

            return (
              <li
                key={log.id}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className="absolute left-0 top-0 w-full"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <LogItem
                  log={log}
                  selected={selectedLogId === log.id}
                  onSelect={onSelect}
                />
              </li>
            );
          })}
        </ul>

        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="flex min-h-10 items-center justify-center p-4"
          >
            {isFetchingNextPage && (
              <span className="text-sm text-muted-foreground">
                Loading more logs...
              </span>
            )}
          </div>
        )}

        {!hasNextPage && logs.length > 0 && (
          <div className="flex justify-center p-4">
            <span className="text-sm text-muted-foreground">No more logs</span>
          </div>
        )}
      </div>
    </div>
  );
}
