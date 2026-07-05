import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { LeaveBalanceSummary } from '@/components/leave/LeaveBalanceSummary';
import { LeaveHistoryList } from '@/components/leave/LeaveHistoryList';
import { LeaveRequestForm } from '@/components/leave/LeaveRequestForm';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMyLeaves, useLeaveBalances } from '@/hooks/useLeaves';

export function LeavePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: user } = useCurrentUser();
  const { data: leaves, isLoading: loadingLeaves } = useMyLeaves(user?.id);
  const { data: balances, isLoading: loadingBalances } = useLeaveBalances(user?.id);

  return (
    <DashboardLayout title="Leave" subtitle="Track balances and manage your time off">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="size-4" />
            New request
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <LeaveBalanceSummary balances={balances ?? []} loading={loadingBalances} />
          </div>
          <div className="lg:col-span-2">
            <LeaveHistoryList leaves={leaves ?? []} loading={loadingLeaves} />
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Leave Request" width="md">
        {user && <LeaveRequestForm employeeId={user.id} onSuccess={() => setModalOpen(false)} />}
      </Modal>
    </DashboardLayout>
  );
}
