'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  getGalleryPhotos,
  uploadGalleryPhoto,
  updateGalleryPhoto,
  deleteGalleryPhoto,
  GalleryPhotoData,
} from '@/lib/firebase-admin';

export default function GalleryAdmin() {
  const [photos, setPhotos] = useState<GalleryPhotoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    try {
      const data = await getGalleryPhotos();
      setPhotos(data);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setHeadline('');
    setSubheadline('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

  function handleEdit(photo: GalleryPhotoData) {
    setHeadline(photo.headline);
    setSubheadline(photo.subheadline);
    setEditingId(photo.id || null);
    setPreviewUrl(photo.imageUrl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!editingId && !selectedFile) {
      alert('Bitte wähle ein Bild aus (9:16 Format empfohlen)');
      return;
    }

    setUploading(true);

    try {
      if (editingId) {
        // Update existing
        await updateGalleryPhoto(editingId, { headline, subheadline });
      } else if (selectedFile) {
        // Upload new
        await uploadGalleryPhoto(selectedFile, headline, subheadline);
      }
      resetForm();
      await loadPhotos();
    } catch (error) {
      console.error('Error saving photo:', error);
      alert('Fehler beim Speichern');
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bild wirklich löschen?')) return;

    try {
      await deleteGalleryPhoto(id);
      await loadPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Fehler beim Löschen');
    }
  }

  if (loading) {
    return <div className="text-center py-8">Laden...</div>;
  }

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6">
      <h2 className="text-2xl font-display font-bold mb-6">Galerie verwalten</h2>

      {/* Info Box */}
      <div className="mb-6 p-4 bg-[#e11d48]/10 border border-[#e11d48]/20 rounded-lg">
        <p className="text-sm text-white/70">
          <strong>Wichtig:</strong> Bilder sollten im <strong>9:16 Hochformat</strong> sein (z.B. 1080x1920 Pixel) für optimale Darstellung.
        </p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Image Upload (9:16) */}
          {!editingId && (
            <div>
              <label className="block text-sm text-white/60 mb-2">Bild (9:16 Format)</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-[#e11d48] transition-colors"
                style={{ aspectRatio: '9/16', maxHeight: '400px' }}
              >
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <svg className="w-12 h-12 text-white/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-white/60 text-center text-sm">Klicken um Bild auszuwählen</p>
                    <p className="text-white/40 text-xs mt-1">9:16 Hochformat</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Edit Preview (9:16) */}
          {editingId && previewUrl && (
            <div>
              <label className="block text-sm text-white/60 mb-2">Aktuelles Bild</label>
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ aspectRatio: '9/16', maxHeight: '400px' }}
              >
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Right: Text Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
                placeholder="z.B. Rock am Ring 2024"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Subheadline</label>
              <input
                type="text"
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                required
                placeholder="z.B. 50.000 Menschen feiern mit uns"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 px-6 py-3 bg-[#e11d48] hover:bg-[#be123c] rounded-lg font-bold transition-colors disabled:opacity-50"
              >
                {uploading ? 'Speichern...' : editingId ? 'Aktualisieren' : 'Hochladen'}
              </button>
              {(editingId || selectedFile) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition-colors"
                >
                  Abbrechen
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Gallery Grid (9:16 cards) */}
      <h3 className="font-bold mb-4">Vorhandene Fotos ({photos.length})</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos.length === 0 ? (
          <p className="col-span-full text-white/60 text-center py-8">Keine Fotos vorhanden</p>
        ) : (
          photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative rounded-lg overflow-hidden bg-[#0a0a0a]"
              style={{ aspectRatio: '9/16' }}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.headline}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="font-bold text-sm truncate">{photo.headline}</p>
                <p className="text-white/70 text-xs truncate">{photo.subheadline}</p>
                <div className="flex gap-2 justify-end mt-2">
                  <button
                    onClick={() => handleEdit(photo)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => photo.id && handleDelete(photo.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
