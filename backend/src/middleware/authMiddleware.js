export const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer quickprep_token_')) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak! Anda tidak memiliki izin administrator untuk melakukan aksi ini.'
    });
  }
  
  next();
};

export default requireAdminAuth;
