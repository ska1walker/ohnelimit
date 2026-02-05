'use client';

import { useState, useEffect } from 'react';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  UserData,
} from '@/lib/firebase-users';
import type { UserRole } from '@/lib/auth';

export default function UserManagement() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    role: 'bandmember' as UserRole,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      username: '',
      password: '',
      name: '',
      role: 'bandmember',
    });
    setEditingId(null);
  }

  function handleEdit(user: UserData) {
    setFormData({
      username: user.username,
      password: '', // Don't show existing password
      name: user.name,
      role: user.role,
    });
    setEditingId(user.id || null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        // Update - only include password if changed
        const updateData: Partial<UserData> = {
          username: formData.username,
          name: formData.name,
          role: formData.role,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await updateUser(editingId, updateData);
      } else {
        // Create new
        if (!formData.password) {
          alert('Passwort ist erforderlich');
          setSaving(false);
          return;
        }
        await addUser(formData);
      }
      resetForm();
      await loadUsers();
    } catch (error: any) {
      console.error('Error saving user:', error);
      alert(error.message || 'Fehler beim Speichern');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, username: string) {
    if (username === 'admin') {
      alert('Der Admin-Account kann nicht gelöscht werden');
      return;
    }

    if (!confirm(`Benutzer "${username}" wirklich löschen?`)) return;

    try {
      await deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Fehler beim Löschen');
    }
  }

  if (loading) {
    return <div className="text-center py-8">Laden...</div>;
  }

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6">
      <h2 className="text-2xl font-display font-bold mb-6">Benutzer verwalten</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">Benutzername</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              placeholder="z.B. andy"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">
              {editingId ? 'Neues Passwort (leer lassen um nicht zu ändern)' : 'Passwort'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingId}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="z.B. Andy Bassomator"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Rolle</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg focus:border-[#e11d48] focus:outline-none"
            >
              <option value="bandmember">Bandmitglied</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
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

      {/* Users List */}
      <div className="space-y-3">
        {users.length === 0 ? (
          <p className="text-white/60 text-center py-8">Keine Benutzer vorhanden</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  user.role === 'admin' ? 'bg-[#e11d48]' : 'bg-white/20'
                }`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{user.name}</span>
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      user.role === 'admin'
                        ? 'bg-[#e11d48]/20 text-[#e11d48]'
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Band'}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">@{user.username}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => user.id && handleDelete(user.id, user.username)}
                  disabled={user.username === 'admin'}
                  className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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

      {/* Info Box */}
      <div className="mt-6 p-4 bg-[#e11d48]/10 border border-[#e11d48]/20 rounded-lg">
        <h4 className="font-bold text-sm mb-2">Berechtigungen:</h4>
        <ul className="text-sm text-white/70 space-y-1">
          <li><strong>Admin:</strong> Voller Zugriff (Tour Dates, Galerie, Benutzer, Timeline)</li>
          <li><strong>Bandmitglied:</strong> Galerie und Timeline bearbeiten</li>
        </ul>
      </div>
    </div>
  );
}
