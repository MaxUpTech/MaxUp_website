import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, Timestamp, DocumentData, QueryConstraint
} from 'firebase/firestore';
import { db } from '../firebase';
import { Service } from '../types';

const COLLECTION = 'services';
const col = () => collection(db, COLLECTION);

function toService(id: string, data: DocumentData): Service {
  return { id, ...data } as Service;
}

export async function getAll(filters?: { isActive?: boolean }): Promise<Service[]> {
  try {
    const constraints: QueryConstraint[] = [];
    if (filters?.isActive !== undefined) {
      constraints.push(where('isActive', '==', filters.isActive));
    }
    constraints.push(orderBy('order', 'asc'));
    const q = query(col(), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => toService(d.id, d.data()));
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

export async function getBySlug(slug: string): Promise<Service | null> {
  try {
    const q = query(col(), where('slug', '==', slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return toService(d.id, d.data());
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    throw error;
  }
}

export async function getById(id: string): Promise<Service | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return toService(snap.id, snap.data()!);
  } catch (error) {
    console.error('Error fetching service by id:', error);
    throw error;
  }
}

export async function create(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const now = Timestamp.now();
    const ref = await addDoc(col(), { ...data, createdAt: now, updatedAt: now });
    return ref.id;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
}

export async function update(id: string, data: Partial<Omit<Service, 'id' | 'createdAt'>>): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION, id), { ...data, updatedAt: Timestamp.now() });
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
}
