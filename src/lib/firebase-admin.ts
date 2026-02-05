import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from './firebase';

// ==================== TOUR DATES ====================

export interface TourDateData {
  id?: string;
  date: string;
  city: string;
  venue: string;
  ticketLink: string;
  soldOut: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const tourDatesCollection = collection(db, 'tourDates');

export async function getTourDates(): Promise<TourDateData[]> {
  const q = query(tourDatesCollection, orderBy('date', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TourDateData[];
}

export async function addTourDate(data: Omit<TourDateData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(tourDatesCollection, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateTourDate(id: string, data: Partial<TourDateData>): Promise<void> {
  const docRef = doc(db, 'tourDates', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteTourDate(id: string): Promise<void> {
  const docRef = doc(db, 'tourDates', id);
  await deleteDoc(docRef);
}

// ==================== GALLERY PHOTOS ====================

export interface GalleryPhotoData {
  id?: string;
  imageUrl: string;
  headline: string;
  subheadline: string;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const galleryCollection = collection(db, 'gallery');

export async function getGalleryPhotos(): Promise<GalleryPhotoData[]> {
  const q = query(galleryCollection, orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as GalleryPhotoData[];
}

export async function uploadGalleryPhoto(
  file: File,
  headline: string,
  subheadline: string
): Promise<string> {
  // Upload image to Firebase Storage
  const fileName = `gallery/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);

  // Get current count for ordering
  const snapshot = await getDocs(galleryCollection);
  const order = snapshot.size;

  // Save metadata to Firestore
  const docRef = await addDoc(galleryCollection, {
    imageUrl,
    headline,
    subheadline,
    order,
    storagePath: fileName,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
}

export async function updateGalleryPhoto(
  id: string,
  data: Partial<Pick<GalleryPhotoData, 'headline' | 'subheadline' | 'order'>>
): Promise<void> {
  const docRef = doc(db, 'gallery', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteGalleryPhoto(id: string): Promise<void> {
  // Get the document to find the storage path
  const docRef = doc(db, 'gallery', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    // Delete from Storage if path exists
    if (data.storagePath) {
      try {
        const storageRef = ref(storage, data.storagePath);
        await deleteObject(storageRef);
      } catch (error) {
        console.error('Error deleting image from storage:', error);
      }
    }

    // Delete from Firestore
    await deleteDoc(docRef);
  }
}

// ==================== TIMELINE EVENTS ====================

export interface TimelineEventData {
  id?: string;
  date: string;
  badge: 'LIVE' | 'REHEARSAL' | 'STUDIO' | 'BACKSTAGE';
  title: string;
  caption: string;
  imageUrl: string;
  storagePath?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const timelineCollection = collection(db, 'timeline');

export async function getTimelineEvents(): Promise<TimelineEventData[]> {
  const q = query(timelineCollection, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TimelineEventData[];
}

export async function addTimelineEvent(
  file: File | null,
  data: Omit<TimelineEventData, 'id' | 'imageUrl' | 'storagePath' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  let imageUrl = '';
  let storagePath = '';

  if (file) {
    storagePath = `timeline/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  const docRef = await addDoc(timelineCollection, {
    ...data,
    imageUrl,
    storagePath,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
}

export async function deleteTimelineEvent(id: string): Promise<void> {
  const docRef = doc(db, 'timeline', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (data.storagePath) {
      try {
        const storageRef = ref(storage, data.storagePath);
        await deleteObject(storageRef);
      } catch (error) {
        console.error('Error deleting image from storage:', error);
      }
    }

    await deleteDoc(docRef);
  }
}
