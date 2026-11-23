// Utilitas pelacak riwayat navigasi internal QuickPrep
// Memastikan tombol "Kembali" selalu tepat 1 langkah ke halaman sebelumnya, bukan langsung mental ke awal.

const NAV_STACK_KEY = 'quickprep_nav_history';

/**
 * Catat rute yang sedang aktif ke dalam session history stack
 */
export const trackNavigation = (fullPath) => {
  if (!fullPath) return;
  try {
    const raw = sessionStorage.getItem(NAV_STACK_KEY);
    let stack = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(stack)) stack = [];

    // Jika rute baru sama persis dengan rute terakhir di stack, abaikan
    if (stack[stack.length - 1] === fullPath) {
      return;
    }

    stack.push(fullPath);
    // Batasi maksimum 30 riwayat terakhir
    if (stack.length > 30) {
      stack.shift();
    }
    sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify(stack));
  } catch (e) {
    // abaikan jika sessionStorage diblokir
  }
};

/**
 * Mendapatkan rute 1 langkah sebelumnya tanpa memodifikasi stack
 */
export const getPreviousRoute = (currentPath = '') => {
  try {
    const raw = sessionStorage.getItem(NAV_STACK_KEY);
    let stack = raw ? JSON.parse(raw) : [];
    if (Array.isArray(stack) && stack.length > 1) {
      for (let i = stack.length - 2; i >= 0; i--) {
        if (stack[i] && stack[i] !== currentPath) {
          return stack[i];
        }
      }
    }
  } catch (e) {}
  return '/';
};

/**
 * Kembali tepat 1 langkah ke halaman sebelumnya (bukan langsung mental ke awal)
 */
export const goBackOneStep = (navigate, currentPath = '') => {
  try {
    const raw = sessionStorage.getItem(NAV_STACK_KEY);
    let stack = raw ? JSON.parse(raw) : [];
    if (Array.isArray(stack) && stack.length > 0) {
      let target = null;
      while (stack.length > 0) {
        const item = stack.pop();
        if (item && item !== currentPath) {
          target = item;
          break;
        }
      }

      if (target) {
        sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify(stack));
        navigate(target);
        return;
      }
    }
  } catch (e) {}

  // Fallback cerdas jika history stack kosong atau direct access
  if (currentPath.startsWith('/cook/')) {
    const recipeId = currentPath.split('/')[2];
    if (recipeId) {
      navigate(`/recipe/${recipeId}`);
      return;
    }
  }

  if (currentPath.startsWith('/recipe/')) {
    navigate('/explore');
    return;
  }

  if (window.history.length > 1) {
    navigate(-1);
  } else {
    navigate('/');
  }
};
