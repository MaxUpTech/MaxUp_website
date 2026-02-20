import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, Timestamp, DocumentData, QueryConstraint
} from 'firebase/firestore';
import { db } from '../firebase';
import { PortfolioProject } from '../types';

const COLLECTION = 'portfolio';
const col = () => collection(db, COLLECTION);

function toProject(id: string, data: DocumentData): PortfolioProject {
  return { id, ...data } as PortfolioProject;
}

export async function getAll(filters?: { category?: string; isFeatured?: boolean }): Promise<PortfolioProject[]> {
  try {
    const constraints: QueryConstraint[] = [];
    if (filters?.category) constraints.push(where('category', '==', filters.category));
    if (filters?.isFeatured !== undefined) constraints.push(where('isFeatured', '==', filters.isFeatured));
    constraints.push(orderBy('order', 'asc'));
    const q = query(col(), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => toProject(d.id, d.data()));
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    throw error;
  }
}

export async function getBySlug(slug: string): Promise<PortfolioProject | null> {
  try {
    const q = query(col(), where('slug', '==', slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return toProject(d.id, d.data());
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    throw error;
  }
}

export async function getById(id: string): Promise<PortfolioProject | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return toProject(snap.id, snap.data()!);
  } catch (error) {
    console.error('Error fetching project by id:', error);
    throw error;
  }
}

export async function create(data: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const now = Timestamp.now();
    const ref = await addDoc(col(), { ...data, createdAt: now, updatedAt: now });
    return ref.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function update(id: string, data: Partial<Omit<PortfolioProject, 'id' | 'createdAt'>>): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION, id), { ...data, updatedAt: Timestamp.now() });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}
