import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, DocumentData, QueryConstraint
} from 'firebase/firestore';
import { db } from '../firebase';
import { Testimonial } from '../types';

const COLLECTION = 'testimonials';
const col = () => collection(db, COLLECTION);

function toTestimonial(id: string, data: DocumentData): Testimonial {
  return { id, ...data } as Testimonial;
}

export async function getAll(filters?: { isActive?: boolean }): Promise<Testimonial[]> {
  try {
    const constraints: QueryConstraint[] = [];
    if (filters?.isActive !== undefined) constraints.push(where('isActive', '==', filters.isActive));
    constraints.push(orderBy('order', 'asc'));
    const q = query(col(), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => toTestimonial(d.id, d.data()));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
}

export async function getById(id: string): Promise<Testimonial | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return toTestimonial(snap.id, snap.data()!);
  } catch (error) {
    console.error('Error fetching testimonial by id:', error);
    throw error;
  }
}

export async function create(data: Omit<Testimonial, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(col(), data);
    return ref.id;
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
}

export async function update(id: string, data: Partial<Omit<Testimonial, 'id'>>): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION, id), { ...data });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
}
