'use client';

import { useState, useEffect } from 'react';
import {
  getTourDates,
  addTourDate,
  updateTourDate,
  deleteTourDate,
  TourDateData,
} from '@/lib/firebase-admin';

export default function TourDatesAdmin() {
  const [tourDates, setTourDates] = useState<TourDateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    date: '',
    city: '',
    venue: '',
    ticketLink: '',
    soldOut: false,
  });

  useEffect(() => {
    loadTourDates();
  }, []);

  async function loadTourDates() {
    try {
      const data = await getTourDates();
      setTourDates(data);
    } catch (error) {
      console.error('Error loading tour dates:', error);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      date: '',
      city: '',
      venue: '',
      ticketLink: '',
      soldOut: false,
    });
    setEditingId(null);
  }

  function handleEdit(tourDate: TourDateData) {
    setFormData({
      date: tourDate.date,
      city: tourDate.city,
      venue: tourDate.venue,
      ticketLink: tourDate.ticketLink,
      soldOut: tourDate.soldOut,
    });
    setEditingId(tourDate.id || null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await updateTourDate(editingId, formData);
      } else {
        await addTourDate(formData);
      }
      resetForm();
      await loadTourDates();
    } catch (error) {
      console.error('Error saving tour date:', error);
      alert('Fehler beim Speichern');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Wirklich löschen?')) return;

    try {
      await deleteTourDate(id);
      await loadTourDates();
    } catch (error) {
      console.error('Error deleting tour date:', error);
      alert('Fehler beim Löschen');
    }
  }

  if (loading) {
    return <div className="text-center py-8">Laden...</div>;
  }

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6">
      <h2 className="text-2xl font-display font-bold mb-6">Tour Dates verwalten</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-sm text-white/60 mb-1">Stadt</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
              placeholder="z.B. Berlin"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Venue</label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              required
              placeholder="z.B. Mercedes-Benz Arena"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Ticket Link</label>
            <input
              type="url"
              value={formData.ticketLink}
              onChange={(e) => setFormData({ ...formData, ticketLink: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.soldOut}
              onChange={(e) => setFormData({ ...formData, soldOut: e.target.checked })}
              className="w-4 h-4 accent-[#e11d48]"
            />
            <span>Ausverkauft</span>
          </label>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-[#e11d48] hover:bg-[#be123c] rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            {saving ? 'Speichern...' : editingId ? 'Aktualisieren' : 'Hinzufügen'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition-colors"
            >
              Abbrechen
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {tourDates.length === 0 ? (
          <p className="text-white/60 text-center py-8">Keine Tour Dates vorhanden</p>
        ) : (
          tourDates.map((tourDate) => (
            <div
              key={tourDate.id}
              className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="text-[#e11d48] font-bold">
                  {new Date(tourDate.date).toLocaleDateString('de-DE')}
                </div>
                <div>
                  <span className="font-bold">{tourDate.city}</span>
                  <span className="text-white/60"> - {tourDate.venue}</span>
                </div>
                {tourDate.soldOut && (
                  <span className="px-2 py-1 text-xs bg-white/10 rounded">Ausverkauft</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(tourDate)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => tourDate.id && handleDelete(tourDate.id)}
                  className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
