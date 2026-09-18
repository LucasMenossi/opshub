import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/keys";

import { getLogs } from "../api";
import type { LogsQueryParams } from "../api";
import type { LogTimeRange } from "../constants";
import { isValidCustomTimeRange } from "../utils";

interface UseLogsOptions extends Omit<
  LogsQueryParams,
  "cursor" | "start" | "end"
> {
  timeRange?: LogTimeRange;
  customStart?: string;
  customEnd?: string;
  refetchInterval?: number | false;
}

const TIME_RANGE_DURATIONS: Record<
  Exclude<LogTimeRange, "" | "custom">,
  number
> = {
  "15m": 15 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
};

function getTimeRangeParams(
  timeRange: LogTimeRange,
  customStart: string,
  customEnd: string,
): Pick<LogsQueryParams, "start" | "end"> {
  if (timeRange === "custom") {
    return {
      start: customStart || undefined,
      end: customEnd || undefined,
    };
  }

  if (!timeRange) {
    return {
      start: undefined,
      end: undefined,
    };
  }

  return {
    start: new Date(Date.now() - TIME_RANGE_DURATIONS[timeRange]).toISOString(),
    end: undefined,
  };
}

export function useLogs(options: UseLogsOptions = {}) {
  const {
    timeRange = "",
    customStart = "",
    customEnd = "",
    refetchInterval,
    ...params
  } = options;

  const isCustomRangeValid =
    timeRange !== "custom" ||
    (Boolean(customStart) &&
      Boolean(customEnd) &&
      isValidCustomTimeRange(customStart, customEnd));

  return useInfiniteQuery({
    queryKey: queryKeys.logs.list({
      ...params,
      timeRange,
      customStart,
      customEnd,
    }),

    queryFn: ({ pageParam }) => {
      const timeRangeParams = getTimeRangeParams(
        timeRange,
        customStart,
        customEnd,
      );

      return getLogs({
        ...params,
        ...timeRangeParams,
        cursor: pageParam,
      });
    },

    enabled: isCustomRangeValid,
    placeholderData: keepPreviousData,
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchInterval,
  });
}
