import { Router } from 'express';

const router = Router();

// ==========================================
// 1. ENDPOINT LOGIN ADMINISTRATOR
// ==========================================
router.post('/login', handleAdminLogin);
router.post('/admin/login', handleAdminLogin);

function handleAdminLogin(req, res) {
  try {
    const { username, password } = req.body;

    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan kata sandi admin wajib diisi!'
      });
    }

    if (username.trim() === validUsername && password === validPassword) {
      // Buat token sesi admin
      const token = `quickprep_token_${Buffer.from(username + ':' + Date.now()).toString('base64')}`;

      return res.status(200).json({
        success: true,
        message: 'Login berhasil! Selamat datang Admin QuickPrep.',
        data: {
          username: validUsername,
          name: 'Administrator',
          role: 'admin',
          token,
          expiresIn: '24h'
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Akses ditolak! Anda bukan administrator atau kredensial yang dimasukkan salah.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat verifikasi autentikasi admin.'
    });
  }
}

// ==========================================
// 2. ENDPOINT LOGIN & DAFTAR PENGGUNA (USER)
// ==========================================
router.post('/user/login', handleUserLogin);
router.post('/user/register', handleUserLogin);

function handleUserLogin(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan kata sandi pengguna wajib diisi!'
      });
    }

    // Format nama pengguna
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (name && name.trim()) ? name.trim() : cleanEmail.split('@')[0];

    // Buat token pengguna reguler
    const userToken = `user_token_${Buffer.from(cleanEmail + ':' + Date.now()).toString('base64')}`;

    return res.status(200).json({
      success: true,
      message: `Selamat datang, ${cleanName}! Login pengguna berhasil.`,
      data: {
        name: cleanName,
        email: cleanEmail,
        role: 'user',
        token: userToken,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat autentikasi pengguna.'
    });
  }
}

// ==========================================
// 3. ENDPOINT VERIFIKASI TOKEN
// ==========================================
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer quickprep_token_')) {
    return res.status(200).json({
      success: true,
      message: 'Sesi admin aktif.',
      user: {
        username: process.env.ADMIN_USERNAME || 'admin',
        name: 'Administrator',
        role: 'admin'
      }
    });
  }

  if (authHeader && authHeader.startsWith('Bearer user_token_')) {
    return res.status(200).json({
      success: true,
      message: 'Sesi pengguna aktif.',
      user: {
        role: 'user'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Sesi tidak valid atau telah kedaluwarsa.'
  });
});

export default router;
