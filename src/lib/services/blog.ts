import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, Timestamp, DocumentData, QueryConstraint
} from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types';

const COLLECTION = 'blog';
const col = () => collection(db, COLLECTION);

function toPost(id: string, data: DocumentData): BlogPost {
  return { id, ...data } as BlogPost;
}

export async function getAll(filters?: { status?: 'draft' | 'published'; category?: string }): Promise<BlogPost[]> {
  try {
    const constraints: QueryConstraint[] = [];
    if (filters?.status) constraints.push(where('status', '==', filters.status));
    if (filters?.category) constraints.push(where('category', '==', filters.category));
    constraints.push(orderBy('publishDate', 'desc'));
    const q = query(col(), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => toPost(d.id, d.data()));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function getBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const q = query(col(), where('slug', '==', slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return toPost(d.id, d.data());
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}

export async function getById(id: string): Promise<BlogPost | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return toPost(snap.id, snap.data()!);
  } catch (error) {
    console.error('Error fetching post by id:', error);
    throw error;
  }
}

export async function create(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const now = Timestamp.now();
    const ref = await addDoc(col(), { ...data, createdAt: now, updatedAt: now });
    return ref.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function update(id: string, data: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION, id), { ...data, updatedAt: Timestamp.now() });
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
