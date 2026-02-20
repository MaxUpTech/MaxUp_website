import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

function generateUniqueFilename(originalName: string): string {
  const ext = originalName.substring(originalName.lastIndexOf('.'));
  const base = originalName.substring(0, originalName.lastIndexOf('.')).replace(/[^a-zA-Z0-9-_]/g, '-');
  return `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
}

export async function uploadFile(file: File, path: string): Promise<string> {
  try {
    const filename = generateUniqueFilename(file.name);
    const storageRef = ref(storage, `${path}/${filename}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    await deleteObject(ref(storage, path));
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

export { generateUniqueFilename };
