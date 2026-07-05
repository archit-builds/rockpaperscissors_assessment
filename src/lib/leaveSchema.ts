import { z } from 'zod';
import { todayIso } from '@/lib/date';

export const leaveRequestSchema = z
  .object({
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    type: z.enum(['sick', 'casual', 'earned', 'unpaid'], { message: 'Select a leave type' }),
    reason: z
      .string()
      .min(10, 'Reason must be at least 10 characters')
      .max(300, 'Reason must be under 300 characters'),
  })
  .refine((data) => data.startDate >= todayIso(), {
    message: 'Start date cannot be in the past',
    path: ['startDate'],
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date cannot be before the start date',
    path: ['endDate'],
  });

export type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;
