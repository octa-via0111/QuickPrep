export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Akses ditolak. Token otentikasi (Bearer Token) tidak ditemukan.'
        });
    }

    const token = authHeader.split(' ')[1];

    // Token Administrator
    if (token && token.startsWith('quickprep_')) {
        req.user = {
            username: process.env.ADMIN_USERNAME || 'admin',
            name: 'Administrator',
            role: 'admin'
        };
        return next();
    }

    // Token Pengguna Biasa
    if (token && (token.startsWith('user_') || token.startsWith('token_'))) {
        req.user = {
            role: 'user'
        };
        return next();
    }

    return res.status(401).json({
        success: false,
        message: 'Sesi atau token otentikasi tidak valid atau telah kedaluwarsa.'
    });
};

export const requireAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Akses ditolak. Header otorisasi (Bearer Token) Administrator diperlukan.'
        });
    }

    const token = authHeader.split(' ')[1];

    // Validasi token apakah merupakan token Administrator yang sah
    if (token && token.startsWith('quickprep_')) {
        req.user = {
            username: process.env.ADMIN_USERNAME || 'admin',
            name: 'Administrator',
            role: 'admin'
        };
        return next();
    }

    // Jika token terdeteksi milik pengguna biasa, tolak akses ke fitur admin
    if (token && (token.startsWith('user_') || token.startsWith('token_'))) {
        return res.status(403).json({
            success: false,
            message: 'Akses terlarang (Forbidden). Fitur ini hanya diizinkan untuk Administrator.'
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Token administrator tidak valid atau telah kedaluwarsa.'
    });
};

/**
 * Middleware: optionalAuth
 * Bersifat opsional: jika token ada, lampirkan data user ke req.user.
 * Jika tidak ada token, request tetap diizinkan lewat (misal untuk logging audit).
 */
export const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token.startsWith('quickprep_')) {
            req.user = { role: 'admin', name: 'Administrator' };
        } else if (token.startsWith('user_') || token.startsWith('token_')) {
            req.user = { role: 'user' };
        }
    }

    next();
};

export default {
    requireAuth,
    requireAdmin,
    optionalAuth
};
