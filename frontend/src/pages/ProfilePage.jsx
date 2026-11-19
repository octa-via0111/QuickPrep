import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Wrench, 
  Wallet, 
  Volume2, 
  History, 
  Check, 
  Sparkles, 
  Info,
  Clock,
  Star,
  Download,
  Trash2
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

const AVATAR_OPTIONS = ['👨‍🍳', '👩‍🍳', '🍳', '🍜', '🥘', '🥑', '🥗', '🍕', '🍰'];

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
    if (window.confirm('Yakin ingin menghapus seluruh riwayat masakanmu?')) {
      localStorage.removeItem('quickprep_cooking_history');
      setHistory([]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '720px', margin: '0 auto' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>
          Profil & <span style={{ color: 'var(--primary)' }}>Preferensi Memasak</span>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Sesuaikan profilmu, alat masak yang kamu miliki di kosan, dan preferensi panduan suara.
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
          <span>Pengaturan profil dan preferensi berhasil disimpan!</span>
        </div>
      )}

      {/* 1. Edit User Profile Form */}
      <form onSubmit={handleSaveProfile} className="card" style={{ padding: '24px', background: 'var(--bg-card-warm)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={18} color="var(--primary)" />
          <span>Identitas Pengguna</span>
        </h2>

        {/* Avatar Selector */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            Pilih Karakter Avatar:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {AVATAR_OPTIONS.map((av) => (
              <button
                type="button"
                key={av}
                onClick={() => setProfile(prev => ({ ...prev, avatar: av }))}
                style={{
                  width: '44px',
                  height: '44px',
                  fontSize: '22px',
                  borderRadius: '12px',
                  background: profile.avatar === av ? 'var(--primary-light)' : 'var(--bg-card)',
                  border: profile.avatar === av ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Name input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            Nama Panggilan:
          </label>
          <input
            type="text"
            className="input-field"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Nama kamu..."
            required
          />
        </div>

        {/* Default Budget */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            Budget Andalan Harian (Rp):
          </label>
          <input
            type="number"
            className="input-field"
            value={profile.defaultBudget}
            onChange={(e) => setProfile(prev => ({ ...prev, defaultBudget: Number(e.target.value) }))}
            placeholder="15000"
          />
        </div>

        {/* 2. Owned Tools Multi-select */}
        <div style={{ marginBottom: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Wrench size={16} color="var(--sage)" />
            <span style={{ fontSize: '14px', fontWeight: '700' }}>Alat Masak yang Kamu Miliki di Kos:</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Resep akan memprioritaskan alat masak yang sudah kamu miliki agar kamu tidak kesulitan.
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
                  <span style={{ fontSize: '16px' }}>{hasTool ? '✅' : '⚪'}</span>
                  <span>{t.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Voice Speed Preference */}
        <div style={{ marginBottom: '24px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Volume2 size={16} color="var(--primary)" />
            <span style={{ fontSize: '14px', fontWeight: '700' }}>Kecepatan Panduan Suara Default:</span>
          </div>
          <select
            value={profile.voiceSpeed}
            onChange={(e) => setProfile(prev => ({ ...prev, voiceSpeed: Number(e.target.value) }))}
            className="input-field"
            style={{ maxWidth: '240px' }}
          >
            <option value={0.75}>0.75x (Lebih Lambat)</option>
            <option value={1.0}>1.0x (Normal / Standar)</option>
            <option value={1.25}>1.25x (Sedang Cepat)</option>
            <option value={1.5}>1.5x (Cepat)</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px' }}>
          <Check size={16} />
          <span>Simpan Preferensi</span>
        </button>
      </form>

      {/* 4. Riwayat Masakan (Cooking History) */}
      <section className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={18} color="var(--primary)" />
            <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Riwayat Masakan yang Dibuat</h2>
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
            Belum ada masakan yang selesai dimasak. Mulai masak dengan panduan suara untuk mencatat riwayat pertamamu!
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
                    Dimasak: {new Date(item.cooked_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} • {item.servings_cooked} porsi
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

      {/* 5. Tentang QuickPrep & Info Aplikasi */}
      <section className="card" style={{ padding: '24px', background: 'var(--bg-card-warm)' }}>
        <h2 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '10px' }}>
          Tentang QuickPrep
        </h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
          <strong>QuickPrep</strong> adalah aplikasi Progressive Web App (PWA) panduan memasak cerdas yang dirancang khusus untuk mahasiswa, anak kos, dan siapa saja yang ingin memasak secara hemat, praktis, dan anti-ribet.
        </p>

        <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>📌 <strong>Tagline:</strong> Cook what you have. Spend what you can. Make it simple.</div>
          <div>🚀 <strong>Fitur Utama:</strong> Recipe Spin Wheel, Cook on Budget, Cook with My Tools, Missing Ingredients Substitusi, Voice Guided Cooking, dan Mode Offline PWA.</div>
          <div>📱 <strong>Versi Aplikasi:</strong> v1.0.0 (PWA Ready)</div>
        </div>

        {canInstall && (
          <div style={{ marginTop: '16px' }}>
            <button onClick={promptPWAInstall} className="btn-primary" style={{ padding: '10px 18px', fontSize: '13px' }}>
              <Download size={15} />
              <span>Install QuickPrep ke Perangkat</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
