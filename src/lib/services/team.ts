import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy, DocumentData
} from 'firebase/firestore';
import { db } from '../firebase';
import { TeamMember } from '../types';

const COLLECTION = 'team';
const col = () => collection(db, COLLECTION);

function toMember(id: string, data: DocumentData): TeamMember {
  return { id, ...data } as TeamMember;
}

export async function getAll(): Promise<TeamMember[]> {
  try {
    const q = query(col(), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => toMember(d.id, d.data()));
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
}

export async function getById(id: string): Promise<TeamMember | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return toMember(snap.id, snap.data()!);
  } catch (error) {
    console.error('Error fetching team member by id:', error);
    throw error;
  }
}

export async function create(data: Omit<TeamMember, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(col(), data);
    return ref.id;
  } catch (error) {
    console.error('Error creating team member:', error);
    throw error;
  }
}

export async function update(id: string, data: Partial<Omit<TeamMember, 'id'>>): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION, id), { ...data });
  } catch (error) {
    console.error('Error updating team member:', error);
    throw error;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
}
