import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { User, UserRole } from './auth';

const usersCollection = collection(db, 'users');

export interface UserData {
  id?: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Get all users
export async function getUsers(): Promise<UserData[]> {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as UserData[];
}

// Get user by username
export async function getUserByUsername(username: string): Promise<UserData | null> {
  const q = query(usersCollection, where('username', '==', username));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as UserData;
}

// Authenticate user
export async function authenticateUser(username: string, password: string): Promise<UserData | null> {
  const user = await getUserByUsername(username);

  if (user && user.password === password) {
    return user;
  }

  return null;
}

// Add new user
export async function addUser(data: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  // Check if username already exists
  const existing = await getUserByUsername(data.username);
  if (existing) {
    throw new Error('Username already exists');
  }

  const docRef = await addDoc(usersCollection, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
}

// Update user
export async function updateUser(id: string, data: Partial<UserData>): Promise<void> {
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

// Delete user
export async function deleteUser(id: string): Promise<void> {
  const docRef = doc(db, 'users', id);
  await deleteDoc(docRef);
}

// Initialize default users if none exist
export async function initializeDefaultUsers(): Promise<void> {
  const snapshot = await getDocs(usersCollection);

  if (snapshot.empty) {
    // Add default admin user
    await addDoc(usersCollection, {
      username: 'admin',
      password: 'ohnelimit2024',
      role: 'admin',
      name: 'Administrator',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    // Add band members
    const bandMembers = [
      { username: 'andy', name: 'Andy "Bassomator"' },
      { username: 'chris', name: 'Chris "Gitarrero"' },
      { username: 'bjoern', name: 'Björn "The Drummachine"' },
      { username: 'matze', name: 'Matthias "Matze"' },
      { username: 'flo', name: 'Florian "Flo"' },
      { username: 'joachim', name: 'Joachim "Joaquín"' },
    ];

    for (const member of bandMembers) {
      await addDoc(usersCollection, {
        username: member.username,
        password: 'band2024',
        role: 'bandmember',
        name: member.name,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
  }
}
