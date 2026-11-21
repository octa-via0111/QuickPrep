import { Router } from 'express';

const router = Router();

// Endpoint Login Admin
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan kata sandi wajib diisi!'
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
          role: 'Administrator',
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
      message: 'Terjadi kesalahan pada server saat verifikasi autentikasi.'
    });
  }
});

// Endpoint Verifikasi Token Sesi
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer quickprep_token_')) {
    return res.status(200).json({
      success: true,
      message: 'Sesi admin aktif dan valid.',
      user: {
        username: process.env.ADMIN_USERNAME || 'admin',
        role: 'Administrator'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Sesi admin tidak valid atau telah kedaluwarsa.'
  });
});

export default router;
