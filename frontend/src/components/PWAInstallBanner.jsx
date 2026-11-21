import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { 
  subscribeToInstallPrompt, 
  isAppInstalled, 
  promptPWAInstall,
  hasNativeInstallPrompt 
} from '../utils/pwa.js';
import InstallAppModal from './InstallAppModal.jsx';

export const PWAInstallBanner = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Jangan tampilkan jika aplikasi sudah terpasang (standalone mode)
    if (isAppInstalled()) {
      setVisible(false);
      return;
    }

    // Cek apakah pengguna sudah menutup banner di sesi ini
    const isDismissed = sessionStorage.getItem('quickprep_install_banner_dismissed');
    if (isDismissed) {
      return;
    }

    // Subscribe ke event install prompt browser
    const unsubscribe = subscribeToInstallPrompt((promptAvailable) => {
      setCanInstall(promptAvailable);
    });

    // Tampilkan banner dengan sedikit delay halus saat pertama kali aplikasi dibuka
    const timer = setTimeout(() => {
      if (!isAppInstalled()) {
        setVisible(true);
      }
    }, 1200);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('quickprep_install_banner_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (hasNativeInstallPrompt()) {
      const accepted = await promptPWAInstall();
      if (accepted) {
        setVisible(false);
        sessionStorage.setItem('quickprep_install_banner_dismissed', 'true');
      }
    } else {
      // Jika browser tidak mendukung prompt langsung (seperti Safari iOS), buka panduan lengkap
      setModalOpen(true);
    }
  };

  if (!visible) {
    return (
      <InstallAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        canInstallNative={canInstall}
      />
    );
  }

  return (
    <>
      <div className="pwa-install-banner">
        {/* Sisi Kiri: Ikon & Teks Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'var(--primary-light, rgba(224, 98, 58, 0.15))',
            color: 'var(--primary, #E0623A)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Download size={20} />
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '800',
              color: 'var(--text-main, #FFFFFF)',
              lineHeight: 1.25,
              marginBottom: '2px'
            }}>
              Instal QuickPrep
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--text-muted, #B3A4C7)',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              Tambahkan ke layar utama untuk pengalaman native app & akses offline.
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Tombol Instal & Tombol Tutup (X) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={handleInstallClick}
            className="btn-primary"
            style={{
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: '700',
              borderRadius: '12px',
              boxShadow: '0 4px 14px rgba(224, 98, 58, 0.35)',
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Instal Sekarang
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Tutup notifikasi"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'var(--bg-secondary, rgba(255, 255, 255, 0.08))',
              color: 'var(--text-muted, #837299)',
              border: '1px solid var(--border-subtle, transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Modal Petunjuk jika browser butuh panduan manual */}
      <InstallAppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        canInstallNative={canInstall}
      />
    </>
  );
};

export default PWAInstallBanner;
