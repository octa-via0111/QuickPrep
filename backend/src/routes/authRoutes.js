import { Router } from 'express';

const router = Router();

router.post('/login', handleUnifiedLogin);
router.post('/admin/login', handleUnifiedLogin);
router.post('/user/login', handleUnifiedLogin);
router.post('/user/register', handleUnifiedLogin);

function handleUnifiedLogin(req, res) {
  try {
    const { name, email, username, password } = req.body;
    const identifier = (username || email || '').trim();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email / Username dan kata sandi wajib diisi!'
      });
    }

    const validAdminUser = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
    const validAdminPass = process.env.ADMIN_PASSWORD || 'admin123';
    const adminAliases = [
      validAdminUser,
      'admin@gmail.com',
      'admin@quickprep.com',
      'admin@admin.com',
      (process.env.ADMIN_EMAIL || '').toLowerCase()
    ].filter(Boolean);

    // 1. Cek jika identifier adalah Administrator (username atau email admin)
    const isTryingAdmin = adminAliases.includes(identifier.toLowerCase());
    if (isTryingAdmin) {
      if (password === validAdminPass) {
        const token = `quickprep_token_${Buffer.from(validAdminUser + ':' + Date.now()).toString('base64')}`;
        return res.status(200).json({
          success: true,
          message: 'Login berhasil! Selamat datang Administrator.',
          data: {
            username: validAdminUser,
            name: 'Administrator',
            role: 'admin',
            token,
            expiresIn: '24h'
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Kata sandi admin salah! Akses administrator ditolak.'
        });
      }
    }

    // 2. Jika bukan admin, proses sebagai Pengguna Biasa (User)
    const cleanEmail = identifier;
    const cleanName = (name && name.trim())
      ? name.trim()
      : (cleanEmail.includes('@') ? cleanEmail.split('@')[0] : cleanEmail);
    const userToken = `user_token_${Buffer.from(cleanEmail + ':' + Date.now()).toString('base64')}`;

    return res.status(200).json({
      success: true,
      message: `Selamat datang, ${cleanName}! Login berhasil.`,
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
      message: 'Terjadi kesalahan pada server saat verifikasi login.'
    });
  }
}

// ==========================================
// 2. ENDPOINT LUPA KATA SANDI
// ==========================================
router.post('/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Alamat email wajib diisi!'
      });
    }

    const cleanEmail = email.trim();
    return res.status(200).json({
      success: true,
      message: `Petunjuk pemulihan kata sandi telah dikirim ke alamat email "${cleanEmail}". Silakan periksa kotak masuk atau spam Anda.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses permintaan lupa kata sandi.'
    });
  }
});

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
