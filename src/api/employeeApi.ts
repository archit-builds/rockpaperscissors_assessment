import type { Employee } from '@/types';
import employeesData from './mockData/employees.json';
import currentUser from './mockData/currentUser.json';
import { withLatency } from './fakeNetwork';

const employees = employeesData as Employee[];

export interface EmployeeQuery {
  search?: string;
  department?: string;
  status?: string;
}

export async function fetchEmployees(query: EmployeeQuery = {}): Promise<Employee[]> {
  const filtered = employees.filter((e) => {
    const matchesSearch = query.search
      ? e.name.toLowerCase().includes(query.search.toLowerCase()) ||
        e.email.toLowerCase().includes(query.search.toLowerCase()) ||
        e.role.toLowerCase().includes(query.search.toLowerCase())
      : true;
    const matchesDept = query.department && query.department !== 'all' ? e.department === query.department : true;
    const matchesStatus = query.status && query.status !== 'all' ? e.status === query.status : true;
    return matchesSearch && matchesDept && matchesStatus;
  });
  return withLatency(filtered);
}

export async function fetchEmployeeById(id: string): Promise<Employee | undefined> {
  return withLatency(employees.find((e) => e.id === id));
}

export async function fetchCurrentUser(): Promise<Employee> {
  const user = employees.find((e) => e.id === currentUser.id)!;
  return withLatency(user, { minMs: 150, maxMs: 350, failRate: 0 });
}

export const DEPARTMENTS = Array.from(new Set(employees.map((e) => e.department)));
