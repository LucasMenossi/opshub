import { SearchInput } from "@/components/SearchInput";

interface LogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function LogSearch({ value, onChange }: LogSearchProps) {
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder="Search logs..."
      className="w-full sm:max-w-md sm:flex-1"
    />
  );
}
