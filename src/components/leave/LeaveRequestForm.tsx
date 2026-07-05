import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { leaveRequestSchema, type LeaveRequestFormValues } from '@/lib/leaveSchema';
import { Field, Textarea } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { DatePicker } from './DatePicker';
import { useCreateLeaveRequest } from '@/hooks/useLeaves';
import { todayIso } from '@/lib/date';

const LEAVE_TYPE_OPTIONS = [
  { value: 'casual', label: 'Casual Leave' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'earned', label: 'Earned Leave' },
  { value: 'unpaid', label: 'Unpaid Leave' },
];

export function LeaveRequestForm({ employeeId, onSuccess }: { employeeId: string; onSuccess?: () => void }) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: { startDate: '', endDate: '', type: 'casual', reason: '' },
  });

  const mutation = useCreateLeaveRequest(employeeId);
  const startDate = watch('startDate');

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success('Leave request submitted');
        reset();
        onSuccess?.();
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : 'Could not submit leave request');
      },
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <Field label="Start date" error={errors.startDate?.message}>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                minDate={new Date(todayIso())}
                error={!!errors.startDate}
              />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <Field label="End date" error={errors.endDate?.message}>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                minDate={new Date(startDate || todayIso())}
                error={!!errors.endDate}
                disabled={!startDate}
              />
            </Field>
          )}
        />
      </div>

      <Field label="Leave type" error={errors.type?.message}>
        <Select {...register('type')} error={!!errors.type}>
          {LEAVE_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Reason" error={errors.reason?.message} hint="Minimum 10 characters">
        <Textarea placeholder="Briefly describe the reason for your leave" {...register('reason')} error={!!errors.reason} />
      </Field>

      <div className="flex justify-end gap-2 pt-1">
        <Button type="submit" loading={isSubmitting || mutation.isPending}>
          Submit request
        </Button>
      </div>
    </form>
  );
}
