import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { SiteSettings } from '../types';

const DOC_PATH = 'settings/site';

export async function get(): Promise<SiteSettings | null> {
  try {
    const snap = await getDoc(doc(db, DOC_PATH));
    if (!snap.exists()) return null;
    return snap.data() as SiteSettings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    throw error;
  }
}

export async function update(data: Partial<SiteSettings>): Promise<void> {
  try {
    await setDoc(doc(db, DOC_PATH), data, { merge: true });
  } catch (error) {
    console.error('Error updating site settings:', error);
    throw error;
  }
}
