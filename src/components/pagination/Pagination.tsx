import { Select } from "@/components/ui";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
  pageSizes?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function Pagination({
  page,
  pageSize,
  totalPages,
  totalResults,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        {totalResults} result{totalResults === 1 ? "" : "s"}
      </p>

      <div className="flex items-center gap-3">
        <Select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </Select>

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="h-9 rounded-lg border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="h-9 rounded-lg border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
