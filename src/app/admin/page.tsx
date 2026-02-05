'use client';

import { useState, useEffect } from 'react';
import TourDatesAdmin from '@/components/admin/TourDatesAdmin';
import GalleryAdmin from '@/components/admin/GalleryAdmin';
import TimelineAdmin from '@/components/admin/TimelineAdmin';
import UserManagement from '@/components/admin/UserManagement';
import { authenticateUser, initializeDefaultUsers, UserData } from '@/lib/firebase-users';
import { hasPermission, type UserRole } from '@/lib/auth';

type Tab = 'tourdates' | 'gallery' | 'timeline' | 'users';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('gallery');
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Initialize default users on first load
  useEffect(() => {
    async function init() {
      try {
        await initializeDefaultUsers();
      } catch (error) {
        console.error('Error initializing users:', error);
      } finally {
        setInitializing(false);
      }
    }
    init();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await authenticateUser(username, password);
      if (user) {
        setCurrentUser(user);
        // Set default tab based on role
        if (user.role === 'admin') {
          setActiveTab('tourdates');
        } else {
          setActiveTab('gallery');
        }
      } else {
        setError('Benutzername oder Passwort falsch');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Fehler beim Einloggen');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setCurrentUser(null);
    setUsername('');
    setPassword('');
  }

  // Check permissions
  const canManageTourDates = currentUser ? hasPermission(currentUser.role as UserRole, 'canManageTourDates') : false;
  const canManageGallery = currentUser ? hasPermission(currentUser.role as UserRole, 'canManageGallery') : false;
  const canManageTimeline = currentUser ? hasPermission(currentUser.role as UserRole, 'canManageTimeline') : false;
  const canManageUsers = currentUser ? hasPermission(currentUser.role as UserRole, 'canManageUsers') : false;

  if (initializing) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#e11d48] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Laden...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
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
              <label className="block text-sm text-white/60 mb-1">Benutzername</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
                placeholder="z.B. admin oder andy"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
                placeholder="Passwort eingeben"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#e11d48] hover:bg-[#be123c] rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {loading ? 'Einloggen...' : 'Einloggen'}
            </button>
          </form>

          {/* Login hint */}
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg text-sm text-white/50">
            <p className="font-bold mb-2">Standard-Zugänge:</p>
            <p>Admin: <code className="text-[#e11d48]">admin</code> / <code className="text-[#e11d48]">ohnelimit2024</code></p>
            <p>Band: <code className="text-[#e11d48]">andy</code> / <code className="text-[#e11d48]">band2024</code></p>
          </div>
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

          <div className="flex items-center gap-4">
            {/* User info */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentUser.role === 'admin' ? 'bg-[#e11d48]' : 'bg-white/20'
              }`}>
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-white/40">
                  {currentUser.role === 'admin' ? 'Administrator' : 'Bandmitglied'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              Ausloggen
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto">
            {canManageTourDates && (
              <button
                onClick={() => setActiveTab('tourdates')}
                className={`px-6 py-4 font-medium transition-colors relative whitespace-nowrap ${
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
            )}

            {canManageGallery && (
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-4 font-medium transition-colors relative whitespace-nowrap ${
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
            )}

            {canManageTimeline && (
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-6 py-4 font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === 'timeline'
                    ? 'text-[#e11d48]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Timeline
                {activeTab === 'timeline' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e11d48]" />
                )}
              </button>
            )}

            {canManageUsers && (
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === 'users'
                    ? 'text-[#e11d48]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Benutzer
                {activeTab === 'users' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e11d48]" />
                )}
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'tourdates' && canManageTourDates && <TourDatesAdmin />}
        {activeTab === 'gallery' && canManageGallery && <GalleryAdmin />}
        {activeTab === 'timeline' && canManageTimeline && <TimelineAdmin />}
        {activeTab === 'users' && canManageUsers && <UserManagement />}

        {/* No permission message */}
        {activeTab === 'tourdates' && !canManageTourDates && (
          <div className="text-center py-16">
            <p className="text-white/60">Du hast keine Berechtigung für diesen Bereich.</p>
          </div>
        )}
      </main>
    </div>
  );
}
