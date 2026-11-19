let deferredPrompt = null;
const installListeners = new Set();

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker terdaftar dengan scope:', registration.scope);
          
          // Check for update
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('[PWA] Versi baru tersedia! Silakan muat ulang.');
                  } else {
                    console.log('[PWA] Konten telah dicache untuk penggunaan offline.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.error('[PWA] Registrasi Service Worker gagal:', error);
        });
    });
  }

  // Capture beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installListeners.forEach(listener => listener(true));
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    installListeners.forEach(listener => listener(false));
    console.log('[PWA] Aplikasi QuickPrep berhasil diinstall!');
  });
};

export const subscribeToInstallPrompt = (callback) => {
  installListeners.add(callback);
  callback(Boolean(deferredPrompt));
  return () => installListeners.delete(callback);
};

export const promptPWAInstall = async () => {
  if (!deferredPrompt) return false;
  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;
  if (choiceResult.outcome === 'accepted') {
    console.log('[PWA] Pengguna menyetujui instalasi aplikasi');
    deferredPrompt = null;
    installListeners.forEach(listener => listener(false));
    return true;
  } else {
    console.log('[PWA] Pengguna menolak instalasi');
    return false;
  }
};
