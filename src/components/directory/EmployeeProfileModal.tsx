import { Mail, MapPin, Phone, Building2, CalendarDays } from 'lucide-react';
import type { Employee } from '@/types';
import { Modal } from '@/components/common/Modal';
import { Avatar } from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import { formatDisplay } from '@/lib/date';

const STATUS_TONE = { active: 'green', 'on-leave': 'amber', inactive: 'neutral' } as const;
const STATUS_LABEL = { active: 'Active', 'on-leave': 'On Leave', inactive: 'Inactive' } as const;

export function EmployeeProfileModal({ employee, onClose }: { employee: Employee | null; onClose: () => void }) {
  return (
    <Modal open={!!employee} onClose={onClose} title="Employee Profile" width="sm">
      {employee && (
        <div>
          <div className="flex items-center gap-3">
            <Avatar initials={employee.initials} color={employee.avatarColor} size="lg" />
            <div>
              <p className="text-[15px] font-semibold text-text dark:text-text-dark">{employee.name}</p>
              <p className="text-[12.5px] text-muted dark:text-muted-dark">{employee.role}</p>
            </div>
          </div>

          <div className="mt-4">
            <Badge tone={STATUS_TONE[employee.status]} dot>
              {STATUS_LABEL[employee.status]}
            </Badge>
          </div>

          <dl className="mt-5 space-y-3 border-t border-line pt-4 dark:border-line-dark">
            <ProfileRow icon={Building2} label="Department" value={employee.department} />
            <ProfileRow icon={Mail} label="Email" value={employee.email} />
            <ProfileRow icon={Phone} label="Phone" value={employee.phone} />
            <ProfileRow icon={MapPin} label="Location" value={employee.location} />
            <ProfileRow icon={CalendarDays} label="Joined" value={formatDisplay(employee.joinedOn)} />
          </dl>
        </div>
      )}
    </Modal>
  );
}

function ProfileRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded-md bg-canvas text-muted dark:bg-ink-800 dark:text-muted-dark">
        <Icon className="size-4" />
      </div>
      <div>
        <dt className="text-[11px] text-muted dark:text-muted-dark">{label}</dt>
        <dd className="text-[13px] text-text dark:text-text-dark">{value}</dd>
      </div>
    </div>
  );
}
