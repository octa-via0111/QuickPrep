import { formatRupiah } from './formatter.js';

/**
 * Utilitas Berbagi Tautan Resep (Konsep mirip fitur Share Produk Shopee)
 * 
 * Cara kerja:
 * 1. Di perangkat HP (Android / iOS / Chrome Mobile):
 *    Memicu Web Share API bawaan sistem HP sehingga membuka menu berbagi native
 *    (WhatsApp, Telegram, Salin Tautan, Instagram, SMS, dll.) dengan judul, deskripsi harga, dan link resep.
 * 2. Di perangkat Komputer / Laptop atau browser tanpa Web Share API:
 *    Otomatis menyalin URL resep ke Clipboard dan memunculkan notifikasi visual bahwa link berhasil disalin.
 * 3. Ketika teman mengklik link tersebut, teman langsung diarahkan ke halaman detail resep masakan tersebut.
 */
export const shareRecipe = async (recipe) => {
  if (!recipe) {
    return { success: false, message: 'Data resep tidak ditemukan' };
  }

  // URL lengkap menuju resep masakan
  const recipeUrl = `${window.location.origin}/recipe/${recipe.id}`;
  const shareTitle = `Resep ${recipe.name || 'Masakan'} - QuickPrep`;
  const costText = recipe.estimated_cost ? ` (Estimasi biaya cuma ${formatRupiah(recipe.estimated_cost)})` : '';
  const shareText = `Yuk cobain resep ${recipe.name || 'menu masakan ini'}${costText}! Cek bahan & panduan memasaknya di QuickPrep:`;

  // 1. Coba gunakan Web Share API (Khusus HP / Android / iOS / Browser yang mendukung menu share native seperti Shopee)
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: recipeUrl
      });
      return { 
        success: true, 
        method: 'native', 
        url: recipeUrl,
        message: 'Resep berhasil dibagikan!' 
      };
    } catch (err) {
      // Jika pengguna menekan tombol batal / close di menu share HP, jangan anggap error sistem
      if (err.name === 'AbortError') {
        return { success: false, aborted: true };
      }
      // Jika error teknis lain pada navigator.share, lanjut ke fallback clipboard di bawah
    }
  }

  // 2. Fallback: Salin ke Clipboard (Desktop / Laptop / Browser tanpa Web Share API)
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(recipeUrl);
      return { 
        success: true, 
        method: 'clipboard', 
        url: recipeUrl,
        message: 'Link resep berhasil disalin! Siap dibagikan ke temanmu.' 
      };
    } else {
      // Fallback klasik jika Clipboard API dibatasi oleh browser
      const textArea = document.createElement('textarea');
      textArea.value = recipeUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return { 
        success: true, 
        method: 'clipboard', 
        url: recipeUrl,
        message: 'Link resep berhasil disalin! Siap dibagikan ke temanmu.' 
      };
    }
  } catch (clipErr) {
    console.error('Gagal menyalin link resep:', clipErr);
    return { 
      success: false, 
      error: clipErr, 
      message: 'Gagal menyalin link otomatis. Kamu bisa salin alamat URL dari browser.' 
    };
  }
};
