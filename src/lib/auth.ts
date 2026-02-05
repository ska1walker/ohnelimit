// User roles and authentication
export type UserRole = 'admin' | 'bandmember';

export interface User {
  id: string;
  username: string;
  password: string; // In production, use proper hashing!
  role: UserRole;
  name: string;
  createdAt: string;
}

// Default users - in production these should be in Firebase
export const defaultUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'ohnelimit2024', // Change this!
    role: 'admin',
    name: 'Administrator',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    username: 'andy',
    password: 'band2024',
    role: 'bandmember',
    name: 'Andy "Bassomator"',
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    username: 'chris',
    password: 'band2024',
    role: 'bandmember',
    name: 'Chris "Gitarrero"',
    createdAt: '2024-01-01',
  },
  {
    id: '4',
    username: 'bjoern',
    password: 'band2024',
    role: 'bandmember',
    name: 'Björn "The Drummachine"',
    createdAt: '2024-01-01',
  },
  {
    id: '5',
    username: 'matze',
    password: 'band2024',
    role: 'bandmember',
    name: 'Matthias "Matze"',
    createdAt: '2024-01-01',
  },
  {
    id: '6',
    username: 'flo',
    password: 'band2024',
    role: 'bandmember',
    name: 'Florian "Flo"',
    createdAt: '2024-01-01',
  },
  {
    id: '7',
    username: 'joachim',
    password: 'band2024',
    role: 'bandmember',
    name: 'Joachim "Joaquín"',
    createdAt: '2024-01-01',
  },
];

// Permission definitions
export const permissions = {
  admin: {
    canManageTourDates: true,
    canManageGallery: true,
    canManageUsers: true,
    canManageTimeline: true,
  },
  bandmember: {
    canManageTourDates: false,
    canManageGallery: true,
    canManageUsers: false,
    canManageTimeline: true,
  },
};

export function getPermissions(role: UserRole) {
  return permissions[role];
}

export function hasPermission(role: UserRole, permission: keyof typeof permissions.admin): boolean {
  return permissions[role][permission];
}
