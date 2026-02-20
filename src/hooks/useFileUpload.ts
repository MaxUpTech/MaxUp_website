'use client';

import { useState, useCallback } from 'react';
import { uploadFile } from '@/lib/services/storage';

interface UseFileUploadResult {
  upload: (file: File, path: string) => Promise<string>;
  uploading: boolean;
  progress: number;
  error: string | null;
  reset: () => void;
}

export function useFileUpload(): UseFileUploadResult {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
  }, []);

  const upload = useCallback(async (file: File, path: string): Promise<string> => {
    setUploading(true);
    setProgress(0);
    setError(null);
    try {
      // Simulate progress since Firebase uploadBytes doesn't give progress
      setProgress(30);
      const url = await uploadFile(file, path);
      setProgress(100);
      setUploading(false);
      return url;
    } catch (err: any) {
      const msg = err.message || 'Upload failed';
      setError(msg);
      setUploading(false);
      throw err;
    }
  }, []);

  return { upload, uploading, progress, error, reset };
}
