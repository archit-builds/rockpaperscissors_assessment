import { Mail, MapPin } from 'lucide-react';
import type { Employee } from '@/types';
import { Card } from '@/components/common/Card';
import { Avatar } from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';

const STATUS_TONE = {
  active: 'green',
  'on-leave': 'amber',
  inactive: 'neutral',
} as const;

const STATUS_LABEL = {
  active: 'Active',
  'on-leave': 'On Leave',
  inactive: 'Inactive',
} as const;

export function EmployeeCard({ employee, onClick }: { employee: Employee; onClick?: () => void }) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer p-5 transition-colors hover:border-accent-500/40 dark:hover:border-accent-500/40"
    >
      <div className="flex items-start justify-between">
        <Avatar initials={employee.initials} color={employee.avatarColor} size="lg" />
        <Badge tone={STATUS_TONE[employee.status]} dot>
          {STATUS_LABEL[employee.status]}
        </Badge>
      </div>
      <div className="mt-3">
        <p className="text-[14px] font-semibold text-text dark:text-text-dark">{employee.name}</p>
        <p className="text-[12.5px] text-muted dark:text-muted-dark">{employee.role}</p>
      </div>
      <div className="mt-3 space-y-1.5 border-t border-line pt-3 dark:border-line-dark">
        <p className="flex items-center gap-1.5 truncate text-[12px] text-muted dark:text-muted-dark">
          <Mail className="size-3.5 shrink-0" />
          <span className="truncate">{employee.email}</span>
        </p>
        <p className="flex items-center gap-1.5 text-[12px] text-muted dark:text-muted-dark">
          <MapPin className="size-3.5 shrink-0" />
          {employee.location}
        </p>
      </div>
    </Card>
  );
}
