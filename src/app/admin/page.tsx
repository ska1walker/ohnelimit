'use client';

import { useState } from 'react';
import TourDatesAdmin from '@/components/admin/TourDatesAdmin';
import GalleryAdmin from '@/components/admin/GalleryAdmin';

type Tab = 'tourdates' | 'gallery';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('tourdates');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple password protection (replace with proper auth in production)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'ohnelimit2024';

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Falsches Passwort');
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-black">
              OHNE<span className="text-[#e11d48]">LIMIT</span>
            </h1>
            <p className="text-white/60 mt-2">Admin Bereich</p>
          </div>

          <form onSubmit={handleLogin} className="bg-[#1a1a1a] rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
                placeholder="Passwort eingeben"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#e11d48] hover:bg-[#be123c] rounded-lg font-bold transition-colors"
            >
              Einloggen
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">
            OHNE<span className="text-[#e11d48]">LIMIT</span>
            <span className="text-white/40 font-normal ml-2">Admin</span>
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            Ausloggen
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab('tourdates')}
              className={`px-6 py-4 font-medium transition-colors relative ${
                activeTab === 'tourdates'
                  ? 'text-[#e11d48]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Tour Dates
              {activeTab === 'tourdates' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e11d48]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-4 font-medium transition-colors relative ${
                activeTab === 'gallery'
                  ? 'text-[#e11d48]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Galerie
              {activeTab === 'gallery' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e11d48]" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'tourdates' && <TourDatesAdmin />}
        {activeTab === 'gallery' && <GalleryAdmin />}
      </main>
    </div>
  );
}
