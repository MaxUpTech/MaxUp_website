'use client';

import { useState, useEffect } from 'react';
import {
  collection, query, onSnapshot, QueryConstraint, DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UseFirestoreCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useFirestoreCollection<T extends { id: string }>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  fallbackData: T[] = []
): UseFirestoreCollectionResult<T> {
  const [data, setData] = useState<T[]>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If Firebase isn't configured, use fallback data
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      setData(fallbackData);
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, collectionName), ...constraints);
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          setData(docs.length > 0 ? docs : fallbackData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error(`Firestore error [${collectionName}]:`, err);
          setError(err.message);
          setData(fallbackData);
          setLoading(false);
        }
      );
      return unsub;
    } catch (err: any) {
      console.error(`Firestore setup error [${collectionName}]:`, err);
      setError(err.message);
      setData(fallbackData);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, JSON.stringify(constraints.map(c => c.type))]);

  return { data, loading, error };
}
