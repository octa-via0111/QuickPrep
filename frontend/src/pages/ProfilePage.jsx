import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Wrench, 
  Wallet, 
  Volume2, 
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
  Square
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

const AVATAR_THEMES = [
  { color: '#260F3D', label: 'Ungu Gelap' },
  { color: '#E0623A', label: 'Terracotta' },
  { color: '#4E7C5D', label: 'Sage' },
  { color: '#2563EB', label: 'Blue' },
  { color: '#D97706', label: 'Amber' },
  { color: '#4B5563', label: 'Slate' }
];

export const ProfilePage = () => {
  const [profile, setProfile] = useState(() => getStoredProfile());
  const [history, setHistory] = useState(() => getStoredHistory());
  const [toolsList, setToolsList] = useState([]);
  const [savedAlert, setSavedAlert] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

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
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Hapus seluruh riwayat masakan Anda?')) {
      localStorage.removeItem('quickprep_cooking_history');
      setHistory([]);
    }
  };

  const userInitial = (profile.name || 'U').trim().charAt(0).toUpperCase();
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
        <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={18} color="var(--primary)" />
          <span>Identitas Pengguna</span>
        </h2>

        {/* Profile Avatar Preview & Color Themes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '22px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: userColor,
            color: '#FFFFFF',
            fontSize: '26px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
            flexShrink: 0
          }}>
            {userInitial}
          </div>

          <div>
            <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Warna Tema Identitas:
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
        </div>

        {/* Name input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            Nama Pengguna:
          </label>
          <input
            type="text"
            className="input-field"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Nama Anda"
            required
          />
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

        {/* Voice Speed Preference */}
        <div style={{ marginBottom: '24px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Volume2 size={16} color="var(--primary)" />
            <span style={{ fontSize: '14px', fontWeight: '700' }}>Kecepatan Suara Panduan Memasak:</span>
          </div>
          <select
            value={profile.voiceSpeed}
            onChange={(e) => setProfile(prev => ({ ...prev, voiceSpeed: Number(e.target.value) }))}
            className="input-field"
            style={{ maxWidth: '240px' }}
          >
            <option value={0.75}>0.75x (Lambat)</option>
            <option value={1.0}>1.0x (Normal)</option>
            <option value={1.25}>1.25x (Sedang)</option>
            <option value={1.5}>1.5x (Cepat)</option>
          </select>
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
            Belum ada masakan yang dicatat. Selesaikan langkah memasak di Mode Panduan Suara untuk mencatat riwayat pertama Anda.
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
        {/* Hero Branding About */}
        <div className="card" style={{
          padding: '32px 24px',
          background: 'linear-gradient(135deg, #260F3D 0%, #431C75 45%, #E0623A 100%)',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 8px 28px rgba(38, 15, 61, 0.25)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: '#FFFFFF',
            color: 'var(--purple-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)'
          }}>
            <UtensilsCrossed size={30} />
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', marginBottom: '6px' }}>
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
            Aplikasi ini mengintegrasikan pencarian resep sesuai budget, filter alat yang dimiliki, pemilihan menu acak melalui roda putar (Recipe Spin), rekomendasi substitusi bumbu saat bahan tertentu tidak tersedia, dan panduan langkah memasak bersuara (Voice Guided Cooking).
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
                5. Voice Guided Cooking
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Panduan memasak bersuara alami Bahasa Indonesia per langkah, kontrol kecepatan suara, dan timer terintegrasi.
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

          {canInstall && (
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={promptPWAInstall}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  background: 'linear-gradient(135deg, #260F3D 0%, #E0623A 100%)'
                }}
              >
                <Download size={16} />
                <span>Install QuickPrep ke Layar Utama</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
