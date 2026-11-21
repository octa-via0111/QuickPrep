import React, { useState } from 'react';
import { 
  Download, 
  X, 
  Smartphone, 
  Apple, 
  Monitor, 
  CheckCircle2, 
  Sparkles, 
  UtensilsCrossed 
} from 'lucide-react';
import { promptPWAInstall } from '../utils/pwa.js';

export const InstallAppModal = ({ isOpen, onClose, canInstallNative = false }) => {
  const [activeTab, setActiveTab] = useState('android');
  const [installing, setInstalling] = useState(false);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    setInstalling(true);
    const accepted = await promptPWAInstall();
    setInstalling(false);
    if (accepted) {
      onClose();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 11, 45, 0.72)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          background: 'var(--bg-card)',
          color: 'var(--text-main)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(24, 11, 45, 0.45)',
          border: '1px solid var(--border-subtle)',
          position: 'relative',
          padding: '24px'
        }}
      >
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          aria-label="Tutup Dialog"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'var(--bg-secondary)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            transition: 'all 0.15s ease'
          }}
        >
          <X size={18} />
        </button>

        {/* Header Logo & App Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '20px',
            background: '#260F3D',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 8px 24px rgba(38, 15, 61, 0.35)',
            border: '2px solid rgba(255, 255, 255, 0.15)'
          }}>
            <UtensilsCrossed size={42} strokeWidth={2.3} />
          </div>

          <div style={{
            fontSize: '24px',
            fontWeight: '800',
            letterSpacing: '-0.4px',
            lineHeight: 1.2,
            color: 'var(--text-main)'
          }}>
            Quick<span style={{ color: 'var(--primary)' }}>Prep</span>
          </div>

          <p style={{
            fontSize: '12.5px',
            color: 'var(--text-muted)',
            marginTop: '4px',
            fontWeight: '500'
          }}>
            Cook what you have. Spend what you can.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '11.5px',
            fontWeight: '700',
            marginTop: '10px'
          }}>
            <Sparkles size={13} />
            <span>Aplikasi Ringan • Cepat • Bisa Masak Offline</span>
          </div>
        </div>

        {/* Tombol Native Install jika didukung browser */}
        {canInstallNative && (
          <div style={{ marginBottom: '22px' }}>
            <button
              onClick={handleNativeInstall}
              disabled={installing}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-warm)'
              }}
            >
              <Download size={18} />
              <span>{installing ? 'Menyiapkan Instalasi...' : 'Instal QuickPrep Sekarang'}</span>
            </button>
            <p style={{ fontSize: '11px', textAlign: 'center', color: 'var(--text-muted)', marginTop: '6px' }}>
              Langsung terpasang di HP / Laptop Anda tanpa ribet.
            </p>
          </div>
        )}

        {/* Tab Petunjuk Manual Per Perangkat */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '16px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '10px', color: 'var(--text-main)' }}>
            {canInstallNative ? 'Atau ikuti panduan sesuai perangkat Anda:' : 'Cara Mengunduh & Memasang QuickPrep:'}
          </div>

          {/* Tab Selector */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '6px',
            marginBottom: '16px',
            background: 'var(--bg-secondary)',
            padding: '4px',
            borderRadius: '12px'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('android')}
              style={{
                padding: '8px 4px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'android' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'android' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'android' ? '700' : '600',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                cursor: 'pointer',
                boxShadow: activeTab === 'android' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Smartphone size={14} />
              <span>Android</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ios')}
              style={{
                padding: '8px 4px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'ios' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'ios' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'ios' ? '700' : '600',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                cursor: 'pointer',
                boxShadow: activeTab === 'ios' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Apple size={14} />
              <span>iPhone (iOS)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('desktop')}
              style={{
                padding: '8px 4px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'desktop' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'desktop' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'desktop' ? '700' : '600',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                cursor: 'pointer',
                boxShadow: activeTab === 'desktop' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Monitor size={14} />
              <span>Laptop / PC</span>
            </button>
          </div>

          {/* Konten Petunjuk */}
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '16px',
            padding: '16px',
            fontSize: '13px',
            lineHeight: 1.5
          }}>
            {activeTab === 'android' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary)', color: '#FFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>1</div>
                  <div>Buka <strong>Google Chrome</strong> di HP Android Anda.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary)', color: '#FFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>2</div>
                  <div>Ketuk menu titik tiga (<strong>⋮</strong>) di pojok kanan atas layar.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary)', color: '#FFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>3</div>
                  <div>Pilih opsi <strong>"Instal aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>
                    Selesai! Logo <strong>QuickPrep</strong> ungu akan langsung muncul di menu HP Anda seperti aplikasi Play Store!
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ios' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary)', color: '#FFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>1</div>
                  <div>Buka situs QuickPrep menggunakan browser <strong>Safari</strong> di iPhone/iPad.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary)', color: '#FFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>2</div>
                  <div>Ketuk tombol <strong>Bagikan (Share)</strong> ikon kotak berpanah ke atas di bilah bawah layar.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary)', color: '#FFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>3</div>
                  <div>Gulir ke bawah dan ketuk opsi <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>
                    Ketuk <strong>"Tambah"</strong> di kanan atas. Ikon aplikasi QuickPrep langsung terpasang di Homescreen!
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'desktop' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary)', color: '#FFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>1</div>
                  <div>Buka QuickPrep di browser <strong>Google Chrome</strong> atau <strong>Microsoft Edge</strong> di laptop/PC Anda.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary)', color: '#FFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>2</div>
                  <div>Lihat di ujung kanan kolom alamat URL (address bar), ada ikon <strong>Instal (⊕ atau layar komputer)</strong>.</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary)', color: '#FFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>3</div>
                  <div>Klik tombol <strong>"Instal"</strong>. QuickPrep akan terbuka di jendela tersendiri tanpa address bar!</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>
                    QuickPrep otomatis disematkan di Desktop & Taskbar Windows / Dock Mac!
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Tombol Tutup */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '6px 12px'
            }}
          >
            Tutup Dialog
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallAppModal;
