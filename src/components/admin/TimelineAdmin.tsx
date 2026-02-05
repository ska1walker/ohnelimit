'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  getTimelineEvents,
  addTimelineEvent,
  deleteTimelineEvent,
  TimelineEventData,
} from '@/lib/firebase-admin';

type Badge = 'LIVE' | 'REHEARSAL' | 'STUDIO' | 'BACKSTAGE';

const badgeOptions: { value: Badge; label: string; color: string }[] = [
  { value: 'LIVE', label: 'Live', color: 'bg-[#e11d48]' },
  { value: 'REHEARSAL', label: 'Probe', color: 'bg-amber-500' },
  { value: 'STUDIO', label: 'Studio', color: 'bg-purple-500' },
  { value: 'BACKSTAGE', label: 'Backstage', color: 'bg-zinc-600' },
];

export default function TimelineAdmin() {
  const [events, setEvents] = useState<TimelineEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    date: '',
    badge: 'LIVE' as Badge,
    title: '',
    caption: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await getTimelineEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error loading timeline:', error);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      date: '',
      badge: 'LIVE',
      title: '',
      caption: '',
    });
    setSelectedFile(null);
    setPreviewUrl(null);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedFile) {
      alert('Bitte wähle ein Bild aus (9:16 Format empfohlen)');
      return;
    }

    setUploading(true);

    try {
      await addTimelineEvent(selectedFile, {
        date: formData.date,
        badge: formData.badge,
        title: formData.title,
        caption: formData.caption,
      });
      resetForm();
      await loadEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Fehler beim Speichern');
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Event wirklich löschen?')) return;

    try {
      await deleteTimelineEvent(id);
      await loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Fehler beim Löschen');
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center py-8">Laden...</div>;
  }

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6">
      <h2 className="text-2xl font-display font-bold mb-6">Timeline verwalten</h2>

      {/* Info Box */}
      <div className="mb-6 p-4 bg-[#e11d48]/10 border border-[#e11d48]/20 rounded-lg">
        <p className="text-sm text-white/70">
          <strong>Wichtig:</strong> Bilder sollten im <strong>9:16 Hochformat</strong> sein (z.B. 1080x1920 Pixel) für optimale Darstellung.
        </p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Image Upload */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Bild (9:16 Format)</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 rounded-xl overflow-hidden cursor-pointer hover:border-[#e11d48] transition-colors"
              style={{ aspectRatio: '9/16' }}
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

          {/* Right: Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Datum</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1">Badge</label>
              <div className="grid grid-cols-2 gap-2">
                {badgeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, badge: option.value })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.badge === option.value
                        ? `${option.color} text-white`
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1">Titel</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="z.B. Rock am Ring 2024"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1">Beschreibung</label>
              <textarea
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                required
                placeholder="Kurze Beschreibung des Events..."
                rows={3}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 px-6 py-3 bg-[#e11d48] hover:bg-[#be123c] rounded-lg font-bold transition-colors disabled:opacity-50"
              >
                {uploading ? 'Speichern...' : 'Hinzufügen'}
              </button>
              {selectedFile && (
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

      {/* Events Grid */}
      <h3 className="font-bold mb-4">Vorhandene Events ({events.length})</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {events.length === 0 ? (
          <p className="col-span-full text-white/60 text-center py-8">Keine Events vorhanden</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="group relative rounded-lg overflow-hidden bg-[#0a0a0a]"
              style={{ aspectRatio: '9/16' }}
            >
              {event.imageUrl && (
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              )}

              {/* Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-0.5 text-xs font-bold uppercase rounded ${
                  badgeOptions.find(b => b.value === event.badge)?.color || 'bg-zinc-600'
                }`}>
                  {event.badge}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-xs text-white/60">{formatDate(event.date)}</p>
                <p className="font-bold text-sm truncate">{event.title}</p>
                <p className="text-white/70 text-xs line-clamp-2">{event.caption}</p>

                <button
                  onClick={() => event.id && handleDelete(event.id)}
                  className="mt-2 p-2 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-lg transition-colors self-end"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
