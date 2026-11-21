import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Wrench, 
  Wallet, 
  History, 
  Check, 
  Disc3, 
  Info,
  Clock,
  Star,
  Download,
  Trash2,
  UtensilsCrossed,
  ShieldCheck,
  Layers,
  ChefHat,
  CheckSquare,
  Square,
  Mail,
  BadgeCheck,
  Sun,
  Moon,
  Camera,
  UploadCloud
} from 'lucide-react';
import { 
  getStoredProfile, 
  saveStoredProfile, 
  getStoredHistory, 
  DEFAULT_PROFILE 
} from '../utils/storage.js';
import { formatRupiah } from '../utils/formatter.js';
import toolService from '../services/toolService.js';
import { promptPWAInstall, subscribeToInstallPrompt } from '../utils/pwa.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import InstallAppModal from '../components/InstallAppModal.jsx';

const AVATAR_THEMES = [
  { color: '#260F3D', label: 'Ungu Gelap' },
  { color: '#E0623A', label: 'Terracotta' },
  { color: '#4E7C5D', label: 'Sage' },
  { color: '#2563EB', label: 'Blue' },
  { color: '#D97706', label: 'Amber' },
  { color: '#4B5563', label: 'Slate' }
];

export const ProfilePage = () => {
  const { currentUser, isAdmin, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [profile, setProfile] = useState(() => getStoredProfile());
  const [history, setHistory] = useState(() => getStoredHistory());
  const [toolsList, setToolsList] = useState([]);
  const [savedAlert, setSavedAlert] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Otomatis sinkronkan data profil dengan akun yang sedang login
  useEffect(() => {
    if (currentUser) {
      setProfile(prev => ({
        ...prev,
        name: currentUser.name || prev.name || '',
        email: currentUser.email || prev.email || '',
        avatarUrl: currentUser.avatarUrl || prev.avatarUrl || ''
      }));
    } else {
      setProfile(getStoredProfile());
    }
  }, [currentUser]);

  // Fungsi kompresi gambar agar ringan dan muat disimpan di penyimpanan lokal
  const compressImage = (file, maxSize = 320) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (JPG, PNG, atau WebP).');
      return;
    }

    try {
      const compressedData = await compressImage(file, 320);
      const updated = { ...profile, avatarUrl: compressedData };
      setProfile(updated);
      saveStoredProfile(updated);
      if (currentUser && updateUser) {
        updateUser({ avatarUrl: compressedData });
      }
      setSavedAlert(true);
      setTimeout(() => setSavedAlert(false), 3000);
    } catch (err) {
      console.error('Error processing photo:', err);
      alert('Gagal memproses foto profil.');
    }
  };

  const handleRemovePhoto = () => {
    const updated = { ...profile, avatarUrl: '' };
    setProfile(updated);
    saveStoredProfile(updated);
    if (currentUser && updateUser) {
      updateUser({ avatarUrl: '' });
    }
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  useEffect(() => {
    toolService.getTools()
      .then(res => {
        if (res && res.success) setToolsList(res.data);
      })
      .catch(() => {});

    const unsubscribe = subscribeToInstallPrompt(setCanInstall);
    return unsubscribe;
  }, []);

  const handleToolToggle = (toolId) => {
    const current = profile.ownedTools || [];
    let updated;
    if (current.includes(toolId)) {
      updated = current.filter(t => t !== toolId);
    } else {
      updated = [...current, toolId];
    }
    setProfile(prev => ({ ...prev, ownedTools: updated }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    saveStoredProfile(profile);
    if (currentUser && updateUser) {
      updateUser({
        name: profile.name,
        email: profile.email || currentUser.email,
        avatarUrl: profile.avatarUrl || ''
      });
    }
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Hapus seluruh riwayat masakan Anda?')) {
      localStorage.removeItem('quickprep_cooking_history');
      setHistory([]);
    }
  };

  const userInitial = (profile.name || currentUser?.name || 'U').trim().charAt(0).toUpperCase();
  const userColor = profile.avatarColor || '#E0623A';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '760px', margin: '0 auto' }}>
      {/* 1. Page Title Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>
          Profil & Tentang Aplikasi
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Kelola profil pengguna, preferensi alat memasak, riwayat masakan, serta informasi lengkap aplikasi QuickPrep.
        </p>
      </div>

      {/* Admin Panel Quick Shortcut (Hanya tampil saat login sebagai Admin) */}
      {isAdmin && (
        <div className="card" style={{
          padding: '18px 22px',
          background: 'var(--purple-dark)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: 'var(--shadow-purple)'
        }}>
          <div>
            <div style={{ fontSize: '15.5px', fontWeight: '800', color: '#FFF' }}>
              Panel Admin Resep Masakan
            </div>
            <div style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)', marginTop: '2px' }}>
              Kelola, tambah, ubah foto, dan edit resep masakan.
            </div>
          </div>

          <Link
            to="/admin"
            style={{
              background: 'var(--primary)',
              color: '#FFFFFF',
              padding: '9px 18px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-warm)',
              textDecoration: 'none'
            }}
          >
            <Settings size={15} />
            <span>Buka Panel Admin</span>
          </Link>
        </div>
      )}

      {savedAlert && (
        <div style={{
          padding: '12px 16px',
          background: 'var(--success-green-light)',
          color: 'var(--success-green)',
          borderRadius: 'var(--radius-md)',
          fontSize: '13.5px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Check size={18} />
          <span>Pengaturan profil dan preferensi berhasil disimpan.</span>
        </div>
      )}

      {/* 2. User Profile Form */}
      <form onSubmit={handleSaveProfile} className="card" style={{ padding: '24px', background: 'var(--bg-card-warm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--primary)" />
            <span>Identitas Pengguna</span>
          </h2>

          {currentUser ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '999px',
              background: isAdmin ? 'var(--purple-dark)' : 'var(--sage-light)',
              color: isAdmin ? '#FFFFFF' : 'var(--sage-dark)',
              fontSize: '12px',
              fontWeight: '700',
              border: isAdmin ? 'none' : '1px solid rgba(78, 124, 93, 0.25)'
            }}>
              {isAdmin ? <ShieldCheck size={14} color="var(--primary)" /> : <BadgeCheck size={14} color="var(--sage)" />}
              <span>{isAdmin ? 'Peran: Administrator' : 'Akun Terdaftar'}</span>
            </div>
          ) : (
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
              Mode Tamu (Belum Masuk)
            </span>
          )}
        </div>

        {/* Profile Avatar & Photo Upload Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '24px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          flexWrap: 'wrap'
        }}>
          {/* Avatar Container with Camera Badge */}
          <div style={{ position: 'relative', width: '82px', height: '82px', flexShrink: 0 }}>
            <div style={{
              width: '82px',
              height: '82px',
              borderRadius: '50%',
              background: profile.avatarUrl ? 'transparent' : userColor,
              color: '#FFFFFF',
              fontSize: '32px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(0,0,0,0.14)',
              overflow: 'hidden',
              border: '2.5px solid var(--primary)'
            }}>
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="Foto Profil"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                userInitial
              )}
            </div>

            {/* Quick Camera Overlay Button */}
            <label
              htmlFor="avatar-file-input"
              title="Unggah Foto Profil Baru"
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
                cursor: 'pointer',
                border: '2px solid var(--bg-card)',
                transition: 'transform 0.15s ease'
              }}
            >
              <Camera size={15} />
            </label>

            {/* Hidden File Input */}
            <input
              id="avatar-file-input"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Action Buttons & Info */}
          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '3px' }}>
              Foto Profil
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
              Pilih foto dari galeri HP atau file manager laptop untuk foto profil Anda.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <label
                htmlFor="avatar-file-input"
                className="btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
              >
                <UploadCloud size={15} color="var(--primary)" />
                <span>Pilih Foto dari Galeri</span>
              </label>

              {profile.avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '7px 12px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--alert-red-light)',
                    color: 'var(--alert-red)',
                    border: '1px solid #FECACA',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={13} />
                  <span>Hapus Foto</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Warna Tema Inisial (Tampil jika belum menggunakan foto) */}
        {!profile.avatarUrl && (
          <div style={{ marginBottom: '22px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Warna Tema Inisial (Jika Belum Memakai Foto):
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {AVATAR_THEMES.map((theme) => (
                <button
                  type="button"
                  key={theme.color}
                  onClick={() => setProfile(prev => ({ ...prev, avatarColor: theme.color }))}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: theme.color,
                    border: userColor === theme.color ? '3px solid #FFFFFF' : 'none',
                    outline: userColor === theme.color ? `2px solid ${theme.color}` : 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease'
                  }}
                  title={theme.label}
                />
              ))}
            </div>
          </div>
        )}

        {/* Name input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            Nama Pengguna:
          </label>
          <div style={{ position: 'relative' }}>
            <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="input-field"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nama Anda"
              required
              style={{ paddingLeft: '36px' }}
            />
          </div>
        </div>

        {/* Email input (Otomatis dari Akun) */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            Alamat Email Akun:
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="email"
              className="input-field"
              value={profile.email || currentUser?.email || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              placeholder={currentUser ? currentUser.email : "Belum masuk akun (masuk untuk menyimpan email)"}
              style={{ paddingLeft: '36px' }}
            />
          </div>
          {currentUser?.email && (
            <p style={{ fontSize: '11.5px', color: 'var(--sage)', margin: '4px 0 0 0', fontWeight: '600' }}>
              ✓ Otomatis terhubung dengan akun {currentUser.email}
            </p>
          )}
        </div>

        {/* Default Budget */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            Budget Masak Harian (Rupiah):
          </label>
          <input
            type="number"
            className="input-field"
            value={profile.defaultBudget}
            onChange={(e) => setProfile(prev => ({ ...prev, defaultBudget: Number(e.target.value) }))}
            placeholder="15000"
          />
        </div>

        {/* Owned Tools Multi-select */}
        <div style={{ marginBottom: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Wrench size={16} color="var(--sage)" />
            <span style={{ fontSize: '14px', fontWeight: '700' }}>Alat Masak yang Dimiliki:</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Pilihan ini digunakan sebagai filter utama pada menu Cook with My Tools.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '8px'
          }}>
            {toolsList.map(t => {
              const hasTool = (profile.ownedTools || []).includes(t.id);
              return (
                <div
                  key={t.id}
                  onClick={() => handleToolToggle(t.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: hasTool ? '1.5px solid var(--sage)' : '1px solid var(--border-subtle)',
                    background: hasTool ? 'var(--sage-light)' : 'var(--bg-card)',
                    color: hasTool ? 'var(--sage-dark)' : 'var(--text-main)',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    userSelect: 'none'
                  }}
                >
                  {hasTool ? (
                    <CheckSquare size={16} color="var(--sage)" />
                  ) : (
                    <Square size={16} color="var(--text-light)" />
                  )}
                  <span>{t.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Night Mode Preference */}
        <div style={{ marginBottom: '24px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {isDark ? <Moon size={16} color="#F59E0B" /> : <Sun size={16} color="var(--primary)" />}
                <span style={{ fontSize: '14px', fontWeight: '700' }}>Mode Tampilan Malam (Night Mode)</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                {isDark ? 'Mode malam aktif. Warna gelap yang nyaman dan tidak silau di ruangan redup.' : 'Aktifkan mode malam untuk kenyamanan mata saat memasak.'}
              </p>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '999px',
                background: isDark ? 'var(--purple-dark)' : 'var(--bg-secondary)',
                color: isDark ? '#F59E0B' : 'var(--purple-dark)',
                border: '1px solid var(--border-subtle)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
              <span>{isDark ? 'Mode Terang' : 'Mode Malam'}</span>
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px' }}>
          <Check size={16} />
          <span>Simpan Pengaturan Profil</span>
        </button>
      </form>

      {/* 3. Riwayat Masakan (Cooking History) */}
      <section className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={18} color="var(--primary)" />
            <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Riwayat Masakan yang Telah Dibuat</h2>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              style={{ fontSize: '12px', color: 'var(--alert-red)', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Trash2 size={13} /> Hapus Riwayat
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>
            Belum ada masakan yang dicatat. Selesaikan langkah memasak di Mode Memasak untuk mencatat riwayat pertama Anda.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {history.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card-warm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {item.recipe_name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {new Date(item.cooked_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} | {item.servings_cooked} porsi
                  </div>
                  {item.notes && (
                    <div style={{ fontSize: '12px', color: 'var(--sage-dark)', marginTop: '2px', fontStyle: 'italic' }}>
                      "{item.notes}"
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59E0B' }}>
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Bagian Tentang QuickPrep (About) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Hero Branding About (Solid Ungu Gelap) */}
        <div className="card" style={{
          padding: '32px 24px',
          background: 'var(--purple-dark)',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: 'var(--shadow-purple)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: '#260F3D',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <UtensilsCrossed size={36} strokeWidth={2.4} />
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#FFF', marginBottom: '6px', letterSpacing: '-0.5px' }}>
            QuickPrep
          </h2>
          <p style={{
            fontSize: '14.5px',
            color: 'rgba(255, 255, 255, 0.95)',
            fontStyle: 'italic',
            fontWeight: '600',
            marginBottom: '4px'
          }}>
            "Cook what you have. Spend what you can. Make it simple."
          </p>
        </div>

        {/* Visi & Deskripsi */}
        <div className="card" style={{ padding: '24px', background: 'var(--bg-card-warm)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ChefHat size={20} color="var(--purple-main)" />
            <span>Visi dan Tujuan Aplikasi</span>
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '14px' }}>
            <strong>QuickPrep</strong> dirancang sebagai panduan memasak praktis untuk mahasiswa dan pemula dalam menentukan hidangan harian berdasarkan ketersediaan bahan, alat memasak, dan batas pengeluaran.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Aplikasi ini mengintegrasikan pencarian resep sesuai budget, filter alat yang dimiliki, pemilihan menu acak melalui roda putar (Recipe Spin), rekomendasi substitusi bumbu saat bahan tertentu tidak tersedia, dan panduan memasak interaktif langkah demi langkah dengan timer.
          </p>
        </div>

        {/* Fitur Utama Aplikasi */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Disc3 size={20} color="var(--primary)" />
            <span>Fitur Utama QuickPrep</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--purple-main)', marginBottom: '4px' }}>
                1. Recipe Spin Wheel
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Roda roulette penentu resep acak berdasarkan filter budget, kategori, dan alat masak saat bingung menentukan menu.
              </div>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--primary)', marginBottom: '4px' }}>
                2. Cook on Budget
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Filter masakan berdasarkan nominal uang yang dimiliki dengan kalkulasi biaya total dan estimasi per porsi.
              </div>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: '800', fontSize: '14px', color: '#D97706', marginBottom: '4px' }}>
                3. Cook with My Tools
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Menyaring menu masakan yang hanya membutuhkan peralatan yang tersedia (Rice cooker, teflon, panci, atau wajan).
              </div>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--purple-main)', marginBottom: '4px' }}>
                4. Missing Ingredients
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Rekomendasi substitusi bumbu saat bahan habis, lengkap dengan penjelasan aroma, rasa, dan tekstur.
              </div>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--sage)', marginBottom: '4px' }}>
                5. Mode Memasak & Timer Terintegrasi
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Panduan memasak interaktif langkah demi langkah, checklist bahan, penyesuaian bahan otomatis, dan timer memasak terintegrasi.
              </div>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--primary)', marginBottom: '4px' }}>
                6. Progressive Web App (PWA)
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Dapat diinstal langsung ke perangkat dengan performa cepat dan dukungan caching melalui Service Worker.
              </div>
            </div>
          </div>

          {/* Tombol Install & Download QuickPrep */}
          <div style={{ marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => {
                if (canInstall) {
                  promptPWAInstall().then(accepted => {
                    if (!accepted) setIsInstallModalOpen(true);
                  });
                } else {
                  setIsInstallModalOpen(true);
                }
              }}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '14.5px',
                fontWeight: '700',
                background: 'var(--primary)',
                boxShadow: 'var(--shadow-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Download size={18} />
              <span>Download & Pasang QuickPrep di HP / Laptop</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal Petunjuk Instalasi */}
      <InstallAppModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
        canInstallNative={canInstall} 
      />
    </div>
  );
};

export default ProfilePage;
