import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DirectoryFilters } from '@/components/directory/DirectoryFilters';
import { EmployeeCard } from '@/components/directory/EmployeeCard';
import { EmployeeProfileModal } from '@/components/directory/EmployeeProfileModal';
import { EmptyState, ErrorState, Skeleton } from '@/components/common/States';
import { Button } from '@/components/common/Button';
import { useEmployees } from '@/hooks/useEmployees';
import { useDebounce } from '@/hooks/useDebounce';
import { useDirectoryFilterStore } from '@/store/uiStore';
import type { Employee } from '@/types';

export function DirectoryPage() {
  const { search, department, status, setSearch, setDepartment, setStatus, reset } = useDirectoryFilterStore();
  const debouncedSearch = useDebounce(search, 300);
  const [selected, setSelected] = useState<Employee | null>(null);

  const { data: employees, isLoading, isError, refetch, isPlaceholderData } = useEmployees({
    search: debouncedSearch,
    department,
    status,
  });

  return (
    <DashboardLayout title="Team Directory" subtitle="Find and connect with anyone across the company">
      <div className="space-y-5">
        <DirectoryFilters
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          status={status}
          onStatusChange={setStatus}
          resultCount={employees?.length ?? 0}
        />

        {isError ? (
          <ErrorState
            title="Couldn't load the directory"
            description="Something went wrong while fetching employees."
            action={
              <Button size="sm" variant="secondary" onClick={() => refetch()}>
                Try again
              </Button>
            }
          />
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-52 w-full" />
            ))}
          </div>
        ) : employees && employees.length > 0 ? (
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ opacity: isPlaceholderData ? 0.6 : 1, transition: 'opacity 150ms' }}
          >
            {employees.map((emp) => (
              <EmployeeCard key={emp.id} employee={emp} onClick={() => setSelected(emp)} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No employees match your filters"
            description="Try a different search term or clear the filters."
            action={
              <Button size="sm" variant="secondary" onClick={reset}>
                Clear filters
              </Button>
            }
          />
        )}
      </div>

      <EmployeeProfileModal employee={selected} onClose={() => setSelected(null)} />
    </DashboardLayout>
  );
}
