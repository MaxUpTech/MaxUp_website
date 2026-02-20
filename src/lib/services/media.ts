import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, Timestamp, DocumentData, QueryConstraint
} from 'firebase/firestore';
import { db } from '../firebase';
import { MediaItem } from '../types';
import { uploadFile, deleteFile as deleteStorageFile } from './storage';

const COLLECTION = 'media';
const col = () => collection(db, COLLECTION);

function toMedia(id: string, data: DocumentData): MediaItem {
  return { id, ...data } as MediaItem;
}

export async function getAll(type?: 'image' | 'document' | 'video'): Promise<MediaItem[]> {
  try {
    const constraints: QueryConstraint[] = [];
    if (type) constraints.push(where('type', '==', type));
    constraints.push(orderBy('uploadedAt', 'desc'));
    const q = query(col(), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => toMedia(d.id, d.data()));
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error;
  }
}

export async function upload(
  file: File,
  type: 'image' | 'document' | 'video',
  dimensions?: { width: number; height: number }
): Promise<MediaItem> {
  try {
    const url = await uploadFile(file, `media/${type}s`);
    const data = {
      filename: file.name,
      url,
      type,
      size: file.size,
      ...(dimensions && { dimensions }),
      usedIn: [] as string[],
      uploadedAt: Timestamp.now(),
    };
    const ref = await addDoc(col(), data);
    return { id: ref.id, ...data } as MediaItem;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
}

export async function remove(id: string, storagePath: string): Promise<void> {
  try {
    await deleteStorageFile(storagePath);
    await deleteDoc(doc(db, COLLECTION, id));
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
}

export async function updateUsedIn(id: string, usedIn: string[]): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION, id), { usedIn });
  } catch (error) {
    console.error('Error updating media usedIn:', error);
    throw error;
  }
}
