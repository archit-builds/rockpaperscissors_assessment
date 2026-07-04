export type EmployeeStatus = 'active' | 'on-leave' | 'inactive';

export interface Employee {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  joinedOn: string;
  status: EmployeeStatus;
}
