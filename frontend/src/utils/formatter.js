/**
 * Format number to Indonesian Rupiah (e.g. Rp 15.000)
 */
export const formatRupiah = (number) => {
  if (number === undefined || number === null || isNaN(number)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
};

/**
 * Format minutes to human readable Indonesian duration (e.g. 15 mnt, 1 jam 10 mnt)
 */
export const formatTime = (minutes) => {
  if (!minutes || minutes <= 0) return '0 mnt';
  if (minutes < 60) return `${minutes} mnt`;
  const hrs = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  return remainingMins > 0 ? `${hrs} jam ${remainingMins} mnt` : `${hrs} jam`;
};

/**
 * Difficulty badge styling helper
 */
export const getDifficultyColor = (difficulty) => {
  switch ((difficulty || '').toLowerCase()) {
    case 'mudah':
      return { bg: '#EBF7EE', text: '#2E7D32', border: '#C8E6C9' };
    case 'sedang':
      return { bg: '#FFF8E1', text: '#B78103', border: '#FFE082' };
    case 'sulit':
      return { bg: '#FDE8E8', text: '#C53030', border: '#F8B4B4' };
    default:
      return { bg: '#F3F4F6', text: '#4B5563', border: '#E5E7EB' };
  }
};

/**
 * Format image URL: auto-converts Supabase dashboard preview links to direct public CDN image URLs
 */
export const formatImageUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
  }

  const dashboardRegex = /supabase\.com\/dashboard\/project\/([^\/]+)\/storage\/files\/buckets\/([^\/?#]+).*?[?&]preview=([^&]+)/i;
  const match = url.match(dashboardRegex);
  if (match) {
    const projectRef = match[1];
    const bucket = match[2];
    const fileName = decodeURIComponent(match[3]);
    return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${encodeURIComponent(fileName)}`;
  }

  return url;
};

