import { Search, X } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { DEPARTMENTS } from '@/api/employeeApi';

interface DirectoryFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  resultCount: number;
}

export function DirectoryFilters({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  resultCount,
}: DirectoryFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted dark:text-muted-dark" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, role, or email"
          className="pl-9 pr-9"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text dark:text-muted-dark dark:hover:text-text-dark"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <Select value={department} onChange={(e) => onDepartmentChange(e.target.value)} className="w-40">
          <option value="all">All departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => onStatusChange(e.target.value)} className="w-36">
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="on-leave">On Leave</option>
          <option value="inactive">Inactive</option>
        </Select>
      </div>
      <span className="whitespace-nowrap text-[12px] text-muted dark:text-muted-dark">
        {resultCount} {resultCount === 1 ? 'result' : 'results'}
      </span>
    </div>
  );
}
